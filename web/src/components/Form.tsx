import type { ReactNode } from "react";

interface IForm {
  children: ReactNode;
  onSubmit?: () => Promise<void>;
}

function Form({ children, onSubmit }: IForm) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) {
          void onSubmit();
        }
      }}>
      <fieldset>{children}</fieldset>
    </form>
  );
}

export default Form;
