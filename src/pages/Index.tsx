/**
 * @component Index - Página principal (Landing) de Havani
 * 
 * Esta página integra todas las secciones de la landing page siguiendo el diseño
 * de la plantilla Pulsar adaptada a Havani. Las secciones se cargarán dinámicamente
 * a medida que se vayan desarrollando con los prompts específicos.
 */

import React, { useEffect, lazy, Suspense, useState } from 'react';
import { useIntersection } from '@/hooks/useIntersection';
import { useHomeNavigation } from '@/hooks/useHomeNavigation';
import HomeTransition from '@/components/transitions/HomeTransition';

const HeroSection = lazy(() => import('@/components/sections/Hero/HeroSection'));
const ValuePropSection = lazy(() => import('@/components/sections/ValueProp/ValuePropSection'));
const ProblemSolutionSection = lazy(() => import('@/components/sections/ProblemSolution/ProblemSolutionSection'));
const ProcessSection = lazy(() => import('@/components/sections/Process/ProcessSection'));
const FlagshipProductsSection = lazy(() => import('@/components/sections/FlagshipProducts/FlagshipProductsSection'));
const ServicesSection = lazy(() => import('@/components/sections/Services/ServicesSection'));
const BenefitsSection = lazy(() => import('@/components/sections/Benefits/BenefitsSection'));
const StorySection = lazy(() => import('@/components/sections/Story/StorySection'));
const TestimonialsSection = lazy(() => import('@/components/sections/Testimonials/TestimonialsSection'));
const ComparisonSection = lazy(() => import('@/components/sections/Comparison/ComparisonSection'));
const TechnologyStackSection = lazy(() => import('@/components/sections/TechnologyStack/TechnologyStackSection'));
const FinalCTASection = lazy(() => import('@/components/sections/CTA/FinalCTASection'));
const FooterSection = lazy(() => import('@/components/sections/Footer/FooterSection'));

/**
 * Fallback spinner used during lazy loading
 */
const SpinnerFallback = ({ height }: { height: string }) => (
  <div
    style={{ minHeight: height }}
    className="flex items-center justify-center w-full"
  >
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#7B61FF]" />
  </div>
);

interface LazySectionProps {
  Component: React.LazyExoticComponent<React.ComponentType<Record<string, unknown>>>;
  height?: string;
  immediate?: boolean;
}

const LazySection = ({ Component, height = '50vh', immediate = false }: LazySectionProps) => {
  const [visible, setVisible] = useState(immediate);
  const ref = useIntersection(() => setVisible(true));
  const fallback = <SpinnerFallback height={height} />;

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      {visible ? (
        <Suspense fallback={fallback}>
          <Component />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};

const Index = () => {
  // Hook para la navegación a Home con transición
  const { isTransitioning, completeTransition } = useHomeNavigation();
  
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
      {/* Sección Hero - Implementada con el prompt específico */}
      <LazySection Component={HeroSection} height="100vh" immediate />
      
      {/* Sección Propuesta de Valor */}
      <LazySection Component={ValuePropSection} />
      
      {/* Sección Problema/Solución */}
      <LazySection Component={ProblemSolutionSection} />
      
      {/* Sección Proceso */}
      <LazySection Component={ProcessSection} />
      
      {/* Sección Servicios */}
      <LazySection Component={ServicesSection} />
      
      {/* Sección Beneficios */}
      <LazySection Component={BenefitsSection} />
      
      {/* Sección Productos Insignia */}
      <LazySection Component={FlagshipProductsSection} />
      
      {/* Sección Historia */}
      <LazySection Component={StorySection} />
      
      {/* Sección Testimonios */}
      <LazySection Component={TestimonialsSection} />
      
      {/* Sección Comparativa */}
      <LazySection Component={ComparisonSection} />
      
      {/* Sección de Tecnologías */}
      <LazySection Component={TechnologyStackSection} />
      
      {/* SECCIÓN CTA FINAL */}
      <LazySection Component={FinalCTASection} />
      
      {/* Footer */}
      <LazySection Component={FooterSection} />
      
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
