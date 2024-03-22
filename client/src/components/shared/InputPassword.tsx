import { InputHTMLAttributes, useState } from "react";
import InputText from "./InputText";

export default function InputPassword(props: InputHTMLAttributes<HTMLInputElement>) {
  const [type, setType] = useState("password");
  const propsWithType = { ...props };
  propsWithType.type = type;

  return (
    <div className="flex flex-col">
      <InputText {...propsWithType} />
      <button
        type="button"
        className="ml-auto underline text-sm font-bold text-blue-500 hover:text-blue-300 focus:text-blue-600 transition-colors duration-300"
        onClick={() => setType(type === "password" ? "text" : "password")}
      >
        {type === "password" ? "show password" : "hide password"}
      </button>
    </div>
  );
}
