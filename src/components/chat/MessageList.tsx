import MessageBubble from './MessageBubble';

export default function MessageList() {
  const messages = [
    { id: 1, from: 'other', text: 'Hey guys! Important news!' },
    { id: 2, from: 'me', text: 'Congrats! I will be glad to work with you!' },
  ];

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} from={msg.from} text={msg.text} />
      ))}
    </div>
  );
}
