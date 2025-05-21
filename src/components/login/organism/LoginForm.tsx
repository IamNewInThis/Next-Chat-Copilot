// organisms/LoginForm.tsx
import React, { useState } from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import Link from 'next/link';
import { CiLock, CiMail   } from "react-icons/ci";

interface LoginFormProps {
    onSubmit: (data: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
  
    const [errors, setErrors] = useState({
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
        }
        
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (validateForm()) {
        onSubmit({
            email: formData.email,
            password: formData.password
        });
        }
    };

    return (
        <div className="w-full max-w-md">        
            <form onSubmit={handleSubmit}>
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
                
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                        </label>
                    </div>
                    
                    <div className="text-sm">
                        <Link href="/forgot-password" className="text-purple-600 hover:text-purple-500">
                        Forgot your password?
                        </Link>
                    </div>
                </div>
                
                <Button type="submit" variant="primary" fullWidth>
                    Sign In
                </Button>
            </form>
        
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-purple-600 hover:text-purple-500 font-medium">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;