import { ENDPOINTS, OTP_TYPE } from '../endpoints';
import { http } from '../client';
import { ApiResponse } from '../../types/api';
import {
  LoginPayload,
  LoginResultData,
  SendOtpPayload,
  VerifyOtpPayload,
  AuthUser,
  CheckIdentifierPayload,
  RegisterEmailPayload,
  RegisterPhonePayload,
  RegistrationOtpPayload,
  VerifyRegistrationOtpPayload,
} from '../../types/auth';
import { extractAccessToken, extractRefreshToken } from '../errors';
import {
  buildPending2FAFromLogin,
  isLoginChallengeData,
} from '../../utils/authHelpers';

export type AuthEnvelope<T = LoginResultData> = ApiResponse<T>;

const asRecord = (value: unknown): Record<string, any> => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, any>;
  }
  return {};
};

export const AuthService = {
  login: (payload: LoginPayload) => {
    console.log('[Login API] endpoint:', ENDPOINTS.AUTH.LOGIN);
    console.log('[Login API] payload:', payload);
    return http.post<AuthEnvelope<LoginResultData>>(ENDPOINTS.AUTH.LOGIN, payload);
  },

  sendOtp: (payload: SendOtpPayload) =>
    http.post<AuthEnvelope>(ENDPOINTS.AUTH.SEND_OTP, payload),

  verifyOtp: (payload: VerifyOtpPayload) =>
    http.post<AuthEnvelope<LoginResultData>>(ENDPOINTS.AUTH.VERIFY_OTP, payload),

  checkIdentifier: (payload: CheckIdentifierPayload) => {
    const purpose =
      String(payload.purpose || 'signup').trim().toLowerCase() === 'login'
        ? 'login'
        : 'signup';
    // Spec: username on email tab is sent as kind "email"
    const kind = payload.kind === 'phone' ? 'phone' : 'email';

    const body: Record<string, unknown> = { purpose, kind };

    if (kind === 'phone') {
      body.phone = String(payload.identifier || '')
        .replace(/\D/g, '')
        .replace(/^0+/, '');
      body.country_code = String(payload.countryCode || '+91').trim();
    } else {
      body.email = String(payload.identifier || '').trim();
    }

    const ref = String(payload.referralCode || '').trim();
    if (purpose === 'signup' && ref) {
      body.referralCode = ref;
    }

    console.log('[Auth API] checkIdentifier payload:', body);
    return http.post<any>(ENDPOINTS.AUTH.CHECK_SIGNUP, body);
  },

  registerEmail: (payload: RegisterEmailPayload) => {
    console.log('[Signup API] registerEmail payload:', {
      ...payload,
      password: '[redacted]',
    });
    return http.post<any>(ENDPOINTS.AUTH.REGISTER_EMAIL, payload);
  },

  registerPhone: (payload: RegisterPhonePayload) => {
    console.log('[Signup API] registerPhone payload:', {
      ...payload,
      password: '[redacted]',
    });
    return http.post<any>(ENDPOINTS.AUTH.REGISTER_PHONE, payload);
  },

  sendRegistrationOtp: (payload: RegistrationOtpPayload) => {
    console.log('[Signup API] registrationOtp payload:', payload);
    return http.post<any>(ENDPOINTS.AUTH.REGISTRATION_OTP, payload);
  },

  verifyRegistrationOtp: (payload: VerifyRegistrationOtpPayload) => {
    console.log('[Signup API] verifyRegistrationOtp payload:', payload);
    return http.post<any>(ENDPOINTS.AUTH.VERIFY_REGISTRATION_OTP, payload);
  },

  /** Helpers for signup / login / reset flows */
  sendSignupOtp: (emailOrPhone: string) =>
    AuthService.sendOtp({ email_or_phone: emailOrPhone, type: OTP_TYPE.SIGNUP }),

  /** AGCE guest.send_login_otp — type 'login', optional sendTo */
  sendLoginOtp: (
    emailOrPhone: string,
    sendTo?: 'email' | 'mobile',
  ) => {
    const body: SendOtpPayload = {
      email_or_phone: emailOrPhone,
      type: 'login',
      resend: true,
    };
    if (sendTo) body.sendTo = sendTo;
    console.log('[Auth API] sendLoginOtp payload:', body);
    return AuthService.sendOtp(body);
  },

  sendResetOtp: (emailOrPhone: string) =>
    AuthService.sendOtp({
      email_or_phone: emailOrPhone,
      type: OTP_TYPE.RESET_PASSWORD,
    }),

  /** AGCE verify_fac_otp — POST /v1/user/verify-otp with challenge */
  verifyLoginOtp: (payload: VerifyOtpPayload) => {
    console.log('[Auth API] verifyLoginOtp payload:', {
      ...payload,
      otp: '[redacted]',
      tempToken: payload.tempToken ? '[present]' : undefined,
    });
    return AuthService.verifyOtp(payload);
  },

  parseSession: (
    envelope: AuthEnvelope<LoginResultData> | Record<string, any>,
    loginIdentifier?: string,
  ) => {
    const root = asRecord(envelope);
    const data = asRecord(root?.data);
    const nestedUser = (data.user as AuthUser | undefined) || null;

    const isChallenge = isLoginChallengeData(data);
    // Never treat tempToken as the final session token
    const accessToken = isChallenge
      ? null
      : (extractAccessToken(data) ||
          extractAccessToken(root) ||
          (typeof root.token === 'string' ? root.token : null));
    const refreshToken = isChallenge
      ? null
      : extractRefreshToken(data) || extractRefreshToken(root);

    const pending2FA = isChallenge
      ? buildPending2FAFromLogin(data, loginIdentifier || '')
      : null;

    return {
      accessToken: accessToken as string | null,
      refreshToken: refreshToken as string | null,
      user: nestedUser,
      requiresVerification: isChallenge,
      pending2FA,
      twoFa: data['2fa'],
      verificationComplete: data.verification_complete !== false,
      message: (envelope as any)?.message,
      raw: envelope,
      data,
    };
  },
};
