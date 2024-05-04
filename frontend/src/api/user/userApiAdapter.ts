import { ChangePasswordSchema, UpdatedUserSchema } from 'src/schema/User';
import { restApi } from '../restApi';
import { UserApiResponse } from './types';
import { USER_API_URLS } from './userApiUrls';

export const userAPI = {
  getCurrentUser: async (): Promise<UserApiResponse> => {
    const { data } = await restApi.private.get(USER_API_URLS.getCurrentUser);
    return data;
  },

  getAllUsersStats: async (): Promise<{ users: number; jobs: number }> => {
    const { data } = await restApi.private.get(USER_API_URLS.getAllUsersStats);
    return data;
  },

  updateUser: (updateUserData: UpdatedUserSchema) => restApi.private.patch(USER_API_URLS.updateUser, updateUserData),

  changeUserAvatar: (formData: FormData) => restApi.private.post(USER_API_URLS.changeUserAvatar, formData),

  removeUserAvatar: () => restApi.private.delete(USER_API_URLS.removeUserAvatar),

  changePassword: (changePasswordFormData: ChangePasswordSchema) =>
    restApi.private.post(USER_API_URLS.changePassword, changePasswordFormData),
};
