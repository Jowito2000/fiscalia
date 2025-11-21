import { useChat } from '@/hooks/useChat';
import { ChatArea } from './ui/chat-area';
import { ChatInput } from './ui/chat-input';
import { OnboardingTutorial } from '@/components/OnboardingTutorial';
import { User } from '@/model/UserModel';
import { useState, useEffect } from 'react'

export function ChatInterface() {
  const { 
    messages, 
    isLoading,
    isRecording, 
    sendMessage, 
    sendAudio, 
    addAttachment, 
    scrollRef } = useChat();
    const [isAuthenticated, setIsAuthenticated] = useState(false);  // Estado que controla si el usuario está autenticado
  const [showOnboarding, setShowOnboarding] = useState(false); // Estado que controla si se muestra el tutorial de introducción
  const [currentUser, setCurrentUser] = useState<User | null>( 
    null,
  ); // Estado que almacena los datos del usuario actual

  useEffect(() => {
    // Verificar si hay una sesión guardada al cargar la aplicación
    const savedSession = localStorage.getItem('fiscalIASession');
    if (savedSession && !isAuthenticated) {
      try {
        const user = JSON.parse(savedSession);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error al restaurar sesión:', error);
        localStorage.removeItem('fiscalIASession');
      }
    }
  }, []);

  // Función que se ejecuta cuando el usuario completa el tutorial de introducción
  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem("hasSeenOnboarding", "true");
  };

  // Esto se ejecuta cuando cambia el estado de autenticación y al cargar la aplicación por primera vez
  useEffect(() => {
    // Comprobar si el usuario ya ha visto el tutorial de introducción de las variables locales
    const hasSeenOnboarding = localStorage.getItem(
      "hasSeenOnboarding",
    );
    // Si no ha visto el tutorial y está autenticado, mostrar el tutorial
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, [isAuthenticated]);


  return (
    <>
        {/* h-screen -> toda la altura, flex, en columnas y con fondo gris clarito */}
        {/* Si hay que enseñar el onBoarding se enseña */}
        {showOnboarding && (
        <OnboardingTutorial
            onComplete={handleOnboardingComplete}
        />
        )}
        <main className="flex-1 overflow-hidden">
            <div className="flex flex-col h-full bg-gray-100">
                <ChatArea messages={messages} isLoading={isLoading} scrollRef={scrollRef} />
                <div className="border-t bg-white p-4">
                    <ChatInput onSend={sendMessage} isRecording={isRecording} onAudioRecord={sendAudio} onFileUpload={addAttachment} isLoading={isLoading} />
                </div>
            </div>
        </main>
    </>
  );
}