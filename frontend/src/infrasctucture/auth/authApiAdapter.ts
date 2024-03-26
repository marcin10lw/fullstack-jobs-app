import { restApi } from '../restApi';
import { AUTH_API_URLS } from './authApiUrls';

export const authAPI = {
  verifyEmail: (verificationCode: string) =>
    restApi.private.post(AUTH_API_URLS.verifyEmail, { verificationCode }),
  sendVerificationCode: () =>
    restApi.private.post(AUTH_API_URLS.sendVerificationCode),
};
