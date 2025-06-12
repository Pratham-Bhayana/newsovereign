import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { ArrowLeft, Clock, DollarSign, Users, CheckCircle, Globe, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PROGRAMS } from "@/lib/constants";

export default function ProgramDetailPage() {
  const { id } = useParams();
  const program = PROGRAMS.find(p => p.id === id);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    <div>
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <Link href="/programs">
                <button className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Programs
                </button>
              </Link>
              <h1 className="text-5xl lg:text-6xl font-bold mb-4">{program.title}</h1>
              <p className="text-xl text-gray-200 max-w-2xl">{program.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Key Information Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-lg">
                      <DollarSign className="w-5 h-5 mr-2 text-gold" />
                      Investment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-gray-900">From {program.minInvestment}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-lg">
                      <Clock className="w-5 h-5 mr-2 text-gold" />
                      Processing Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-gray-900">{program.processingTime}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-lg">
                      <Globe className="w-5 h-5 mr-2 text-gold" />
                      Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-gray-900">{program.countries[0]}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Program Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Program Benefits</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {program.benefits?.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <CheckCircle className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Investment Options */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Investment Options</h2>
                <div className="space-y-6">
                  {program.continent === "Europe" && (
                    <>
                      <Card>
                        <CardHeader>
                          <CardTitle>Real Estate Investment</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4">
                            Purchase residential or commercial real estate in qualifying areas.
                          </p>
                          <Badge variant="outline">Minimum: {program.minInvestment}</Badge>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Government Bonds</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4">
                            Investment in government-approved bonds with guaranteed returns.
                          </p>
                          <Badge variant="outline">5-year commitment</Badge>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  
                  {program.continent === "Caribbean" && (
                    <>
                      <Card>
                        <CardHeader>
                          <CardTitle>Government Donation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4">
                            Non-refundable contribution to the National Development Fund.
                          </p>
                          <Badge variant="outline">From {program.minInvestment}</Badge>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Real Estate Option</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4">
                            Investment in pre-approved real estate developments.
                          </p>
                          <Badge variant="outline">5-year holding period</Badge>
                        </CardContent>
                      </Card>
                    </>
                  )}

                  {program.continent === "Americas" && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Job-Creating Enterprise</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Investment in new commercial enterprises that create jobs for qualifying workers.
                        </p>
                        <Badge variant="outline">10 jobs required</Badge>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </motion.div>

              {/* Process Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Application Process</h2>
                <div className="space-y-6">
                  {[
                    "Initial Consultation & Assessment",
                    "Document Preparation & Due Diligence",
                    "Application Submission",
                    "Government Review & Processing",
                    "Approval & Citizenship/Residency Grant"
                  ].map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-dark font-bold mr-4 mt-1">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{step}</h3>
                        <p className="text-gray-600 text-sm">
                          {index === 0 && "Comprehensive evaluation of your profile and investment goals."}
                          {index === 1 && "Preparation of all required documents and background checks."}
                          {index === 2 && "Formal submission to government authorities."}
                          {index === 3 && "Official review and assessment by immigration authorities."}
                          {index === 4 && "Final approval and issuance of citizenship or residency."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Facts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Continent</span>
                    <span className="font-semibold">{program.continent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min. Investment</span>
                    <span className="font-semibold">{program.minInvestment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing</span>
                    <span className="font-semibold">{program.processingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Family Inclusion</span>
                    <span className="font-semibold">Yes</span>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Card */}
              <Card className="bg-gradient-to-br from-primary to-blue-600 text-white">
                <CardHeader>
                  <CardTitle className="text-white">Ready to Start?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 mb-6">
                    Schedule a free consultation with our experts to discuss your {program.title} application.
                  </p>
                  <Button asChild className="w-full gold-gradient text-dark hover:shadow-lg">
                    <Link href="/consultation">
                      Book Free Consultation
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Why Choose Us */}
              <Card>
                <CardHeader>
                  <CardTitle>Why Choose Raizing Sovereign?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-gold mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">100% Success Rate</h4>
                      <p className="text-sm text-gray-600">All approved applications processed successfully</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="w-5 h-5 text-gold mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Expert Team</h4>
                      <p className="text-sm text-gray-600">15+ years of immigration law experience</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <TrendingUp className="w-5 h-5 text-gold mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Fast Processing</h4>
                      <p className="text-sm text-gray-600">Streamlined process for quicker results</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}