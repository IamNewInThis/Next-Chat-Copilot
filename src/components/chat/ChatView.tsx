'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getUserProfile, subscribeToChat, ChatMessage } from '@/services/chat';
import { getCurrentUser } from '@/services/auth';
import { supabase } from '@/lib/supabaseClient';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';

interface UserProfile {
    id: string;
    name: string;
    avatar_url: string | null;
}

interface ChatData {
    id: string;
    user1_id: string;
    user2_id: string;
}

export default function ChatView() {
    const params = useParams();
    const chatId = params.chat as string; // Extrae el chatId de los parámetros de la URL
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [chatData, setChatData] = useState<ChatData | null>(null);
    const [otherUser, setOtherUser] = useState<UserProfile | null>(null);
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    useEffect(() => {
        async function loadData() {
            try {
                if (!chatId) {
                    setError('Buscando conversación...');
                    setLoading(false);
                    return;
                }
                
                setLoading(true);

                // 1. Obtener el usuario actual
                const loggedInUser = await getCurrentUser();
                if (!loggedInUser) {
                    setError('No se pudo obtener el usuario actual');
                    setLoading(false);
                    return;
                }
                setCurrentUser(loggedInUser);

                // 2. Obtener datos del chat
                const { data: chat, error: chatError } = await supabase
                    .from('chats')
                    .select('id, user1_id, user2_id')
                    .eq('id', chatId)
                    .single();

                if (chatError) {
                    console.error('Error al obtener el chat:', chatError);
                    setError('No se pudo cargar la conversación');
                    setLoading(false);
                    return;
                }

                setChatData(chat);

                // 3. Determinar quién es el otro usuario en la conversación
                const otherUserId = chat.user1_id === loggedInUser.id ? chat.user2_id : chat.user1_id;

                // 4. Obtener el perfil del otro usuario
                const otherUserProfile = await getUserProfile(otherUserId);
                if (!otherUserProfile) {
                    setError('No se pudo cargar el perfil del usuario');
                    setLoading(false);
                    return;
                }

                setOtherUser(otherUserProfile);
                setLoading(false);
            } catch (err) {
                console.error('Error cargando la conversación:', err);
                setError('Ocurrió un error al cargar la conversación');
                setLoading(false);
            }
        }

        loadData();
    }, [chatId]);

    useEffect(() => {
        if (!chatId || !chatData?.id) return;

        const subscription = subscribeToChat(chatId, (payload) => {
            if (payload?.new) {
                setMessages((prev) => {
                    // Evitar duplicados por ID
                    const exists = prev.some((msg) => msg.id === payload.new.id);
                    if (exists) return prev;
                    return [...prev, payload.new];
                });
            }
        });

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [chatId, chatData?.id]);

    if (loading) {
        return (
            <div className="flex flex-col w-full h-screen items-center justify-center bg-zinc-800">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                <p className="mt-4 text-white">Cargando conversación...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col w-full h-screen items-center justify-center bg-zinc-800">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full h-screen">
            <ChatHeader
                name={otherUser?.name || 'Usuario'}
                status={'online'}
                avatar={otherUser?.avatar_url || 'https://ui-avatars.com/api/?name=Usuario&background=0D8ABC&color=fff'}
            />
            <div className="flex-grow overflow-y-auto bg-zinc-800 p-4 scrollbar-custom">
                <MessageList 
                    chatId={chatId} 
                    messages={messages}
                    setMessages={setMessages}
                />
            </div>
            {currentUser && (
                <ChatInput 
                    chatId={chatId} 
                    senderId={currentUser.id} 
                    setMessages={setMessages}
                />
            )}
        </div>
    );
}