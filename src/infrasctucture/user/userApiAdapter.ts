import customFetch from 'src/helpers/customFetch';
import { LoginFormData } from 'src/models/Login';
import { USER_API_URLS } from './userApiUrls';
import { RegisterFormData } from 'src/models/Register';

export const userAPI = {
  loginUser: (formData: LoginFormData) =>
    customFetch.post(USER_API_URLS.login, formData),

  registerUser: (formData: RegisterFormData) =>
    customFetch.post(USER_API_URLS.register, formData),
};
