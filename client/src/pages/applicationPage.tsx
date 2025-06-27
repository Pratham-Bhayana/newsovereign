import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, ChevronLeft, Camera, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Lottie from "lottie-react";
import { auth } from "@/lib/firebaseConfig";
import { updateProfile } from "firebase/auth";
import { PROGRAMS } from "@/lib/constants";
import WebcamCapture from "./WebcamCapture";
import exampleProfilePdf from "@/components/assets/EXAMPLE.pdf"; // <-- Import your example PDF

// Import animation JSON files
import animationStep1 from "./animations/ani-one.json";
import animationStep2 from "./animations/ani-two.json";
import animationStep3 from "./animations/ani-three.json";
import animationStep4 from "./animations/ani-four.json";
import animationStep5 from "./animations/ani-five.json";
import animationStep6 from "./animations/ani-six.json";

const animationFiles: Record<number, any> = {
  1: animationStep1,
  2: animationStep2,
  3: animationStep3,
  4: animationStep4,
  5: animationStep5,
  6: animationStep6,
};

interface FormData {
  firstName: string;
  lastName: string;
  mobileNumber: string; // <-- Add this line
  occupation: string;
  companyName: string;
  designation: string;
  companyWebsite: string;
  selectedProgram: string;
  intentToApply: string;
  passportPhoto: File | null;
  passportNumber: string;
  passportFront: File | null;
  passportBack: File | null;
  bankStatement: File | null;
  salarySlips: File | null;
  monthlyIncome: string;
  itr: File | null;
  profileDocument: File | null;
}

interface ApplicationPageProps {
  isOpen: boolean;
  onClose: () => void;
  programId: string;
}

const reassuranceMessages: string[] = [
  "We require your documents to start your application.",
  "Let’s start with your basic details.",
  "Tell us about your professional background.",
  "Choose the program that aligns with your goals.",
  "Your privacy is our priority. <a href='/privacy' class='underline text-[#4B5EAA]'>Read our policy</a>.",
  "Securely upload your financial documents.",
  "Upload your 300-word profile document.",
  "Review and submit your application.",
];

const intentOptions: string[] = [
  "Investment",
  "Residency",
  "Citizenship",
  "Business Expansion",
  "Family Relocation",
];

const incomeRanges: string[] = [
  "< $2,000",
  "$2,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $20,000",
  "> $20,000",
];

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

