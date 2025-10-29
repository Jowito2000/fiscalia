import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { 
  Send, 
  Mic, 
  MicOff, 
  Paperclip, 
  Image as ImageIcon, 
  FileText, 
  Bot,
  User as UserIcon,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: { type: string; name: string }[];
  sources?: string[];
}

interface ChatInterfaceProps {
  userId: string;
  accessToken: string;
}

export function ChatInterface({ userId, accessToken }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        '¡Hola! Soy tu asistente de Fiscal IA. Puedo ayudarte con dudas sobre finanzas, impuestos, facturación y modelos fiscales. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
      sources: ['Sistema Fiscal IA'],
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ba59f8f5/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            message: input,
            chatHistory: messages.map((m) => ({ role: m.role, content: m.content })),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
          sources: data.sources || ['Base de conocimientos Fiscal IA'],
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        toast.error(data.error || 'Error al obtener respuesta');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Error de conexión con el chat');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast.info('Grabación de voz detenida');
      // Aquí se implementaría la transcripción de voz
    } else {
      setIsRecording(true);
      toast.info('Grabación de voz iniciada');
      // Aquí se iniciaría la grabación de voz
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const fileType = file.type.includes('pdf')
      ? 'PDF'
      : file.type.includes('image')
      ? 'Imagen'
      : 'Documento';

    toast.success(`${fileType} "${file.name}" cargado. Procesando...`);

    // Aquí se implementaría la carga y procesamiento del archivo
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `He adjuntado un archivo: ${file.name}`,
      timestamp: new Date(),
      attachments: [{ type: fileType, name: file.name }],
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `He recibido tu ${fileType.toLowerCase()}. ¿Qué información necesitas extraer de este documento?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
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
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
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
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-purple-600">
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

      <div className="border-t bg-white p-4">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center space-x-2">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileUpload}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              title="Adjuntar archivo (PDF o imagen)"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleVoiceRecording}
              className={isRecording ? 'bg-red-100 border-red-300' : ''}
              title="Grabación de voz"
            >
              {isRecording ? (
                <MicOff className="w-4 h-4 text-red-600" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </Button>
            <Input
              placeholder="Escribe tu pregunta sobre finanzas, impuestos, facturas..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            El asistente puede responder sobre nomenclatura fiscal, IRPF, IVA, modelos 130, 303 y
            más.
          </p>
        </div>
      </div>
    </div>
  );
}
