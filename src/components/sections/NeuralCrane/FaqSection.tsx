import React from 'react';
import { motion } from 'framer-motion';

const faqs = {
  general: [
    {
      question: '¿Qué es NeuralCrane?',
      answer: 'NeuralCrane es una plataforma inteligente diseñada para automatizar y optimizar la operación de empresas de grúas y asistencia vial.'
    },
    {
      question: '¿Puedo probar NeuralCrane antes de contratar?',
      answer: '¡Sí! Ofrecemos una prueba gratuita de 1 mes para que experimentes todas las funcionalidades sin compromiso.'
    },
    {
      question: '¿Qué tipo de empresas pueden usar NeuralCrane?',
      answer: 'NeuralCrane está diseñado para empresas de grúas, asistencia vial, aseguradoras y casas de asistencia que buscan eficiencia y digitalización.'
    }
  ],
  technical: [
    {
      question: '¿NeuralCrane se integra con otros sistemas?',
      answer: 'Sí, contamos con integraciones a APIs de terceros y sistemas existentes para facilitar la interoperabilidad.'
    },
    {
      question: '¿Qué tan segura es la plataforma?',
      answer: 'La seguridad es prioridad: usamos cifrado, autenticación avanzada y monitoreo constante.'
    },
    {
      question: '¿Puedo personalizar los bots y reportes?',
      answer: 'Sí, la plataforma es altamente configurable para adaptarse a tus procesos y necesidades.'
    }
  ],
  operations: [
    {
      question: '¿Cómo ayuda NeuralCrane a reducir errores?',
      answer: 'Automatizamos procesos críticos como la tarificación y el seguimiento, eliminando errores humanos y mejorando la eficiencia.'
    },
    {
      question: '¿Qué soporte ofrecen?',
      answer: 'Soporte técnico continuo, actualizaciones y consultoría personalizada según el plan contratado.'
    },
    {
      question: '¿Cómo se implementa NeuralCrane en mi empresa?',
      answer: 'Nuestro equipo te acompaña en la configuración, capacitación y puesta en marcha para una transición sin fricciones.'
    }
  ]
};

const FaqSection = () => {
  const [activeTab, setActiveTab] = React.useState('general');

  const renderFaqs = () => faqs[activeTab] || [];

  return (
    <section className="relative bg-[#0D0D11] py-[140px] overflow-hidden" id="faq">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-[#BBBBBB] max-w-2xl mx-auto mb-8">
            Todo lo que necesitas saber sobre NeuralCrane. ¿No encuentras lo que buscas? Contáctanos directamente.
          </p>
          {/* Pestañas de navegación */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab('general')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'general' 
                  ? 'bg-[#7B61FF] text-white' 
                  : 'bg-[#15161B] text-[#BBBBBB] hover:bg-[#1E1F25]'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('technical')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'technical' 
                  ? 'bg-[#7B61FF] text-white' 
                  : 'bg-[#15161B] text-[#BBBBBB] hover:bg-[#1E1F25]'
              }`}
            >
              Técnicas
            </button>
            <button
              onClick={() => setActiveTab('operations')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'operations' 
                  ? 'bg-[#7B61FF] text-white' 
                  : 'bg-[#15161B] text-[#BBBBBB] hover:bg-[#1E1F25]'
              }`}
            >
              Operaciones
            </button>
          </div>
        </motion.div>
        <div className="space-y-6">
          {renderFaqs().map((faq, index) => (
            <motion.div
              key={`faq-${activeTab}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="bg-[#15161B] border border-white/5 rounded-xl p-6 hover:border-[#7B61FF]/20 transition-all duration-200"
            >
              <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
              <p className="text-[#BBBBBB]">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
