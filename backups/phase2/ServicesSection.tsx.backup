import { ScrollReveal } from '@/components/ScrollReveal';
import ServiceCard from './ServiceCard';
import { services } from './servicesData';

const ServicesSection = () => {
  return (
    <section
      aria-labelledby="services-title"
      id="servicios"
      className="relative bg-[#0B0B0F] overflow-hidden"
      style={{
        backgroundImage: 'url("/assets/noise.png")',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-x-0 top-0 h-[160px] bg-gradient-to-b from-white/[0.035] to-transparent" />

      <div className="relative max-w-[1240px] mx-auto px-6 md:px-12 lg:px-24 py-[140px] md:py-[180px]">
        
        {/* Título principal */}
        <ScrollReveal animation="fadeUp" duration={0.8}>
          <h2
            id="services-title"
            className="text-center text-3xl md:text-4xl font-extrabold text-white"
          >
            Soluciones a Tu Medida: Impulsamos Tu Crecimiento y Eficiencia
          </h2>
        </ScrollReveal>

        <ScrollReveal animation="fadeUp" delay={0.2} duration={0.8}>
          <p className="mt-6 text-center mx-auto max-w-[680px] text-[#BBBBBB] text-lg md:text-xl">
            Descubre nuestros servicios personalizados que transforman tu negocio.
          </p>
        </ScrollReveal>

        {/* Grid de servicios con stagger effect */}
        <div className="relative mt-20 grid grid-cols-1 sm:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <ScrollReveal
              key={index}
              animation="fadeUp"
              delay={0.4 + (index * 0.1)} // Stagger effect
              duration={0.6}
              threshold={0.1}
            >
              <ServiceCard {...service} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;