import React from 'react';
import { Label} from '../atoms/Label';
import { Input } from '../atoms/Input';

interface FormFieldProps {
    label: string;
    id: string;
    type?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
    label,
    id,
    type = 'text',
    value,
    placeholder,
    disabled = false,
    required = false,
    onChange,
    onBlur,
    error
}) => {
    return (
        <div className="space-y-1">
            <Label htmlFor={id} required={required}>
                {label}
            </Label>
            <Input
                type={type}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange}
                onBlur={onBlur}
            />
            {error && (
                <p className="text-red-400 text-xs mt-1">{error}</p>
            )}
        </div>
    );
};

export default FormField;