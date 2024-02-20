import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import LabeledInput from 'src/components/auth/LabeledInput';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { ROUTES } from 'src/routes';
import useLoginUser from './useLoginUser';
import { useState } from 'react';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { status, errors, handleSubmit, onFormSubmit, register, onLoginDemo } =
    useLoginUser();

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <div className="flex flex-col gap-4">
        <LabeledInput
          error={errors.email}
          register={register('email')}
          label="email"
          name="email"
          type="email"
        />

        <div>
          <Label htmlFor="password" className="capitalize">
            password
          </Label>

          <div className="relative">
            <Input
              {...register('password')}
              id="password"
              type={showPassword ? 'text' : 'password'}
            />
            <Button
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2"
              variant="link"
            >
              {showPassword ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </Button>
          </div>
          {errors.password?.message && (
            <p className="mt-1 text-xs font-medium capitalize text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <Button
        className="mt-8 w-full text-lg"
        disabled={status === 'loading'}
        type="submit"
      >
        {status === 'loading' ? (
          <Loader2 className="animate-spin" />
        ) : (
          'Sign in'
        )}
      </Button>

      <Button
        className="mt-2 w-full text-lg"
        onClick={onLoginDemo}
        disabled={status === 'loading'}
        type="button"
      >
        {status === 'loading' ? (
          <Loader2 className="animate-spin" />
        ) : (
          'Explore the app'
        )}
      </Button>

      <p className="mt-6 text-center leading-6">
        Not a member yet?{' '}
        <Link
          to={ROUTES.register}
          className="ml-1 font-medium tracking-wide text-primary"
        >
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
