import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "wouter";
import { ArrowLeft, Clock, DollarSign, CheckCircle, Globe, FileText, Users, ChevronLeft, ChevronRight, Calculator, Plus, Minus, CreditCard, Bitcoin, Banknote, Calendar, FileSpreadsheet, ShieldCheck, DollarSign as Money, BookUser, MessageSquare, FileCheck, Briefcase, FileSignature, UserCheck, Star, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PROGRAMS } from "@/lib/constants";

export default function ProgramDetailPage() {
  const { id } = useParams();
  const program = PROGRAMS.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [familyMembers, setFamilyMembers] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    if (program?.calculator) {
      const calc = program.calculator;
      const base = calc.baseCost;
      const family = familyMembers * calc.familyMemberCost;
      const fees = calc.governmentFees + calc.legalFees + calc.dueDiligenceFees;
      setTotalCost(base + family + fees);
    }
  }, [familyMembers, program]);

  // Auto-slide for mobile
  useEffect(() => {
    if (program?.images) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % program.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [program?.images]);

  const nextImage = () => {
    if (program?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % program.images.length);
    }
  };

  const prevImage = () => {
    if (program?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + program.images.length) % program.images.length);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'EUR' ? 'EUR' : currency === 'USD' ? 'USD' : currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Map benefits to include descriptions
  const benefitsWithDescriptions = program?.benefits?.map(benefit => {
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
      case "startup ecosystem access":
        return { title: benefit, description: "Tap into a thriving environment for startups and innovation." };
      case "cultural heritage":
        return { title: benefit, description: "Immerse yourself in a rich historical and cultural setting." };
      case "business opportunities":
        return { title: benefit, description: "Access new markets and investment opportunities." };
      case "world's oldest cbi program":
        return { title: benefit, description: "Join a trusted and established citizenship program." };
      case "150+ visa-free destinations":
        return { title: benefit, description: "Travel to over 150 countries without visa requirements." };
      case "no income tax":
        return { title: benefit, description: "Keep more of your earnings with zero income tax." };
      case "fast processing":
        return { title: benefit, description: "Quick approval process to get you started sooner." };
      case "stable democracy":
        return { title: benefit, description: "Live in a politically stable and democratic nation." };
      case "most affordable cbi":
        return { title: benefit, description: "Gain citizenship through the most cost-effective program." };
      case "140+ visa-free destinations":
        return { title: benefit, description: "Travel to over 140 countries without needing a visa." };
      case "natural beauty":
        return { title: benefit, description: "Live amidst stunning landscapes and natural wonders." };
      case "stable government":
        return { title: benefit, description: "Reside in a country with a reliable and steady government." };
      case "quick processing":
        return { title: benefit, description: "Fast-track your application with efficient processing." };
      case "us e-2 visa access":
        return { title: benefit, description: "Qualify for a US E-2 visa to live and work in the USA." };
      case "growing economy":
        return { title: benefit, description: "Invest in a nation with a rapidly expanding economy." };
      case "tourism opportunities":
        return { title: benefit, description: "Benefit from a booming tourism sector for investments." };
      case "commonwealth membership":
        return { title: benefit, description: "Enjoy benefits of being part of the Commonwealth nations." };
      case "no interview requirement":
        return { title: benefit, description: "Simplify your application with no interview needed." };
      case "beautiful caribbean lifestyle":
        return { title: benefit, description: "Experience the relaxed and vibrant Caribbean way of life." };
      case "competitive pricing":
        return { title: benefit, description: "Affordable investment options for citizenship." };
      case "multiple investment options":
        return { title: benefit, description: "Choose from various investment routes to qualify." };
      case "stable jurisdiction":
        return { title: benefit, description: "Live in a jurisdiction with legal and political stability." };
      case "fast-growing economy":
        return { title: benefit, description: "Be part of a dynamic and expanding economic landscape." };
      case "real estate investment":
        return { title: benefit, description: "Invest in property to secure your residency or citizenship." };
      case "110+ visa-free destinations":
        return { title: benefit, description: "Travel to over 110 countries without visa requirements." };
      case "10-year renewable visa":
        return { title: benefit, description: "Secure a long-term visa renewable every 10 years." };
      case "tax-free income":
        return { title: benefit, description: "Earn income without the burden of local taxes." };
      case "world-class infrastructure":
        return { title: benefit, description: "Access modern facilities and infrastructure." };
      case "business hub access":
        return { title: benefit, description: "Operate in a global business hub with ease." };
      case "family sponsorship":
        return { title: benefit, description: "Sponsor your family to join you in the program." };
      case "permanent residence":
        return { title: benefit, description: "Gain permanent residency status for long-term stability." };
      case "path to citizenship":
        return { title: benefit, description: "Become eligible for citizenship after residency." };
      case "universal healthcare":
        return { title: benefit, description: "Access a comprehensive public healthcare system." };
      case "excellent education":
        return { title: benefit, description: "Enroll in top-rated schools and universities." };
      case "high quality of life":
        return { title: benefit, description: "Enjoy a safe, prosperous, and fulfilling lifestyle." };
      case "us green card":
        return { title: benefit, description: "Obtain a US Green Card for permanent residency." };
      case "education access":
        return { title: benefit, description: "Access world-class education for you and your family." };
      case "world's largest economy":
        return { title: benefit, description: "Live and invest in the world's leading economy." };
      case "temporary residence":
        return { title: benefit, description: "Secure temporary residency as a stepping stone." };
      case "strategic asia-pacific location":
        return { title: benefit, description: "Positioned ideally in the Asia-Pacific for business." };
      case "global financial hub":
        return { title: benefit, description: "Live in a leading center for finance and trade." };
      case "excellent infrastructure":
        return { title: benefit, description: "Benefit from modern and reliable infrastructure." };
      case "tax efficiency":
        return { title: benefit, description: "Optimize your finances with tax-efficient policies." };
      default:
        return { title: benefit, description: "Unlock unique advantages with this program." };
    }
  });

  // Application Process with Icons
  const applicationProcess = [
    { step: "Book a consultation with our experts.", icon: MessageSquare },
    { step: "Submit required documents and complete due diligence.", icon: FileCheck },
    { step: "Make the qualifying investment.", icon: Briefcase },
    { step: "Receive approval and residency/citizenship documents.", icon: FileSignature },
  ];

  // Required Documents with Icons
  const requiredDocuments = [
    { name: "Valid passport copies", icon: FileText },
    { name: "Financial statements", icon: FileSpreadsheet },
    { name: "Police clearance certificate", icon: ShieldCheck },
    { name: "Proof of investment funds", icon: Money },
    { name: "Birth and marriage certificates", icon: BookUser },
  ];

  // Eligibility Criteria with Icons
  const eligibilityCriteria = program?.eligibilityCriteria?.map((criterion, index) => ({
    criterion,
    icon: index % 3 === 0 ? UserCheck : index % 3 === 1 ? Star : File,
  })) || [];

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Program Not Found</h1>
          <p className="text-gray-600 mb-8">The program you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/programs">Back to Programs</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/programs">
            <button className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="font-medium text-sm">Back to Programs</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Mobile Layout */}
          <div className="flex flex-col lg:hidden space-y-4">
            {/* Image Gallery */}
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-md">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={program.images?.[currentImageIndex] || program.image}
                  alt={program.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow-sm hover:bg-white transition-colors pointer-events-auto"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow-sm hover:bg-white transition-colors pointer-events-auto"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 pointer-events-none">
                {program.images?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    } pointer-events-auto`}
                  />
                ))}
              </div>
            </div>

            {/* Why Choose Raizing Sovereign */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex text-[#cba135] items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-[#183b4e]" />
                  Why Choose Raizing Sovereign
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700 list-disc pl-4">
                  <li>Expert guidance through every step of the process.</li>
                  <li>Trusted by thousands of clients worldwide.</li>
                  <li>Transparent pricing with no hidden fees.</li>
                  <li>Comprehensive support for due diligence and documentation.</li>
                  <li>Proven track record in securing approvals.</li>
                </ul>
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <Button className="bg-[#cba135] hover:bg-[#b3922f] text-white text-sm w-full sm:w-auto">
                    Start Application
                  </Button>
                  <Button variant="outline" className="text-[#183b4e] border-[#183b4e] hover:bg-[#183b4e] hover:text-white text-sm w-full sm:w-auto">
                    Check Eligibility
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Program Info */}
            <div>
              <h1 className="text-2xl font-bold text-[#cba135] mb-2">{program.title}</h1>
              <p className="text-base text-gray-600 leading-relaxed">{program.description}</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-3 bg-gray-50 rounded-xl shadow-sm">
                <DollarSign className="w-4 h-4 text-gold mx-auto mb-1" />
                <p className="text-xs text-[#cba135]">Investment</p>
                <p className="font-bold text-[#183b4e] text-sm">{program.minInvestment}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl shadow-sm">
                <Clock className="w-4 h-4 text-gold mx-auto mb-1" />
                <p className="text-xs text-[#cba135]">Processing</p>
                <p className="font-bold text-[#183b4e] text-sm">{program.processingTime}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl shadow-sm">
                <Globe className="w-4 h-4 text-gold mx-auto mb-1" />
                <p className="text-xs text-[#cba135]">Location</p>
                <p className="font-bold text-[#183b4e] text-sm">{program.countries[0] || program.continent}</p>
              </div>
            </div>

            {/* Book Consultation Button */}
            <Button className="bg-[#183b4e] hover:bg-[#142f3d] text-white text-sm w-full flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-2" />
              Book Consultation
            </Button>

            {/* Program Benefits */}
            <section className="py-4 bg-gray-100 rounded-2xl shadow-sm">
              <div className="px-4">
                <h2 className="text-lg font-bold text-[#cba135] mb-4">Program Benefits</h2>
                <div className="grid grid-cols-1 gap-3">
                  {benefitsWithDescriptions?.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="p-3 bg-white rounded-xl shadow-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-gold mb-2" />
                      <h3 className="text-sm font-bold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-xs text-gray-600">{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Cost Calculator */}
            {program.calculator && (
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center text-[#cba135]">
                    <Calculator className="w-5 h-5 mr-2 text-gold" />
                    Cost Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Family Members</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setFamilyMembers(prev => Math.max(0, prev - 1))}
                        className="h-8 w-8"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-base font-medium">{familyMembers}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setFamilyMembers(prev => prev + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Base Investment</span>
                      <span>{formatCurrency(program.calculator.baseCost, program.calculator.currency)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Family Members ({familyMembers})</span>
                      <span>{formatCurrency(familyMembers * program.calculator.familyMemberCost, program.calculator.currency)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Government Fees</span>
                      <span>{formatCurrency(program.calculator.governmentFees, program.calculator.currency)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Legal Fees</span>
                      <span>{formatCurrency(program.calculator.legalFees, program.calculator.currency)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Due Diligence Fees</span>
                      <span>{formatCurrency(program.calculator.dueDiligenceFees, program.calculator.currency)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base pt-2 border-t">
                      <span>Total Cost</span>
                      <span>{formatCurrency(totalCost, program.calculator.currency)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Payment Options</span>
                    <div className="flex space-x-2">
                      <CreditCard className="w-4 h-4 text-gray-500" />
                      <Bitcoin className="w-4 h-4 text-gray-500" />
                      <Banknote className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Application Process */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex text-[#cba135] items-center">
                  <Globe className="w-5 h-5 mr-2 text-[#183b4e]" />
                  Application Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {applicationProcess.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={index} className="flex items-center p-2 bg-gray-50 rounded-xl">
                        <Icon className="w-5 h-5 text-[#183b4e] mr-2" />
                        <span className="text-sm text-gray-700">{step.step}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Required Documents */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex text-[#cba135] items-center">
                  <Users className="w-5 h-5 mr-2 text-[#183b4e]" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {requiredDocuments.map((doc, index) => {
                    const Icon = doc.icon;
                    return (
                      <div key={index} className="flex items-center p-2 bg-gray-50 rounded-xl">
                        <Icon className="w-5 h-5 text-[#183b4e] mr-2" />
                        <span className="text-sm text-gray-700">{doc.name}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Eligibility Criteria */}
            {program.eligibilityCriteria && (
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex text-[#cba135] items-center">
                    <FileText className="w-5 h-5 mr-2 text-[#183b4e]" />
                    Eligibility Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {eligibilityCriteria.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="flex items-center p-2 bg-gray-50 rounded-xl">
                          <Icon className="w-5 h-5 text-[#183b4e] mr-2" />
                          <span className="text-sm text-gray-700">{item.criterion}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-6">
            {/* Left Column: Image Gallery, Why Choose Raizing Sovereign, Application Process, Required Documents, Eligibility Criteria */}
            <div className="space-y-4">
              {/* Image Gallery */}
              <div className="relative rounded-2xl overflow-hidden shadow-md">
                <div className="relative h-80">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={program.images?.[currentImageIndex] || program.image}
                      alt={program.title}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-3 rounded-full shadow-sm hover:bg-white transition-colors pointer-events-auto"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-3 rounded-full shadow-sm hover:bg-white transition-colors pointer-events-auto"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 pointer-events-none">
                    {program.images?.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        } pointer-events-auto`}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-white/90 text-gray-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                  {program.continent}
                </div>
              </div>

              {/* Why Choose Raizing Sovereign */}
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex text-[#cba135] items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-[#183b4e]" />
                    Why Choose Raizing Sovereign
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700 list-disc pl-4">
                    <li>Expert guidance through every step of the process.</li>
                    <li>Trusted by thousands of clients worldwide.</li>
                    <li>Transparent pricing with no hidden fees.</li>
                    <li>Comprehensive support for due diligence and documentation.</li>
                    <li>Proven track record in securing approvals.</li>
                  </ul>
                  <div className="mt-4 flex gap-2">
                    <Button className="bg-[#cba135] hover:bg-[#b3922f] text-white text-sm">
                      Start Application
                    </Button>
                    <Button variant="outline" className="text-[#183b4e] border-[#183b4e] hover:bg-[#183b4e] hover:text-white text-sm">
                      Check Eligibility
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Application Process */}
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex text-[#cba135] items-center">
                    <Globe className="w-5 h-5 mr-2 text-[#183b4e]" />
                    Application Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {applicationProcess.map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <div key={index} className="flex items-center p-2 bg-gray-50 rounded-xl">
                          <Icon className="w-5 h-5 text-[#183b4e] mr-2" />
                          <span className="text-sm text-gray-700">{step.step}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Required Documents */}
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex text-[#cba135] items-center">
                    <Users className="w-5 h-5 mr-2 text-[#183b4e]" />
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {requiredDocuments.map((doc, index) => {
                      const Icon = doc.icon;
                      return (
                        <div key={index} className="flex items-center p-2 bg-gray-50 rounded-xl">
                          <Icon className="w-5 h-5 text-[#183b4e] mr-2" />
                          <span className="text-sm text-gray-700">{doc.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Eligibility Criteria */}
              {program.eligibilityCriteria && (
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex text-[#cba135] items-center">
                      <FileText className="w-5 h-5 mr-2 text-[#183b4e]" />
                      Eligibility Criteria
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {eligibilityCriteria.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <div key={index} className="flex items-center p-2 bg-gray-50 rounded-xl">
                            <Icon className="w-5 h-5 text-[#183b4e] mr-2" />
                            <span className="text-sm text-gray-700">{item.criterion}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column: Program Info, Quick Stats, Book Consultation, Benefits, Calculator */}
            <div className="space-y-4">
              {/* Program Info */}
              <div>
                <h1 className="text-3xl font-bold text-[#cba135] mb-2">{program.title}</h1>
                <p className="text-base text-gray-600 leading-relaxed">{program.description}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-3 bg-gray-50 rounded-xl shadow-sm">
                  <DollarSign className="w-4 h-4 text-gold mx-auto mb-1" />
                  <p className="text-xs text-[#cba135]">Investment</p>
                  <p className="font-bold text-[#183b4e] text-sm">{program.minInvestment}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl shadow-sm">
                  <Clock className="w-4 h-4 text-gold mx-auto mb-1" />
                  <p className="text-xs text-[#cba135]">Processing</p>
                  <p className="font-bold text-[#183b4e] text-sm">{program.processingTime}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl shadow-sm">
                  <Globe className="w-4 h-4 text-gold mx-auto mb-1" />
                  <p className="text-xs text-[#cba135]">Location</p>
                  <p className="font-bold text-[#183b4e] text-sm">{program.countries[0] || program.continent}</p>
                </div>
              </div>

              {/* Book Consultation Button */}
              <Button className="bg-[#183b4e] hover:bg-[#142f3d] text-white text-sm w-full flex items-center justify-center">
                <Calendar className="w-4 h-4 mr-2" />
                Book Consultation
              </Button>

              {/* Program Benefits */}
              <section className="py-4 bg-gray-100 rounded-2xl shadow-sm">
                <div className="px-4">
                  <h2 className="text-lg font-bold text-[#cba135] mb-4">Program Benefits</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {benefitsWithDescriptions?.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="p-3 bg-white rounded-xl shadow-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-gold mb-2" />
                        <h3 className="text-sm font-bold text-gray-900 mb-1">{benefit.title}</h3>
                        <p className="text-xs text-gray-600">{benefit.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Cost Calculator */}
              {program.calculator && (
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center text-[#cba135]">
                      <Calculator className="w-5 h-5 mr-2 text-gold" />
                      Cost Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Family Members</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setFamilyMembers(prev => Math.max(0, prev - 1))}
                          className="h-8 w-8"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-base font-medium">{familyMembers}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setFamilyMembers(prev => prev + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Base Investment</span>
                        <span>{formatCurrency(program.calculator.baseCost, program.calculator.currency)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Family Members ({familyMembers})</span>
                        <span>{formatCurrency(familyMembers * program.calculator.familyMemberCost, program.calculator.currency)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Government Fees</span>
                        <span>{formatCurrency(program.calculator.governmentFees, program.calculator.currency)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Legal Fees</span>
                        <span>{formatCurrency(program.calculator.legalFees, program.calculator.currency)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Due Diligence Fees</span>
                        <span>{formatCurrency(program.calculator.dueDiligenceFees, program.calculator.currency)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-base pt-2 border-t">
                        <span>Total Cost</span>
                        <span>{formatCurrency(totalCost, program.calculator.currency)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Payment Options</span>
                      <div className="flex space-x-2">
                        <CreditCard className="w-4 h-4 text-gray-500" />
                        <Bitcoin className="w-4 h-4 text-gray-500" />
                        <Banknote className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}