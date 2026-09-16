import { useQuery } from '@tanstack/react-query';
import { UserService } from '../services/userService';
import { queryKeys } from '../queryKeys';
import { useAuthStore } from '../../store/authStore';
import { ApiResponse } from '../../types/api';
import { AuthUser } from '../../types/auth';

export const useUserProfileQuery = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const accessToken = useAuthStore((s) => s.accessToken);
  const setUser = useAuthStore((s) => s.setUser);

  return useQuery({
    queryKey: queryKeys.user.profile(),
    queryFn: async () => {
      const envelope = await UserService.getProfile();
      const user =
        (envelope as ApiResponse<AuthUser>)?.data ||
        (envelope as unknown as AuthUser);
      if (user && typeof user === 'object') {
        setUser(user as AuthUser);
      }
      return envelope;
    },
    enabled: Boolean(isAuthenticated && accessToken),
    staleTime: 60_000,
  });
};
