// templates/AuthTemplate.tsx
import React from 'react';

interface AuthTemplateProps {
    children: React.ReactNode;
    backgroundImage: string;
    title: string;
    subtitle?: string;
}

const AuthTemplate: React.FC<AuthTemplateProps> = ({
    children,
    backgroundImage,
    title,
    subtitle
}) => {
    return (
        <div className="flex min-h-screen bg-gray-100 w-full">
            {/* Left panel (image background with branding) */}
            <div 
                className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12" 
                style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#10143E' // Fallback color
                }}
            >   
            
                <div className="text-white">
                    <h2 className="text-3xl font-bold mb-4">{title}</h2>
                    {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
                </div>
                
                <div className="flex space-x-2">
                    {/* Navigation dots */}
                    <div className="h-2 w-8 bg-blue-500 rounded-full"></div>
                    <div className="h-2 w-2 bg-gray-300 rounded-full opacity-50"></div>
                    <div className="h-2 w-2 bg-gray-300 rounded-full opacity-50"></div>
                </div>
            </div>

            
        
            {/* Right panel (auth form) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                {children}
                </div>
            </div>
        </div>
    );
};

export default AuthTemplate;