import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  Check,
  Calculator
} from 'lucide-react';

interface OnboardingTutorialProps {
  onComplete: () => void;
}

const tutorialSteps = [
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

export function OnboardingTutorial({ onComplete }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = tutorialSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep
                      ? 'bg-blue-600 w-8'
                      : index < currentStep
                      ? 'bg-blue-400'
                      : 'bg-gray-300'
                  } transition-all duration-300`}
                />
              ))}
            </div>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Saltar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon className="w-10 h-10 text-blue-600" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h2>{step.title}</h2>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">{step.details}</p>
              </div>

              {currentStep === tutorialSteps.length - 1 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-900">
                    ¡Todo listo! Ahora puedes comenzar a usar Fiscal IA. Si necesitas ayuda en
                    cualquier momento, usa el chat para hablar con el asistente.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center pt-4">
            <p className="text-sm text-muted-foreground">
              Paso {currentStep + 1} de {tutorialSteps.length}
            </p>
            <Button onClick={handleNext}>
              {currentStep === tutorialSteps.length - 1 ? '¡Comenzar!' : 'Siguiente'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
