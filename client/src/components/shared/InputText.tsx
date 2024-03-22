import { InputHTMLAttributes } from "react";

export default function InputText(props: InputHTMLAttributes<HTMLInputElement>) {
  const fixedProps = { ...props };
  fixedProps.type = props.type || "text";
  delete fixedProps.className;

  return (
    <input
      className={`border-4 bg-gray-50 border-gray-900 rounded-lg p-3 outline-none ${props.className}`}
      {...fixedProps}
    />
  );
}
