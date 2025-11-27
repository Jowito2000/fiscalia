import { useEffect, useState } from 'react';
import { OnboardingTutorial } from '@/components/OnboardingTutorial';
import { ChatInput } from '@/components/chat/ChatInput';
import { MessageList } from '@/components/chat/MessageList';
import { useChat } from '@/hooks/useChat';

export function ChatScreen() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const {
    messages,
    input,
    isLoading,
    isRecording,
    setInput,
    sendMessage,
    uploadFile,
    toggleRecording,
  } = useChat();

  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeen) {
      setShowOnboarding(true);
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="h-full flex flex-col bg-gray-50">

        {/* Onboarding modal */}
        {showOnboarding && (
          <OnboardingTutorial
            onComplete={() => {
              setShowOnboarding(false);
              localStorage.setItem('hasSeenOnboarding', 'true');
            }}
          />
        )}

        {/* Chat */}
        <main className="h-full flex flex-col bg-gray-100">
          {/* Lista de mensajes con scroll propio */}
          <MessageList messages={messages} isLoading={isLoading} />

          {/* Input */}
          <ChatInput
            input={input}
            isLoading={isLoading}
            isRecording={isRecording}
            onInputChange={setInput}
            onSend={sendMessage}
            onFileUpload={uploadFile}
            onToggleRecording={toggleRecording}
          />
        </main>
      </div>
    </div>
  );
}
