import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { userAPI } from 'src/infrasctucture/user/userApiAdapter';
import { checkHasAnyFieldChanged } from 'src/lib/helpers/checkHasAnyFieldChanged';
import errorMessage from 'src/lib/helpers/errorMessage';
import { UpdatedUser, updateUserSchema } from 'src/models/User';
import { CustomAxiosError } from 'src/types';
import { useUser } from '../DashboardLayout';

export const useUpdateUser = () => {
  const { user } = useUser();
  const qc = useQueryClient();

  const initialValues: UpdatedUser = {
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    location: user.location,
    avatar: null,
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
    reset,
  } = useForm<UpdatedUser>({
    defaultValues: initialValues,
    resolver: zodResolver(updateUserSchema),
  });

  const hasAnyFieldChanged = checkHasAnyFieldChanged(watch(), initialValues);

  const { mutate: updateProfile, isLoading: isUpdatingProfile } = useMutation({
    mutationFn: userAPI.updateUser,
    onSuccess: () => {
      qc.invalidateQueries(['user']);
      toast.success('User updated!');
      reset();
    },
    onError: (error: CustomAxiosError) => {
      errorMessage(error, 'Could not update user');
    },
  });

  const onFormSubmit = (user: UpdatedUser) => {
    if (!hasAnyFieldChanged) return;

    const formData = new FormData();
    const userEntries = Object.entries(user);

    userEntries.forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    if (!user.avatar) {
      formData.delete('avatar');
    }

    updateProfile(formData);
  };

  return {
    register,
    errors,
    handleSubmit,
    control,
    onFormSubmit,
    isUpdatingProfile,
    hasAnyFieldChanged,
  };
};
