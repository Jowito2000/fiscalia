import { Message } from '@/model/MessageModel';

export const firstChatMessage : Message = {
    id: '1',
    role: 'assistant',
    content:
        '¡Hola! Soy tu asistente de Fiscal IA. Puedo ayudarte con dudas sobre finanzas, impuestos, facturación y modelos fiscales. ¿En qué puedo ayudarte hoy?',
    timestamp: new Date(),
    sources: ['Sistema Fiscal IA'],
}