import React from 'react';
import AnimateOnScroll from '@/components/AnimateOnScroll';

const EfficiencyAndSecuritySection = () => {
  return (
    <section className="relative bg-[#0B0B0F] py-[120px] overflow-hidden" id="efficiency-security">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 lg:px-24">
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
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Eficiencia y Seguridad</h2>
          <p className="text-lg text-[#BBBBBB] max-w-2xl mx-auto mb-8">
            Optimiza tus operaciones y protege tus datos con tecnología de punta, cifrado y monitoreo constante.
          </p>
        </AnimateOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimateOnScroll
            animation="fadeUp"
            delay={0.1}
            duration={0.7}
            threshold={0.1}
            style={{
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)"
            }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-200"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Automatización Eficiente</h3>
            <p className="text-[#BBBBBB]">
              Reduce tiempos y errores operativos con bots inteligentes que gestionan tareas críticas y optimizan recursos en tiempo real.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start">
                <span className="text-[#7B61FF] mr-2">→</span>
                <span className="text-[#BBBBBB]">Procesos automatizados para asignación y seguimiento</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#7B61FF] mr-2">→</span>
                <span className="text-[#BBBBBB]">Reducción de tiempos muertos y desplazamientos</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#7B61FF] mr-2">→</span>
                <span className="text-[#BBBBBB]">Optimización de rutas y asignación inteligente</span>
              </li>
            </ul>
          </AnimateOnScroll>
          
          <AnimateOnScroll
            animation="fadeUp"
            delay={0.2}
            duration={0.7}
            threshold={0.1}
            style={{
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)"
            }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-200"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Seguridad y Confidencialidad</h3>
            <p className="text-[#BBBBBB]">
              Tu información está protegida con los más altos estándares de seguridad, cifrado de extremo a extremo y controles de acceso granulares.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start">
                <span className="text-[#7B61FF] mr-2">→</span>
                <span className="text-[#BBBBBB]">Cifrado SSL/TLS en todas las comunicaciones</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#7B61FF] mr-2">→</span>
                <span className="text-[#BBBBBB]">Servidores con protección avanzada contra intrusiones</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#7B61FF] mr-2">→</span>
                <span className="text-[#BBBBBB]">Cumplimiento con estándares internacionales de privacidad</span>
              </li>
            </ul>
          </AnimateOnScroll>
        </div>
        
        <AnimateOnScroll
          animation="fadeUp"
          delay={0.3}
          duration={0.7}
          threshold={0.1}
          className="mt-16"
          style={{
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)"
          }}
        >
          <div className="bg-gradient-to-br from-[#15161B] to-[#1A1B22] border border-[#7B61FF]/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(123,97,255,0.1)]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:max-w-[60%]">
                <h3 className="text-xl font-semibold text-white mb-4">Optimización Constante</h3>
                <p className="text-[#BBBBBB]">
                  NeuralCrane evoluciona continuamente, incorporando las últimas tecnologías y mejoras basadas en los patrones de uso de tu empresa para maximizar eficiencia y seguridad.
                </p>
              </div>
              <div className="bg-[#0B0B0F] border border-[#7B61FF]/30 rounded-xl p-6 md:min-w-[280px]">
                <p className="text-center text-lg font-medium text-white mb-2">Actualizaciones continuas</p>
                <p className="text-center text-[#BBBBBB]">
                  Recibe mejoras automáticas sin interrupciones en tu operación
                </p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default EfficiencyAndSecuritySection;
