import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    onClick,
    type = 'button'
}) => {
    const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900';

    const variantClasses = {
        primary: 'bg-purple-600 hover:bg-purple-700 text-white',
        secondary: 'bg-zinc-600 hover:bg-zinc-700 text-white',
        outline: 'border border-zinc-600 hover:bg-zinc-700 text-white',
        ghost: 'hover:bg-zinc-700 text-zinc-300 hover:text-white'
    };

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg'
    };

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

    return (
        <button
            type={type}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export { Button };
