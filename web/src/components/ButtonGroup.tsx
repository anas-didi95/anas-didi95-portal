import type { ReactNode } from "react";

interface IButtonGroup {
  children: ReactNode;
  align?: "center" | "right";
}

function ButtonGroup({ align, children }: IButtonGroup) {
  let style = "";
  switch (align) {
    case "center":
      style += " is-centered";
      break;
    case "right":
      style += " is-right";
      break;
  }

  return <div className={`buttons ${style}`}>{children}</div>;
}

export default ButtonGroup;
