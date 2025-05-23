import React from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';

const AIComparisonSection = () => {
  return (
    <section className="relative bg-[#0B0B0F] py-[120px] overflow-hidden" id="ai-comparison">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24">
        <ScrollReveal
          animation="fadeUp"
          duration={0.7}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Más Allá de las Etiquetas: Tecnología Real
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[800px] mx-auto">
            Por qué elegimos la transparencia y la eficiencia comprobada en lugar de etiquetas de marketing.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollReveal
            animation="slideLeft"
            duration={0.7}
            className="bg-[#15161B] border border-white/5 rounded-2xl p-8 hover:shadow-[0_0_25px_rgba(123,97,255,0.1)] transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Lo que Otros Llaman "IA"</h3>
            <div className="space-y-6">
              <div className="bg-[#0B0B0F] border border-red-500/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">Etiquetado de Marketing</h4>
                <p className="text-[#BBBBBB]">
                  Algoritmos básicos rebautizados como "inteligencia artificial" para capitalizar las tendencias del mercado.
                </p>
              </div>
              <div className="bg-[#0B0B0F] border border-red-500/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">Modelos Generalistas</h4>
                <p className="text-[#BBBBBB]">
                  Sistemas no especializados que requieren constante intervención humana y producen resultados inconsistentes.
                </p>
              </div>
              <div className="bg-[#0B0B0F] border border-red-500/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">Consumo Excesivo de Recursos</h4>
                <p className="text-[#BBBBBB]">
                  Soluciones que requieren infraestructura costosa y generan gastos operativos desproporcionados.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal
            animation="slideRight"
            duration={0.7}
            className="bg-[#15161B] border border-[#7B61FF]/20 rounded-2xl p-8 hover:shadow-[0_0_25px_rgba(123,97,255,0.1)] transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Nuestro Enfoque de Precisión</h3>
            <div className="space-y-6">
              <div className="bg-[#0B0B0F] border border-[#7B61FF]/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">Algoritmos Optimizados para el Sector</h4>
                <p className="text-[#BBBBBB]">
                  Soluciones algorítmicas desarrolladas específicamente para la industria de grúas, con optimizaciones basadas en datos reales del sector.
                </p>
              </div>
              <div className="bg-[#0B0B0F] border border-[#7B61FF]/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">Aprendizaje Contextual</h4>
                <p className="text-[#BBBBBB]">
                  Sistemas que aprenden de los patrones operativos de tu empresa para mejorar continuamente la eficiencia en asignaciones y rutas.
                </p>
              </div>
              <div className="bg-[#0B0B0F] border border-[#7B61FF]/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">Automatización Eficiente</h4>
                <p className="text-[#BBBBBB]">
                  Procesos automatizados que funcionan de manera autónoma y confiable, optimizando recursos y reduciendo costos operativos reales.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal
          animation="fadeUp"
          delay={0.4}
          duration={0.7}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-[#15161B] px-6 py-4 rounded-full border border-[#7B61FF]/30">
            <p className="text-lg text-white font-medium">
              NeuralCrane: <span className="text-[#7B61FF]">Tecnología con propósito</span>, no buzzwords de marketing
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AIComparisonSection;
