import { useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Wrapper } from 'src/assets/wrappers/FormRow';
import { SearchOnChange } from 'src/types';

type FormRowProps = {
  type: string;
  name: string;
  value?: string;
  labelText: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
  isDashboardRow?: boolean;
  onInputChange?: (event: SearchOnChange) => void;
};

const FormRow = ({
  type,
  labelText,
  name,
  value,
  register,
  error,
  isDashboardRow,
  onInputChange,
}: FormRowProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className={`relative`}>
        <label htmlFor={name} className="form-label">
          {labelText}
        </label>
        <div className="input-wrapper relative">
          {register ? (
            <input
              {...register}
              name={name}
              type={
                type === 'password'
                  ? showPassword
                    ? 'text'
                    : 'password'
                  : type
              }
              id={name}
              className={`form-input ${error ? 'form-input-error' : ''}`}
            />
          ) : (
            <input
              value={value}
              onChange={onInputChange}
              name={name}
              type={
                type === 'password'
                  ? showPassword
                    ? 'text'
                    : 'password'
                  : type
              }
              id={name}
              className={`form-input ${error ? 'form-input-error' : ''}`}
            />
          )}
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword((showPassword) => !showPassword)}
              className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[--text-secondary-color]"
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          )}
        </div>
        {error?.message && (
          <p
            className={`form-error ${
              isDashboardRow ? 'absolute left-0 mt-1' : ''
            }`}
          >
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
};
export default FormRow;
