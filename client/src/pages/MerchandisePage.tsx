import { motion } from "framer-motion";
import MerchandiseCard from "@/components/MerchandiseCard";
import { MERCHANDISE } from "@/lib/constants";

export default function MerchandisePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-400 to-yellow-600 text-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Merchandise</h1>
            <p className="text-xl lg:text-2xl max-w-4xl mx-auto">
              Show your global citizen pride with our exclusive Raizing Sovereign merchandise collection.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MERCHANDISE.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <MerchandiseCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
