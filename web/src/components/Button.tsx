import type { TColor } from "@/commons/types";

interface IButton {
  label: string;
  color: TColor;
  type: "button" | "submit" | "reset";
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Button({ label, color, type, onClick }: IButton) {
  const style = `is-${color}`;

  return (
    <button className={`button ${style}`} type={type} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
