'use client'

import { ChatInterface } from '@/components/ChatInterface';
import { OnboardingTutorial } from '@/components/OnboardingTutorial';
import { User } from '@/model/UserModel';
import { useState, useEffect } from 'react'

export default function Chatbot() {
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
    <div className="h-screen flex flex-col bg-gray-50">
      {/* h-screen -> toda la altura, flex, en columnas y con fondo gris clarito */}
      {/* Si hay que enseñar el onBoarding se enseña */}
      {showOnboarding && (
        <OnboardingTutorial
          onComplete={handleOnboardingComplete}
        />
      )}

      <main className="flex-1 overflow-hidden">
          <div className="h-full bg-gray-100">
              <ChatInterface/>
          </div>
      </main>
    </div>
  )
}
