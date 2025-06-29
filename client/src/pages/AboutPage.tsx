import { motion } from "framer-motion";
import { Shield, Star, Users, Lightbulb, Eye, Target, MapPin, Download } from "lucide-react";
import founder from "../components/assets/founder.jpg";
import brochure from "../components/assets/All in one Immigration Programs - Raizing Sovereign.pdf";
import ishan from "../components/assets/ishan-doda.png"

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
      address: "Rai House: C-4 Commercial Complex, SDA Market, Safdarjung Development Area, Hauz Khas, New Delhi, Delhi 110016",
      image: "https://res.cloudinary.com/dyyswz13r/image/upload/v1750318150/IMG-20250619-WA0006_nsqusl.jpg",
      mapUrl: "https://maps.google.com/?q=Rai+House+C-4+Commercial+Complex+SDA+Market+Safdarjung+Development+Area+Hauz+Khas+New+Delhi+Delhi+110016"
    },
    {
      city: "Mumbai",
      country: "India",
      address: "206A, 2nd Floor, The Arcadia Building, Vinayak Kumar Shah Marg, NCPA, Nariman Point, Mumbai - 400021",
      image: "https://res.cloudinary.com/dyyswz13r/image/upload/v1750318151/IMG-20250619-WA0011_byqw9z.jpg",
      mapUrl: "https://maps.google.com/?q=206A+2nd+Floor+The+Arcadia+Building+Vinayak+Kumar+Shah+Marg+NCPA+Nariman+Point+Mumbai+400021"
    },
    {
      city: "Bangalore",
      country: "India",
      address: " S-207, 2nd floor, South Block Manipal Centre,47, Dickenson road, Bengaluru - 560042",
      image: "https://res.cloudinary.com/dyyswz13r/image/upload/v1750318151/IMG-20250619-WA0015_nmq84z.jpg",
      mapUrl: "https://maps.app.goo.gl/wy16dgRCXvEieLgMA"
    },
    {
      city: "Bangkok",
      country: "Thailand",
      address: " No.77/28 Sinn Sathorn Tower, 11th Floor, Krung Thon Buri Road, Khlong Ton Sai Sub-district, Khlong San District, Bangkok Metropolis",
      image: "https://res.cloudinary.com/dyyswz13r/image/upload/v1750318150/IMG-20250619-WA0004_urxkfv.jpg",
      mapUrl: "https://maps.app.goo.gl/HSNvZ5AGhA8VuAEH6"
    },
    {
      city: "Colombo",
      country: "Sri Lanka",
      address: " 8/1/2 Old Kesbewa road, Delkanda, Gangodawila, Nugegoda Colombo 10250",
      image: "https://res.cloudinary.com/dyyswz13r/image/upload/v1750318151/IMG-20250619-WA0012_adxwfe.jpg",
      mapUrl: "https://maps.app.goo.gl/gVaRhd4xyoxm8PW2A"
    },
    {
      city: "Dubai",
      country: "UAE",
      address: "HDS Tower Cluster F Office no 3601, Jumeirah Lake Tower, Dubai, UAE",
      image: "https://res.cloudinary.com/dyyswz13r/image/upload/v1750318151/IMG-20250619-WA0009_d2hfvs.jpg",
      mapUrl: "https://maps.app.goo.gl/2FX8jfMHRjs5CrjQA"
    },
    {
      city: "Amman",
      country: "Jordan",
      address: "61, Al-Thawabet Complex, Ground Floor, Baghdad Street UM UTHINA, Parallel to Mecca Street,Next to Jordan Kuwait Bank, Amman Jordan",
      image: "https://res.cloudinary.com/dyyswz13r/image/upload/v1750318150/IMG-20250619-WA0003_dxxped.jpg",
      mapUrl: "https://maps.app.goo.gl/tgqJNBMfDde8ypez8"
    },
    {
      city: "Rabat",
      country: "Morocco",
      address: " Centre commercial Jasmin B15 - 1&3 ANGLE AV SOUSS ET SHOUL. AVIATION RABAT,16815",
      image: "https://res.cloudinary.com/dyyswz13r/image/upload/v1750318151/IMG-20250619-WA0013_sgtyk3.jpg",
      mapUrl: "https://maps.app.goo.gl/Ze7AQuvY1XPpPwi18"
    },
    {
      city: "Cairo",
      country: "Egypt",
      address: "Cairo Business Plaza, Office no 511,Fifth floor, N 90 St, New Cairo 1, Cairo Governorate 4740007 North building",
      image: "https://res.cloudinary.com/dyyswz13r/image/upload/v1750318151/IMG-20250619-WA0008_fbihyw.jpg",
      mapUrl: "https://maps.app.goo.gl/br8sdu35Ux9wjMmq9"
    },
  ];

  const teamMembers = [
    {
      name: "Ms. Alemienla",
      designation: "General Secretary",
      image: "https://uaeccoc.com/wp-content/uploads/2025/03/2-scaled.jpeg",
      introduction:
        "Ms. Alemienla, General Secretary at Raizing Sovereign, oversees global financial operations and client file management with precision and integrity. With expertise in international finance, regulatory compliance, and immigration documentation, she ensures seamless processing and secure handling of client portfolios. Her meticulous approach strengthens Raizing Sovereign’s commitment to transparency, trust, and timely delivery across all global residency and relocation programs.",
    },
    {
      name: "Mr. Aditya Veer Singh Rajawat",
      designation: "Business Head",
      image: "https://uaeccoc.com/wp-content/uploads/2025/03/1-scaled.jpeg",
      introduction:
        "Aditya Veer Singh Rajawat, Business Head of Raizing Sovereign, leads the global immigration and residency vertical of Raizing Global. With royal lineage from Sonbarsa Raj & Fort Barwara, he blends heritage with modern vision to empower individuals through investment migration. He drives high-impact programs across Croatia, UAE, Thailand, and more offering streamlined, client-centric pathways to global mobility, second residency, and transformative international opportunities.",
    },
    {
      name: "Ishan Doda",
      designation: "Immigration Sales Manager",
      image: ishan,
      introduction: "Ishan Doda brings deep expertise in client success, international relocation, and business setup. With a people-first approach, he ensures seamless onboarding, regulatory compliance, and personalized support. At Raizing Sovereign, he focuses on building trust, delivering smooth cross-border experiences, and creating long-term value for global clients through tailored, high-touch service.",
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
      <section className="py-12 bg-gradient-to-b from-[#ffff] to-gray-50">
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

      {/* Meet Our Team */}
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
              Meet Our Team
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Our dedicated team of experts is here to guide you through every step of your global citizenship journey.
            </p>
          </motion.div>

          <div className="space-y-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-6"
              >
                <div className="flex-shrink-0">
                  <img
                    src={member.image}
                    alt={`${member.name} portrait`}
                    className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-lg border border-gray-200 shadow-sm group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-[#183b4e] mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{member.designation}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{member.introduction}</p>
                </div>
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
                className="relative bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <img
                  src={office.image}
                  alt={`${office.city} office`}
                  className="w-full h-40 sm:h-48 lg:h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-base font-semibold text-white">{office.city}</h3>
                  <p className="text-sm text-white/80">{office.country}</p>
                  <p className="text-xs text-white/90 mt-2 mb-3">{office.address}</p>
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#cba135] text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-[#e0c270] transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    View on Map
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Download Brochure Section */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <a
              href={brochure}
              download
              className="relative bg-gradient-to-br from-[#183b4e] to-[#2e5a7a] text-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-4 max-w-md w-full group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#cba135] to-[#e0c270] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Download className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="relative z-10 flex flex-col items-start">
                <h3 className="text-lg sm:text-xl font-semibold mb-1">Download Brochure</h3>
                <p className="text-xs sm:text-sm text-white/90">Get all the details in one place</p>
              </div>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}