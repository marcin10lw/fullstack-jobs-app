import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from 'src/components/ui/use-toast';

import { authAPI } from 'src/infrasctucture/auth/authApiAdapter';
import { ROUTES } from 'src/routes';
import { LoginFormDataSchema, loginFormDataSchema } from 'src/schema/Login';
import { CustomAxiosError } from 'src/types';

const useLoginUser = () => {
  const navigate = useNavigate();

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormDataSchema>({
    resolver: zodResolver(loginFormDataSchema),
  });

  const { mutate: loginUser, status } = useMutation({
    mutationFn: authAPI.loginUser,
    onSuccess: () => {
      navigate(ROUTES.allJobs);
    },
    onError: (error: CustomAxiosError) => {
      toast({
        title: 'Something went wrong',
        description: error.response?.data.msg || 'Please try again',
        variant: 'destructive',
      });
    },
  });

  const onFormSubmit = (formData: LoginFormDataSchema) => {
    loginUser(formData);
  };

  const onLoginDemo = () => {
    const demoCredentials = {
      email: 'test2137@gmail.com',
      password: 'test1234!',
    };

    loginUser(demoCredentials, {
      onSuccess: () => {
        toast({
          title: 'Logged in successfully',
          description: 'Have fun exploring!',
          variant: 'success',
        });
      },
    });
  };

  return {
    register,
    handleSubmit,
    onFormSubmit,
    onLoginDemo,
    errors,
    status,
  };
};

export default useLoginUser;
