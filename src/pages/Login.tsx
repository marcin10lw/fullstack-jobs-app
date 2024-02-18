import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import customFetch from 'src/helpers/customFetch';
import { CustomAxiosError } from 'src/types';
import { FormRow, Logo, SubmitButton } from 'src/components';
import { LoginFormData, loginFormData } from 'src/models/Login';

const Login = () => {
  const [error, setError] = useState<CustomAxiosError | undefined>(undefined);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormData),
  });

  const mutation = useMutation({
    mutationFn: (formData: LoginFormData) => {
      return customFetch.post('/auth/login', formData);
    },
    onSuccess: () => {
      navigate('/dashboard');
    },
    onError: (error: CustomAxiosError) => {
      setError(error);
    },
  });

  const onFormSubmit = (formData: LoginFormData) => {
    mutation.mutate(formData, {
      onSuccess: () => {
        toast.success('Login successful', {
          position: 'top-center',
          autoClose: 2000,
        });
      },
    });
  };

  const onLoginDemo = () => {
    const demoCredentials = {
      email: 'test2137@gmail.com',
      password: 'test1234!',
    };

    mutation.mutate(demoCredentials, {
      onSuccess: () => {
        toast.success('Have fun!', {
          position: 'top-center',
          autoClose: 2000,
        });
      },
    });
  };

  return (
    <section className="grid min-h-screen items-center">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="form max-w-[400px] border-t-[5px] border-solid border-[--primary-500]"
        noValidate
      >
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <h4 className="mx-auto mb-[1.4rem] text-center">Login</h4>

        <div className="flex flex-col gap-4">
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
        </div>

        <div className="mt-8 h-[30px]">
          <SubmitButton isLoading={mutation.isLoading} />
        </div>

        <button
          onClick={onLoginDemo}
          disabled={mutation.isLoading}
          type="button"
          className="btn mt-4 h-[30px] w-full"
        >
          {mutation.isLoading ? 'Loading demo user...' : 'explore the app'}
        </button>

        <p className="mt-4 text-center leading-6">
          Not a member yet?{' '}
          <Link
            to="/register"
            className="ml-1 tracking-[--letter-spacing] text-[--primary-500]"
          >
            Register
          </Link>
        </p>

        {mutation.isError && error && (
          <p className="mt-3 text-center font-semibold capitalize tracking-[--letter-spacing] text-[--input-error]">
            {error.response?.data.msg}
          </p>
        )}
      </form>
    </section>
  );
};
export default Login;
