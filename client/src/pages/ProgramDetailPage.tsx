import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "wouter";
import { ArrowLeft, Clock, DollarSign, Users, CheckCircle, Globe, Shield, TrendingUp, ChevronLeft, ChevronRight, Calculator, Plus, Minus, CreditCard, Bitcoin, Banknote } from "lucide-react";
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
      case "work authorization":
        return { title: benefit, description: "Legally work and operate businesses in the country." };
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
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/programs">
            <button className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back to Programs</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column: Image Gallery, Benefits, Application Process, Documents */}
            <div className="space-y-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative">
                  {/* Mobile: Single image with swipe */}
                  <div className="md:hidden">
                    <div className="relative h-64 rounded-2xl overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImageIndex}
                          src={program.images?.[currentImageIndex] || program.image}
                          alt={program.title}
                          className="w-full h-full object-cover"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </AnimatePresence>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {program.images?.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Gallery layout */}
                  <div className="hidden md:block">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="row-span-2">
                        <img
                          src={program.images?.[0] || program.image}
                          alt={program.title}
                          className="w-full h-80 object-cover rounded-2xl"
                        />
                      </div>
                      {program.images?.slice(1, 5).map((image, index) => (
                        <div key={index} className="h-[9.5rem]">
                          <img
                            src={image}
                            alt={`${program.title} ${index + 2}`}
                            className="w-full h-full object-cover rounded-2xl"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Program Benefits */}
              <section className="py-8 bg-gray-100  rounded-2xl">
                <div className="px-6">
                  <h2 className="text-1xl font-bold text-[#cba135] mb-8">Program Benefits</h2>
                  <div className="grid flex sm: revrese-cols md:grid-cols-3 gap-6 ">
                    {benefitsWithDescriptions?.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-6 bg-white  rounded-xl shadow-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-gold mb-4" />
                        <h3 className="text-sm font-bold text-gray-900 mb-2">{benefit.title}</h3>
                        {/* <p className="text-gray-600">{benefit.description}</p> */}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Application Process */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-1xl flex text-[#cba135] items-center">
                    <Globe className="w-6 h-6 mr-2 text-[#183b4e]" />
                    Application Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4 text-sm text-gray-700 list-decimal pl-6">
                    <li>Book a consultation with our experts.</li>
                    <li>Submit required documents and complete due diligence.</li>
                    <li>Make the qualifying investment.</li>
                    <li>Receive approval and residency/citizenship documents.</li>
                  </ol>
                </CardContent>
              </Card>

              {/* Required Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-1xl flex text-[#cba135] items-center">
                    <Users className="w-6 h-6 mr-2 text-[#183b4e]" />
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 text-sm text-gray-700 list-disc pl-6">
                    <li>Valid passport copies</li>
                    <li>Financial statements</li>
                    <li>Police clearance certificate</li>
                    <li>Proof of investment funds</li>
                    <li>Birth and marriage certificates (if applicable)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Program Info, Calculator, Why Choose Us, Payment Options */}
            <div className="space-y-8">
              {/* Program Info */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-[#cba135] mb-3">{program.title}</h1>
                <p className="text-lg text-gray-600 leading-relaxed">{program.description}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <DollarSign className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-sm text-[#cba135]">Investment</p>
                  <p className="font-bold text-[#183b4e]">{program.minInvestment}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Clock className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-sm text-[#cba135]">Processing</p>
                  <p className="font-bold text-[#183b4e]">{program.processingTime}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Globe className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-sm text-[#cba135]">Location</p>
                  <p className="font-bold text-[#183b4e]">{program.countries[0]}</p>
                </div>
              </div>

              {/* Cost Calculator */}
              {program.calculator && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-[#cba135]">
                      <Calculator className="w-5 h-5 mr-2 text-gold" />
                      Cost Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Family Members</span>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setFamilyMembers(Math.max(0, familyMembers - 1))}
                          disabled={familyMembers === 0}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{familyMembers}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setFamilyMembers(familyMembers + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Base Investment</span>
                        <span>{formatCurrency(program.calculator.baseCost, program.calculator.currency)}</span>
                      </div>
                      {familyMembers > 0 && (
                        <div className="flex justify-between">
                          <span>Family Members ({familyMembers})</span>
                          <span>{formatCurrency(familyMembers * program.calculator.familyMemberCost, program.calculator.currency)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Government Fees</span>
                        <span>{formatCurrency(program.calculator.governmentFees, program.calculator.currency)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Legal & Due Diligence</span>
                        <span>{formatCurrency(program.calculator.legalFees + program.calculator.dueDiligenceFees, program.calculator.currency)}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Estimated Cost</span>
                        <span className="text-gold">{formatCurrency(totalCost, program.calculator.currency)}</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-[#183b4e]  text-white hover:bg-[#cba135]">
                      <Link href="/apply">Start Application</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Why Choose Us */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-1xl flex text-[#cba135] font-bold items-center">
                    
                    Why Choose Raizing Sovereign?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start">
                    <Shield className="w-8 h-8 text-[#004225] mr-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-[#183b4e] mb-2">100% Success Rate</h3>
                      <p className="text-gray-600 text-sm">All approved applications processed successfully.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="w-8 h-8 text-[#004225] mr-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-[#183b4e] mb-2">Expert Team</h3>
                      <p className="text-gray-600 text-sm">15+ years of immigration law experience.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <TrendingUp className="w-8 h-8 text-[#004225] mr-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-[#183b4e] mb-2">Fast Processing</h3>
                      <p className="text-gray-600 text-sm">Streamlined process for quicker results.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-1xl flex text-[#cba135] font-bold items-center">
                    {/* <CreditCard className="w-5 h-5 mr-2 text-gold" /> */}
                    Payment Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start">
                    <Banknote className="w-8 h-8 text-[#004225] mr-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-[#183b4e] mb-2">Bank Transfer</h3>
                      <p className="text-gray-600">Securely transfer funds via international wire transfer.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CreditCard className="w-8 h-8 text-[#004225] mr-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-[#183b4e] mb-2">Credit Card</h3>
                      <p className="text-gray-600">Pay conveniently using major credit cards.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Bitcoin className="w-8 h-8 text-[#004225] mr-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-[#183b4e] mb-2">Cryptocurrency</h3>
                      <p className="text-gray-600">Use Bitcoin or Ethereum for modern, secure payments.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Mobile Footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Estimated Cost</p>
            <p className="font-bold text-lg text-gray-900">
              {program.calculator ? formatCurrency(totalCost, program.calculator.currency) : program.minInvestment}
            </p>
            <p className="text-xs text-gray-500">Process: {program.processingTime}</p>
          </div>
          <Button asChild className="gold-gradient text-dark px-8">
            <Link href="/consultation">Book Consultation</Link>
          </Button>
        </div>
      </div>

      {/* Bottom padding for mobile footer */}
      <div className="md:hidden h-24"></div>
    </div>
  );
}