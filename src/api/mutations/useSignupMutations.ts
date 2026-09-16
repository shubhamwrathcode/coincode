import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../services/authService';
import { useToastStore } from '../../store/toastStore';
import { getErrorMessage } from '../errors';
import {
  CheckIdentifierPayload,
  RegisterEmailPayload,
  RegisterPhonePayload,
  RegistrationOtpPayload,
  VerifyRegistrationOtpPayload,
} from '../../types/auth';

export const useCheckIdentifierMutation = () => {
  return useMutation({
    mutationFn: (payload: CheckIdentifierPayload) => AuthService.checkIdentifier(payload),
    // Toasts are handled by calling screens (signup / login) for correct messaging
  });
};

export const useRegisterEmailMutation = () => {
  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: (payload: RegisterEmailPayload) => AuthService.registerEmail(payload),
    onSuccess: (response: any) => {
      if (response?.message) {
        showToast(response.message, 'success');
      }
    },
    onError: (error) => {
      showToast(getErrorMessage(error, 'Registration failed'), 'error');
    },
  });
};

export const useRegisterPhoneMutation = () => {
  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: (payload: RegisterPhonePayload) => AuthService.registerPhone(payload),
    onSuccess: (response: any) => {
      if (response?.message) {
        showToast(response.message, 'success');
      }
    },
    onError: (error) => {
      showToast(getErrorMessage(error, 'Registration failed'), 'error');
    },
  });
};

export const useSendRegistrationOtpMutation = () => {
  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: (payload: RegistrationOtpPayload) => AuthService.sendRegistrationOtp(payload),
    onSuccess: (response: any) => {
      showToast(response?.message || 'OTP sent successfully', 'success');
    },
    onError: (error) => {
      showToast(getErrorMessage(error, 'Failed to send OTP'), 'error');
    },
  });
};

export const useVerifyRegistrationOtpMutation = () => {
  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: (payload: VerifyRegistrationOtpPayload) =>
      AuthService.verifyRegistrationOtp(payload),
    onSuccess: (response: any) => {
      showToast(response?.message || 'Account verified successfully', 'success');
    },
    onError: (error) => {
      showToast(getErrorMessage(error, 'OTP verification failed'), 'error');
    },
  });
};
