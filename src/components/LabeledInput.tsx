import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import ErrorMessage from './ErrorMessage';

interface LabeledInputProps {
  type?: string;
  name: string;
  label: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
  children?: React.ReactNode;
}

const LabeledInput = ({
  register,
  label,
  name,
  type = 'text',
  error,
  children,
}: LabeledInputProps) => {
  return (
    <div className="relative">
      <Label htmlFor={name} className="capitalize">
        {label}
      </Label>
      <Input {...register} type={type} id={name} className="mt-[2px]" />
      {error?.message && <ErrorMessage errorMessage={error.message} />}
      {children}
    </div>
  );
};

export default LabeledInput;
