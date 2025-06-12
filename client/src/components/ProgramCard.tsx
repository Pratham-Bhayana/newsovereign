import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Program {
  id: string;
  continent: string;
  countries: string[];
  image: string;
  title?: string;
  description?: string;
  minInvestment?: string;
  processingTime?: string;
  benefits?: string[];
}

interface ProgramCardProps {
  program: Program;
  detailed?: boolean;
}

export default function ProgramCard({ program, detailed = false }: ProgramCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-3xl shadow-lg bg-white hover-lift smooth-transition"
    >
      <div className="relative">
        <img
          src={program.image}
          alt={program.title || program.continent}
          className="w-full h-64 object-cover group-hover:scale-105 smooth-transition"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">
            {program.title || program.continent}
          </h3>
          <p className="text-gray-200 mb-4">
            {program.countries.join(" • ")}
          </p>
          
          {detailed && program.description && (
            <div className="mb-4">
              <p className="text-sm text-gray-300 mb-2">{program.description}</p>
              {program.benefits && (
                <ul className="text-xs text-gray-400 space-y-1">
                  {program.benefits.map((benefit, index) => (
                    <li key={index}>• {benefit}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
          
          <Button
            asChild
            size="sm"
            className="gold-gradient text-dark hover:shadow-lg smooth-transition"
          >
            <Link href="/consultation">
              Learn More
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
