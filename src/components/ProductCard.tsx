import { Star, Heart, ShoppingBag } from "lucide-react";


interface ProductCardProps {
    title: string;
    category: string;
    price: number;
    rating: number;
    reviews: number;
    image: string;
    isNew?: boolean;
}

export const ProductCard = ({ title, category, price, rating, reviews, image, isNew }: ProductCardProps) => {
    return (
        <div className="group relative flex flex-col rounded-3xl border border-zinc-200 bg-white p-2 transition-all hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/10 active:scale-[0.98]">
            <div className="absolute right-4 top-4 z-10">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-zinc-400 backdrop-blur-sm transition-all hover:text-red-500 hover:scale-110 shadow-sm">
                    <Heart className="h-5 w-5" />
                </button>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                {isNew && (
                    <div className="absolute left-3 top-3 rounded-full bg-primary-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                        Novo
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2 p-3">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{category}</span>
                    <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold text-zinc-700">{rating}</span>
                        <span className="text-[10px] text-zinc-400">({reviews})</span>
                    </div>
                </div>
                <h3 className="line-clamp-1 font-bold text-zinc-900">{title}</h3>
                <div className="mt-2 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-zinc-400 leading-none">A partir de</span>
                        <span className="text-xl font-black text-zinc-900 mt-1">{price.toLocaleString()} MT</span>
                    </div>
                    <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white transition-all hover:bg-primary-500 hover:scale-110 shadow-lg active:scale-95">
                        <ShoppingBag className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
