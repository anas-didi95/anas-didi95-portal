import type { TColor } from "@/commons/types";

interface IButton {
  label: string;
  color: TColor;
  type: "button" | "submit" | "reset";
  isLoading?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Button({ label, color, type, isLoading = false, onClick }: IButton) {
  const style = `is-${color} ${isLoading ? "is-loading" : ""}`;

  return (
    <button className={`button ${style}`} type={type} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
