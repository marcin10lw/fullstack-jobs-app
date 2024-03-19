import axios, { AxiosInstance } from 'axios';
import { ROUTES } from 'src/routes';

const BASE_URL = 'http://localhost:8080/api/v1';

export const restApi = {
  private: axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  }),
  public: axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  }),
};

export const refreshAccessToken = async (axiosInstance: AxiosInstance) => {
  const { data } = await axiosInstance.post('/auth/refreshToken');
  return data;
};

restApi.private.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config.url === '/auth/refreshToken'
    ) {
      window.location.replace(ROUTES.login);
      return;
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      await refreshAccessToken(restApi.private);

      return restApi.private(originalRequest);
    }

    return Promise.reject(error);
  },
);
