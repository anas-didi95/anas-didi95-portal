import type { TColor } from "@/commons/types";

interface IButton {
  label: string;
  color: TColor;
  type: "button" | "submit" | "reset";
}

function Button({ label, color, type }: IButton) {
  const style = `is-${color}`;

  return (
    <button className={`button ${style}`} type={type}>
      {label}
    </button>
  );
}

export default Button;
