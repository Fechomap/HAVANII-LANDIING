
import React from 'react';
import { useHomeNavigation } from '@/hooks/useHomeNavigation';
import HomeTransition from '@/components/transitions/HomeTransition';

/**
 * @component NeuralCrane - Página de NeuralCrane
 * Página temporal que muestra información sobre el servicio NeuralCrane
 * Esta página será implementada con detalle en futuros prompts
 */

const NeuralCrane = () => {
  // Hook para la navegación a Home con transición
  const { goToHome, isTransitioning, completeTransition } = useHomeNavigation();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-body text-text-primary">
      {/* Componente de transición */}
      <HomeTransition 
        isActive={isTransitioning} 
        onComplete={completeTransition} 
      />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">NeuralCrane</h1>
        <p className="text-xl text-text-secondary">Página en construcción</p>
      </div>
    </div>
  );
};

export default NeuralCrane;
