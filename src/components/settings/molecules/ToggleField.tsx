import React from 'react';
import { Label } from '../atoms/Label';

interface ToggleFieldProps {
    label: string;
    description?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

const ToggleField: React.FC<ToggleFieldProps> = ({
    label,
    description,
    checked,
    onChange,
    disabled = false
}) => {
    return (
        <div className="flex items-start justify-between">
            <div className="flex-1">
                <Label>{label}</Label>
                {description && (
                    <p className="text-sm text-zinc-400 mt-1">{description}</p>
                )}
            </div>
            <div className="ml-4">
                <button
                    type="button"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900 ${checked ? 'bg-purple-600' : 'bg-zinc-600'
                        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => !disabled && onChange(!checked)}
                    disabled={disabled}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'
                            }`}
                    />
                </button>
            </div>
        </div>
    );
};

export { ToggleField };