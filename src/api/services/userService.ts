import { ENDPOINTS } from '../endpoints';
import { http } from '../client';
import { ApiResponse } from '../../types/api';
import { AuthUser } from '../../types/auth';

export const UserService = {
  getProfile: () => http.get<ApiResponse<AuthUser>>(ENDPOINTS.USER.PROFILE),
};
