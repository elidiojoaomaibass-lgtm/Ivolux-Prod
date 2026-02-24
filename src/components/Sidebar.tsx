import {
    LayoutDashboard, ShoppingBag, BarChart2, Users,
    Settings, ChevronRight,
    Gift, Layers, ShoppingCart, Wallet,
    Megaphone, Star, ChevronUp, Moon, Sun
} from "lucide-react";
import { cn } from "../lib/utils";
import { Logo } from "./Logo";

export type ViewType =
    | "Dashboard" | "Vendas" | "Produtos" | "Afiliados"
    | "Mercado" | "Pagamentos" | "Premiações" | "Marketing"
    | "Analytics" | "Configurações";

interface SidebarProps {
    activeView: ViewType;
    setView: (view: ViewType) => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const menuGroups = [
    {
        label: "Principal",
        items: [
            { icon: LayoutDashboard, label: "Dashboard" as ViewType },
            { icon: ShoppingCart, label: "Vendas" as ViewType },
            { icon: ShoppingBag, label: "Produtos" as ViewType },
            { icon: Wallet, label: "Pagamentos" as ViewType },
        ],
    },
    {
        label: "Crescimento",
        items: [
            { icon: Users, label: "Afiliados" as ViewType, badge: "Novo" },
            { icon: Layers, label: "Mercado" as ViewType, badge: "Novo" },
            { icon: Megaphone, label: "Marketing" as ViewType },
            { icon: Gift, label: "Premiações" as ViewType },
        ],
    },
    {
        label: "Finanças",
        items: [
            { icon: BarChart2, label: "Analytics" as ViewType },
        ],
    },
    {
        label: "Sistema",
        items: [
            { icon: Settings, label: "Configurações" as ViewType },
        ],
    },
];

export const Sidebar = ({ activeView, setView, isDarkMode, toggleDarkMode }: SidebarProps) => {
    // User level mock
    const level = 3;
    const levelProgress = 68;

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-violet-100 dark:border-brand-800 bg-white dark:bg-brand-900 flex flex-col overflow-hidden transition-colors duration-300">
            {/* Logo */}
            <div className="px-6 py-6 border-b border-violet-50 dark:border-brand-800 flex items-center justify-between">
                <div>
                    <Logo showText size={36} textColor="dark:text-white" />
                    <p className="text-[9px] font-bold text-violet-400 uppercase tracking-widest mt-1.5 ml-[48px]">Moçambique</p>
                </div>
            </div>

            {/* Dark Mode Toggle */}
            <div className="px-6 py-4">
                <button
                    onClick={toggleDarkMode}
                    className="flex w-full items-center justify-between rounded-xl bg-violet-50 dark:bg-brand-800 p-2 text-sm font-bold text-violet-700 dark:text-white transition-all hover:bg-violet-100 dark:hover:bg-brand-700"
                >
                    <div className="flex items-center gap-2">
                        {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                        <span>{isDarkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
                    </div>
                    <div className={cn(
                        "h-5 w-9 rounded-full p-1 transition-colors duration-200",
                        isDarkMode ? "bg-brand-500" : "bg-slate-300"
                    )}>
                        <div className={cn(
                            "h-3 w-3 rounded-full bg-white transition-transform duration-200",
                            isDarkMode ? "translate-x-4" : "translate-x-0"
                        )} />
                    </div>
                </button>
            </div>

            {/* Level Badge */}
            <div className="mx-4 my-4 rounded-2xl bg-gradient-to-r from-violet-50 to-purple-50 dark:from-brand-800 dark:to-brand-900 border border-violet-100 dark:border-brand-700 p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-black text-violet-900 dark:text-white">Nível {level}</span>
                    </div>
                    <span className="text-[10px] font-bold text-violet-400 dark:text-brand-300">{levelProgress}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-violet-100 dark:bg-brand-700 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all"
                        style={{ width: `${levelProgress}% ` }}
                    />
                </div>
                <div className="flex items-center gap-1 mt-2">
                    <ChevronUp size={12} className="text-violet-500 dark:text-brand-400" />
                    <p className="text-[10px] font-bold text-violet-500 dark:text-brand-400">32% até Nível {level + 1}</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 space-y-5 pb-4">
                {menuGroups.map((group) => (
                    <div key={group.label}>
                        <p className="mb-1.5 px-3 text-[9px] font-black text-slate-300 dark:text-brand-400 uppercase tracking-widest">{group.label}</p>
                        <div className="space-y-0.5">
                            {group.items.map((item) => {
                                const isActive = activeView === item.label;
                                return (
                                    <button
                                        key={item.label}
                                        onClick={() => setView(item.label)}
                                        className={cn(
                                            "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-150",
                                            isActive
                                                ? "bg-gradient-to-r from-violet-600 to-purple-700 dark:from-white dark:to-slate-100 text-white dark:text-brand-900 shadow-[0_4px_14px_-2px_rgba(124,58,237,0.4)] dark:shadow-none"
                                                : "text-slate-500 dark:text-brand-300 hover:bg-violet-50 dark:hover:bg-brand-800 hover:text-violet-700 dark:hover:text-white"
                                        )}
                                    >
                                        <item.icon
                                            size={18}
                                            className={cn(
                                                "shrink-0 transition-transform group-hover:scale-110",
                                                isActive ? (isDarkMode ? "text-brand-900" : "text-white") : "text-slate-400 dark:text-brand-400 group-hover:text-violet-500 dark:group-hover:text-white"
                                            )}
                                        />
                                        <span className="flex-1 text-left text-[13px]">{item.label}</span>
                                        {'badge' in item && item.badge && (
                                            <span className="rounded-full bg-pink-500 px-2 py-0.5 text-[9px] font-black text-white uppercase tracking-wider">
                                                {item.badge}
                                            </span>
                                        )}
                                        {isActive && <ChevronRight size={13} className={cn(isDarkMode ? "text-brand-900/50" : "text-white/50")} />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

        </aside>
    );
};
