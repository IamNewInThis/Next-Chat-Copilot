import React from 'react';
import ChatList from '@/components/chat/ChatList';
import ChatView from '@/components/chat/ChatView';

export default function ChatPage() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-80 flex-shrink-0">
        <ChatList />
      </div>
      <div className="hidden md:block flex-grow">
        <ChatView />
      </div>
    </div>
  );
}