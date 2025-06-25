import React from 'react';
import { motion } from 'framer-motion';

const PersonalizationSection = () => {
  return (
    <section className="relative bg-[#0B0B0F] py-[120px] overflow-hidden" id="personalization">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "linear", repeatType: "mirror" }}
          style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Personalización y Escalabilidad</h2>
          <p className="text-lg text-[#BBBBBB] max-w-2xl mx-auto mb-8">
            NeuralCrane se adapta a las necesidades de tu empresa, sin importar el tamaño o complejidad de tus operaciones. Configura bots, reportes y flujos de trabajo a tu medida.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "linear", repeatType: "mirror" }}
            style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-200"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Configuración Flexible</h3>
            <p className="text-[#BBBBBB]">
              Personaliza cada aspecto de la plataforma: desde la interfaz y branding hasta los flujos de aprobación, reportes y notificaciones.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "linear", repeatType: "mirror" }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-200"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Escala sin Límites</h3>
            <p className="text-[#BBBBBB]">
              NeuralCrane crece contigo: desde pequeñas flotillas hasta grandes operaciones multi-ciudad, la plataforma asegura rendimiento y estabilidad a cualquier escala.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizationSection;
