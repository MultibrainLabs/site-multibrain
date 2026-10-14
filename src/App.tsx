import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import Acelera from "./pages/Acelera";
import Prospecta from "./pages/Prospecta";
import ValuationAguiar from "./pages/ValuationAguiar";
import CatalogoQtokQuadros from "./pages/CatalogoQtokQuadros";
import Club from "./pages/Club";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import HubApp from "./pages/hub/HubApp";
import { lazy, Suspense } from "react";

// Site v2 (em teste). Carregado sob demanda para não pesar nas páginas atuais.
const HomeV2 = lazy(() => import("./pages/v2/HomeV2"));
const Sistema30dV2 = lazy(() => import("./pages/v2/Sistema30dV2"));
const SacOnlineV2 = lazy(() => import("./pages/v2/SacOnlineV2"));
const DiagnosticoV2 = lazy(() => import("./pages/v2/DiagnosticoV2"));
const v2 = (el: JSX.Element) => (
  <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0B0D17" }} />}>{el}</Suspense>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Analytics />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={v2(<HomeV2 />)} />
            <Route path="/home-old" element={<Home />} />
            <Route path="/acelera" element={<Acelera />} />
            <Route path="/prospecta" element={<Prospecta />} />
            <Route path="/valuation/aguiar-2026" element={<ValuationAguiar />} />
            <Route path="/catalogo-qtokquadros" element={<CatalogoQtokQuadros />} />
            <Route path="/club" element={<Club />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/v2" element={<Navigate to="/" replace />} />
            <Route path="/v2/sistema-30-dias" element={v2(<Sistema30dV2 />)} />
            <Route path="/v2/saconline" element={v2(<SacOnlineV2 />)} />
            <Route path="/v2/diagnostico" element={v2(<DiagnosticoV2 />)} />
            <Route 
              path="/hub/*" 
              element={
                <ProtectedRoute>
                  <HubApp />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
