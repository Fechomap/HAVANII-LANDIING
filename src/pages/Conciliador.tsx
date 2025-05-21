
import React from 'react';
import { useHomeNavigation } from '@/hooks/useHomeNavigation';
import HomeTransition from '@/components/transitions/HomeTransition';

/**
 * @component Conciliador - Página de Conciliador
 * Página temporal que muestra información sobre el servicio Conciliador
 * Esta página será implementada con detalle en futuros prompts
 */

const Conciliador = () => {
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
        <h1 className="text-4xl font-bold mb-4">Conciliador</h1>
        <p className="text-xl text-text-secondary">Página en construcción</p>
      </div>
    </div>
  );
};

export default Conciliador;
