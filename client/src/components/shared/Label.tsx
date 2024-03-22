import { LabelHTMLAttributes } from "react";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export default function Label(props: LabelProps) {
  const propsNoClassName = { ...props };
  delete propsNoClassName.className;

  return (
    <label {...propsNoClassName} className={`text-base font-bold text-gray-900 ${props.className}`}>
      {props.children}
      {props.required && <span className=" text-blue-500">*</span>}
    </label>
  );
}
