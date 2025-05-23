import React from 'react';
import { CheckCircle, Layers, Zap, MessageCircle, BarChart, Globe, Cpu, BarChart2 } from 'lucide-react';
import AnimateOnScroll from '@/components/AnimateOnScroll';

const FeaturesSection = () => {
  const features = [
    {
      title: "Optimización de Rutas y Asignación Automática",
      icon: <BarChart className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Algoritmo propio para asignación secuencial optimizada (ASO)",
        "Reducción de desplazamientos sin carga y tiempos muertos",
        "Asignación automática basada en disponibilidad, ubicación y tipo de grúa"
      ]
    },
    {
      title: "Monitoreo en Tiempo Real",
      icon: <Globe className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Panel de control con mapa en vivo de unidades",
        "Seguimiento de servicios desde la solicitud hasta la finalización",
        "Alertas inteligentes ante desviaciones o retrasos"
      ]
    },
    {
      title: "Automatización de Procesos Críticos",
      icon: <Cpu className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Tarificación automática y validación de servicios",
        "Generación de reportes y estadísticas en tiempo real",
        "Integración con sistemas ERP y GPS externos"
      ]
    },
    {
      title: "Análisis Predictivo y Reportes Avanzados",
      icon: <BarChart2 className="h-7 w-7 text-[#7B61FF]" />,
      points: [
        "Predicción de demanda y optimización de recursos",
        "Alertas proactivas para mantenimiento y disponibilidad",
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
        <AnimateOnScroll
          animation="fadeUp"
          duration={0.7}
          className="text-center mb-16"
          style={{
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)"
          }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Características Innovadoras
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[800px] mx-auto">
            NeuralCrane no es solo un ERP, es un sistema operativo completo que transforma la gestión de tu flotilla de grúas con tecnología de vanguardia.
          </p>
        </AnimateOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <AnimateOnScroll
              key={feature.title}
              animation="fadeUp"
              delay={0.1 + (index * 0.15)}
              duration={0.7}
              threshold={0.1}
              className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-200 hover:shadow-[0_0_25px_rgba(123,97,255,0.1)]"
              style={{
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)"
              }}
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
            </AnimateOnScroll>
          ))}
        </div>
        
        <AnimateOnScroll
          animation="fadeUp"
          delay={0.6}
          duration={0.7}
          threshold={0.1}
          className="mt-16 bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-200"
          style={{
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)"
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/5">
              <Layers className="w-8 h-8 text-[#7B61FF]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Integraciones y Conectividad Avanzada</h3>
              <p className="text-[#BBBBBB]">
                Facilitamos la integración con casas de asistencia y sistemas externos, incluyendo plataformas GPS para seguimiento en tiempo real. Nuestra arquitectura está diseñada para evolucionar, con nuevas integraciones en desarrollo continuo.
              </p>
            </div>
          </div>
        </AnimateOnScroll>
        
        {/* Sección de Asignación Secuencial Optimizada (ASO) */}
        <AnimateOnScroll
          animation="fadeUp"
          delay={0.7}
          duration={0.7}
          threshold={0.1}
          className="mt-16 bg-gradient-to-br from-[#15161B] to-[#1A1B22] border border-[#7B61FF]/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(123,97,255,0.1)]"
          style={{
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)"
          }}
        >
          <div className="flex flex-col">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl bg-[#7B61FF]/10 border border-[#7B61FF]/30">
                <Zap className="w-8 h-8 text-[#7B61FF]" />
              </div>
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-white">Algoritmo de Asignación Secuencial Optimizada (ASO)</h3>
                <p className="text-[#BBBBBB] mt-1">
                  El núcleo inteligente que revoluciona la asignación de servicios
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div className="bg-[#FFFFFF08] p-5 rounded-xl">
                <h4 className="text-lg font-medium text-white mb-3">Operación Más Eficiente</h4>
                <p className="text-[#BBBBBB]">
                  Nuestro algoritmo ASO optimiza en tiempo real cada asignación, reduciendo hasta un 40% los tiempos muertos y kilómetros recorridos sin carga.
                </p>
              </div>
              <div className="bg-[#FFFFFF08] p-5 rounded-xl">
                <h4 className="text-lg font-medium text-white mb-3">Asignación Inteligente</h4>
                <p className="text-[#BBBBBB]">
                  Considera ubicación, capacidad, tipo de grúa y estado operativo para asignar el recurso más adecuado automáticamente.
                </p>
              </div>
              <div className="bg-[#FFFFFF08] p-5 rounded-xl">
                <h4 className="text-lg font-medium text-white mb-3">Redistribución Predictiva</h4>
                <p className="text-[#BBBBBB]">
                  Anticipa la demanda y redistribuye recursos automáticamente para optimizar la cobertura y respuesta.
                </p>
              </div>
              <div className="bg-[#FFFFFF08] p-5 rounded-xl">
                <h4 className="text-lg font-medium text-white mb-3">Adaptación Continua</h4>
                <p className="text-[#BBBBBB]">
                  El algoritmo aprende y mejora constantemente basado en datos históricos y patrones operativos.
                </p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default FeaturesSection;
