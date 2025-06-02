import type { ReactNode } from "react";

interface IForm {
  children: ReactNode;
}

function Form({ children }: IForm) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}>
      <fieldset>{children}</fieldset>
    </form>
  );
}

export default Form;
