import { motion } from "framer-motion";
import { Link } from "wouter";
import ProgramCard from "@/components/ProgramCard";
import { Button } from "@/components/ui/button";
import { PROGRAMS } from "@/lib/constants";

export default function ProgramsPage() {
  const europeanPrograms = PROGRAMS.filter(p => p.continent === "Europe");
  const caribbeanPrograms = PROGRAMS.filter(p => p.continent === "Caribbean");
  const americanPrograms = PROGRAMS.filter(p => p.continent === "Americas");

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Our Programs</h1>
            <p className="text-xl lg:text-2xl text-green-100 max-w-4xl mx-auto">
              Discover world-class citizenship and residency programs tailored to your investment goals and lifestyle preferences.
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
              className="text-4xl font-bold text-gray-900 mb-12 text-center"
            >
              European Programs
            </motion.h2>
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
              className="text-4xl font-bold text-gray-900 mb-12 text-center"
            >
              Caribbean Programs
            </motion.h2>
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

          {/* American Programs */}
          {americanPrograms.length > 0 && (
            <div className="mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-gray-900 mb-12 text-center"
              >
                American Programs
              </motion.h2>
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

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
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
