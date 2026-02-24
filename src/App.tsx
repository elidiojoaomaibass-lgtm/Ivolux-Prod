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
      // Re-fetch session after login to update state immediately
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });
    }} />;
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
