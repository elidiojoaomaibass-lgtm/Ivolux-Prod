import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
    DollarSign, CheckCircle2, XCircle,
    RefreshCcw, Bell, Search, Calendar,
    Smartphone, Menu, ArrowRight, Trophy, TrendingUp, LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { useState, useRef, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';

// ─── Data ────────────────────────────────────────────────────────────────────

const salesData: Record<string, { name: string; valor: number }[]> = {
    hoje: [
        { name: '08h', valor: 0 }, { name: '10h', valor: 1200 }, { name: '12h', valor: 3400 },
        { name: '14h', valor: 2800 }, { name: '16h', valor: 5200 }, { name: '18h', valor: 7800 },
        { name: '20h', valor: 6500 }, { name: '22h', valor: 9100 },
    ],
    ontem: [
        { name: '08h', valor: 800 }, { name: '10h', valor: 2200 }, { name: '12h', valor: 4100 },
        { name: '14h', valor: 3600 }, { name: '16h', valor: 6000 }, { name: '18h', valor: 8300 },
        { name: '20h', valor: 7200 }, { name: '22h', valor: 5900 },
    ],
    '7dias': [
        { name: 'Seg', valor: 12000 }, { name: 'Ter', valor: 18000 }, { name: 'Qua', valor: 15000 },
        { name: 'Qui', valor: 24000 }, { name: 'Sex', valor: 31000 }, { name: 'Sáb', valor: 28000 },
        { name: 'Dom', valor: 22000 },
    ],
    '30dias': [
        { name: 'S1', valor: 42000 }, { name: 'S2', valor: 67000 }, { name: 'S3', valor: 55000 },
        { name: 'S4', valor: 88000 },
    ],
};

const paymentMethods = [
    { name: 'M-Pesa', percentage: 65, bg: 'bg-red-50 dark:bg-red-950/30', color: 'text-red-500', barColor: 'bg-red-500' },
    { name: 'e-Mola', percentage: 35, bg: 'bg-orange-50 dark:bg-orange-950/30', color: 'text-orange-500', barColor: 'bg-orange-500' },
];

const recentSales = [
    { customer: 'Ana Machava', status: 'Aprovado', method: 'M-Pesa', amount: '4.500 MT' },
    { customer: 'Carlos Mondlane', status: 'Aprovado', method: 'e-Mola', amount: '750 MT' },
    { customer: 'Fátima Cossa', status: 'Pendente', method: 'M-Pesa', amount: '15.000 MT' },
    { customer: 'Pedro Tembe', status: 'Cancelado', method: 'e-Mola', amount: '1.200 MT' },
    { customer: 'Marta Bila', status: 'Aprovado', method: 'M-Pesa', amount: '2.850 MT' },
];

type Period = 'hoje' | 'ontem' | '7dias' | '30dias';
const periodOptions: { key: Period; label: string }[] = [
    { key: 'hoje', label: 'Hoje' },
    { key: 'ontem', label: 'Ontem' },
    { key: '7dias', label: '7 dias' },
    { key: '30dias', label: '30 dias' },
];

// ─── Sub Components ─────────────────────────────────────────────────────────

const getHour = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
};

// ─── Main Component ──────────────────────────────────────────────────────────

interface DashboardProps {
    onLogout?: () => void;
    setView: (view: any) => void;
    user: User;
    toggleSidebar: () => void;
}

