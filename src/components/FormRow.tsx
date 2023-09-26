import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Wrapper } from "src/assets/wrappers/FormRow";

type FormRowProps = {
  type: string;
  name: string;
  labelText: string;
  error: FieldError | undefined;
  register: UseFormRegisterReturn;
};

const FormRow = ({ type, labelText, name, register, error }: FormRowProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Wrapper>
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {labelText}
        </label>
        <div className="input-wrapper">
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          )}
          <input
            {...register}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            id={name}
            className={`form-input ${error ? "form-input-error" : ""}`}
            required
          />
        </div>
        <p className="form-error">{error?.message}</p>
      </div>
    </Wrapper>
  );
};
export default FormRow;
