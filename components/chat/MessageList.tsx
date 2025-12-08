import { useEffect, useRef } from 'react';
import { MessageItem } from './MessageItem';
import { Card } from '@/components/ui/card';
import { Bot, Loader2 } from 'lucide-react';
import { Message } from '@/model/MessageModel';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  loadMore: () => void;
}

export function MessageList({ messages, isLoading, loadMore }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if ((scrollRef.current?.scrollTop ?? Infinity) < 50) {
      loadMore();
    }
  };

  // Scroll automático
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isLoading]); // se actualiza también cuando carga el loader

  return (
    <div className="flex-1 overflow-y-auto p-4 min-h-0" ref={scrollRef}>
      <div className="space-y-4 max-w-4xl mx-auto">
        {/* Lista de mensajes */}
        {messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} />
        ))}
        {/* Loading “Pensando…” */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-purple-600">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <Card className="p-3 bg-white">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Pensando...</span>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
