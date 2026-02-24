import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Bell, Shield, Save, Loader2, Camera } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export const ConfiguracoesView = () => {
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Form states
    const [fullName, setFullName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
            if (user?.user_metadata?.full_name) {
                setFullName(user.user_metadata.full_name);
            }
        });
    }, []);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.updateUser({
                data: { full_name: fullName }
            });

            if (error) throw error;
            setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'Erro ao atualizar perfil.' });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'As senhas não coincidem.' });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;
            setMessage({ type: 'success', text: 'Senha atualizada com sucesso!' });
            setNewPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'Erro ao atualizar senha.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-black text-violet-950 dark:text-white tracking-tight">Configurações</h2>
                <p className="text-slate-400 dark:text-brand-400 font-medium">Gira as preferências da tua conta e segurança.</p>
            </div>

            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${message.type === 'success'
                            ? 'bg-green-50 text-green-600 border border-green-100 dark:bg-green-900/10 dark:border-green-900/20'
                            : 'bg-red-50 text-red-600 border border-red-100 dark:bg-red-900/10 dark:border-red-900/20'
                        }`}
                >
                    {message.type === 'success' ? <Shield size={18} /> : <AlertCircle size={18} />}
                    {message.text}
                </motion.div>
            )}

            <div className="grid gap-8 md:grid-cols-3">
                {/* Navigation */}
                <div className="space-y-2">
                    {[
                        { id: 'profile', label: 'Perfil', icon: User },
                        { id: 'security', label: 'Segurança', icon: Lock },
                        { id: 'notifications', label: 'Notificações', icon: Bell },
                    ].map((item) => (
                        <button
                            key={item.id}
                            className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${item.id === 'profile'
                                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                                    : 'text-slate-500 hover:bg-violet-50 dark:text-brand-400 dark:hover:bg-brand-800'
                                }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Forms Area */}
                <div className="md:col-span-2 space-y-8">
                    {/* Profile Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white dark:bg-brand-900 rounded-[2rem] border border-violet-100 dark:border-brand-800 p-8 shadow-sm"
                    >
                        <div className="flex items-center gap-6 mb-8">
                            <div className="relative group">
                                <div className="h-24 w-24 rounded-[2rem] overflow-hidden ring-4 ring-violet-50 dark:ring-brand-800">
                                    <img
                                        src="/logo.png"
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=E&background=7c3aed&color=fff&bold=true&size=128';
                                        }}
                                    />
                                </div>
                                <button className="absolute -bottom-2 -right-2 h-10 w-10 rounded-xl bg-violet-600 border-4 border-white dark:border-brand-900 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                                    <Camera size={16} />
                                </button>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white">Foto de Perfil</h3>
                                <p className="text-sm text-slate-400 font-medium">PNG ou JPG até 5MB.</p>
                            </div>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nome Completo</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="João Pedro"
                                    className="w-full px-4 py-3.5 rounded-xl border border-violet-100 dark:border-brand-800 bg-slate-50 dark:bg-brand-800 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email (Não alterável)</label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    disabled
                                    className="w-full px-4 py-3.5 rounded-xl border border-violet-100 dark:border-brand-800 bg-slate-100 dark:bg-brand-950/50 text-slate-400 cursor-not-allowed outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 bg-violet-600 text-white px-8 py-3.5 rounded-2xl font-black text-sm hover:bg-violet-700 transition-all shadow-lg shadow-violet-500/25 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                Salvar Alterações
                            </button>
                        </form>
                    </motion.div>

                    {/* Security Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white dark:bg-brand-900 rounded-[2rem] border border-violet-100 dark:border-brand-800 p-8 shadow-sm"
                    >
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                            <Lock className="text-violet-500" size={20} />
                            Alterar Senha
                        </h3>

                        <form onSubmit={handleUpdatePassword} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nova Senha</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3.5 rounded-xl border border-violet-100 dark:border-brand-800 bg-slate-50 dark:bg-brand-800 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Confirmar Senha</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3.5 rounded-xl border border-violet-100 dark:border-brand-800 bg-slate-50 dark:bg-brand-800 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all dark:text-white"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading || !newPassword}
                                className="flex items-center gap-2 bg-slate-900 dark:bg-white dark:text-brand-900 text-white px-8 py-3.5 rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-lg disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="animate-spin" size={18} /> : <Lock size={18} />}
                                Atualizar Senha
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const AlertCircle = ({ size }: { size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
);
