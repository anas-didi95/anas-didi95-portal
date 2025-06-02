interface IButton {
  label: string;
  color: "primary";
  type: "button" | "submit" | "reset";
}

function Button({ label, color, type }: IButton) {
  let style = "";
  switch (color) {
    case "primary":
      style += " is-primary";
      break;
  }

  return (
    <button className={`button ${style}`} type={type}>
      {label}
    </button>
  );
}

export default Button;
