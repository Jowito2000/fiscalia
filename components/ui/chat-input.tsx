import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './button';
import { Mic, MicOff, Paperclip, Send } from 'lucide-react';
import { Input } from './input';

interface ChatInputProps {
  onSend: (message: string) => void;
  isRecording: boolean;
  onAudioRecord: (audio: string) => void;
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isRecording, onAudioRecord, onFileUpload, isLoading } : ChatInputProps) {
  const [input, setInput] = useState('');
  const [recording, setRecording] = useState('');

  const handleSend = () => {
    onSend(input);
    setInput('');
  };

  const handleRecording = () => {
    onAudioRecord(recording);
  };
    
  return (
    <div className="max-w-4xl mx-auto space-y-2">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {}}
          title="Adjuntar archivo (PDF o imagen)"
        >
          <Paperclip className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRecording}
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
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
          className="flex-1"
        />
        <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        El asistente puede responder sobre nomenclatura fiscal, IRPF, IVA, modelos 130, 303 y
        más.
      </p>
    </div>
  )
}
