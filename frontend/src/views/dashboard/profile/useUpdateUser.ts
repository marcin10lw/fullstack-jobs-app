import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userAPI } from 'src/api/user/userApiAdapter';
import { checkHasAnyFieldChanged } from 'src/lib/helpers/checkHasAnyFieldChanged';
import errorMessage from 'src/lib/helpers/errorMessage';
import { UpdatedUserSchema, updateUserSchema } from 'src/schema/User';
import { CustomAxiosError } from 'src/types';
import { useUser } from '../DashboardLayout';
import { CURRENT_USER_QUERY_KEY } from 'src/api/user/constants';
import { useToast } from 'src/components/ui/use-toast';

export const useUpdateUser = () => {
  const { user } = useUser();
  const qc = useQueryClient();

  const initialValues: UpdatedUserSchema = {
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    location: user.location,
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<UpdatedUserSchema>({
    defaultValues: initialValues,
    resolver: zodResolver(updateUserSchema),
  });

  const hasAnyFieldChanged = checkHasAnyFieldChanged(watch(), initialValues);

  const { toast } = useToast();

  const { mutate: updateProfile, isLoading: isUpdatingProfile } = useMutation({
    mutationFn: userAPI.updateUser,
    onSuccess: () => {
      qc.invalidateQueries([CURRENT_USER_QUERY_KEY]);
      toast({
        title: 'User updated',
        variant: 'success',
      });
    },
    onError: (error: CustomAxiosError) => {
      console.log(error);
      toast({
        title: errorMessage(error, 'Could not update user'),
        variant: 'destructive',
      });
    },
  });

  const onFormSubmit = (user: UpdatedUserSchema) => {
    if (!hasAnyFieldChanged) return;

    updateProfile(user);
  };

  return {
    register,
    errors,
    handleSubmit,
    onFormSubmit,
    isUpdatingProfile,
    hasAnyFieldChanged,
  };
};
