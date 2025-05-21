import React from 'react';
import { motion } from 'framer-motion';

const AIComparisonSection = () => {
  return (
    <section className="relative bg-[#0B0B0F] py-[120px] overflow-hidden" id="ai-comparison">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Más Allá de las Etiquetas: Tecnología Real
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[800px] mx-auto">
            Por qué elegimos la transparencia y la eficiencia comprobada en lugar de etiquetas de marketing.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-200"
          >
            <h3 className="text-xl font-semibold text-white mb-6">El Marketing vs. La Realidad</h3>
            <p className="text-[#BBBBBB] mb-4">
              La mayoría de los competidores se autodenominan "IA", pero en realidad lo que ofrecen es una automatización básica con algoritmos convencionales. En NeuralCrane preferimos ser transparentes: nuestra solución se basa en procesos avanzados y comprobados que generan resultados operativos reales, sin recurrir a etiquetas de IA que, en la práctica, no aportan valor añadido.
            </p>
            <p className="text-[#BBBBBB]">
              Aunque "IA" suena futurista, muchas ofertas se limitan a técnicas de automatización sin emplear modelos robustos de aprendizaje profundo ni conexiones en tiempo real. Nosotros sabemos que la "IA" que se promociona en el mercado carece de las verdaderas capacidades de integración —no manejan LLM ni procesos avanzados—.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-200"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Nuestro Enfoque: Resultados sobre Etiquetas</h3>
            <p className="text-[#BBBBBB] mb-4">
              Te invitamos a cuestionar lo que se conoce como "IA" en el mercado. NeuralCrane se diferencia porque se enfoca en optimizar la operatividad con herramientas comprobadas que reducen errores y maximizan el rendimiento. Mientras otros usan el término IA como etiqueta de marketing, nosotros entregamos resultados medibles y una plataforma confiable, diseñada para funcionar de verdad en entornos críticos.
            </p>
            <p className="text-[#BBBBBB]">
              Estamos a la vanguardia tecnológica y ya estamos entrenando modelos de IA que se integrarán en futuras versiones de nuestra plataforma. Nuestro compromiso es incorporar funcionalidades genuinas de IA que aporten automatización total y optimicen aún más la operatividad, una vez que la tecnología se vuelva robusta y costeable.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIComparisonSection;
