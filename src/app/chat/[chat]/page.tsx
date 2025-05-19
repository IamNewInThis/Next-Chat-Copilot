import ChatView from '@/components/chat/ChatView';
import ChatList from '@/components/chat/ChatList';

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

export default function ChatIdPage({ params }: ChatPageProps) {
  const { chatId } = params;

  return (
    <div className="flex w-full h-screen">
      <div className="w-80 flex-shrink-0">
        <ChatList />
      </div>
      <div className="flex-grow">
        <ChatView />
      </div>
    </div>
  );
}
