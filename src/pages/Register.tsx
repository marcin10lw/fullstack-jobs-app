import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { CustomAxiosError } from 'src/types';
import customFetch from 'src/utils/customFetch';
import { Logo, FormRow, SubmitButton } from 'src/components';
import { RegisterFormData, registerFormData } from 'src/models/Register';

const Register = () => {
  const [error, setError] = useState<CustomAxiosError | undefined>(undefined);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormData),
  });

  const mutation = useMutation({
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

      // setTimeout(() => {
      //   navigate('/login');
      // }, 10000);
    },
    onError: (error: CustomAxiosError) => {
      setError(error);
    },
  });

  const onFormSubmit = (formData: RegisterFormData) => {
    mutation.mutate(formData);
  };

  return (
    <section className="grid min-h-screen items-center">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="form max-w-[400px] border-b-[5px] border-solid border-[--primary-500]"
        noValidate
      >
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <h4 className="mx-auto mb-[1.4rem] text-center">Register</h4>

        <FormRow
          error={errors.name}
          register={register('name')}
          labelText="name"
          name="name"
          type="text"
        />
        <FormRow
          error={errors.lastName}
          register={register('lastName')}
          labelText="last name"
          name="lastName"
          type="text"
        />
        <FormRow
          error={errors.location}
          register={register('location')}
          labelText="location"
          name="location"
          type="text"
        />
        <FormRow
          error={errors.email}
          register={register('email')}
          labelText="email"
          name="email"
          type="email"
        />
        <FormRow
          error={errors.password}
          register={register('password')}
          labelText="password"
          name="password"
          type="password"
        />

        <div className="mt-8">
          <SubmitButton isLoading={mutation.isLoading} />
        </div>

        <p className="mt-4 text-center leading-6">
          Already a member?{' '}
          <Link
            to="/login"
            className="ml-1 tracking-[--letter-spacing] text-[--primary-500]"
          >
            Login
          </Link>
        </p>

        {mutation.isSuccess && (
          <p className="mt-3 text-center font-semibold capitalize tracking-[--letter-spacing] text-[--green-success]">
            User Created!{' '}
            <span className="mt-1 block">
              You will be redirected to login page
            </span>
          </p>
        )}

        {mutation.isError && error && (
          <p className="mt-3 text-center font-semibold capitalize tracking-[--letter-spacing] text-[--input-error]">
            {error.response?.data.msg}
          </p>
        )}
      </form>
    </section>
  );
};
export default Register;
