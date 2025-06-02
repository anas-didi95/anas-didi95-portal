interface IButton {
  label: string;
  color: "primary" | "success";
  type: "button" | "submit" | "reset";
}

function Button({ label, color, type }: IButton) {
  let style = "";
  switch (color) {
    case "primary":
      style += " is-primary";
      break;
    case "success":
      style += " is-success"
  }

  return (
    <button className={`button ${style}`} type={type}>
      {label}
    </button>
  );
}

export default Button;
