import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Loader2 } from 'lucide-react';
import ContentWrapper from 'src/components/ContentWrapper';
import LabeledRegisterInput from 'src/components/LabeledRegisterInput';
import { Button } from 'src/components/ui/button';
import { checkHasAnyFieldChanged } from 'src/lib/helpers/checkHasAnyFieldChanged';
import customFetch from 'src/lib/helpers/customFetch';
import errorMessage from 'src/lib/helpers/errorMessage';
import { UpdatedUser, updateUserSchema } from 'src/models/User';
import { CustomAxiosError } from 'src/types';
import { useUser } from '../DashboardLayout';
import ProfilePicture from './ProfilePicture';

const Profile = () => {
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
    mutationFn: (user: FormData) =>
      customFetch.patch('/users/update-user', user),
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

  return (
    <ContentWrapper title="profile">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        noValidate
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_2fr] md:gap-4">
          <Controller
            control={control}
            name="avatar"
            render={({ field: { value, onChange } }) => {
              return (
                <ProfilePicture
                  value={value}
                  onChange={onChange}
                  error={errors.avatar}
                />
              );
            }}
          />

          <div className="text-[clamp(1.5rem,_2vw,_3rem)]">
            Hello, {user.name}!
          </div>
        </div>

        <div className="mt-14 grid gap-y-4 lg:grid-cols-2 lg:gap-[2rem_1rem] xl:grid-cols-3">
          <LabeledRegisterInput
            register={register('name')}
            label="name"
            name="name"
            error={errors.name}
            positionErrorAbsolute
          />
          <LabeledRegisterInput
            register={register('lastName')}
            label="last name"
            name="lastName"
            error={errors.lastName}
            positionErrorAbsolute
          />
          <LabeledRegisterInput
            register={register('email')}
            label="email"
            name="email"
            type="email"
            error={errors.email}
            positionErrorAbsolute
          />
          <LabeledRegisterInput
            register={register('location')}
            label="location"
            name="location"
            error={errors.location}
            positionErrorAbsolute
          />
          <Button
            type="submit"
            disabled={isUpdatingProfile || !hasAnyFieldChanged}
            className="mt-6"
          >
            {isUpdatingProfile ? (
              <Loader2 className="animate-spin" />
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </form>
    </ContentWrapper>
  );
};
export default Profile;
