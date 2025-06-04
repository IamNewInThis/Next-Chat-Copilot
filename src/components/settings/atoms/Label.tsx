import React from 'react';

interface LabelProps {
    children: React.ReactNode;
    htmlFor?: string;
    required?: boolean;
}

const Label: React.FC<LabelProps> = ({ children, htmlFor, required = false }) => {
    return (
        <label
            htmlFor={htmlFor}
            className="block text-sm font-medium text-zinc-300 mb-1"
        >
            {children}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    );
};

export { Label };