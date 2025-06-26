import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Phone, MessageCircle, CheckCircle } from "lucide-react";
import { auth } from "@/lib/firebaseConfig";
import { useLocation } from "wouter";

function CalendlyEmbed() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget rounded-2xl"
      data-url="https://calendly.com/pratham-bhayana-ai/30min"
      style={{ minWidth: "320px", height: "700px" }}
    ></div>
  );
}

export default function ConsultationPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    mobile: "",
    consultationType: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [userName, setUserName] = useState<string>("User");
  const [, navigate] = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserName(user.displayName || user.email?.split("@")[0] || "User");
      } else {
        setIsAuthenticated(false);
        navigate("/login?redirect=/consultation");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000);
    setFormData({ mobile: "", consultationType: "" });
  };

  const popupVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.5 } },
  };

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 bg-gradient-to-br from-[#183b4e] to-[#0f2630] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Schedule Your Consultation</h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Connect with our experts to explore your citizenship and residency options.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-2xl shadow-lg space-y-6"
            >
              <h2 className="text-2xl font-semibold text-[#183b4e]">Book Through Calendly</h2>
              <CalendlyEmbed />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-2xl shadow-lg space-y-6"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="mobile" className="text-[#183b4e]">
                    Mobile Number *
                  </Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    required
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="mt-2 text-[#183b4e] border-[#cba135] focus:ring-[#cba135] rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="consultationType" className="text-[#183b4e]">
                    Consultation Type *
                  </Label>
                  <Select
                    value={formData.consultationType}
                    onValueChange={handleSelectChange("consultationType")}
                  >
                    <SelectTrigger className="mt-2 text-[#183b4e] border-[#cba135] focus:ring-[#cba135] rounded-lg">
                      <SelectValue placeholder="Select consultation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="walkin">Walk-in</SelectItem>
                      <SelectItem value="call">Phone Call</SelectItem>
                      <SelectItem value="video">Video Call</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#cba135] hover:bg-[#b3922f] text-[#183b4e] rounded-2xl"
                  disabled={!formData.mobile || !formData.consultationType}
                >
                  Schedule Consultation
                </Button>
              </form>

              <div className="flex items-center justify-between bg-[#F9FAFB] p-4 rounded-2xl">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-[#cba135] mr-2" />
                  <span className="text-[#183b4e] font-medium">Call Us Now</span>
                </div>
                <a href="tel:+918595873470" className="text-[#cba135] hover:underline">
                  +91 8595834700
                </a>
              </div>

              <div className="relative bg-green-600 text-white p-4 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <MessageCircle className="w-full h-full" />
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <span className="font-medium">Drop Us a Message</span>
                  <a
                    href="https://wa.me/+918595873470"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#cba135]"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-4 right-4 bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow-xl border border-[#cba135] max-w-sm"
          >
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-[#cba135] mr-2 mt-1" />
              <div>
                <p className="text-[#183b4e] font-semibold">
                  Dear {userName}, Appointment Booked!
                </p>
                <p className="text-sm text-[#183b4e]">
                  Your {formData.consultationType.replace(/^[a-z]/, (c) => c.toUpperCase())} consultation details will be sent to your email.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
