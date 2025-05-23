import AnimateOnScroll from '@/components/AnimateOnScroll';
import ProductCard from './ProductCard';
import { products } from './productsData';

const FlagshipProductsSection = () => {
  return (
    <section
      aria-labelledby="fp-title"
      id="productos"
      className="relative bg-[#0D0D11] overflow-hidden"
      style={{
        backgroundImage: 'url("/assets/noise.png")',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Top gradient overlay */}
      <div className="absolute inset-x-0 top-0 h-[160px] bg-gradient-to-b from-white/[0.03] to-transparent" />

      <div className="relative max-w-[1240px] mx-auto px-6 md:px-12 lg:px-24 py-[140px] md:py-[180px]">
        
        {/* Título principal */}
        <AnimateOnScroll animation="fadeUp" duration={0.8}>
          <h2
            id="fp-title"
            className="text-center text-3xl md:text-4xl font-extrabold text-white"
          >
            Nuestras Soluciones Inteligentes: Eficiencia y Control para Tu Negocio
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fadeUp" delay={0.2} duration={0.8}>
          <p className="mt-6 text-center mx-auto max-w-[680px] text-[#BBBBBB] text-lg md:text-xl">
            Descubre cómo nuestras herramientas "Sin Tanto Rollo" automatizan procesos y potencian resultados.
          </p>
        </AnimateOnScroll>

        {/* Grid de productos con stagger effect */}
        <div className="relative mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <AnimateOnScroll
              key={index}
              animation="fadeUp"
              delay={0.4 + (index * 0.1)} // Stagger effect
              duration={0.6}
              threshold={0.1}
            >
              <ProductCard {...product} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlagshipProductsSection;