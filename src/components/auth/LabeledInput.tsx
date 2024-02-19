import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

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
    <div>
      <Label htmlFor={name} className="capitalize">
        {label}
      </Label>
      <Input {...register} type={type} id={name} />
      {error?.message && (
        <p className="mt-1 text-xs font-medium capitalize text-destructive">
          {error.message}
        </p>
      )}
      {children}
    </div>
  );
};

export default LabeledInput;
