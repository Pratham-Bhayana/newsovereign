import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = service.icon;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-2xl shadow-lg hover-lift smooth-transition"
    >
      <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
        <IconComponent className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
      <p className="text-gray-600">{service.description}</p>
    </motion.div>
  );
}
