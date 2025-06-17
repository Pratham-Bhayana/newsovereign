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
      className="group overflow-hidden rounded-3xl h-full w-full shadow-lg bg-[#f8f4ea] hover-lift smooth-transition"
    >
      <div className="relative">
        <img
          src={program.image}
          alt={program.title || program.continent}
          className=" filter-blur w-full h-64 object-cover  group-hover:scale-105 smooth-transition"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-ms font-bold mb-2 text-gray-900">
          {program.title || program.continent}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {/* {program.countries.join(" • ")} */}
        </p>
        
        {detailed && program.description && (
          <div className="mb-4">
            {/* <p className="text-sm text-gray-600 mb-3">{program.description}</p> */}
            {program.minInvestment && (
              <div className="mb-3">
                <span className="text-xs font-semibold text-white bg-[#183b4e]/90 px-2 py-1 rounded-full">
                  From {program.minInvestment}
                </span>
              </div>
            )}
            {/* {program.benefits && (
              <ul className="text-sm text-gray-500 space-y-1">
                {program.benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            )} */}
          </div>
        )}
        
        <Button
          asChild
          size="sm"
          className="w-full text-dark hover:shadow-lg bg-transparent text-left smooth-transition"
        > 
          <Link href={`/programs/${program.id}`}>
            Learn More
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
