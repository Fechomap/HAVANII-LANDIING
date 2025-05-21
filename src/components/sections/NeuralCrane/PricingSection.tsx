import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: "Esencial",
      features: [
        "Acceso total al sistema NeuralCrane",
        "Conexión a las API's de terceros",
        "Acceso a los bots operativos",
        "Configuración de los bots operativos",
        "Acceso a soporte técnico y actualizaciones continuas"
      ],
      popular: false
    },
    {
      name: "Profesional",
      features: [
        "Acceso total al sistema NeuralCrane",
        "Conexión a las API's de terceros",
        "Acceso a los bots de seguimiento",
        "Configuración de los bots de seguimiento",
        "Acceso a los bots operativos",
        "Configuración de los bots operativos",
        "Acceso a soporte técnico y actualizaciones continuas",
        "Reportes personalizables"
      ],
      popular: true
    },
    {
      name: "Ultra",
      features: [
        "Acceso total al sistema NeuralCrane",
        "Conexión a las API's de terceros",
        "Acceso a los bots de seguimiento",
        "Configuración de los bots de seguimiento",
        "Acceso a los bots operativos",
        "Configuración de los bots operativos",
        "Acceso a soporte técnico y actualizaciones continuas",
        "Reportes personalizables y análisis avanzado",
        "Acceso a sistema de llamadas para seguimientos",
        "Configuración del PBX de llamadas",
        "Soporte premium 24/7 y consultoría personalizada",
        "Personalización avanzada de la interfaz (logo, nombre, etc.)",
        "Acceso anticipado a futuras integraciones y funcionalidades"
      ],
      popular: false
    }
  ];

  return (
    <section className="relative bg-[#0B0B0F] py-[140px] overflow-hidden" id="pricing">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Planes Flexibles para Potenciar tu Operación
          </h2>
          <p className="mt-4 text-lg text-[#BBBBBB] max-w-[800px] mx-auto">
            Escala a medida que tu negocio crece, con ofertas especiales para aseguradoras y casas de asistencia.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
              className={`bg-[#15161B] border ${plan.popular ? 'border-[#7B61FF]' : 'border-white/5'} rounded-2xl p-8 hover:shadow-[0_0_25px_rgba(123,97,255,0.1)] transition-all duration-300 relative ${plan.popular ? 'shadow-[0_0_25px_rgba(123,97,255,0.15)]' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#7B61FF] text-white text-sm font-bold py-1 px-4 rounded-full">
                  Más popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#7B61FF] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-[#BBBBBB]">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto pt-4 text-center">
                <Link to="/#contacto">
                  <Button className={`px-6 py-3 rounded-full ${plan.popular ? 'bg-[#7B61FF] text-white hover:bg-[#6A50E0]' : 'bg-white/10 text-white hover:bg-white/20'} font-semibold transition-colors`}>
                    Contactar para cotización
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 bg-gradient-to-r from-[#15161B] to-[#1A1B22] border border-[#7B61FF]/20 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">Prueba Gratuita</h3>
          <p className="text-[#BBBBBB] max-w-[700px] mx-auto mb-6">
            Experimenta NeuralCrane sin compromiso durante <span className="text-white font-semibold">1 mes</span> y descubre cómo nuestra plataforma puede transformar la operatividad de tu empresa.
          </p>
          <Link to="/#contacto">
            <Button className="px-8 py-4 rounded-full bg-white text-[#7B61FF] font-bold shadow-[0_0_15px_rgba(123,97,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,97,255,0.6)]">
              Solicitar Prueba Gratuita
            </Button>
          </Link>
          <p className="mt-4 text-sm text-[#BBBBBB]/70">
            También ofrecemos planes personalizados para aseguradoras y casas de asistencia.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
