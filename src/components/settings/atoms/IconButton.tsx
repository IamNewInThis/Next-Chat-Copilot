import React from 'react';

interface IconButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'ghost' | 'outline';
    size?: 'sm' | 'md';
    disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
    children,
    onClick,
    variant = 'ghost',
    size = 'md',
    disabled = false
}) => {
    const baseClasses = 'rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900';

    const variantClasses = {
        ghost: 'hover:bg-zinc-700 text-zinc-400 hover:text-white',
        outline: 'border border-zinc-600 hover:bg-zinc-700 text-zinc-400 hover:text-white'
    };

    const sizeClasses = {
        sm: 'p-1.5',
        md: 'p-2'
    };

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

    return (
        <button
            type="button"
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default IconButton;