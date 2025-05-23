import React from 'react';
import { motion } from 'framer-motion';

const EfficiencyAndSecuritySection = () => {
  return (
    <section className="relative bg-[#0B0B0F] py-[120px] overflow-hidden" id="efficiency-security">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "linear" }}
          style={{
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)"
          }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Eficiencia y Seguridad</h2>
          <p className="text-lg text-[#BBBBBB] max-w-2xl mx-auto mb-8">
            Optimiza tus operaciones y protege tus datos con tecnología de punta, cifrado y monitoreo constante.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "linear" }}
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-200"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Seguridad Integral</h3>
            <p className="text-[#BBBBBB]">
              Tus datos están protegidos con cifrado de nivel empresarial, autenticación avanzada y monitoreo 24/7 para máxima tranquilidad.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EfficiencyAndSecuritySection;
