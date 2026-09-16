import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '../services/authService';
import { useAuthStore } from '../../store/authStore';
import { useToastStore } from '../../store/toastStore';
import {
  extractAccessToken,
  extractRefreshToken,
  getErrorMessage,
} from '../errors';
import { LoginPayload, SendOtpPayload, VerifyOtpPayload } from '../../types/auth';
import { queryKeys } from '../queryKeys';
import { OTP_TYPE } from '../endpoints';
import { remainingMethodTypes } from '../../utils/authHelpers';
import { navigationRef } from '../../navigation/navigationRef';

export const useLoginMutation = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const setPending2FA = useAuthStore((state) => state.setPending2FA);
  const showToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => {
      console.log('[useLoginMutation] payload:', payload);
      return AuthService.login(payload);
    },
    onSuccess: (envelope, variables) => {
      console.log('[Login API] success:', envelope);
      const session = AuthService.parseSession(
        envelope as any,
        variables.email_or_phone,
      );

      if (session.requiresVerification && session.pending2FA) {
        setPending2FA(session.pending2FA);
        showToast(
          session.message || 'Please verify your identity.',
          'info',
        );
        if (navigationRef.isReady()) {
          (navigationRef as any).navigate('AuthVerification');
        }
        return;
      }

      if (!session.accessToken) {
        showToast(
          session.message || 'Login succeeded but no token received',
          'error',
        );
        return;
      }

      setSession({
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        user: session.user,
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
      showToast(session.message || 'Logged in successfully', 'success');
    },
    onError: (error) => {
      console.log('[Login API] error:', error);
      showToast(getErrorMessage(error, 'Login failed'), 'error');
    },
  });
};

export const useSendOtpMutation = () => {
  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: (payload: SendOtpPayload) => AuthService.sendOtp(payload),
    onSuccess: (envelope: any) => {
      showToast(envelope?.message || 'OTP sent successfully', 'success');
    },
    onError: (error) => {
      showToast(getErrorMessage(error, 'Failed to send OTP'), 'error');
    },
  });
};

/** AGCE sendLoginOtp for login 2FA / new-device */
export const useSendLoginOtpMutation = () => {
  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: (payload: {
      email_or_phone: string;
      sendTo?: 'email' | 'mobile';
    }) => AuthService.sendLoginOtp(payload.email_or_phone, payload.sendTo),
    onSuccess: (envelope: any) => {
      showToast(envelope?.message || 'OTP sent successfully', 'success');
    },
    onError: (error) => {
      showToast(getErrorMessage(error, 'Failed to send OTP'), 'error');
    },
  });
};

export const useVerifyOtpMutation = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const showToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => AuthService.verifyOtp(payload),
    onSuccess: (envelope) => {
      const session = AuthService.parseSession(envelope as any);

      if (session.accessToken) {
        setSession({
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
          user: session.user,
        });
        queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
      }

      showToast(session.message || 'Verified successfully', 'success');
    },
    onError: (error) => {
      showToast(getErrorMessage(error, 'OTP verification failed'), 'error');
    },
  });
};

/** AGCE verifyUser — complete login challenge via /v1/user/verify-otp */
export const useVerifyLoginOtpMutation = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const updatePending2FA = useAuthStore((state) => state.updatePending2FA);
  const clearPending2FA = useAuthStore((state) => state.clearPending2FA);
  const pending2FA = useAuthStore((state) => state.pending2FA);
  const showToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      email_or_phone: string;
      otp: string;
      type: number;
    }) => {
      const otpValue =
        payload.type === 2
          ? String(payload.otp)
          : parseInt(payload.otp, 10);

      const body: VerifyOtpPayload = {
        email_or_phone: payload.email_or_phone,
        type: payload.type,
        otp: otpValue,
        resend: false,
      };

      if (pending2FA?.challengeId) {
        body.challenge_id = pending2FA.challengeId;
      }
      if (pending2FA?.tempToken) {
        body.tempToken = pending2FA.tempToken;
      }

      return AuthService.verifyLoginOtp(body);
    },
    onSuccess: (envelope: any, variables) => {
      const data = envelope?.data || {};

      // Multi-method: more steps remaining
      if (envelope?.success && data?.verification_complete === false) {
        const remaining = remainingMethodTypes(data.remaining_methods);
        const completed = remainingMethodTypes(data.completed_methods);
        const prevCompleted = pending2FA?.completedMethods ?? [];
        const nextCompleted =
          completed.length > 0
            ? completed
            : Array.from(new Set([...prevCompleted, variables.type]));

        showToast(
          data?.message ||
            envelope?.message ||
            (remaining.length
              ? `Method verified. ${remaining.length} method(s) remaining.`
              : 'Method verified. Continue with remaining security methods.'),
          'info',
        );

        updatePending2FA({
          completedMethods: nextCompleted,
          remainingMethods: remaining,
          challengeId: data.challenge_id || pending2FA?.challengeId,
          tempToken: data.tempToken || pending2FA?.tempToken,
          verificationMode:
            data.verification_mode || pending2FA?.verificationMode,
          verifySubStep: 'methods',
          activeMethod: undefined,
          data,
        });
        return;
      }

      if (!envelope?.success) {
        showToast(envelope?.message || 'Verification failed', 'error');
        return;
      }

      const session = AuthService.parseSession(envelope as any);
      // After successful verify, prefer explicit tokens over challenge parse
      const accessToken =
        extractAccessToken(data) ||
        extractAccessToken(envelope) ||
        session.accessToken;
      const refreshToken =
        extractRefreshToken(data) ||
        extractRefreshToken(envelope) ||
        session.refreshToken;

      if (!accessToken) {
        // Some backends return token at root after verify
        const rootToken =
          typeof envelope?.token === 'string' ? envelope.token : null;
        if (!rootToken) {
          showToast(
            envelope?.message || 'Verified but session token missing',
            'error',
          );
          return;
        }
        clearPending2FA();
        setSession({
          accessToken: rootToken,
          refreshToken,
          user: data.user || session.user,
        });
      } else {
        clearPending2FA();
        setSession({
          accessToken,
          refreshToken,
          user: data.user || session.user,
        });
      }

      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
      showToast(envelope?.message || 'Login successful', 'success');
    },
    onError: (error) => {
      showToast(getErrorMessage(error, 'OTP verification failed'), 'error');
    },
  });
};

export { OTP_TYPE };
