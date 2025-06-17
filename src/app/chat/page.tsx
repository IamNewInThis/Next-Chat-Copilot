import React from 'react';
import ChatList from '@/components/chat/ChatList';

export default function ChatPage() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-80 flex-shrink-0">
        <ChatList />
      </div>
      <div className="hidden md:flex flex-grow items-center justify-center bg-zinc-800">
        <p className="text-zinc-400">Selecciona un chat para comenzar</p>
      </div>
    </div>
  );
}