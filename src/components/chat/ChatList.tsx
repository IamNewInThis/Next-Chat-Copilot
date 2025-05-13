'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchInput from './SearchInput';
import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/services/auth';

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  image: string;
};

const ChatList = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Cargar el usuario actual
    const loadUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };

    loadUser();
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      if (!currentUser?.id) return;

      try {
        setLoading(true);
        
        // Obtener chats donde el usuario actual es user1_id o user2_id
        const { data: chatsData, error: chatsError } = await supabase
          .from('chats')
          .select(`
            id,
            user1_id,
            user2_id,
            messages!inner(content, created_at, sender_id)
          `)
          .or(`user1_id.eq.${currentUser.id},user2_id.eq.${currentUser.id}`)
          .order('created_at', { foreignTable: 'messages', ascending: false })
          .limit(1, { foreignTable: 'messages' });

        if (chatsError) {
          console.error('Error fetching chats:', chatsError);
          setLoading(false);
          return;
        }

        if (!chatsData || chatsData.length === 0) {
          setChats([]);
          setLoading(false);
          return;
        }

        // Obtener los perfiles de los usuarios para mostrar sus nombres
        const processedChats = await Promise.all(
          chatsData.map(async (chat) => {
            const otherUserId = chat.user1_id === currentUser.id ? chat.user2_id : chat.user1_id;
            
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('name, avatar_url')
              .eq('id', otherUserId)
              .single();

            if (profileError) {
              console.error('Error fetching profile:', profileError);
            }

            // Contar mensajes no leídos
            const { count: unreadCount } = await supabase
              .from('messages')
              .select('id', { count: 'exact', head: true })
              .eq('chat_id', chat.id)
              .eq('is_read', false)
              .neq('sender_id', currentUser.id);

            // Formatear el tiempo
            const lastMessageTime = new Date(chat.messages[0]?.created_at || new Date());
            const now = new Date();
            let formattedTime;
            
            const diffInMinutes = Math.floor((now.getTime() - lastMessageTime.getTime()) / (1000 * 60));
            
            if (diffInMinutes < 60) {
              formattedTime = `${diffInMinutes}m`;
            } else if (diffInMinutes < 24 * 60) {
              formattedTime = `${Math.floor(diffInMinutes / 60)}h`;
            } else {
              formattedTime = `${Math.floor(diffInMinutes / (60 * 24))}d`;
            }

            // Formatear el último mensaje
            let lastMessageContent = chat.messages[0]?.content || 'No hay mensajes';
            if (chat.messages[0]?.sender_id === currentUser.id) {
              lastMessageContent = `You: ${lastMessageContent}`;
            }
            
            if (lastMessageContent && lastMessageContent.length > 25) {
              lastMessageContent = lastMessageContent.substring(0, 25) + '...';
            }

            return {
              id: chat.id,
              name: profileData?.name || 'Usuario',
              lastMessage: lastMessageContent,
              time: formattedTime,
              unreadCount: unreadCount || 0,
              image: profileData?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData?.name || 'Usuario')}&background=0D8ABC&color=fff`,
            };
          })
        );

        setChats(processedChats);
      } catch (error) {
        console.error('Error in fetchChats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.id) {
      fetchChats();

      // Configurar una suscripción en tiempo real para nuevos mensajes
      const messagesSubscription = supabase
        .channel('messages-channel')
        .on('postgres_changes', { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages' 
        }, (payload) => {
          // Actualizar la lista de chats cuando llega un nuevo mensaje
          fetchChats();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(messagesSubscription);
      };
    }
  }, [currentUser?.id]);

  return (
    <div className="w-full text-white h-screen p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">All Chats</h2>
      <SearchInput />
      
      {loading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      ) : chats.length === 0 ? (
        <div className="text-center p-8 text-zinc-400">
          <p>No tienes conversaciones activas.</p>
          <p className="text-sm mt-2">Usa la búsqueda para encontrar usuarios y comenzar a chatear.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {chats.map((chat) => (
            <li key={chat.id}>
              <Link href={`/chat/${chat.id}`} className="flex items-center space-x-4 hover:bg-zinc-700 p-2 rounded-lg transition">
                <Image
                  src={chat.image}
                  alt={chat.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{chat.name}</h3>
                    <span className="text-xs text-zinc-400">{chat.time}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-zinc-400 truncate">{chat.lastMessage}</p>
                    {chat.unreadCount > 0 && (
                      <span className="bg-purple-500 text-xs text-white rounded-full px-2 py-0.5 ml-2">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatList;