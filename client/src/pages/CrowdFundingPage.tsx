import { motion } from "framer-motion";
import { Heart, Network, Gift } from "lucide-react";
import FundraisingCard from "@/components/FundraisingCard";

const FUNDRAISING_CAMPAIGNS = [
  {
    id: "1",
    name: "Family Visa Fund",
    program: "Global Citizenship",
    story: "Support a family in their journey to secure a visa for a better future abroad.",
    currentAmount: 3200,
    targetAmount: 5000,
    currency: "USD",
    daysLeft: 15,
  },
  {
    id: "2",
    name: "Education Abroad",
    program: "Student Visa",
    story: "Help a student fund their education abroad for a brighter career.",
    currentAmount: 7500,
    targetAmount: 10000,
    currency: "USD",
    daysLeft: 10,
  },
  {
    id: "3",
    name: "New Beginnings Fund",
    program: "Residency Program",
    story: "Assist a couple in starting a new life through a residency program.",
    currentAmount: 4500,
    targetAmount: 8000,
    currency: "EUR",
    daysLeft: 20,
  },
  {
    id: "4",
    name: "Entrepreneur Visa Support",
    program: "Business Visa",
    story: "Fund an entrepreneur's visa to launch a startup in a new country.",
    currentAmount: 6000,
    targetAmount: 12000,
    currency: "USD",
    daysLeft: 12,
  },
  {
    id: "5",
    name: "Refugee Relocation Aid",
    program: "Humanitarian Visa",
    story: "Help a refugee family relocate safely with proper documentation.",
    currentAmount: 2800,
    targetAmount: 7000,
    currency: "EUR",
    daysLeft: 18,
  },
  {
    id: "6",
    name: "Citizenship Dream",
    program: "Citizenship by Investment",
    story: "Support an individual in achieving citizenship through investment.",
    currentAmount: 9000,
    targetAmount: 15000,
    currency: "USD",
    daysLeft: 8,
  },
];

const TOP_CONTRIBUTORS = [
  { id: "1", name: "John Doe", amount: 5000 },
  { id: "2", name: "Jane Smith", amount: 3000 },
  { id: "3", name: "Alex Brown", amount: 1500 },
  { id: "4", name: "Emily Davis", amount: 2000 },
  { id: "5", name: "Michael Lee", amount: 1000 },
];

const COMPLETED_PROFILES = [
  { id: "1", name: "Sarah Wilson", amount: 6000, image: "https://via.placeholder.com/40?text=SW" },
  { id: "2", name: "Michael Chen", amount: 8000, image: "https://via.placeholder.com/40?text=MC" },
];

export default function CrowdFundingPage() {
  const benefits = [
    {
      icon: Heart,
      title: "Make a Difference",
      description: "Empower families to achieve global citizenship.",
    },
    {
      icon: Network,
      title: "Build Connections",
      description: "Join a global community of supporters.",
    },
    {
      icon: Gift,
      title: "Earn Rewards",
      description: "Unlock exclusive perks for your contributions.",
    },
  ];

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-['Inter',sans-serif] pb-20 sm:pb-0">
      {/* Hero Section */}
      <section className="py-12  text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-[#cba135] mb-4">Crowd Funding</h1>
            <p className="text-sm sm:text-base text-black max-w-md mx-auto">
              Fund migration journeys or support your citizenship goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-[#183b4e] mb-6 text-center">
              Why Contribute?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-xl shadow-sm text-center"
                  >
                    <div className="w-12 h-12 bg-[#183b4e] rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-[#183b4e] mb-2">{benefit.title}</h3>
                    <p className="text-xs text-gray-600">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Fundraising Profiles */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center justify-between mb-6"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[#183b4e]">
                  Active Campaigns
                </h2>
                <button className="bg-[#cba135] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#b08f2e] transition">
                  Raise Funds
                </button>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {FUNDRAISING_CAMPAIGNS.map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <FundraisingCard campaign={campaign} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar: Top Contributors and Completed Profiles */}
            <div className="space-y-6 lg:col-span-1">
              {/* Top Contributors */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="mb-4">
                  <p className="text-sm font-bold text-[#183b4e] flex items-center">
                    <span className="inline-block bg-[#cba135] text-white text-xs px-2 py-1 rounded-full mr-2">
                      Total
                    </span>
                    Raizing Sovereign Contribution Over $100,000
                  </p>
                </div>
                <h3 className="text-sm font-bold text-[#183b4e] mb-4">Top Contributors</h3>
                <div className="space-y-4">
                  {TOP_CONTRIBUTORS.map((contributor, index) => (
                    <div key={contributor.id} className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          index === 0
                            ? "bg-[#cba135] text-white"
                            : index === 1
                            ? "bg-gray-300 text-gray-600"
                            : "bg-[#183b4e] text-white"
                        }`}
                      >
                        <span className="font-bold text-xs">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-[#183b4e]">{contributor.name}</h4>
                        <p className="text-xs text-gray-600">${contributor.amount.toLocaleString()} contributed</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-[#183b4e] font-semibold text-xs hover:text-[#cba135] transition">
                    View Full Leaderboard →
                  </button>
                </div>
              </motion.div>

              {/* Completed Profiles */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-sm font-bold text-[#183b4e] mb-4">Completed Profiles</h3>
                <div className="space-y-4">
                  {COMPLETED_PROFILES.map((profile, index) => (
                    <div key={profile.id} className="flex items-center">
                      <img
                        src={profile.image}
                        alt={profile.name}
                        className="w-8 h-8 rounded-full object-cover mr-3"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-[#183b4e]">{profile.name}</h4>
                        <p className="text-xs text-gray-600">Raised ${profile.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-[#183b4e] font-semibold text-xs hover:text-[#cba135] transition">
                    View All Profiles →
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Footer for Mobile */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#ffff] text-white p-4 flex justify-between items-center sm:hidden z-50">
        <button className="bg-[#] text-black text-sm text-left font-semibold px-6 py-2 rounded-[10px]  transition">
          Help someone to reach thier goals
        </button>
        <button className="bg-[#cba135] text-white text-sm font-semibold px-6 py-2 rounded-[10px] hover:bg-[#b08f2e] transition">
          Raise Funds
        </button>
      </footer>
    </div>
  );
}