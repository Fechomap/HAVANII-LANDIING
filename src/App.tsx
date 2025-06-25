import React, { Suspense, lazy, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importar todas las páginas directamente como antes
import Index from './pages/Index';
import Pricing from './pages/Pricing';
import NeuralCrane from './pages/NeuralCrane';
import AutoMike from './pages/AutoMike';
import Conciliador from './pages/Conciliador';
import TeXMLBotIVR from './pages/TeXMLBotIVR';
import FacturAPISaaS from './pages/FacturAPISaaS';
import TelegramBot from './pages/TelegramBot';
import NotFound from './pages/NotFound';

// Optimización para mejorar el rendimiento de navegación en Chrome
const optimizeChromeBehavior = () => {
  // Optimización para Chrome - establecer prioridad alta para eventos de navegación
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    if (link && link.getAttribute('href')?.startsWith('#')) {
      // Priorizar los eventos de navegación interna
      e.stopPropagation();
    }
  }, { capture: true });
  
  // Solución específica para el problema de recarga en Chrome
  // Cuando se recarga la página, Chrome intenta restaurar la posición del scroll
  // Esta función lo evita forzando el scroll al inicio
  if ('scrollRestoration' in history) {
    // Desactivar la restauración automática del scroll
    history.scrollRestoration = 'manual';
  }
};

// Crear cliente de consulta para React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

const App = () => {
  // Aplicar optimizaciones para Chrome al montar la aplicación
  useEffect(() => {
    // Optimizar comportamiento de navegación en Chrome
    optimizeChromeBehavior();
    
    // Restablecer la posición del scroll al cargar la página
    window.scrollTo(0, 0);
    
    // Manejar el evento beforeunload para guardar la posición actual
    const handleBeforeUnload = () => {
      sessionStorage.setItem('wasReloaded', 'true');
    };
    
    // Verificar si la página fue recargada
    const wasReloaded = sessionStorage.getItem('wasReloaded') === 'true';
    if (wasReloaded) {
      // Limpiar el indicador y forzar el scroll al inicio
      sessionStorage.removeItem('wasReloaded');
      window.scrollTo(0, 0);
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/neuralcrane" element={<NeuralCrane />} />
              <Route path="/automike" element={<AutoMike />} />
              <Route path="/conciliador" element={<Conciliador />} />
              <Route path="/texmlbotivr" element={<TeXMLBotIVR />} />
              <Route path="/facturapisaas" element={<FacturAPISaaS />} />
              <Route path="/telegrambot" element={<TelegramBot />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;