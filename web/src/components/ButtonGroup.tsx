import type { TAlignment } from "@/commons/types";
import type { ReactNode } from "react";

interface IButtonGroup {
  children: ReactNode;
  align?: TAlignment;
}

function ButtonGroup({ align = "left", children }: IButtonGroup) {
  const style = `is-${align}`;

  return <div className={`buttons ${style}`}>{children}</div>;
}

export default ButtonGroup;
