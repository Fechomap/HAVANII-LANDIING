import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy loading para las páginas
const Index = lazy(() => import('./pages/Index'));
const Pricing = lazy(() => import('./pages/Pricing'));
const NeuralCrane = lazy(() => import('./pages/NeuralCrane'));
const AutoMike = lazy(() => import('./pages/AutoMike'));
const Conciliador = lazy(() => import('./pages/Conciliador'));
const TeXMLBotIVR = lazy(() => import('./pages/TeXMLBotIVR'));
const FacturAPISaaS = lazy(() => import('./pages/FacturAPISaaS'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Componente de carga
const LoadingFallback = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-bg-body text-text-primary">
    <div className="animate-pulse">Cargando...</div>
  </div>
);

// Crear cliente de consulta para React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

const App = () => (
  <>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/neuralcrane" element={<NeuralCrane />} />
              <Route path="/automike" element={<AutoMike />} />
              <Route path="/conciliador" element={<Conciliador />} />
              <Route path="/texmlbotivr" element={<TeXMLBotIVR />} />
              <Route path="/facturapisaas" element={<FacturAPISaaS />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </>
);

export default App;