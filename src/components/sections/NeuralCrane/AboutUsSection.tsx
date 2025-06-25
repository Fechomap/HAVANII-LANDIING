import React from 'react';
import { motion } from 'framer-motion';

const AboutUsSection = () => {
  return (
    <section className="relative bg-[#0D0D11] py-[140px] overflow-hidden" id="about-us">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "linear", repeatType: "mirror" }}
          style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Sobre NeuralCrane</h2>
          <p className="text-lg text-[#BBBBBB] max-w-2xl mx-auto mb-8">
            Nuestra misión, visión y valores impulsan cada aspecto de nuestra plataforma.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "linear", repeatType: "mirror" }}
            style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-200"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Misión</h3>
            <p className="text-[#BBBBBB]">
              Transformar la industria de grúas y asistencia vial mediante tecnología avanzada, automatización y un enfoque centrado en el cliente.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "linear", repeatType: "mirror" }}
            style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-200"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Visión</h3>
            <p className="text-[#BBBBBB]">
              Ser la plataforma líder en digitalización y eficiencia operativa para empresas de grúas y asistencia vial en Latinoamérica.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "linear", repeatType: "mirror" }}
            style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-200"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Valores</h3>
            <ul className="list-disc list-inside text-[#BBBBBB] space-y-2">
              <li>Innovación constante</li>
              <li>Transparencia y ética</li>
              <li>Orientación a resultados</li>
              <li>Compromiso con el cliente</li>
              <li>Excelencia operativa</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
