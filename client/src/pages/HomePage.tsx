
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckSquare } from "lucide-react";
import ProgramCard from "@/components/ProgramCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { PROGRAMS, SERVICES, TESTIMONIALS } from "@/lib/constants";
import { useState, useEffect } from "react";

// Import images from the assets folder
import a1 from "@/components/assets/a1.png";
import a2 from "@/components/assets/a2.png";
import a3 from "@/components/assets/a3.png";
import a4 from "@/components/assets/a4.png";
import a5 from "@/components/assets/a5.png";
import bgNew from "@/components/assets/downloaded-image (4).png";

// Array of six high-quality images for the slideshow
const backgroundImages = [
  "https://res.cloudinary.com/dyyswz13r/image/upload/v1750657871/ChatGPT_Image_Jun_23_2025_11_20_48_AM_xjhkdk.png",
  "https://res.cloudinary.com/dyyswz13r/image/upload/v1750657870/ChatGPT_Image_Jun_23_2025_09_35_43_AM_d9dhjq.png",
  "https://res.cloudinary.com/dyyswz13r/image/upload/v1750657871/ChatGPT_Image_Jun_23_2025_09_54_02_AM_sbk0wf.png",

  "https://res.cloudinary.com/dyyswz13r/image/upload/v1750658531/ChatGPT_Image_Jun_23_2025_11_31_57_AM_fl0qnn.png",
  "https://res.cloudinary.com/dyyswz13r/image/upload/v1750659116/ChatGPT_Image_Jun_23_2025_11_41_43_AM_lvtfto.png",
];

