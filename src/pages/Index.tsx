/**
 * @component Index - Página principal (Landing) de Havani
 * 
 * Esta página integra todas las secciones de la landing page siguiendo el diseño
 * de la plantilla Pulsar adaptada a Havani. Las secciones se cargarán dinámicamente
 * a medida que se vayan desarrollando con los prompts específicos.
 */

import React, { useEffect } from 'react';
import { useHomeNavigation } from '@/hooks/useHomeNavigation';
import HomeTransition from '@/components/transitions/HomeTransition';

// Importar componentes directamente en lugar de usar lazy loading
import HeroSection from '@/components/sections/Hero/HeroSection';
import ValuePropSection from '@/components/sections/ValueProp/ValuePropSection';
import ProblemSolutionSection from '@/components/sections/ProblemSolution/ProblemSolutionSection';
import ProcessSection from '@/components/sections/Process/ProcessSection';
import FlagshipProductsSection from '@/components/sections/FlagshipProducts/FlagshipProductsSection';
import ServicesSection from '@/components/sections/Services/ServicesSection';
import BenefitsSection from '@/components/sections/Benefits/BenefitsSection';
import StorySection from '@/components/sections/Story/StorySection';
import TestimonialsSection from '@/components/sections/Testimonials/TestimonialsSection';
import ComparisonSection from '@/components/sections/Comparison/ComparisonSection';
import TechnologyStackSection from '@/components/sections/TechnologyStack/TechnologyStackSection';
import FinalCTASection from '@/components/sections/CTA/FinalCTASection';
import FooterSection from '@/components/sections/Footer/FooterSection';

const Index = () => {
  // Hook para la navegación a Home con transición
  const { goToHome, isTransitioning, completeTransition } = useHomeNavigation();
  
  // Forzar la activación de la transición cuando se hace clic en Home
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Home clicked in Index component');
    // Activamos manualmente la transición
    goToHome(e);
  };
  
  // Establecer el color de fondo del cuerpo y otras configuraciones globales
  useEffect(() => {
    // Configurar el fondo negro para toda la página
    document.body.classList.add('bg-bg-body');
    document.body.classList.add('text-text-primary');
    
    // Configurar el título de la página
    document.title = 'Havani - Inteligencia Artificial para Empresas';
    
    // Limpieza al desmontar el componente
    return () => {
      document.body.classList.remove('bg-bg-body');
      document.body.classList.remove('text-text-primary');
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-bg-body text-text-primary">
      {/* Componente de transición */}
      <HomeTransition 
        isActive={isTransitioning} 
        onComplete={completeTransition} 
      />
      
      {/* Botón flotante para pruebas de transición */}
      <button 
        onClick={handleHomeClick}
        className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-[#7B61FF] text-white rounded-full shadow-lg"
      >
        Test Home Transition
      </button>
      
      {/* Sección Hero - Implementada con el prompt específico */}
      <HeroSection onHomeClick={handleHomeClick} />
      
      {/* Sección Propuesta de Valor */}
      <ValuePropSection />
      
      {/* Sección Problema/Solución */}
      <ProblemSolutionSection />
      
      {/* Sección Proceso */}
      <ProcessSection />
      
      {/* Sección Servicios */}
      <ServicesSection />
      
      {/* Sección Beneficios */}
      <BenefitsSection />
      
      {/* Sección Productos Insignia */}
      <FlagshipProductsSection />
      
      {/* Sección Historia */}
      <StorySection />
      
      {/* Sección Testimonios */}
      <TestimonialsSection />
      
      {/* Sección Comparativa */}
      <ComparisonSection />
      
      {/* Sección de Tecnologías */}
      <TechnologyStackSection />
      
      {/* SECCIÓN CTA FINAL */}
      <FinalCTASection />
      
      {/* Footer */}
      <FooterSection />
      
      {/* Aquí se añadirán el resto de secciones específicas */}
      {/* Sección Características */}
      {/* Sección Precios */}
      {/* Sección FAQ */}
      {/* Sección CTA */}
      {/* Sección Equipo */}
      {/* Sección Blog */}
      {/* Sección Footer */}
    </div>
  );
};

export default Index;
