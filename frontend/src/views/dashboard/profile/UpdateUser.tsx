import { Controller } from 'react-hook-form';

import ContentWrapper from 'src/components/ContentWrapper';
import LabeledRegisterInput from 'src/components/LabeledRegisterInput';
import { Button } from 'src/components/ui/button';
import { useUser } from '../DashboardLayout';
import ProfilePicture from './ProfilePicture';
import { useUpdateUser } from './useUpdateUser';

const UpdateUser = () => {
  const { user } = useUser();
  const { register, control, handleSubmit, errors, isUpdatingProfile, onFormSubmit, hasAnyFieldChanged } =
    useUpdateUser();

  return (
    <ContentWrapper title="profile">
      <form onSubmit={handleSubmit(onFormSubmit)} noValidate encType="multipart/form-data">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_2fr] md:gap-4">
          <Controller
            control={control}
            name="avatar"
            render={({ field: { value, onChange } }) => {
              return <ProfilePicture value={value} onChange={onChange} error={errors.avatar} />;
            }}
          />

          <div className="text-[clamp(1.5rem,_2vw,_3rem)]">Hello, {user.name}!</div>
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
            isLoading={isUpdatingProfile}
            className="mt-6"
          >
            Submit
          </Button>
        </div>
      </form>
    </ContentWrapper>
  );
};

export default UpdateUser;
