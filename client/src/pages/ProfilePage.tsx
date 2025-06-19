import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Eye, Menu } from 'lucide-react';
import { auth } from '@/lib/firebaseConfig';
import { User as FirebaseUser } from 'firebase/auth';
import { motion } from 'framer-motion';

interface PersonalInfo {
  email: string;
  phone: string;
  address: string;
  nationality: string;
  occupation: string;
  designation: string;
  monthlyIncome: string;
  bio: string;
}

interface Document {
  name: string;
  uploadedAt: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [photoURL, setPhotoURL] = useState<string>('');
  const [, setLocation] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock data for preview
  const personalInfo: PersonalInfo = {
    email: user?.email || 'john.doe@example.com',
    phone: user?.phoneNumber || '+1234567890',
    address: '123 Luxury Lane, Sovereign City, SC 12345',
    nationality: 'American',
    occupation: 'Financial Consultant',
    designation: 'Senior Advisor',
    monthlyIncome: '$10,000',
    bio: 'Passionate about empowering individuals with AI-driven financial solutions at Raizing Sovereign.',
  };

  const documents: { [key: string]: Document } = {
    passport: { name: 'passport.pdf', uploadedAt: '2025-05-01' },
    bankStatement: { name: 'bank_statement.pdf', uploadedAt: '2025-04-15' },
    salarySlips: { name: 'salary_slips.pdf', uploadedAt: '2025-03-20' },
    itr: { name: 'itr_2024.pdf', uploadedAt: '2025-02-10' },
  };

  // Check auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setPhotoURL(currentUser.photoURL || '');
      } else {
        setLocation('/login');
      }
    });
    return () => unsubscribe();
  }, [setLocation]);

  if (!user) return null;

  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] to-[#E0E7FF] dark:from-[#183b4e] dark:to-[#0f2430] font-['Inter', sans-serif] pt-4">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#E0E7FF] to-[#F9FAFB] dark:from-[#183b4e] dark:to-[#0f2430] p-4 flex justify-between items-center rounded-b-lg shadow-md"
      >
        <div>
          <h1 className="text-xl font-bold text-[#183b4e] dark:text-white">Welcome, {user.displayName || 'User'}!</h1>
          <p className="text-sm text-gray-600 dark:text-gray-200">{currentDate}</p>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="p-2 text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#cba135]"
          />
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-gray-600 dark:text-gray-300">🔔</span>
          </div>
        </div>
      </motion.div>

      {/* Sidebar */}
      <div className="flex">
        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden p-2 text-[#183b4e] dark:text-white fixed top-4 left-4 z-50"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: isSidebarOpen ? 0 : '-100%' }}
          transition={{ duration: 0.3 }}
          className="fixed md:static top-0 left-0 h-full bg-white dark:bg-[#183b4e] w-16 md:w-20 p-4 flex flex-col items-center space-y-6 z-40 md:z-auto"
        >
          {['🏠', '⚙️', '📊', '💡'].map((icon, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="text-2xl text-gray-600 dark:text-gray-200 cursor-pointer"
            >
              {icon}
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 p-4 md:ml-20"
        >
          {/* Profile Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-[#183b4e] rounded-xl shadow-lg p-6 mb-6 flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <img
                src={photoURL || 'https://via.placeholder.com/80'}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-[#cba135]"
              />
              <div>
                <h2 className="text-xl font-bold text-[#183b4e] dark:text-white">{user.displayName || 'User'}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-200">{personalInfo.email}</p>
              </div>
            </div>
            <button className="bg-[#cba135] text-white px-4 py-2 rounded-lg hover:bg-[#b08f2e] transition">
              Edit
            </button>
          </motion.div>

          {/* Personal Information */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-[#183b4e] rounded-xl shadow-lg p-6 mb-6"
          >
            <h3 className="text-xl font-bold text-[#183b4e] dark:text-white mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-[#183b4e] dark:text-white">Full Name</label>
                <input
                  type="text"
                  value={user.displayName || 'Your First Name'}
                  readOnly
                  className="w-full px-4 py-2 text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#183b4e] dark:text-white">Nick Name</label>
                <input
                  type="text"
                  value="Your First Name"
                  readOnly
                  className="w-full px-4 py-2 text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#183b4e] dark:text-white">Gender</label>
                <select
                  className="w-full px-4 py-2 text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1"
                  disabled
                >
                  <option>Your First Name</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-[#183b4e] dark:text-white">Country</label>
                <select
                  className="w-full px-4 py-2 text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1"
                  disabled
                >
                  <option>Your First Name</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-[#183b4e] dark:text-white">Language</label>
                <select
                  className="w-full px-4 py-2 text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1"
                  disabled
                >
                  <option>Your First Name</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-[#183b4e] dark:text-white">Time Zone</label>
                <select
                  className="w-full px-4 py-2 text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1"
                  disabled
                >
                  <option>Your First Name</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-semibold text-[#183b4e] dark:text-white">My email Address</label>
                <div className="flex items-center w-full px-4 py-2 text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1">
                  <span>{personalInfo.email}</span>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">1 month ago</span>
                </div>
                <button className="mt-2 text-[#cba135] hover:text-[#b08f2e] transition">+ Add Email Address</button>
              </div>
            </div>
          </motion.div>

          {/* Documents */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-[#183b4e] rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-[#183b4e] dark:text-white mb-4">Documents</h3>
            <div className="space-y-4">
              {[
                { label: 'Passport', key: 'passport' },
                { label: 'Last 6 Months Bank Statement', key: 'bankStatement' },
                { label: 'Last 4 Months Salary Slips', key: 'salarySlips' },
                { label: 'Last Year ITR', key: 'itr' },
              ].map(({ label, key }) => (
                <div key={key} className="flex items-center justify-between border-b border-gray-300 dark:border-gray-600 py-2">
                  <div>
                    <p className="text-sm font-semibold text-[#183b4e] dark:text-white">{label}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-200">
                      {documents[key]?.name} (Uploaded: {new Date(documents[key]?.uploadedAt).toLocaleDateString()})
                    </p>
                  </div>
                  <button
                    className="text-[#cba135] hover:text-[#b08f2e] transition"
                    aria-label={`View ${label}`}
                    disabled
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;