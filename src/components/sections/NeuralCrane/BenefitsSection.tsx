import React from 'react';
import { motion } from 'framer-motion';

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
          transition={{ duration: 0.6, ease: "linear", repeatType: "mirror" }}
          style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
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
              transition={{ duration: 0.6, ease: "linear", repeatType: "mirror" }}
              style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
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
                    ease: "linear",
                    repeatType: "mirror"
                  }}
                  style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
                  className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-200 hover:shadow-[0_0_25px_rgba(123,97,255,0.1)] h-full"
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
              transition={{ duration: 0.6, ease: "linear", repeatType: "mirror" }}
              style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
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
                    ease: "linear",
                    repeatType: "mirror"
                  }}
                  style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
                  className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-200 hover:shadow-[0_0_25px_rgba(123,97,255,0.1)] h-full"
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

export default BenefitsSection;
