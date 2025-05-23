import { ScrollReveal } from '@/components/ScrollReveal';
import ProcessStep from './ProcessStep';
import { processSteps } from './processData';

const ProcessSection = () => {
  return (
    <section
      aria-labelledby="process-title"
      id="proceso"
      className="relative bg-[#0D0D11] overflow-hidden"
    >
      {/* Top decorative wave */}
      <svg 
        className="absolute top-0 left-0 w-full h-[120px]" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path 
          d="M0,0 C150,20 350,0 500,15 C650,30 700,60 900,50 C1050,40 1150,10 1200,0 L1200,120 L0,120 Z" 
          fill="rgba(255,255,255,0.03)" 
        />
      </svg>
      
      {/* Main content container */}
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 lg:px-24 py-[140px] md:py-[180px] flex flex-col">
        
        {/* Título principal */}
        <ScrollReveal animation="fadeUp" duration={0.8}>
          <h2 
            id="process-title" 
            className="text-white text-center text-3xl md:text-4xl font-extrabold leading-snug"
          >
            Tu Éxito en 4 Pasos: Nuestro Proceso Simple y Rápido
          </h2>
        </ScrollReveal>
        
        <ScrollReveal animation="fadeUp" delay={0.2} duration={0.8}>
          <p className="mt-6 text-center max-w-[700px] mx-auto text-[#BBBBBB] text-lg md:text-xl">
            Olvídate de procesos interminables y la burocracia. Trabajamos de manera ágil y eficiente para que puedas ver resultados cuanto antes.
          </p>
        </ScrollReveal>
        
        {/* Contenedor principal con líneas conectoras */}
        <div className="relative mt-20">
          
          {/* Línea conectora horizontal - DESKTOP */}
          <div className="absolute hidden lg:block top-[44px] left-0 w-full h-2 z-0">
            <ScrollReveal animation="fadeIn" delay={0.8} duration={1.2}>
              <svg 
                width="100%" 
                height="2" 
                viewBox="0 0 100 2" 
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path 
                  d="M0 1 L100 1" 
                  stroke="#2A2B30" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
                
                {/* Connecting dots */}
                {[0, 33.33, 66.66, 100].map((position, i) => (
                  <circle 
                    key={i}
                    cx={`${position}%`} 
                    cy="1" 
                    r="4" 
                    fill="#7B61FF"
                  />
                ))}
              </svg>
            </ScrollReveal>
          </div>
          
          {/* Línea vertical para móvil */}
          <div className="absolute lg:hidden left-[34px] top-[120px] h-[calc(100%-140px)] w-[2px] bg-[#2A2B30]" />
          
          {/* CONTENEDOR PARA ESCRITORIO - flexbox para garantizar que los 4 pasos estén alineados */}
          <div className="hidden lg:flex justify-between items-start w-full">
            {processSteps.map((step, index) => (
              <div key={index} className="flex-1 max-w-[280px] px-4">
                <ScrollReveal
                  animation="fadeUp"
                  delay={0.4 + (index * 0.15)}
                  duration={0.6}
                  threshold={0.1}
                >
                  <ProcessStep
                    index={index + 1}
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                  />
                </ScrollReveal>
              </div>
            ))}
          </div>
          
          {/* CONTENEDOR PARA MÓVIL - se mantiene como estaba */}
          <div className="lg:hidden space-y-16">
            {processSteps.map((step, index) => (
              <ScrollReveal
                key={index}
                animation="fadeUp"
                delay={0.4 + (index * 0.15)}
                duration={0.6}
                threshold={0.1}
              >
                <ProcessStep
                  index={index + 1}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;