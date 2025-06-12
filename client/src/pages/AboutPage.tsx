import { motion } from "framer-motion";
import { Shield, Star, Users, Lightbulb, Eye, Target } from "lucide-react";

export default function AboutPage() {
  const coreValues = [
    {
      icon: Shield,
      title: "Integrity",
      description: "Maintaining the highest ethical standards in all our dealings and relationships."
    },
    {
      icon: Star,
      title: "Excellence",
      description: "Delivering exceptional service quality and results that exceed expectations."
    },
    {
      icon: Users,
      title: "Client Focus",
      description: "Putting our clients' needs and goals at the center of everything we do."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Continuously improving our processes and services through innovation."
    }
  ];

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
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">About Raizing Sovereign</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto">
              Leading the way in global citizenship and residency solutions with excellence, integrity, and personalized service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Raizing Sovereign is a premier global citizenship and investment migration consultancy firm. With years of expertise and a proven track record, we specialize in providing comprehensive solutions for individuals and families seeking second citizenship, permanent residency, and investment opportunities worldwide.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our team of experienced professionals works closely with government agencies, legal experts, and financial institutions to ensure seamless processing and successful outcomes for our clients' migration goals.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Modern office workspace" 
                className="rounded-3xl shadow-2xl hover-lift smooth-transition" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Core Values</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-dark" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="gradient-bg text-white p-12 rounded-3xl"
            >
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-8">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
              <p className="text-xl text-blue-100 leading-relaxed">
                To be the world's most trusted partner in global citizenship and investment migration, empowering individuals and families to achieve their dreams of international mobility and security.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="gold-gradient text-dark p-12 rounded-3xl"
            >
              <div className="w-16 h-16 bg-white bg-opacity-30 rounded-2xl flex items-center justify-center mb-8">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
              <p className="text-xl leading-relaxed">
                To provide exceptional citizenship and residency solutions through expert guidance, personalized service, and unwavering commitment to our clients' success in their global migration journey.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800" 
                alt="Founder portrait" 
                className="rounded-3xl shadow-2xl hover-lift smooth-transition" 
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Founder</h2>
              <h3 className="text-2xl font-semibold text-primary mb-4">John Anderson</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                With over 15 years of experience in international law and investment migration, John Anderson founded Raizing Sovereign with a vision to democratize global citizenship opportunities. His expertise spans across multiple jurisdictions and investment programs.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                John holds advanced degrees in International Law and Finance, and has successfully guided over 1,000 families in achieving their citizenship and residency goals worldwide.
              </p>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Founder's Vision</h4>
                <p className="text-gray-600 leading-relaxed">
                  "Our goal is to break down barriers and create pathways for global citizens. Every family deserves the security and opportunities that come with international mobility and second citizenship."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
