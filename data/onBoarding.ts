import { 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Calculator
} from 'lucide-react';

export const tutorialSteps = [
  {
    icon: Calculator,
    title: 'Bienvenido a Fiscal IA',
    description: 'Tu asistente virtual inteligente para gestión financiera y fiscal',
    details: 'Vamos a mostrarte cómo aprovechar al máximo todas las funcionalidades.',
  },
  {
    icon: MessageSquare,
    title: 'Chat Inteligente',
    description: 'Pregunta cualquier duda sobre finanzas, impuestos y facturación',
    details: 'El chat entiende texto y voz, y puede analizar documentos PDF e imágenes.',
  },
  {
    icon: FileText,
    title: 'Generador de Facturas',
    description: 'Crea facturas profesionales en segundos',
    details: 'Auto-rellena tus datos y los de tus clientes. Calcula IVA e IRPF automáticamente.',
  },
  {
    icon: TrendingUp,
    title: 'Modelos Fiscales',
    description: 'Completa modelos 303, 130 y más con ayuda paso a paso',
    details: 'El asistente te guía para rellenar correctamente todos los campos necesarios.',
  },
  {
    icon: Users,
    title: 'Gestión de Clientes',
    description: 'Organiza la información de tus clientes y empresas',
    details: 'Guarda datos fiscales, direcciones y evita duplicados con desplegables inteligentes.',
  },
];

export const tutorialEndMessage = "¡Todo listo! Ahora puedes comenzar a usar Fiscal IA. Si necesitas ayuda en cualquier momento, usa el chat para hablar con el asistente."