export default function ApplicationPage({ isOpen, onClose, programId }: ApplicationPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    mobileNumber: "", // <-- Add this line
    occupation: "",
    companyName: "",
    designation: "",
    companyWebsite: "",
    selectedProgram: programId,
    intentToApply: "",
    passportPhoto: null,
    passportNumber: "",
    passportFront: null,
    passportBack: null,
    bankStatement: null,
    salarySlips: null,
    monthlyIncome: "",
    itr: null,
    profileDocument: null,
  });
  const [animationData, setAnimationData] = useState<any>(null);
  const [animationLoading, setAnimationLoading] = useState(false);
  const [animationError, setAnimationError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [showWebcam, setShowWebcam] = useState(false);

  // Authentication
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || user.email?.split("@")[0] || "User");
      }
    });
    return () => unsubscribe();
  }, []);

  // Load animation
  useEffect(() => {
    if (currentStep === 7 || currentStep === 8) {
      setAnimationData(null);
      setAnimationLoading(false);
      return;
    }
    setAnimationLoading(true);
    setAnimationError(null);
    const data = animationFiles[currentStep];
    if (data) {
      setAnimationData(data);
      setAnimationLoading(false);
    } else {
      setAnimationData(null);
      setAnimationLoading(false);
      setAnimationError("No animation for this step");
    }
  }, [currentStep]);

  // Update profile on submission
  const updateProfileOnSubmit = async () => {
    if (auth.currentUser && formData.passportPhoto) {
      const photoURL = formData.passportPhoto ? URL.createObjectURL(formData.passportPhoto) : undefined;
      await updateProfile(auth.currentUser, { displayName: `${formData.firstName} ${formData.lastName}`, photoURL });
      setPersonalInfoInProfile({
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: auth.currentUser.email || "",
        phone: "",
        address: "",
        nationality: "",
        occupation: formData.occupation,
        designation: formData.designation,
        monthlyIncome: formData.monthlyIncome,
        language: "",
        timeZone: "",
        bio: "",
        nickName: "",
      });
    }
  };

  // Mock function to sync with ProfilePage (replace with actual storage logic)
  const setPersonalInfoInProfile = (info: any) => {
    // This would typically update a global state or database
    console.log("Profile updated with:", info);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleFileRemove = (field: keyof FormData) => {
    setFormData((prev) => ({ ...prev, [field]: null }));
  };

  const handleWebcamCapture = (file: File) => {
    setFormData((prev) => ({ ...prev, passportPhoto: file }));
    setShowWebcam(false);
  };

  const handleSelectChange = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    } else {
      updateProfileOnSubmit();
      console.log("Submitting application:", formData);
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        window.location.href = "/profile";
      }, 3000);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setFormData((prev) => ({
      ...prev,
      ...(currentStep === 5 ? { passportPhoto: null, passportFront: null, passportBack: null } : {}),
      ...(currentStep === 6 ? { bankStatement: null, salarySlips: null, monthlyIncome: "" } : {}),
      ...(currentStep === 7 ? { profileDocument: null } : {}),
    }));
    handleNextStep();
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step);
  };

  const isNextDisabled = () => {
    if (currentStep === 1) return true;
    if (currentStep === 2) return !formData.firstName || !formData.lastName;
    if (currentStep === 3) return !formData.occupation || !formData.companyName || !formData.designation || !formData.companyWebsite;
    if (currentStep === 4) return !formData.selectedProgram || !formData.intentToApply;
    if (currentStep === 5) return !formData.passportPhoto || !formData.passportNumber || !formData.passportFront || !formData.passportBack;
    if (currentStep === 6) return !formData.bankStatement || !formData.salarySlips || !formData.monthlyIncome || !formData.itr;
    if (currentStep === 7) return !formData.profileDocument;
    return false;
  };

  const renderStep = () => {
    if (isSubmitted) {
      return (
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="text-left space-y-6 p-6 bg-gray-100">
          <span className="text-2xl font-semibold text-[#4B5EAA]">
            Application Submitted!<br />
            You will receive an email confirmation shortly. Track your application in the{" "}
            <a href="/profile" className="underline">
              Profile section
            </a>.
          </span>
        </motion.div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6 text-left p-6">
            <span className="text-xl flex font-semibold">
              Welcome {userName},<br />
              We require your documents to start <br /> your application.
            </span>
            <div
              onClick={() => setCurrentStep(2)}
              className="mt-6 px-6 py-3 w-64 rounded-xl bg-[#4B5EAA] text-white text-center cursor-pointer"
            >
              Get Started
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-8 p-6 w-full">
            <span className="text-xl font-semibold">Personal Information</span>
            <Input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-lg px-6 py-4"
              required
            />
            <Input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-lg px-6 py-4"
              required
            />
            <Input
              name="mobileNumber"
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-lg px-6 py-4"
              required
            />
          </motion.div>
        );
      case 3:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-8 p-6 w-full">
            <span className="text-xl font-semibold">Working Details</span>
            <Input
              name="occupation"
              placeholder="Occupation"
              value={formData.occupation}
              onChange={handleInputChange}
              className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-lg px-6 py-4"
              required
            />
            <Input
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleInputChange}
              className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-lg px-6 py-4"
              required
            />
            <Input
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-lg px-6 py-4"
              required
            />
            <Input
              name="companyWebsite"
              placeholder="Company's Website"
              value={formData.companyWebsite}
              onChange={handleInputChange}
              className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-lg px-6 py-4"
              required
            />
          </motion.div>
        );
      case 4:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-8 p-6 w-full">
            <span className="text-xl font-semibold">Program Selection</span>
            <Select
              value={formData.selectedProgram}
              onValueChange={handleSelectChange("selectedProgram")}
            >
              <SelectTrigger className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-lg px-6 py-4">
                <SelectValue placeholder="Select Program" />
              </SelectTrigger>
              <SelectContent>
                {PROGRAMS.map((program) => (
                  <SelectItem key={program.id} value={program.id}>
                    {program.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={formData.intentToApply}
              onValueChange={handleSelectChange("intentToApply")}
            >
              <SelectTrigger className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-lg px-6 py-4">
                <SelectValue placeholder="Intent to Apply" />
              </SelectTrigger>
              <SelectContent>
                {intentOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        );
      case 5:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-8 p-6 w-full">
            {showWebcam ? (
              <WebcamCapture
                onCapture={handleWebcamCapture}
                onClose={() => setShowWebcam(false)}
              />
            ) : (
              <>
                <span className="text-xl font-semibold">Passport Details</span>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                    <span className="text-sm text-gray-800">Passport Photo <span className="text-red-500">*</span></span>
                    <div className="flex space-x-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "passportPhoto")}
                        className="hidden"
                        id="passportPhoto"
                        required
                      />
                      <label htmlFor="passportPhoto" className="cursor-pointer text-[#4B5EAA]">
                        <Upload className="h-6 w-6" />
                      </label>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-10 w-10"
                        onClick={() => setShowWebcam(true)}
                      >
                        <Camera className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  {formData.passportPhoto && (
                    <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                      <span className="text-sm text-gray-800">{formData.passportPhoto.name}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                        onClick={() => handleFileRemove("passportPhoto")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <Input
                  name="passportNumber"
                  placeholder="Passport Number"
                  value={formData.passportNumber}
                  onChange={handleInputChange}
                  className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-lg px-6 py-4"
                  required
                />
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                    <span className="text-sm text-gray-800">Passport Front <span className="text-red-500">*</span></span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "passportFront")}
                      className="hidden"
                      id="passportFront"
                      required
                    />
                    <label htmlFor="passportFront" className="cursor-pointer text-[#4B5EAA]">
                      <Upload className="h-6 w-6" />
                    </label>
                  </div>
                  {formData.passportFront && (
                    <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                      <span className="text-sm text-gray-800">{formData.passportFront.name}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                        onClick={() => handleFileRemove("passportFront")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                    <span className="text-sm text-gray-800">Passport Back <span className="text-red-500">*</span></span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "passportBack")}
                      className="hidden"
                      id="passportBack"
                      required
                    />
                    <label htmlFor="passportBack" className="cursor-pointer text-[#4B5EAA]">
                      <Upload className="h-6 w-6" />
                    </label>
                  </div>
                  {formData.passportBack && (
                    <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                      <span className="text-sm text-gray-800">{formData.passportBack.name}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                        onClick={() => handleFileRemove("passportBack")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        );
      case 6:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-8 p-6 w-full">
            <span className="text-xl font-semibold">Financial Details</span>
            <Select
              value={formData.monthlyIncome}
              onValueChange={handleSelectChange("monthlyIncome")}
            >
              <SelectTrigger className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-lg px-6 py-4">
                <SelectValue placeholder="Monthly Income Range" />
              </SelectTrigger>
              <SelectContent>
                {incomeRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                <span className="text-sm text-gray-800">6-Month Bank Statement <span className="text-red-500">*</span></span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, "bankStatement")}
                  className="hidden"
                  id="bankStatement"
                  required
                />
                <label htmlFor="bankStatement" className="cursor-pointer text-[#4B5EAA]">
                  <Upload className="h-6 w-6" />
                </label>
              </div>
              {formData.bankStatement && (
                <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                  <span className="text-sm text-gray-800">{formData.bankStatement.name}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                    onClick={() => handleFileRemove("bankStatement")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                <span className="text-sm text-gray-800">4-Month Salary Slips <span className="text-red-500">*</span></span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, "salarySlips")}
                  className="hidden"
                  id="salarySlips"
                  required
                />
                <label htmlFor="salarySlips" className="cursor-pointer text-[#4B5EAA]">
                  <Upload className="h-6 w-6" />
                </label>
              </div>
              {formData.salarySlips && (
                <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                  <span className="text-sm text-gray-800">{formData.salarySlips.name}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                    onClick={() => handleFileRemove("salarySlips")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                <span className="text-sm text-gray-800">Last 1 Year ITR <span className="text-red-500">*</span></span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, "itr")}
                  className="hidden"
                  id="itr"
                  required
                />
                <label htmlFor="itr" className="cursor-pointer text-[#4B5EAA]">
                  <Upload className="h-6 w-6" />
                </label>
              </div>
              {formData.itr && (
                <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                  <span className="text-sm text-gray-800">{formData.itr.name}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                    onClick={() => handleFileRemove("itr")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        );
      case 7:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-8 p-6 w-full max-h-[calc(100vh-200px)] overflow-y-auto">
            <span className="text-xl font-semibold">Profile Document</span>
            <p className="text-gray-600">Please upload a 300-word profile document covering:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Introduction</li>
              <li>Educational Background</li>
              <li>Work Details</li>
              <li>Vision and Intent</li>
            </ul>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                <span className="text-sm text-gray-800">Upload 300-Word Profile <span className="text-red-500">*</span></span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, "profileDocument")}
                  className="hidden"
                  id="profileDocument"
                  required
                />
                <label htmlFor="profileDocument" className="cursor-pointer text-[#4B5EAA]">
                  <Upload className="h-6 w-6" />
                </label>
              </div>
              {formData.profileDocument && (
                <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                  <span className="text-sm text-gray-800">{formData.profileDocument.name}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                    onClick={() => window.open(URL.createObjectURL(formData.profileDocument!), "_blank")}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-6 h-full">
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-lg font-semibold">Profile Details</h3>
                <p className="text-sm text-gray-600">Guidelines for your 300-word profile:</p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Provide a brief introduction about yourself.</li>
                  <li>Include your educational background.</li>
                  <li>Detail your current work and experience.</li>
                  <li>Share your vision and intent for the selected program.</li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-center">
                <h3 className="text-lg font-semibold">Sample Document</h3>
                <p className="text-sm text-gray-600">Example Profile (Preview & Download)</p>
                <div className="w-full max-w-[300px] h-[200px] bg-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-500 text-sm p-2 mt-2">
                  <iframe
                    src={exampleProfilePdf}
                    title="Example Profile PDF"
                    className="w-full h-full rounded"
                    style={{ minHeight: 180, minWidth: 200 }}
                  />
                </div>
                <div className="flex gap-2 mt-2 w-full">
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white w-1/2 px-4 py-2 text-base"
                    onClick={() => window.open(exampleProfilePdf, "_blank")}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white w-1/2 px-4 py-2 text-base"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = exampleProfilePdf;
                      link.download = "example-profile.pdf";
                      link.click();
                    }}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 8:
        return (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="w-full max-w-4xl mx-auto flex flex-col p-4 md:p-8 bg-white rounded-2xl shadow-lg"
            style={{
              minHeight: "500px",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Review & Submit</h2>
            </div>
            <div className="flex-1 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
              {/* Profile Section */}
              <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-6 flex flex-col items-start">
                {formData.passportPhoto ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(formData.passportPhoto)}
                      alt="Profile Photo"
                      className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg border border-gray-200"
                      style={{ minWidth: "8rem", minHeight: "8rem", maxWidth: "10rem", maxHeight: "10rem" }}
                    />
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                        onClick={() => window.open(URL.createObjectURL(formData.passportPhoto!), '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                        onClick={() => handleEdit(5)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                    No Photo
                  </div>
                )}
                <span className="mt-4 text-lg font-semibold text-gray-800">
                  {formData.firstName} {formData.lastName || "User"}
                </span>
              </div>
              {/* Details Section */}
              <div className="w-full md:w-3/4 space-y-6 overflow-y-auto" style={{ maxHeight: "60vh" }}>
                {/* Passport Details */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Passport Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Passport Number</p>
                      <p className="text-base text-gray-800">{formData.passportNumber || "Not provided"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">Passport Front</p>
                      {formData.passportFront && (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                            onClick={() => window.open(URL.createObjectURL(formData.passportFront!), '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                        onClick={() => handleEdit(5)}
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">Passport Back</p>
                      {formData.passportBack && (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                            onClick={() => window.open(URL.createObjectURL(formData.passportBack!), '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                        onClick={() => handleEdit(5)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
                {/* Financial Documents */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Financial Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">6-Month Bank Statement</p>
                      {formData.bankStatement && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                          onClick={() => window.open(URL.createObjectURL(formData.bankStatement!), '_blank')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                        onClick={() => handleEdit(6)}
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">4-Month Salary Slips</p>
                      {formData.salarySlips && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                          onClick={() => window.open(URL.createObjectURL(formData.salarySlips!), '_blank')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                        onClick={() => handleEdit(6)}
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">Last 1 Year ITR</p>
                      {formData.itr && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                          onClick={() => window.open(URL.createObjectURL(formData.itr!), '_blank')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                        onClick={() => handleEdit(6)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
                {/* Profile Document */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Document</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">300-Word Profile</p>
                    {formData.profileDocument && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                        onClick={() => window.open(URL.createObjectURL(formData.profileDocument!), '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8"
                      onClick={() => handleEdit(7)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const renderButtons = () => {
    if (isSubmitted || currentStep === 1) return null;
    return (
      <div className="flex justify-between items-center w-full p-6">
        <div className="flex space-x-4">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handlePrevStep}
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white text-base"
            aria-label="Previous Step"
          >
            <ChevronLeft className="inline-block h-5 w-5 mr-2" />
            Back
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={currentStep === 5 || currentStep === 6 || currentStep === 7 ? handleSkip : onClose}
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white text-base"
            aria-label={currentStep === 5 || currentStep === 6 || currentStep === 7 ? "Skip" : "Cancel"}
          >
            {currentStep === 5 || currentStep === 6 || currentStep === 7 ? "Skip" : "Cancel"}
          </motion.button>
        </div>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleNextStep}
          disabled={isNextDisabled()}
          className="px-6 py-3 rounded-xl bg-[#4B5EAA] text-white hover:bg-[#3B4A8A] disabled:opacity-50 text-base"
          aria-label={currentStep === 8 ? "Submit" : "Next"}
        >
          {currentStep === 8 ? "Submit" : "Next"}
        </motion.button>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      style={{ minHeight: "100dvh", minWidth: "100vw" }}
      onClick={onClose}
    >
      <div
        className="relative w-full h-full bg-gray-50 rounded-none flex flex-col overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-800 hover:bg-gray-200 p-2 rounded-full z-10"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Mobile: Animation at Top, Content Below, Buttons at Bottom */}
        <div className="flex flex-col w-full h-full md:hidden p-4">
          {/* Animation */}
          {currentStep !== 7 && currentStep !== 8 && (
            <div className="flex justify-center mb-6">
              {animationLoading ? (
                <div className="w-[300px] h-[300px] flex items-center justify-center bg-white text-gray-800 text-sm rounded-lg shadow">
                  Loading...
                </div>
              ) : animationError || !animationData ? (
                <div className="w-[300px] h-[300px] flex items-center justify-center bg-white text-gray-800 text-sm text-center rounded-lg shadow">
                  Animation Unavailable: {animationError || "No data"}
                </div>
              ) : (
                <div className="w-[300px] h-[300px] bg-white rounded-lg shadow flex items-center justify-center">
                  <Lottie animationData={animationData} style={{ width: 300, height: 300 }} />
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 text-gray-800 flex flex-col justify-center items-start p-4 space-y-8 overflow-y-auto">
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
          </div>

          {/* Buttons */}
          {renderButtons()}
        </div>

        {/* Desktop: Animation on Right, Content + Buttons on Left */}
        <div className="hidden md:flex w-full h-full items-center justify-center">
          {/* Content + Buttons */}
          <div className="w-full md:w-3/5 text-gray-800 flex flex-col justify-center items-start p-6 space-y-8">
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
            {renderButtons()}
          </div>
          {/* Animation */}
          {currentStep !== 7 && currentStep !== 8 && (
            <div className="w-2/5 flex justify-center items-center p-6">
              {animationLoading ? (
                <div className="w-[400px] h-[400px] flex items-center justify-center text-gray-800 text-base rounded-lg shadow">
                  Loading...
                </div>
              ) : animationError || !animationData ? (
                <div className="w-[400px] h-[400px] flex items-center justify-center text-gray-800 text-base text-center rounded-lg shadow">
                  Animation Unavailable: {animationError || "No data"}
                </div>
              ) : (
                <div className="w-[400px] h-[400px] bg-white rounded-lg shadow flex items-center justify-center">
                  <Lottie animationData={animationData} style={{ width: 400, height: 400 }} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}