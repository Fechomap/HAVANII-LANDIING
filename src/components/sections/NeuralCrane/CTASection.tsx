import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useHomeNavigation } from '@/hooks/useHomeNavigation';

const CTASection = () => {
  const { goToHome } = useHomeNavigation();
  return (
    <section className="relative bg-[#09090C] py-[120px] overflow-hidden">
      {/* Overlay Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-22%] z-0 h-[340px] w-[820px] -translate-x-1/2 blur-[170px]"
        style={{ background: "rgba(123,97,255,0.05)" }}
      />
      <div className="relative z-10 max-w-[800px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "linear", repeatType: "mirror" }}
          style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          className="text-3xl md:text-4xl font-extrabold leading-tight text-white"
        >
          ¿Listo para transformar la forma en que gestionas tu parque de grúas?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "linear", repeatType: "mirror" }}
          style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          className="mt-6 text-lg md:text-xl text-[#BBBBBB] max-w-[560px] mx-auto"
        >
          Descubre la diferencia y lleva tu operación al siguiente nivel. Agenda una demostración personalizada o inicia tu prueba gratuita de 1 mes hoy mismo.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "linear", repeatType: "mirror" }}
          style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link to="/#contacto" onClick={goToHome}>
            <Button className="px-8 py-4 rounded-full bg-white text-[#7B61FF] font-bold shadow-[0_0_15px_rgba(123,97,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,97,255,0.6)] hover:outline-[#7B61FF] hover:outline-2 hover:outline-offset-4 relative overflow-hidden group">
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#7B61FF]/10 to-[#7B61FF]/40 transition-all duration-300 group-hover:w-full"></span>
              <span className="relative z-10 flex items-center">
                Solicitar Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Button>
          </Link>
          <Link to="/#contacto" onClick={goToHome}>
            <Button variant="outline" className="px-8 py-4 rounded-full border border-white/40 text-white/90 hover:bg-white hover:text-[#060E15] transition-colors">
              Prueba Gratuita de 1 Mes
            </Button>
          </Link>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: "linear", repeatType: "mirror" }}
          style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          className="mt-8 text-sm text-[#BBBBBB]/70"
        >
          Contáctanos en soporte@neuralcrane.com o al +52 55 1234 5678
        </motion.p>
      </div>
    </section>
  );
};

export default CTASection;
