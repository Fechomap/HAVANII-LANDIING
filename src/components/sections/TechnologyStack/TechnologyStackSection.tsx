// src/components/sections/TechnologyStack/TechnologyStackSection.tsx

import React from 'react';
import AnimateOnScroll from '@/components/AnimateOnScroll';

const TechnologyStackSection = () => {
  // Datos de los lenguajes de programación y frameworks
  const programmingTech = [
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
    { name: 'Python', icon: 'devicon-python-plain colored' },
    { name: 'C#', icon: 'devicon-csharp-plain colored' },
    { name: 'PHP', icon: 'devicon-php-plain colored' },
    { name: 'Java', icon: 'devicon-java-plain colored' },
    { name: 'Go', icon: 'devicon-go-plain colored' },
    { name: 'Ruby', icon: 'devicon-ruby-plain colored' },
    { name: 'Swift', icon: 'devicon-swift-plain colored' },
    { name: 'Kotlin', icon: 'devicon-kotlin-plain colored' }
  ];

  // Frameworks y librerías
  const frameworks = [
    { name: 'React', icon: 'devicon-react-original colored' },
    { name: 'Angular', icon: 'devicon-angularjs-plain colored' },
    { name: 'Vue', icon: 'devicon-vuejs-plain colored' },
    { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
    { name: '.NET', icon: 'devicon-dot-net-plain colored' },
    { name: 'Laravel', icon: 'devicon-laravel-plain colored' },
    { name: 'Django', icon: 'devicon-django-plain colored' },
    { name: 'Electron', icon: 'devicon-electron-original colored' },
    { name: 'Flutter', icon: 'devicon-flutter-plain colored' },
    { name: 'Express', icon: 'devicon-express-original colored' }
  ];

  // Herramientas y plataformas de IA
  const aiTools = [
    { name: 'TensorFlow', icon: 'devicon-tensorflow-original colored' },
    { name: 'PyTorch', icon: 'devicon-pytorch-original colored' },
    { name: 'Pandas', icon: 'devicon-pandas-original colored' },
    { name: 'NumPy', icon: 'devicon-numpy-original colored' },
    { name: 'Jupyter', icon: 'devicon-jupyter-plain colored' },
    { name: 'OpenAI', customIcon: true, color: '#10a37f' },
    { name: 'Langchain', customIcon: true, color: '#2e8555' },
    { name: 'Claude', customIcon: true, color: '#6f42c1' },
    { name: 'Gemini', customIcon: true, color: '#4285f4' },
    { name: 'Hugging Face', customIcon: true, color: '#ffd21e' }
  ];

  // Bases de datos y herramientas de desarrollo
  const devTools = [
    { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
    { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
    { name: 'Docker', icon: 'devicon-docker-plain colored' },
    { name: 'AWS', icon: 'devicon-amazonwebservices-original colored' },
    { name: 'Git', icon: 'devicon-git-plain colored' },
    { name: 'Tailwind', icon: 'devicon-tailwindcss-plain colored' },
    { name: 'Firebase', icon: 'devicon-firebase-plain colored' },
    { name: 'GraphQL', icon: 'devicon-graphql-plain colored' },
    { name: 'Figma', icon: 'devicon-figma-plain colored' }
  ];

  // Renderizar un icono de tecnología
  const renderTechIcon = (tech) => {
    if (tech.customIcon) {
      // Para las herramientas de IA sin ícono en Devicon, usamos las iniciales con el color apropiado
      return (
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white"
          style={{ backgroundColor: tech.color }}
        >
          {tech.name.substring(0, 2)}
        </div>
      );
    } else {
      return <i className={`${tech.icon} text-4xl`} aria-hidden="true"></i>;
    }
  };

  return (
    <section
      aria-labelledby="tech-stack-title"
      className="relative bg-[#0D0D11] overflow-hidden py-[100px]"
      style={{
        backgroundImage: 'url("/assets/noise.png")',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Top edge gradient overlay */}
      <div className="absolute inset-x-0 top-0 h-[120px] bg-gradient-to-b from-white/[0.04] to-transparent" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Título principal */}
        <AnimateOnScroll animation="fadeUp" duration={0.8}>
          <h2
            id="tech-stack-title"
            className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight text-center"
          >
            Nuestro Arsenal Tecnológico
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fadeUp" delay={0.2} duration={0.8}>
          <p className="mx-auto mt-6 max-w-[680px] text-center text-[#BBBBBB] text-lg md:text-xl">
            Combinamos lenguajes de programación de vanguardia con las herramientas de IA más potentes para crear soluciones que destacan.
          </p>
        </AnimateOnScroll>

        {/* Sección de Lenguajes de Programación */}
        <div className="mt-16">
          <AnimateOnScroll animation="fadeUp" delay={0.4}>
            <h3 className="text-xl font-semibold text-white text-center mb-8">
              Lenguajes de Programación
            </h3>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-center">
            {programmingTech.map((tech, index) => (
              <AnimateOnScroll
                key={tech.name}
                animation="scaleUp"
                delay={0.6 + (index * 0.05)} // Stagger más rápido
                duration={0.4} // Más rápido
                threshold={0.1} // Más sensible
              >
                <div className="flex flex-col items-center group">
                  <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-lg group-hover:border-[#7B61FF]/30 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(123,97,255,0.2)]">
                    {renderTechIcon(tech)}
                  </div>
                  <span className="mt-3 text-sm text-white/70 group-hover:text-white transition-colors duration-200">
                    {tech.name}
                  </span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* Sección de Frameworks y Librerías */}
        <div className="mt-20">
          <AnimateOnScroll animation="fadeUp" delay={0.2}>
            <h3 className="text-xl font-semibold text-white text-center mb-8">
              Frameworks y Librerías
            </h3>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-center">
            {frameworks.map((tech, index) => (
              <AnimateOnScroll
                key={tech.name}
                animation="scaleUp"
                delay={0.4 + (index * 0.05)}
                duration={0.4}
                threshold={0.1}
              >
                <div className="flex flex-col items-center group">
                  <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-lg group-hover:border-[#7B61FF]/30 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(123,97,255,0.2)]">
                    {renderTechIcon(tech)}
                  </div>
                  <span className="mt-3 text-sm text-white/70 group-hover:text-white transition-colors duration-200">
                    {tech.name}
                  </span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* Sección de Herramientas de IA */}
        <div className="mt-20">
          <AnimateOnScroll animation="fadeUp" delay={0.2}>
            <h3 className="text-xl font-semibold text-white text-center mb-8">
              Inteligencia Artificial
            </h3>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-center">
            {aiTools.map((tech, index) => (
              <AnimateOnScroll
                key={tech.name}
                animation="scaleUp"
                delay={0.4 + (index * 0.05)}
                duration={0.4}
                threshold={0.1}
              >
                <div className="flex flex-col items-center group">
                  <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-lg group-hover:border-[#7B61FF]/30 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(123,97,255,0.2)]">
                    {renderTechIcon(tech)}
                  </div>
                  <span className="mt-3 text-sm text-white/70 group-hover:text-white transition-colors duration-200">
                    {tech.name}
                  </span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* Sección de Herramientas de Desarrollo */}
        <div className="mt-20">
          <AnimateOnScroll animation="fadeUp" delay={0.2}>
            <h3 className="text-xl font-semibold text-white text-center mb-8">
              Bases de Datos y Herramientas
            </h3>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-center">
            {devTools.map((tech, index) => (
              <AnimateOnScroll
                key={tech.name}
                animation="scaleUp"
                delay={0.4 + (index * 0.05)}
                duration={0.4}
                threshold={0.1}
              >
                <div className="flex flex-col items-center group">
                  <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-lg group-hover:border-[#7B61FF]/30 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(123,97,255,0.2)]">
                    {renderTechIcon(tech)}
                  </div>
                  <span className="mt-3 text-sm text-white/70 group-hover:text-white transition-colors duration-200">
                    {tech.name}
                  </span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* Texto de cierre */}
        <AnimateOnScroll animation="fadeUp" delay={0.6}>
          <p className="text-center mt-16 text-lg text-[#7B61FF]/90 font-medium">
            La combinación perfecta para tu próximo proyecto
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default TechnologyStackSection;