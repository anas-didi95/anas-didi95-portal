import type { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import { ValidatorMessage } from "../commons/utils";

interface IFormInput {
  name: string;
  label: string;
  type: "text" | "password";
  rule?: {
    required?: boolean;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
}

function FormInput({ label, type, register, name, rule, errors }: IFormInput) {
  const error = (errors[name] as FieldError)?.message;

  return (
    <div className="field">
      <label className="label">
        {label}
        {rule?.required && <span className="has-text-danger">&nbsp;*</span>}
      </label>
      <div className="control">
        <input
          {...register(name, {
            required: rule?.required && ValidatorMessage.fieldRequired(label),
          })}
          className={`input ${error ? "is-danger" : ""}`}
          type={type}
        />
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
}

export default FormInput;
