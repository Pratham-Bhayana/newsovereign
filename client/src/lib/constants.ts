import { FileText, Home, TrendingUp, Handshake, Shirt, Coffee, Laptop, Crown, Book, Briefcase } from "lucide-react";

export const PROGRAMS = [
  {
    id: "europe-1",
    continent: "Europe",
    countries: ["Portugal", "Malta", "Cyprus", "Greece"],
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Portugal Golden Visa",
    description: "Investment from €280,000. Path to EU citizenship in 5 years. Schengen area access and high quality of life.",
    minInvestment: "€280,000",
    processingTime: "6-12 months",
    benefits: ["Minimum investment: €280,000", "Processing time: 6-12 months", "EU citizenship eligible"]
  },
  {
    id: "caribbean-1",
    continent: "Caribbean",
    countries: ["St. Kitts & Nevis", "Dominica", "Grenada"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "St. Kitts & Nevis",
    description: "The world's oldest citizenship by investment program. Fast processing and visa-free travel to 150+ countries.",
    minInvestment: "$150,000+",
    processingTime: "3-6 months",
    benefits: ["Donation: $150,000+", "Processing time: 3-6 months", "150+ visa-free destinations"]
  },
  {
    id: "americas-1",
    continent: "Americas",
    countries: ["Canada", "USA", "Brazil", "Chile"],
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "cyprus-1",
    continent: "Europe",
    countries: ["Cyprus"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Cyprus Investment Program",
    description: "Premium investment program with fast processing. EU passport and business opportunities in strategic location.",
    minInvestment: "€2,000,000",
    processingTime: "3-6 months",
    benefits: ["Minimum investment: €2,000,000", "Processing time: 3-6 months", "EU citizenship direct"]
  },
  {
    id: "malta-1",
    continent: "Europe",
    countries: ["Malta"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Malta Citizenship Program",
    description: "Exceptional program combining investment, donation, and residency. Premium EU citizenship option.",
    minInvestment: "€690,000+",
    processingTime: "12-36 months",
    benefits: ["Total investment: €690,000+", "Processing time: 12-36 months", "EU passport access"]
  },
  {
    id: "dominica-1",
    continent: "Caribbean",
    countries: ["Dominica"],
    image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    title: "Dominica",
    description: "Affordable citizenship program with strong passport. Known for its natural beauty and stability.",
    minInvestment: "$100,000+",
    processingTime: "3-4 months",
    benefits: ["Donation: $100,000+", "Processing time: 3-4 months", "140+ visa-free destinations"]
  },
  {
    id: "grenada-1",
    continent: "Caribbean",
    countries: ["Grenada"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    title: "Grenada",
    description: "Unique E-2 treaty access to USA. Beautiful island nation with growing economy and tourism sector.",
    minInvestment: "$150,000+",
    processingTime: "4-6 months",
    benefits: ["Donation: $150,000+", "Processing time: 4-6 months", "USA E-2 visa access"]
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
