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

            // Checking common API success structures
            if (data.success !== false) {
                // You can also save the received Auth Token here to SecureStore/Keychain if needed
                showToast('Successfully logged in!', 'success');
                login();
            } else {
                showToast(data.message || 'Invalid credentials', 'error');
            }
        },
        onError: (error: any) => {
            console.log('Login Error:', error);
            showToast(error.message || 'An error occurred during login', 'error');
        }
    });
};
