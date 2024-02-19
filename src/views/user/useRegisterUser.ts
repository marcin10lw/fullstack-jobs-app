import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from 'src/components/ui/use-toast';

import { userAPI } from 'src/infrasctucture/user/userApiAdapter';
import { RegisterFormData, registerFormData } from 'src/models/Register';
import { ROUTES } from 'src/routes';

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
    mutationFn: userAPI.registerUser,
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
    onError: () => {
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
