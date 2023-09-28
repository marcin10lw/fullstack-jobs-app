import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type FormRowSelectProps = {
  name: string;
  labelText: string;
  error: FieldError | undefined;
  register: UseFormRegisterReturn;
  defaultValue?: string;
  options: readonly string[];
};

const FormRowSelect = ({
  name,
  labelText,
  register,
  error,
  defaultValue = "",
  options,
}: FormRowSelectProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <select
        {...register}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
