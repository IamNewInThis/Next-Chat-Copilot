// pages/register.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AuthTemplate from '@/components/login/templates/AuthTemplate';
import RegisterForm from '@/components/login/organism/RegisterForm';

export default function RegisterPage() {
  const router = useRouter();

    const handleRegisterSubmit = async (data: { name: string; email: string; password: string }) => {
        try {
        console.log('Register attempt with:', data);
        // Here you would typically make an API call to your registration endpoint
        // const response = await fetch('/api/auth/register', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data)
        // });
        
        // if (response.ok) {
        //   router.push('/login?registered=true');
        // } else {
        //   // Handle registration errors
        // }
        
        // For now, let's just simulate a successful registration
        setTimeout(() => {
            router.push('/login?registered=true');
        }, 1000);
        } catch (error) {
        console.error('Registration error:', error);
        }
    };

    return (
        <AuthTemplate
            backgroundImage="/images/login_bg.png"
            title="Easy to use Dashboard"
            subtitle="Choose the best of product/services and get a bare metal server at the lowest prices."
        >
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-600">Create Your Account</h1>
                <p className="text-gray-600 mt-2">Fill out the form to get started</p>
            </div>
        
            <RegisterForm onSubmit={handleRegisterSubmit} />
        </AuthTemplate>
    );
}