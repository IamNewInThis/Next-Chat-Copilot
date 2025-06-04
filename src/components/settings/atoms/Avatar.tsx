// atoms/Avatar.tsx
import React from 'react';
import Image from 'next/image';
import { FiUser } from 'react-icons/fi';

interface AvatarProps {
    src?: string;
    alt?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    editable?: boolean;
    onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
    src,
    alt = 'Avatar',
    size = 'md',
    editable = false,
    onClick
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24'
    };

    return (
        <div
            className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-zinc-700 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity`}
            onClick={onClick}
        >
            {src ? (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                />
            ) : (
                <FiUser className="text-zinc-400 w-1/2 h-1/2" />
            )}
            {editable && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <FiUser className="text-white w-1/3 h-1/3" />
                </div>
            )}
        </div>
    );
};

export default Avatar;