import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-zinc-800 border border-zinc-700 rounded-lg p-6 ${className}`}>
            {children}
        </div>
    );
};

export { Card };