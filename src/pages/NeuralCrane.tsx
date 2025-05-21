import React, { useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useHomeNavigation } from '@/hooks/useHomeNavigation';
import HomeTransition from '@/components/transitions/HomeTransition';

// Componentes UI base de Havani
import FooterSection from '@/components/sections/Footer/FooterSection';

// Secciones modularizadas con lazy loading
const HeroSection = lazy(() => import('@/components/sections/NeuralCrane/HeroSection'));
const AboutSection = lazy(() => import('@/components/sections/NeuralCrane/AboutSection'));
const FeaturesSection = lazy(() => import('@/components/sections/NeuralCrane/FeaturesSection'));
const BenefitsSection = lazy(() => import('@/components/sections/NeuralCrane/BenefitsSection'));
const TestimonialsSection = lazy(() => import('@/components/sections/NeuralCrane/TestimonialsSection'));
const PricingSection = lazy(() => import('@/components/sections/NeuralCrane/PricingSection'));
const FaqSection = lazy(() => import('@/components/sections/NeuralCrane/FaqSection'));
const CTASection = lazy(() => import('@/components/sections/NeuralCrane/CTASection'));
const AIComparisonSection = lazy(() => import('@/components/sections/NeuralCrane/AIComparisonSection'));
const AboutUsSection = lazy(() => import('@/components/sections/NeuralCrane/AboutUsSection'));
const ResourcesSection = lazy(() => import('@/components/sections/NeuralCrane/ResourcesSection'));
const EfficiencyAndSecuritySection = lazy(() => import('@/components/sections/NeuralCrane/EfficiencyAndSecuritySection'));
const PersonalizationSection = lazy(() => import('@/components/sections/NeuralCrane/PersonalizationSection'));
const TechnicalDetailsSection = lazy(() => import('@/components/sections/NeuralCrane/TechnicalDetailsSection'));

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
        {/* Suspense para componentes lazy */}
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#7B61FF]"></div></div>}>
          {/* Hero Section - Este se carga inmediatamente */}
          <HeroSection />
        </Suspense>
        
        {/* Acerca de */}
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#7B61FF]"></div></div>}>
          <AboutSection />
        </Suspense>
        
        {/* Características principales */}
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#7B61FF]"></div></div>}>
          <FeaturesSection />
        </Suspense>
        
        {/* Comparativa y aclaración IA */}
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#7B61FF]"></div></div>}>
          <AIComparisonSection />
        </Suspense>
        
        {/* Personalización */}
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#7B61FF]"></div></div>}>
          <PersonalizationSection />
        </Suspense>
        
        {/* Eficiencia y Seguridad */}
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#7B61FF]"></div></div>}>
          <EfficiencyAndSecuritySection />
        </Suspense>
        
        {/* Detalles Técnicos */}
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#7B61FF]"></div></div>}>
          <TechnicalDetailsSection />
        </Suspense>
        
        {/* Beneficios */}
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#7B61FF]"></div></div>}>
          <BenefitsSection />
        </Suspense>
        
        {/* Acerca de NeuralCrane */}
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#7B61FF]"></div></div>}>
          <AboutUsSection />
        </Suspense>
        
        {/* Testimoniales */}
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#7B61FF]"></div></div>}>
          <TestimonialsSection />
        </Suspense>
        
        {/* Planes de precios */}
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#7B61FF]"></div></div>}>
          <PricingSection />
        </Suspense>
        
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#7B61FF]"></div></div>}>
          <FaqSection />
        </Suspense>
        
        {/* Recursos y Blog */}
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#7B61FF]"></div></div>}>
          <ResourcesSection />
        </Suspense>
        
        {/* CTA - Llamado a la acción final */}
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#7B61FF]"></div></div>}>
          <CTASection />
        </Suspense>
      </main>
      
      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default NeuralCrane;
