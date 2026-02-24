
import {
    Trophy, Award, Star, Gem,
    Zap, Target, Shield, Crown,
    Lock, TrendingUp, CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const levels = [
    {
        name: 'Bronze',
        range: '0 - 10.000 MZN',
        icon: Trophy,
        color: 'text-orange-500',
        bgColor: 'bg-orange-50',
        darkBg: 'dark:bg-orange-900/10',
        benefits: ['Suporte prioritário', 'Badge exclusivo no perfil'],
        isCurrent: true
    },
    {
        name: 'Prata',
        range: '10.000 - 50.000 MZN',
        icon: Award,
        color: 'text-slate-400',
        bgColor: 'bg-slate-50',
        darkBg: 'dark:bg-slate-800/20',
        benefits: ['Todos benefícios Bronze', 'Taxa reduzida de 8%', 'Destaque no marketplace'],
        isCurrent: false
    },
    {
        name: 'Ouro',
        range: '50.000 - 200.000 MZN',
        icon: Star,
        color: 'text-amber-400',
        bgColor: 'bg-amber-50',
        darkBg: 'dark:bg-amber-900/10',
        benefits: ['Todos benefícios Prata', 'Taxa reduzida de 6%', 'Acesso antecipado a recursos'],
        isCurrent: false
    },
    {
        name: 'Platina',
        range: '200.000 - 500.000 MZN',
        icon: Crown,
        color: 'text-blue-400',
        bgColor: 'bg-blue-50',
        darkBg: 'dark:bg-blue-900/10',
        benefits: ['Todos benefícios Ouro', 'Taxa reduzida de 4%', 'Gestor de conta dedicado'],
        isCurrent: false
    },
    {
        name: 'Diamante',
        range: '+500.000 MZN',
        icon: Gem,
        color: 'text-cyan-400',
        bgColor: 'bg-cyan-50',
        darkBg: 'dark:bg-cyan-900/10',
        benefits: ['Todos benefícios Platina', 'Taxa reduzida de 2%', 'Convites para eventos VIP'],
        isCurrent: false
    }
];

const rewards = [
    {
        type: 'band',
        target: '50K',
        label: 'FATURADOS',
        remain: '50.000 MZN',
        title: 'Pulseira Evolux',
        image: '/awards/50k.png'
    },
    {
        type: 'plaque',
        target: '100K',
        label: 'FATURADOS',
        remain: '100.000 MZN',
        title: 'Placa de Prata',
        image: '/awards/100k.jpg'
    },
    {
        type: 'plaque',
        target: '500K',
        label: 'FATURADOS',
        remain: '500.000 MZN',
        title: 'Placa de Ouro',
        image: '/awards/500k.jpg'
    },
    {
        type: 'plaque',
        target: '1M',
        label: 'FATURADOS',
        remain: '1.000.000 MZN',
        title: 'Placa de Diamante',
        image: '/awards/1m.jpg'
    },
];

const achievements = [
    { title: 'Primeira Venda', desc: 'Realize sua primeira venda na plataforma', icon: Zap, unlocked: false },
    { title: '10 Vendas', desc: 'Alcance 10 vendas totais', icon: Target, unlocked: false },
    { title: '50 Vendas', desc: 'Alcance 50 vendas totais', icon: Shield, unlocked: false },
    { title: '100 Vendas', desc: 'Alcance 100 vendas totais', icon: Award, unlocked: false },
    { title: '500 Vendas', desc: 'Alcance 500 vendas totais', icon: Crown, unlocked: false },
    { title: 'Mestre das Vendas', desc: 'Alcance 1000 vendas totais', icon: Gem, unlocked: false },
];

export const PremiacoesView = () => {
    return (
        <div className="px-8 py-7 pb-28 space-y-12">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-black text-violet-950 dark:text-white tracking-tight leading-none mb-2">Premiações</h2>
                <p className="text-sm text-slate-400 dark:text-brand-400 font-medium">Conquiste marcos e desbloqueie prêmios exclusivos pela Evolux.</p>
            </div>

            {/* Current Level Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative overflow-hidden rounded-[3rem] border border-violet-100 dark:border-brand-800 bg-white dark:bg-brand-900 p-10 shadow-sm transition-all hover:shadow-xl"
            >
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-10">
                    <div className="flex-shrink-0">
                        <div className="h-24 w-24 rounded-3xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500 shadow-inner group-hover:scale-110 transition-transform duration-500">
                            <Trophy size={48} />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">Nível Atual: Bronze</h3>
                            <span className="rounded-full bg-violet-100 dark:bg-brand-800 px-3 py-1 text-[10px] font-black text-violet-600 dark:text-brand-300 uppercase tracking-widest">Iniciante</span>
                        </div>
                        <p className="text-sm font-bold text-slate-400 dark:text-brand-400 flex items-center gap-2">
                            <TrendingUp size={16} className="text-green-500" />
                            Receita total: <span className="text-slate-900 dark:text-white">0 MZN (0 vendas)</span>
                        </p>

                        <div className="mt-8 space-y-3">
                            <div className="flex items-center justify-between text-[11px] font-black tracking-wider uppercase">
                                <span className="text-violet-600 dark:text-brand-300">Meta: Prata</span>
                                <span className="text-slate-400">Faltam 10 000 MZN</span>
                            </div>
                            <div className="h-4 w-full rounded-full bg-slate-50 dark:bg-brand-950 overflow-hidden border border-slate-100 dark:border-brand-800 p-1 shadow-inner">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '0%' }}
                                    className="h-full rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.5)]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="md:w-64 pt-6 md:pt-0 md:pl-10 md:border-l border-slate-50 dark:border-brand-800">
                        <p className="text-[10px] font-black text-slate-300 dark:text-brand-500 uppercase tracking-[0.2em] mb-4">Seus benefícios atuais:</p>
                        <div className="space-y-2">
                            {['Suporte prioritário', 'Badge exclusivo'].map(b => (
                                <div key={b} className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-brand-200">
                                    <CheckCircle2 size={16} className="text-orange-500" /> {b}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Decorative background element */}
                <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-violet-50 dark:bg-brand-800/10 blur-[80px]" />
            </motion.div>

            {/* Main Rewards Grid */}
            <section className="space-y-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Kits de Premiação</h3>
                    <div className="h-1 flex-1 mx-6 bg-slate-50 dark:bg-brand-800/30 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {rewards.map((r, i) => (
                        <motion.div
                            key={r.target}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex flex-col"
                        >
                            <div className="relative">
                                {/* The Award Visual Container */}
                                <div className="relative h-72 w-full rounded-[2.5rem] bg-slate-950 border border-violet-900/30 shadow-xl overflow-hidden flex items-center justify-center hover:shadow-violet-500/20 hover:-translate-y-1 transition-all duration-500">

                                    <img
                                        src={r.image}
                                        alt={r.title}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400/1e1b4b/ffffff?text=' + r.target;
                                        }}
                                    />

                                    {/* Lock badge */}
                                    <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/10">
                                        <Lock size={16} className="text-slate-300" />
                                    </div>

                                    {/* Target badge */}
                                    <div className="absolute bottom-4 left-4 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1.5 border border-white/10">
                                        <span className="text-[10px] font-black text-violet-300 uppercase tracking-widest">{r.target} {r.label}</span>
                                    </div>
                                </div>

                                {/* Info below visual */}
                                <div className="px-2 mt-4 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-base font-black text-slate-900 dark:text-white leading-tight">{r.title}</h4>
                                        <p className="text-[11px] font-bold text-slate-400 dark:text-brand-500 uppercase tracking-[0.12em] mt-1 flex items-center gap-1.5">
                                            <Lock size={10} className="text-slate-300" />
                                            Bloqueado • Faltam {r.remain}
                                        </p>
                                    </div>
                                    <div className="h-9 w-9 rounded-xl bg-violet-100 dark:bg-brand-800 flex items-center justify-center">
                                        <Trophy size={18} className="text-violet-500" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Achievement Levels List */}
            <section className="space-y-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Escada do Sucesso</h3>
                    <div className="h-1 flex-1 mx-6 bg-slate-50 dark:bg-brand-800/30 rounded-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {levels.map((lvl) => (
                        <div
                            key={lvl.name}
                            className={cn(
                                "relative flex flex-col items-center p-8 rounded-[2.5rem] border transition-all duration-300",
                                lvl.isCurrent
                                    ? "bg-white dark:bg-brand-900 border-violet-500 shadow-xl ring-2 ring-violet-500/20"
                                    : "bg-white/50 dark:bg-brand-900/40 border-slate-100 dark:border-brand-800 hover:border-violet-200 dark:hover:border-brand-700"
                            )}
                        >
                            {lvl.isCurrent && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-4 py-1.5 text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-lg">
                                    VOCÊ ESTÁ AQUI
                                </span>
                            )}
                            <div className={cn(
                                "h-16 w-16 rounded-3xl mb-6 flex items-center justify-center text-3xl shadow-lg border-2 border-white dark:border-brand-800",
                                lvl.bgColor, lvl.darkBg, lvl.color
                            )}>
                                <lvl.icon size={32} />
                            </div>
                            <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1">{lvl.name}</h4>
                            <p className="text-[11px] font-black text-violet-500 uppercase tracking-tighter mb-6">{lvl.range}</p>

                            <div className="w-full space-y-3">
                                {lvl.benefits.map((b, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <div className="h-4 w-4 rounded-full bg-violet-50 dark:bg-brand-800 flex items-center justify-center shrink-0 mt-0.5">
                                            <Star size={10} className="text-violet-500 fill-violet-500" />
                                        </div>
                                        <span className="text-xs font-bold text-slate-500 dark:text-brand-300 leading-tight">{b}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bottom Badges */}
            <section className="bg-slate-50 dark:bg-brand-950/50 rounded-[3rem] p-10 border border-slate-100 dark:border-brand-800/50 mt-12">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-10 w-10 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-lg">
                        <Award size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">Conquistas de Performance</h3>
                        <p className="text-xs font-bold text-slate-400">Marcos extras para acelerar seu crescimento</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((ach) => (
                        <div key={ach.title} className="group relative flex items-center gap-5 rounded-2xl bg-white dark:bg-brand-900 p-6 border border-slate-100 dark:border-brand-800 shadow-sm hover:shadow-md transition-all overflow-hidden">
                            <div className="relative z-10 h-14 w-14 rounded-2xl bg-slate-50 dark:bg-brand-800 flex items-center justify-center text-slate-400 dark:text-brand-500 group-hover:bg-violet-600 group-hover:text-white group-hover:rotate-[15deg] transition-all duration-500">
                                <ach.icon size={28} />
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-sm font-black text-slate-800 dark:text-white leading-tight mb-1">{ach.title}</h4>
                                <p className="text-[11px] font-medium text-slate-400 dark:text-brand-500 leading-relaxed">{ach.desc}</p>
                            </div>
                            {/* Locked Pattern */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Lock size={40} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