export const Dashboard = ({ onLogout, setView, user, toggleSidebar }: DashboardProps) => {
    const [period, setPeriod] = useState<Period>('hoje');
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const data = salesData[period];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const totalPeriod = data.reduce((s, d) => s + d.valor, 0);

    const stats = [
        { label: 'Receita Total', value: `${totalPeriod.toLocaleString()} MT`, trend: '+12%', icon: DollarSign, color: 'bg-violet-500', light: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-950/20' },
        { label: 'Vendas', value: '245', trend: '+8%', icon: CheckCircle2, color: 'bg-green-500', light: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/20' },
        { label: 'Canceladas', value: '12', trend: '-2%', icon: XCircle, color: 'bg-red-500', light: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/20' },
        { label: 'Reembolsadas', value: '3', trend: '0%', icon: RefreshCcw, color: 'bg-amber-500', light: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/20' },
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-brand-950/20">
            {/* Top Bar */}
            <header className="sticky top-0 z-30 bg-white/80 dark:bg-brand-900/80 backdrop-blur-md border-b border-violet-100 dark:border-brand-800">
                <div className="flex h-16 md:h-20 items-center justify-between px-4 md:px-8">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl border border-violet-100 dark:border-brand-800 bg-white dark:bg-brand-800 text-slate-600 dark:text-brand-100"
                        >
                            <Menu size={20} />
                        </button>
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-brand-500" size={18} />
                            <input
                                type="text"
                                placeholder="Procurar transação..."
                                className="h-11 w-64 rounded-xl bg-slate-50 dark:bg-brand-950 pl-11 pr-4 text-sm font-medium border border-transparent focus:border-violet-200 dark:focus:border-brand-700 focus:bg-white dark:focus:bg-brand-900 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-50 dark:bg-brand-800 text-violet-700 dark:text-brand-200">
                            <Calendar size={16} />
                            <span className="text-xs font-black uppercase tracking-wider">21 FEV</span>
                        </div>
                        <button className="relative h-10 w-10 md:h-11 md:w-11 flex items-center justify-center rounded-xl border border-violet-100 dark:border-brand-800 bg-white dark:bg-brand-800 text-slate-600 dark:text-brand-100 hover:bg-violet-50 dark:hover:bg-brand-700 transition-colors group">
                            <Bell size={20} />
                            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-violet-600 border-2 border-white dark:border-brand-800 group-hover:scale-125 transition-transform" />
                        </button>
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="h-10 w-10 md:h-11 md:w-11 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 p-0.5 shadow-lg shadow-violet-500/20 cursor-pointer hover:scale-105 transition-all active:scale-95"
                            >
                                <div className="h-full w-full rounded-[10px] bg-white p-0.5 overflow-hidden">
                                    <img
                                        src="/logo.png"
                                        alt="User"
                                        className="h-full w-full rounded-[8px] object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${user?.email?.charAt(0) || 'U'}&background=7c3aed&color=fff&bold=true`;
                                        }}
                                    />
                                </div>
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 top-12 w-64 rounded-2xl border border-violet-100 dark:border-brand-700 bg-white dark:bg-brand-900 shadow-2xl z-50 overflow-hidden">
                                    <div className="px-4 py-4 border-b border-violet-50 dark:border-brand-800">
                                        <p className="text-sm font-black text-slate-800 dark:text-white truncate">
                                            {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                                        </p>
                                        <p className="text-[11px] font-bold text-slate-400 truncate">
                                            {user?.email}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => { setProfileOpen(false); setView('Configurações'); }}
                                        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 dark:text-brand-200 hover:bg-violet-50 dark:hover:bg-brand-800 transition-colors"
                                    >
                                        Editar Perfil
                                    </button>
                                    <button
                                        onClick={onLogout}
                                        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                    >
                                        <LogOut size={16} />
                                        Sair
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Container */}
            <main className="px-4 md:px-8 py-6 md:py-8 pb-32 space-y-6 md:space-y-10 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="space-y-4 md:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1">
                                {getHour()}, <span className="text-violet-600 dark:text-brand-300">{user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}</span> 👋
                            </h2>
                            <p className="text-xs md:text-sm text-slate-400 dark:text-brand-400 font-medium">Acompanhe as suas vendas e receitas de hoje.</p>
                        </div>
                        <div className="flex items-center gap-1 p-1 rounded-2xl bg-white dark:bg-brand-900 border border-violet-100 dark:border-brand-800 shadow-sm overflow-x-auto scrollbar-hide">
                            {periodOptions.map((p) => (
                                <button
                                    key={p.key}
                                    onClick={() => setPeriod(p.key)}
                                    className={cn(
                                        "px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                                        period === p.key
                                            ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                                            : "text-slate-400 hover:text-slate-600 dark:text-brand-400 dark:hover:text-brand-200"
                                    )}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* KPI Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {stats.map((item, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={item.label}
                                className="group relative bg-white dark:bg-brand-900 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 border border-violet-100 dark:border-brand-800 shadow-sm hover:shadow-xl transition-all overflow-hidden"
                            >
                                <div className="relative z-10 flex flex-col justify-between h-full">
                                    <div className="flex items-center justify-between mb-4 md:mb-6">
                                        <div className={cn(
                                            "h-10 w-10 md:h-12 md:w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500",
                                            item.bg, item.light
                                        )}>
                                            <item.icon size={20} className="md:w-6 md:h-6" />
                                        </div>
                                        <span className="text-[10px] md:text-xs font-black text-green-500">
                                            {item.trend}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] md:text-xs font-black text-slate-400 dark:text-brand-500 uppercase tracking-widest mb-1">
                                            {item.label}
                                        </p>
                                        <h3 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white leading-none">
                                            {item.value}
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Main Chart Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-brand-900 rounded-[1.5rem] md:rounded-[2.5rem] border border-violet-100 dark:border-brand-800 p-6 md:p-8 shadow-sm transition-colors"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Gráfico de Vendas</h3>
                                    <p className="text-xs text-slate-400 dark:text-brand-400 mt-1 font-medium">
                                        Volume total period: <span className="text-violet-600 dark:text-brand-300 font-bold">{totalPeriod.toLocaleString()} MT</span>
                                    </p>
                                </div>
                                <div className="hidden sm:flex items-center gap-2 text-slate-500">
                                    <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                                    <span className="text-xs font-bold">Vendas</span>
                                </div>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data}>
                                        <defs>
                                            <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                            labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                                        />
                                        <Area type="monotone" dataKey="valor" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorValor)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Recent Sales Table */}
                        <div className="space-y-4 md:space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight">Vendas Recentes</h3>
                                <button className="text-xs md:text-sm font-black text-violet-600 dark:text-brand-300">Ver tudo</button>
                            </div>
                            <div className="bg-white dark:bg-brand-900 rounded-[1.5rem] md:rounded-[2.5rem] border border-violet-100 dark:border-brand-800 shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[600px]">
                                        <thead>
                                            <tr className="border-b border-slate-50 dark:border-brand-800">
                                                <th className="px-6 md:px-8 py-5 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">Cliente</th>
                                                <th className="px-6 md:px-8 py-5 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                                                <th className="px-6 md:px-8 py-5 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">Método</th>
                                                <th className="px-6 md:px-8 py-5 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest text-right">Valor</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50 dark:divide-brand-800">
                                            {recentSales.map((sale) => (
                                                <tr key={sale.customer} className="group hover:bg-slate-50/50 dark:hover:bg-brand-800/20 transition-colors">
                                                    <td className="px-6 md:px-8 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-slate-100 dark:bg-brand-800 flex items-center justify-center font-black text-slate-400 text-xs md:text-sm">
                                                                {sale.customer[0]}
                                                            </div>
                                                            <span className="text-xs md:text-sm font-bold text-slate-700 dark:text-white">{sale.customer}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 md:px-8 py-4">
                                                        <span className="inline-flex items-center rounded-lg bg-green-50 dark:bg-green-950/30 px-2 py-0.5 text-[10px] md:text-xs font-black text-green-600 uppercase">
                                                            {sale.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 md:px-8 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <Smartphone size={14} className={sale.method === 'M-Pesa' ? "text-red-500" : "text-orange-500"} />
                                                            <span className="text-[11px] md:text-xs font-bold text-slate-500 dark:text-brand-400">{sale.method}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 md:px-8 py-4 text-right">
                                                        <span className="text-xs md:text-sm font-black text-slate-900 dark:text-white">{sale.amount}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Performance Card */}
                    <div className="space-y-4 md:space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight">Performance</h3>
                            <TrendingUp size={18} className="text-violet-500" />
                        </div>
                        <div className="bg-white dark:bg-brand-900 rounded-[1.5rem] md:rounded-[2.5rem] border border-violet-100 dark:border-brand-800 p-6 md:p-8 shadow-sm flex flex-col justify-between h-full min-h-[350px]">
                            <div className="space-y-6 md:space-y-8">
                                {paymentMethods.map((pm) => (
                                    <div key={pm.name} className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 md:gap-3">
                                                <div className={cn("h-8 w-8 md:h-10 md:w-10 rounded-xl flex items-center justify-center", pm.bg)}>
                                                    <Smartphone size={16} className={pm.color} />
                                                </div>
                                                <span className="text-xs md:text-sm font-black text-slate-700 dark:text-white">{pm.name}</span>
                                            </div>
                                            <span className="text-xs md:text-sm font-black text-slate-900 dark:text-white">{pm.percentage}%</span>
                                        </div>
                                        <div className="h-2 md:h-2.5 w-full rounded-full bg-slate-50 dark:bg-brand-950 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${pm.percentage}%` }}
                                                className={cn("h-full rounded-full shadow-lg", pm.barColor)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-50 dark:border-brand-800">
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-violet-50 dark:bg-brand-800/50">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="h-10 w-10 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-lg shrink-0">
                                            <Trophy size={18} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-black text-violet-600 dark:text-brand-300 uppercase truncate">Meta Mensal</p>
                                            <p className="text-sm font-black text-slate-900 dark:text-white truncate">82% concluído</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="text-violet-400 shrink-0" size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
