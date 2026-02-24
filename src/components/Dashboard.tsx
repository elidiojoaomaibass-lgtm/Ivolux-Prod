import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import {
    DollarSign, CheckCircle2, XCircle,
    RefreshCcw, Bell, Search, Calendar,
    ArrowUpRight, ArrowDownRight, Smartphone, ChevronRight, LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabase';
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
    { name: 'M-Pesa', value: 65, color: '#ef4444', icon: Smartphone, amount: '1.859.000 MT' },
    { name: 'e-Mola', value: 35, color: '#f59e0b', icon: Smartphone, amount: '1.000.400 MT' },
];

const recentSales = [
    { id: '#EVL-4821', client: 'Ana Machava', product: 'Curso Marketing Digital', amount: '4.500 MT', status: 'aprovado', method: 'M-Pesa', date: 'Há 5 min' },
    { id: '#EVL-4820', client: 'Carlos Mondlane', product: 'E-book Finanças', amount: '750 MT', status: 'aprovado', method: 'e-Mola', date: 'Há 12 min' },
    { id: '#EVL-4819', client: 'Fátima Cossa', product: 'Mentoria Business', amount: '15.000 MT', status: 'pendente', method: 'M-Pesa', date: 'Há 23 min' },
    { id: '#EVL-4818', client: 'Pedro Tembe', product: 'Pack Templates UI', amount: '1.200 MT', status: 'cancelado', method: 'e-Mola', date: 'Há 45 min' },
    { id: '#EVL-4817', client: 'Marta Bila', product: 'Curso de Excel', amount: '2.850 MT', status: 'aprovado', method: 'M-Pesa', date: 'Há 1h' },
];

type Period = 'hoje' | 'ontem' | '7dias' | '30dias';
const periods: { key: Period; label: string }[] = [
    { key: 'hoje', label: 'Hoje' },
    { key: 'ontem', label: 'Ontem' },
    { key: '7dias', label: '7 dias' },
    { key: '30dias', label: '30 dias' },
];

// ─── Sub Components ─────────────────────────────────────────────────────────

const statusStyles: Record<string, string> = {
    aprovado: 'bg-green-50 text-green-600',
    pendente: 'bg-amber-50 text-amber-600',
    cancelado: 'bg-red-50 text-red-500',
};
const statusLabels: Record<string, string> = {
    aprovado: 'Aprovado',
    pendente: 'Pendente',
    cancelado: 'Cancelado',
};

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
}

