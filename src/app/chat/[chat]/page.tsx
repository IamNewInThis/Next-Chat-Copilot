import ChatView from '@/components/chat/ChatView';

interface ChatPageProps {
  params: {
    chat: string;
  };
}

export default function ChatIdPage({ params }: ChatPageProps) {
  const { chat: chatId } = params;

  return <ChatView chatId={chatId} />;
}