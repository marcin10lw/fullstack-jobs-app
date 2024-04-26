import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import ErrorMessage from './ErrorMessage';
import { useState } from 'react';
import { Button } from './ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface LabeledRegisterInputProps {
  type?: string;
  name: string;
  label: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
  children?: React.ReactNode;
  positionErrorAbsolute?: boolean;
  withPasswordToggle?: boolean;
}

const LabeledRegisterInput = ({
  register,
  label,
  name,
  type = 'text',
  error,
  children,
  positionErrorAbsolute,
  withPasswordToggle,
}: LabeledRegisterInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Label htmlFor={name} className="ml-[2px] font-normal capitalize">
        {label}
      </Label>
      <div className="relative">
        <Input {...register} type={showPassword ? 'text' : type} id={name} className="mt-[2px]" />
        {withPasswordToggle && (
          <Button
            onClick={() => setShowPassword((prev) => !prev)}
            type="button"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            variant="link"
          >
            {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          </Button>
        )}
      </div>
      {error?.message && <ErrorMessage isAbsolute={positionErrorAbsolute} errorMessage={error.message} />}
      {children}
    </div>
  );
};

export default LabeledRegisterInput;
