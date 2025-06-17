import React from 'react';
import ChatView from '@/components/chat/ChatView';

interface ChatPageProps {
  params: {
    chat: string;
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  // Desestructuramos el parámetro usando await
  const { chat: chatId } = await params;
  return <ChatView chatId={chatId} />;
}