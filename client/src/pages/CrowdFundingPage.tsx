import { motion } from "framer-motion";
import { Heart, Network, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import FundraisingCard from "@/components/FundraisingCard";
import { FUNDRAISING_CAMPAIGNS, TOP_CONTRIBUTORS } from "@/lib/constants";

export default function CrowdFundingPage() {
  const benefits = [
    {
      icon: Heart,
      title: "Make a Difference",
      description: "Help families achieve their dreams of global citizenship and better opportunities."
    },
    {
      icon: Network,
      title: "Build Network",
      description: "Connect with like-minded individuals in the global citizenship community."
    },
    {
      icon: Gift,
      title: "Exclusive Perks",
      description: "Receive special benefits and recognition for your contributions to the community."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Crowd Funding</h1>
            <p className="text-xl lg:text-2xl text-purple-100 max-w-4xl mx-auto">
              Support fellow citizens in their migration journey or raise funds for your own citizenship program through our community platform.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Benefits Section */}
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-12 text-center"
            >
              Benefits of Contributing
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Fundraising Profiles */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Active Campaigns</h2>
                <Button className="bg-purple-600 text-white hover:bg-purple-700 smooth-transition">
                  Raise Funds
                </Button>
              </div>
              
              <div className="space-y-8">
                {FUNDRAISING_CAMPAIGNS.map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <FundraisingCard campaign={campaign} />
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Top Contributors */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-gray-900 mb-8"
              >
                Top Contributors
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-lg"
              >
                <div className="space-y-6">
                  {TOP_CONTRIBUTORS.map((contributor, index) => (
                    <div key={contributor.id} className="flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                        index === 0 ? 'gold-gradient text-dark' : 
                        index === 1 ? 'bg-gray-300 text-gray-600' :
                        index === 2 ? 'bg-yellow-600 text-white' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        <span className="font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{contributor.name}</h4>
                        <p className="text-sm text-gray-600">${contributor.amount.toLocaleString()} contributed</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <button className="text-purple-600 font-semibold hover:text-purple-800 smooth-transition">
                    View Full Leaderboard →
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
