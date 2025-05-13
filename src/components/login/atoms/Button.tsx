// atoms/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  onClick,
  disabled = false
}) => {
  const baseClasses = "py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
    outline: "bg-transparent border border-gray-300 hover:bg-gray-50 text-gray-800 focus:ring-gray-500"
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;