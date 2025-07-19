interface IButton {
  label: string;
  color: "primary" | "info" | "link" | "success" | "warning" | "danger";
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
