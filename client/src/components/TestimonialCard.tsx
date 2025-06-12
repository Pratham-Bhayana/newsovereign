import { Star, User } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  program: string;
  content: string;
  rating: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover-lift smooth-transition">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
          <User className="w-6 h-6 text-gray-600" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
          <p className="text-gray-600">{testimonial.program}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{testimonial.content}</p>
      <div className="flex text-gold">
        {Array.from({ length: testimonial.rating }, (_, i) => (
          <Star key={i} className="w-4 h-4 fill-current" />
        ))}
      </div>
    </div>
  );
}
