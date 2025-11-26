import { Bot, FileText, ImageIcon, UserIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Message } from '@/model/MessageModel';

interface Props {
  message: Message;
}

export function MessageItem({ message }: Props) {
  return (
    <div
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`flex items-start space-x-2 max-w-[80%] ${
          message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
        }`}
      >
        {/* Avatar */}
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

        {/* Contenido */}
        <div className="space-y-1">
          <Card
            className={`p-3 ${
              message.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-white border-gray-200'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>

            {/* Adjuntos */}
            {message.attachments?.length ? (
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
            ) : null}
          </Card>

          {/* Fuentes (solo assistant) */}
          {message.sources && message.role === 'assistant' && (
            <p className="text-xs text-muted-foreground px-3">
              Fuente: {message.sources.join(', ')}
            </p>
          )}

          {/* Hora */}
          <p className="text-xs text-muted-foreground px-3">
            {message.timestamp.toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
