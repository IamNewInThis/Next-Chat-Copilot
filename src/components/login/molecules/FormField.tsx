// molecules/FormField.tsx
import React from 'react';
import Input from '../atoms/Input';

interface FormFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: React.ReactNode;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  icon,
  error
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <Input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        icon={icon}
        error={error}
      />
    </div>
  );
};

export default FormField;