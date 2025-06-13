// AboutPage.tsx

import { motion } from "framer-motion";
import { Shield, Star, Users, Lightbulb, Eye, Target, MapPin, Download } from "lucide-react";
import founder from "../components/assets/founder.jpg";

export default function AboutPage() {
  const coreValues = [
    {
      icon: Shield,
      title: "Integrity",
      description: "We uphold the highest ethical standards, ensuring transparency and honesty in every client relationship.",
    },
    {
      icon: Star,
      title: "Excellence",
      description: "We deliver exceptional service, always aiming to exceed expectations with every interaction.",
    },
    {
      icon: Users,
      title: "Client Focus",
      description: "Your goals and needs drive our tailored solutions, putting you at the heart of what we do.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We evolve with the global immigration landscape, offering cutting-edge solutions.",
    },
  ];

  const stats = [
    {
      value: "100%",
      title: "Success Rate",
      description: "Our applications have a perfect approval rate, surpassing industry standards.",
    },
    {
      value: "10M+",
      title: "Successful Cases",
      description: "Helped over 10M families achieve global mobility in 20 years.",
    },
    {
      value: "20+",
      title: "Programs Offered",
      description: "Access to 20+ carefully curated citizenship and residency programs.",
    },
  ];

  const offices = [
    {
      city: "Delhi",
      country: "India",
      address: "1234 Global Avenue, Suite 500, New York, NY 10001",
      image: "https://www.sushanttravels.com/uploads/L9Tj9il_PARLIAMENT_HOUSE_2.jpg",
    },
    {
      city: "Mumbai",
      country: "India",
      address: "45 Sovereign House, Westminster, London SW1A 0AA",
      image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/10/6f/01/5a.jpg",
    },
    {
      city: "Bangalore",
      country: "India",
      address: "Burj Plaza, Level 12, Downtown Dubai, UAE",
      image: "https://assets.cntraveller.in/photos/676a8f99a1d60d7dc882fb3a/16:9/w_1280,c_limit/GettyImages-1252711506.jpg",
    },
    {
      city: "Bangkok",
      country: "Thailand",
      address: "Marina Bay Financial Centre, Tower 3, Singapore 018982",
      image: "https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/3067/Marble-Temple.jpg",
    },
        {
      city: "Colombo",
      country: "Sri Lanka",
      address: "Marina Bay Financial Centre, Tower 3, Singapore 018982",
      image: "https://theportuguesetraveler.com/wp-content/uploads/2024/11/lotus-tower-colombo-sri-lanka-11.jpg.webp",
    },

            {
      city: "Dubai",
      country: "UAE",
      address: "Marina Bay Financial Centre, Tower 3, Singapore 018982",
      image: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },

                {
      city: "Amman,",
      country: "Jordan",
      address: "Marina Bay Financial Centre, Tower 3, Singapore 018982",
      image: "https://jordaniaexclusiva.com/wp-content/uploads/2023/03/destino-amman.jpg",
    },

                    {
      city: "Rabat,",
      country: "Morocco",
      address: "Marina Bay Financial Centre, Tower 3, Singapore 018982",
      image: "https://www.airpano.ru/files/rabat-morocco/images/image3.jpg",
    },

                    {
      city: "Cairo",
      country: "Egypt",
      address: "Marina Bay Financial Centre, Tower 3, Singapore 018982",
      image: "https://media.assettype.com/outlooktraveller%2F2024-08-09%2Ft1ef29hy%2Fshutterstock_2028526520.jpg",
    },
  ];

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
    hover: { scale: 1.03, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)" },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-[#f8f4ea] to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#cba135] mb-4">
              About Raizing Sovereign
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#183b4e] max-w-3xl mx-auto">
              Your trusted partner in global citizenship and residency solutions, offering expert guidance worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                At Raizing Sovereign, we empower executives, entrepreneurs, and high-net-worth families to secure second citizenship or residency through trusted global investment programs. Headquartered in Dubai with a presence in 19+ countries, we offer end-to-end services including immigration consultancy, global real estate, company formation, and recruitment solutions. With 20+ years of expertise in diplomacy, travel, and compliance with UNGC standards, we deliver secure, sustainable, and personalized pathways to global citizenship.
              </p>
            </motion.div>
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://raizingsovereign.com/wp-content/uploads/2025/04/Our-uSP.jpg"
                  alt="Modern office workspace"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#cba135] to-[#e0c270] rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 sm:py-16 bg-[#f8f4ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#cba135] to-[#e0c270] text-white p-8 rounded-2xl shadow-lg"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-4">Our Vision</h3>
              <p className="text-sm text-white/90 leading-relaxed">
                We strive to be the world’s leading investment migration solutions provider, renowned for integrity, expertise, and a client-first approach. We envision a future where global citizens can choose residency or citizenship based on their personal goals, lifestyle, and investment aspirations—empowering them to thrive without borders.
              </p>
            </motion.div>

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#183b4e] to-[#2e5a7a] text-white p-8 rounded-2xl shadow-lg"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-4">Our Mission</h3>
              <p className="text-sm text-white/90 leading-relaxed">
                Our mission is to deliver exceptional citizenship and residency solutions through personalized guidance, ethical practices, and expertise in global mobility programs. We empower high-net-worth individuals and families with opportunities to secure their future, enhance global access, and achieve financial and lifestyle freedom.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-lg font-semibold text-[#cba135] text-center">
                Founder's Profile
              </h3>
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={founder}
                  alt="Founder portrait"
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                <h4 className="text-base font-semibold text-gray-900 mb-2">
                  Founder's Mission
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Mr. Rai’s mission is to redefine accessibility in the immigration sphere, transforming aspirations into genuine opportunities. His visionary approach ensures clients embark on their international journeys with confidence, reflecting the highest standards of innovation and personalized guidance.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h3 className="text-lg font-semibold text-[#183b4e] mb-4">
                Mr. Bharat S. Rai
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Mr. Bharat S. Rai, the founder of Raizing Sovereign, brings over 20 years of experience in the immigration and global mobility sector. His expertise in international residency, citizenship, and relocation has redefined immigration services. Under his leadership, Raizing Sovereign has become a trusted name, known for its global reach, integrity, and seamless transitions. Mr. Rai has introduced innovative programs in Croatia, Mexico, Thailand, and Panama, showcasing his deep understanding of immigration complexities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Where We Stand in the Market */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3">
              Where We Stand in the Market
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Raizing Sovereign is a premier global investment migration consultancy, distinguished by our comprehensive approach and expertise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center"
              >
                <h3 className="text-2xl font-bold text-[#183b4e] mb-2">{stat.value}</h3>
                <h4 className="text-base font-semibold text-gray-900 mb-2">{stat.title}</h4>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Global Offices */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3">
              Our Offices
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Strategically located offices worldwide, providing localized expertise with a global perspective.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="relative bg-white rounded-xl shadow-sm overflow-hidden group"
              >
                <img
                  src={office.image}
                  alt={`${office.city} office`}
                  className="w-full h-40 sm:h-48 lg:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-base font-semibold text-white">{office.city}</h3>
                  <p className="text-sm text-white/80">{office.country}</p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 opacity-0 group-hover:opacity-100"
                  >
                    <p className="text-xs text-white/90 mb-2">{office.address}</p>
                    <button className="flex items-center gap-2 bg-[#cba135] text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-[#e0c270] transition-colors">
                      <MapPin className="w-4 h-4" />
                      View on Map
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <a
              href="/path-to-brochure.pdf"
              download
              className="inline-flex items-center gap-2 bg-[#183b4e] text-white px-4 py-2 rounded-full hover:bg-[#cba135] transition-colors duration-300 text-sm font-semibold"
            >
              <Download className="w-4 h-4" />
              Download Our Brochure
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}