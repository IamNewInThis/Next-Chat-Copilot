'use client';

import MessageBubble from './MessageBubble';
import { useEffect, useState, useRef } from 'react';
import { getChatMessages, ChatMessage } from '@/services/chat';
import { getCurrentUser } from '@/services/auth';


interface MessageListProps {
  chatId: string;
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
}

export default function MessageList({ chatId, messages, setMessages }: MessageListProps) {
  const [currentUser, setCurrentUser] = useState<{ id: string } | null>(null);
  // Referencia para desplazamiento automático al último mensaje
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Efecto para cargar mensajes y usuario actual
  useEffect(() => {
    const load = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);

      const msgs = await getChatMessages(chatId);
      setMessages(msgs);
    };

    if (chatId) load();
  }, [chatId, setMessages]);
  
  // Efecto para desplazamiento automático cuando hay nuevos mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Función para desplazarse al final de los mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Ordenar mensajes por fecha para asegurar el orden cronológico
  const sortedMessages = [...messages].sort((a, b) => 
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  return (
    <div className="space-y-4 ">
      {sortedMessages.map((msg) => (
        <MessageBubble
          key={msg.id}
          from={msg.sender_id === currentUser?.id ? 'me' : 'other'}
          text={msg.content}
        />
      ))}
      {/* Este div invisible sirve como referencia para el auto-scroll */}
      <div ref={messagesEndRef} />
    </div>
  );
}