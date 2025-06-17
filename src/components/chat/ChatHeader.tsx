'use client'

import React from 'react';
import Image from 'next/image';
import { FiMoreVertical } from "react-icons/fi";
import { FaPhone, FaVideo  } from "react-icons/fa";

interface ChatHeaderProps {
  name: string;
  status: string;
  avatar: string;
}

const ChatHeader = ({ name, status, avatar }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between bg-zinc-800 p-4 border-b border-zinc-700">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Image
            src={avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=0D8ABC&color=fff'}
            alt={name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          {status === 'online' && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-800"></span>
          )}
        </div>
        <div>
          <h2 className="font-medium text-white">{name}</h2>
          <p className="text-xs text-zinc-400">
            {status === 'online' ? 'En línea' : 'Último acceso hace 5 minutos'}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-zinc-400 hover:text-white">
          <FaPhone className="h-5 w-5" />
        </button>
        <button className="text-zinc-400 hover:text-white">
          <FaVideo className="h-5 w-5" />
        </button>
        <button className="text-zinc-400 hover:text-white">
          <FiMoreVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;