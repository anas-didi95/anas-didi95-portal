import type { ReactNode } from "react";

interface IForm {
  children: ReactNode;
  isPending?: boolean;
  onSubmit?: () => Promise<void>;
}

function Form({ children, isPending = false, onSubmit }: IForm) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) {
          void onSubmit();
        }
      }}>
      <fieldset disabled={isPending}>{children}</fieldset>
    </form>
  );
}

export default Form;
