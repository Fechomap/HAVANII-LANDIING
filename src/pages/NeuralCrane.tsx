import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useHomeNavigation } from '@/hooks/useHomeNavigation';
import HomeTransition from '@/components/transitions/HomeTransition';
import { ArrowRight, CheckCircle, Clock, MapPin, BarChart, Cpu, Truck, Globe, Zap, Brain, Layers, MessageCircle, Activity, BarChart2, Shield, Users, FileText, Play, Lock, Database, Settings } from 'lucide-react';
import { useIntersection } from '@/hooks/useIntersection';
import ShootingStarsBackground from '@/components/ShootingStarsBackground';

// Componentes UI base de Havani
import { Button } from '@/components/ui/button';
import FooterSection from '@/components/sections/Footer/FooterSection';

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
      {/* Fondo de estrellas fugaces */}
      <ShootingStarsBackground />
      {/* Header con navegación */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[rgba(0,0,0,.35)] backdrop-blur-sm">
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
            <Link to="/pricing" className="relative px-4 py-2 text-white hover:text-white/90 transition-colors">
              Precios
            </Link>
            <Link to="/#productos" className="relative rounded-full bg-white/[.12] text-white px-4 py-2" onClick={(e) => {
              // Si el enlace es a la página principal con un ancla, usamos goToHome
              if (e.currentTarget.getAttribute('href')?.startsWith('/#')) {
                goToHome(e);
              }
            }}>
              Productos
            </Link>
            <Link to="/#contacto" className="relative px-4 py-2 text-white hover:text-white/90 transition-colors" onClick={(e) => {
              // Si el enlace es a la página principal con un ancla, usamos goToHome
              if (e.currentTarget.getAttribute('href')?.startsWith('/#')) {
                goToHome(e);
              }
            }}>
              Contacto
            </Link>
          </nav>
          
          {/* Menú móvil (simplificado) */}
          <div className="md:hidden">
            <button className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Content */}
      <main>
        {/* Sección ¿Qué es NeuralCrane? */}
        <AboutSection />
        
        {/* Características clave */}
        <FeaturesSection />
        
        {/* Detalles Técnicos */}
        <TechnicalDetailsSection />
        
        {/* Eficiencia y Seguridad */}
        <EfficiencyAndSecuritySection />
        
        {/* Personalización Avanzada */}
        <PersonalizationSection />
        
        {/* Comparación de IA */}
        <AIComparisonSection />
        
        {/* Beneficios y casos de uso */}
        <BenefitsSection />
        
        {/* Acerca de NeuralCrane */}
        <AboutUsSection />
        
        {/* Testimoniales */}
        <TestimonialsSection />
        
        {/* Planes de precios */}
        <PricingSection />
        
        {/* FAQ Section */}
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

