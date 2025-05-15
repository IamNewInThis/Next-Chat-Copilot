'use client';

import MessageBubble from './MessageBubble';
import { useEffect, useState } from 'react';
import { getChatMessages } from '@/services/chat';
import { getCurrentUser } from '@/services/auth';

interface MessageListProps {
  chatId: string;
  messages: any[];
  setMessages: (messages: any[]) => void;
}

export default function MessageList({ chatId, messages, setMessages }: MessageListProps) {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);

      const msgs = await getChatMessages(chatId);
      setMessages(msgs);
    };

    if (chatId) load();
  }, [chatId]);
  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          from={msg.sender_id === currentUser?.id ? 'me' : 'other'}
          text={msg.content}
        />
      ))}
    </div>
  );
}
