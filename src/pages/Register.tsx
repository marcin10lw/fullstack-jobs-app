import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { Loader2 } from 'lucide-react';
import { Logo } from 'src/components';
import LabeledInput from 'src/components/auth/LabeledInput';
import { Button } from 'src/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from 'src/components/ui/card';
import customFetch from 'src/helpers/customFetch';
import { RegisterFormData, registerFormData } from 'src/models/Register';
import { ROUTES } from 'src/routes';
import { CustomAxiosError } from 'src/types';

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

  const { mutate: registerUser, status } = useMutation({
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

      setTimeout(() => {
        navigate('/login');
      }, 2500);
    },
    onError: (error: CustomAxiosError) => {
      setError(error);
    },
  });

  const onFormSubmit = (formData: RegisterFormData) => {
    registerUser(formData);
  };

  return (
    <section className="bg-background grid min-h-screen place-items-center">
      <Card className="w-full max-w-[400px] shadow-2xl">
        <CardHeader>
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>
          <CardTitle className="text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
            <div className="flex flex-col gap-4">
              <LabeledInput
                register={register('name')}
                label="name"
                name="name"
                error={errors.name}
              />
              <LabeledInput
                register={register('lastName')}
                label="last name"
                name="lastName"
                error={errors.lastName}
              />
              <LabeledInput
                register={register('location')}
                label="location"
                name="location"
                error={errors.location}
              />
              <LabeledInput
                register={register('email')}
                label="email"
                name="email"
                error={errors.email}
                type="email"
              />
              <LabeledInput
                register={register('password')}
                label="password"
                name="password"
                error={errors.password}
                type="password"
              />
            </div>

            <div className="mt-8 h-[30px]">
              <Button
                className="w-full text-lg"
                disabled={status === 'loading'}
                type="submit"
              >
                {status === 'loading' ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  'Sign up'
                )}
              </Button>
            </div>

            <p className="mt-6 text-center leading-6">
              Already a member?{' '}
              <Link
                to={ROUTES.login}
                className="text-primary ml-1 font-medium tracking-wide"
              >
                Login
              </Link>
            </p>

            {status === 'success' && (
              <p className="mt-3 text-center font-semibold capitalize tracking-[--letter-spacing] text-[--green-success]">
                User Created!{' '}
                <span className="mt-1 block">
                  You will be redirected to login page
                </span>
              </p>
            )}

            {status === 'error' && error && (
              <p className="mt-3 text-center font-semibold capitalize tracking-[--letter-spacing] text-[--input-error]">
                {error.response?.data.msg}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
export default Register;
