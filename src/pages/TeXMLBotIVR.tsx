import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useHomeNavigation } from '@/hooks/useHomeNavigation';
import HomeTransition from '@/components/transitions/HomeTransition';
import { ArrowRight, CheckCircle, Phone, Bot, Clock, BarChart2, Headphones, Server, Users, Mic, Database, Settings } from 'lucide-react';

// Componentes UI base de Havani
import { Button } from '@/components/ui/button';
import FooterSection from '@/components/sections/Footer/FooterSection';

const TeXMLBotIVR = () => {
  // Hook para la navegación a Home con transición
  const { goToHome, isTransitioning, completeTransition } = useHomeNavigation();
  
  // Establecer el título de la página y el fondo
  useEffect(() => {
    document.title = 'TeXML Bot IVR | Havani - Sistema de Respuesta de Voz Interactiva';
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
        {/* Sección ¿Qué es TeXML Bot IVR? */}
        <AboutSection />
        
        {/* Características clave */}
        <FeaturesSection />
        
        {/* Beneficios */}
        <BenefitsSection />
        
        {/* Cómo funciona */}
        <HowItWorksSection />
        
        {/* Requisitos del sistema */}
        <RequirementsSection />
        
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
  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden flex flex-col pt-32 md:pt-48">
      {/* Nebulosa glow */}
      <div 
        className="absolute top-[240px] left-1/2 -translate-x-1/2 w-[1800px] h-[900px] z-0"
        style={{
          background: '#7B61FF33',
          filter: 'blur(160px)',
          mixBlendMode: 'normal',
          willChange: 'transform, opacity'
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
            Solución Havani 
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
            <span className="block">TeXML Bot</span>
            <span className="block text-[#7B61FF]">IVR</span>
            <span className="block text-3xl md:text-4xl mt-2">Sistema de Respuesta de Voz Interactiva</span>
          </h1>
          
          <p className="mt-6 max-w-[540px] text-lg md:text-xl text-[#CCCCCC] tracking-tight">
            Automatiza la atención telefónica de tus clientes para consultas de expedientes y cotización de servicios vía telefónica con tecnología de IA avanzada.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-10">
            <Link to="/#contacto">
              <Button className="px-8 py-4 rounded-full bg-white text-[#7B61FF] font-bold shadow-[0_0_15px_rgba(123,97,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,97,255,0.6)] hover:outline-[#7B61FF] hover:outline-2 hover:outline-offset-4 relative overflow-hidden group">
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#7B61FF]/10 to-[#7B61FF]/40 transition-all duration-300 group-hover:w-full"></span>
                <span className="relative z-10">Solicitar Demo</span>
              </Button>
            </Link>
            
            <Link to="/#valor">
              <Button variant="outline" className="px-8 py-4 rounded-full border border-white/40 text-white/90 hover:bg-white hover:text-[#060E15] transition-colors">
                Conocer Más
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
            alt="Interfaz del sistema TeXML Bot IVR con flujo de llamadas" 
            className="w-full max-w-[760px] h-auto rounded-[32px] border border-white/6 shadow-[0_40px_60px_-10px_rgba(0,0,0,.6)] translate-y-[40px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section
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
        <ScrollReveal
          animation="fadeUp"
          duration={0.6}
          threshold={0.4}
          once={true}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            ¿Qué es TeXML Bot IVR?
          </h2>
          
          <p className="mt-8 text-lg leading-relaxed text-[#BBBBBB] max-w-[900px] mx-auto">
            TeXML Bot IVR es un Sistema de Respuesta de Voz Interactiva (IVR) que automatiza la consulta de expedientes y la cotización de servicios vía telefónica. Utilizando la tecnología Telnyx TeXML, este sistema elimina la necesidad de personal dedicado a atender consultas rutinarias, proporcionando información actualizada a tus clientes de forma automática, precisa y disponible 24/7.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      title: "Consulta de Expedientes",
      icon: <Phone className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Sistema intuitivo para consulta mediante marcación por tonos (DTMF)",
        "Verificación automática de expedientes con información en tiempo real",
        "Menú contextual adaptado al estatus de cada expediente",
        "Caché optimizado para respuestas rápidas en expedientes frecuentes"
      ]
    },
    {
      title: "Información Detallada",
      icon: <BarChart2 className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Datos generales del expediente (estatus, cliente, vehículo)",
        "Costos detallados (total, desglose, conceptos adicionales)",
        "Ubicación y tiempo estimado de llegada para servicios en proceso",
        "Datos de la unidad operativa y tiempos de servicio"
      ]
    },
    {
      title: "Cotización por Voz",
      icon: <Mic className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Reconocimiento de voz para capturar coordenadas y datos del vehículo",
        "Procesamiento con inteligencia artificial (OpenAI)",
        "Cotización automática basada en distancia y tipo de vehículo",
        "Confirmación verbal de la información capturada"
      ]
    },
    {
      title: "Arquitectura Robusta",
      icon: <Server className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Sistema de caché con Redis para alto rendimiento",
        "Monitoreo completo con métricas y registros detallados",
        "Manejo inteligente de errores con reintentos automáticos",
        "Transferencia a agentes humanos cuando sea necesario"
      ]
    }
  ];

  return (
    <section className="relative bg-[#0B0B0F] py-[120px] overflow-hidden">
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
            Características Clave
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[800px] mx-auto">
            TeXML Bot IVR ofrece un conjunto completo de funcionalidades diseñadas para automatizar y mejorar la experiencia de atención telefónica.
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
      </div>
    </section>
  );
};

