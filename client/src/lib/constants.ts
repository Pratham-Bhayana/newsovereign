import { FileText, Home, TrendingUp, Handshake, Shirt, Coffee, Laptop, Crown, Book, Briefcase } from "lucide-react";
import { title } from "process";

export const PROGRAMS = [

  
  // caribbean Citizenship
    {
    id: "Caribbean Citizenship",
    continent: "Caribbean",
    countries: ["Acquire second citizenship in beautiful Caribbean nations through fast, secure investment routes with minimal residency requirements."],
    
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    title: "Caribbean Citizenship",
    description: "Investment from €280,000. Path to EU citizenship in 5 years. Schengen area access and high quality of life.",
    minInvestment: "€280,000",
    processingTime: "6-12 months",
    benefits: ["EU residence permit", "Path to citizenship in 5 years", "Schengen area access", "Low physical presence requirement", "Family inclusion"]
  },

    // LATIN Citizenship
    {
    id: "Latin America",
    continent: "Latin America",
    countries: ["Explore Citizenship and Residency Opportunities in a Region Rich with Adventure, Growth, and Investment Potential."],
    
    image: "https://media.travelbag.co.uk/media/eu1bcsoi/palacio-de-bellas-artes-palace-of-fine-arts-mexico-city.jpg?rxy=0.45666666666666667,0.3575&rmode=Crop&quality=80&width=1280&height=704&format=webp",
    title: "Latin America",
    description: "Investment from €280,000. Path to EU citizenship in 5 years. Schengen area access and high quality of life.",
    minInvestment: "€280,000",
    processingTime: "6-12 months",
    benefits: ["EU residence permit", "Path to citizenship in 5 years", "Schengen area access", "Low physical presence requirement", "Family inclusion"]
  },
 // euro
    {
    id: "European Residency",
    continent: "European Residency",
    countries: ["Gain access to the EU through trusted investment programs offering pathways to permanent residency and citizenship."],
    
    image: "https://images.goway.com/production/styles/hero_s1_3xl/s3/hero_image/Budapest%20Hungary_iStock-1396819994.jpg?h=0acbf16e&itok=vRbaFpXc",
    title: "European Residency",
    description: "Investment from €280,000. Path to EU citizenship in 5 years. Schengen area access and high quality of life.",
    minInvestment: "€280,000",
    processingTime: "6-12 months",
    benefits: ["EU residence permit", "Path to citizenship in 5 years", "Schengen area access", "Low physical presence requirement", "Family inclusion"]
  },
    // panama
      {
    id: "Panama Travel Passport",
    continent: "Panama Travel Passport",
    countries: ["Panama offers the Traveler Passport through its Private Income Retiree Visa—ideal for those from countries restricting dual citizenship."],
    
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    title: "European Residency",
    description: "Investment from €280,000. Path to EU citizenship in 5 years. Schengen area access and high quality of life.",
    minInvestment: "€280,000",
    processingTime: "6-12 months",
    benefits: ["EU residence permit", "Path to citizenship in 5 years", "Schengen area access", "Low physical presence requirement", "Family inclusion"]
  },

  //Asian & Middle East

        {
    id: "Asian & Middle East",
    continent: "Asian & Middle East",
    countries: ["Residency and Citizenship Where Tradition Meets Global Opportunity."],
    
    image: "https://media.assettype.com/outlooktraveller%2F2024-04%2F0b666b33-a122-4c3a-b06a-49767ab477a4%2Fshutterstock_1058991356.jpg?w=480&auto=format%2Ccompress&fit=max",
    title: "Asian & Middle East",
    description: "Investment from €280,000. Path to EU citizenship in 5 years. Schengen area access and high quality of life.",
    minInvestment: "€280,000",
    processingTime: "6-12 months",
    benefits: ["EU residence permit", "Path to citizenship in 5 years", "Schengen area access", "Low physical presence requirement", "Family inclusion"]
  },

  // DUBAI

          {
    id: "Dubai Golden Visat",
    continent: "Dubai Golden Visa",
    countries: ["10-year residency with unlimited entry/exits, world-class healthcare access, and no local sponsor required."],
    
    image: "https://static.independent.co.uk/2025/02/19/12/52/iStock-1453583308.jpg",
    title: "Dubai Golden Visa",
    description: "Investment from €280,000. Path to EU citizenship in 5 years. Schengen area access and high quality of life.",
    minInvestment: "€280,000",
    processingTime: "6-12 months",
    benefits: ["EU residence permit", "Path to citizenship in 5 years", "Schengen area access", "Low physical presence requirement", "Family inclusion"]
  },

  {
    id: "portugal-golden-visa",
    continent: "Europe",
    countries: [""],
    
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Portugal Golden Visa",
    description: "Investment from €280,000. Path to EU citizenship in 5 years. Schengen area access and high quality of life.",
    minInvestment: "€280,000",
    processingTime: "6-12 months",
    benefits: ["EU residence permit", "Path to citizenship in 5 years", "Schengen area access", "Low physical presence requirement", "Family inclusion"]
  },
  // Malta
  {
    id: "malta-citizenship",
    continent: "Europe", 
    countries: ["Malta"],
    image: "https://assets.vogue.com/photos/599365b2f0b0e21484d3436e/master/w_2560%2Cc_limit/00-lede-a-travel-guide-to-malta.jpg",
    title: "Malta Citizenship Program",
    description: "Exceptional program combining investment, donation, and residency. Premium EU citizenship option.",
    minInvestment: "€690,000",
    processingTime: "12-36 months",
    benefits: ["EU citizenship directly", "Visa-free travel to 185+ countries", "Premium healthcare and education", "Strategic business location", "Tax advantages"]
  },
  // Cyprus
  {
    id: "cyprus-investment",
    continent: "Europe",
    countries: ["Cyprus"],
    image: "https://media.assettype.com/outlooktraveller%2F2024-04%2F0b666b33-a122-4c3a-b06a-49767ab477a4%2Fshutterstock_1058991356.jpg?w=480&auto=format%2Ccompress&fit=max",
    title: "Cyprus Investment Program", 
    description: "Premium investment program with fast processing. EU passport and business opportunities in strategic location.",
    minInvestment: "€2,000,000",
    processingTime: "3-6 months",
    benefits: ["EU passport", "No residency requirement", "Tax benefits", "Strategic location", "High-quality lifestyle"]
  },
  // Greece
  {
    id: "greece-golden-visa",
    continent: "Europe",
    countries: ["Greece"],
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Greece Golden Visa",
    description: "Affordable European residency through real estate investment. Gateway to EU with rich history and culture.",
    minInvestment: "€250,000",
    processingTime: "3-6 months",
    benefits: ["EU residence permit", "No minimum stay requirement", "Family inclusion", "Schengen access", "Affordable investment"]
  },
  // Spain
  {
    id: "spain-golden-visa",
    continent: "Europe",
    countries: ["Spain"],
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Spain Golden Visa",
    description: "Residence by investment in one of Europe's most popular destinations. Rich culture and excellent climate.",
    minInvestment: "€500,000",
    processingTime: "4-8 months",
    benefits: ["EU residence permit", "Path to permanent residency", "Family inclusion", "Work authorization", "Excellent lifestyle"]
  },
  // Italy
  {
    id: "italy-investor-visa",
    continent: "Europe", 
    countries: ["Italy"],
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Italy Investor Visa",
    description: "Innovative startup and investment opportunities in the heart of Europe. Rich heritage and business culture.",
    minInvestment: "€500,000",
    processingTime: "6-12 months",
    benefits: ["EU residence permit", "Startup ecosystem access", "Cultural heritage", "Business opportunities", "Strategic location"]
  },
  // St. Kitts & Nevis
  {
    id: "st-kitts-nevis",
    continent: "Caribbean",
    countries: ["St. Kitts & Nevis"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "St. Kitts & Nevis",
    description: "The world's oldest citizenship by investment program. Fast processing and visa-free travel to 150+ countries.",
    minInvestment: "$150,000",
    processingTime: "3-6 months",
    benefits: ["World's oldest CBI program", "150+ visa-free destinations", "No income tax", "Fast processing", "Stable democracy"]
  },
  // Dominica
  {
    id: "dominica-citizenship",
    continent: "Caribbean",
    countries: ["Dominica"],
    image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Dominica Citizenship",
    description: "Most affordable citizenship program with strong passport. Known for its natural beauty and stability.",
    minInvestment: "$100,000",
    processingTime: "3-4 months",
    benefits: ["Most affordable CBI", "140+ visa-free destinations", "Natural beauty", "Stable government", "Quick processing"]
  },
  // Grenada
  {
    id: "grenada-citizenship",
    continent: "Caribbean",
    countries: ["Grenada"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Grenada Citizenship",
    description: "Unique E-2 treaty access to USA. Beautiful island nation with growing economy and tourism sector.",
    minInvestment: "$150,000",
    processingTime: "4-6 months", 
    benefits: ["US E-2 visa access", "140+ visa-free countries", "Growing economy", "Tourism opportunities", "Commonwealth membership"]
  },
  // Antigua & Barbuda
  {
    id: "antigua-barbuda",
    continent: "Caribbean",
    countries: ["Antigua & Barbuda"],
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Antigua & Barbuda",
    description: "Caribbean citizenship with excellent visa-free travel. Known for pristine beaches and friendly culture.",
    minInvestment: "$100,000",
    processingTime: "3-6 months",
    benefits: ["150+ visa-free destinations", "No interview requirement", "Family inclusion", "Tax benefits", "Beautiful Caribbean lifestyle"]
  },
  // St. Lucia
  {
    id: "st-lucia-citizenship",
    continent: "Caribbean", 
    countries: ["St. Lucia"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "St. Lucia Citizenship",
    description: "Newest Caribbean citizenship program with competitive investment options and excellent passport strength.",
    minInvestment: "$100,000",
    processingTime: "6-10 months",
    benefits: ["140+ visa-free destinations", "Competitive pricing", "Multiple investment options", "Family inclusion", "Stable jurisdiction"]
  },
  // Turkey
  {
    id: "turkey-citizenship",
    continent: "Europe/Asia",
    countries: ["Turkey"],
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Turkey Citizenship",
    description: "Strategic location between Europe and Asia. Fast-growing economy with excellent investment opportunities.",
    minInvestment: "$400,000",
    processingTime: "3-6 months",
    benefits: ["Strategic location", "Fast-growing economy", "Real estate investment", "Family inclusion", "110+ visa-free destinations"]
  },
  // UAE (Dubai)
  {
    id: "uae-golden-visa",
    continent: "Middle East",
    countries: ["United Arab Emirates"],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "UAE Golden Visa",
    description: "Long-term residency in one of the world's most dynamic business hubs. Tax-free living and world-class infrastructure.",
    minInvestment: "$545,000",
    processingTime: "2-4 months",
    benefits: ["10-year renewable visa", "Tax-free income", "World-class infrastructure", "Business hub access", "Family sponsorship"]
  },
  // Canada
  {
    id: "canada-investor",
    continent: "Americas",
    countries: ["Canada"],
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Canada Investor Program",
    description: "Pathway to Canadian permanent residence through provincial programs. High quality of life and excellent education.",
    minInvestment: "CAD $400,000",
    processingTime: "18-36 months",
    benefits: ["Permanent residence", "Path to citizenship", "Universal healthcare", "Excellent education", "High quality of life"]
  },
  // USA EB-5
  {
    id: "usa-eb5",
    continent: "Americas",
    countries: ["United States"],
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "USA EB-5 Program",
    description: "Green card through investment in job-creating enterprises. Access to the world's largest economy.",
    minInvestment: "$800,000",
    processingTime: "24-60 months",
    benefits: ["US Green Card", "Path to citizenship", "Work authorization", "Education access", "World's largest economy"]
  },
  // Australia
  {
    id: "australia-investor",
    continent: "Oceania",
    countries: ["Australia"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Australia Investor Visa",
    description: "Significant investor visa for high-net-worth individuals. Excellent lifestyle and business opportunities.",
    minInvestment: "AUD $2,500,000",
    processingTime: "12-24 months",
    benefits: ["Temporary residence", "Path to permanent residence", "Business opportunities", "Excellent lifestyle", "Strategic Asia-Pacific location"]
  },
  // Singapore
  {
    id: "singapore-investor",
    continent: "Asia",
    countries: ["Singapore"],
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Singapore Investor Program",
    description: "Global Investor Programme for ultra-high-net-worth individuals. Gateway to Asia's financial hub.",
    minInvestment: "SGD $2,500,000",
    processingTime: "12-18 months",
    benefits: ["Permanent residence", "Global financial hub", "Strategic location", "Excellent infrastructure", "Tax efficiency"]
  }
];

export const SERVICES = [
  {
    id: "citizenship",
    title: "Citizenship by Investment",
    description: "Fast-track citizenship programs through strategic investments in qualifying countries.",
    icon: FileText,
    color: "gold-gradient"
  },
  {
    id: "residency",
    title: "Residency Programs",
    description: "Secure permanent residency through various investment and qualification pathways.",
    icon: Home,
    color: "bg-primary"
  },
  {
    id: "advisory",
    title: "Investment Advisory",
    description: "Expert guidance on investment opportunities and portfolio management strategies.",
    icon: TrendingUp,
    color: "bg-green-600"
  },
  {
    id: "additional",
    title: "Additional Services",
    description: "Legal support, document preparation, and comprehensive migration assistance.",
    icon: Handshake,
    color: "bg-purple-600"
  }
];

export const TESTIMONIALS = [
  {
    id: "1",
    name: "Sarah Johnson",
    program: "Portugal Golden Visa",
    content: "The process was seamless and professional. Raizing Sovereign guided us through every step of obtaining our Portugal Golden Visa.",
    rating: 5
  },
  {
    id: "2",
    name: "Michael Chen",
    program: "Cyprus Citizenship",
    content: "Exceptional service and expertise. They made our dream of European citizenship a reality through their Cyprus program.",
    rating: 5
  },
  {
    id: "3",
    name: "David Rodriguez",
    program: "St. Kitts & Nevis",
    content: "Outstanding support throughout the entire citizenship process. Highly recommend their services for Caribbean programs.",
    rating: 5
  }
];

export const FUNDRAISING_CAMPAIGNS = [
  {
    id: "1",
    name: "Maria Santos",
    program: "Portugal Golden Visa Program",
    story: "As a single mother of two, I'm working towards securing EU citizenship for my family through Portugal's Golden Visa program. Your support will help us build a better future with access to world-class education and healthcare.",
    currentAmount: 75000,
    targetAmount: 280000,
    currency: "EUR",
    daysLeft: 45
  },
  {
    id: "2",
    name: "Ahmed Hassan",
    program: "Dominica Citizenship Program",
    story: "Seeking a second passport for travel freedom and business opportunities. Dominica's citizenship program offers visa-free access to 140+ countries, opening doors for my growing business.",
    currentAmount: 65000,
    targetAmount: 100000,
    currency: "USD",
    daysLeft: 30
  },
  {
    id: "3",
    name: "Jennifer Liu",
    program: "Malta Citizenship Program",
    story: "Pursuing EU citizenship through Malta's exceptional program. As an entrepreneur, this will provide access to the European market and secure my family's future in Europe.",
    currentAmount: 350000,
    targetAmount: 690000,
    currency: "EUR",
    daysLeft: 60
  }
];

export const TOP_CONTRIBUTORS = [
  { id: "1", name: "Alex Thompson", amount: 25000 },
  { id: "2", name: "Sarah Williams", amount: 18000 },
  { id: "3", name: "Michael Chen", amount: 15000 },
  { id: "4", name: "Emma Davis", amount: 12000 },
  { id: "5", name: "David Rodriguez", amount: 10000 }
];

export const MERCHANDISE = [
  {
    id: "1",
    name: "Global Citizen T-Shirt",
    description: "Premium cotton t-shirt with embroidered Raizing Sovereign logo. Available in multiple colors.",
    price: 29.99,
    icon: Shirt
  },
  {
    id: "2",
    name: "World Traveler Mug",
    description: "Ceramic mug with world map design and Raizing Sovereign branding. Perfect for your morning coffee.",
    price: 19.99,
    icon: Coffee
  },
  {
    id: "3",
    name: "Premium Laptop Sticker Pack",
    description: "Waterproof vinyl stickers featuring various country flags and Raizing Sovereign logos.",
    price: 12.99,
    icon: Laptop
  },
  {
    id: "4",
    name: "Explorer Cap",
    description: "Adjustable baseball cap with embroidered logo. Perfect for your travels around the world.",
    price: 24.99,
    icon: Crown
  },
  {
    id: "5",
    name: "Global Citizenship Guide",
    description: "Comprehensive handbook covering all citizenship programs, requirements, and best practices.",
    price: 49.99,
    icon: Book
  },
  {
    id: "6",
    name: "Travel Document Organizer",
    description: "Premium leather organizer for passports, visas, and important travel documents.",
    price: 89.99,
    icon: Briefcase
  }
];
