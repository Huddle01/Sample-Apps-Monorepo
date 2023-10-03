import React from "react";

type Props = {} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({ children, disabled, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={`bg-blue-500 py-3 px-4 rounded-lg ${
        disabled ? "opacity-75" : ""
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
