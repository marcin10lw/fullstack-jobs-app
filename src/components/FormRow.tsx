import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Wrapper } from "src/assets/wrappers/FormRow";
import { SearchOnChange } from "src/types";

type FormRowProps = {
  type: string;
  name: string;
  value?: string;
  labelText: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
  onInputChange?: (event: SearchOnChange) => void;
};

const FormRow = ({
  type,
  labelText,
  name,
  value,
  register,
  error,
  onInputChange,
}: FormRowProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Wrapper>
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {labelText}
        </label>
        <div className="input-wrapper">
          <input
            {...register}
            value={value}
            onChange={onInputChange}
            name={name}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            id={name}
            className={`form-input ${error ? "form-input-error" : ""}`}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          )}
        </div>
        <p className="form-error">{error?.message}</p>
      </div>
    </Wrapper>
  );
};
export default FormRow;
