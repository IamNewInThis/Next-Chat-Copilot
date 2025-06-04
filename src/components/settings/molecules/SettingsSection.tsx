import React from 'react';
import { Card } from '../atoms/Card';

interface SettingsSectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    avatar?: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
    title,
    description,
    children,
    avatar
}) => {
    return (
        <Card>
            <div className="flex items-start space-x-3 mb-4">
                {avatar}
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    {description && (
                        <p className="text-sm text-zinc-400 mt-1">{description}</p>
                    )}
                </div>
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </Card>
    );
};

export default SettingsSection ;