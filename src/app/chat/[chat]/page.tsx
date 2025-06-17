import React from 'react';
import ChatView from '@/components/chat/ChatView';

interface ChatPageProps {
  params: Promise<{ chat: string }> ;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chat: chatId } = await params;
  return <ChatView chatId={chatId} />;
}