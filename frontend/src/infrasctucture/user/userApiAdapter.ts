import { LoginFormDataSchema } from 'src/models/Login';
import { RegisterFormDataSchema } from 'src/models/Register';
import { UserApiResponse } from './types';
import { USER_API_URLS } from './userApiUrls';
import { restApi } from '../restApi';

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

  updateUser: (formData: FormData) =>
    restApi.private.patch(USER_API_URLS.updateUser, formData),

  removeUserAvatar: () => restApi.private.delete(USER_API_URLS.removeUserAvatar),
};
