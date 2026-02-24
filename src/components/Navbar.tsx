import { Search, ShoppingCart, User, Menu, Bell } from "lucide-react";


export const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-8">
                    <a href="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-primary-500 shadow-lg shadow-primary-500/20" />
                        <span className="text-xl font-bold tracking-tight text-zinc-900">
                            Moz<span className="text-primary-600">Forge</span>
                        </span>
                    </a>
                    <div className="hidden md:flex gap-6 text-sm font-medium text-zinc-600">
                        <a href="#" className="hover:text-primary-600 transition-colors">Explorar</a>
                        <a href="#" className="hover:text-primary-600 transition-colors">Categorias</a>
                        <a href="#" className="hover:text-primary-600 transition-colors">Ofertas</a>
                        <a href="#" className="hover:text-primary-600 transition-colors">Vender</a>
                    </div>
                </div>

                <div className="hidden max-w-md flex-1 px-8 md:block">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Pesquisar no mercado..."
                            className="h-10 w-full rounded-full border border-zinc-200 bg-zinc-50 pl-10 pr-4 text-sm outline-none ring-primary-500/20 transition-all focus:border-primary-500 focus:ring-4"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="relative rounded-full p-2 text-zinc-600 hover:bg-zinc-100 md:block hidden">
                        <Bell className="h-5 w-5" />
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary-500 border-2 border-white" />
                    </button>
                    <button className="rounded-full p-2 text-zinc-600 hover:bg-zinc-100">
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                    <div className="h-8 w-[1px] bg-zinc-200 mx-1 hidden md:block" />
                    <button className="flex items-center gap-2 rounded-full border border-zinc-200 p-1 pr-3 hover:bg-zinc-50 transition-all shadow-sm">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-600">
                            <User className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-zinc-700 md:block hidden">Entrar</span>
                    </button>
                    <button className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 md:hidden">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </nav>
    );
};
