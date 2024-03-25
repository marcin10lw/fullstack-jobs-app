import { LoginFormDataSchema } from 'src/schema/Login';
import { RegisterFormDataSchema } from 'src/schema/Register';
import { UserApiResponse } from './types';
import { USER_API_URLS } from './userApiUrls';
import { restApi } from '../restApi';
import { ChangePasswordSchema } from 'src/schema/User';

export const userAPI = {
  loginUser: (formData: LoginFormDataSchema) =>
    restApi.private.post(USER_API_URLS.loginUser, formData),

  registerUser: (formData: RegisterFormDataSchema) =>
    restApi.private.post(USER_API_URLS.registerUser, formData),

  getCurrentUser: async (): Promise<UserApiResponse> => {
    const { data } = await restApi.private.get(USER_API_URLS.getCurrentUser);
    return data;
  },

  logoutUser: () => restApi.private.post(USER_API_URLS.logoutCurrentUser),

  getAllUsersStats: async (): Promise<{ users: number; jobs: number }> => {
    const { data } = await restApi.private.get(USER_API_URLS.getAllUsersStats);
    return data;
  },

  updateUser: (updateUserFormData: FormData) =>
    restApi.private.patch(USER_API_URLS.updateUser, updateUserFormData),

  removeUserAvatar: () =>
    restApi.private.delete(USER_API_URLS.removeUserAvatar),

  changePassword: (changePasswordFormData: ChangePasswordSchema) =>
    restApi.private.post(USER_API_URLS.changePassword, changePasswordFormData),
};
