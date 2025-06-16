import { motion } from "framer-motion";
import { Link } from "wouter";
import ProgramCard from "@/components/ProgramCard";
import { Button } from "@/components/ui/button";
import { PROGRAMS } from "@/lib/constants";

export default function ProgramsPage() {
  return (
    <div>
      {/* Hero Section - Updated */}
      <section className="py-10 bg-gradient-to-b from-[#f8f4ea] h-[200px] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-2xl lg:text-4xl text-[#cba135] font-bold mb-6">Explore Our Programs</h1>
            <p className="text-sm sm:text-base text-black max-w-4xl mx-auto">
              Discover 17 citizenship and residency programs across 6 continents in one seamless preview. Find your pathway to global mobility.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Program Cards - Unified Grid */}
      <section className="py-16 sm:py-20 bg-gradient-to-t  from-[#f8f4ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-12 ]">
            {PROGRAMS.map((program, index) => (
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

          {/* Schedule Button - Unchanged */}
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
            <Button asChild size="lg" className="bg-gradient-to-b from-[#cba153] to-[#183b4e] text-white hover:shadow-xl smooth-transition hover-lift">
              <Link href="/consultation">
                <i className="bi bi-calendar-event-fill text-[#f8f4ea] text-2xl mr-[25px]"></i> Book Free Consultation
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}