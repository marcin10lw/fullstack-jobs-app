import { Controller, useForm } from 'react-hook-form';

import { Loader2 } from 'lucide-react';
import ContentWrapper from 'src/components/ContentWrapper';
import LabeledRegisterInput from 'src/components/LabeledRegisterInput';
import { Button } from 'src/components/ui/button';
import { useUser } from '../DashboardLayout';
import ProfilePicture from './ProfilePicture';
import { useUpdateUser } from './useUpdateUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdatePassword, updatePasswordSchema } from 'src/models/User';

const Profile = () => {
  const { user } = useUser();
  const {
    register,
    control,
    handleSubmit,
    errors,
    isUpdatingProfile,
    onFormSubmit,
    hasAnyFieldChanged,
  } = useUpdateUser();

  const {
    register: registerChangePassword,
    formState: { errors: changePasswordErrors },
    handleSubmit: handleSubmitNewPassword,
  } = useForm<UpdatePassword>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(updatePasswordSchema),
  });

  const onChangePasswordSubmit = () => {};

  return (
    <div className="flex flex-col gap-8">
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
      <ContentWrapper title="Change password">
        <form
          onSubmit={handleSubmitNewPassword(onChangePasswordSubmit)}
          noValidate
        >
          <div className="flex flex-col gap-4 md:max-w-[300px]">
            <LabeledRegisterInput
              register={registerChangePassword('currentPassword')}
              error={changePasswordErrors.currentPassword}
              withPasswordToggle
              label="current password"
              name="currentPassword"
              type="password"
            />
            <LabeledRegisterInput
              register={registerChangePassword('newPassword')}
              error={changePasswordErrors.newPassword}
              withPasswordToggle
              label="new password"
              name="newPassword"
              type="password"
            />
            <Button className="mt-3">Change Password</Button>
          </div>
        </form>
      </ContentWrapper>
    </div>
  );
};
export default Profile;
