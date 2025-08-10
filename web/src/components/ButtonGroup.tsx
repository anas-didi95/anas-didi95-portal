import type { TAlignment, TColor } from "@/commons/types";

interface IButtonGroup {
  buttons: IButton[];
  align?: TAlignment;
}

function ButtonGroup({ align, buttons }: IButtonGroup) {
  const groupStyle = `is-${align}`;

  return (
    <div className={`buttons ${groupStyle}`}>
      {buttons.map((btn, idx) => (
        <Button key={idx} {...btn} />
      ))}
    </div>
  );
}

export default ButtonGroup;

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
