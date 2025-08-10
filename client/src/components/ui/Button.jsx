import React from "react";
import classNames from "classnames";

const Button = ({ children, className, variant = "primary", ...props }) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      className={classNames(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
