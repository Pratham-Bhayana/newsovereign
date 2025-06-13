import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckSquare } from "lucide-react";
import ProgramCard from "@/components/ProgramCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PROGRAMS, SERVICES, TESTIMONIALS } from "@/lib/constants";
import { useState, useEffect } from "react";

// Import images from the assets folder
import a1 from "@/components/assets/a1.png";
import a2 from "@/components/assets/a2.png";
import a3 from "@/components/assets/a3.png";
import a4 from "@/components/assets/a4.png";
import a5 from "@/components/assets/a5.png";

export default function HomePage() {
  // Animation variants for the Hero Section
  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  // Array of partner images
  const partnerImages = [a1, a2, a3, a4, a5];

  // Slideshow state for Testimonials
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const cardsPerSlide = {
    base: 1, // Small screens
    sm: 2,  // Medium screens
    lg: 3,  // Large screens
  };

  // Calculate total slides based on screen size
  const totalSlides = Math.ceil(TESTIMONIALS.length / cardsPerSlide.lg); // For lg screens
  const totalSlidesSm = Math.ceil(TESTIMONIALS.length / cardsPerSlide.sm); // For sm screens
  const totalSlidesBase = Math.ceil(TESTIMONIALS.length / cardsPerSlide.base); // For base screens

  // Effect for slideshow
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        // Determine the total slides based on the current screen size
        const isLg = window.matchMedia("(min-width: 1024px)").matches;
        const isSm = window.matchMedia("(min-width: 640px)").matches;
        const slides = isLg ? totalSlides : isSm ? totalSlidesSm : totalSlidesBase;
        return (prev + 1) % slides;
      });
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [paused, totalSlides, totalSlidesSm, totalSlidesBase]);

  // Animation variants for slideshow cards
  const slideVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -100, scale: 0.9 },
  };

  return (
    <div>
      {/* Hero Section - Unchanged */}
      <section className="relative bg-white min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden z-[-1]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/vdo-bg.mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="relative z-[3] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
          {/* Left Side: Title and Description */}
          <div className="flex flex-col items-start text-center lg:text-left">
            <motion.h1
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6 }}
              className="text-[#cba135] text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 max-w-full sm:max-w-[80%] lg:max-w-[600px]"
            >
              Elevate Your Global Freedom
            </motion.h1>
            <motion.div
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-black text-lg sm:text-xl lg:text-2xl font-semibold max-w-full sm:max-w-[80%] lg:max-w-[600px]"
            >
              Unlock worldwide mobility and financial freedom through our exclusive citizenship and residency investment programs.
            </motion.div>
          </div>

          {/* Right Side: Buttons */}
          <motion.div
            variants={heroVariants}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{opacity:1, x:0}}
            animate="visible"
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute right-[-130px] top-[70%] flex-col items-center lg:items-end mt-2 lg:mt-0"
          >
            <Link
              href="/program.html"
              className="no-underline bg-[#cba135] text-white py-3 px-6 w-[220px] sm:w-[250px] h-[50px] sm:h-[60px] flex items-center justify-center uppercase gap-4 rounded-tl-[50px] rounded-bl-[50px] hover:drop-shadow-[0_0_20px_#000000] transition-all duration-300 animate-btn-r-l text-sm sm:text-base"
            >
              Explore Programs
            </Link>
            <Link
              href="/schedule.html"
              className="no-underline bg-[#2e3252] text-white py-3 px-6 w-[220px] sm:w-[250px] h-[50px] sm:h-[60px] flex items-center justify-center uppercase text-xs sm:text-sm font-normal mt-2 rounded-tl-[50px] rounded-bl-[50px] hover:drop-shadow-[0_0_20px_#000000] transition-all duration-300"
            >
              Schedule Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Programs Preview - Unchanged */}
      <section className="py-16 sm:py-20 bg-[#f8f4ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Citizenship & Residency Programs
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive programs organized by continents, offering pathways to global mobility and investment opportunities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PROGRAMS.slice(0, 6).map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProgramCard program={program} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-10 sm:mt-12"
          >
            <Button asChild size="lg" className="bg-[#cba135] text-white hover:bg-[#183b4e] text-sm sm:text-base">
              <Link href="/programs">
                Explore All Programs
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Comprehensive Services - Unchanged */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Comprehensive Services
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              From citizenship by investment to investment advisory, we provide end-to-end solutions for your global mobility needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                {/* Custom Card Design - Compact and Rounded Square */}
                <div className="bg-[#1A3C34] text-white rounded-2xl p-6 flex gap-4 flex-col shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ring-1 ring-[#cba135]/30">
                  {/* Icon */}
                  <div className="mb-2">
                    <service.icon className="w-6 h-6 text-[#cba135]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-3">{service.description}</p>

                  {/* Bullet Points */}
                  <ul className="space-y-2 mb-3">
                    {service.bulletPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckSquare className="w-5 h-5 text-white mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Link */}
                  <div className="mt-auto">
                    <Link
                      href={`/${service.id}`}
                      className="flex items-center text-[#cba135] font-bold text-sm hover:underline"
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Partners - Unchanged */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Accreditation
            </h2>
            
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center opacity-100">
            {partnerImages.map((image, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center h-30 sm:h-40  rounded-xl border border-gray-200"
              >
                <img
                  src={image}
                  alt={`Partner ${i + 1}`}
                  className="w-full h-full object-contain p-2"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Updated with Slideshow */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Client Success Stories
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              Hear from our satisfied clients who achieved their migration goals
            </p>
          </motion.div>

          {/* Slideshow Container */}
          <div
            className="relative overflow-hidden opacity-90 hover:opacity-100 transition-opacity duration-300"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={currentSlide}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideVariants}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {(() => {
                  // Determine how many cards to show based on screen size
                  const isLg = window.matchMedia("(min-width: 1024px)").matches;
                  const isSm = window.matchMedia("(min-width: 640px)").matches;
                  const cardsToShow = isLg ? cardsPerSlide.lg : isSm ? cardsPerSlide.sm : cardsPerSlide.base;
                  const startIndex = currentSlide * cardsToShow;
                  const endIndex = Math.min(startIndex + cardsToShow, TESTIMONIALS.length);
                  const visibleTestimonials = TESTIMONIALS.slice(startIndex, endIndex);

                  // If there are fewer testimonials than cardsToShow, loop back to the start
                  if (visibleTestimonials.length < cardsToShow) {
                    const remaining = cardsToShow - visibleTestimonials.length;
                    visibleTestimonials.push(...TESTIMONIALS.slice(0, remaining));
                  }

                  return visibleTestimonials.map((testimonial) => (
                    <div key={testimonial.id} className="flex">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  ));
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Contact Form - Unchanged */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Get in Touch
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              Ready to start your migration journey? Contact us today for a personalized consultation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-6 sm:p-8 rounded-3xl shadow-lg"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="fullName" className="text-sm">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    className="mt-2 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="mt-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="phone" className="text-sm">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone"
                    className="mt-2 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="program" className="text-sm">Interested Program</Label>
                  <Select>
                    <SelectTrigger className="mt-2 text-sm">
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="citizenship">Citizenship by Investment</SelectItem>
                      <SelectItem value="residency">Residency Program</SelectItem>
                      <SelectItem value="advisory">Investment Advisory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-sm">Message</Label>
                <Textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your requirements"
                  className="mt-2 text-sm"
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  className="gold-gradient text-dark hover:shadow-xl smooth-transition hover-lift text-sm sm:text-base"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}