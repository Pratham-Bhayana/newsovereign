import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, ChevronLeft, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Lottie from "lottie-react";
import { auth } from "@/lib/firebaseConfig";
import { PROGRAMS } from "@/lib/constants";
import WebcamCapture from "./WebcamCapture";

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
  occupation: string;
  companyName: string;
  designation: string;
  selectedProgram: string;
  intentToApply: string;
  passportPhoto: File | null;
  passportNumber: string;
  passportFront: File | null;
  passportBack: File | null;
  bankStatement: File | null;
  salarySlips: File | null;
  monthlyIncome: string;
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
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    occupation: "",
    companyName: "",
    designation: "",
    selectedProgram: programId,
    intentToApply: "",
    passportPhoto: null,
    passportNumber: "",
    passportFront: null,
    passportBack: null,
    bankStatement: null,
    salarySlips: null,
    monthlyIncome: "",
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
    if (currentStep === 7) {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleWebcamCapture = (file: File) => {
    setFormData((prev) => ({ ...prev, passportPhoto: file }));
    setShowWebcam(false);
  };

  const handleSelectChange = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Submitting application:", formData);
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        window.location.href = "/programs";
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
    }));
    handleNextStep();
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step);
  };

  const isNextDisabled = () => {
    if (currentStep === 1) return true;
    if (currentStep === 2) return !formData.firstName || !formData.lastName;
    if (currentStep === 3) return !formData.occupation || !formData.companyName || !formData.designation;
    if (currentStep === 4) return !formData.selectedProgram || !formData.intentToApply;
    if (currentStep === 5) return !formData.passportNumber;
    return false;
  };

  const renderStep = () => {
    if (isSubmitted) {
      return (
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="text-left space-y-4">
          <span className="text-xl md:text-2xl font-semibold text-white">
            Application Submitted!<br />
            You will receive an email confirmation shortly. Track your application in the{" "}
            <a href="/profile" className="underline text-[#4B5EAA]">
              Profile section
            </a>.
          </span>
        </motion.div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6 text-left">
            <span className="text-lg md:text-xl flex font-semibold">
              Welcome {userName},<br />
              We require your documents to start <br/> your application.
            </span>
            <div
              onClick={() => setCurrentStep(2)}
              className="mt-6 px-4 py-2 w-52 max-w-52 rounded-xl bg-[#4B5EAA] text-white text-center cursor-pointer"
            >
              Get Started
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-4 w-full">
            <span className="text-lg md:text-xl font-semibold">Personal Information</span>
            <Input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-sm md:text-base"
              required
            />
            <Input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-sm md:text-base"
              required
            />
          </motion.div>
        );
      case 3:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-4 w-full">
            <span className="text-lg md:text-xl font-semibold">Working Details</span>
            <Input
              name="occupation"
              placeholder="Occupation"
              value={formData.occupation}
              onChange={handleInputChange}
              className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-sm md:text-base"
              required
            />
            <Input
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleInputChange}
              className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-sm md:text-base"
              required
            />
            <Input
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-sm md:text-base"
              required
            />
          </motion.div>
        );
      case 4:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-4 w-full">
            <span className="text-lg md:text-xl font-semibold">Program Selection</span>
            <Select
              value={formData.selectedProgram}
              onValueChange={handleSelectChange("selectedProgram")}
            >
              <SelectTrigger className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-sm md:text-base">
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
              <SelectTrigger className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-sm md:text-base">
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
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-4 w-full">
            {showWebcam ? (
              <WebcamCapture
                onCapture={handleWebcamCapture}
                onClose={() => setShowWebcam(false)}
              />
            ) : (
              <>
                <span className="text-lg md:text-xl font-semibold">Personal Details</span>
                <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                  <span className="text-xs md:text-sm text-gray-800">Passport Photo</span>
                  <div className="flex space-x-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "passportPhoto")}
                      className="hidden"
                      id="passportPhoto"
                    />
                    <label htmlFor="passportPhoto" className="cursor-pointer text-[#4B5EAA]">
                      <Upload className="h-4 w-4 md:h-5 md:w-5" />
                    </label>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white h-8 w-8 md:h-10 md:w-10"
                      onClick={() => setShowWebcam(true)}
                    >
                      <Camera className="h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                  </div>
                </div>
                <Input
                  name="passportNumber"
                  placeholder="Passport Number"
                  value={formData.passportNumber}
                  onChange={handleInputChange}
                  className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-sm md:text-base"
                  required
                />
                <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                  <span className="text-xs md:text-sm text-gray-800">Passport Front</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "passportFront")}
                    className="hidden"
                    id="passportFront"
                  />
                  <label htmlFor="passportFront" className="cursor-pointer text-[#4B5EAA]">
                    <Upload className="h-4 w-4 md:h-5 md:w-5" />
                  </label>
                </div>
                <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                  <span className="text-xs md:text-sm text-gray-800">Passport Back</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "passportBack")}
                    className="hidden"
                    id="passportBack"
                  />
                  <label htmlFor="passportBack" className="cursor-pointer text-[#4B5EAA]">
                    <Upload className="h-4 w-4 md:h-5 md:w-5" />
                  </label>
                </div>
              </>
            )}
          </motion.div>
        );
      case 6:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-4 w-full">
            <span className="text-lg md:text-xl font-semibold">Financial Details</span>
            <Select
              value={formData.monthlyIncome}
              onValueChange={handleSelectChange("monthlyIncome")}
            >
              <SelectTrigger className="border-gray-300 focus:ring-[#4B5EAA] rounded-lg bg-white text-gray-800 w-full text-sm md:text-base">
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
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <span className="text-xs md:text-sm text-gray-800">6-Month Bank Statement</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "bankStatement")}
                className="hidden"
                id="bankStatement"
              />
              <label htmlFor="bankStatement" className="cursor-pointer text-[#4B5EAA]">
                <Upload className="h-4 w-4 md:h-5 md:w-5" />
              </label>
            </div>
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <span className="text-xs md:text-sm text-gray-800">4-Month Salary Slips</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "salarySlips")}
                className="hidden"
                id="salarySlips"
              />
              <label htmlFor="salarySlips" className="cursor-pointer text-[#4B5EAA]">
                <Upload className="h-4 w-4 md:h-5 md:w-5" />
              </label>
            </div>
          </motion.div>
        );
      case 7:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="w-full h-full flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Review & Submit</h2>
            </div>
            <div className="flex-1 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              {/* Profile Section */}
              <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-4">
                <div className="flex flex-col items-start">
                  {formData.passportPhoto ? (
                    <img
                      src={URL.createObjectURL(formData.passportPhoto)}
                      alt="Profile Photo"
                      className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-lg border border-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                      No Photo
                    </div>
                  )}
                  <span className="mt-2 text-base md:text-lg font-semibold text-gray-800">
                    {formData.firstName} {formData.lastName || "User"}
                  </span>
                </div>
              </div>
              {/* Details Section */}
              <div className="w-full md:w-3/4 space-y-4">
                {/* Personal Details */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="text-base font-semibold text-gray-800 mb-3">Personal Details</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">First Name</p>
                        <p className="text-sm text-gray-800">{formData.firstName || "Not provided"}</p>
                      </div>
                      <Button
                        variant="link"
                        className="text-[#4B5EAA] p-0 h-auto text-sm hover:text-[#3B4A8A]"
                        onClick={() => handleEdit(2)}
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Last Name</p>
                        <p className="text-sm text-gray-800">{formData.lastName || "Not provided"}</p>
                      </div>
                      <Button
                        variant="link"
                        className="text-[#4B5EAA] p-0 h-auto text-sm hover:text-[#3B4A8A]"
                        onClick={() => handleEdit(2)}
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Passport Number</p>
                        <p className="text-sm text-gray-800">{formData.passportNumber || "Not provided"}</p>
                      </div>
                      <Button
                        variant="link"
                        className="text-[#4B5EAA] p-0 h-auto text-sm hover:text-[#3B4A8A]"
                        onClick={() => handleEdit(5)}
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Passport Documents</p>
                        <p className="text-sm text-gray-800">
                          {formData.passportFront || formData.passportBack ? "Uploaded" : "Not provided"}
                        </p>
                      </div>
                      <Button
                        variant="link"
                        className="text-[#4B5EAA] p-0 h-auto text-sm hover:text-[#3B4A8A]"
                        onClick={() => handleEdit(5)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
                {/* Professional Details */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="text-base font-semibold text-gray-800 mb-3">Professional Details</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Occupation</p>
                        <p className="text-sm text-gray-800">{formData.occupation || "Not provided"}</p>
                      </div>
                      <Button
                        variant="link"
                        className="text-[#4B5EAA] p-0 h-auto text-sm hover:text-[#3B4A8A]"
                        onClick={() => handleEdit(3)}
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Company Name</p>
                        <p className="text-sm text-gray-800">{formData.companyName || "Not provided"}</p>
                      </div>
                      <Button
                        variant="link"
                        className="text-[#4B5EAA] p-0 h-auto text-sm hover:text-[#3B4A8A]"
                        onClick={() => handleEdit(3)}
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Designation</p>
                        <p className="text-sm text-gray-800">{formData.designation || "Not provided"}</p>
                      </div>
                      <Button
                        variant="link"
                        className="text-[#4B5EAA] p-0 h-auto text-sm hover:text-[#3B4A8A]"
                        onClick={() => handleEdit(3)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
                {/* Program Details */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="text-base font-semibold text-gray-800 mb-3">Program Details</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Program</p>
                        <p className="text-sm text-gray-800">
                          {PROGRAMS.find((p) => p.id === formData.selectedProgram)?.title || "Not selected"}
                        </p>
                      </div>
                      <Button
                        variant="link"
                        className="text-[#4B5EAA] p-0 h-auto text-sm hover:text-[#3B4A8A]"
                        onClick={() => handleEdit(4)}
                      >
                        Edit
                      </Button>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Intent to Apply</p>
                          <p className="text-sm text-gray-800">{formData.intentToApply || "Not provided"}</p>
                        </div>
                        <Button
                          variant="link"
                          className="text-[#4B5EAA] p-0 h-auto text-sm hover:text-[#3B4A8A]"
                          onClick={() => handleEdit(4)}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Financial Details */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="text-base font-semibold text-gray-800 mb-3">Financial Details</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Monthly Income</p>
                        <p className="text-sm text-gray-800">{formData.monthlyIncome || "Not provided"}</p>
                      </div>
                      <Button
                        variant="link"
                        className="text-[#4B5EAA] p-0 h-auto text-sm hover:text-[#3B4A8A]"
                        onClick={() => handleEdit(6)}
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Financial Documents</p>
                        <p className="text-sm text-gray-800">
                          {formData.bankStatement || formData.salarySlips ? "Uploaded" : "Not provided"}
                        </p>
                      </div>
                      <Button
                        variant="link"
                        className="text-[#4B5EAA] p-0 h-auto text-sm hover:text-[#3B4A8A]"
                        onClick={() => handleEdit(6)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!isSubmitted && currentStep > 1 && (
              <div className="flex justify-between w-full items-center mt-4">
                <div className="flex space-x-3">
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handlePrevStep}
                    className="px-4 py-2 rounded-xl border border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white text-sm"
                    aria-label="Previous Step"
                  >
                    <ChevronLeft className="inline-block h-4 w-4 mr-1" />
                    Back
                  </motion.button>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={(currentStep === 5 || currentStep === 6) ? handleSkip : onClose}
                    className="px-4 py-2 rounded-xl border border-gray-300 text-gray-800 hover:bg-[#4B5EAA] hover:text-white text-sm"
                    aria-label={currentStep === 5 || currentStep === 6 ? "Skip" : "Cancel"}
                  >
                    {currentStep === 5 || currentStep === 6 ? "Skip" : "Cancel"}
                  </motion.button>
                </div>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleNextStep}
                  disabled={isNextDisabled()}
                  className="px-5 py-2 rounded-xl bg-[#4B5EAA] text-white hover:bg-[#3B4A8A] disabled:opacity-50 text-sm"
                  aria-label={currentStep === 7 ? "Submit" : "Next"}
                >
                  {currentStep === 7 ? "Submit" : "Next"}
                </motion.button>
              </div>
            )}
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      style={{
        minHeight: "100dvh",
        minWidth: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-[80%] max-w-4xl bg-gray-50 rounded-2xl flex flex-col overflow-y-auto shadow-2xl"
        style={{
          height: "80dvh",
          maxHeight: "80dvh",
          margin: "auto",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-800 hover:bg-gray-200 p-2 rounded-full z-10"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Mobile: Animation at Top, Content + Buttons Below */}
        <div className="flex flex-col w-full md:hidden p-4 justify-center items-center">
          {/* Animation */}
          {currentStep !== 7 && (
            <div className="flex justify-center mb-4">
              {animationLoading ? (
                <div className="w-[150px] h-[150px] flex items-center justify-center bg-white text-gray-800 text-xs rounded-lg shadow">
                  Loading...
                </div>
              ) : animationError || !animationData ? (
                <div className="w-[150px] h-[150px] flex items-center justify-center bg-white text-gray-800 text-xs text-center rounded-lg shadow">
                  Animation Unavailable: {animationError || "No data"}
                </div>
              ) : (
                <div className="w-[150px] h-[150px] bg-white rounded-lg shadow flex items-center justify-center">
                  <Lottie animationData={animationData} style={{ width: 150, height: 150 }} />
                </div>
              )}
            </div>
          )}

          {/* Content + Buttons */}
          <div className="flex-1 text-gray-800 flex flex-col justify-center items-start p-2 space-y-4 w-full">
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
          </div>
        </div>

        {/* Desktop: Animation on Right, Content + Buttons on Left */}
        <div className="hidden bg-transparent md:flex w-full h-full items-center justify-center">
          {/* Content + Buttons */}
          <div className="w-full md:w-3/5 text-gray-800 flex flex-col justify-center items-start p-6 space-y-4">
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
          </div>
          {/* Animation */}
          {currentStep !== 7 && (
            <div className="w-2/5 flex justify-center items-center p-4">
              {animationLoading ? (
                <div className="w-[200px] h-[200px] flex items-center justify-center text-gray-800 text-sm rounded-lg shadow">
                  Loading...
                </div>
              ) : animationError || !animationData ? (
                <div className="w-[200px] h-[200px] flex items-center justify-center text-gray-800 text-sm text-center rounded-lg shadow">
                  Animation Unavailable: {animationError || "No data"}
                </div>
              ) : (
                <div className="w-[200px] h-[200px] bg-white rounded-lg shadow flex items-center justify-center">
                  <Lottie animationData={animationData} style={{ width: 200, height: 200 }} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}