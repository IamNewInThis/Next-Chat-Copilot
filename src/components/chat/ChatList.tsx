'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchInput from './SearchInput';

const mockChats = [
  {
    id: '1',
    name: 'Design chat',
    lastMessage: 'Jessie Rollins sent a message',
    time: '4m',
    unreadCount: 1,
    image: 'https://ui-avatars.com/api/?name=Design+Chat&background=0D8ABC&color=fff',
  },
  {
    id: '2',
    name: 'Osman Campos',
    lastMessage: 'You: Hey! We are ready...',
    time: '20m',
    unreadCount: 0,
    image: 'https://ui-avatars.com/api/?name=Design+Chat&background=0D8ABC&color=fff',
  },
  {
    id: '3',
    name: 'Jayden Church',
    lastMessage: 'I prepared some vari...',
    time: '1h',
    unreadCount: 0,
    image: 'https://ui-avatars.com/api/?name=Design+Chat&background=0D8ABC&color=fff',
  },
];

const ChatList = () => {
    return (
        <div className="w-1xl text-white h-screen p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">All Chats</h2>
            <SearchInput />
            <ul className="space-y-4">
                {mockChats.map((chat) => (
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
        </div>
    );
};

export default ChatList;
