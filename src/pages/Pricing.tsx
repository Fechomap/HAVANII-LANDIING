
import React from 'react';
import { useHomeNavigation } from '@/hooks/useHomeNavigation';
import HomeTransition from '@/components/transitions/HomeTransition';

/**
 * @component Pricing - Página de Precios
 * Página temporal que muestra información sobre los precios de los servicios
 * Esta página será implementada con detalle en futuros prompts
 */

const Pricing = () => {
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
        <h1 className="text-4xl font-bold mb-4">Precios</h1>
        <p className="text-xl text-text-secondary">Página en construcción</p>
      </div>
    </div>
  );
};

export default Pricing;
