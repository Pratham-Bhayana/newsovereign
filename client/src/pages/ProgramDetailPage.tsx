
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "wouter";
import {
  ArrowLeft, Clock, DollarSign, CheckCircle, Globe, FileText, Users, ChevronLeft, ChevronRight,
  Calculator, Plus, Minus, CreditCard, Bitcoin, Banknote, Calendar, FileSpreadsheet, ShieldCheck,
  BookUser, MessageSquare, FileCheck, Briefcase, FileSignature, UserCheck, Star, File,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PROGRAMS } from "@/lib/constants";
import { auth } from "@/lib/firebaseConfig";
import ApplicationPage from "./applicationPage";

interface Program {
  id: string;
  title: string;
  description: string;
  minInvestment: string;
  processingTime: string;
  continent: string;
  countries: string[];
  image?: string;
  images?: string[];
  benefits?: string[];
  calculator?: {
    baseCost: number;
    familyMemberCost: number;
    governmentFees: number;
    legalFees: number;
    dueDiligenceFees: number;
    currency: string;
  };
  eligibilityCriteria?: string[];
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const child = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const PLACEHOLDER_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/1G+4gAAAAAASUVORK5CYII=";

export default function ProgramDetailPage() {
  const { id } = useParams<{ id: string }>();
  const program = PROGRAMS.find((p) => p.id === id) as Program | undefined;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [familyMembers, setFamilyMembers] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  useEffect(() => {
    if (program?.images && program.images.length > 0) {
      Promise.all(
        program.images.map((src) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = () => resolve(undefined);
          });
        })
      ).then(() => {
        console.log("All program images preloaded:", program.images);
      });
    }
  }, [program]);

  useEffect(() => {
    if (program?.calculator) {
      const calc = program.calculator;
      const base = calc.baseCost;
      const family = familyMembers * calc.familyMemberCost;
      const fees = calc.governmentFees + calc.legalFees + calc.dueDiligenceFees;
      setTotalCost(base + family + fees);
    }
  }, [familyMembers, program]);

  useEffect(() => {
    if (program?.images && program.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => program && program.images ? (prev + 1) % program.images.length : 0);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [program]);

  const nextImage = () => {
    if (program?.images && program.images.length > 1) {
      setCurrentImageIndex((prev) => program?.images ? (prev + 1) % program.images.length : 0);
    }
  };

  const prevImage = () => {
    if (program?.images && program.images.length > 1) {
      setCurrentImageIndex((prev) => {
        if (program.images) {
          return (prev - 1 + program.images.length) % program.images.length;
        }
        return 0;
      });
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency === "EUR" ? "EUR" : currency === "USD" ? "USD" : currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleStartApplication = () => {
    const user = auth.currentUser;
    if (user) {
      setIsApplicationOpen(true);
    } else {
      window.location.href = `/login?redirect=/programs/${id}`;
    }
  };

  const benefitsWithDescriptions = program?.benefits?.map((benefit) => {
    switch (benefit.toLowerCase()) {
      case "eu residence permit":
        return { title: benefit, description: "Live and work freely in the EU with a residence permit." };
      case "path to citizenship in 5 years":
        return { title: benefit, description: "Gain eligibility for full citizenship after 5 years of residency." };
      case "schengen area access":
        return { title: benefit, description: "Travel freely across 26 European countries without border checks." };
      case "low physical presence requirement":
        return { title: benefit, description: "Minimal stay required to maintain your residency status." };
      case "family inclusion":
        return { title: benefit, description: "Include your spouse and children in the residency program." };
      case "eu citizenship directly":
        return { title: benefit, description: "Obtain EU citizenship without a residency waiting period." };
      case "visa-free travel to 185+ countries":
        return { title: benefit, description: "Travel to over 185 countries without needing a visa." };
      case "premium healthcare and education":
        return { title: benefit, description: "Access top-tier healthcare and education systems in the EU." };
      case "strategic business location":
        return { title: benefit, description: "Set up or expand your business in a prime European hub." };
      case "tax advantages":
        return { title: benefit, description: "Benefit from favorable tax regimes and incentives." };
      case "no residency requirement":
        return { title: benefit, description: "No need to reside in the country to maintain your status." };
      case "tax benefits":
        return { title: benefit, description: "Enjoy reduced tax burdens and financial incentives." };
      case "strategic location":
        return { title: benefit, description: "Positioned ideally for business and travel opportunities." };
      case "high-quality lifestyle":
        return { title: benefit, description: "Experience a superior quality of life with modern amenities." };
      case "no minimum stay requirement":
        return { title: benefit, description: "Maintain residency without mandatory annual stays." };
      case "affordable investment":
        return { title: benefit, description: "Secure residency with a cost-effective investment." };
      case "work authorization":
        return { title: benefit, description: "Legally work and operate businesses in the country." };
      case "excellent lifestyle":
        return { title: benefit, description: "Enjoy a vibrant culture, climate, and community." };
      default:
        return { title: benefit, description: "Unlock unique advantages with this program." };
    }
  }) || [];

  const applicationProcess = [
    { step: "Book a consultation with our experts.", icon: MessageSquare },
    { step: "Submit required documents and complete due diligence.", icon: FileCheck },
    { step: "Make the qualifying investment.", icon: Briefcase },
    { step: "Receive approval and residency/citizenship documents.", icon: FileSignature },
  ];

  const requiredDocuments = [
    { name: "Valid passport copies", icon: FileText },
    { name: "Financial statements", icon: FileSpreadsheet },
    { name: "Police clearance certificate", icon: ShieldCheck },
    { name: "Proof of investment funds", icon: DollarSign },
    { name: "Birth and marriage certificates", icon: BookUser },
  ];

  const eligibilityCriteria = program?.eligibilityCriteria?.map((criterion, index) => ({
    criterion,
    icon: index % 3 === 0 ? UserCheck : index % 3 === 1 ? Star : File,
  })) || [];

  if (!program) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="min-h-screen flex items-center justify-center bg-gray-50"
      >
        <div className="text-center">
          <motion.h1 variants={slideUp} className="text-4xl font-bold text-gray-900 mb-4">
            Program Not Found
          </motion.h1>
          <motion.p variants={slideUp} className="text-gray-600 mb-8">
            The program you're looking for doesn't exist.
          </motion.p>
          <motion.div variants={slideUp}>
            <Button asChild>
              <Link href="/programs">Back to Programs</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="bg-white border-b sticky top-0 z-40 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <motion.div variants={slideUp}>
            <Link href="/programs">
              <Button variant="ghost" className="inline-flex items-center text-gray-600 hover:bg-[#183b4e] hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="font-medium text-sm">Back to Programs</span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div className="flex flex-col lg:flex-row gap-6" initial="hidden" animate="visible" variants={staggerChildren}>
            <motion.div variants={slideUp} className="lg:w-1/2 space-y-4">
              <motion.div variants={child} className="relative rounded-2xl overflow-hidden shadow-md">
                <div className="relative h-80">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={program.images?.[currentImageIndex] || program.image || PLACEHOLDER_IMAGE}
                      alt={program.title}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  <motion.button
                    variants={fadeIn}
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-3 rounded-full shadow-sm hover:bg-white transition-colors pointer-events-auto"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    variants={fadeIn}
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-3 rounded-full shadow-sm hover:bg-white transition-colors pointer-events-auto"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                  <motion.div
                    variants={fadeIn}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 pointer-events-none"
                  >
                    {program.images?.map((_, index) => (
                      <motion.button
                        key={index}
                        variants={child}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentImageIndex ? "bg-white" : "bg-white/50"} pointer-events-auto`}
                      />
                    ))}
                  </motion.div>
                  <motion.div
                    variants={fadeIn}
                    className="absolute top-4 left-4 bg-white/90 text-gray-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm"
                  >
                    {program.continent}
                  </motion.div>
                </div>
              </motion.div>

              <motion.div variants={child}>
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <motion.div variants={child} className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-[#183b4e]" />
                      <CardTitle className="text-lg text-[#cba135]">Why Choose Us</CardTitle>
                    </motion.div>
                  </CardHeader>
                  <CardContent>
                    <motion.ul variants={staggerChildren} className="space-y-2 text-sm text-gray-700 list-disc pl-4">
                      <motion.li variants={child}>Expert guidance through every step.</motion.li>
                      <motion.li variants={child}>Trusted by clients worldwide.</motion.li>
                      <motion.li variants={child}>Transparent pricing, no hidden fees.</motion.li>
                      <motion.li variants={child}>Comprehensive support for documentation.</motion.li>
                      <motion.li variants={child}>Proven success in approvals.</motion.li>
                    </motion.ul>
                    <motion.div variants={child} className="mt-4 flex gap-2">
                      <Button onClick={handleStartApplication} className="bg-[#cba135] hover:bg-[#b3922f] text-[#183b4e] text-sm">
                        Start Application
                      </Button>
                      <Button variant="outline" className="text-[#183b4e] border-[#183b4e] hover:bg-[#183b4e] hover:text-white text-sm">
                        Check Eligibility
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={child}>
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <motion.div variants={child} className="flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-[#183b4e]" />
                      <CardTitle className="text-lg text-[#cba135]">Application Process</CardTitle>
                    </motion.div>
                  </CardHeader>
                  <CardContent>
                    <motion.div variants={staggerChildren} className="grid grid-cols-1 gap-3">
                      {applicationProcess.map((step, index) => {
                        const Icon = step.icon;
                        return (
                          <motion.div key={index} variants={child} className="flex items-center p-2 bg-gray-50 rounded-xl">
                            <Icon className="w-5 h-5 text-[#183b4e] mr-2" />
                            <span className="text-sm text-gray-700">{step.step}</span>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={child}>
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <motion.div variants={child} className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-[#183b4e]" />
                      <CardTitle className="text-lg text-[#cba135]">Required Documents</CardTitle>
                    </motion.div>
                  </CardHeader>
                  <CardContent>
                    <motion.div variants={staggerChildren} className="grid grid-cols-2 gap-3">
                      {requiredDocuments.map((doc, index) => {
                        const Icon = doc.icon;
                        return (
                          <motion.div key={index} variants={child} className="flex items-center p-2 bg-gray-50 rounded-xl">
                            <Icon className="w-5 h-5 text-[#183b4e] mr-2" />
                            <span className="text-sm text-gray-700">{doc.name}</span>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {eligibilityCriteria.length > 0 && (
                <motion.div variants={child}>
                  <Card className="border-none shadow-sm">
                    <CardHeader>
                      <motion.div variants={child} className="flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-[#183b4e]" />
                        <CardTitle className="text-lg text-[#cba135]">Eligibility Criteria</CardTitle>
                      </motion.div>
                    </CardHeader>
                    <CardContent>
                      <motion.div variants={staggerChildren} className="grid grid-cols-1 gap-3">
                        {eligibilityCriteria.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <motion.div key={index} variants={child} className="flex items-center p-2 bg-gray-50 rounded-xl">
                              <Icon className="w-5 h-5 text-[#183b4e] mr-2" />
                              <span className="text-sm text-gray-700">{item.criterion}</span>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>

            <motion.div variants={child} className="lg:w-1/2 space-y-4">
              <motion.div variants={child}>
                <h1 className="text-3xl font-bold text-[#cba135] mb-2">{program.title}</h1>
                <p className="text-base text-gray-600 leading-relaxed">{program.description}</p>
              </motion.div>
              <motion.div variants={staggerChildren} className="grid grid-cols-3 gap-4">
                <motion.div variants={child} className="text-center p-3 bg-gray-50 rounded-xl shadow-sm">
                  <DollarSign className="w-4 h-4 text-[#cba135] mx-auto mb-1" />
                  <p className="text-xs text-[#cba135]">Investment</p>
                  <p className="font-bold text-[#183b4e] text-sm">{program.minInvestment}</p>
                </motion.div>
                <motion.div variants={child} className="text-center p-3 bg-gray-50 rounded-xl shadow-sm">
                  <Clock className="w-4 h-4 text-[#cba135] mx-auto mb-1" />
                  <p className="text-xs text-[#cba135]">Processing</p>
                  <p className="font-bold text-[#183b4e] text-sm">{program.processingTime}</p>
                </motion.div>
                <motion.div variants={child} className="text-center p-3 bg-gray-50 rounded-xl shadow-sm">
                  <Globe className="w-4 h-4 text-[#cba135] mx-auto mb-1" />
                  <p className="text-xs text-[#cba135]">Location</p>
                  <p className="font-bold text-[#183b4e] text-sm">{program.countries[0] || program.continent}</p>
                </motion.div>
              </motion.div>

              <motion.div variants={slideUp}>
                <Button
                  onClick={handleStartApplication}
                  className="bg-[#cba135] hover:bg-[#b3922f] text-[#183b4e] text-sm w-full flex items-center justify-center"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Start Application</span>
                </Button>
              </motion.div>

              <motion.section variants={slideUp} className="py-4 bg-gray-100 rounded-2xl shadow-sm">
                <div className="px-4">
                  <h2 className="text-lg font-bold text-[#cba135] mb-4">Program Benefits</h2>
                  <motion.div variants={staggerChildren} className="grid grid-cols-2 gap-4">
                    {benefitsWithDescriptions.map((benefit, index) => (
                      <motion.div key={index} variants={child} className="p-3 bg-white rounded-xl shadow-sm">
                        <CheckCircle className="w-4 h-4 text-[#cba135] mb-2" />
                        <h3 className="text-sm font-bold text-gray-900 mb-1">{benefit.title}</h3>
                        <p className="text-xs text-gray-600">{benefit.description}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.section>

              {program.calculator && (
                <motion.div variants={slideUp}>
                  <Card className="border-none shadow-sm">
                    <CardHeader>
                      <motion.div variants={child} className="flex items-center">
                        <Calculator className="w-5 h-5 mr-2 text-[#cba135]" />
                        <CardTitle className="text-lg text-[#cba135]">Cost Calculator</CardTitle>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <motion.div variants={child} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Family Members</span>
                        <motion.div variants={child} className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setFamilyMembers((prev) => Math.max(0, prev - 1))}
                            className="h-8 w-8"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-base font-medium">{familyMembers}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setFamilyMembers((prev) => prev + 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </motion.div>
                      </motion.div>
                      <motion.div variants={staggerChildren} className="space-y-2">
                        <motion.div variants={child} className="flex justify-between text-sm">
                          <span>Base Investment</span>
                          <span>{formatCurrency(program.calculator.baseCost, program.calculator.currency)}</span>
                        </motion.div>
                        <motion.div variants={child} className="flex justify-between text-sm">
                          <span>Family Members ({familyMembers})</span>
                          <span>{formatCurrency(familyMembers * program.calculator.familyMemberCost, program.calculator.currency)}</span>
                        </motion.div>
                        <motion.div variants={child} className="flex justify-between text-sm">
                          <span>Government Fees</span>
                          <span>{formatCurrency(program.calculator.governmentFees, program.calculator.currency)}</span>
                        </motion.div>
                        <motion.div variants={child} className="flex justify-between text-sm">
                          <span>Legal Fees</span>
                          <span>{formatCurrency(program.calculator.legalFees, program.calculator.currency)}</span>
                        </motion.div>
                        <motion.div variants={child} className="flex justify-between text-sm">
                          <span>Due Diligence Fees</span>
                          <span>{formatCurrency(program.calculator.dueDiligenceFees, program.calculator.currency)}</span>
                        </motion.div>
                        <motion.div variants={child} className="flex justify-between font-bold text-base pt-2 border-t">
                          <span>Total Cost</span>
                          <span>{formatCurrency(totalCost, program.calculator.currency)}</span>
                        </motion.div>
                      </motion.div>
                      <motion.div variants={child} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Payment Options</span>
                        <motion.div variants={staggerChildren} className="flex space-x-2">
                          <motion.div variants={child}><CreditCard className="w-4 h-4 text-gray-500" /></motion.div>
                          <motion.div variants={child}><Bitcoin className="w-4 h-4 text-gray-500" /></motion.div>
                          <motion.div variants={child}><Banknote className="w-4 h-4 text-gray-500" /></motion.div>
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-50 flex items-center justify-between px-4 py-3"
      >
        <motion.div variants={fadeIn} className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#cba135]" />
          <span className="text-sm font-medium text-gray-900">
            {program.calculator ? formatCurrency(totalCost, program.calculator.currency) : program.minInvestment || "Contact for cost"}
          </span>
        </motion.div>
        <motion.div variants={fadeIn}>
          <Button onClick={handleStartApplication} className="bg-[#cba135] hover:bg-[#b3922f] text-[#183b4e] text-sm px-4 py-2 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Start Application</span>
          </Button>
        </motion.div>
      </motion.div>

      <ApplicationPage isOpen={isApplicationOpen} onClose={() => setIsApplicationOpen(false)} programId={id} />
    </div>
  );
}
