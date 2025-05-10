
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AuthProvider } from "@/hooks/useAuth";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
import Members from "./pages/Members";
import Chat from "./pages/Chat";
import MassSending from "./pages/MassSending";
import Connection from "./pages/Connection";
import Moderation from "./pages/Moderation";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Knowledge from "./pages/Knowledge";
import Scheduling from "./pages/Scheduling";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";

// Import Admin Master pages
import AdminDashboard from "./pages/AdminMaster/Dashboard";
import CompaniesPage from "./pages/AdminMaster/Companies";
import PlansPage from "./pages/AdminMaster/Plans";
import CommunicationsPage from "./pages/AdminMaster/Communications";
import KnowledgePage from "./pages/AdminMaster/Knowledge";
import ReportsPage from "./pages/AdminMaster/Reports";
import SettingsPage from "./pages/AdminMaster/Settings";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="whatsadmin-theme">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/members" element={<Members />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/mass-sending" element={<MassSending />} />
              <Route path="/connection" element={<Connection />} />
              <Route path="/moderation" element={<Moderation />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/knowledge" element={<Knowledge />} />
              <Route path="/scheduling" element={<Scheduling />} />
              
              {/* Admin Master Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/companies" element={<CompaniesPage />} />
              <Route path="/admin/plans" element={<PlansPage />} />
              <Route path="/admin/communications" element={<CommunicationsPage />} />
              <Route path="/admin/knowledge" element={<KnowledgePage />} />
              <Route path="/admin/reports" element={<ReportsPage />} />
              <Route path="/admin/settings" element={<SettingsPage />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