// Benefits Section
const BenefitsSection = () => {
  const benefits = [
    {
      title: "Reducción de Costos Operativos",
      description: "Disminución de hasta 70% en personal dedicado a atención telefónica básica. Funcionamiento 24/7 sin costos adicionales por horarios extendidos y optimización de recursos humanos.",
      icon: <Clock className="h-8 w-8 text-[#7B61FF]" />
    },
    {
      title: "Mejora en la Experiencia del Cliente",
      description: "Respuestas inmediatas sin tiempos de espera, información actualizada y consistente en cada interacción, y accesibilidad continua a la información del servicio.",
      icon: <Headphones className="h-8 w-8 text-[#7B61FF]" />
    },
    {
      title: "Escalabilidad y Adaptabilidad",
      description: "Capacidad para manejar volúmenes variables de llamadas sin degradación del servicio, adaptación a diferentes tipos de expedientes y fácil integración con sistemas existentes.",
      icon: <Users className="h-8 w-8 text-[#7B61FF]" />
    }
  ];

  return (
    <section className="relative bg-[#09090C] py-[140px] overflow-hidden">
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
            Beneficios para tu Empresa
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[800px] mx-auto">
            TeXML Bot IVR transforma la forma en que gestionas la atención telefónica, aportando valor real a tu operación diaria.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="bg-[#15161B] border border-white/5 rounded-2xl p-8 text-center hover:border-[#7B61FF]/20 transition-all duration-300 hover:shadow-[0_0_25px_rgba(123,97,255,0.1)] flex flex-col items-center"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/5 mb-6">
                {benefit.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4">{benefit.title}</h3>
              <p className="text-[#BBBBBB]">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Llamada al sistema IVR",
      description: "El cliente llama al número telefónico asociado al sistema TeXML Bot IVR."
    },
    {
      number: "02",
      title: "Menú principal",
      description: "El sistema responde con un menú principal ofreciendo opciones de consulta de expediente o cotización."
    },
    {
      number: "03",
      title: "Ingreso de información",
      description: "Para consultas de expediente, el cliente ingresa el número mediante marcación por tonos (DTMF)."
    },
    {
      number: "04",
      title: "Verificación y recuperación",
      description: "El sistema verifica y recupera la información actualizada del expediente en tiempo real."
    },
    {
      number: "05",
      title: "Presentación contextual",
      description: "Se presenta un menú con opciones relevantes según el estatus del expediente, permitiendo seleccionar detalles específicos."
    },
    {
      number: "06",
      title: "Finalización o transferencia",
      description: "El cliente puede finalizar la llamada o transferirse a un agente en cualquier momento del proceso."
    }
  ];

  return (
    <section className="relative bg-[#0D0D11] py-[140px] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Cómo Funciona TeXML Bot IVR
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[800px] mx-auto">
            Un proceso fluido y eficiente que revoluciona la atención telefónica de tus clientes.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Línea de conexión para desktop */}
          <div className="hidden md:block absolute top-[45px] left-[40px] h-[calc(100%-70px)] w-[2px] bg-[#2A2B30]" />
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="flex items-start"
              >
                {/* Número del paso */}
                <div className="relative">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#15161B] border border-[#7B61FF]/30 text-[#7B61FF] font-bold text-xl shadow-[0_0_15px_rgba(123,97,255,0.2)] z-10">
                    {step.number}
                  </div>
                  {/* Punto de conexión */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-[80px] left-[38px] w-[4px] h-[calc(100%+30px)] bg-[#2A2B30] z-0">
                      <div className="absolute top-[70px] left-[-3px] w-[10px] h-[10px] rounded-full bg-[#7B61FF]" />
                    </div>
                  )}
                </div>
                
                {/* Contenido del paso */}
                <div className="ml-8 pt-5">
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-[#BBBBBB] max-w-[600px]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Requirements Section
const RequirementsSection = () => {
  const requirements = [
    "Node.js v18+",
    "Redis para sistema de caché",
    "Cuenta Telnyx con número telefónico",
    "Compatibilidad con cualquier sistema telefónico, fijo o móvil"
  ];

  const integrations = [
    "APIs de consulta de expedientes",
    "Servicios de geolocalización",
    "Sistemas CRM existentes",
    "OpenAI para procesamiento de lenguaje natural"
  ];

  const supportFeatures = [
    "Mejoras continuas y nuevas funcionalidades sin costo adicional",
    "Asistencia 24/7 para resolución de incidencias",
    "Documentación completa y sesiones de capacitación para administradores",
    "Panel de administración con métricas y estadísticas de uso"
  ];

  return (
    <section className="relative bg-[#0B0B0F] py-[120px] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Requisitos del sistema */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Requisitos del Sistema
            </h2>
            
            <ul className="space-y-4">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#BBBBBB]">{req}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Integraciones */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Integraciones Disponibles
            </h2>
            
            <ul className="space-y-4">
              {integrations.map((integration, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#BBBBBB]">{integration}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Soporte y servicios */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Soporte y Servicios
            </h2>
            
            <ul className="space-y-4">
              {supportFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#BBBBBB]">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
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
        className="pointer-events-none absolute left-1/2 top-[-240px] z-0 h-[340px] w-[820px] -translate-x-1/2 blur-[170px]"
        style={{ background: "rgba(123,97,255,0.05)" }}
      />
      
      <div className="relative z-10 max-w-[800px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "linear" }}
          style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          className="text-3xl md:text-4xl font-extrabold leading-tight text-white"
        >
          La información que tus clientes necesitan, al alcance de una llamada
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "linear" }}
          style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          className="mt-6 text-lg md:text-xl text-[#BBBBBB] max-w-[560px] mx-auto"
        >
          Solicita una demostración gratuita para comprobar cómo TeXML Bot IVR puede transformar tu atención al cliente y reducir costos operativos.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "linear" }}
          style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
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
          
          <Link to="/#valor">
            <Button variant="outline" className="px-8 py-4 rounded-full border border-white/40 text-white/90 hover:bg-white hover:text-[#060E15] transition-colors">
              Ver Más Productos
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
          *TeXML Bot IVR - Automatizando la atención telefónica de tus clientes
        </motion.p>
      </div>
    </section>
  );
};

export default TeXMLBotIVR;