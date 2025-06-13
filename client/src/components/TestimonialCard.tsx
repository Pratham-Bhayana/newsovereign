// TestimonialCard.tsx

import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  program: string;
  content: string;
  rating: number;
  image: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl  border border-gray-100 flex flex-col">
      {/* User Image */}
      <div className="flex justify-center mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-[#cba135]"
        />
      </div>

      {/* Name and Program */}
      <h3 className="text-lg font-bold text-gray-900 text-center">{testimonial.name}</h3>
      <p className="text-sm text-gray-600 text-center mb-4">{testimonial.program}</p>

      {/* Content */}
      <p className="text-sm text-gray-700 flex-grow">{testimonial.content}</p>

      {/* Rating */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}