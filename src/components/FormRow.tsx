import { FieldErrors, UseFormRegister } from "react-hook-form";

import { RegisterFormData } from "src/models/Register";

type FormRowProps = {
  type: string;
  name: keyof RegisterFormData;
  labelText: string;
  errors: FieldErrors<RegisterFormData>;
  register: UseFormRegister<RegisterFormData>;
};

const FormRow = ({ type, labelText, name, register, errors }: FormRowProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <input
        {...register(name)}
        type={type}
        id={name}
        className={`form-input ${errors[name] ? "form-input-error" : ""}`}
        required
      />
      <p className="form-error">{errors[name]?.message}</p>
    </div>
  );
};
export default FormRow;
