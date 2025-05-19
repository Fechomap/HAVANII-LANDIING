import React from "react";

const rows = [
  [
    "Proceso / Metodología",
    "Rígido, lento (cascada), burocrático, fases interminables.",
    'Ágil, rápido, simple ("Sin Tanto Rollo"), enfocado en valor constante.'
  ],
  [
    "Comunicación",
    "Opaca, llena de jerga técnica, formal y distante.",
    "Directa, clara, en tu idioma. Transparencia total en cada paso."
  ],
  [
    "Enfoque / Prioridades",
    "Cumplir el contrato al pie de la letra, a veces sobre‑ingeniería.",
    "Entregar resultados prácticos que impulsen tu negocio. Innovación con propósito."
  ],
  [
    "Tecnología",
    "Lenta adopción, uso de tecnologías legadas o complejas sin necesidad.",
    "Uso inteligente de tecnología de punta para eficiencia y mejores soluciones."
  ],
  [
    "Tiempos de Entrega",
    "Plazos largos, frecuentes retrasos, entrega única al final.",
    "Ciclos cortos, entregas rápidas y funcionales, visibilidad del progreso."
  ],
  [
    "Relación Cliente",
    "Transaccional, silos entre equipos, poca cercanía.",
    "Partnership real (trabajamos contigo), equipo accesible y colaborador."
  ],
  [
    "Resultado Final",
    "A menudo costoso, tardado y no 100 % alineado a la necesidad real.",
    "Solución efectiva, a tiempo, dentro del presupuesto y que realmente funciona para ti."
  ],
];

const ComparisonSection = () => {
  return (
    <section aria-labelledby="cmp-title" className="relative bg-[#0D0D11] pt-0 pb-0 overflow-hidden">
      {/* Top divider wave */}
      <svg
        className="absolute top-0 left-0 w-full h-[110px] z-10 text-white/4"
        viewBox="0 0 1440 110"
        fill="none"
        preserveAspectRatio="none"
        focusable="false"
        aria-hidden="true"
      >
        <path d="M0,0 Q400,110 900,90 Q1200,80 1440,110 L1440,0 L0,0 Z" fill="currentColor" opacity="0.04" />
      </svg>

      <div className="relative max-w-[1100px] mx-auto px-6 md:px-12 lg:px-24 py-[140px] md:py-[180px]">
        <h2 id="cmp-title" className="text-center text-3xl md:text-4xl font-extrabold text-white">
          Havani vs. El Método Tradicional: ¿Por Qué Elegir Diferente?
        </h2>
        <p className="mt-6 text-center mx-auto max-w-[720px] text-[#BBBBBB] text-lg md:text-xl">
          No todo el desarrollo de software es igual; compara nuestro enfoque con el que suele complicar proyectos.
        </p>
        
        {/* Contenedor de la tabla con el borde neon */}
        <div className="mt-20 relative rounded-xl">
          {/* Simple neon glow border */}
          <div className="absolute -inset-[2px] rounded-xl bg-[#7B61FF] opacity-70 z-10"
               style={{ 
                 boxShadow: "0 0 15px 5px rgba(123, 97, 255, 0.5)", 
                 filter: "blur(1px)" 
               }} 
          />
          
          {/* Contenido de la tabla con fondo negro */}
          <div className="relative rounded-xl overflow-hidden bg-black border border-transparent z-20">
            <div
              className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#2A2B30] scrollbar-track-transparent rounded-lg focus:outline focus:outline-2 focus:outline-accent"
              role="region"
              aria-labelledby="cmp-title"
              tabIndex={0}
            >
              <table className="w-full text-left border-separate border-spacing-y-0 min-w-[760px]">
                <thead>
                  <tr className="text-xs md:text-base font-semibold tracking-wide uppercase text-[#BBBBBB]">
                    <th className="w-[28%] px-6 py-3 bg-black">Característica</th>
                    <th className="w-[36%] px-6 py-3 bg-black text-[#FF5F5F]">
                      <div className="flex items-center gap-1">
                        Desarrollo Tradicional <span aria-hidden="true">😟</span>
                      </div>
                    </th>
                    <th className="w-[36%] px-6 py-3 bg-black text-[#7B61FF]">
                      <div className="flex items-center gap-1">
                        Havani <span aria-hidden="true">✨</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody id="cmp-body">
                  {rows.map(([feat, trad, havani], i) => (
                    <tr
                      key={feat}
                      className={i % 2 === 0 ? "bg-[#0A0A0A]" : "bg-black"}
                    >
                      <th scope="row" className="px-6 py-5 font-medium text-white">
                        {feat}
                      </th>
                      <td className="px-6 py-5 text-[#CCCCCC]">{trad}</td>
                      <td className="px-6 py-5 text-white">{havani}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Mobile scroll hint */}
              <span aria-hidden="true"
                className="absolute right-4 bottom-4 text-[#BBBBBB]/60 text-xs font-medium select-none pointer-events-none hidden sm:block"
              >
                Desliza →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;