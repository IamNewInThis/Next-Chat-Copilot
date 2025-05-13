import { supabase } from '@/lib/supabaseClient';

export type AuthError = {
    message: string;
    status?: number;
};

export type AuthResponse = {
    user: any | null;
    error: AuthError | null;
};

/**
 * Inicia sesión con email y contraseña
 */
export async function loginWithEmail(email: string, password: string): Promise<AuthResponse> {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        });

        if (error) {
            return {
                user: null,
                error: {
                    message: error.message,
                    status: error.status,
                },
            };
        }

    return {
        user: data.user,
        error: null,
    };
    } catch (error: any) {
        return {
        user: null,
        error: {
                message: error.message || 'Error desconocido en el inicio de sesión',
            },
        };
    } 
}

/**
 * Registra un nuevo usuario con email y contraseña
 */
export async function registerWithEmail(
    email: string, 
    password: string, 
    name: string
): Promise<AuthResponse> {
  try {
    // 1. Registrar el usuario con Supabase Auth
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
            },
        },
    });

    if (error) {
        return {
            user: null,
            error: {
                message: error.message,
                status: error.status,
            },
        };
    }

    // 2. Si el registro es exitoso y tenemos un usuario, crear perfil en la tabla profiles
    if (data.user) {
        const { error: profileError } = await supabase
            .from('profiles')
            .insert({
            id: data.user.id,
            name,
            email,
            created_at: new Date().toISOString(),
            });

        if (profileError) {
            console.error('Error al crear perfil:', profileError);
            // No devuelvo error aquí, porque el usuario ya se creó correctamente en Auth
        }
    }

    return {
        user: data.user,
        error: null,
    };
    } catch (error: any) {
        return {
        user: null,
        error: {
            message: error.message || 'Error desconocido en el registro',
            },
        };
    }
}

/**
 * Cierra la sesión del usuario actual
 */
export async function logout(): Promise<{ error: AuthError | null }> {
    try {
        const { error } = await supabase.auth.signOut();
        
        if (error) {
            return {
                error: {
                message: error.message,
                status: error.status,
                },
            };
        }
        
        return { error: null };
    } catch (error: any) {
        return {
            error: {
                message: error.message || 'Error al cerrar sesión',
            },
        };
    }
}

/**
 * Obtiene el usuario actual
 */
export async function getCurrentUser() {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user || null;
}

/**
 * Verifica si el usuario ha confirmado su email
 */
export async function isEmailConfirmed(userId: string): Promise<boolean> {
    const { data } = await supabase
        .from('users')
        .select('email_confirmed_at')
        .eq('id', userId)
        .single();
    
    return !!data?.email_confirmed_at;
}