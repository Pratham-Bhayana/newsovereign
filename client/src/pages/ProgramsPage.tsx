import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState, useRef, useEffect } from "react";
import ProgramCard from "@/components/ProgramCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PROGRAMS } from "@/lib/constants";

export default function ProgramsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Filter programs based on search query
  const filteredPrograms = PROGRAMS.filter((program) =>
    program.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get 4 programs for preview (when empty or searching)
  const previewPrograms = searchQuery ? filteredPrograms.slice(0, 4) : PROGRAMS.slice(0, 4);

  // Handle click outside to hide preview list
  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node) && !searchQuery) {
      setIsSearchActive(false);
    }
  };

  // Add/remove click outside listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchQuery]);

  return (
    <div className="font-['Inter',sans-serif] pb-16 sm:pb-0">
      {/* Hero Section with Search */}
      <section className="py-10 bg-white min-h-[280px] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-2"
          >
            <h1 className="text-2xl lg:text-4xl text-[#cba135] mt-10 font-bold mb-4">Explore Our Programs</h1>
            <p className="text-sm sm:text-base text-black max-w-4xl mx-auto mb-3">
              Discover 17 citizenship and residency programs across 6 continents in one seamless preview. Find your pathway to global mobility.
            </p>
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative max-w-lg mx-auto mt-2"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#183b4e]" />
              <Input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchActive(true)}
                className="pl-9 pr-4 py-1.5 w-full rounded-full border-[#183b4e] focus:border-[#cba135] focus:ring-2 focus:ring-[#cba135] text-black text-sm shadow-sm bg-white/90 transition-all duration-300 hover:shadow-md"
                ref={searchRef}
              />
            </motion.div>
            {/* Program Preview as List */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isSearchActive ? 1 : 0, 
                height: isSearchActive ? "auto" : 0 
              }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-1 mt-2 max-w-lg mx-auto overflow-hidden"
            >
              {isSearchActive && previewPrograms.map((program, index) => {
                const programUrl = program.id ? `/programs/${program.id}` : "#";
                return (
                  <Link key={program.id} href={programUrl} className="cursor-pointer">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center gap-3 py-1.5 px-2 hover:bg-gray-100 rounded-md transition-colors"
                      onClick={(e) => {
                        if (!program.id) e.preventDefault();
                      }}
                    >
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-10 h-10 object-cover rounded-md"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <h3 className="text-xs font-semibold text-[#183b4e] flex-1 truncate">{program.title}</h3>
                    </motion.div>
                  </Link>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Program Cards */}
      <section className="py-10 sm:py-20 bg-gradient-to-t from-[#f8f4ea]">
        <div className="max-w-full mx-auto px-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-4">
            {filteredPrograms.slice(6, 24).map((program, index) => (
              <motion.div 
                key={program.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProgramCard program={program} detailed />
              </motion.div>
            ))}
          </div>

          {/* Schedule Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center bg-[#183b4e] rounded-3xl p-12 mt-12"
          >
            <h3 className="text-2xl font-bold text-[#cba135] mb-4">Ready to Start Your Journey?</h3>
            <p className="text-white mb-8 max-w-2xl mx-auto">
              Schedule a free consultation with our experts to find the perfect citizenship or residency program for your goals and budget.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-b from-[#cba153] to-[#183b4e] text-white hover:shadow-xl smooth-transition shadow-lg hover:drop-shadow-[0_0_5px_#000000]">
              <Link href="/consultation">
                <i className="bi bi-calendar-event-fill text-[#f8f4ea] text-2xl mr-[25px]"></i> Book Free Consultation
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Fixed Footer for Mobile */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#183b4e] text-white p-4 flex justify-between items-center sm:hidden z-50">
        <span className="text-xs font-semibold">Having Trouble? Talk to our experts</span>
        <Link href="/consultation">
          <button className="bg-[#cba135] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#b08f2e] transition">
            Contact Us
          </button>
        </Link>
      </footer>
    </div>
  );
}