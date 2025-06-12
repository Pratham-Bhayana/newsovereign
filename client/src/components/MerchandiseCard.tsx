import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MerchandiseItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: LucideIcon;
}

interface MerchandiseCardProps {
  item: MerchandiseItem;
}

export default function MerchandiseCard({ item }: MerchandiseCardProps) {
  const IconComponent = item.icon;

  return (
    <div className="bg-white border-2 border-gray-200 rounded-3xl overflow-hidden hover-lift smooth-transition shadow-lg">
      <div className="h-64 bg-gray-100 flex items-center justify-center">
        <IconComponent className="w-16 h-16 text-gray-400" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.name}</h3>
        <p className="text-gray-600 mb-6">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gold">${item.price}</span>
          <Button className="gold-gradient text-dark hover:shadow-lg smooth-transition">
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
}