// Hero Section
const HeroSection = () => {
  const { goToHome } = useHomeNavigation();
  
  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden flex flex-col pt-32 md:pt-48 pb-24">
      {/* Nebulosa glow */}
      <div 
        className="absolute top-[240px] left-1/2 -translate-x-1/2 w-[1800px] h-[900px] z-0"
        style={{
          background: '#7B61FF33',
          filter: 'blur(160px)',
          mixBlendMode: 'normal'
        }}
        aria-hidden="true"
      />
      
      {/* Grid principal */}
      <div className="relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[46%_54%] gap-8 px-6 md:px-12 lg:px-24">
        {/* Columna izquierda - Texto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "linear" }}
          className="flex flex-col"
          style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
        >
          <div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/10 text-sm font-semibold text-white hover:bg-white/20 w-max">
            Producto Estrella 
            <motion.span
              whileHover={{ x: 4 }}
              transition={{ duration: 0.15, ease: "linear" }}
              className="w-4 h-4"
              style={{ willChange: "transform" }}
            >
              →
            </motion.span>
          </div>
          
          <h1 className="mt-4 text-[clamp(44px,6vw,76px)] font-extrabold leading-[1.1] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,.5)]">
            <span className="block">Transforma tu</span>
            <span className="block text-[#7B61FF]">Operación</span>
            <span className="block text-2xl md:text-3xl mt-2">Gestión Inteligente de Grúas en Tiempo Real</span>
          </h1>
          
          <p className="mt-6 max-w-[540px] text-lg md:text-xl text-[#CCCCCC] tracking-tight">
            Sin trucos, sin sesgos, solo tecnología de verdad. Una flotilla sincronizada como una red inteligente, operando con precisión.
          </p>
          
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <CheckCircle className="h-6 w-6 text-[#7B61FF]" />
              </div>
              <p className="text-[#BBBBBB]">
                <span className="text-white font-semibold">Asignación Automática y Precisa</span> con identificación del recurso óptimo en tiempo récord
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <CheckCircle className="h-6 w-6 text-[#7B61FF]" />
              </div>
              <p className="text-[#BBBBBB]">
                <span className="text-white font-semibold">Seguimiento en Tiempo Real</span> desde la asignación hasta la finalización
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <CheckCircle className="h-6 w-6 text-[#7B61FF]" />
              </div>
              <p className="text-[#BBBBBB]">
                <span className="text-white font-semibold">Optimización de Costos</span> y automatización de procesos críticos
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <CheckCircle className="h-6 w-6 text-[#7B61FF]" />
              </div>
              <p className="text-[#BBBBBB]">
                <span className="text-white font-semibold">Reducción del Error Humano</span> mediante tarificación automatizada
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-10">
            <Link to="/#contacto" onClick={(e) => {
              if (e.currentTarget.getAttribute('href')?.startsWith('/#')) {
                goToHome(e);
              }
            }}>
              <Button className="px-8 py-4 rounded-full bg-white text-[#7B61FF] font-bold shadow-[0_0_15px_rgba(123,97,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,97,255,0.6)] hover:outline-[#7B61FF] hover:outline-2 hover:outline-offset-4 relative overflow-hidden group">
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#7B61FF]/10 to-[#7B61FF]/40 transition-all duration-300 group-hover:w-full"></span>
                <span className="relative z-10">Solicitar Demo</span>
              </Button>
            </Link>
            
            <Link to="#pricing">
              <Button variant="outline" className="px-8 py-4 rounded-full border border-white/40 text-white/90 hover:bg-white hover:text-[#060E15] transition-colors">
                Ver Planes y Precios
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Columna derecha - Mockup */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.88, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "linear" }}
          style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
        >
          {/* Glow effect para el mockup */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: 'radial-gradient(50% 50% at 50% 50%, rgba(123, 97, 255, 0.5) 0%, rgba(123, 97, 255, 0) 100%)',
              transform: 'translateY(40px)',
              filter: 'blur(120px)',
              willChange: 'transform, opacity'
            }}
            aria-hidden="true"
          />
          
          {/* Imagen del mockup */}
          <img 
            src="/placeholder.svg" 
            alt="Interfaz del sistema NeuralCrane con mapa de seguimiento de grúas en tiempo real" 
            className="w-full max-w-[760px] h-auto rounded-[32px] border border-white/6 shadow-[0_40px_60px_-10px_rgba(0,0,0,.6)] translate-y-[40px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const controls = useAnimation();
  const sectionRef = useIntersection(
    (entry) => { 
      if (entry.isIntersecting) {
        controls.start({ opacity: 1, y: 0 });
      }
    },
    { threshold: 0.4, once: true }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0D0D11] py-[140px] md:py-[180px] overflow-hidden"
    >
      {/* Top decorative wave */}
      <svg 
        className="absolute top-0 left-0 w-full h-[120px]" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path 
          d="M0,0 C150,20 350,0 500,15 C650,30 700,60 900,50 C1050,40 1150,10 1200,0 L1200,120 L0,120 Z" 
          fill="rgba(255,255,255,0.03)" 
        />
      </svg>
      
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            ¿Qué es NeuralCrane?
          </h2>
          
          <p className="mt-8 text-lg leading-relaxed text-[#BBBBBB] max-w-[900px] mx-auto">
            NeuralCrane es un sistema operativo completo que transforma la gestión de grúas mediante tecnología avanzada. A diferencia de un simple ERP que administra datos, NeuralCrane optimiza la asignación de unidades, reduce tiempos de respuesta y maximiza la eficiencia operativa para empresas de grúas, aseguradoras, operadores logísticos y asistencia vial.
          </p>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center p-6 rounded-2xl bg-[#15161B] border border-white/5 hover:border-[#7B61FF]/20 transition-all duration-300"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/5 mb-4">
                <Cpu className="w-8 h-8 text-[#7B61FF]" />
              </div>
              <h3 className="text-lg font-semibold text-white text-center">Asignación inteligente y automatizada</h3>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center p-6 rounded-2xl bg-[#15161B] border border-white/5 hover:border-[#7B61FF]/20 transition-all duration-300"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/5 mb-4">
                <Shield className="w-8 h-8 text-[#7B61FF]" />
              </div>
              <h3 className="text-lg font-semibold text-white text-center">Transparencia e independencia en la competencia</h3>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center p-6 rounded-2xl bg-[#15161B] border border-white/5 hover:border-[#7B61FF]/20 transition-all duration-300"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/5 mb-4">
                <Layers className="w-8 h-8 text-[#7B61FF]" />
              </div>
              <h3 className="text-lg font-semibold text-white text-center">Integración total con diversos proveedores</h3>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center p-6 rounded-2xl bg-[#15161B] border border-white/5 hover:border-[#7B61FF]/20 transition-all duration-300"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/5 mb-4">
                <MessageCircle className="w-8 h-8 text-[#7B61FF]" />
              </div>
              <h3 className="text-lg font-semibold text-white text-center">Comunicación directa con chatbots inteligentes</h3>
            </motion.div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      title: "Asignación Automática Inteligente",
      icon: <Brain className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Cálculo del Tiempo Estimado de Arribo usando datos en tiempo real",
        "Optimización basada en el estado y tipo de grúa para la asignación idónea",
        "Conexión inteligente que establece solo lo esencial para optimizar operaciones",
        "Asignación Secuencial Optimizada (ASO) para encadenar servicios eficientemente"
      ]
    },
    {
      title: "Seguimiento en Tiempo Real",
      icon: <MapPin className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Monitoreo integral del servicio con interfaz intuitiva desde asignación hasta finalización",
        "Alertas y notificaciones en vivo para reacción inmediata ante eventualidades",
        "Transparencia total con documentación de cada etapa del proceso",
        "Visualización gráfica del progreso y ubicación de unidades"
      ]
    },
    {
      title: "Optimización de Costos y Operaciones",
      icon: <BarChart className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Reducción del error humano en procesos clave como la tarificación",
        "Automatización de procesos críticos para minimizar pérdidas económicas",
        "Decisiones basadas en datos con reportes personalizables (fase futura)",
        "Análisis avanzado para identificar oportunidades de mejora"
      ]
    },
    {
      title: "Comunicación y Chatbots Inteligentes",
      icon: <MessageCircle className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Integración con WhatsApp y Telegram para conexión inmediata con operadores",
        "Chatbots especializados para la gestión de peticiones y control de gastos",
        "Seguimiento automatizado con el ERP mediante bots especializados",
        "Reducción significativa de la carga operativa manual"
      ]
    }
  ];

  return (
    <section className="relative bg-[#0B0B0F] py-[120px] overflow-hidden" id="features">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(123,97,255,0.06) 0%, transparent 70%)",
          filter: "blur(120px)"
        }}
      />
      
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Características Innovadoras
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[800px] mx-auto">
            NeuralCrane no es solo un ERP, es un sistema operativo completo que transforma la gestión de tu flotilla de grúas con tecnología de vanguardia.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-300 hover:shadow-[0_0_25px_rgba(123,97,255,0.1)]"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              </div>
              
              <ul className="space-y-3">
                {feature.points.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-[#BBBBBB]">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/5">
              <Layers className="w-8 h-8 text-[#7B61FF]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Integraciones y Conectividad Avanzada</h3>
              <p className="text-[#BBBBBB]">
                Facilitamos la integración con casas de asistencia y sistemas externos, incluyendo plataformas GPS para seguimiento en tiempo real. Nuestra arquitectura está diseñada para evolucionar, con nuevas integraciones en desarrollo continuo para garantizar que tu sistema siga mejorando con el tiempo.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Sección de Asignación Secuencial Optimizada (ASO) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 bg-gradient-to-br from-[#15161B] to-[#1A1B22] border border-[#7B61FF]/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(123,97,255,0.1)]"
        >
          <div className="flex flex-col">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl bg-[#7B61FF]/10 border border-[#7B61FF]/30">
                <Zap className="w-8 h-8 text-[#7B61FF]" />
              </div>
              <h3 className="text-2xl font-bold text-white ml-5">Asignación Secuencial Optimizada (ASO)</h3>
            </div>
            
            <p className="text-[#BBBBBB] mb-6">
              Mediante algoritmos de optimización de vanguardia, NeuralCrane evalúa en tiempo real la viabilidad de encadenar servicios de forma secuencial. Es el sistema, y no la grúa, quien determina la estrategia operativa óptima.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-black/30 rounded-xl p-6 border border-white/5">
                <h4 className="text-lg font-semibold text-white mb-3">Cómo Funciona</h4>
                <p className="text-[#BBBBBB]">
                  Si una grúa, en ruta hacia el destino de un servicio, identifica una solicitud adicional susceptible de ser atendida en un intervalo de 45 a 60 minutos, el sistema asigna secuencialmente dicho servicio a la misma unidad. Esta estrategia reduce significativamente los desplazamientos en vacío, optimiza el consumo de combustible y maximiza el rendimiento operativo de cada recurso.
                </p>
              </div>
              
              <div className="bg-black/30 rounded-xl p-6 border border-white/5">
                <h4 className="text-lg font-semibold text-white mb-3">Beneficios Clave</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-[#BBBBBB]">Reducción del 40% en desplazamientos sin carga</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-[#BBBBBB]">Ahorro significativo en combustible y desgaste de unidades</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-[#BBBBBB]">Aumento en la cantidad de servicios atendidos por jornada</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-[#BBBBBB]">Mayor aprovechamiento de recursos en áreas urbanas congestionadas</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-[#7B61FF]/5 rounded-xl p-5 border border-[#7B61FF]/20">
              <p className="text-white italic text-sm">
                "Con 5 grúas en mi empresa, atendíamos en promedio 15 servicios diarios en la Ciudad de México. Con la implementación de ASO, incrementamos a 23 servicios diarios, manteniendo el mismo número de unidades y reduciendo un 30% el consumo de combustible."
                <span className="block mt-2 font-semibold">— Amaro F., Propietario de Asistencia Express</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Benefits Section
const BenefitsSection = () => {
  const benefitsProviders = [
    {
      title: "Optimización Integral de Operaciones",
      description: "NeuralCrane automatiza la asignación de unidades, permitiendo que cada grúa trabaje coordinadamente. Con la Asignación Secuencial Optimizada (ASO), reducimos desplazamientos en vacío y maximizamos el rendimiento, generando ahorros significativos."
    },
    {
      title: "Reducción de Tiempos Muertos",
      description: "Al evaluar en tiempo real el estado y tipo de grúa, minimizamos los periodos sin servicio, incrementando la productividad y rentabilidad de tu flota."
    },
    {
      title: "Eficiencia en la Gestión Operativa",
      description: "La automatización de procesos críticos reduce la necesidad de un equipo operativo extenso, permitiendo que un menor número de operadores gestione toda la operación eficazmente."
    }
  ];
  
  const benefitsAssistance = [
    {
      title: "Gestión y Validación de Servicios",
      description: "Facilitamos la coordinación y validación de servicios con comunicación directa entre plataforma, operadores y proveedores, garantizando procesos precisos y eficientes."
    },
    {
      title: "Seguimiento y Coordinación Automatizados",
      description: "Con una interfaz intuitiva, ofrecemos monitoreo continuo y notificaciones en vivo, reduciendo la intervención manual y optimizando la atención de cada solicitud."
    },
    {
      title: "Análisis y Reportes Personalizables",
      description: "En fase futura, incorporaremos un módulo avanzado de análisis con reportes personalizables para identificar oportunidades de mejora y ajustar estrategias."
    }
  ];

  return (
    <section className="relative bg-[#09090C] py-[140px] overflow-hidden" id="benefits">
      {/* Top SVG wave */}
      <svg 
        className="absolute top-0 left-0 w-full h-[120px]" 
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path 
          d="M0,0 C150,40 350,30 500,35 C650,40 700,15 900,25 C1050,33 1150,50 1200,30 L1200,0 L0,0 Z" 
          fill="rgba(11,11,15,1)" 
        />
      </svg>
      
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Soluciones Integrales para Potenciar la Eficiencia
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[800px] mx-auto">
            NeuralCrane está diseñado para transformar la operatividad, adaptándose a las necesidades de proveedores de servicios de grúa, casas de asistencia y aseguradoras.
          </p>
        </motion.div>
        
        <div className="space-y-16">
          {/* Beneficios para proveedores */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl font-bold text-white mb-8 text-center"
            >
              Para Proveedores de Servicios de Grúa y Asistencia Vial
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefitsProviders.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-300 hover:shadow-[0_0_25px_rgba(123,97,255,0.1)] h-full"
                >
                  <h4 className="text-xl font-semibold text-white mb-4">{benefit.title}</h4>
                  <p className="text-[#BBBBBB]">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Beneficios para casas de asistencia */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl font-bold text-white mb-8 text-center"
            >
              Para Casas de Asistencia y Aseguradoras
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefitsAssistance.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-300 hover:shadow-[0_0_25px_rgba(123,97,255,0.1)] h-full"
                >
                  <h4 className="text-xl font-semibold text-white mb-4">{benefit.title}</h4>
                  <p className="text-[#BBBBBB]">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Como propietario de una empresa de grúas con 12 unidades, antes enfrentábamos frecuentes errores en la tarificación que afectaban nuestros ingresos. Desde que implementamos NeuralCrane, la automatización de procesos críticos ha reducido drásticamente estos errores, permitiéndonos cobrar con precisión y aumentar notablemente la rentabilidad.",
      name: "Ricardo V.",
      position: "Propietario",
      company: "Grúas Rápidas"
    },
    {
      quote: "Con 5 grúas en mi empresa, atendíamos en promedio 15 servicios diarios en la Ciudad de México, donde el tráfico ralentizaba la operación. Con NeuralCrane, nuestro sistema permite evaluar solicitudes nuevas que pueden ser atendidas por una grúa a punto de terminar su servicio, lo que nos ha permitido incrementar el volumen de servicios atendidos y eficientar el consumo de combustible y otros recursos.",
      name: "Amaro F.",
      position: "Propietario",
      company: "Asistencia Express"
    },
    {
      quote: "Como coordinador, solíamos contar con 3 o 4 cabinas dedicadas a la gestión de servicios. Con NeuralCrane, automatizamos tareas críticas mediante bots de seguimiento y una tarificación ágil y sin errores, reduciendo la plantilla en cabina a la mitad. Esto nos permite concentrarnos en los eventos críticos y optimizar los recursos, generando importantes ahorros operativos.",
      name: "Román M.",
      position: "Coordinador de Operaciones",
      company: "Servicios CDMX"
    },
    {
      quote: "Como gerente de operaciones, siempre busqué modernizar nuestra gestión. Antes, dependíamos de llamadas constantes que afectaban la productividad. Con NeuralCrane, contamos con una app para operadores y bots que automatizan el seguimiento, lo que ha reducido significativamente el volumen de llamadas y elevado la eficiencia operativa y profesionalismo de nuestra empresa.",
      name: "Manuel V.",
      position: "Gerente de Operaciones",
      company: "Remolques del Norte"
    }
  ];

  return (
    <section className="relative bg-[#0D0D11] py-[120px] overflow-hidden" id="testimonials">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[700px] mx-auto">
            Descubre cómo NeuralCrane ha transformado la operación de empresas de grúas y asistencia vial.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-300 hover:shadow-[0_0_25px_rgba(123,97,255,0.1)] relative"
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-6 text-[#7B61FF]/20 text-6xl font-serif">"</div>
              
              <p className="text-[#BBBBBB] mb-6 relative z-10">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                {/* Avatar placeholder - could be replaced with actual images */}
                <div className="w-12 h-12 rounded-full bg-[#7B61FF]/20 flex items-center justify-center text-[#7B61FF] font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                
                <div className="ml-4">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-[#BBBBBB]">{testimonial.position}, {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = () => {
  const plans = [
    {
      name: "Esencial",
      features: [
        "Acceso total al sistema NeuralCrane",
        "Conexión a las API's de terceros",
        "Acceso a los bots operativos",
        "Configuración de los bots operativos",
        "Acceso a soporte técnico y actualizaciones continuas"
      ],
      popular: false
    },
    {
      name: "Profesional",
      features: [
        "Acceso total al sistema NeuralCrane",
        "Conexión a las API's de terceros",
        "Acceso a los bots de seguimiento",
        "Configuración de los bots de seguimiento",
        "Acceso a los bots operativos",
        "Configuración de los bots operativos",
        "Acceso a soporte técnico y actualizaciones continuas",
        "Reportes personalizables"
      ],
      popular: true
    },
    {
      name: "Ultra",
      features: [
        "Acceso total al sistema NeuralCrane",
        "Conexión a las API's de terceros",
        "Acceso a los bots de seguimiento",
        "Configuración de los bots de seguimiento",
        "Acceso a los bots operativos",
        "Configuración de los bots operativos",
        "Acceso a soporte técnico y actualizaciones continuas",
        "Reportes personalizables y análisis avanzado",
        "Acceso a sistema de llamadas para seguimientos",
        "Configuración del PBX de llamadas",
        "Soporte premium 24/7 y consultoría personalizada",
        "Personalización avanzada de la interfaz (logo, nombre, etc.)",
        "Acceso anticipado a futuras integraciones y funcionalidades"
      ],
      popular: false
    }
  ];

  return (
    <section className="relative bg-[#0B0B0F] py-[140px] overflow-hidden" id="pricing">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Planes Flexibles para Potenciar tu Operación
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[800px] mx-auto">
            Escala a medida que tu negocio crece, con ofertas especiales para aseguradoras y casas de asistencia.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={`bg-[#15161B] border ${plan.popular ? 'border-[#7B61FF]' : 'border-white/5'} rounded-2xl p-8 hover:shadow-[0_0_25px_rgba(123,97,255,0.1)] transition-all duration-300 relative ${plan.popular ? 'shadow-[0_0_25px_rgba(123,97,255,0.15)]' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#7B61FF] text-white text-sm font-bold py-1 px-4 rounded-full">
                  Más popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-[#BBBBBB]">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto pt-4 text-center">
                <Link to="/#contacto">
                  <Button className={`px-6 py-3 rounded-full ${plan.popular ? 'bg-[#7B61FF] text-white hover:bg-[#6A50E0]' : 'bg-white/10 text-white hover:bg-white/20'} font-semibold transition-colors`}>
                    Contactar para cotización
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 bg-gradient-to-r from-[#15161B] to-[#1A1B22] border border-[#7B61FF]/20 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">Prueba Gratuita</h3>
          <p className="text-[#BBBBBB] max-w-[700px] mx-auto mb-6">
            Experimenta NeuralCrane sin compromiso durante <span className="text-white font-semibold">1 mes</span> y descubre cómo nuestra plataforma puede transformar la operatividad de tu empresa.
          </p>
          <Link to="/#contacto">
            <Button className="px-8 py-4 rounded-full bg-white text-[#7B61FF] font-bold shadow-[0_0_15px_rgba(123,97,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,97,255,0.6)]">
              Solicitar Prueba Gratuita
            </Button>
          </Link>
          <p className="mt-4 text-sm text-[#BBBBBB]/70">
            También ofrecemos planes personalizados para aseguradoras y casas de asistencia.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// FAQ Section
const FaqSection = () => {
  const [activeTab, setActiveTab] = React.useState('general');
  
  const generalFaqs = [
    {
      question: "¿Cuánto tiempo se tarda en implementar NeuralCrane en mi empresa?",
      answer: "Según el tamaño de la flota y la complejidad de los procesos, la implementación suele llevar entre 2 y 4 semanas. Durante este período, nuestro equipo trabaja estrechamente contigo para configurar y personalizar la plataforma, asegurando una transición sin contratiempos."
    },
    {
      question: "¿Requiero capacitación especial para usar el sistema?",
      answer: "No es necesario. NeuralCrane ha sido diseñado pensando en la facilidad de uso. Además, ofrecemos capacitaciones personalizadas y tutoriales interactivos para que todo tu equipo se familiarice rápidamente con la herramienta."
    },
    {
      question: "¿Cómo se integra NeuralCrane con los sistemas que ya utilizo?",
      answer: "NeuralCrane se conecta a otros sistemas mediante APIs de terceros, facilitando una integración fluida con tu infraestructura tecnológica existente. Nuestro equipo técnico te acompañará en cada paso para garantizar una sincronización sin problemas."
    },
    {
      question: "¿Qué sucede si mi flota o la operación de mi empresa crece?",
      answer: "Nuestra solución está diseñada para escalar sin límites. Ya sea que manejes una pequeña flota o grandes volúmenes operativos, NeuralCrane se adapta a tus necesidades, manteniendo la eficiencia y optimizando tus procesos sin afectar el rendimiento."
    },
    {
      question: "¿El sistema realmente ayuda a reducir errores humanos?",
      answer: "Sí. Al automatizar procesos críticos como la tarificación y la asignación de servicios, NeuralCrane minimiza significativamente los errores humanos, lo que se traduce en cobros más precisos, reducción de pérdidas económicas y una mayor rentabilidad."
    },
    {
      question: "¿Cómo se diferencia NeuralCrane de otras soluciones en el mercado?",
      answer: "A diferencia de la competencia, que se centra en la administración básica de datos, NeuralCrane está orientado a la eficiencia operativa. Ofrecemos funcionalidades avanzadas, como la Asignación Secuencial Optimizada (ASO) y el seguimiento en tiempo real, que realmente impulsan la productividad y reducen los costos operativos."
    },
    {
      question: "¿Qué tan seguro es el sistema? ¿Cómo protegen mis datos?",
      answer: "La seguridad es una prioridad. NeuralCrane utiliza protocolos de encriptación avanzados, respaldos en la nube y monitoreo continuo para garantizar que tus datos estén protegidos y se mantengan confidenciales en todo momento."
    },
    {
      question: "¿Qué parámetros usan para asignar una unidad?",
      answer: "Utilizamos varios parámetros clave para asignar la unidad óptima. Calculamos el Tiempo Estimado de Arribo basándonos en datos en tiempo real y la ubicación geográfica. Además, evaluamos la disponibilidad y el tipo de grúa para asegurarnos de que la unidad asignada cumpla con los requisitos del servicio. Finalmente, aplicamos nuestro mecanismo de Asignación Secuencial Optimizada (ASO), que permite evaluar y encadenar solicitudes adicionales, optimizando la eficiencia operativa."
    }
  ];

  const technicalFaqs = [
    {
      question: "La competencia me dice que usa \"IA\". ¿Por qué NeuralCrane no integra esa tecnología?",
      answer: "La mayoría de los competidores se autodenominan \"IA\", pero en realidad lo que ofrecen es una automatización básica con algoritmos convencionales. En NeuralCrane preferimos ser transparentes: nuestra solución se basa en procesos avanzados y comprobados que generan resultados operativos reales, sin recurrir a etiquetas de IA que, en la práctica, no aportan valor añadido."
    },
    {
      question: "¿No es la inteligencia artificial el futuro? ¿Qué diferencia hay entre la \"IA\" que ofrece la competencia y la que podría integrar NeuralCrane?",
      answer: "Aunque \"IA\" suena futurista, muchas ofertas se limitan a técnicas de automatización sin emplear modelos robustos de aprendizaje profundo ni conexiones en tiempo real. Nosotros sabemos que la \"IA\" que se promociona en el mercado carece de las verdaderas capacidades de integración —no manejan LLM ni procesos avanzados—. En NeuralCrane, nos centramos en tecnología probada y, mientras desarrollamos modelos de IA genuinos, preferimos ofrecer una solución que funcione de verdad."
    },
    {
      question: "¿Cómo sé dónde están mis grúas y cómo se conectan al sistema?",
      answer: "Con NeuralCrane, cada unidad se conecta al sistema mediante la integración con dispositivos GPS y APIs, que transmiten datos en tiempo real sobre la ubicación de tus grúas. Esto te permite visualizar en un mapa la posición exacta de cada unidad, haciendo posible un seguimiento continuo y preciso del estado operativo."
    },
    {
      question: "¿Voy a pagar algo extra por las APIs de geolocalización?",
      answer: "No, no tendrás que pagar tarifas adicionales por las APIs de geolocalización. NeuralCrane integra estas funcionalidades dentro del paquete, utilizando proveedores confiables para ofrecerte seguimiento en tiempo real sin costos extras. Esto te permite concentrarte en optimizar tu operación sin preocuparte por gastos tecnológicos adicionales."
    },
    {
      question: "¿Puedo personalizar la interfaz del sistema para reflejar la identidad de mi empresa?",
      answer: "Sí, ofrecemos opciones de personalización avanzada que permiten integrar el logo, el nombre y otros elementos visuales de tu marca, proporcionando una experiencia de usuario coherente y única. Esto es particularmente útil para empresas que desean mantener su identidad corporativa en todas sus herramientas tecnológicas."
    },
    {
      question: "¿Qué tipo de reportes y análisis podré obtener?",
      answer: "En una fase futura, integraremos un módulo avanzado de análisis que generará reportes personalizables. Esta herramienta te permitirá monitorear métricas clave, identificar oportunidades de mejora y ajustar estrategias para optimizar la eficiencia operativa, con métricas como tiempos de respuesta, áreas de mayor demanda, eficiencia por unidad y mucho más."
    },
    {
      question: "¿El sistema es adecuado para empresas que operan en zonas con tráfico intenso o áreas de difícil acceso?",
      answer: "Definitivamente. NeuralCrane está especialmente optimizado para entornos urbanos y áreas con tráfico denso, ayudándote a maximizar la eficiencia operativa incluso en condiciones desafiantes, gracias a sus algoritmos de optimización de rutas y a la evaluación en tiempo real de múltiples factores de tráfico."
    }
  ];

  const operationsFaqs = [
    {
      question: "¿Cómo puedo eficientar el personal de coordinación?",
      answer: "Te presentamos un caso práctico: en una empresa de grúas con operaciones extensas, antes contábamos con 3 o 4 cabinas dedicadas a la coordinación y seguimiento de servicios. Con NeuralCrane, automatizamos tareas críticas mediante bots de seguimiento y una tarificación ágil y sin errores. Gracias a estas herramientas, el sistema monitorea las asignaciones en tiempo real y valida automáticamente cada servicio, permitiendo que la operación se gestione con la mitad del personal. Ahora, con solo 1 o 2 operadores, se cubren todas las funciones, concentrándose en los eventos críticos y optimizando los recursos, lo que se traduce en una significativa reducción de costos operativos y un notable incremento en la eficiencia."
    },
    {
      question: "¿Qué tipo de soporte ofrecen después de la implementación?",
      answer: "Ofrecemos soporte continuo a través de múltiples canales, incluyendo chat en vivo, correo electrónico y soporte telefónico. Nuestro equipo está disponible para resolver cualquier duda o incidencia que puedas tener, asegurando que tu operación siempre funcione sin contratiempos."
    }
  ];

  const renderFaqs = () => {
    switch(activeTab) {
      case 'general':
        return generalFaqs;
      case 'technical':
        return technicalFaqs;
      case 'operations':
        return operationsFaqs;
      default:
        return generalFaqs;
    }
  };

  return (
    <section className="relative bg-[#0B0B0F] py-[80px] overflow-hidden" id="faq">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-[#BBBBBB] max-w-2xl mx-auto mb-8">
            Todo lo que necesitas saber sobre NeuralCrane. ¿No encuentras lo que buscas? Contáctanos directamente.
          </p>
          
          {/* Pestañas de navegación */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab('general')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'general' 
                  ? 'bg-[#7B61FF] text-white' 
                  : 'bg-[#15161B] text-[#BBBBBB] hover:bg-[#1E1F25]'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('technical')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'technical' 
                  ? 'bg-[#7B61FF] text-white' 
                  : 'bg-[#15161B] text-[#BBBBBB] hover:bg-[#1E1F25]'
              }`}
            >
              Técnicas
            </button>
            <button
              onClick={() => setActiveTab('operations')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'operations' 
                  ? 'bg-[#7B61FF] text-white' 
                  : 'bg-[#15161B] text-[#BBBBBB] hover:bg-[#1E1F25]'
              }`}
            >
              Operaciones
            </button>
          </div>
        </motion.div>

        <div className="space-y-6">
          {renderFaqs().map((faq, index) => (
            <motion.div
              key={`faq-${activeTab}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="bg-[#15161B] border border-white/5 rounded-xl p-6 hover:border-[#7B61FF]/20 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
              <p className="text-[#BBBBBB]">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="relative bg-[#09090C] py-[120px] overflow-hidden">
      {/* Overlay Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-22%] z-0 h-[340px] w-[820px] -translate-x-1/2 blur-[170px]"
        style={{ background: "rgba(123,97,255,0.05)" }}
      />
      
      <div className="relative z-10 max-w-[800px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.6, 0.8, 0.25, 1] }}
          className="text-3xl md:text-4xl font-extrabold leading-tight text-white"
        >
          ¿Listo para transformar la forma en que gestionas tu parque de grúas?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.6, 0.8, 0.25, 1] }}
          className="mt-6 text-lg md:text-xl text-[#BBBBBB] max-w-[560px] mx-auto"
        >
          Descubre la diferencia y lleva tu operación al siguiente nivel. Agenda una demostración personalizada o inicia tu prueba gratuita de 1 mes hoy mismo.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.6, 0.8, 0.25, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link to="/#contacto">
            <Button className="px-8 py-4 rounded-full bg-white text-[#7B61FF] font-bold shadow-[0_0_15px_rgba(123,97,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,97,255,0.6)] hover:outline-[#7B61FF] hover:outline-2 hover:outline-offset-4 relative overflow-hidden group">
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#7B61FF]/10 to-[#7B61FF]/40 transition-all duration-300 group-hover:w-full"></span>
              <span className="relative z-10 flex items-center">
                Solicitar Demo 
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Button>
          </Link>
          
          <Link to="/#contacto">
            <Button variant="outline" className="px-8 py-4 rounded-full border border-white/40 text-white/90 hover:bg-white hover:text-[#060E15] transition-colors">
              Prueba Gratuita de 1 Mes
            </Button>
          </Link>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-8 text-sm text-[#BBBBBB]/70"
        >
          Contáctanos en soporte@neuralcrane.com o al +52 55 1234 5678
        </motion.p>
      </div>
    </section>
  );
};

// Sección para comparación de IA y tecnología real
const AIComparisonSection = () => {
  return (
    <section className="relative bg-[#0B0B0F] py-[120px] overflow-hidden" id="ai-comparison">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Más Allá de las Etiquetas: Tecnología Real
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[800px] mx-auto">
            Por qué elegimos la transparencia y la eficiencia comprobada en lugar de etiquetas de marketing.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-6">El Marketing vs. La Realidad</h3>
            <p className="text-[#BBBBBB] mb-4">
              La mayoría de los competidores se autodenominan "IA", pero en realidad lo que ofrecen es una automatización básica con algoritmos convencionales. En NeuralCrane preferimos ser transparentes: nuestra solución se basa en procesos avanzados y comprobados que generan resultados operativos reales, sin recurrir a etiquetas de IA que, en la práctica, no aportan valor añadido.
            </p>
            <p className="text-[#BBBBBB]">
              Aunque "IA" suena futurista, muchas ofertas se limitan a técnicas de automatización sin emplear modelos robustos de aprendizaje profundo ni conexiones en tiempo real. Nosotros sabemos que la "IA" que se promociona en el mercado carece de las verdaderas capacidades de integración —no manejan LLM ni procesos avanzados—.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Nuestro Enfoque: Resultados sobre Etiquetas</h3>
            <p className="text-[#BBBBBB] mb-4">
              Te invitamos a cuestionar lo que se conoce como "IA" en el mercado. NeuralCrane se diferencia porque se enfoca en optimizar la operatividad con herramientas comprobadas que reducen errores y maximizan el rendimiento. Mientras otros usan el término IA como etiqueta de marketing, nosotros entregamos resultados medibles y una plataforma confiable, diseñada para funcionar de verdad en entornos críticos.
            </p>
            <p className="text-[#BBBBBB]">
              Estamos a la vanguardia tecnológica y ya estamos entrenando modelos de IA que se integrarán en futuras versiones de nuestra plataforma. Nuestro compromiso es incorporar funcionalidades genuinas de IA que aporten automatización total y optimicen aún más la operatividad, una vez que la tecnología se vuelva robusta y costeable.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Sección Acerca de NeuralCrane (Misión, visión y valores)
const AboutUsSection = () => {
  return (
    <section className="relative bg-[#0D0D11] py-[140px] overflow-hidden" id="about-us">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Acerca de NeuralCrane
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[800px] mx-auto">
            Transformamos la gestión operativa mediante tecnología avanzada y centrada en el factor humano.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Nuestra Historia</h3>
            <p className="text-[#BBBBBB]">
              Nacimos con la convicción de que la tecnología debe ser poderosa y accesible. Mientras la competencia se limita a la administración básica, nosotros ofrecemos una solución integral que optimiza cada proceso operativo, reduciendo errores y costos, y maximizando la rentabilidad. Trabajamos para acercar la tecnología de vanguardia al sector de grúas y asistencia vial, modernizando a nuestros clientes con una interfaz intuitiva y operativa.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Misión y Visión</h3>
            <div>
              <h4 className="text-white font-semibold mb-2">Misión</h4>
              <p className="text-[#BBBBBB] mb-4">
                Impulsar la transformación operativa de las empresas de grúa mediante una tecnología avanzada, amigable e intuitiva que reduce el error humano y optimiza procesos críticos, permitiendo una mayor rentabilidad y competitividad.
              </p>
              
              <h4 className="text-white font-semibold mb-2">Visión</h4>
              <p className="text-[#BBBBBB]">
                Ser la plataforma líder en el sector de grúas y asistencia vial, revolucionando la industria con soluciones inteligentes y en constante evolución, que combinan tecnología real y un enfoque humano para impulsar la eficiencia operativa.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Nuestros Valores</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#7B61FF]/10 mr-3 flex-shrink-0">
                  <Zap className="h-5 w-5 text-[#7B61FF]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Innovación Real</h4>
                  <p className="text-[#BBBBBB] text-sm">Soluciones tecnológicas de vanguardia que combinan potencia y facilidad de uso.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#7B61FF]/10 mr-3 flex-shrink-0">
                  <Activity className="h-5 w-5 text-[#7B61FF]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Eficiencia Operativa</h4>
                  <p className="text-[#BBBBBB] text-sm">Optimización de procesos para reducir tiempos muertos y costos.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#7B61FF]/10 mr-3 flex-shrink-0">
                  <Shield className="h-5 w-5 text-[#7B61FF]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Transparencia y Honestidad</h4>
                  <p className="text-[#BBBBBB] text-sm">Comunicación abierta y sin sesgos, con resultados medibles desde el primer día.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#7B61FF]/10 mr-3 flex-shrink-0">
                  <Users className="h-5 w-5 text-[#7B61FF]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Enfoque Humano</h4>
                  <p className="text-[#BBBBBB] text-sm">Tecnología que simplifica el trabajo diario, permitiendo concentrarse en lo que realmente importa.</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Sección de Recursos y Blog
const ResourcesSection = () => {
  return (
    <section className="relative bg-[#0B0B0F] py-[120px] overflow-hidden" id="resources">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Recursos y Conocimiento
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[800px] mx-auto">
            Descubre contenido especializado para optimizar tu operación con NeuralCrane.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-6 hover:border-[#7B61FF]/20 transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/5 mb-4">
              <FileText className="w-8 h-8 text-[#7B61FF]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">Artículos y Guías</h3>
            <p className="text-[#BBBBBB] text-sm">
              Contenido actualizado sobre tendencias en el sector de grúas, mejores prácticas operativas y casos de éxito.
            </p>
            <Link to="/blog" className="mt-4 text-[#7B61FF] hover:text-[#A28CFF] font-medium flex items-center">
              Explorar <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-6 hover:border-[#7B61FF]/20 transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/5 mb-4">
              <Play className="w-8 h-8 text-[#7B61FF]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">Tutoriales y Videos</h3>
            <p className="text-[#BBBBBB] text-sm">
              Aprende a utilizar NeuralCrane con tutoriales interactivos y videos demostrativos sobre todas sus funcionalidades.
            </p>
            <Link to="/tutorials" className="mt-4 text-[#7B61FF] hover:text-[#A28CFF] font-medium flex items-center">
              Ver tutoriales <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-6 hover:border-[#7B61FF]/20 transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/5 mb-4">
              <BarChart2 className="w-8 h-8 text-[#7B61FF]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">Infografías y Whitepapers</h3>
            <p className="text-[#BBBBBB] text-sm">
              Documentos especializados que ofrecen análisis profundos y comparativas del mercado de asistencia vial.
            </p>
            <Link to="/resources" className="mt-4 text-[#7B61FF] hover:text-[#A28CFF] font-medium flex items-center">
              Descargar recursos <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-6 hover:border-[#7B61FF]/20 transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/5 mb-4">
              <MessageCircle className="w-8 h-8 text-[#7B61FF]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">Soporte y Comunidad</h3>
            <p className="text-[#BBBBBB] text-sm">
              Accede a nuestro centro de soporte y únete a la comunidad de usuarios para compartir experiencias y mejores prácticas.
            </p>
            <Link to="/support" className="mt-4 text-[#7B61FF] hover:text-[#A28CFF] font-medium flex items-center">
              Centro de ayuda <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Sección de Eficiencia y Seguridad
const EfficiencyAndSecuritySection = () => {
  return (
    <section className="relative bg-[#0D0D11] py-[120px] overflow-hidden" id="efficiency-security">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Eficiencia de personal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Eficiencia del Personal de Coordinación
            </h2>
            
            <div className="bg-[#15161B] border border-white/5 rounded-2xl p-8 mb-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 mr-4">
                  <Users className="h-7 w-7 text-[#7B61FF]" />
                </div>
                <h3 className="text-xl font-semibold text-white">Reducción del 50% en Personal Operativo</h3>
              </div>
              
              <p className="text-[#BBBBBB] mb-6">
                Te presentamos un caso práctico real: en una empresa de grúas con operaciones extensas, antes contábamos con 3 o 4 cabinas dedicadas a la coordinación y seguimiento de servicios. Con NeuralCrane, automatizamos tareas críticas mediante bots de seguimiento y una tarificación ágil y sin errores.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-black/30 rounded-xl p-5 border border-white/5">
                  <h4 className="text-white font-semibold mb-2">Antes de NeuralCrane</h4>
                  <ul className="space-y-2 text-[#BBBBBB] text-sm">
                    <li className="flex items-start">
                      <span className="text-[#FF5F5F] mr-2">→</span>
                      <span>3-4 operadores en cabina a tiempo completo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#FF5F5F] mr-2">→</span>
                      <span>Seguimiento manual de cada servicio</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#FF5F5F] mr-2">→</span>
                      <span>Frecuentes errores de comunicación</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#FF5F5F] mr-2">→</span>
                      <span>Alto volumen de llamadas de seguimiento</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#FF5F5F] mr-2">→</span>
                      <span>Sobrecarga de trabajo en horas pico</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-black/30 rounded-xl p-5 border border-white/5">
                  <h4 className="text-white font-semibold mb-2">Con NeuralCrane</h4>
                  <ul className="space-y-2 text-[#BBBBBB] text-sm">
                    <li className="flex items-start">
                      <span className="text-[#7B61FF] mr-2">→</span>
                      <span>Solo 1-2 operadores necesarios</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#7B61FF] mr-2">→</span>
                      <span>Seguimiento automatizado por bots</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#7B61FF] mr-2">→</span>
                      <span>Comunicación clara y estandarizada</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#7B61FF] mr-2">→</span>
                      <span>Reducción del 70% en llamadas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#7B61FF] mr-2">→</span>
                      <span>Distribución equilibrada de la carga</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <p className="text-[#BBBBBB]">
                Gracias a estas herramientas, el sistema monitorea las asignaciones en tiempo real y valida automáticamente cada servicio, permitiendo que la operación se gestione con la mitad del personal. Ahora, con solo 1 o 2 operadores, se cubren todas las funciones, concentrándose en los eventos críticos y optimizando los recursos, lo que se traduce en una significativa reducción de costos operativos y un notable incremento en la eficiencia.
              </p>
            </div>
            
            <div className="bg-[#7B61FF]/5 rounded-xl p-5 border border-[#7B61FF]/20">
              <p className="text-white italic text-sm">
                "Como coordinador, solíamos contar con 3 o 4 cabinas dedicadas a la gestión de servicios. Con NeuralCrane, automatizamos tareas críticas mediante bots de seguimiento y una tarificación ágil y sin errores, reduciendo la plantilla en cabina a la mitad. Esto nos permite concentrarnos en los eventos críticos y optimizar los recursos, generando importantes ahorros operativos."
                <span className="block mt-2 font-semibold">— Román M., Coordinador de Operaciones</span>
              </p>
            </div>
          </motion.div>
          
          {/* Seguridad y Protección de Datos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Seguridad y Protección de Datos
            </h2>
            
            <div className="bg-[#15161B] border border-white/5 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 mr-4">
                  <Shield className="h-7 w-7 text-[#7B61FF]" />
                </div>
                <h3 className="text-xl font-semibold text-white">Seguridad de Clase Mundial</h3>
              </div>
              
              <p className="text-[#BBBBBB] mb-6">
                La seguridad es una prioridad absoluta en NeuralCrane. Utilizamos protocolos de encriptación avanzados, respaldos en la nube y monitoreo continuo para garantizar que tus datos estén protegidos y se mantengan confidenciales en todo momento.
              </p>
              
              <ul className="space-y-4 mb-6">
                <li className="bg-black/30 rounded-xl p-4 border border-white/5">
                  <div className="flex items-start">
                    <Lock className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Encriptación de Datos</h4>
                      <p className="text-[#BBBBBB] text-sm">
                        Toda la información transmitida y almacenada está protegida con encriptación AES-256, el mismo estándar utilizado por instituciones financieras y gubernamentales.
                      </p>
                    </div>
                  </div>
                </li>
                
                <li className="bg-black/30 rounded-xl p-4 border border-white/5">
                  <div className="flex items-start">
                    <Database className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Respaldo Automático</h4>
                      <p className="text-[#BBBBBB] text-sm">
                        Realizamos copias de seguridad automáticas cada 6 horas y mantenemos un histórico completo de datos para garantizar la continuidad del servicio ante cualquier eventualidad.
                      </p>
                    </div>
                  </div>
                </li>
                
                <li className="bg-black/30 rounded-xl p-4 border border-white/5">
                  <div className="flex items-start">
                    <Activity className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Monitoreo 24/7</h4>
                      <p className="text-[#BBBBBB] text-sm">
                        Nuestros sistemas de monitoreo detectan y responden a amenazas potenciales en tiempo real, con un equipo de seguridad dedicado que supervisa constantemente la infraestructura.
                      </p>
                    </div>
                  </div>
                </li>
                
                <li className="bg-black/30 rounded-xl p-4 border border-white/5">
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Control de Acceso</h4>
                      <p className="text-[#BBBBBB] text-sm">
                        Sistema granular de permisos y autenticación de múltiples factores para garantizar que solo personal autorizado pueda acceder a información sensible.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              
              <div className="flex items-center justify-center p-5 bg-[#7B61FF]/5 rounded-xl border border-[#7B61FF]/20">
                <p className="text-white text-center">
                  Cumplimos con todas las normativas aplicables de protección de datos y realizamos auditorías de seguridad periódicas para mantener los más altos estándares.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Sección de Personalización Avanzada
const PersonalizationSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16 bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-300"
    >
      <div className="flex items-center mb-6">
        <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/5">
          <Settings className="w-8 h-8 text-[#7B61FF]" />
        </div>
        <h3 className="text-2xl font-bold text-white ml-5">Personalización Avanzada</h3>
      </div>
      
      <p className="text-[#BBBBBB] mb-6">
        NeuralCrane se adapta completamente a tu marca y necesidades específicas, ofreciendo una experiencia única y personalizada para tu empresa. Nuestras opciones de personalización te permiten crear una herramienta que refleja tu identidad corporativa, mejorando la experiencia de tus empleados y clientes.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-black/30 rounded-xl p-5 border border-white/5">
          <h4 className="text-white font-semibold mb-3">Identidad Visual</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-[#BBBBBB]">Integración de logo corporativo</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-[#BBBBBB]">Esquemas de colores personalizados</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-[#BBBBBB]">Tipografía y estilos de marca</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-[#BBBBBB]">Pantalla de inicio personalizada</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-black/30 rounded-xl p-5 border border-white/5">
          <h4 className="text-white font-semibold mb-3">Funcionalidad a Medida</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-[#BBBBBB]">Dashboards configurables</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-[#BBBBBB]">Reportes personalizados</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-[#BBBBBB]">Perfiles de usuario adaptables</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-[#BBBBBB]">Flujos de trabajo específicos</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-black/30 rounded-xl p-5 border border-white/5">
          <h4 className="text-white font-semibold mb-3">Comunicación Personalizada</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-[#BBBBBB]">Mensajes de bot con tu identidad</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-[#BBBBBB]">Plantillas de notificación a medida</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-[#BBBBBB]">Correos electrónicos con tu marca</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-[#BBBBBB]">Comunicados personalizados</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-[#7B61FF]/5 rounded-xl p-5 border border-[#7B61FF]/20">
        <p className="text-white text-center italic">
          "Valoramos soluciones que se adaptan al cambio. Con NeuralCrane, hemos implementado una herramienta que integra nuestra marca y procesos específicos, lo que ha mejorado la coordinación entre nuestras unidades y elevado nuestro estándar de servicio."
          <span className="block mt-2 font-semibold">— Elizabeth A., Directora de Operaciones</span>
        </p>
      </div>
    </motion.div>
  );
};

// Sección de Detalles Técnicos Clave
const TechnicalDetailsSection = () => {
  return (
    <section className="relative bg-[#0B0B0F] py-[120px] overflow-hidden" id="technical-details">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Detalles Técnicos Clave
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[800px] mx-auto">
            Tecnología avanzada que impulsa los resultados operativos con transparencia y seguridad.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información sobre APIs y Geolocalización */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-300"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 mr-4">
                <Globe className="h-7 w-7 text-[#7B61FF]" />
              </div>
              <h3 className="text-xl font-semibold text-white">Integración APIs y Geolocalización</h3>
            </div>
            
            <p className="text-[#BBBBBB] mb-6">
              Con NeuralCrane, cada unidad se conecta al sistema mediante una integración robusta con dispositivos GPS y diversas APIs. Esto permite una transmisión constante de datos en tiempo real, visualizando en un mapa la posición exacta y el estado operativo de cada grúa, sin costos adicionales.
            </p>
            
            <div className="bg-black/30 rounded-xl p-6 border border-white/5 mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">Sin Cargos Adicionales</h4>
              <p className="text-[#BBBBBB]">
                No tendrás que pagar tarifas adicionales por las APIs de geolocalización. Estas funcionalidades están incluidas dentro de tu plan, utilizando proveedores confiables para ofrecerte seguimiento en tiempo real sin costos extras. Esto te permite concentrarte en optimizar tu operación sin preocuparte por gastos tecnológicos adicionales.
              </p>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-[#BBBBBB]">Transmisión automática de coordenadas GPS cada 60 segundos</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-[#BBBBBB]">Integración con plataformas líderes de GPS y rastreo</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-[#BBBBBB]">Compatibilidad con múltiples proveedores de servicios de mapas</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-[#BBBBBB]">Conexión con APIs de tráfico en tiempo real para optimización de rutas</span>
              </li>
            </ul>
          </motion.div>
          
          {/* Detalle sobre reducción del error humano */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-300"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 mr-4">
                <Shield className="h-7 w-7 text-[#7B61FF]" />
              </div>
              <h3 className="text-xl font-semibold text-white">Reducción del Error Humano</h3>
            </div>
            
            <p className="text-[#BBBBBB] mb-6">
              Al automatizar procesos críticos como la tarificación y la asignación de servicios, NeuralCrane minimiza significativamente los errores humanos, lo que se traduce en cobros más precisos, reducción de pérdidas económicas y una mayor rentabilidad operativa.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                <h4 className="text-white font-semibold mb-2">Antes</h4>
                <p className="text-[#BBBBBB] text-sm">
                  Errores frecuentes en tarificación por cálculos manuales, pérdida de hasta 20% de ingresos por tarifas mal aplicadas y alta dependencia de personal experimentado.
                </p>
              </div>
              
              <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                <h4 className="text-white font-semibold mb-2">Con NeuralCrane</h4>
                <p className="text-[#BBBBBB] text-sm">
                  Reducción del 95% en errores de tarificación, incremento de ingresos al cobrar correctamente todos los servicios y menor dependencia de personal especializado.
                </p>
              </div>
            </div>
            
            <div className="bg-[#7B61FF]/5 rounded-xl p-5 border border-[#7B61FF]/20 mb-6">
              <p className="text-white italic text-sm">
                "Como propietario de una empresa de grúas con 12 unidades, antes enfrentábamos frecuentes errores en la tarificación que afectaban nuestros ingresos. Desde que implementamos NeuralCrane, la automatización de procesos críticos ha reducido drásticamente estos errores, permitiéndonos cobrar con precisión y aumentar notablemente la rentabilidad."
                <span className="block mt-2 font-semibold">— Ricardo V., Propietario</span>
              </p>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-[#BBBBBB]">Cálculo automático preciso de distancias, tiempos y costos</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-[#BBBBBB]">Validación en tiempo real de datos críticos para prevenir errores</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-[#BBBBBB]">Sistemas de alerta para desviaciones significativas de parámetros normales</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NeuralCrane;