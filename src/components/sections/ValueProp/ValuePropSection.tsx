import React from 'react';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import BenefitPillar from './BenefitPillar';
import { benefitsData } from './benefitsData';

// Componente memoizado para mejor rendimiento
const ValuePropSection: React.FC = React.memo(() => {
  return (
    <section
      aria-labelledby="vp-title"
      className="relative bg-[#0D0D11] z-10"
    >
      {/* Top edge gradient overlay */}
      <div className="absolute inset-x-0 top-0 h-[120px] bg-gradient-to-b from-white/[0.04] to-transparent" />

      {/* Main content container */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24 py-[120px] md:py-[160px]">
        
        {/* Título principal con AnimateOnScroll */}
        <AnimateOnScroll animation="fadeUp" duration={0.8}>
          <h2
            id="vp-title"
            className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight text-center"
          >
            Tecnología Que Impulsa, No Que Frena: La Ventaja Havani
          </h2>
        </AnimateOnScroll>

        {/* Subtítulo con AnimateOnScroll */}
        <AnimateOnScroll animation="fadeUp" delay={0.2} duration={0.8}>
          <p className="mx-auto mt-6 max-w-[680px] text-center text-[#BBBBBB] text-lg md:text-xl">
            Transformamos la complejidad técnica en soluciones claras y efectivas, permitiéndote enfocarte en hacer crecer tu negocio mientras nosotros nos encargamos del desarrollo.
          </p>
        </AnimateOnScroll>

        {/* Grid de beneficios con stagger effect */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {benefitsData.map((benefit, index) => (
            <AnimateOnScroll 
              key={`benefit-${index}`}
              animation="fadeUp"
              delay={0.4 + (index * 0.1)} // Stagger personalizado
              duration={0.6}
              threshold={0.1} // Más sensible
            >
              <BenefitPillar {...benefit} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
});

// Añadir displayName para herramientas de desarrollo
ValuePropSection.displayName = 'ValuePropSection';

export default ValuePropSection;