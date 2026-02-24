
import { motion } from 'framer-motion';
import {
    ShoppingBag, Receipt, Users, BarChart2,
    Megaphone, Settings, Plus, Layers
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type PlaceholderProps = {
    title: string;
    description: string;
    icon: LucideIcon;
    accentColor?: string;
};

const PlaceholderView = ({ title, description, icon: Icon, accentColor = '#8b5cf6' }: PlaceholderProps) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center"
    >
        <div
            className="w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-lg"
            style={{ backgroundColor: accentColor + '12', border: `1.5px solid ${accentColor}20` }}
        >
            <Icon size={44} color={accentColor} />
        </div>
        <h2 className="text-3xl font-black text-violet-950 mb-3 tracking-tight">{title}</h2>
        <p className="max-w-sm text-slate-400 font-medium leading-relaxed text-sm">{description}</p>

        <div className="flex gap-4 mt-10">
            <button
                className="flex items-center gap-2 rounded-2xl px-7 py-3.5 font-bold text-sm text-white shadow-lg hover:opacity-90 transition-all hover:scale-105 active:scale-95"
                style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, boxShadow: `0 8px 24px -8px ${accentColor}55` }}
            >
                <Plus size={18} />
                Adicionar {title}
            </button>
            <button className="flex items-center gap-2 rounded-2xl border border-violet-100 bg-white px-7 py-3.5 font-bold text-sm text-slate-600 hover:bg-violet-50 transition-all">
                Ver Guia
            </button>
        </div>

        <div className="fixed top-32 right-32 h-72 w-72 rounded-full blur-[100px] pointer-events-none" style={{ backgroundColor: accentColor + '0c' }} />
        <div className="fixed bottom-32 left-80 h-52 w-52 rounded-full blur-[70px] pointer-events-none" style={{ backgroundColor: accentColor + '08' }} />
    </motion.div>
);

import { PremiacoesView } from './PremiacoesView';

import { PagamentosView } from './PagamentosView';

export const Views = {
    Vendas: () => <PlaceholderView title="Vendas" description="Gira todas as suas vendas, emita facturas e acompanhe o estado de cada transacção." icon={Receipt} accentColor="#8b5cf6" />,
    Produtos: () => <PlaceholderView title="Produtos" description="Crie e gira os seus produtos digitais ou físicos. Defina preços, variantes e stock." icon={ShoppingBag} accentColor="#7c3aed" />,
    Pagamentos: () => <PagamentosView />,
    Afiliados: () => <PlaceholderView title="Afiliados" description="Recrute afiliados para venderem os seus produtos e gerir comissões de forma automática." icon={Users} accentColor="#06b6d4" />,
    Mercado: () => <PlaceholderView title="Mercado" description="Explore produtos de outros criadores, torne-se afiliado e expanda os seus rendimentos." icon={Layers} accentColor="#f59e0b" />,
    Premiações: () => <PremiacoesView />,
    Marketing: () => <PlaceholderView title="Marketing" description="Crie campanhas, e-mails e funnels de venda para aumentar a sua conversão." icon={Megaphone} accentColor="#8b5cf6" />,
    Analytics: () => <PlaceholderView title="Analytics" description="Dados avançados sobre o comportamento dos seus clientes, conversão e ROI." icon={BarChart2} accentColor="#4f46e5" />,
    Configuracoes: () => <PlaceholderView title="Configurações" description="Personalize a sua conta, domínio, integrações de pagamentos e preferências gerais." icon={Settings} accentColor="#64748b" />,
};
