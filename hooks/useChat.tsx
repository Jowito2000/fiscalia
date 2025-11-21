import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Message } from '@/model/MessageModel';
import { firstChatMessage } from '@/data/firstChatMessage';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([firstChatMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
    //   const assistantMessage = await sendMessageToLLM([...messages, userMessage]);
    //   setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast.error('Error de conexión con el chat');
    } finally {
      setIsLoading(false);
    }
  };

  const sendAudio = async (text: string) => {
    if (isRecording) {
      setIsRecording(false);
      toast.info('Grabación de voz detenida');
      // Aquí se implementaría la transcripción de voz
    } else {
      setIsRecording(true);
      toast.info('Grabación de voz iniciada');
      // Aquí se iniciaría la grabación de voz
    }
  }

  const addAttachment = (file: File) => {
    
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return { messages, isLoading, isRecording, sendMessage, sendAudio, addAttachment, scrollRef };
}
