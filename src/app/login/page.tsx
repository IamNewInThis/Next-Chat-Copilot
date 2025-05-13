// pages/login.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AuthTemplate from '@/components/login/templates/AuthTemplate';
import LoginForm from '@/components/login/organism/LoginForm';

export default function LoginPage() {
    const router = useRouter();

    const handleLoginSubmit = async (data: { email: string; password: string }) => {
        console.log('Login data:', data);
    };

    return (
        <AuthTemplate
            backgroundImage="/images/login_bg.png"
            title="Easy to use Dashboard"
            subtitle="Choose the best of product/services and get a bare metal server at the lowest prices."
        >
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-600">Sign In to Your Account</h1>
                <p className="text-gray-600 mt-2">Welcome back! Please enter your details</p>
            </div>
        
            <LoginForm onSubmit={handleLoginSubmit} />
        </AuthTemplate>
    );
}