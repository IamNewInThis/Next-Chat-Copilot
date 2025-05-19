'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/services/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuthAndRedirect() {
      try {
        const user = await getCurrentUser();
        
        if (user) {
          // Si el usuario está autenticado, redirigir a la página de chat
          router.push('/chat');
        } else {
          // Si no está autenticado, redirigir a login
          router.push('/login');
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        router.push('/login');
      }
    }

    checkAuthAndRedirect();
  }, [router]);

}