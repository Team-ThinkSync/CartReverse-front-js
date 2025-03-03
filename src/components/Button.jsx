import React from "react";

export const Button = ({ children, variant = "default", onClick, className = "", ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-blue-500",
  };

  const buttonStyles = `${baseStyles} ${variantStyles[variant] || variantStyles.default} ${className}`;

  return (
    <button 
      className={buttonStyles} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};