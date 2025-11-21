import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Bot, FileText, ImageIcon, Loader2, UserIcon } from 'lucide-react';
import { Card } from './card';
import { Message } from '@/model/MessageModel';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatArea({ messages, isLoading, scrollRef } : ChatAreaProps) {
  return (
    <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'
                  }`}
                >
                  {message.role === 'user' ? (
                    <UserIcon className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="space-y-1">
                  <Card
                    className={`p-3 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-white/20">
                        {message.attachments.map((att, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs">
                            {att.type === 'PDF' ? (
                              <FileText className="w-3 h-3" />
                            ) : (
                              <ImageIcon className="w-3 h-3" />
                            )}
                            <span>{att.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                  {message.sources && message.role === 'assistant' && (
                    <p className="text-xs text-muted-foreground px-3">
                      Fuente: {message.sources.join(', ')}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground px-3">
                    {message.timestamp.toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
      </ScrollArea>
  );
}
