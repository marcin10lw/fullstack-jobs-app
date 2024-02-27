import { CustomAxiosError } from 'src/types';

const errorMessage = (error: CustomAxiosError, message: string) => {
  if (error.response?.status === 404) {
    return message;
  }

  return error.response?.data.msg;
};

export default errorMessage;
