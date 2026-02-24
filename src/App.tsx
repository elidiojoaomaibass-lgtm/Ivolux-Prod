import { useState, useEffect } from "react";
import { cn } from "./lib/utils";
import { Sidebar } from "./components/Sidebar";
import type { ViewType } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { Views } from "./components/Views";
import { LoginView } from "./components/LoginView";
import { supabase } from "./lib/supabase";
import type { Session } from "@supabase/supabase-js";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [activeView, setActiveView] = useState<ViewType>("Dashboard");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Close sidebar on view change on mobile
    setSidebarOpen(false);
  }, [activeView]);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Show login screen if not authenticated
  if (!session) {
    return <LoginView onLogin={() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });
    }} />;
  }

  // Exclusive Access Check
  const EXCLUSIVE_EMAIL = "trasforaagora@gmail.com";
  if (session.user.email !== EXCLUSIVE_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d17] p-6 text-center">
        <div className="max-w-md space-y-6">
          <div className="h-20 w-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto border border-red-500/20 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          </div>
          <h1 className="text-2xl font-black text-white">Acesso Restrito</h1>
          <p className="text-slate-400 font-medium">Esta plataforma é exclusiva para o administrador. O seu acesso foi negado.</p>
          <button
            onClick={handleLogout}
            className="px-8 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all"
          >
            Voltar para Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-50 dark:bg-brand-950 min-h-screen font-sans transition-colors duration-300 overflow-x-hidden">
      <Sidebar
        activeView={activeView}
        setView={setActiveView}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 min-w-0 min-h-screen transition-all duration-300",
        "lg:ml-64", // Fixed margin on desktop
        sidebarOpen ? "ml-64 opacity-50 pointer-events-none lg:opacity-100 lg:pointer-events-auto" : "ml-0"
      )}>
        <div key={activeView}>
          {activeView === "Dashboard" && (
            <Dashboard
              onLogout={handleLogout}
              setView={setActiveView}
              user={session.user}
              toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />
          )}
          {activeView === "Vendas" && <Views.Vendas />}
          {activeView === "Produtos" && <Views.Produtos />}
          {activeView === "Afiliados" && <Views.Afiliados />}
          {activeView === "Mercado" && <Views.Mercado />}
          {activeView === "Pagamentos" && <Views.Pagamentos />}
          {activeView === "Premiações" && <Views.Premiações />}
          {activeView === "Marketing" && <Views.Marketing />}
          {activeView === "Analytics" && <Views.Analytics />}
          {activeView === "Configurações" && <Views.Configuracoes />}
        </div>
      </div>

      {/* Status pill */}
      <div className="fixed bottom-6 right-8 z-50 flex items-center gap-2.5 rounded-2xl border border-violet-100 bg-white px-4 py-2.5 shadow-lg">
        <div className="relative h-2 w-2">
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
          <div className="relative h-2 w-2 rounded-full bg-green-400" />
        </div>
        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Sistemas OK</span>
        <span className="text-[10px] text-slate-300 font-bold">|</span>
        <span className="text-[10px] font-bold text-slate-400">v2.2.0</span>
      </div>
    </div>
  );
}

export default App;
