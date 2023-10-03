import React from "react";

type Props = {} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = (props: Props) => {
  return (
    <input
      {...props}
      className="px-4 py-3 my-2 rounded-lg bg-transparent border border-gray-800"
    />
  );
};

export default Input;
