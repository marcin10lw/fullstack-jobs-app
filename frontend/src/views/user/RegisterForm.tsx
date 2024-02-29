import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import LabeledRegisterInput from 'src/components/LabeledRegisterInput';
import { Button } from 'src/components/ui/button';
import { ROUTES } from 'src/routes';
import { useRegisterUser } from './useRegisterUser';

const RegisterForm = () => {
  const { status, errors, handleSubmit, onRegisterUser, register } =
    useRegisterUser();

  return (
    <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
      <div className="flex flex-col gap-4">
        <LabeledRegisterInput
          register={register('name')}
          label="name"
          name="name"
          error={errors.name}
        />
        <LabeledRegisterInput
          register={register('lastName')}
          label="last name"
          name="lastName"
          error={errors.lastName}
        />
        <LabeledRegisterInput
          register={register('location')}
          label="location"
          name="location"
          error={errors.location}
        />
        <LabeledRegisterInput
          register={register('email')}
          label="email"
          name="email"
          error={errors.email}
          type="email"
        />
        <LabeledRegisterInput
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
    </form>
  );
};

export default RegisterForm;