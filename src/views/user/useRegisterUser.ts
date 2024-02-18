import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from 'src/components/ui/use-toast';

import customFetch from 'src/helpers/customFetch';
import { RegisterFormData, registerFormData } from 'src/models/Register';
import { ROUTES } from 'src/routes';
import { CustomAxiosError } from 'src/types';

export const useRegisterUser = () => {
  const navigate = useNavigate();

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormData),
  });

  const { mutate: registerUser, status } = useMutation({
    mutationFn: async (formData: RegisterFormData) => {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve('');
        }, 1000),
      );

      return customFetch.post('/auth/register', formData);
    },
    onSuccess: () => {
      reset();

      toast({
        title: 'Registered Successfully',
        description: "You'll be redirected to login page",
      });

      setTimeout(() => {
        navigate(ROUTES.login);
      }, 2500);
    },
    onError: (error: CustomAxiosError) => {
      toast({
        title: 'Something went wrong',
        description: 'Please try again',
        variant: 'destructive',
      });
    },
  });

  const onRegisterUser = (formData: RegisterFormData) => {
    registerUser(formData);
  };

  return { errors, status, handleSubmit, onRegisterUser, register };
};
