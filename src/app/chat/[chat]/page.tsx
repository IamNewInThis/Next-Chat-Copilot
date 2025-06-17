import React from 'react';
import ChatView from '@/components/chat/ChatView';

interface ChatPageProps {
  params: {
    chat: string;
  }
}

export default function ChatPage({ params }: ChatPageProps) {
  return <ChatView chatId={params.chat} />;
}