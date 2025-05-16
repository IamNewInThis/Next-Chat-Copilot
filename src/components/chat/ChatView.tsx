'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getChatById, getUserProfile, subscribeToChat } from '@/services/chat';
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
export default function ChatView() {
    const { chatId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [chatData, setChatData] = useState<ChatData | null>(null);
    const [otherUser, setOtherUser] = useState<UserProfile | null>(null);
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        async function loadData() {
            try {
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
                    .eq('id', "e302f2ec-d19e-47e8-ac75-bcb3afad8daf")
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
        if (!chatData?.id) return;
    
        const subscription = subscribeToChat(chatData.id, (payload) => {
            if (payload?.new) {
                setMessages((prev) => [...prev, payload.new]);
            }
        });
    
        return () => {
            supabase.removeChannel(subscription);
        };
    }, [chatData?.id]);
    

    if (loading) {
        return (
            <div className="flex flex-col w-full h-screen items-center justify-center bg-zinc-800">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                <p className="mt-4 text-white">Cargando conversación...</p>
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
            <div className="flex-grow overflow-y-auto bg-zinc-800 p-4">
                <MessageList 
                    chatId={"e302f2ec-d19e-47e8-ac75-bcb3afad8daf"} 
                    messages={messages}
                    setMessages={setMessages}
                />
            </div>
            {currentUser && (
                <ChatInput 
                    chatId={"e302f2ec-d19e-47e8-ac75-bcb3afad8daf"} 
                    senderId={currentUser.id} 
                    setMessages={setMessages}
                />
            )}
        </div>
    );
}
