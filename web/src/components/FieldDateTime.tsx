import { Controller } from "react-hook-form";
import type { IFormFieldBase } from "./Form";

type IFieldDateTime = IFormFieldBase;

function FieldDateTime({ control, label, name, rule, props }: IFieldDateTime) {
  const controller = (
    <Controller
      name={name}
      control={control}
      rules={rule}
      render={({ field, fieldState }) => (
        <>
          <input
            {...field}
            {...props}
            type="datetime-local"
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

export default FieldDateTime;
