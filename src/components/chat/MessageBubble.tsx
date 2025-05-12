interface Props {
  from: 'me' | 'other';
  text: string;
}

export default function MessageBubble({ from, text }: Props) {
  const isMe = from === 'me';
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs px-4 py-2 rounded-xl ${isMe ? 'bg-purple-500 text-white' : 'bg-white text-black border'}`}>
        {text}
      </div>
    </div>
  );
}
