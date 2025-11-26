import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Paperclip, Send } from 'lucide-react';

interface Props {
  input: string;
  isLoading: boolean;
  isRecording: boolean;
  onInputChange: (v: string) => void;
  onSend: () => void;
  onToggleRecording: () => void;
  onFileUpload: (file: File) => void;
}

export function ChatInput({
  input,
  isLoading,
  isRecording,
  onInputChange,
  onSend,
  onToggleRecording,
  onFileUpload,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileUpload(file);
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="max-w-4xl mx-auto space-y-2">
        <div className="flex items-center space-x-2">
          {/* Input file oculto */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileChange}
          />

          {/* Botón adjuntar */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="w-4 h-4" />
          </Button>

          {/* Grabación */}
          <Button
            variant="outline"
            size="icon"
            onClick={onToggleRecording}
            className={isRecording ? 'bg-red-100 border-red-300' : ''}
          >
            {isRecording ? (
              <MicOff className="w-4 h-4 text-red-600" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </Button>

          {/* Input */}
          <Input
            placeholder="Escribe tu pregunta sobre finanzas, impuestos, facturas..."
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSend()}
            disabled={isLoading}
            className="flex-1"
          />

          {/* Enviar */}
          <Button onClick={onSend} disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          El asistente puede responder sobre nomenclatura fiscal, IRPF, IVA, modelos 130, 303 y más.
        </p>
      </div>
    </div>
  );
}
