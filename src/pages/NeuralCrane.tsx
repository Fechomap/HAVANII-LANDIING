import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHomeNavigation } from '@/hooks/useHomeNavigation';
import HomeTransition from '@/components/transitions/HomeTransition';

// Componentes UI base de Havani
import FooterSection from '@/components/sections/Footer/FooterSection';
import Header from '@/components/sections/Hero/Header';

// Importación directa de secciones (sin lazy loading)
import HeroSection from '@/components/sections/NeuralCrane/HeroSection';
import AboutSection from '@/components/sections/NeuralCrane/AboutSection';
import FeaturesSection from '@/components/sections/NeuralCrane/FeaturesSection';
import BenefitsSection from '@/components/sections/NeuralCrane/BenefitsSection';
import TestimonialsSection from '@/components/sections/NeuralCrane/TestimonialsSection';
import PricingSection from '@/components/sections/NeuralCrane/PricingSection';
import FaqSection from '@/components/sections/NeuralCrane/FaqSection';
import CTASection from '@/components/sections/NeuralCrane/CTASection';
import AIComparisonSection from '@/components/sections/NeuralCrane/AIComparisonSection';
import AboutUsSection from '@/components/sections/NeuralCrane/AboutUsSection';
import ResourcesSection from '@/components/sections/NeuralCrane/ResourcesSection';
import EfficiencyAndSecuritySection from '@/components/sections/NeuralCrane/EfficiencyAndSecuritySection';
import PersonalizationSection from '@/components/sections/NeuralCrane/PersonalizationSection';
import TechnicalDetailsSection from '@/components/sections/NeuralCrane/TechnicalDetailsSection';

const NeuralCrane = () => {
  // Hook para la navegación a Home con transición
  const { goToHome, isTransitioning, completeTransition } = useHomeNavigation();
  
  // Estado para el scroll del header
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Detectar scroll para el header
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Establecer el título de la página y el fondo
  useEffect(() => {
    document.title = 'NeuralCrane | Havani - Gestión Inteligente de Grúas en Tiempo Real';
    document.body.classList.add('bg-bg-body');
    document.body.classList.add('text-text-primary');
    
    // Limpiar al desmontar
    return () => {
      document.body.classList.remove('bg-bg-body');
      document.body.classList.remove('text-text-primary');
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-bg-body text-text-primary relative">
      {/* Componente de transición */}
      <HomeTransition 
        isActive={isTransitioning} 
        onComplete={completeTransition} 
      />
      {/* Header completo con menú móvil funcional */}
      <Header hasScrolled={hasScrolled} onHomeClick={goToHome} />
      
      <main>
        {/* Componentes cargados directamente (sin lazy loading) */}
        {/* Hero Section */}
        <HeroSection />
        
        {/* Acerca de */}
        <AboutSection />
        
        {/* Características principales */}
        <FeaturesSection />
        
        {/* Comparativa y aclaración IA */}
        <AIComparisonSection />
        
        {/* Personalización */}
        <PersonalizationSection />
        
        {/* Eficiencia y Seguridad */}
        <EfficiencyAndSecuritySection />
        
        {/* Detalles Técnicos */}
        <TechnicalDetailsSection />
        
        {/* Beneficios */}
        <BenefitsSection />
        
        {/* Acerca de NeuralCrane */}
        <AboutUsSection />
        
        {/* Testimoniales */}
        <TestimonialsSection />
        
        {/* Planes de precios */}
        <PricingSection />
        
        {/* Preguntas frecuentes */}
        <FaqSection />
        
        {/* Recursos y Blog */}
        <ResourcesSection />
        
        {/* CTA - Llamado a la acción final */}
        <CTASection />
      </main>
      
      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default NeuralCrane;
