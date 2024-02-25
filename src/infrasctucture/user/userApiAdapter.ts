import customFetch from 'src/lib/helpers/customFetch';
import { LoginFormData } from 'src/models/Login';
import { RegisterFormData } from 'src/models/Register';
import { UserApiResponse } from './types';
import { USER_API_URLS } from './userApiUrls';

export const userAPI = {
  loginUser: (formData: LoginFormData) =>
    customFetch.post(USER_API_URLS.loginUser, formData),

  registerUser: (formData: RegisterFormData) =>
    customFetch.post(USER_API_URLS.registerUser, formData),

  getCurrentUser: async (): Promise<UserApiResponse> => {
    const { data } = await customFetch.get(USER_API_URLS.getCurrentUser);
    return data;
  },

  logoutUser: () => customFetch.get(USER_API_URLS.logoutCurrentUser)
};
