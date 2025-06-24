import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { Eye, Mail, Bell, Menu, Calendar, FileText, Edit, Save, X } from 'lucide-react';
import { auth } from '../lib/firebaseConfig';
import { User, updateProfile, updateEmail } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';

interface PersonalInfo {
  fullName: string;
  nickName: string;
  email: string;
  phone: string;
  address: string;
  nationality: string;
  occupation: string;
  designation: string;
  monthlyIncome: string;
  language: string;
  timeZone: string;
  bio: string;
}

interface Document {
  name: string;
  uploadedAt: string;
}

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
}

interface Application {
  id: string;
  title: string;
  status: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [photoURL, setPhotoURL] = useState<string>('');
  const [, setLocation] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    nickName: '',
    email: '',
    phone: '+1234567890',
    address: '123 Luxury Lane, Sovereign City, SC 12345',
    nationality: 'American',
    occupation: 'Financial Consultant',
    designation: 'Senior Advisor',
    monthlyIncome: '$10,000',
    language: 'English',
    timeZone: 'UTC',
    bio: 'Passionate about empowering individuals with AI-driven financial solutions at Raizing Sovereign.',
  });
  const [isAppointmentsModalOpen, setIsAppointmentsModalOpen] = useState(false);
  const [isApplicationsModalOpen, setIsApplicationsModalOpen] = useState(false);
  const appointmentsModalRef = useRef<HTMLDialogElement>(null);
  const applicationsModalRef = useRef<HTMLDialogElement>(null);

  // Mock data for preview
  const documents: { [key: string]: Document } = {
    passport: { name: 'passport.pdf', uploadedAt: '2025-05-01' },
    bankStatement: { name: 'bank_statement.pdf', uploadedAt: '2025-04-15' },
    salarySlips: { name: 'salary_slips.pdf', uploadedAt: '2025-03-20' },
    itr: { name: 'itr_2024.pdf', uploadedAt: '2025-02-10' },
  };

  const appointments: Appointment[] = [
    { id: '1', title: 'Consultation with Advisor', date: '2025-06-25', time: '10:00 AM' },
    { id: '2', title: 'Document Review', date: '2025-06-28', time: '2:00 PM' },
  ];

  const applications: Application[] = [
    { id: '123', title: 'Citizenship Program', status: 'Under Review' },
    { id: '124', title: 'Residency Application', status: 'Pending Documents' },
  ];

  // Check auth state and initialize user data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setPhotoURL(currentUser.photoURL || '');
        setPersonalInfo((prev) => ({
          ...prev,
          fullName: currentUser.displayName || '',
          email: currentUser.email || '',
        }));
      } else {
        setLocation('/login');
      }
    });
    return () => unsubscribe();
  }, [setLocation]);

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isSidebarOpen && !((e.target as HTMLElement).closest('.sidebar'))) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isSidebarOpen]);

  // Handle modal open/close
  useEffect(() => {
    if (isAppointmentsModalOpen) {
      appointmentsModalRef.current?.showModal();
    } else {
      appointmentsModalRef.current?.close();
    }
    if (isApplicationsModalOpen) {
      applicationsModalRef.current?.showModal();
    } else {
      applicationsModalRef.current?.close();
    }
  }, [isAppointmentsModalOpen, isApplicationsModalOpen]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile changes
  const handleSave = async () => {
    if (!user) return;
    try {
      // Update Firebase Auth profile
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: personalInfo.fullName });
        if (personalInfo.email !== user.email) {
          await updateEmail(auth.currentUser, personalInfo.email);
        }
      }
      setIsEditMode(false);
      alert('Profile updated successfully!');
    } catch (error: any) {
      console.error('Error saving profile:', error);
      alert(`Failed to save profile: ${error.message}`);
    }
  };

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
          <h1 className="text-lg md:text-xl font-bold text-[#183b4e] dark:text-white">Welcome, {personalInfo.fullName || 'User'}!</h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-200">{currentDate}</p>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="p-1 md:p-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#cba135] w-32 md:w-48"
          />
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">1</span>
            </button>
            <AnimatePresence>
              {isNotificationOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#183b4e] rounded-lg shadow-lg p-4 z-50"
                >
                  <h4 className="text-sm font-semibold text-[#183b4e] dark:text-white mb-2">Notifications</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-5 h-5 text-[#cba135]" />
                      <div>
                        <p className="text-xs font-medium text-[#183b4e] dark:text-white">Welcome to Raizing Sovereign</p>
                        <p className="text-xs text-gray-600 dark:text-gray-200">Get started with your profile!</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-5 h-5 text-[#cba135]" />
                      <div>
                        <p className="text-xs font-medium text-[#183b4e] dark:text-white">New Message</p>
                        <p className="text-xs text-gray-600 dark:text-gray-200">You have 1 unread message.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Sidebar */}
      <div className="flex">
        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden p-2 text-[#183b4e] dark:text-white fixed top-4 left-4 z-50"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: isSidebarOpen ? 0 : '-100%' }}
          transition={{ duration: 0.3 }}
          className="sidebar fixed md:static top-0 left-0 h-full bg-white dark:bg-[#183b4e] w-64 md:w-64 p-4 flex flex-col space-y-6 z-40 md:z-auto overflow-y-auto"
        >
          {/* Navigation Icons */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            {['🏠', '⚙️', '📊', '💡'].map((icon, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="text-2xl text-gray-600 dark:text-gray-200 cursor-pointer"
              >
                {icon}
              </motion.div>
            ))}
          </div>
          {/* Appointments Section */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-[#183b4e] dark:text-white mb-2">Appointments</h3>
            {appointments.length === 0 ? (
              <p className="text-xs text-gray-600 dark:text-gray-200">No upcoming appointments</p>
            ) : (
              <div className="space-y-2">
                {appointments.map((appt) => (
                  <div key={appt.id} className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[#cba135]" />
                    <div>
                      <p className="text-xs font-medium text-[#183b4e] dark:text-white">{appt.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-200">
                        {appt.date} at {appt.time}
                      </p>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setIsAppointmentsModalOpen(true)}
                  className="mt-2 bg-[#cba135] text-white px-3 py-1 rounded-lg hover:bg-[#b08f2e] transition text-xs"
                  aria-label="View Appointments"
                >
                  View Appointments
                </button>
              </div>
            )}
          </div>
          {/* Track Application Section */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-[#183b4e] dark:text-white mb-2">Track Applications</h3>
            {applications.length === 0 ? (
              <p className="text-xs text-gray-600 dark:text-gray-200">No applications submitted</p>
            ) : (
              <div className="space-y-2">
                {applications.map((app) => (
                  <div key={app.id} className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-[#cba135]" />
                    <div>
                      <p className="text-xs font-medium text-[#183b4e] dark:text-white">{app.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-200">Status: {app.status}</p>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setIsApplicationsModalOpen(true)}
                  className="mt-2 bg-[#cba135] text-white px-3 py-1 rounded-lg hover:bg-[#b08f2e] transition text-xs"
                  aria-label="Track Applications"
                >
                  Track Applications
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 p-4 md:ml-64"
        >
          {/* Profile Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-[#183b4e] rounded-xl shadow-lg p-4 md:p-6 mb-6 flex flex-col md:flex-row justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <img
                src={photoURL || 'https://via.placeholder.com/80'}
                alt="Profile"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-[#cba135]"
              />
              <div>
                <h2 className="text-lg md:text-xl font-bold text-[#183b4e] dark:text-white">{personalInfo.fullName || 'User'}</h2>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-200">{personalInfo.email}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className="mt-4 md:mt-0 bg-[#cba135] text-white px-3 md:px-4 py-2 rounded-lg hover:bg-[#b08f2e] transition text-xs md:text-sm"
              aria-label={isEditMode ? 'Cancel Edit' : 'Edit Profile'}
            >
              {isEditMode ? 'Cancel' : 'Edit'}
            </button>
          </motion.div>

          {/* Personal Information */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-[#183b4e] rounded-xl shadow-lg p-4 md:p-6 mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg md:text-xl font-bold text-[#183b4e] dark:text-white">Personal Information</h3>
              {isEditMode && (
                <button
                  onClick={handleSave}
                  className="bg-[#cba135] text-white px-3 py-1 rounded-lg hover:bg-[#b08f2e] transition text-xs md:text-sm"
                  aria-label="Save Profile"
                >
                  Save
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs md:text-sm font-semibold text-[#183b4e] dark:text-white">Full Name</label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="fullName"
                    value={personalInfo.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1 focus:outline-none focus:ring-2 focus:ring-[#cba135]"
                  />
                ) : (
                  <div className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1">
                    {personalInfo.fullName || 'Not provided'}
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs md:text-sm font-semibold text-[#183b4e] dark:text-white">Nick Name</label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="nickName"
                    value={personalInfo.nickName}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1 focus:outline-none focus:ring-2 focus:ring-[#cba135]"
                  />
                ) : (
                  <div className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1">
                    {personalInfo.nickName || 'Not provided'}
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs md:text-sm font-semibold text-[#183b4e] dark:text-white">Email</label>
                {isEditMode ? (
                  <input
                    type="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1 focus:outline-none focus:ring-2 focus:ring-[#cba135]"
                  />
                ) : (
                  <div className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1">
                    {personalInfo.email || 'Not provided'}
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs md:text-sm font-semibold text-[#183b4e] dark:text-white">Phone</label>
                {isEditMode ? (
                  <input
                    type="tel"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1 focus:outline-none focus:ring-2 focus:ring-[#cba135]"
                  />
                ) : (
                  <div className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1">
                    {personalInfo.phone || 'Not provided'}
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs md:text-sm font-semibold text-[#183b4e] dark:text-white">Address</label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="address"
                    value={personalInfo.address}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1 focus:outline-none focus:ring-2 focus:ring-[#cba135]"
                  />
                ) : (
                  <div className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1">
                    {personalInfo.address || 'Not provided'}
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs md:text-sm font-semibold text-[#183b4e] dark:text-white">Nationality</label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="nationality"
                    value={personalInfo.nationality}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1 focus:outline-none focus:ring-2 focus:ring-[#cba135]"
                  />
                ) : (
                  <div className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1">
                    {personalInfo.nationality || 'Not provided'}
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs md:text-sm font-semibold text-[#183b4e] dark:text-white">Occupation</label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="occupation"
                    value={personalInfo.occupation}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1 focus:outline-none focus:ring-2 focus:ring-[#cba135]"
                  />
                ) : (
                  <div className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1">
                    {personalInfo.occupation || 'Not provided'}
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs md:text-sm font-semibold text-[#183b4e] dark:text-white">Designation</label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="designation"
                    value={personalInfo.designation}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1 focus:outline-none focus:ring-2 focus:ring-[#cba135]"
                  />
                ) : (
                  <div className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1">
                    {personalInfo.designation || 'Not provided'}
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs md:text-sm font-semibold text-[#183b4e] dark:text-white">Monthly Income</label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="monthlyIncome"
                    value={personalInfo.monthlyIncome}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1 focus:outline-none focus:ring-2 focus:ring-[#cba135]"
                  />
                ) : (
                  <div className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1">
                    {personalInfo.monthlyIncome || 'Not provided'}
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs md:text-sm font-semibold text-[#183b4e] dark:text-white">Language</label>
                {isEditMode ? (
                  <select
                    name="language"
                    value={personalInfo.language}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1 focus:outline-none focus:ring-2 focus:ring-[#cba135]"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                ) : (
                  <div className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1">
                    {personalInfo.language}
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs md:text-sm font-semibold text-[#183b4e] dark:text-white">Time Zone</label>
                {isEditMode ? (
                  <select
                    name="timeZone"
                    value={personalInfo.timeZone}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1 focus:outline-none focus:ring-2 focus:ring-[#cba135]"
                  >
                    <option value="UTC">UTC</option>
                    <option value="GMT">GMT</option>
                    <option value="EST">EST</option>
                  </select>
                ) : (
                  <div className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1">
                    {personalInfo.timeZone}
                  </div>
                )}
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="text-xs md:text-sm font-semibold text-[#183b4e] dark:text-white">Bio</label>
                {isEditMode ? (
                  <textarea
                    name="bio"
                    value={personalInfo.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1 focus:outline-none focus:ring-2 focus:ring-[#cba135]"
                  />
                ) : (
                  <div className="w-full px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 mt-1">
                    {personalInfo.bio || 'Not provided'}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Documents Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-[#183b4e] rounded-xl shadow-lg p-4 md:p-6"
          >
            <h3 className="text-lg md:text-xl font-bold text-[#183b4e] dark:text-white mb-4">Documents</h3>
            <div className="space-y-4">
              {[
                { label: 'Passport', key: 'passport' },
                { label: 'Last 6 Months Bank Statement', key: 'bankStatement' },
                { label: 'Last 4 Months Salary Slips', key: 'salarySlips' },
                { label: 'Last Year ITR', key: 'itr' },
              ].map((doc) => (
                <div key={doc.key} className="flex items-center justify-between border-b border-gray-300 dark:border-gray-600 pb-2">
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-[#183b4e] dark:text-white">{doc.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {documents[doc.key]?.name} (Uploaded: {new Date(documents[doc.key]?.uploadedAt).toLocaleDateString()})
                    </p>
                  </div>
                  <button
                    className="text-[#cba135] hover:text-[#b08f2e] transition"
                    aria-label={`View ${doc.label}`}
                    disabled
                  >
                    <Eye className="w-4 md:w-5 h-4 md:h-5" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Appointments Modal */}
        <dialog ref={appointmentsModalRef} className="w-full max-w-sm md:max-w-md bg-white dark:bg-[#183b4e] rounded-lg p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm md:text-lg font-bold text-[#183b4e] dark:text-white">View Appointments</h4>
            <button
              onClick={() => setIsAppointmentsModalOpen(false)}
              className="text-gray-500 dark:text-gray-200 hover:text-[#cba135]"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs md:text-sm text-[#183b4e] dark:text-white">Appointments page coming soon!</p>
        </dialog>

        {/* Applications Modal */}
        <dialog ref={applicationsModalRef} className="w-full max-w-sm md:max-w-md bg-white dark:bg-[#183b4e] rounded-lg p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm md:text-lg font-bold text-[#183b4e] dark:text-white">Track Applications</h4>
            <button
              onClick={() => setIsApplicationsModalOpen(false)}
              className="text-gray-500 dark:text-gray-200 hover:text-[#cba135]"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs md:text-sm text-[#183b4e] dark:text-white">Applications page coming soon!</p>
        </dialog>
      </div>
    </div>
  );
};

export default ProfilePage;