import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useHomeNavigation } from '@/hooks/useHomeNavigation';
import HomeTransition from '@/components/transitions/HomeTransition';
import { ArrowRight, CheckCircle, FileText, MessageCircle, Users, CreditCard, Database, Shield, Clock, Globe, Receipt, Tag } from 'lucide-react';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';

// Componentes UI base de Havani
import { Button } from '@/components/ui/button';
import FooterSection from '@/components/sections/Footer/FooterSection';

const FacturAPISaaS = () => {
  // Hook para la navegación a Home con transición
  const { goToHome, isTransitioning, completeTransition } = useHomeNavigation();
  
  // Establecer el título de la página y el fondo
  useEffect(() => {
    document.title = 'FacturAPI SaaS | Havani - Facturación Electrónica Simple';
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
        {/* Sección ¿Qué es FacturAPI SaaS? */}
        <AboutSection />
        
        {/* Características clave */}
        <FeaturesSection />
        
        {/* Beneficios */}
        <BenefitsSection />
        
        {/* Cómo funciona */}
        <HowItWorksSection />
        
        {/* Planes y precios */}
        <PlansSection />
        
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
  // Acceder al hook de navegación en el contexto del componente
  const { goToHome } = useHomeNavigation();
  
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
            <span className="block">FacturAPI</span>
            <span className="block text-[#7B61FF]">SaaS</span>
            <span className="block text-3xl md:text-4xl mt-2">Facturación Electrónica Simple</span>
          </h1>
          
          <p className="mt-6 max-w-[540px] text-lg md:text-xl text-[#CCCCCC] tracking-tight">
            Plataforma multi-tenant de facturación electrónica para México que simplifica la emisión y gestión de facturas a través de un bot de Telegram y una interfaz web.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-10">
            <Link to="/#contacto">
              <Button className="px-8 py-4 rounded-full bg-white text-[#7B61FF] font-bold shadow-[0_0_15px_rgba(123,97,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,97,255,0.6)] hover:outline-[#7B61FF] hover:outline-2 hover:outline-offset-4 relative overflow-hidden group">
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#7B61FF]/10 to-[#7B61FF]/40 transition-all duration-300 group-hover:w-full"></span>
                <span className="relative z-10">Comenzar Prueba Gratuita</span>
              </Button>
            </Link>
            
            <Link to="/#valor" onClick={(e) => {
              if (e.currentTarget.getAttribute('href') === '/') {
                goToHome(e);
              }
            }}>
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
            alt="Interfaz de FacturAPI SaaS con ejemplos de facturas y bot de Telegram" 
            className="w-full max-w-[760px] h-auto rounded-[32px] border border-white/6 shadow-[0_40px_60px_-10px_rgba(0,0,0,.6)] translate-y-[40px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  // Acceder al hook de navegación en el contexto del componente
  const { goToHome } = useHomeNavigation();

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
            ¿Qué es FacturAPI SaaS?
          </h2>
          
          <p className="mt-8 text-lg leading-relaxed text-[#BBBBBB] max-w-[900px] mx-auto">
            FacturAPI SaaS es una plataforma multi-tenant de facturación electrónica para México que elimina la complejidad técnica y administrativa de la emisión de facturas. Permite a pequeñas y medianas empresas generar y gestionar facturas CFDI de manera sencilla a través de un bot de Telegram y una interfaz web, sin necesidad de conocimientos técnicos especializados y garantizando el cumplimiento fiscal.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  // Acceder al hook de navegación en el contexto del componente
  const { goToHome } = useHomeNavigation();
  
  const features = [
    {
      title: "Bot de Telegram para Facturación Rápida",
      icon: <MessageCircle className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Emisión de facturas desde cualquier dispositivo a través de conversaciones en Telegram",
        "Clientes predefinidos configurados automáticamente (INFOASIST, ARSA, PROTECCIÓN SOS, CHUBB)",
        "Acceso inmediato sin necesidad de instalar aplicaciones adicionales",
        "Comandos intuitivos para crear facturas en segundos"
      ]
    },
    {
      title: "Gestión Multi-tenant",
      icon: <Users className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Separación segura de datos entre diferentes organizaciones (tenants)",
        "Cada tenant gestiona sus propios clientes, productos y facturas",
        "Sistema de permisos por roles (admin, user, readonly) para control de acceso",
        "Configuración personalizada de folios y series por tenant"
      ]
    },
    {
      title: "Suscripciones y Pagos",
      icon: <CreditCard className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Planes de suscripción con diferentes límites de facturas mensuales",
        "Integración con Stripe para pagos recurrentes automatizados",
        "Períodos de prueba gratuitos de 14 días para evaluación del servicio",
        "Escalado automático según necesidades de facturación"
      ]
    },
    {
      title: "Almacenamiento y Documentación",
      icon: <Database className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Almacenamiento seguro de documentos fiscales (PDF y XML)",
        "Organización automática por año/mes para fácil localización",
        "Sistema de folios automatizado con series configurables",
        "Respaldo y exportación de documentos cuando se necesite"
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
            FacturAPI SaaS ofrece un conjunto completo de funcionalidades diseñadas para simplificar la facturación electrónica.
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
  // Acceder al hook de navegación en el contexto del componente
  const { goToHome } = useHomeNavigation();
  
  const benefits = [
    {
      title: "Ahorro de Tiempo y Recursos",
      description: "Reduce el tiempo de emisión de facturas de minutos a segundos mediante comandos simples. Elimina la necesidad de personal especializado en facturación y automatiza tareas repetitivas.",
      icon: <Clock className="h-8 w-8 text-[#7B61FF]" />
    },
    {
      title: "Cumplimiento Fiscal Garantizado",
      description: "Todas las facturas cumplen con los requisitos del SAT y la legislación vigente. Actualizaciones automáticas ante cambios en normativas fiscales y cancelación con motivos SAT integrados.",
      icon: <Shield className="h-8 w-8 text-[#7B61FF]" />
    },
    {
      title: "Accesibilidad y Flexibilidad",
      description: "Acceso desde cualquier lugar mediante Telegram o interfaz web. No requiere infraestructura tecnológica adicional y es escalable según las necesidades de facturación de la empresa.",
      icon: <Globe className="h-8 w-8 text-[#7B61FF]" />
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
            FacturAPI SaaS transforma la forma en que tu empresa emite y gestiona facturas, ahorrando tiempo y garantizando el cumplimiento fiscal.
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
  // Acceder al hook de navegación en el contexto del componente
  const { goToHome } = useHomeNavigation();
  
  const steps = [
    {
      number: "01",
      title: "Registro y configuración",
      description: "Registro y configuración inicial del tenant con datos fiscales de la empresa."
    },
    {
      number: "02",
      title: "Carga de certificado",
      description: "Carga del certificado de sello digital (CSD) para habilitación de facturación."
    },
    {
      number: "03",
      title: "Configuración de clientes",
      description: "Configuración automática o manual de clientes frecuentes en el sistema."
    },
    {
      number: "04",
      title: "Emisión de facturas",
      description: "Emisión de facturas mediante comandos en Telegram o interfaz web."
    },
    {
      number: "05",
      title: "Gestión de documentos",
      description: "Almacenamiento, envío y gestión de facturas emitidas desde la plataforma."
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
            Cómo Funciona FacturAPI SaaS
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[800px] mx-auto">
            Un proceso sencillo que te permite comenzar a facturar en minutos.
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

// Plans Section
const PlansSection = () => {
  // Acceder al hook de navegación en el contexto del componente
  const { goToHome } = useHomeNavigation();
  
  const plans = [
    {
      name: "Básico",
      price: "$499",
      description: "Ideal para pequeñas empresas con volumen bajo de facturación",
      features: [
        "Hasta 50 facturas al mes",
        "Bot de Telegram para facturación",
        "1 Usuario administrador",
        "Soporte por correo electrónico"
      ],
      highlight: false
    },
    {
      name: "Profesional",
      price: "$999",
      description: "Para empresas con volumen medio de facturación",
      features: [
        "Hasta 200 facturas al mes",
        "Bot de Telegram para facturación",
        "5 Usuarios con diferentes roles",
        "Soporte prioritario",
        "Reportes mensuales de facturación"
      ],
      highlight: true
    },
    {
      name: "Empresarial",
      price: "$1,999",
      description: "Para empresas con alto volumen de facturación",
      features: [
        "Hasta 500 facturas al mes",
        "Bot de Telegram para facturación",
        "Usuarios ilimitados",
        "Soporte 24/7",
        "Reportes personalizados",
        "API para integraciones"
      ],
      highlight: false
    }
  ];
  return (
    <section className="relative bg-[#0B0B0F] py-[120px] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Planes y Precios
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[800px] mx-auto">
            Elige el plan que mejor se adapte a las necesidades de facturación de tu empresa.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={`bg-[#15161B] border ${plan.highlight ? 'border-[#7B61FF]/50' : 'border-white/5'} rounded-2xl p-8 flex flex-col items-center hover:border-[#7B61FF]/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(123,97,255,0.1)] relative ${plan.highlight ? 'shadow-[0_0_25px_rgba(123,97,255,0.15)]' : ''}`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#7B61FF] text-white text-sm font-bold py-1 px-4 rounded-full">
                  Más popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <div className="flex items-end justify-center">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-[#BBBBBB] ml-1">MXN/mes</span>
                </div>
                <p className="text-sm text-[#BBBBBB] mt-3 max-w-[250px]">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 w-full mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-[#BBBBBB]">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto pt-4">
                <Link to="/#contacto" onClick={(e) => {
                  if (e.currentTarget.getAttribute('href') === '/') {
                    goToHome(e);
                  }
                }}>
                  <Button className={`w-full rounded-full ${plan.highlight ? 'bg-[#7B61FF] text-white hover:bg-[#6A50E0]' : 'bg-white/10 text-white hover:bg-white/20'} font-semibold transition-colors`}>
                    Comenzar Prueba Gratuita
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-8 text-sm text-center text-[#BBBBBB]/70"
        >
          Todos los planes incluyen un período de prueba gratuito de 14 días. No se requiere tarjeta de crédito para comenzar.
        </motion.p>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  // Acceder al hook de navegación en el contexto del componente
  const { goToHome } = useHomeNavigation();
  
  return (
    <section className="relative bg-[#09090C] py-[120px] overflow-hidden">
      {/* Overlay Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-240px] z-0 h-[340px] w-[820px] -translate-x-1/2 blur-[170px]"
        style={{ background: "rgba(123,97,255,0.05)", willChange: 'transform, opacity' }}
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
          Facturación electrónica tan simple como enviar un mensaje
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "linear" }}
          style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          className="mt-6 text-lg md:text-xl text-[#BBBBBB] max-w-[560px] mx-auto"
        >
          Comienza hoy con tu período de prueba gratuito de 14 días y descubre cómo FacturAPI SaaS puede transformar la facturación electrónica de tu empresa.
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
            <Button className="px-8 py-4 rounded-full bg-white text-[#7B61FF] font-bold shadow-[0_0_15px_rgba(123,97,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,97,255,0.6)] relative overflow-hidden group">
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#7B61FF]/10 to-[#7B61FF]/40 transition-all duration-300 group-hover:w-full"></span>
              <span className="relative z-10 flex items-center">
                Comenzar Prueba Gratuita 
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Button>
          </Link>
          
          <a href="https://t.me/FacturAPIBot" target="_blank" rel="noopener noreferrer">
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
          Para asistencia adicional, contacta a nuestro equipo a través del bot o visita nuestra página web.
        </motion.p>
      </div>
    </section>
  );
};

export default FacturAPISaaS;