import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import Subscriptions from "./pages/Subscriptions";
import Event from "./pages/Event";
import Educatie from "./pages/Educatie";
import Servicii from "./pages/Servicii";
import Consultanta from "./pages/Consultanta";
import DespreNoi from "./pages/DespreNoi";
import Resurse from "./pages/Resurse";
import { useChatbase } from "@/hooks/useChatbase";

const queryClient = new QueryClient();

const App = () => {
  useChatbase();
  
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/account" element={<Account />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/event" element={<Event />} />
          <Route path="/educatie" element={<Educatie />} />
          <Route path="/servicii" element={<Servicii />} />
          <Route path="/consultanta" element={<Consultanta />} />
          <Route path="/despre-noi" element={<DespreNoi />} />
          <Route path="/resurse" element={<Resurse />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
