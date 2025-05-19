// src/components/sections/TechnologyStack/TechnologyStackSection.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { useIntersection } from '@/hooks/useIntersection';

const TechnologyStackSection = () => {
  // Ref para la sección que activará las animaciones
  const sectionRef = useIntersection(
    (entry) => {
      if (entry.isIntersecting) {
        // Animation will be handled by Framer Motion
      }
    },
    { 
      root: null,
      rootMargin: '0px',
      threshold: 0.4,
      once: true
    }
  );

  // Animaciones
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

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
      ref={sectionRef}
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={headingVariants}
          className="text-center"
        >
          <h2
            id="tech-stack-title"
            className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight"
          >
            Nuestro Arsenal Tecnológico
          </h2>

          <p className="mx-auto mt-6 max-w-[680px] text-center text-[#BBBBBB] text-lg md:text-xl">
            Combinamos lenguajes de programación de vanguardia con las herramientas de IA más potentes para crear soluciones que destacan.
          </p>
        </motion.div>

        {/* Sección de Lenguajes de Programación */}
        <div className="mt-16">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xl font-semibold text-white text-center mb-8"
          >
            Lenguajes de Programación
          </motion.h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-center"
          >
            {programmingTech.map((tech) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-lg group-hover:border-[#7B61FF]/30 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(123,97,255,0.2)]">
                  {renderTechIcon(tech)}
                </div>
                <span className="mt-3 text-sm text-white/70 group-hover:text-white transition-colors duration-200">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Sección de Frameworks y Librerías */}
        <div className="mt-20">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xl font-semibold text-white text-center mb-8"
          >
            Frameworks y Librerías
          </motion.h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-center"
          >
            {frameworks.map((tech) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-lg group-hover:border-[#7B61FF]/30 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(123,97,255,0.2)]">
                  {renderTechIcon(tech)}
                </div>
                <span className="mt-3 text-sm text-white/70 group-hover:text-white transition-colors duration-200">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Sección de Herramientas de IA */}
        <div className="mt-20">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xl font-semibold text-white text-center mb-8"
          >
            Inteligencia Artificial
          </motion.h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-center"
          >
            {aiTools.map((tech) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-lg group-hover:border-[#7B61FF]/30 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(123,97,255,0.2)]">
                  {renderTechIcon(tech)}
                </div>
                <span className="mt-3 text-sm text-white/70 group-hover:text-white transition-colors duration-200">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Sección de Herramientas de Desarrollo */}
        <div className="mt-20">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xl font-semibold text-white text-center mb-8"
          >
            Bases de Datos y Herramientas
          </motion.h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-center"
          >
            {devTools.map((tech) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-lg group-hover:border-[#7B61FF]/30 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(123,97,255,0.2)]">
                  {renderTechIcon(tech)}
                </div>
                <span className="mt-3 text-sm text-white/70 group-hover:text-white transition-colors duration-200">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Texto de cierre */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16 text-lg text-[#7B61FF]/90 font-medium"
        >
          La combinación perfecta para tu próximo proyecto
        </motion.p>
      </div>
    </section>
  );
};

export default TechnologyStackSection;