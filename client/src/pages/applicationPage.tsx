import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, ChevronLeft, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Lottie from "lottie-react";
import { auth } from "@/lib/firebaseConfig";
import { PROGRAMS } from "@/lib/constants";

// Import animation JSON files
import animationStep1 from "./animations/ani-one.json";
import animationStep2 from "./animations/ani-two.json";
import animationStep3 from "./animations/ani-three.json";
import animationStep4 from "./animations/ani-four.json";
import animationStep5 from "./animations/ani-five.json";
import animationStep6 from "./animations/ani-six.json";
import animationStep7 from "./animations/ani-seven.json";

const animationFiles: Record<number, any> = {
  1: animationStep1,
  2: animationStep2,
  3: animationStep3,
  4: animationStep4,
  5: animationStep5,
  6: animationStep6,
  7: animationStep7,
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
  "Your privacy is our priority. <a href='/privacy' class='underline text-[#cba135]'>Read our policy</a>.",
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
  const [currentStep, setCurrentStep] = useState(1);
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
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="text-center space-y-4">
          <span className="text-xl md:text-2xl font-semibold text-white">
            Application Submitted!<br />
            You will receive an email confirmation shortly. Track your application in the{" "}
            <a href="/profile" className="underline text-[#cba135]">
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
              className="mt-6 px-4 py-2 w-52 max-w-52 rounded-2xl bg-[#cba135] text-[#183b4e] text-center cursor-pointer"
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
              className="border-[#cba135] focus:ring-[#cba135] rounded-lg bg-white text-[#183b4e] w-full text-sm md:text-base"
              required
            />
            <Input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="border-[#cba135] focus:ring-[#cba135] rounded-lg bg-white text-[#183b4e] w-full text-sm md:text-base"
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
              className="border-[#cba135] focus:ring-[#cba135] rounded-lg bg-white text-[#183b4e] w-full text-sm md:text-base"
              required
            />
            <Input
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleInputChange}
              className="border-[#cba135] focus:ring-[#cba135] rounded-lg bg-white text-[#183b4e] w-full text-sm md:text-base"
              required
            />
            <Input
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="border-[#cba135] focus:ring-[#cba135] rounded-lg bg-white text-[#183b4e] w-full text-sm md:text-base"
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
              <SelectTrigger className="border-[#cba135] focus:ring-[#cba135] rounded-lg bg-white text-[#183b4e] w-full text-sm md:text-base">
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
              <SelectTrigger className="border-[#cba135] focus:ring-[#cba135] rounded-lg bg-white text-[#183b4e] w-full text-sm md:text-base">
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
            <span className="text-lg md:text-xl font-semibold">Personal Details</span>
            <div className="flex items-center justify-between bg-[#F9FAFB] p-3 rounded-lg">
              <span className="text-xs md:text-sm text-[#183b4e]">Passport Photo</span>
              <div className="flex space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "passportPhoto")}
                  className="hidden"
                  id="passportPhoto"
                />
                <label htmlFor="passportPhoto" className="cursor-pointer text-[#cba135]">
                  <Upload className="h-4 w-4 md:h-5 md:w-5" />
                </label>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-[#cba135] text-[#183b4e] hover:bg-[#cba135] hover:text-white h-8 w-8 md:h-10 md:w-10"
                  onClick={() => alert("Live capture not implemented yet")}
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
              className="border-[#cba135] focus:ring-[#cba135] rounded-lg bg-white text-[#183b4e] w-full text-sm md:text-base"
              required
            />
            <div className="flex items-center justify-between bg-[#F9FAFB] p-3 rounded-lg">
              <span className="text-xs md:text-sm text-[#183b4e]">Passport Front</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "passportFront")}
                className="hidden"
                id="passportFront"
              />
              <label htmlFor="passportFront" className="cursor-pointer text-[#cba135]">
                <Upload className="h-4 w-4 md:h-5 md:w-5" />
              </label>
            </div>
            <div className="flex items-center justify-between bg-[#F9FAFB] p-3 rounded-lg">
              <span className="text-xs md:text-sm text-[#183b4e]">Passport Back</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "passportBack")}
                className="hidden"
                id="passportBack"
              />
              <label htmlFor="passportBack" className="cursor-pointer text-[#cba135]">
                <Upload className="h-4 w-4 md:h-5 md:w-5" />
              </label>
            </div>
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
              <SelectTrigger className="border-[#cba135] focus:ring-[#cba135] rounded-lg bg-white text-[#183b4e] w-full text-sm md:text-base">
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
            <div className="flex items-center justify-between bg-[#F9FAFB] p-3 rounded-lg">
              <span className="text-xs md:text-sm text-[#183b4e]">6-Month Bank Statement</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "bankStatement")}
                className="hidden"
                id="bankStatement"
              />
              <label htmlFor="bankStatement" className="cursor-pointer text-[#cba135]">
                <Upload className="h-4 w-4 md:h-5 md:w-5" />
              </label>
            </div>
            <div className="flex items-center justify-between bg-[#F9FAFB] p-3 rounded-lg">
              <span className="text-xs md:text-sm text-[#183b4e]">4-Month Salary Slips</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "salarySlips")}
                className="hidden"
                id="salarySlips"
              />
              <label htmlFor="salarySlips" className="cursor-pointer text-[#cba135]">
                <Upload className="h-4 w-4 md:h-5 md:w-5" />
              </label>
            </div>
          </motion.div>
        );
      case 7:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-4 w-full">
            <span className="text-lg md:text-xl font-semibold">Review & Submit</span>
            <div className="bg-[#F9FAFB] p-3 md:p-4 rounded-lg">
              <ul className="list-disc pl-5 text-xs md:text-sm text-[#183b4e] space-y-2">
                <li>
                  <strong>First Name:</strong> {formData.firstName || "Not provided"}{" "}
                  <Button
                    variant="link"
                    className="text-[#cba135] p-0 h-auto text-xs md:text-sm"
                    onClick={() => handleEdit(2)}
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <strong>Last Name:</strong> {formData.lastName || "Not provided"}{" "}
                  <Button
                    variant="link"
                    className="text-[#cba135] p-0 h-auto text-xs md:text-sm"
                    onClick={() => handleEdit(2)}
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <strong>Occupation:</strong> {formData.occupation || "Not provided"}{" "}
                  <Button
                    variant="link"
                    className="text-[#cba135] p-0 h-auto text-xs md:text-sm"
                    onClick={() => handleEdit(3)}
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <strong>Company Name:</strong> {formData.companyName || "Not provided"}{" "}
                  <Button
                    variant="link"
                    className="text-[#cba135] p-0 h-auto text-xs md:text-sm"
                    onClick={() => handleEdit(3)}
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <strong>Designation:</strong> {formData.designation || "Not provided"}{" "}
                  <Button
                    variant="link"
                    className="text-[#cba135] p-0 h-auto text-xs md:text-sm"
                    onClick={() => handleEdit(3)}
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <strong>Program:</strong>{" "}
                  {PROGRAMS.find((p) => p.id === formData.selectedProgram)?.title || "Not selected"}{" "}
                  <Button
                    variant="link"
                    className="text-[#cba135] p-0 h-auto text-xs md:text-sm"
                    onClick={() => handleEdit(4)}
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <strong>Intent to Apply:</strong> {formData.intentToApply || "Not provided"}{" "}
                  <Button
                    variant="link"
                    className="text-[#cba135] p-0 h-auto text-xs md:text-sm"
                    onClick={() => handleEdit(4)}
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <strong>Passport Number:</strong> {formData.passportNumber || "Not provided"}{" "}
                  <Button
                    variant="link"
                    className="text-[#cba135] p-0 h-auto text-xs md:text-sm"
                    onClick={() => handleEdit(5)}
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <strong>Passport Documents:</strong>{" "}
                  {formData.passportPhoto || formData.passportFront || formData.passportBack
                    ? "Uploaded"
                    : "Not provided"}{" "}
                  <Button
                    variant="link"
                    className="text-[#cba135] p-0 h-auto text-xs md:text-sm"
                    onClick={() => handleEdit(5)}
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <strong>Monthly Income:</strong> {formData.monthlyIncome || "Not provided"}{" "}
                  <Button
                    variant="link"
                    className="text-[#cba135] p-0 h-auto text-xs md:text-sm"
                    onClick={() => handleEdit(6)}
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <strong>Financial Documents:</strong>{" "}
                  {formData.bankStatement || formData.salarySlips ? "Uploaded" : "Not provided"}{" "}
                  <Button
                    variant="link"
                    className="text-[#cba135] p-0 h-auto text-xs md:text-sm"
                    onClick={() => handleEdit(6)}
                  >
                    Edit
                  </Button>
                </li>
              </ul>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50" onClick={onClose}>
      <div
        className="w-full h-full md:w-4/5 md:max-w-[1000px] md:h-auto md:max-h-[90vh] bg-[#183b4e] md:rounded-2xl flex flex-col md:flex-row overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:bg-[#cba135]/20 p-2 rounded-full z-10"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Mobile: Animation at Top, Content + Buttons Below */}
        <div className="flex flex-col w-full md:hidden p-4">
          {/* Animation */}
          <div className="flex justify-center mb-4">
            {animationLoading ? (
              <div className="w-[200px] h-[200px] flex items-center justify-center bg-[#F9FAFB] text-[#183b4e] text-xs">
                Loading...
              </div>
            ) : animationError || !animationData ? (
              <div className="w-[200px] h-[200px] flex items-center justify-center bg-[#F9FAFB] text-[#183b4e] text-xs text-center">
                Animation Unavailable: {animationError || "No data"}
              </div>
            ) : (
              <div className="w-[200px] h-[200px] bg-[#F9FAFB] rounded-lg">
                <Lottie animationData={animationData} style={{ width: 200, height: 200 }} />
              </div>
            )}
          </div>

          {/* Content + Buttons */}
          <div className="flex-1 text-white flex flex-col justify-center items-center text-center p-4 space-y-6">
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
            {!isSubmitted && currentStep > 1 && (
              <div className="flex justify-between w-full">
                <div className="flex space-x-2">
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handlePrevStep}
                    className="px-3 py-2 rounded-2xl border border-[#cba135] text-[#cba135] hover:bg-[#cba135] hover:text-white text-xs"
                    aria-label="Previous Step"
                  >
                    <ChevronLeft className="inline-block h-4 w-4 mr-1" />
                    Back
                  </motion.button>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={currentStep === 5 || currentStep === 6 ? handleSkip : onClose}
                    className="px-3 py-2 rounded-2xl border border-[#cba135] text-[#cba135] hover:bg-[#cba135] hover:text-white text-xs"
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
                  className="px-4 py-2 rounded-2xl bg-[#cba135] text-[#183b4e] hover:bg-[#b3922f] disabled:opacity-50 text-xs"
                  aria-label={currentStep === 7 ? "Submit" : "Next"}
                >
                  {currentStep === 7 ? "Submit" : "Next"}
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* Desktop: Animation on Right, Content + Buttons on Left */}
        <div className="hidden bg-transparent md:flex w-full h-full">
          {/* Content + Buttons */}
          <div className="w-3/5 text-white flex flex-col justify-center items-center text-center p-6 space-y-6">
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
            {!isSubmitted && currentStep > 1 && (
              <div className="flex justify-between w-full">
                <div className="flex space-x-2">
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handlePrevStep}
                    className="px-4 py-2 rounded-2xl border border-[#cba135] text-[#cba135] hover:bg-[#cba135] hover:text-white text-sm"
                    aria-label="Previous Step"
                  >
                    <ChevronLeft className="inline-block h-4 w-4 mr-1" />
                    Back
                  </motion.button>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={currentStep === 5 || currentStep === 6 ? handleSkip : onClose}
                    className="px-4 py-2 rounded-2xl border border-[#cba135] text-[#cba135] hover:bg-[#cba135] hover:text-white text-sm"
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
                  className="px-5 py-2 rounded-2xl bg-[#cba135] text-[#183b4e] hover:bg-[#b3922f] disabled:opacity-50 text-sm"
                  aria-label={currentStep === 7 ? "Submit" : "Next"}
                >
                  {currentStep === 7 ? "Submit" : "Next"}
                </motion.button>
              </div>
            )}
          </div>
          {/* Animation */}
          <div className="w-2/5 flex justify-center items-center p-4">
            {animationLoading ? (
              <div className="w-[300px] h-[300px] flex items-center justify-center  text-[#183b4e] text-sm">
                Loading...
              </div>
            ) : animationError || !animationData ? (
              <div className="w-[300px] h-[300px] flex items-center justify-center items-center  text-[#183b4e] text-sm text-center">
                Animation Unavailable: {animationError || "No data"}
              </div>
            ) : (
              <div className="w-[300px] h-[300px]  rounded-lg">
                <Lottie animationData={animationData} style={{ width: 300, height: 300 }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}