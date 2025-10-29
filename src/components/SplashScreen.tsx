import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, FileText, Calculator, Shield } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center z-50">
      <div className="text-center space-y-8 px-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center space-x-2"
        >
          <Calculator className="w-16 h-16 text-white" />
          <h1 className="text-white text-6xl">Fiscal IA</h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-white/90 text-xl max-w-md mx-auto"
        >
          Tu asistente inteligente para gestión financiera y fiscal
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center space-x-8 mt-12"
        >
          <div className="text-white/80 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">Facturas</p>
          </div>
          <div className="text-white/80 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">Impuestos</p>
          </div>
          <div className="text-white/80 text-center">
            <Shield className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">Seguro</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="w-64 mx-auto mt-16"
        >
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-white/60 text-sm mt-2">Cargando...</p>
        </motion.div>
      </div>
    </div>
  );
}
