import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useHomeNavigation } from '@/hooks/useHomeNavigation';
import HomeTransition from '@/components/transitions/HomeTransition';
import { ArrowRight, CheckCircle, MessageCircle, Map, DollarSign, Truck, Clock, Shield, Smartphone, Globe } from 'lucide-react';

// Componentes UI base de Havani
import { Button } from '@/components/ui/button';
import FooterSection from '@/components/sections/Footer/FooterSection';

const TelegramBot = () => {
  // Hook para la navegación a Home con transición
  const { goToHome, isTransitioning, completeTransition } = useHomeNavigation();
  
  // Establecer el título de la página y el fondo
  useEffect(() => {
    document.title = 'Bot de Seguimiento para Telegram | Havani - Seguimiento de Expedientes';
    document.body.classList.add('bg-bg-body');
    document.body.classList.add('text-text-primary');
    
    // Limpiar al desmontar
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
        {/* Sección ¿Qué es el Bot de Telegram? */}
        <AboutSection />
        
        {/* Características clave */}
        <FeaturesSection />
        
        {/* Beneficios */}
        <BenefitsSection />
        
        {/* Cómo funciona */}
        <HowItWorksSection />
        
        {/* Información técnica y compatibilidad */}
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
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[180%] h-[140%] z-0"
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
        >
          <div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/10 text-sm font-semibold text-white hover:bg-white/20 w-max">
            Solución Havani 
            <motion.span
              whileHover={{ x: 4 }}
              transition={{ duration: 0.15 }}
              className="w-4 h-4"
            >
              →
            </motion.span>
          </div>
          
          <h1 className="mt-4 text-[clamp(44px,6vw,76px)] font-extrabold leading-[1.1] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,.5)]">
            <span className="block">Seguimiento</span>
            <span className="block text-[#7B61FF]">de Expedientes</span>
            <span className="block">en Telegram</span>
          </h1>
          
          <p className="mt-6 max-w-[540px] text-lg md:text-xl text-[#CCCCCC] tracking-tight">
            Asistente virtual que permite a tus clientes consultar y dar seguimiento a sus expedientes de servicio en tiempo real, directamente desde Telegram.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-10">
            <Link to="/#contacto">
              <Button className="px-8 py-4 rounded-full bg-white text-[#7B61FF] font-bold shadow-[0_0_15px_rgba(123,97,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,97,255,0.6)] hover:outline-[#7B61FF] hover:outline-2 hover:outline-offset-4 relative overflow-hidden group">
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#7B61FF]/10 to-[#7B61FF]/40 transition-all duration-300 group-hover:w-full"></span>
                <span className="relative z-10">Solicitar Implementación</span>
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
          transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1.7] }}
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
            alt="Interfaz del Bot de Telegram para seguimiento de expedientes" 
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "linear" }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            ¿Qué es el Bot de Seguimiento para Telegram?
          </h2>
          
          <p className="mt-8 text-lg leading-relaxed text-[#BBBBBB] max-w-[900px] mx-auto">
            Nuestro Bot de Seguimiento para Telegram es un asistente virtual que permite a los clientes consultar y dar seguimiento a sus expedientes de servicio de grúas en tiempo real. Elimina la necesidad de realizar llamadas telefónicas o visitas presenciales para obtener información actualizada sobre el estado de los servicios, proporcionando toda la información necesaria a través de una interfaz conversacional intuitiva disponible 24/7.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      title: "Consulta de Expedientes",
      icon: <MessageCircle className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Búsqueda rápida mediante número de expediente",
        "Visualización inmediata del estatus actual del servicio",
        "Información básica del cliente, vehículo y destino",
        "Interfaz conversacional intuitiva mediante Telegram"
      ]
    },
    {
      title: "Información de Costos",
      icon: <DollarSign className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Desglose detallado de los costos del servicio",
        "Diferenciación entre servicios locales y carreteros",
        "Visualización de costos adicionales (casetas, resguardo, maniobras)",
        "Transparencia total en cargos aplicados"
      ]
    },
    {
      title: "Datos de Unidad y Operador",
      icon: <Truck className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Información del operador asignado al servicio",
        "Detalles de la grúa (tipo, color, número económico, placas)",
        "Identificación visual de la unidad en servicio",
        "Contacto directo con la unidad cuando es necesario"
      ]
    },
    {
      title: "Seguimiento en Tiempo Real",
      icon: <Map className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Ubicación GPS actual de la grúa en servicio",
        "Enlace directo a Google Maps para visualización de ubicación",
        "Tiempo estimado restante para la llegada",
        "Actualizaciones automáticas del progreso del servicio"
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
          transition={{ duration: 0.5, ease: "linear" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Características Clave
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[800px] mx-auto">
            Nuestro Bot de Telegram ofrece funcionalidades diseñadas para brindar una experiencia completa de seguimiento a tus clientes.
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
                ease: "linear",
                repeatType: "mirror"
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
      title: "Atención 24/7",
      description: "Disponibilidad constante para consultas, independientemente de horarios de oficina. Acceso instantáneo a información actualizada sin tiempos de espera.",
      icon: <Clock className="h-8 w-8 text-[#7B61FF]" />
    },
    {
      title: "Transparencia en el Servicio",
      description: "Visibilidad completa de costos, cargos y detalles del servicio. Seguimiento en tiempo real del progreso y conocimiento exacto de quién está atendiendo la solicitud.",
      icon: <Shield className="h-8 w-8 text-[#7B61FF]" />
    },
    {
      title: "Mejora en la Experiencia",
      description: "Interfaz conversacional intuitiva mediante Telegram. Reducción de incertidumbre durante la espera del servicio y autonomía para obtener información.",
      icon: <Smartphone className="h-8 w-8 text-[#7B61FF]" />
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
          transition={{ duration: 0.5, ease: "linear" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Beneficios para tus Clientes
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[800px] mx-auto">
            Mejora la satisfacción y fidelidad de tus clientes ofreciendo una forma moderna y eficiente de dar seguimiento a sus servicios.
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
                ease: "linear",
                repeatType: "mirror"
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
      title: "Inicio de la conversación",
      description: "El usuario inicia la conversación con el bot mediante el comando /start en Telegram."
    },
    {
      number: "02",
      title: "Selección de opciones",
      description: "Selecciona 'Seguimiento de Expediente' del menú principal presentado por el bot."
    },
    {
      number: "03",
      title: "Ingreso del expediente",
      description: "Ingresa su número de expediente cuando el bot lo solicita para iniciar la consulta."
    },
    {
      number: "04",
      title: "Información básica",
      description: "Recibe información básica del expediente (estatus, servicio, datos del vehículo)."
    },
    {
      number: "05",
      title: "Opciones específicas",
      description: "Accede a un menú con opciones específicas (costo, datos unidad, ubicación, tiempos)."
    }
  ];

  return (
    <section className="relative bg-[#0D0D11] py-[140px] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "linear" }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Cómo Funciona el Bot de Telegram
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[800px] mx-auto">
            Un proceso sencillo e intuitivo para que tus clientes obtengan toda la información que necesitan.
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
                  ease: "linear"
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
    "Compatible con cualquier dispositivo que soporte Telegram",
    "Disponible para iOS, Android, Windows, macOS y navegadores web",
    "Desarrollado en Node.js con integración a APIs REST",
    "No requiere instalación adicional, solo buscar el bot en Telegram"
  ];

  const integrations = [
    "Conexión con sistemas internos de seguimiento",
    "APIs de geolocalización para seguimiento en tiempo real",
    "Integración con Google Maps para visualización de ubicación",
    "Conexión con bases de datos de expedientes existentes"
  ];

  const supportFeatures = [
    "Mejoras continuas en funcionalidad y experiencia de usuario",
    "Comando /help disponible para asistencia básica",
    "Interfaz autoexplicativa que no requiere entrenamiento especial",
    "Mensajes de ayuda contextual en cada etapa del proceso"
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
            transition={{ duration: 0.5, ease: "linear" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Información Técnica
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
            transition={{ duration: 0.5, delay: 0.15, ease: "linear" }}
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
            transition={{ duration: 0.5, delay: 0.3, ease: "linear" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Soporte y Asistencia
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
          Tu expediente siempre a un mensaje de distancia
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.6, 0.8, 0.25, 1] }}
          className="mt-6 text-lg md:text-xl text-[#BBBBBB] max-w-[560px] mx-auto"
        >
          Mejora la experiencia de tus clientes implementando nuestro Bot de Seguimiento para Telegram. Contacta con nosotros para una demostración personalizada.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.6, 0.8, 0.25, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link to="/#contacto">
            <Button className="px-8 py-4 rounded-full bg-white text-[#7B61FF] font-bold shadow-[0_0_15px_rgba(123,97,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,97,255,0.6)] relative overflow-hidden group">
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#7B61FF]/10 to-[#7B61FF]/40 transition-all duration-300 group-hover:w-full"></span>
              <span className="relative z-10 flex items-center">
                Implementar Ahora 
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Button>
          </Link>
          
          <a href="https://t.me/HavaniExampleBot" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="px-8 py-4 rounded-full border border-white/40 text-white/90 hover:bg-white hover:text-[#060E15] transition-colors">
              <MessageCircle className="w-5 h-5 mr-2" />
              Ver Demo en Telegram
            </Button>
          </a>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-8 text-sm text-[#BBBBBB]/70"
        >
          Para asistencia adicional, comunícate con soporte@havani.com
        </motion.p>
      </div>
    </section>
  );
};

export default TelegramBot;