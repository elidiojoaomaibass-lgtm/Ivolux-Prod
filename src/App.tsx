import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import type { ViewType } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { Views } from "./components/Views";
import { LoginView } from "./components/LoginView";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>("Dashboard");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Show login screen if not authenticated
  if (!isLoggedIn) {
    return <LoginView onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex bg-slate-50 dark:bg-brand-950 min-h-screen font-sans transition-colors duration-300">
      <Sidebar
        activeView={activeView}
        setView={setActiveView}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 min-w-0 min-h-screen">
        <div key={activeView}>
          {activeView === "Dashboard" && <Dashboard onLogout={() => setIsLoggedIn(false)} />}
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
