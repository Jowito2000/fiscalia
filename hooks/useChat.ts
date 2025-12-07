import { useState } from 'react';
import { toast } from 'sonner';
import { Attachment, AttachmentSchema, FileType, FileTypes, Message } from '@/model/MessageModel';
import { firstChatMessage } from '@/data/firstChatMessage';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    firstChatMessage
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // ----------- Enviar mensaje de texto ----------
  const sendMessage = async () => {
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
      // Simulación de backend real
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(error);
      toast.error('Error de conexión con el chat');
    } finally {
      setIsLoading(false);
    }
  };

  // ----------- Subida de archivo ----------
  const uploadFile = (file: File) => {
    const fileType: FileType =
      file.type.includes("pdf") ? "PDF"
      : file.type.includes("image") ? "Imagen"
      : "Documento";

    toast.success(`${fileType} "${file.name}" cargado. Procesando...`);

    const attachment: Attachment = {
      type: fileType,
      name: file.name,
    };

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `He adjuntado un archivo: ${file.name}`,
      timestamp: new Date(),
      attachments: [attachment],
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

  // ----------- Grabación de voz ----------
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast.info('Grabación de voz detenida');
    } else {
      setIsRecording(true);
      toast.info('Grabación de voz iniciada');
    }
  };

  return {
    messages,
    input,
    isLoading,
    isRecording,
    setInput,
    sendMessage,
    uploadFile,
    toggleRecording,
  };
}
