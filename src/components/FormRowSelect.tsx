import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { SearchOnChange } from 'src/types';

type FormRowSelectProps = {
  name: string;
  labelText: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
  value?: string;
  options: readonly string[];
  onInputChange?: (event: SearchOnChange) => void;
};

const FormRowSelect = ({
  name,
  labelText,
  register,
  value,
  options,
  onInputChange,
}: FormRowSelectProps) => {
  return (
    <div className="relative">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      {register ? (
        <select {...register} name={name} id={name} className="form-select">
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      ) : (
        <select
          value={value}
          onChange={onInputChange}
          name={name}
          id={name}
          className="form-select"
        >
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default FormRowSelect;
