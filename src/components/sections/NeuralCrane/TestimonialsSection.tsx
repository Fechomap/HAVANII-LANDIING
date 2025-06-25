import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Como propietario de una empresa de grúas con 12 unidades, antes enfrentábamos frecuentes errores en la tarificación que afectaban nuestros ingresos. Desde que implementamos NeuralCrane, la automatización de procesos críticos ha reducido drásticamente estos errores, permitiéndonos cobrar con precisión y aumentar notablemente la rentabilidad.",
    name: "Ricardo V.",
    position: "Propietario",
    company: "Grúas Rápidas"
  },
  {
    quote: "Con 5 grúas en mi empresa, atendíamos en promedio 15 servicios diarios en la Ciudad de México, donde el tráfico ralentizaba la operación. Con NeuralCrane, nuestro sistema permite evaluar solicitudes nuevas que pueden ser atendidas por una grúa a punto de terminar su servicio, lo que nos ha permitido incrementar el volumen de servicios atendidos y eficientar el consumo de combustible y otros recursos.",
    name: "Amaro F.",
    position: "Propietario",
    company: "Asistencia Express"
  },
  {
    quote: "Como coordinador, solíamos contar con 3 o 4 cabinas dedicadas a la gestión de servicios. Con NeuralCrane, automatizamos tareas críticas mediante bots de seguimiento y una tarificación ágil y sin errores, reduciendo la plantilla en cabina a la mitad. Esto nos permite concentrarnos en los eventos críticos y optimizar los recursos, generando importantes ahorros operativos.",
    name: "Román M.",
    position: "Coordinador de Operaciones",
    company: "Servicios CDMX"
  },
  {
    quote: "Como gerente de operaciones, siempre busqué modernizar nuestra gestión. Antes, dependíamos de llamadas constantes que afectaban la productividad. Con NeuralCrane, contamos con una app para operadores y bots que automatizan el seguimiento, lo que ha reducido significativamente el volumen de llamadas y elevado la eficiencia operativa y profesionalismo de nuestra empresa.",
    name: "Manuel V.",
    position: "Gerente de Operaciones",
    company: "Remolques del Norte"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="relative bg-[#0D0D11] py-[120px] overflow-hidden" id="testimonials">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[700px] mx-auto">
            Descubre cómo NeuralCrane ha transformado la operación de empresas de grúas y asistencia vial.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: Math.min(index * 0.05, 0.15),
                ease: "linear",
                repeatType: "mirror"
              }}
              style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
              className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:border-[#7B61FF]/20 transition-all duration-200 hover:shadow-[0_0_25px_rgba(123,97,255,0.1)] relative"
            >
              {/* Comilla decorativa */}
              <div className="absolute top-6 right-6 text-[#7B61FF]/20 text-6xl font-serif">"</div>
              <p className="text-[#BBBBBB] mb-6 relative z-10">"{testimonial.quote}"</p>
              <div className="flex items-center">
                {/* Avatar placeholder */}
                <div className="w-12 h-12 rounded-full bg-[#7B61FF]/20 flex items-center justify-center text-[#7B61FF] font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-[#BBBBBB]">{testimonial.position}, {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
