
/**
 * @component FooterSection
 * 
 * Footer principal de la aplicación que contiene:
 * - Enlaces de navegación organizados en columnas
 * - Enlaces a redes sociales
 * - Información legal y de copyright
 * - Animaciones y micro-interacciones en los enlaces
 */

import { motion } from "framer-motion"; // Importar motion de framer-motion para animaciones
import { Twitter, Linkedin, Github, Zap, Cpu, Sparkles } from "lucide-react"; // Importar iconos de redes sociales y tech
import { Link } from "react-router-dom";
import { useHomeNavigation } from '@/hooks/useHomeNavigation';

// Configuración de las columnas del footer
const footerColumns = [
  {
    title: "Producto",
    links: [
      { label: "Servicios", href: "#services" },
      { label: "Productos", href: "#flagship-products" },
      { label: "Precios", href: "/pricing" },
      { label: "Roadmap", href: "#" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { label: "Nuestra Historia", href: "#our-story" },
      { label: "Testimonios", href: "#testimonials" },
      { label: "Contacto", href: "/#contacto" },
      { label: "Carreras (Próximamente)", href: "/404" },
    ],
  },
  {
    title: "Recursos",
    links: [
      {
        label: "Plantillas",
        href: "https://framer.com/templates",
        target: "_blank",
        rel: "noopener",
      },
      {
        label: "Assets",
        href: "https://framer.com/assets",
        target: "_blank",
      },
      { label: "Blog (Próximamente)", href: "/blog" },
      { label: "Soporte", href: "mailto:hello@havani.dev" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Política de Privacidad", href: "/privacy" },
      { label: "Términos de Servicio", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

// Variantes de animación para las columnas
const colVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 + i * 0.13, duration: 0.55, ease: [0.27, 0.72, 0.29, 0.94] },
  }),
};

// Componente de partículas flotantes
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-gradient-to-r from-[#7B61FF] to-[#00D4FF] rounded-full opacity-30"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

// Grid pattern de fondo
const GridPattern = () => (
  <div className="absolute inset-0 opacity-10">
    <div 
      className="w-full h-full"
      style={{
        backgroundImage: `
          linear-gradient(rgba(123, 97, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(123, 97, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}
    />
  </div>
);

const FooterSection = () => {
  const { goToHome } = useHomeNavigation();

  return (
  <footer
    aria-label="Información legal y enlaces"
    className="relative bg-gradient-to-b from-[#060E15] via-[#0A1220] to-[#060E15] overflow-hidden"
  >
    {/* Efectos de fondo tech */}
    <GridPattern />
    <FloatingParticles />
    
    {/* Gradiente animado superior */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7B61FF] to-transparent opacity-60" />
    
    {/* Divider wave SVG top */}
    <div aria-hidden="true" className="pointer-events-none select-none absolute top-0 inset-x-0 z-10" style={{ height: "100px" }}>
      <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M0 60L48 56.7C96 53.3 192 47 288 59.7C384 73 480 117 576 130.3C672 143 768 126 864 100.3C960 73 1056 37 1152 30C1248 23 1344 47 1392 59.7L1440 72V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V60Z"
          fill="rgba(255,255,255,.04)"
        />
      </svg>
    </div>

    {/* Container */}
    <nav
      className="relative max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 py-[100px] md:py-[140px] grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 md:gap-x-16 text-sm z-20"
      aria-label="Mapa del sitio"
    >
      {footerColumns.map((col, i) => (
        <motion.div
          key={col.title}
          className="flex flex-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={i}
          variants={colVariants}
        >
          <h3 className="mb-6 font-semibold tracking-wide uppercase text-[#BBBBBB]">{col.title}</h3>
          <ul className="space-y-4">
            {col.links.map(link => (
              <li key={link.label}>
                {link.href === "/#contacto" ? (
                  <Link
                    to={link.href}
                    className="footer-link"
                    onClick={(e) => {
                      // Si el enlace es a la página principal con un ancla, usamos goToHome
                      if (e.currentTarget.getAttribute('href')?.startsWith('/#')) {
                        goToHome(e);
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="footer-link"
                    {...(link.target ? {target: link.target} : {})}
                    {...(link.rel ? {rel: link.rel} : {})}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </nav>

    {/* Tech Stack Section */}
    <motion.div 
      className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-4">
          <Cpu className="w-4 h-4 text-[#7B61FF]" />
          <span className="text-[#BBBBBB] text-xs uppercase tracking-wide font-semibold">Construido con IA</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-[#888888] text-sm">
          <div className="flex items-center gap-2 hover:text-[#7B61FF] transition-colors">
            <Zap className="w-3 h-3" />
            <span>Next.js</span>
          </div>
          <div className="flex items-center gap-2 hover:text-[#7B61FF] transition-colors">
            <Sparkles className="w-3 h-3" />
            <span>React</span>
          </div>
          <div className="flex items-center gap-2 hover:text-[#7B61FF] transition-colors">
            <span className="w-3 h-3 bg-[#3178C6] rounded-sm text-[8px] font-bold text-white flex items-center justify-center">TS</span>
            <span>TypeScript</span>
          </div>
          <div className="flex items-center gap-2 hover:text-[#7B61FF] transition-colors">
            <div className="w-3 h-3 bg-gradient-to-r from-[#7B61FF] to-[#00D4FF] rounded-full" />
            <span>Framer Motion</span>
          </div>
        </div>
      </div>
    </motion.div>

    {/* Status Indicator */}
    <motion.div 
      className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 mb-12"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex justify-center">
        <div className="flex items-center gap-3 bg-[#0F1B2A] border border-[#2A2B30] rounded-full px-6 py-3 hover:border-[#7B61FF] transition-colors duration-300">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-[#BBBBBB] text-sm font-medium">Disponibles para nuevos proyectos</span>
        </div>
      </div>
    </motion.div>

    {/* Divider */}
    <hr className="my-14 border-t border-[#2A2B30] max-w-[1280px] mx-auto" />

    {/* Social icons expandidas */}
    <motion.div
      className="mt-8 flex justify-center gap-4"
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: [0.17, 0.67, 0.55, 1.28], delay: 0.1 }}
    >
      <motion.a
        href="https://twitter.com/havanitech"
        aria-label="Twitter"
        target="_blank"
        rel="noopener"
        className="group relative w-12 h-12 bg-[#0F1B2A] border border-[#2A2B30] rounded-xl flex items-center justify-center transition-all duration-300 hover:border-[#1DA1F2] hover:bg-[#1DA1F2]/10 hover:scale-110"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Twitter className="w-5 h-5 text-[#888888] group-hover:text-[#1DA1F2] transition-colors" />
        <div className="absolute inset-0 rounded-xl bg-[#1DA1F2] opacity-0 group-hover:opacity-20 transition-opacity" />
      </motion.a>
      
      <motion.a
        href="https://www.linkedin.com/company/havani"
        aria-label="LinkedIn"
        target="_blank"
        rel="noopener"
        className="group relative w-12 h-12 bg-[#0F1B2A] border border-[#2A2B30] rounded-xl flex items-center justify-center transition-all duration-300 hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 hover:scale-110"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Linkedin className="w-5 h-5 text-[#888888] group-hover:text-[#0A66C2] transition-colors" />
        <div className="absolute inset-0 rounded-xl bg-[#0A66C2] opacity-0 group-hover:opacity-20 transition-opacity" />
      </motion.a>
      
      <motion.a
        href="https://github.com/havani"
        aria-label="GitHub"
        target="_blank"
        rel="noopener"
        className="group relative w-12 h-12 bg-[#0F1B2A] border border-[#2A2B30] rounded-xl flex items-center justify-center transition-all duration-300 hover:border-[#FFFFFF] hover:bg-[#FFFFFF]/10 hover:scale-110"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Github className="w-5 h-5 text-[#888888] group-hover:text-[#FFFFFF] transition-colors" />
        <div className="absolute inset-0 rounded-xl bg-[#FFFFFF] opacity-0 group-hover:opacity-20 transition-opacity" />
      </motion.a>
    </motion.div>

    {/* CTA Final */}
    <motion.div 
      className="relative mt-12 mb-8 z-30"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="text-center">
        <Link
          to="/#contacto"
          onClick={(e) => {
            // Si el enlace es a la página principal con un ancla, usamos goToHome
            if (e.currentTarget.getAttribute('href')?.startsWith('/#')) {
              goToHome(e);
            }
          }}
          className="inline-block text-white no-underline"
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#7B61FF] to-[#00D4FF] text-white px-8 py-4 rounded-full font-semibold text-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#7B61FF]/25"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles className="w-4 h-4" />
            <span>¿Listo para innovar?</span>
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </Link>
      </div>
    </motion.div>

    {/* Copyright mejorado */}
    <div className="pb-14">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2 text-[#666666] text-xs">
          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
          <span>Uptime 99.9%</span>
          <span className="text-[#444444]">•</span>
          <span>Respuesta &lt; 24h</span>
          <span className="text-[#444444]">•</span>
          <span>Soporte 24/7</span>
        </div>
        <p className="text-[#555555] text-xs">
          © 2025 Havani Technologies. Todos los derechos reservados.
        </p>
        <p className="text-[#444444] text-[10px] max-w-md">
          Desarrollado con ❤️ y mucha ☕ en Colombia 🇨🇴
        </p>
      </div>
    </div>
  </footer>
  );
};

export default FooterSection;
