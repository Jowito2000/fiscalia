import { firstChatMessage } from '@/data/firstChatMessage';
import { Message } from '@/model/MessageModel';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useState, useEffect, useRef } from 'react'
import { toast } from 'sonner';

export function ChatInterface() {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        firstChatMessage
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

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
            // Llamar al LLM con el contexto y demas
            // Recibir la respuesta
            //setMessages((prev) => [...prev, assistantMessage]);

        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Error de conexión con el chat');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

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
            </ScrollArea>
        </div>
    )

}