// Se define un tipo que contiene todo los datos de un usuario 
export interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
  userType: string; // e.g., "free", "premium"
  accessToken: string; // Token de acceso para autenticación
}