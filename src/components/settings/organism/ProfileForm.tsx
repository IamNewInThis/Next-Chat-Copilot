
import React, {useState} from 'react';
import FormField from '../molecules/FormField';
import SettingsSection from '../molecules/SettingsSection';
import Avatar from '../atoms/Avatar';
import { Button } from '../atoms/Button';

interface ProfileFormData {
    name: string;
    email: string;
    phone?: string;
    bio?: string;
    avatarSrc?: string;
}

interface ProfileFormProps {
    initialData?: ProfileFormData;
    onSave?: (data: ProfileFormData) => void;
    isLoading?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
    initialData = {
        name: 'Juan Pérez',
        email: 'juan.perez@email.com',
        phone: '+56 9 1234 5678',
        bio: 'Desarrollador Full Stack apasionado por la tecnología'
    },
    onSave,
    isLoading = false
}) => {
    const [formData, setFormData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleSave = () => {
        onSave?.(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData(initialData);
        setIsEditing(false);
    };

    return (
        <SettingsSection
            title="Información Personal"
            description="Actualiza tu información de perfil"
            avatar={<Avatar src={formData.avatarSrc} alt="Avatar" />}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    label="Nombre completo"
                    id="name"
                    value={formData.name}
                    disabled={!isEditing}
                    required
                    onChange={handleChange('name')}
                />

                <FormField
                    label="Correo electrónico"
                    id="email"
                    type="email"
                    value={formData.email}
                    disabled={!isEditing}
                    required
                    onChange={handleChange('email')}
                />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-zinc-700">
                {isEditing ? (
                    <>
                        <Button onClick={handleSave} disabled={isLoading}>
                            {isLoading ? 'Guardando...' : 'Guardar cambios'}
                        </Button>
                         <Button variant="ghost" onClick={handleCancel} disabled={isLoading}>
                            Cancelar
                        </Button>
                    </>
                ) : (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Editar perfil
                    </Button>
                )}
            </div>
        </SettingsSection>
    );
};

export default ProfileForm;