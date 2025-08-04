import { Controller } from "react-hook-form";
import { FaCheck, FaX } from "react-icons/fa6";
import type { IFormFieldBase } from "./Form";

interface IFieldCheckbox extends IFormFieldBase {
  props?: {
    label?: string;
  };
}

function FieldCheckbox({
  control,
  label,
  name,
  rule,
  props,
  isEdit,
}: IFieldCheckbox) {
  const controller = (
    <Controller
      name={name}
      control={control}
      rules={rule}
      render={({ field, fieldState }) => (
        <>
          {isEdit ? (
            <>
              <input {...field} {...props} type="checkbox" />
              {fieldState.error && (
                <p className="help is-danger">{fieldState.error.message}</p>
              )}
            </>
          ) : (
            <>{(field.value as boolean) ? <FaCheck /> : <FaX />}</>
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
      <label className="checkbox is-flex is-align-content-center">
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