// Function to shuffle an array (Fisher-Yates shuffle)
const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function HomePage() {
  // Animation variants for the Hero Section
  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  // Animation variants for background image transitions
  const backgroundVariants = {
    initial: { 
      opacity: 0, 
      scale: 1.0, 
      x: 10, 
      y: 10 
    },
    animate: { 
      opacity: 1, 
      scale: 1.1, // Reduced for less distortion
      x: 0, 
      y: 0,
      transition: { 
        duration: 5, // Match slide duration
        ease: "easeOut",
        opacity: { duration: 1.5 }, // Dissolve
        scale: { duration: 5 }, // Ken Burns
        x: { duration: 5 },
        y: { duration: 5 }
      }
    },
    exit: { 
      opacity: 0, 
      scale: 1.05, // Reduced exit scale
      x: -10, 
      y: -10,
      transition: { 
        duration: 1.5, // Dissolve out
        ease: "easeIn"
      }
    },
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

  // Slideshow state for Background Images
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [shuffledImages, setShuffledImages] = useState<any[]>([]);

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      shuffledImages.forEach((src) => {
        const img = new Image();
        img.src = typeof src === "string" ? src : src.default || src;
      });
    };

    if (shuffledImages.length > 0) {
      preloadImages();
    }
  }, [shuffledImages]);

  // Shuffle images on component mount
  useEffect(() => {
    const shuffled = shuffleArray(backgroundImages);
    setShuffledImages(shuffled);
    console.log("Shuffled Images:", shuffled); // Debug: Log shuffled images
  }, []);

  // Effect for background image slideshow
  useEffect(() => {
    if (shuffledImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => {
        const next = (prev + 1) % shuffledImages.length;
        console.log("Current Background Index:", next, "Image:", shuffledImages[next]); // Debug: Log index and image
        return next;
      });
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [shuffledImages]);

  // Calculate total slides based on screen size for Testimonials
  const totalSlides = Math.ceil(TESTIMONIALS.length / cardsPerSlide.lg); // For lg screens
  const totalSlidesSm = Math.ceil(TESTIMONIALS.length / cardsPerSlide.sm); // For sm screens
  const totalSlidesBase = Math.ceil(TESTIMONIALS.length / cardsPerSlide.base); // For base screens

  // Effect for testimonial slideshow
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const isLg = window.matchMedia("(min-width: 1024px)").matches;
        const isSm = window.matchMedia("(min-width: 640px)").matches;
        const slides = isLg ? totalSlides : isSm ? totalSlidesSm : totalSlidesBase;
        return (prev + 1) % slides;
      });
    }, 5000); // 5 seconds for testimonials

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
      {/* Hero Section with Background Slideshow */}
      <section
        className="absolute top-0 left-0 w-full min-h-[100vh] sm:min-h-[60vh] lg:min-h-[100vh] flex items-center justify-center overflow-hidden bg-gray-900"
      >
        <AnimatePresence>
          {shuffledImages.length > 0 && (
            <motion.div
              key={currentBgIndex}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${typeof shuffledImages[currentBgIndex] === "string" ? shuffledImages[currentBgIndex] : shuffledImages[currentBgIndex].default || shuffledImages[currentBgIndex]})`,
                imageRendering: "crisp-edges", // Fix TypeScript error and improve sharpness
                willChange: "transform, opacity", // Performance hint
              }}
              variants={backgroundVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="absolute inset-0" /> {/* Subtle overlay */}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="relative z-[3] w-full mb-[250px] sm:mb-0 max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
          {/* Left Side: Title and Description */}
          <div className="flex flex-col items-start text-center lg:text-left pt-[180px] lg:pt-0">
            <motion.h1
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6 }}
              className="text-[#cba135]  text-4xl text-stroke text-stroke-black   sm:text-5xl text-left lg:text-6xl font-bold mb-10 sm:mt-5 max-w-full sm:max-w-[80%] top- lg:max-w-[600px]"
            >
              Elevate Your Global Freedom
            </motion.h1>
            <motion.div
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#ffff] text-lg sm:text-xl text-left lg:text-2xl font-semibold max-w-full sm:mt-5 sm:max-w-[80%] lg:max-w-[600px]"
            >
              Unlock worldwide mobility and financial freedom through our exclusive citizenship and residency investment programs.
            </motion.div>
          </div>

          {/* Right Side: Buttons */}
          <motion.div
            variants={heroVariants}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            animate="visible"
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute right-[0] top-[100%] sm:right-[-130px] sm: top[100%] flex-col items-center lg:items-end mt-2 lg:mt-0"
          >
            <Link
              href="/programs"
              className="no-underline bg-[#cba135] text-white py-3 px-6 w-[220px] sm:w-[250px] h-[50px] sm:h-[60px] flex items-center justify-center uppercase gap-4 rounded-tl-[50px] rounded-bl-[50px] hover:drop-shadow-[0_0_20px_#000000] transition-all duration-300 animate-btn-r-l text-sm sm:text-base"
            >
              Explore Programs
            </Link>
            <Link
              href="/consultation"
              className="no-underline bg-[#2e3252] text-white py-3 px-6 w-[220px] sm:w-[250px] h-[50px] sm:h-[60px] flex items-center justify-center uppercase text-xs sm:text-sm font-normal mt-2 rounded-tl-[50px] rounded-bl-[50px] hover:drop-shadow-[0_0_20px_#000000] transition-all duration-300"
            >
              Schedule Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Spacer to Prevent Content Overlap */}
      <div className="h-[90vh] sm:h-[100vh] bg-[#f8f4ea] lg:h-[90vh]"></div>

      {/* Programs Preview */}
      <section className="py-24 sm:py-20 mt-0 bg-[#f8f4ea]">
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

      {/* Comprehensive Services */}
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
                <div className="bg-[#1A3C34] text-white rounded-2xl p-6 flex gap-4 flex-col shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ring-1 ring-[#cba135]/30">
                  <div className="mb-2">
                    <service.icon className="w-6 h-6 text-[#cba135]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{service.description}</p>
                  <ul className="space-y-2 mb-3">
                    {service.bulletPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckSquare className="w-5 h-5 text-white mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
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

      {/* Trusted Partners */}
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
                className="flex items-center justify-center h-30 sm:h-40 rounded-xl "
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

      {/* Testimonials */}
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
                  const isLg = window.matchMedia("(min-width: 1024px)").matches;
                  const isSm = window.matchMedia("(min-width: 640px)").matches;
                  const cardsToShow = isLg ? cardsPerSlide.lg : isSm ? cardsPerSlide.sm : cardsPerSlide.base;
                  const startIndex = currentSlide * cardsToShow;
                  const endIndex = Math.min(startIndex + cardsToShow, TESTIMONIALS.length);
                  const visibleTestimonials = TESTIMONIALS.slice(startIndex, endIndex);

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

      {/* Book a Consultation */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center bg-[#183b4e] p-12"
      >
        <h3 className="text-2xl font-bold text-[#cba135] mb-4">Ready to Start Your Journey?</h3>
        <p className="text-white mb-8 max-w-2xl mx-auto">
          Schedule a free consultation with our experts to find the perfect citizenship or residency program for your goals and budget.
        </p>
        <Button asChild size="lg" className="bg-[#cba135] to-[#183b4e] text-white hover:shadow-xl smooth-transition hover-lift">
          <Link href="/consultation">
            Book Free Consultation
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
