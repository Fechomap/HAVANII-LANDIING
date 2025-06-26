import React, { Suspense, lazy, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy loading de páginas para mejor performance
const Index = lazy(() => import('./pages/Index'));
const Pricing = lazy(() => import('./pages/Pricing'));
const NeuralCrane = lazy(() => import('./pages/NeuralCrane'));
const AutoMike = lazy(() => import('./pages/AutoMike'));
const Conciliador = lazy(() => import('./pages/Conciliador'));
const TeXMLBotIVR = lazy(() => import('./pages/TeXMLBotIVR'));
const FacturAPISaaS = lazy(() => import('./pages/FacturAPISaaS'));
const TelegramBot = lazy(() => import('./pages/TelegramBot'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Componente de loading optimizado
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-2 border-[#7B61FF] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white/70 text-sm font-medium">Cargando...</p>
    </div>
  </div>
);

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
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/neuralcrane" element={<NeuralCrane />} />
              <Route path="/automike" element={<AutoMike />} />
              <Route path="/conciliador" element={<Conciliador />} />
              <Route path="/texmlbotivr" element={<TeXMLBotIVR />} />
              <Route path="/facturapisaas" element={<FacturAPISaaS />} />
              <Route path="/telegrambot" element={<TelegramBot />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </>
  );
};

export default App;