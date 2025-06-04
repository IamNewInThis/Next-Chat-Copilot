import React from 'react';

interface InputProps {
    type?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
    type = 'text',
    value,
    placeholder,
    disabled = false,
    onChange,
    onBlur
}) => {
    return (
        <input
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        />
    );
};

export { Input };