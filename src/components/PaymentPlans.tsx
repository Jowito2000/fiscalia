import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Check, Crown, Zap, Star } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const plans = [
  {
    id: 'free',
    name: 'Gratuito',
    price: '0',
    period: 'Siempre gratis',
    description: 'Perfecto para comenzar',
    icon: Star,
    features: [
      'Hasta 10 facturas al mes',
      'Chat básico con el asistente',
      'Modelos 303 y 130',
      'Almacenamiento: 100 MB',
      'Soporte por email',
    ],
    limitations: [
      'Sin gestión de clientes avanzada',
      'Sin exportación masiva',
      'Sin integraciones',
    ],
    color: 'gray',
    current: true,
  },
  {
    id: 'professional',
    name: 'Profesional',
    price: '19',
    period: 'mes',
    description: 'Para autónomos y freelancers',
    icon: Zap,
    popular: true,
    features: [
      'Facturas ilimitadas',
      'Chat avanzado con voz y documentos',
      'Todos los modelos fiscales',
      'Gestión completa de clientes',
      'Almacenamiento: 5 GB',
      'Exportación masiva PDF',
      'Soporte prioritario',
      'Sin anuncios',
    ],
    color: 'blue',
    current: false,
  },
  {
    id: 'business',
    name: 'Empresas',
    price: '49',
    period: 'mes',
    description: 'Para equipos y empresas',
    icon: Crown,
    features: [
      'Todo lo del plan Profesional',
      'Múltiples usuarios (hasta 5)',
      'Integración con página web',
      'API personalizada',
      'Almacenamiento: 50 GB',
      'Asesoría fiscal básica incluida',
      'Soporte 24/7',
      'Reportes personalizados',
    ],
    color: 'purple',
    current: false,
  },
];

export function PaymentPlans() {
  const [selectedPlan, setSelectedPlan] = useState('free');

  const handleSubscribe = (planId: string) => {
    if (planId === 'free') {
      toast.info('Ya estás usando el plan gratuito');
      return;
    }

    // Aquí se implementaría la integración con pasarela de pago (Stripe, PayPal, etc.)
    toast.info('Funcionalidad de pago próximamente disponible');
  };

  const handleContactSales = () => {
    toast.info('Contacta con ventas en: ventas@fiscal-ia.com');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2>Planes y Precios</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Elige el plan que mejor se adapte a tus necesidades. Todos incluyen actualizaciones
          automáticas y acceso a nuevas funcionalidades.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = plan.current;

          return (
            <Card
              key={plan.id}
              className={`relative ${
                plan.popular ? 'border-blue-500 border-2 shadow-lg' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600">Más Popular</Badge>
                </div>
              )}

              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-lg bg-${plan.color}-100 flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 text-${plan.color}-600`} />
                  </div>
                  {isCurrentPlan && (
                    <Badge variant="secondary" className="text-xs">
                      Plan Actual
                    </Badge>
                  )}
                </div>
                <div>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl">{plan.price}€</span>
                  <span className="text-muted-foreground">/ {plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <Button
                  className="w-full"
                  variant={isCurrentPlan ? 'outline' : plan.popular ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? 'Plan Actual' : plan.id === 'free' ? 'Comenzar Gratis' : 'Actualizar Plan'}
                </Button>

                <div className="space-y-3">
                  <p className="text-sm">Incluye:</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations && plan.limitations.length > 0 && (
                    <>
                      <p className="text-sm text-muted-foreground pt-2">Limitaciones:</p>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="text-sm text-muted-foreground pl-6">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle>¿Necesitas un plan personalizado?</CardTitle>
          <CardDescription>
            Para empresas grandes o necesidades específicas, contacta con nuestro equipo de ventas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="space-y-2">
              <h4>Plan Enterprise</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Usuarios ilimitados</li>
                <li>• Almacenamiento personalizado</li>
                <li>• Integraciones a medida</li>
                <li>• Gestor de cuenta dedicado</li>
              </ul>
            </div>
            <Button onClick={handleContactSales} size="lg">
              Contactar Ventas
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-4 pt-8">
        <h3>Preguntas Frecuentes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">¿Puedo cambiar de plan en cualquier momento?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se
                aplicarán de inmediato.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">¿Qué métodos de pago aceptan?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Aceptamos tarjetas de crédito/débito, PayPal y transferencia bancaria para planes
                anuales.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">¿Hay período de prueba?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sí, todos los planes de pago incluyen 14 días de prueba gratuita sin compromiso.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">¿Los datos están seguros?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Absolutamente. Usamos encriptación de nivel bancario y cumplimos con GDPR y
                normativa española de protección de datos.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
