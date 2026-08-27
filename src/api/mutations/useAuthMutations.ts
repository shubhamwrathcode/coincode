import { useMutation } from '@tanstack/react-query';
import { ApiService } from '../apiService';
import { ENDPOINTS } from '../endpoints';
import { useAuthStore } from '../../store/authStore';
import { useToastStore } from '../../store/toastStore';

export const useLoginMutation = () => {
    // Zustand store action
    const login = useAuthStore((state) => state.login);
    const showToast = useToastStore((state) => state.showToast);

    return useMutation({
        mutationFn: async (payload: { email_or_phone: string; password: string; token: string }) => {
            return await ApiService.post(ENDPOINTS.AUTH.LOGIN, payload);
        },
        onSuccess: (data) => {
            console.log('Login Success:', data);

            if (data.success !== false) {
                if (data.data?.requiresVerification) {
                    showToast(data.message, 'success');
                } else {
                    showToast(data.message, 'success');
                    login();
                }
            } else {
                showToast(data.message, 'error');
            }
        },
        onError: (error: any) => {
            console.log('Login Error:', error);
            showToast(error?.response?.data?.message || error.message, 'error');
        }
    });
};
