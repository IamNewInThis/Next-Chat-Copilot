'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import { sendMessage } from '@/services/chat';

interface ChatInputProps {
  chatId: string;
  senderId: string;
  setMessages: (messages: any) => void;
}

export default function ChatInput({ chatId, senderId, setMessages }: ChatInputProps) {
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mantener enfoque en el input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!messageText.trim() || isSending) return;
    
    try {
      setIsSending(true);
      
      // Crear un mensaje optimista para actualización inmediata de la UI
      const optimisticMessage = {
        id: `temp-${Date.now()}`,
        chat_id: chatId,
        sender_id: senderId,
        content: messageText,
        is_read: false,
        created_at: new Date().toISOString()
      };
      
      // Actualizar UI inmediatamente
      setMessages((prevMessages: any[]) => [...prevMessages, optimisticMessage]);
      
      // Limpiar input
      setMessageText('');
      
      // Enviar mensaje a la base de datos
      const newMessage = await sendMessage(chatId, senderId, messageText);
      
      if (newMessage) {
        // Reemplazar mensaje optimista con el real
        setMessages((prevMessages: any[]) => 
          prevMessages.map(msg => 
            msg.id === optimisticMessage.id ? newMessage : msg
          )
        );
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 p-4 border-t border-zinc-700">
      <div className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-grow bg-zinc-800 text-white rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          disabled={isSending}
        />
        <button
          type="submit"
          disabled={isSending || !messageText.trim()}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-r-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSending ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando
            </span>
          ) : (
            'Enviar'
          )}
        </button>
      </div>
    </form>
  );
}