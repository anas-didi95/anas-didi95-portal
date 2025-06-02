interface IFormInput {
  label: string;
  type: "text" | "password";
}

function FormInput({ label, type }: IFormInput) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input className="input" type={type} />
      </div>
    </div>
  );
}

export default FormInput;
