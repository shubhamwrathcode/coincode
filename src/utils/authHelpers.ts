/**
 * AGCE-parity helpers for login / identifier check responses.
 */

import {
  AUTH_METHOD,
  AuthMethodOption,
  Pending2FA,
} from '../types/auth';

export const extractSignIdFromToken = (
  token: string | undefined | null,
): string | null => {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    const atobFn = (globalThis as any).atob as
      | ((value: string) => string)
      | undefined;
    if (typeof atobFn !== 'function') return null;
    const raw = atobFn(padded);
    const jsonPayload = decodeURIComponent(
      Array.prototype.map
        .call(raw, (c: string) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
    const payload = JSON.parse(jsonPayload);
    return payload?.data?.signId ?? null;
  } catch {
    return null;
  }
};

export const normalizeAuthMethodType = (raw: unknown): number => {
  const n = Number(raw);
  if (n === 1 || n === 2 || n === 3 || n === 4) return n;
  const s = String(raw ?? '')
    .trim()
    .toLowerCase();
  if (s === 'email' || s === 'mail') return AUTH_METHOD.EMAIL;
  if (
    s === 'google' ||
    s === 'authenticator' ||
    s === 'app' ||
    s === 'ga' ||
    s === 'totp'
  ) {
    return AUTH_METHOD.AUTHENTICATOR;
  }
  if (s === 'mobile' || s === 'phone' || s === 'sms') return AUTH_METHOD.PHONE;
  if (s === 'passkey' || s === 'webauthn') return AUTH_METHOD.PASSKEY;
  return Number.isFinite(n) && n > 0 ? n : AUTH_METHOD.EMAIL;
};

export const remainingMethodTypes = (remaining: unknown): number[] => {
  if (!Array.isArray(remaining)) return [];
  return remaining
    .map((m) => {
      if (m == null) return null;
      if (typeof m === 'number' || typeof m === 'string') {
        return normalizeAuthMethodType(m);
      }
      return normalizeAuthMethodType(
        (m as any).type ??
          (m as any).verificationType ??
          (m as any).methodType,
      );
    })
    .filter((t): t is number => t === 1 || t === 2 || t === 3 || t === 4);
};

export const normalizeAvailableMethods = (
  data: Record<string, any> | null | undefined,
): AuthMethodOption[] => {
  const raw = data?.availableMethods ?? data?.required_methods ?? [];
  if (!Array.isArray(raw)) return [];
  return raw.map((m: any) => {
    if (typeof m === 'number' || typeof m === 'string') {
      return { type: normalizeAuthMethodType(m) };
    }
    return {
      ...m,
      type: normalizeAuthMethodType(
        m?.type ?? m?.verificationType ?? m?.methodType ?? m,
      ),
    };
  });
};

export const resolveLogin2FADefaultMethod = (
  methods: AuthMethodOption[],
  backendPreferred: unknown,
  loginIdentifier: string,
): number => {
  const has = (t: number) => methods.some((m) => Number(m.type) === t);
  const preferred = normalizeAuthMethodType(backendPreferred);
  if (preferred && has(preferred)) return preferred;

  const id = String(loginIdentifier || '').trim();
  if (id.includes('@') && has(AUTH_METHOD.EMAIL)) return AUTH_METHOD.EMAIL;
  if (/^[\+\d\s\-\(\)]+$/.test(id) && has(AUTH_METHOD.PHONE)) {
    return AUTH_METHOD.PHONE;
  }

  if (has(AUTH_METHOD.AUTHENTICATOR)) return AUTH_METHOD.AUTHENTICATOR;
  if (has(AUTH_METHOD.EMAIL)) return AUTH_METHOD.EMAIL;
  if (has(AUTH_METHOD.PHONE)) return AUTH_METHOD.PHONE;
  return methods[0]?.type ? Number(methods[0].type) : AUTH_METHOD.EMAIL;
};

/** Build pending 2FA state from login challenge response (AGCE parity). */
export const buildPending2FAFromLogin = (
  data: Record<string, any>,
  loginIdentifier: string,
): Pending2FA => {
  const methods = normalizeAvailableMethods(data);
  const signIdFromToken = extractSignIdFromToken(
    data?.tempToken ?? data?.token,
  );
  const signId =
    String(data?.signId || signIdFromToken || loginIdentifier || '').trim();
  const defaultMethod = resolveLogin2FADefaultMethod(
    methods,
    data?.defaultMethod ?? data?.['2fa'],
    signId,
  );
  const mode = String(
    data?.verification_mode || (methods.length > 1 ? 'ALL_REQUIRED' : ''),
  );
  const completed = remainingMethodTypes(data?.completed_methods);
  const remaining = remainingMethodTypes(data?.remaining_methods);

  return {
    loginSignId: signId,
    availableMethods: methods,
    defaultMethod,
    verificationMode: mode,
    completedMethods: completed,
    remainingMethods:
      remaining.length > 0
        ? remaining
        : mode === 'ALL_REQUIRED'
          ? methods.map((m) => Number(m.type))
          : [],
    challengeId: data?.challenge_id || data?.challengeId,
    tempToken: data?.tempToken,
    reason: data?.reason,
    // Single method → skip picker and go straight to OTP
    verifySubStep: methods.length <= 1 ? 'code' : 'methods',
    activeMethod: methods.length <= 1 ? defaultMethod : undefined,
    data,
  };
};

export const isLoginChallengeData = (
  data: Record<string, any> | null | undefined,
): boolean => {
  if (!data) return false;
  if (data.requiresVerification === true) return true;
  if (data['2fa'] !== undefined && data['2fa'] !== 0 && data['2fa'] !== '0') {
    return true;
  }
  if (data.tempToken && (data.challenge_id || data.challengeId)) return true;
  if (
    data.tempToken &&
    Array.isArray(data.availableMethods) &&
    data.availableMethods.length > 0
  ) {
    return true;
  }
  if (data.reason === 'LOGIN_NEW_DEVICE') return true;
  // AGCE: anything that is not explicit 2fa===0 without requiresVerification
  // and carries challenge fields
  if (data.tempToken) return true;
  return false;
};

export const authMethodLabel = (type: number) => {
  switch (Number(type)) {
    case AUTH_METHOD.EMAIL:
      return 'Email';
    case AUTH_METHOD.AUTHENTICATOR:
      return 'Authenticator';
    case AUTH_METHOD.PHONE:
      return 'Phone';
    case AUTH_METHOD.PASSKEY:
      return 'Passkey';
    default:
      return 'Verification';
  }
};

export const parseIdentifierCheckResponse = (
  res: any,
  purpose: string = 'signup',
) => {
  const isLogin = String(purpose || 'signup').trim().toLowerCase() === 'login';

  if (res == null) {
    return { ok: false, exists: null as boolean | null, code: null as string | null, message: 'No response from server.' };
  }

  const referral = res.referral;
  if (referral && typeof referral === 'object' && referral.success === false) {
    return {
      ok: false,
      exists: null as boolean | null,
      code: referral.code || 'INVALID_REFERRAL_CODE',
      message: referral.message || 'Referral code is invalid.',
    };
  }

  if (res.success === true) {
    return {
      ok: true,
      exists: isLogin,
      code: null as string | null,
      message: res.message || null,
    };
  }

  return {
    ok: false,
    exists: isLogin ? false : true,
    code: (res.code as string) || null,
    message: res.message || (isLogin ? 'User not found' : 'Email already exists'),
  };
};

export const classifyLoginFailureMessage = (message: unknown) => {
  const m = String(message || '').toLowerCase();
  if (!m) return 'auth_failed' as const;
  if (m.includes('not registered') || m.includes('no account') || m.includes('user not found') || m.includes('not found')) {
    return 'user_not_found' as const;
  }
  if (m.includes('password') || m.includes('invalid credentials') || m.includes('incorrect')) {
    return 'wrong_password' as const;
  }
  return 'auth_failed' as const;
};
