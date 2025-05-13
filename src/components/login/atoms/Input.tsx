// atoms/Input.tsx
import React from 'react';

interface InputProps {
  type: string;
  placeholder: string;
  id: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: React.ReactNode;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  id,
  name,
  value,
  onChange,
  required = false,
  icon,
  error
}) => {
  return (
    <div className="mb-4">
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full py-3 px-4 text-gray-900 ${icon ? 'pl-10' : ''} rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
        />
        {type === 'password' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {/* Password visibility toggle icon could go here */}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;