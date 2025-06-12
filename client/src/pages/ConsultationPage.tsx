import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function ConsultationPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Schedule Consultation</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto">
              Book a free consultation with our experts to discuss your citizenship and residency goals.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 p-8 lg:p-12 rounded-3xl shadow-2xl"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    required
                    placeholder="Enter your first name"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    required
                    placeholder="Enter your last name"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    placeholder="Enter your phone"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="nationality">Current Nationality</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="program">Program of Interest</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portugal">Portugal Golden Visa</SelectItem>
                    <SelectItem value="cyprus">Cyprus Investment Program</SelectItem>
                    <SelectItem value="malta">Malta Citizenship Program</SelectItem>
                    <SelectItem value="stkitts">St. Kitts & Nevis</SelectItem>
                    <SelectItem value="dominica">Dominica</SelectItem>
                    <SelectItem value="grenada">Grenada</SelectItem>
                    <SelectItem value="other">Other/Undecided</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Preferred Time</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9-10">9:00 AM - 10:00 AM</SelectItem>
                      <SelectItem value="10-11">10:00 AM - 11:00 AM</SelectItem>
                      <SelectItem value="11-12">11:00 AM - 12:00 PM</SelectItem>
                      <SelectItem value="14-15">2:00 PM - 3:00 PM</SelectItem>
                      <SelectItem value="15-16">3:00 PM - 4:00 PM</SelectItem>
                      <SelectItem value="16-17">4:00 PM - 5:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="budget">Investment Budget Range</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100-250">$100,000 - $250,000</SelectItem>
                    <SelectItem value="250-500">$250,000 - $500,000</SelectItem>
                    <SelectItem value="500-1000">$500,000 - $1,000,000</SelectItem>
                    <SelectItem value="1000-2000">$1,000,000 - $2,000,000</SelectItem>
                    <SelectItem value="2000+">$2,000,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="message">Additional Information</Label>
                <Textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your specific requirements, timeline, or any questions you have"
                  className="mt-2"
                />
              </div>
              
              <div className="text-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="gold-gradient text-dark hover:shadow-xl smooth-transition hover-lift"
                >
                  Schedule Free Consultation
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
