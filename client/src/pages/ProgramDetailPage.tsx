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
    baseCost: number | string;
    familyMemberCost: number | string;
    governmentFees: number | string;
    legalFees: number | string;
    dueDiligenceFees: number | string;
    currency: string;
  };
  eligibilityCriteria?: string[];
  brochure?: string;
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
    if (program?.calculator && program.calculator.baseCost !== "") {
      const calc = program.calculator;
      const base = Number(calc.baseCost) || 0;
      const family = familyMembers * (Number(calc.familyMemberCost) || 0);
      const fees = (Number(calc.governmentFees) || 0) + (Number(calc.legalFees) || 0) + (Number(calc.dueDiligenceFees) || 0);
      setTotalCost(base + family + fees);
    } else {
      setTotalCost(0);
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
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency === "EUR" ? "EUR" : currency === "USD" ? "USD" : currency === "THB" ? "THB" : currency === "SGD" ? "SGD" : "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch (e) {
      return `${currency} ${amount.toLocaleString()}`;
    }
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
      case "world's oldest cbi program":
        return { title: benefit, description: "Trusted and established citizenship by investment program." };
      case "150+ visa-free destinations":
        return { title: benefit, description: "Travel to over 150 countries without needing a visa." };
      case "no income tax":
        return { title: benefit, description: "Enjoy a tax-friendly environment with no personal income tax." };
      case "fast processing":
        return { title: benefit, description: "Quick and efficient application processing." };
      case "stable democracy":
        return { title: benefit, description: "Reside in a politically stable and democratic nation." };
      case "most affordable cbi":
        return { title: benefit, description: "Cost-effective citizenship by investment option." };
      case "140+ visa-free destinations":
        return { title: benefit, description: "Access over 140 countries visa-free or with visa on arrival." };
      case "natural beauty":
        return { title: benefit, description: "Live in a country renowned for its stunning landscapes." };
      case "stable government":
        return { title: benefit, description: "Benefit from a reliable and consistent governance system." };
      case "us e-2 visa access":
        return { title: benefit, description: "Eligibility for US E-2 investor visa through treaty." };
      case "growing economy":
        return { title: benefit, description: "Invest in a nation with strong economic growth potential." };
      case "tourism opportunities":
        return { title: benefit, description: "Access a thriving tourism sector for investment." };
      case "commonwealth membership":
        return { title: benefit, description: "Part of the Commonwealth, offering global connections." };
      case "no interview requirement":
        return { title: benefit, description: "Simplified application with no mandatory interviews." };
      case "tax benefits":
        return { title: benefit, description: "Enjoy reduced tax burdens and financial incentives." };
      case "beautiful caribbean lifestyle":
        return { title: benefit, description: "Embrace a relaxed and luxurious Caribbean way of life." };
      case "competitive pricing":
        return { title: benefit, description: "Affordable investment options for citizenship." };
      case "multiple investment options":
        return { title: benefit, description: "Choose from various investment pathways." };
      case "stable jurisdiction":
        return { title: benefit, description: "Secure and reliable legal and political environment." };
      case "strategic location":
        return { title: benefit, description: "Positioned ideally for business and travel opportunities." };
      case "fast-growing economy":
        return { title: benefit, description: "Invest in a rapidly developing economic hub." };
      case "real estate investment":
        return { title: benefit, description: "Opportunities in a lucrative real estate market." };
      case "110+ visa-free destinations":
        return { title: benefit, description: "Travel to over 110 countries without visa requirements." };
      case "10-year renewable visa":
        return { title: benefit, description: "Long-term residency with renewable visa options." };
      case "tax-free income":
        return { title: benefit, description: "No taxation on personal income for residents." };
      case "world-class infrastructure":
        return { title: benefit, description: "Access to modern and advanced facilities." };
      case "business hub access":
        return { title: benefit, description: "Operate in a global business and financial center." };
      case "family sponsorship":
        return { title: benefit, description: "Sponsor family members for residency." };
      case "permanent residence":
        return { title: benefit, description: "Secure long-term residency status." };
      case "path to citizenship":
        return { title: benefit, description: "Clear pathway to full citizenship." };
      case "universal healthcare":
        return { title: benefit, description: "Access to comprehensive public healthcare." };
      case "excellent education":
        return { title: benefit, description: "Top-tier educational opportunities for families." };
      case "high quality of life":
        return { title: benefit, description: "Enjoy a superior lifestyle with modern amenities." };
      case "temporary residence":
        return { title: benefit, description: "Initial residency with potential for extension." };
      case "business opportunities":
        return { title: benefit, description: "Access a vibrant market for entrepreneurs." };
      case "excellent lifestyle":
        return { title: benefit, description: "Enjoy a vibrant culture, climate, and community." };
      case "strategic asia-pacific location":
        return { title: benefit, description: "Prime location for regional business and travel." };
      case "global financial hub":
        return { title: benefit, description: "Operate in a leading financial center." };
      case "excellent infrastructure":
        return { title: benefit, description: "Benefit from advanced facilities and services." };
      case "tax efficiency":
        return { title: benefit, description: "Optimize finances with favorable tax policies." };
      case "straightforward process with clear investment requirements":
        return { title: benefit, description: "Simplified application with transparent criteria." };
      case "obtain residency in 3-6 months with path to future citizenship":
        return { title: benefit, description: "Fast residency with a clear citizenship pathway." };
      case "receive one acre of prime land and company formation all inclusive":
        return { title: benefit, description: "Land and business setup included in investment." };
      case "access top-tier healthcare and educational opportunities":
        return { title: benefit, description: "Premium healthcare and education access." };
      case "right to reside in malta":
        return { title: benefit, description: "Legal residency in Malta with EU benefits." };
      case "no minimum stay requirement":
        return { title: benefit, description: "Maintain residency without mandatory stays." };
      case "can be converted to citizenship":
        return { title: benefit, description: "Pathway to full Maltese citizenship." };
      case "visa-free travel in schengen zone":
        return { title: benefit, description: "Freely travel across Schengen countries." };
      case "9th safest country in europe for expats and retirees":
        return { title: benefit, description: "Safe and welcoming for expatriates." };
      case "4 unesco world heritage sites showcasing rich history and culture":
        return { title: benefit, description: "Rich cultural and historical landmarks." };
      case "no wealth tax on individuals":
        return { title: benefit, description: "No tax on personal wealth." };
      case "greece ranks 1st globally for shipping — largest merchant navy fleet in world":
        return { title: benefit, description: "Leader in global shipping industry." };
      case "3rd most attractive golden visa program in the world":
        return { title: benefit, description: "Highly desirable residency program." };
      case "10th largest economy in the eu by gdp":
        return { title: benefit, description: "Strong economic standing in the EU." };
      case "visa-free or visa-on-arrival access to 190+ countries":
        return { title: benefit, description: "Extensive global travel access." };
      case "live, work, and stay anywhere within the european union":
        return { title: benefit, description: "Freedom to live and work in the EU." };
      case "favorable tax policies":
        return { title: benefit, description: "Tax advantages for residents." };
      case "visa-free or visa-on-arrival access to 100+ countries":
        return { title: benefit, description: "Broad international travel access." };
      case "lucrative property market with options in major cities":
        return { title: benefit, description: "Profitable real estate opportunities." };
      case "investment opportunities in tech, agriculture, and real estate":
        return { title: benefit, description: "Diverse investment sectors." };
      case "rich international lifestyle":
        return { title: benefit, description: "Vibrant and diverse cultural experience." };
      default:
        return { title: benefit, description: `Benefit from ${benefit.toLowerCase()} with this program.` };
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
                    disabled={(program.images?.length ?? 0) <= 1}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    variants={fadeIn}
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-3 rounded-full shadow-sm hover:bg-white transition-colors pointer-events-auto"
                    disabled={(program.images?.length ?? 0) <= 1}
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
                    <motion.div variants={child} className="mt-4 flex gap-2 flex-wrap">
                      <Button onClick={handleStartApplication} className="bg-[#cba135] hover:bg-[#b3922f] text-[#183b4e] text-sm">
                        Start Application
                      </Button>
                      <Button variant="outline" className="text-[#183b4e] border-[#183b4e] hover:bg-[#183b4e] hover:text-white text-sm">
                        Check Eligibility
                      </Button>
                      {program.brochure && (
                        <Button
                          asChild
                          variant="outline"
                          className="text-[#183b4e] border-[#183b4e] hover:bg-[#183b4e] hover:text-white text-sm"
                        >
                          <a href={program.brochure} download>
                          <i className="bi bi-cloud-arrow-down-fill text-[25px]"></i> Brochure {program.title}
                          </a>
                        </Button>
                      )}
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
                  <p className="font-bold text-[#183b4e] text-sm">{program.countries.join(", ") || program.continent}</p>
                </motion.div>
              </motion.div>

              <motion.div variants={slideUp}>
                <Button
                  onClick={handleStartApplication}
                  className="bg-[#183b4e] hover:bg-[#b3922f] text-white text-sm w-full flex items-center justify-center"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Book Consultation</span>
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
                        {/* <p className="text-xs text-gray-600">{benefit.description}</p> */}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.section>

              {program.calculator && program.calculator.baseCost !== "" && (
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
                          <span>{formatCurrency(Number(program.calculator.baseCost) || 0, program.calculator.currency)}</span>
                        </motion.div>
                        <motion.div variants={child} className="flex justify-between text-sm">
                          <span>Family Members ({familyMembers})</span>
                          <span>{formatCurrency(familyMembers * (Number(program.calculator.familyMemberCost) || 0), program.calculator.currency)}</span>
                        </motion.div>
                        <motion.div variants={child} className="flex justify-between text-sm">
                          <span>Government Fees</span>
                          <span>{formatCurrency(Number(program.calculator.governmentFees) || 0, program.calculator.currency)}</span>
                        </motion.div>
                        <motion.div variants={child} className="flex justify-between text-sm">
                          <span>Legal Fees</span>
                          <span>{formatCurrency(Number(program.calculator.legalFees) || 0, program.calculator.currency)}</span>
                        </motion.div>
                        <motion.div variants={child} className="flex justify-between text-sm">
                          <span>Due Diligence Fees</span>
                          <span>{formatCurrency(Number(program.calculator.dueDiligenceFees) || 0, program.calculator.currency)}</span>
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
            {program.calculator && program.calculator.baseCost !== "" ? formatCurrency(totalCost, program.calculator.currency) : program.minInvestment || "Contact for cost"}
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