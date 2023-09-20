import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type FormRowProps = {
  type: string;
  name: string;
  labelText: string;
  error: FieldError | undefined;
  register: UseFormRegisterReturn;
};

const FormRow = ({ type, labelText, name, register, error }: FormRowProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <input
        {...register}
        type={type}
        id={name}
        className={`form-input ${error ? "form-input-error" : ""}`}
        required
      />
      <p className="form-error">{error?.message}</p>
    </div>
  );
};
export default FormRow;
