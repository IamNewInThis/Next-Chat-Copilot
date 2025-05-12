'use client'

import React from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';

export default function ChatView() {
    const currentChat = {
        id: '2',
        name: 'Osman Campos',
        status: 'online',
        avatar: 'https://ui-avatars.com/api/?name=Osman+Campos&background=0D8ABC&color=fff'
    };

  return (
    <div className="flex flex-col w-full h-screen">
        <ChatHeader 
            name={currentChat.name} 
            status={currentChat.status} 
            avatar={currentChat.avatar} 
        />
      
        <div className="flex-grow overflow-y-auto bg-zinc-800 p-4">
            <MessageList />
        </div>
      
        <ChatInput />
    </div>
  );
}