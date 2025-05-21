import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Layers, Zap, MessageCircle, BarChart, Globe, Cpu, BarChart2 } from 'lucide-react';

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
              className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-200 hover:shadow-[0_0_25px_rgba(123,97,255,0.1)]"
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
          className="mt-16 bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-200"
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

export default FeaturesSection;
