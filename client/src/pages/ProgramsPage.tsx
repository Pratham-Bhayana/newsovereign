import { motion } from "framer-motion";
import { Link } from "wouter";
import ProgramCard from "@/components/ProgramCard";
import { Button } from "@/components/ui/button";
import { PROGRAMS } from "@/lib/constants";

export default function ProgramsPage() {
  const europeanPrograms = PROGRAMS.filter(p => p.continent === "Europe");
  const caribbeanPrograms = PROGRAMS.filter(p => p.continent === "Caribbean");
  const americanPrograms = PROGRAMS.filter(p => p.continent === "Americas");
  const middleEastPrograms = PROGRAMS.filter(p => p.continent === "Middle East");
  const asiaPrograms = PROGRAMS.filter(p => p.continent === "Asia");
  const oceaniaPrograms = PROGRAMS.filter(p => p.continent === "Oceania");
  const euroAsiaPrograms = PROGRAMS.filter(p => p.continent === "Europe/Asia");

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Global Citizenship Programs</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto">
              Explore our comprehensive collection of 17 citizenship and residency programs across 6 continents. Find the perfect pathway to global mobility.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Program Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* European Programs */}
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4 text-center"
            >
              European Programs
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-600 text-center mb-12 max-w-3xl mx-auto"
            >
              Access to the European Union through premium investment programs. Enjoy visa-free travel, world-class healthcare, and excellent education systems.
            </motion.p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {europeanPrograms.map((program, index) => (
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
          </div>

          {/* Caribbean Programs */}
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4 text-center"
            >
              Caribbean Programs
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-600 text-center mb-12 max-w-3xl mx-auto"
            >
              Fast-track citizenship programs with excellent passport strength. Enjoy tax benefits, visa-free travel, and the Caribbean lifestyle.
            </motion.p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caribbeanPrograms.map((program, index) => (
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
          </div>

          {/* Americas Programs */}
          {americanPrograms.length > 0 && (
            <div className="mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-gray-900 mb-4 text-center"
              >
                Americas Programs
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-600 text-center mb-12 max-w-3xl mx-auto"
              >
                Access to North American markets through investor programs. Benefit from strong economies, excellent education, and high quality of life.
              </motion.p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {americanPrograms.map((program, index) => (
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
            </div>
          )}

          {/* Europe/Asia Programs */}
          {euroAsiaPrograms.length > 0 && (
            <div className="mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-gray-900 mb-4 text-center"
              >
                Transcontinental Programs
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-600 text-center mb-12 max-w-3xl mx-auto"
              >
                Strategic location between Europe and Asia. Bridge to both continents with growing economies and investment opportunities.
              </motion.p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {euroAsiaPrograms.map((program, index) => (
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
            </div>
          )}

          {/* Middle East Programs */}
          {middleEastPrograms.length > 0 && (
            <div className="mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-gray-900 mb-4 text-center"
              >
                Middle East Programs
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-600 text-center mb-12 max-w-3xl mx-auto"
              >
                World-class business hubs with tax advantages. Access to global financial centers and strategic trade routes.
              </motion.p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {middleEastPrograms.map((program, index) => (
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
            </div>
          )}

          {/* Asia Programs */}
          {asiaPrograms.length > 0 && (
            <div className="mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-gray-900 mb-4 text-center"
              >
                Asian Programs
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-600 text-center mb-12 max-w-3xl mx-auto"
              >
                Gateway to Asia's dynamic economies. Access to financial hubs, innovation centers, and strategic business locations.
              </motion.p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {asiaPrograms.map((program, index) => (
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
            </div>
          )}

          {/* Oceania Programs */}
          {oceaniaPrograms.length > 0 && (
            <div className="mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-gray-900 mb-4 text-center"
              >
                Oceania Programs
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-600 text-center mb-12 max-w-3xl mx-auto"
              >
                High quality of life in the Asia-Pacific region. Excellent lifestyle, business opportunities, and strategic location.
              </motion.p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {oceaniaPrograms.map((program, index) => (
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
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center bg-gray-50 rounded-3xl p-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Schedule a free consultation with our experts to find the perfect citizenship or residency program for your goals and budget.
            </p>
            <Button asChild size="lg" className="gold-gradient text-dark hover:shadow-xl smooth-transition hover-lift">
              <Link href="/consultation">
                Book Free Consultation
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
