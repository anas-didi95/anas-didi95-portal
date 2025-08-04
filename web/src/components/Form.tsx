import type { ComponentType, ReactNode } from "react";
import type { Control } from "react-hook-form";

interface IForm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any, any>;
  fields: IFormFieldConfig[];
  cols?: { default?: number; mobile?: number };
  isPending?: boolean;
  onSubmit?: () => Promise<void>;
  children?: ReactNode;
}

function Form({
  control,
  fields,
  cols,
  isPending = false,
  onSubmit,
  children,
}: IForm) {
  const colsDefault = cols?.default ?? 3;
  const colsMobile = cols?.default ?? 1;
  const cellClass = "cell mb-4";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) {
          void onSubmit();
        }
      }}>
      <fieldset disabled={isPending}>
        <div
          className={`fixed-grid has-${colsDefault}-cols has-${colsMobile}-cols-mobile`}>
          <div className="grid">
            {fields.map((field, idx) => {
              if (field.hidden) {
                return (
                  <div key={idx} className={`${cellClass} is-hidden-touch`} />
                );
              }

              const Component = field.component!;
              return (
                <div key={idx} className={cellClass}>
                  <Component
                    control={control}
                    label={field.label!}
                    name={field.name!}
                    rule={field.rule}
                    props={field.props}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </fieldset>
      {children}
    </form>
  );
}

export default Form;

export interface IFormFieldBase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any, any>;
  label: string;
  name: string;
  rule?: IFormFieldRule;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>; // Additional props passed to component
}

export interface IFormFieldConfig {
  hidden?: boolean;
  component?: ComponentType<IFormFieldBase>; // Accept any component that takes BaseFieldProps
  label?: string;
  name?: string;
  rule?: IFormFieldRule;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>; // Additional props passed to component
}

interface IFormFieldRule {
  required?: boolean;
}
