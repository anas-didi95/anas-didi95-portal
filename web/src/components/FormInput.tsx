import type { UseFormRegister } from "react-hook-form";

interface IFormInput {
  name: string;
  label: string;
  type: "text" | "password";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
}

function FormInput({ label, type, register, name }: IFormInput) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input {...register(name)} className="input" type={type} />
      </div>
    </div>
  );
}

export default FormInput;
