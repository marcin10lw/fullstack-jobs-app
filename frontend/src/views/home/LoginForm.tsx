import { Link } from 'react-router-dom';

import LabeledRegisterInput from 'src/components/LabeledRegisterInput';
import { Button } from 'src/components/ui/button';
import { ROUTES } from 'src/routes';
import useLoginUser from './useLoginUser';

const LoginForm = () => {
  const { status, errors, handleSubmit, onFormSubmit, register, onLoginDemo } = useLoginUser();

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <div className="flex flex-col gap-4">
        <LabeledRegisterInput
          error={errors.email}
          register={register('email')}
          label="email"
          name="email"
          type="email"
        />

        <LabeledRegisterInput
          register={register('password')}
          label="password"
          name="password"
          error={errors.password}
          type="password"
          withPasswordToggle
        />
      </div>

      <Button
        className="mt-8 w-full text-lg"
        disabled={status === 'loading'}
        isLoading={status === 'loading'}
        type="submit"
      >
        Sign in
      </Button>

      <Button
        className="mt-2 w-full text-lg"
        onClick={onLoginDemo}
        disabled={status === 'loading'}
        isLoading={status === 'loading'}
        type="button"
      >
        Explore the app
      </Button>

      <p className="mt-6 text-center leading-6">
        Not a member yet?{' '}
        <Link to={ROUTES.register} className="ml-1 font-medium tracking-wide text-primary">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
