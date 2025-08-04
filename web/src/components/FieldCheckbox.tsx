import { Controller } from "react-hook-form";
import type { IFormFieldBase } from "./Form";

interface IFieldCheckbox extends IFormFieldBase {
  props?: {
    label?: string;
  };
}

function FieldCheckbox({ control, label, name, rule, props }: IFieldCheckbox) {
  const controller = (
    <Controller
      name={name}
      control={control}
      rules={rule}
      render={({ field, fieldState }) => (
        <>
          <input {...field} {...props} type="checkbox" />
          {fieldState.error && (
            <p className="help is-danger">{fieldState.error.message}</p>
          )}
        </>
      )}
    />
  );

  return (
    <>
      {label && (
        <div className="field">
          <label className="label">
            {label}
            {rule?.required && <span className="has-text-danger">&nbsp;*</span>}
          </label>
        </div>
      )}
      <label className="checkbox">
        {controller}
        {props?.label && (
          <span className="ml-2">
            {props.label}
            {rule?.required && <span className="has-text-danger">&nbsp;*</span>}
          </span>
        )}
      </label>
    </>
  );
}

export default FieldCheckbox;