export const Dashboard = ({ onLogout, setView }: DashboardProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [period, setPeriod] = useState<Period>('hoje');
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const data = salesData[period];

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });
    }, []);

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

    const cardVariants = {
        hidden: { opacity: 0, y: 16 },
        visible: (i: number) => ({
            opacity: 1, y: 0,
            transition: { delay: i * 0.07, duration: 0.4 }
        }),
    };

    return (
        <div className="min-h-screen bg-transparent transition-colors duration-300">

            {/* ── Top Header ── */}
            <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-violet-100 dark:border-brand-800 bg-white/80 dark:bg-brand-900/80 backdrop-blur-xl px-8 py-4 transition-colors">
                <div className="flex items-center gap-3 relative group hidden lg:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Pesquisar vendas, produtos..."
                        className="h-10 w-80 rounded-xl border border-violet-100 dark:border-brand-800 bg-white dark:bg-brand-800 pl-11 pr-4 text-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-50 dark:focus:ring-brand-500/10 text-slate-700 dark:text-white placeholder:text-slate-300 dark:placeholder:text-brand-400 shadow-sm transition-all"
                    />
                </div>

                <div className="flex items-center gap-3 ml-auto">
                    {/* Date */}
                    <div className="hidden lg:flex items-center gap-2 rounded-xl border border-violet-100 dark:border-brand-800 bg-white dark:bg-brand-800 px-4 py-2 text-sm font-bold text-slate-600 dark:text-brand-100 shadow-sm transition-colors">
                        <Calendar size={15} className="text-violet-400" />
                        {new Date().toLocaleDateString('pt-MZ', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                    <button className="relative h-10 w-10 flex items-center justify-center rounded-xl border border-violet-100 dark:border-brand-800 bg-white dark:bg-brand-800 text-slate-400 hover:text-violet-600 dark:hover:text-white transition-all shadow-sm">
                        <Bell size={18} />
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-violet-500 border-2 border-white dark:border-brand-900" />
                    </button>
                    {/* Profile Dropdown */}
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="h-10 w-10 rounded-xl overflow-hidden bg-white dark:bg-brand-800 flex items-center justify-center shadow-sm cursor-pointer ring-1 ring-violet-100 dark:ring-brand-700 hover:ring-violet-400 transition-all"
                        >
                            <img
                                src="/logo.png"
                                alt="Perfil"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=E&background=7c3aed&color=fff&bold=true';
                                }}
                            />
                        </button>

                        {/* Dropdown */}
                        {profileOpen && (
                            <div className="absolute right-0 top-12 w-64 rounded-2xl border border-violet-100 dark:border-brand-700 bg-white dark:bg-brand-900 shadow-2xl shadow-violet-100/50 dark:shadow-brand-950/80 z-50 overflow-hidden">
                                {/* Email header */}
                                <div className="flex items-center gap-3 px-4 py-4 border-b border-violet-50 dark:border-brand-800">
                                    <div className="h-9 w-9 rounded-xl overflow-hidden shrink-0 ring-1 ring-violet-100">
                                        <img
                                            src="/logo.png"
                                            alt="Perfil"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=E&background=7c3aed&color=fff&bold=true';
                                            }}
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-black text-slate-800 dark:text-white truncate">
                                            {user?.email?.split('@')[0] || 'Utilizador'}
                                        </p>
                                        <p className="text-[11px] font-bold text-slate-400 dark:text-brand-400 truncate">
                                            {user?.email || 'carregando...'}
                                        </p>
                                    </div>
                                </div>
                                {/* Edit Profile */}
                                <button
                                    onClick={() => {
                                        setProfileOpen(false);
                                        setView("Configurações");
                                    }}
                                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 dark:text-brand-200 hover:bg-violet-50 dark:hover:bg-brand-800 transition-colors border-b border-violet-50 dark:border-brand-800"
                                >
                                    <div className="h-7 w-7 rounded-lg bg-violet-50 dark:bg-brand-800 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet-500">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                    </div>
                                    Editar Perfil
                                </button>
                                {/* Logout */}
                                <button
                                    onClick={() => { setProfileOpen(false); onLogout?.(); }}
                                    className="flex w-full items-center gap-3 px-4 py-3.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                >
                                    <LogOut size={15} />
                                    Sair da conta
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="px-8 py-7 pb-28 space-y-8">

                {/* ── Greeting ── */}
                <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-violet-950 dark:text-white tracking-tight">
                            {getHour()}, <span className="text-violet-600 dark:text-brand-300">
                                {user?.email?.split('@')[0] || 'João'}!
                            </span> 👋
                        </h2>
                        <p className="text-sm text-slate-400 dark:text-brand-400 font-medium mt-1">Acompanhe as suas vendas e receitas de hoje.</p>
                    </div>

                    {/* Period Filter */}
                    <div className="flex items-center gap-1 rounded-2xl border border-violet-100 dark:border-brand-800 bg-white dark:bg-brand-900 p-1 shadow-sm transition-colors">
                        {periods.map((p) => (
                            <button
                                key={p.key}
                                onClick={() => setPeriod(p.key)}
                                className={cn(
                                    "rounded-xl px-4 py-2 text-xs font-bold transition-all",
                                    period === p.key
                                        ? "bg-violet-600 dark:bg-white text-white dark:text-brand-900 shadow-md"
                                        : "text-slate-500 dark:text-brand-400 hover:text-violet-600 dark:hover:text-white hover:bg-violet-50 dark:hover:bg-brand-800"
                                )}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── KPI Cards ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                        { label: 'Receita Total', value: `${totalPeriod.toLocaleString()} MT`, subValue: null, trend: '+23.5%', up: true, icon: DollarSign, color: 'violet' },
                        { label: 'Aprovadas', value: '94', subValue: `${(totalPeriod * 0.92).toLocaleString()} MT`, trend: '+12.3%', up: true, icon: CheckCircle2, color: 'green' },
                        { label: 'Canceladas', value: '6', subValue: `${(totalPeriod * 0.05).toLocaleString()} MT`, trend: '-2.1%', up: false, icon: XCircle, color: 'red' },
                        { label: 'Reembolsadas', value: '3', subValue: `${(totalPeriod * 0.03).toLocaleString()} MT`, trend: '0%', up: true, icon: RefreshCcw, color: 'amber' },
                    ].map((card, i) => (
                        <motion.div
                            key={card.label}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ y: -4 }}
                            className="rounded-2xl border border-violet-100 dark:border-brand-800 bg-white dark:bg-brand-900 p-6 shadow-sm cursor-default group hover:border-violet-200 dark:hover:border-brand-700 transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <p className="text-xs font-bold text-slate-400 dark:text-brand-400 uppercase tracking-widest">{card.label}</p>
                                <div className={cn(
                                    "flex h-9 w-9 items-center justify-center rounded-xl transition-all",
                                    card.color === 'violet' ? 'bg-violet-50 dark:bg-brand-800 text-violet-500 dark:text-brand-400 group-hover:bg-violet-600 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-brand-900' :
                                        card.color === 'green' ? 'bg-green-50 dark:bg-green-900/20 text-green-500' :
                                            card.color === 'red' ? 'bg-red-50 dark:bg-red-900/20 text-red-500' :
                                                'bg-amber-50 dark:bg-amber-900/20 text-amber-500'
                                )}>
                                    <card.icon size={18} />
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2 flex-wrap">
                                <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{card.value}</p>
                                {card.subValue && (
                                    <p className="text-[12px] font-bold text-slate-400 dark:text-brand-400 opacity-80 decoration-violet-500/30">
                                        | {card.subValue}
                                    </p>
                                )}
                            </div>
                            <div className={cn(
                                "flex items-center gap-1 mt-2 text-[11px] font-bold",
                                card.up ? 'text-green-500' : 'text-red-500'
                            )}>
                                {card.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                                {card.trend} vs período anterior
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ── Chart + Payments ── */}
                <div className="grid gap-8 lg:grid-cols-3">

                    {/* Sales Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2 rounded-[2rem] border border-violet-100 dark:border-brand-800 bg-white dark:bg-brand-900 p-7 shadow-sm transition-colors"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-base font-black text-slate-900 dark:text-white">Gráfico de Vendas</h3>
                                <p className="text-xs text-slate-400 dark:text-brand-400 mt-0.5 font-medium">
                                    Volume total: <span className="text-violet-600 dark:text-brand-300 font-bold">{(totalPeriod / 1000).toFixed(1)}k MT</span>
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 dark:text-brand-400">
                                <span className="h-2.5 w-2.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                                <span className="text-xs font-bold transition-colors">Volume de Vendas</span>
                            </div>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={period}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="h-[280px] w-full"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="violetGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f0ff" className="dark:opacity-10" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} tickFormatter={(v) => v >= 1000 ? `${v / 1000}k` : `${v}`} width={36} />
                                        <Tooltip
                                            contentStyle={{ background: '#fff', borderRadius: '16px', border: '1px solid #ede9fe', padding: '12px 16px', boxShadow: '0 10px 30px -8px rgba(139,92,246,0.15)' }}
                                            itemStyle={{ color: '#7c3aed', fontWeight: 800, fontSize: 13 }}
                                            labelStyle={{ color: '#94a3b8', fontWeight: 700, marginBottom: 4, fontSize: 11 }}
                                            formatter={(v: any) => [`${v?.toLocaleString() ?? '0'} MT`, 'Valor']}
                                            cursor={{ stroke: '#8b5cf6', strokeWidth: 2 }}
                                        />
                                        <Area type="monotone" dataKey="valor" stroke="#8b5cf6" strokeWidth={3} fill="url(#violetGrad)" animationDuration={1200} activeDot={{ r: 7, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 3 }} dot={false} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Payment Methods */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="rounded-[2rem] border border-violet-100 dark:border-brand-800 bg-white dark:bg-brand-900 p-7 shadow-sm flex flex-col transition-colors"
                    >
                        <div className="mb-6">
                            <h3 className="text-base font-black text-slate-900 dark:text-white">Métodos de Pagamento</h3>
                            <p className="text-xs text-slate-400 dark:text-brand-400 mt-0.5 font-medium">Distribuição por canal</p>
                        </div>

                        {/* Mini Pie */}
                        <div className="flex justify-center mb-4 h-32">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={paymentMethods} cx="50%" cy="50%" innerRadius={38} outerRadius={56} dataKey="value" paddingAngle={3} strokeWidth={0}>
                                        {paymentMethods.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ background: '#fff', borderRadius: '12px', border: '1px solid #ede9fe', padding: '8px 12px' }}
                                        formatter={(v: any) => [`${v ?? '0'}%`, '']}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-3 flex-1">
                            {paymentMethods.map((method) => (
                                <div key={method.name} className="flex items-center gap-3 group hover:bg-violet-50/50 dark:hover:bg-brand-800 rounded-xl p-2 transition-all cursor-default">
                                    <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: method.color + '15' }}>
                                        <method.icon size={15} style={{ color: method.color }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-bold text-slate-700 dark:text-brand-100 transition-colors">{method.name}</span>
                                            <span className="text-xs font-black" style={{ color: method.color }}>{method.value}%</span>
                                        </div>
                                        <div className="h-1 w-full rounded-full bg-slate-100 dark:bg-brand-800 overflow-hidden">
                                            <div className="h-full rounded-full" style={{ width: `${method.value}%`, backgroundColor: method.color }} />
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-brand-400 mt-1">{method.amount}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ── Recent Sales ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="rounded-[2rem] border border-violet-100 dark:border-brand-800 bg-white dark:bg-brand-900 shadow-sm overflow-hidden transition-colors"
                >
                    <div className="flex items-center justify-between px-7 py-5 border-b border-violet-50 dark:border-brand-800">
                        <div>
                            <h3 className="text-base font-black text-slate-900 dark:text-white">Últimas Vendas</h3>
                            <p className="text-xs text-slate-400 dark:text-brand-400 font-medium mt-0.5">Transacções mais recentes</p>
                        </div>
                        <button className="flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-brand-300 hover:text-violet-800 dark:hover:text-white transition-colors">
                            Ver Todas <ChevronRight size={14} />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-violet-50 dark:border-brand-800 text-slate-400 dark:text-brand-500">
                                    {['ID', 'Cliente', 'Produto', 'Método', 'Valor', 'Estado', 'Quando'].map((h) => (
                                        <th key={h} className="px-6 py-3 text-left text-[10px] font-black uppercase tracking-widest">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {recentSales.map((sale, i) => (
                                    <motion.tr
                                        key={sale.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.65 + i * 0.06 }}
                                        className="border-b border-violet-50/50 dark:border-brand-800/50 hover:bg-violet-50/40 dark:hover:bg-brand-800/40 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-xs font-black text-violet-600 dark:text-brand-300">{sale.id}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-800 dark:text-brand-100">{sale.client}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-500 dark:text-brand-400 max-w-[160px] truncate">{sale.product}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 dark:bg-brand-800 border border-slate-100 dark:border-brand-700 px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-brand-300 transition-colors">
                                                <Smartphone size={11} className="shrink-0" /> {sale.method}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white">{sale.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={cn("rounded-xl px-3 py-1 text-[11px] font-bold", statusStyles[sale.status])}>
                                                {statusLabels[sale.status]}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-slate-400 dark:text-brand-500">{sale.date}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

