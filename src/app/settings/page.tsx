'use client';
import React from 'react';
import ProfileHeader from '@/components/settings/molecules/ProfileHeader';
import ProfileForm from '@/components/settings/organism/ProfileForm';

export default function SettingsPage() {
    const userData = {
        name: 'Juan Pérez',
        email: 'juan.perez@email.com',
        phone: '+56 9 1234 5678',
        bio: 'Desarrollador Full Stack apasionado por la tecnología',
        avatarSrc: 'https://ui-avatars.com/api/?name=Juan+Perez&background=7C3AED&color=fff&size=200'
    };

    // Handlers para las acciones (por ahora solo console.log)
    const handleEditAvatar = () => {
        console.log('Editar avatar');
    };

    const handleEditProfile = () => {
        console.log('Editar perfil');
    };

    const handleSaveProfile = (data: any) => {
        console.log('Guardar perfil:', data);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Configuración</h1>
                <p className="text-zinc-400">Administra tu cuenta y preferencias</p>
            </div>

            <div className="space-y-6">
                <ProfileForm
                    initialData={userData}
                    onSave={handleSaveProfile}
                />

            </div>

        </div>
    );
}
