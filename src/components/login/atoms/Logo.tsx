// atoms/Logo.tsx
import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = () => {
  return (
    <div className="flex items-center">
        {/* Replace with your actual logo or brand name */}
        <div className="text-2xl font-bold text-white flex items-center">
            <span className="text-red-500">Red</span>
            <span>Switches</span>
        </div>
    </div>
  );
};

export default Logo;