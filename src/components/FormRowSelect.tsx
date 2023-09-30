import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { SearchOnChange } from "src/types";

type FormRowSelectProps = {
  name: string;
  labelText: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
  defaultValue?: string;
  options: readonly string[];
  onInputChange?: (event: SearchOnChange) => void;
};

const FormRowSelect = ({
  name,
  labelText,
  register,
  error,
  defaultValue = "",
  options,
  onInputChange,
}: FormRowSelectProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <select
        name={name}
        {...register}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={register ? undefined : onInputChange}
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
