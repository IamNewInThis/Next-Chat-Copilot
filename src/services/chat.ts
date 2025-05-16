import { supabase } from '@/lib/supabaseClient';

export type ChatUser = {
    id: string;
    name: string;
    avatar_url: string | null;
};

export type ChatMessage = {
    id: string;
    content: string;
    sender_id: string;
    created_at: string;
    is_read: boolean;
};

export type ChatData = {
    id: string;
    user1_id: string;
    user2_id: string;
    created_at: string;
};

/**
 * Busca usuarios por nombre
 */
export async function searchUsers(query: string, currentUserId?: string): Promise<ChatUser[]> {
    if (!query || query.length < 2) return [];

    const { data, error } = await supabase
        .from('profiles')
        .select('id, name, avatar_url')
        .ilike('name', `%${query}%`)
        .limit(10);

    if (error) {
        console.error('Error searching users:', error);
        return [];
    }

    // Si hay un currentUserId, filtramos para no incluirlo en los resultados
    return currentUserId
        ? data?.filter(user => user.id !== currentUserId) || []
        : data || [];
}

/**
 * Crea un chat entre dos usuarios o devuelve el ID si ya existe
 */
export async function createOrGetChat(userId1: string, userId2: string): Promise<string | null> {
    try {
        // Primero verificamos si ya existe un chat entre estos usuarios
        const { data: existingChat, error: searchError } = await supabase
            .from('chats')
            .select('id')
            .or(`user1_id.eq.${userId1},user2_id.eq.${userId1}`)
            .or(`user1_id.eq.${userId2},user2_id.eq.${userId2}`)
            .limit(1);

        if (searchError) {
            console.error('Error checking existing chat:', searchError);
            return null;
        }

        // Si ya existe un chat, retornamos su ID
        if (existingChat && existingChat.length > 0) {
            return existingChat[0].id;
        }

        // Si no existe, creamos un nuevo chat
        const { data, error } = await supabase
            .from('chats')
            .insert([
                {
                    user1_id: userId1,
                    user2_id: userId2,
                    created_at: new Date().toISOString()
                }
            ])
            .select('id')
            .single();

        if (error) {
            console.error('Error creating chat:', error);
            return null;
        }

        return data?.id || null;
    } catch (error) {
        console.error('Error in createOrGetChat:', error);
        return null;
    }
}

/**
 * Obtiene los chats de un usuario
 */
export async function getUserChats(userId: string) {
    try {
        const { data, error } = await supabase
            .from('chats')
            .select(`
        id,
        user1_id,
        user2_id,
        created_at,
        messages(id, content, sender_id, created_at, is_read)
      `)
            .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching user chats:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error in getUserChats:', error);
        return [];
    }
}

/**
 * Envía un mensaje en un chat
 */
export async function sendMessage(chatId: string, senderId: string, content: string) {
    try {
        const { data, error } = await supabase
            .from('messages')
            .insert([
                {
                    chat_id: chatId,
                    sender_id: senderId,
                    content,
                    is_read: false,
                    created_at: new Date().toISOString()
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Error sending message:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error in sendMessage:', error);
        return null;
    }
}

/**
 * Obtiene los mensajes de un chat
 */
export async function getChatMessages(chatId: string) {
    try {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('chat_id', chatId)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching chat messages:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error in getChatMessages:', error);
        return [];
    }
}


/**
 * Suscribe a cambios en tiempo real en un chat
 */
export function subscribeToChat(chatId: string, callback: (payload: any) => void) {
    const subscription = supabase
        .channel(`chat:${chatId}`)
        .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `chat_id=eq.${chatId}`
        }, callback)
        .subscribe();

    return subscription;
}


/**
 * Obtiene un chat por ID
 */
export async function getChatById(chatId: string) {
    try {
        const { data, error } = await supabase
            .from('chats')
            .select(`
        id,
        user1_id,
        user2_id,
        created_at
      `)
            .eq('id', chatId)
            .single();

        if (error) {
            console.error('Error fetching chat:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error in getChatById:', error);
        return null;
    }
}


/**
 * Obtiene el perfil de un usuario
 */
export async function getUserProfile(userId: string) {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('id, name, avatar_url')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error in getUserProfile:', error);
        return null;
    }
}

/**
 * Marca los mensajes de un chat como leídos
 */
export async function markMessagesAsRead(chatId: string, userId: string) {
    try {
        const { error } = await supabase
            .from('messages')
            .update({ is_read: true })
            .eq('chat_id', chatId)
            .neq('sender_id', userId)
            .eq('is_read', false);

        if (error) {
            console.error('Error marking messages as read:', error);
        }
    } catch (error) {
        console.error('Error in markMessagesAsRead:', error);
    }
}

/**
 * Formatea la hora de un mensaje
 */
export function formatMessageTime(dateString: string): string {
    const messageDate = new Date(dateString);
    const now = new Date();

    const diffInMinutes = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) {
        return 'Ahora';
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes}m`;
    } else if (diffInMinutes < 24 * 60) {
        return `${Math.floor(diffInMinutes / 60)}h`;
    } else {
        return `${Math.floor(diffInMinutes / (60 * 24))}d`;
    }
}