import { LoginFormDataSchema } from 'src/schema/Login';
import { restApi } from '../restApi';
import { AUTH_API_URLS } from './authApiUrls';
import { RegisterFormDataSchema } from 'src/schema/Register';

export const authAPI = {
  registerUser: (formData: RegisterFormDataSchema) => restApi.private.post(AUTH_API_URLS.registerUser, formData),
  loginUser: (formData: LoginFormDataSchema) => restApi.private.post(AUTH_API_URLS.loginUser, formData),
  logoutUser: () => restApi.private.post(AUTH_API_URLS.logoutCurrentUser),
  verifyEmail: (verificationCode: string) => restApi.private.post(AUTH_API_URLS.verifyEmail, { verificationCode }),
  sendVerificationCode: () => restApi.private.post(AUTH_API_URLS.sendVerificationCode),
};
