import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from 'src/components/ui/use-toast';

import { userAPI } from 'src/infrasctucture/user/userApiAdapter';
import {
  RegisterFormDataSchema,
  registerFormDataSchema,
} from 'src/schema/Register';
import { ROUTES } from 'src/routes';

export const useRegisterUser = () => {
  const navigate = useNavigate();

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormDataSchema>({
    resolver: zodResolver(registerFormDataSchema),
  });

  const { mutate: registerUser, status } = useMutation({
    mutationFn: userAPI.registerUser,
    onSuccess: () => {
      reset();
      toast({
        title: 'Registered Successfully',
        variant: 'success',
      });

      navigate(ROUTES.login);
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'Please try again',
        variant: 'destructive',
      });
    },
  });

  const onRegisterUser = (formData: RegisterFormDataSchema) => {
    registerUser(formData);
  };

  return { errors, status, handleSubmit, onRegisterUser, register };
};