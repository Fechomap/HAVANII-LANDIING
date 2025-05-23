import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHomeNavigation } from '@/hooks/useHomeNavigation';
import HomeTransition from '@/components/transitions/HomeTransition';

// Componentes UI base de Havani
import FooterSection from '@/components/sections/Footer/FooterSection';

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
      {/* Header con navegación */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[rgba(0,0,0,.65)]" style={{ willChange: "transform", transform: "translateZ(0)" }}>
        <div className="max-w-[1280px] mx-auto px-6 py-10 flex items-center justify-between">
          <Link to="/" className="text-white flex items-center" onClick={goToHome}>
            <img 
              src="/images/logo-havani.svg" 
              alt="Havani Logo" 
              className="h-10 w-auto brightness-110 contrast-125"
            />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className="relative px-4 py-2 text-white hover:text-white/90 transition-colors" onClick={goToHome}>
              Home
            </Link>
            <a href="#about" className="relative px-4 py-2 text-white hover:text-white/90 transition-colors">
              Acerca de
            </a>
            <a href="#features" className="relative px-4 py-2 text-white hover:text-white/90 transition-colors">
              Funcionalidades
            </a>
            <a href="#benefits" className="relative px-4 py-2 text-white hover:text-white/90 transition-colors">
              Beneficios
            </a>
            <a href="#testimonials" className="relative px-4 py-2 text-white hover:text-white/90 transition-colors">
              Testimonios
            </a>
            <a href="#pricing" className="relative px-4 py-2 text-white hover:text-white/90 transition-colors">
              Precios
            </a>
            <a href="#faq" className="relative px-4 py-2 text-white hover:text-white/90 transition-colors">
              FAQ
            </a>
            <a href="#contacto" className="ml-2 px-5 py-2 bg-[#7B61FF] hover:bg-[#6A50E0] text-white rounded-full transition-colors text-sm font-medium">
              Contacto
            </a>
          </nav>
          
          {/* Botón móvil */}
          <button className="md:hidden text-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>
      
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
