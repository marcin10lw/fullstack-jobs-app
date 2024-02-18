import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from 'src/components/ui/use-toast';

import customFetch from 'src/helpers/customFetch';
import { LoginFormData, loginFormData } from 'src/models/Login';
import { ROUTES } from 'src/routes';
import { CustomAxiosError } from 'src/types';

const useLoginUser = () => {
  const navigate = useNavigate();

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormData),
  });

  const { mutate: loginUser, status } = useMutation({
    mutationFn: (formData: LoginFormData) => {
      return customFetch.post('/auth/login', formData);
    },
    onSuccess: () => {
      navigate(ROUTES.dashboard);
    },
    onError: (error: CustomAxiosError) => {
      toast({
        title: 'Something went wrong',
        description: error.response?.data.msg || 'Please try again',
        variant: 'destructive',
      });
    },
  });

  const onFormSubmit = (formData: LoginFormData) => {
    loginUser(formData, {
      onSuccess: () => {
        toast({
          title: 'Logged in successfully',
          variant: 'success',
        });
      },
    });
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
