// pages/register.tsx
'use client';

import React,{useState} from 'react';
import { useRouter } from 'next/navigation';
import { registerWithEmail } from '@/services/auth'
import AuthTemplate from '@/components/login/templates/AuthTemplate';
import RegisterForm from '@/components/login/organism/RegisterForm';


export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

    const handleRegisterSubmit = async (data: { name: string; email: string; password: string }) => {
        try {
        setIsLoading(true);
        setErrorMessage('');
        
        // Llamar a la función de registro
        const { user, error } = await registerWithEmail(
            data.email,
            data.password,
            data.name
        );
        
        if (error) {
            // Mostrar el error
            setErrorMessage(error.message);
            return;
        }
        
        if (user) {
            console.log('Usuario registrado exitosamente:', user);
            
            // Redirigir al login con mensaje de éxito
            router.push('/login?registered=true');
        }
        } catch (error) {
            console.error('Error inesperado en el registro:', error);
            setErrorMessage('Ocurrió un error inesperado. Por favor, intenta nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthTemplate
            backgroundImage="/images/login_bg.jpg"
            title="Easy to use Dashboard"
            subtitle="Choose the best of product/services and get a bare metal server at the lowest prices."
        >
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-600">Create Your Account</h1>
                <p className="text-gray-600 mt-2">Fill out the form to get started</p>
            </div>

            {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                {errorMessage}
            </div>
            )}
        
            <RegisterForm onSubmit={handleRegisterSubmit} />
        </AuthTemplate>
    );
}