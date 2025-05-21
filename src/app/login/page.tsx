// pages/login.tsx
'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams  } from 'next/navigation';
import AuthTemplate from '@/components/login/templates/AuthTemplate';
import LoginForm from '@/components/login/organism/LoginForm';
import { loginWithEmail  } from '@/services/auth'


export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isRegistered = searchParams?.get('registered') === 'true';

    const [, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLoginSubmit = async (data: { email: string; password: string }) => {
        try {
            setIsLoading(true);
            setErrorMessage('');
            
            // Llamar a la función de inicio de sesión
            const { user, error } = await loginWithEmail(
                data.email,
                data.password
            );
            
            if (error) {
                // Mostrar el error
                setErrorMessage(error.message);
                return;
            }
            
            if (user) {
                console.log('Usuario autenticado:', user);
                
                // Redirigir al dashboard
                router.push('/chat');
            }
        } catch (error) {
            console.error('Error inesperado en el login:', error);
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
                <h1 className="text-2xl font-bold text-gray-600">Sign In to Your Account</h1>
                <p className="text-gray-600 mt-2">Welcome back! Please enter your details</p>
            </div>

            {isRegistered && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
                    Registration successful! Please login with your credentials.
                </div>
            )}
                
            {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                    {errorMessage}
                </div>
            )}
        
            <LoginForm onSubmit={handleLoginSubmit} />
        </AuthTemplate>
    );
}