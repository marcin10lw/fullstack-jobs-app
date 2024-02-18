import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface LabeledInputProps {
  type?: string;
  name: string;
  label: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
}

const LabeledInput = ({
  register,
  label,
  name,
  type = 'text',
  error,
}: LabeledInputProps) => {
  return (
    <div>
      <Label htmlFor={name} className="capitalize">
        {label}
      </Label>
      <Input {...register} type={type} id={name} />
      {error?.message && (
        <p className="text-destructive text-xs font-medium mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default LabeledInput;
