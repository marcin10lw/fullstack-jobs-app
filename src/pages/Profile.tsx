import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { AiOutlinePlus } from 'react-icons/ai';

import { useUser } from './DashboardLayout';
import { UpdatedUser, updateUserSchema } from 'src/models/User';
import { FormRow, SubmitButton } from 'src/components';
import customFetch from 'src/utils/customFetch';
import { CustomAxiosError } from 'src/types';
import errorMessage from 'src/utils/errorMessage';
import userIcon from 'src/assets/images/user.svg';

const Profile = () => {
  const { user } = useUser();
  const qc = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (user: FormData) =>
      customFetch.patch('/users/update-user', user),
    onSuccess: () => {
      qc.invalidateQueries(['user']);
      toast.success('User updated!');
    },
    onError: (error: CustomAxiosError) => {
      errorMessage(error, 'Could not update user');
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<UpdatedUser>({
    defaultValues: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    resolver: zodResolver(updateUserSchema),
  });

  const onFormSubmit = (user: UpdatedUser) => {
    const formData = new FormData();
    const userEntries = Object.entries(user);

    userEntries.forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (!user.avatar) {
      formData.delete('avatar');
    }

    mutate(formData);
  };

  return (
    <div className="w-full rounded-[--border-radius] bg-[--background-secondary-color] p-[3rem_2rem_4rem]">
      <form
        className="form m-0 w-full max-w-full rounded-none p-0 shadow-none"
        onSubmit={handleSubmit(onFormSubmit)}
        noValidate
        encType="multipart/form-data"
      >
        <h4 className="mb-8">profile</h4>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_2fr] md:gap-4">
          <Controller
            control={control}
            name={'avatar'}
            render={({ field }) => {
              return (
                <div className="relative h-[200px] w-[200px]">
                  <label
                    htmlFor="avatar"
                    className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-full"
                  >
                    <img
                      src={
                        field.value && field.value.type.includes('image/')
                          ? URL.createObjectURL(field.value)
                          : user.avatar
                          ? user.avatar
                          : userIcon
                      }
                      alt="user avatar"
                      className="block h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 z-10 grid place-items-center bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-40">
                      <div className="h-8 w-8">
                        <AiOutlinePlus />
                      </div>
                    </div>
                  </label>

                  <input
                    onChange={({ target }) => {
                      if (target.files) {
                        field.onChange(target.files[0]);
                      }
                    }}
                    type="file"
                    id="avatar"
                    className="hidden"
                    accept="image/*"
                  />
                  {errors.avatar && (
                    <p className="form-error top-[calc(100%_+_0.3rem)] text-center">
                      {errors.avatar.message}
                    </p>
                  )}
                </div>
              );
            }}
          />

          <div className="text-[clamp(1.5rem,_2vw,_3rem)]">
            Hello, {user.name}!
          </div>
        </div>

        <div className="mt-12 grid gap-y-4 lg:grid-cols-2 lg:gap-[2rem_1rem] xl:grid-cols-3">
          <FormRow
            type="text"
            name="name"
            labelText="name"
            register={register('name')}
            error={errors.name}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            register={register('lastName')}
            error={errors.lastName}
          />
          <FormRow
            type="email"
            name="email"
            labelText="email"
            register={register('email')}
            error={errors.email}
          />
          <FormRow
            type="text"
            name="location"
            labelText="location"
            register={register('location')}
            error={errors.location}
          />

          <div className="mt-4 lg:mt-8">
            <SubmitButton isLoading={isLoading} isFormBtn />
          </div>
        </div>
      </form>
    </div>
  );
};
export default Profile;
