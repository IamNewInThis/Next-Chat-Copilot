// atoms/Logo.tsx
import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const dimensions = {
    small: { width: 120, height: 30 },
    medium: { width: 180, height: 45 },
    large: { width: 240, height: 60 }
  };

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