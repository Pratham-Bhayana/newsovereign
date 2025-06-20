
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, ChevronLeft, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import Lottie from "lottie-react";
import { auth } from "@/lib/firebaseConfig";
import { PROGRAMS } from "@/lib/constants";

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

// Function to get animation path based on current step
const getAnimationPath = (step: number): string => {
  const animationFiles: Record<number, string> = {
    1: "/animations/welcome.json",
    2: "/animations/lf20_yr6zz0.json",
    3: "/animations/lf20_3vbnmfhq.json",
    4: "/animations/lf20_kplawjme.json",
    5: "/animations/lf20_8b2lmi.json",
    6: "/animations/lf20_j3f6n7.json",
    7: "/animations/lf20_fj0eoe.json",
  };
  return animationFiles[step] || animationFiles[1]; // Default to step 1 if step is invalid
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
  const [animationDataRight, setAnimationDataRight] = useState<any>(null);
  const [animationError, setAnimationError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const totalSteps = 4; // Mapped to 4 progress steps

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || user.email?.split("@")[0] || "User");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadAnimation = async (url: string) => {
      try {
        const response = await fetch(url, { mode: 'cors' }); // Enable CORS mode
        if (!response.ok) throw new Error(`Failed to fetch animation: ${response.statusText}`);
        const data = await response.json();
        setAnimationDataRight(data);
        setAnimationError(false);
      } catch (error) {
        console.error("Error loading Lottie animation:", error);
        setAnimationError(true);
      }
    };

    const animationPath = getAnimationPath(currentStep);
    loadAnimation(animationPath);
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

  const getProgress = () => {
    const stepMap: { [key: number]: number } = { 1: 0, 2: 25, 3: 25, 4: 50, 5: 50, 6: 75, 7: 100 };
    return stepMap[currentStep] || 0;
  };

  const renderStep = () => {
    if (isSubmitted) {
      return (
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="text-center space-y-4">
          <h3 className="text-2xl font-semibold text-white">Application Submitted!</h3>
          <p className="text-sm text-white">
            You will receive an email confirmation shortly. Track your application in the{" "}
            <a href="/profile" className="underline text-[#cba135]">
              Profile section
            </a>
            .
          </p>
        </motion.div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="text-center space-y-6">
            <h3 className="text-xl font-semibold text-white">Welcome</h3>
            <p className="text-sm text-white">We require your documents to start your application.</p>
            <Button
              onClick={() => setCurrentStep(2)}
              className="bg-[#cba135] hover:bg-[#b3922f] text-[#183b4e] rounded-lg px-6"
              asChild
            >
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                Get Started
              </motion.div>
            </Button>
          </motion.div>
        );
      case 2:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Personal Information</h3>
            <Input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="border-[#cba135] focus:ring-[#cba135] rounded-lg bg-white text-[#183b4e]"
              required
            />
            <Input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="border-[#cba135] focus:ring-[#cba135] rounded-lg bg-white text-[#183b4e]"
              required
            />
          </motion.div>
        );
      case 3:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Working Details</h3>
            <Input
              name="occupation"
              placeholder="Occupation"
              value={formData.occupation}
              onChange={handleInputChange}
              className="border-[#cba135] focus:ring-[#cba135] rounded-lg bg-white text-[#183b4e]"
              required
            />
            <Input
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleInputChange}
              className="border-[#cba135] focus:ring-[#cba135] rounded-lg bg-white text-[#183b4e]"
              required
            />
            <Input
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="border-[#cba135] focus:ring-[#cba135] rounded-lg bg-white text-[#183b4e]"
              required
            />
          </motion.div>
        );
      case 4:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Program Selection</h3>
            <Select
              value={formData.selectedProgram}
              onValueChange={handleSelectChange("selectedProgram")}
            >
              <SelectTrigger className="border-[#cba135] focus:ring-[#cba135] rounded-lg bg-white text-[#183b4e]">
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
              <SelectTrigger className="border-[#cba135] focus:ring-[#cba135] rounded-lg bg-white text-[#183b4e]">
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
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Personal Details</h3>
            <div className="flex items-center justify-between bg-[#F9FAFB] p-4 rounded-lg">
              <span className="text-sm text-[#183b4e]">Passport Photo</span>
              <div className="flex space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "passportPhoto")}
                  className="hidden"
                  id="passportPhoto"
                />
                <label htmlFor="passportPhoto" className="cursor-pointer text-[#cba135]">
                  <Upload className="h-5 w-5" />
                </label>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-[#cba135] text-[#183b4e] hover:bg-[#cba135] hover:text-white"
                  onClick={() => alert("Live capture not implemented yet")}
                >
                  <Camera className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <Input
              name="passportNumber"
              placeholder="Passport Number"
              value={formData.passportNumber}
              onChange={handleInputChange}
              className="border-[#cba135] focus:ring-[#cba135] rounded-lg bg-white text-[#183b4e]"
              required
            />
            <div className="flex items-center justify-between bg-[#F9FAFB] p-4 rounded-lg">
              <span className="text-sm text-[#183b4e]">Passport Front</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "passportFront")}
                className="hidden"
                id="passportFront"
              />
              <label htmlFor="passportFront" className="cursor-pointer text-[#cba135]">
                <Upload className="h-5 w-5" />
              </label>
            </div>
            <div className="flex items-center justify-between bg-[#F9FAFB] p-4 rounded-lg">
              <span className="text-sm text-[#183b4e]">Passport Back</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "passportBack")}
                className="hidden"
                id="passportBack"
              />
              <label htmlFor="passportBack" className="cursor-pointer text-[#cba135]">
                <Upload className="h-5 w-5" />
              </label>
            </div>
          </motion.div>
        );
      case 6:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Financial Details</h3>
            <Select
              value={formData.monthlyIncome}
              onValueChange={handleSelectChange("monthlyIncome")}
            >
              <SelectTrigger className="border-[#cba135] focus:ring-[#cba135] rounded-lg bg-white text-[#183b4e]">
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
            <div className="flex items-center justify-between bg-[#F9FAFB] p-4 rounded-lg">
              <span className="text-sm text-[#183b4e]">6-Month Bank Statement</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "bankStatement")}
                className="hidden"
                id="bankStatement"
              />
              <label htmlFor="bankStatement" className="cursor-pointer text-[#cba135]">
                <Upload className="h-5 w-5" />
              </label>
            </div>
            <div className="flex items-center justify-between bg-[#F9FAFB] p-4 rounded-lg">
              <span className="text-sm text-[#183b4e]">4-Month Salary Slips</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "salarySlips")}
                className="hidden"
                id="salarySlips"
              />
              <label htmlFor="salarySlips" className="cursor-pointer text-[#cba135]">
                <Upload className="h-5 w-5" />
              </label>
            </div>
          </motion.div>
        );
      case 7:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Review & Submit</h3>
            <div className="bg-[#F9FAFB] p-4 rounded-lg">
              <ul className="list-disc pl-5 text-sm text-[#183b4e] space-y-2">
                <li>
                  <strong>First Name:</strong> {formData.firstName || "Not provided"}{" "}
                  <Button
                    variant="link"
                    className="text-[#cba135] p-0 h-auto"
                    onClick={() => handleEdit(2)}
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <strong>Last Name:</strong> {formData.lastName || "Not provided"}{" "}
                  <Button
                    variant="link"
                    className="text-[#cba135] p-0 h-auto"
                    onClick={() => handleEdit(2)}
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <strong>Occupation:</strong> {formData.occupation || "Not provided"}{" "}
                  <Button
                    variant="link"
                    className="text-[#cba135] p-0 h-auto"
                    onClick={() => handleEdit(3)}
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <strong>Company Name:</strong> {formData.companyName || "Not provided"}{" "}
                  <Button
                    variant="link"
                    className="text-[#cba135] p-0 h-auto"
                    onClick={() => handleEdit(3)}
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <strong>Designation:</strong> {formData.designation || "Not provided"}{" "}
                  <Button
                    variant="link"
                    className="text-[#cba135] p-0 h-auto"
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
                    className="text-[#cba135] p-0 h-auto"
                    onClick={() => handleEdit(4)}
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <strong>Intent to Apply:</strong> {formData.intentToApply || "Not provided"}{" "}
                  <Button
                    variant="link"
                    className="text-[#cba135] p-0 h-auto"
                    onClick={() => handleEdit(4)}
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <strong>Passport Number:</strong> {formData.passportNumber || "Not provided"}{" "}
                  <Button
                    variant="link"
                    className="text-[#cba135] p-0 h-auto"
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
                    className="text-[#cba135] p-0 h-auto"
                    onClick={() => handleEdit(5)}
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <strong>Monthly Income:</strong> {formData.monthlyIncome || "Not provided"}{" "}
                  <Button
                    variant="link"
                    className="text-[#cba135] p-0 h-auto"
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
                    className="text-[#cba135] p-0 h-auto"
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[80vw] h-[80vh] max-w-[1000px] max-h-[700px] overflow-y-auto bg-[#183b4e] rounded-lg shadow-lg">
        <DialogHeader className="bg-[#183b4e] p-4">
          <DialogTitle className="text-white text-lg font-semibold flex justify-between items-center">
            {isSubmitted ? "Thank You!" : `Hello ${userName || "User"} - Step ${currentStep} of 7`}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-[#cba135]/20"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <div className="flex items-center space-x-4 text-sm text-white">
            <span>Contact Information</span>
            <span className={currentStep >= 2 ? "text-[#cba135]" : "text-gray-400"}>Personal Information</span>
            <span className={currentStep >= 4 ? "text-[#cba135]" : "text-gray-400"}>Additional Details</span>
            <span className={currentStep >= 7 ? "text-[#cba135]" : "text-gray-400"}>Finish Project</span>
          </div>
          <Progress value={getProgress()} className="h-1 bg-[#F9FAFB] [&>*]:bg-[#cba135]" />
        </DialogHeader>
        <motion.div className="flex flex-col md:flex-row gap-4 p-4">
          <div className="md:w-2/3 space-y-4">
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
          </div>
          <div className="md:w-1/3 flex justify-center items-center">
            {animationError || !animationDataRight ? (
              <div className="w-[120px] h-[120px] flex items-center justify-center bg-[#F9FAFB] text-[#183b4e] text-sm">
                Animation Unavailable
              </div>
            ) : (
              <div className="w-[120px] h-[120px] bg-[#F9FAFB]">
                <Lottie animationData={animationDataRight} style={{ width: 120, height: 120 }} />
              </div>
            )}
          </div>
        </motion.div>
        {!isSubmitted && (
          <DialogFooter className="flex justify-between p-4 bg-[#183b4e]">
            <div className="flex items-center space-x-2">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevStep}
                  className="border-[#cba135] text-[#cba135] hover:bg-[#cba135] hover:text-[#183b4e]"
                  aria-label="Previous Step"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="outline"
                onClick={currentStep === 5 || currentStep === 6 ? handleSkip : onClose}
                className="border-[#cba135] text-[#cba135] hover:bg-[#cba135] hover:text-[#183b4e]"
                aria-label={currentStep === 5 || currentStep === 6 ? "Skip" : "Cancel"}
              >
                {currentStep === 5 || currentStep === 6 ? "Skip" : "Cancel"}
              </Button>
            </div>
            {currentStep > 1 && (
              <Button
                onClick={handleNextStep}
                disabled={isNextDisabled()}
                className="bg-[#cba135] hover:bg-[#b3922f] text-[#183b4e]"
                aria-label={currentStep === 7 ? "Submit" : "Next"}
              >
                {currentStep === 7 ? "Submit" : "Next"}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
