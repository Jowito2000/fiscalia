'use client'
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
        setShowSplash(false);
      } catch (error) {
        console.error('Error al restaurar sesión:', error);
        localStorage.removeItem('fiscalIASession');
      }
    }
  }, []);



  // Esto se ejecuta cuando cambia el estado de autenticación y al cargar la aplicación por primera vez
  useEffect(() => {
    // Comprobar si el usuario ya ha visto el tutorial de introducción de las variables locales
    const hasSeenOnboarding = localStorage.getItem(
      "hasSeenOnboarding",
    );
    // Si no ha visto el tutorial y está autenticado, mostrar el tutorial
    if (!hasSeenOnboarding && isAuthenticated) {
      setShowOnboarding(true);
    }
  }, [isAuthenticated]);
  
  return (
    <div>
      <h1>Welcome to the Chatbot screen</h1>
    </div>
  );
}
