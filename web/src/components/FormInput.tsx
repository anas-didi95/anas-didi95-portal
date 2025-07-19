import { Controller, type Control } from "react-hook-form";
import { ValidatorMessage } from "../commons/utils";

interface IFormInput {
  name: string;
  label: string;
  type: "text" | "password";
  rule?: {
    required?: boolean;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any, any>;
}

function FormInput({ label, type, name, rule, control }: IFormInput) {
  const controller = (
    <Controller
      name={name}
      control={control}
      rules={{
        required: rule?.required && ValidatorMessage.fieldRequired(label),
      }}
      render={({ field, fieldState }) => (
        <>
          <input
            {...field}
            type={type}
            className={`input ${fieldState.error ? "is-danger" : ""}`}
          />
          {fieldState.error && (
            <p className="help is-danger">{fieldState.error.message}</p>
          )}
        </>
      )}
    />
  );

  return (
    <div className="field">
      <label className="label">
        {label}
        {rule?.required && <span className="has-text-danger">&nbsp;*</span>}
      </label>
      <div className="control">{controller}</div>
    </div>
  );
}

export default FormInput;
