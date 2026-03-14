import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient.js";
import { Toaster as Sonner } from "@/components/ui/sonner.jsx";
import { Toaster } from "@/components/ui/toaster.jsx";
import { TooltipProvider } from "@/components/ui/tooltip.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NewApplication from "./pages/NewApplication.jsx";
import ApplicationsList from "./pages/ApplicationsList.jsx";
import ScrutinyQueue from "./pages/ScrutinyQueue.jsx";
import MeetingQueue from "./pages/MeetingQueue.jsx";
import NotFound from "./pages/NotFound.jsx";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setIsAuthenticated(!!data?.session);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/dashboard/new-application" element={<ProtectedRoute element={<NewApplication />} />} />
          <Route path="/dashboard/applications" element={<ProtectedRoute element={<ApplicationsList />} />} />
          <Route path="/dashboard/scrutiny" element={<ProtectedRoute element={<ScrutinyQueue />} />} />
          <Route path="/dashboard/meetings" element={<ProtectedRoute element={<MeetingQueue />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
