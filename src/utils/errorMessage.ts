import { toast } from "react-toastify";

import { CustomAxiosError } from "src/types";

const errorMessage = (error: CustomAxiosError, message: string) => {
  if (error.response?.status === 404) {
    toast.error(message);
    return;
  }

  toast.error(error.response?.data.msg);
};

export default errorMessage;
