import { LucideIcon } from "lucide-react";

interface MerchandiseItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: LucideIcon;
}

interface MerchandiseCardProps {
  item: MerchandiseItem;
  onAddToCart: () => void;
}

export default function MerchandiseCard({ item, onAddToCart }: MerchandiseCardProps) {
  const IconComponent = item.icon;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        <IconComponent className="w-10 h-10 text-gray-400" />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-[#183b4e] mb-2">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-base font-bold text-[#cba135]">${item.price.toFixed(2)}</span>
          <button
            className="bg-[#cba135] text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-[#b08f2e] transition"
            onClick={onAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}