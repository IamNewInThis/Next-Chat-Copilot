'use client';

import { useState } from 'react';
import { sendMessage } from '@/services/chat';

interface ChatInputProps {
  chatId: string;
  senderId: string;
  setMessages: (msgs: any[]) => void;
}

export default function ChatInput({ chatId, senderId,setMessages }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (!message.trim()) return;

    const res = await sendMessage(chatId, senderId, message);
    if (res) {
      setMessages((prev) => [...prev, res]); // agrega el mensaje al estado
      setMessage('');
    }
  };

  return (
    <div className="flex items-center border-tp-4 bg-zinc-800 p-4">
      <input
        type="text"
        className="flex-grow px-4 py-2 rounded-2xl border border-gray-500 outline-none 
          focus:ring-2 focus:ring-purple-400"
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="ml-3 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600"
      >
        Send
      </button>
    </div>
  );
}
