 // organisms/RegisterForm.tsx
import React, { useState } from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import Link from 'next/link';

import { CiLock, CiUser, CiMail   } from "react-icons/ci";

interface RegisterFormProps {
    onSubmit: (data: { name: string; email: string; password: string }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
  
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            valid = false;
        }
        
        if (!formData.email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
            valid = false;
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
            valid = false;
        }
        
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (validateForm()) {
        onSubmit({
            name: formData.name,
            email: formData.email,
            password: formData.password
        });
        }
    };

    return (
        <div className="w-full max-w-md">        
            <form onSubmit={handleSubmit}>
                <FormField
                    label="Name"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    icon={<CiUser size={22} color='black' />}
                    error={errors.name}
                />
                
                <FormField
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    icon={<CiMail size={22} color='black'/>}
                    error={errors.email}
                />
                
                <FormField
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Your Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    icon={<CiLock size={22} color='black'/>}
                    error={errors.password}
                />
                
                <div className="mb-6">
                <div className="flex items-center">
                    <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        required
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        I agree to the{' '}
                        <Link href="/terms" className="text-purple-600 hover:text-purple-500">
                            Terms & Conditions
                        </Link>
                    </label>
                </div>
                </div>
                
                <Button type="submit" variant="primary" fullWidth>
                Register
                </Button>
            </form>
            
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-purple-600 hover:text-purple-500 font-medium">
                    Sign in
                </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;