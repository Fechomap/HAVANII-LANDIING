import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Globe, Shield } from 'lucide-react';

const TechnicalDetailsSection = () => {
  return (
    <section className="relative bg-[#0B0B0F] py-[120px] overflow-hidden" id="technical-details">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "linear" }}
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
            transition={{ duration: 0.6, delay: 0.1, ease: "linear" }}
            style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-200"
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
            transition={{ duration: 0.6, delay: 0.2, ease: "linear" }}
            style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-200"
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

export default TechnicalDetailsSection;
