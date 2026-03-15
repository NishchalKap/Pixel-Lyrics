// =====================================
// pixel-lyrics — Mock Data Layer
// Hackathon Prototype: India-Localized
// =====================================

export interface Photographer {
  id: string;
  name: string;
  specialty: string;
  startingPriceINR: number;
  rating: number;
  distance: string;
  reviews: number;
  img: string;
  location: string;
  bio: string;
  styleTags: string[];
  gallery: string[];
  badge?: string; // e.g. "🔥 Popular in Jaipur", "⭐ Top Rated"
  isVerified?: boolean;
}

export interface BookingRequest {
  id: string;
  clientName: string;
  clientAvatar: string;
  date: string;
  packageName: string;
  packagePrice: number;
  status: "pending" | "accepted" | "rejected";
  message: string;
}

export interface PackageOption {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  features: string[];
}

// ---------- Photographers ----------
export const MOCK_PHOTOGRAPHERS: Photographer[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    specialty: "Wedding & Cinematic",
    startingPriceINR: 15000,
    rating: 4.9,
    distance: "3 km",
    reviews: 214,
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    location: "Jaipur, Rajasthan",
    bio: "Award-winning wedding photographer with 10+ years capturing royal Rajasthani weddings. Specializing in cinematic storytelling, drone coverage, and candid emotions that last a lifetime.",
    styleTags: ["Wedding", "Cinematic", "Candid", "Drone"],
    badge: "Popular in Jaipur",
    isVerified: true,
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=500",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=500",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=500",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500",
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=500",
    ],
  },
  {
    id: "2",
    name: "Riya Kapoor",
    specialty: "Fashion & Editorial",
    startingPriceINR: 25000,
    rating: 4.8,
    distance: "7 km",
    reviews: 178,
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    location: "Mumbai, Maharashtra",
    bio: "Fashion photographer published in Vogue India and Femina. Working with top Indian designers and brands to create editorial magic. Available for destination shoots.",
    styleTags: ["Fashion", "Editorial", "Luxury", "Portrait"],
    badge: "Top Rated",
    isVerified: true,
    gallery: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500",
      "https://images.unsplash.com/photo-1581044777550-4cfa60707998?w=500",
    ],
  },
  {
    id: "3",
    name: "Dev Mehta",
    specialty: "Product & Studio",
    startingPriceINR: 8000,
    rating: 4.7,
    distance: "5 km",
    reviews: 96,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    location: "Bangalore, Karnataka",
    bio: "Product photographer helping D2C brands and startups tell visual stories. Clean, minimal, impactful. Currently shooting for 20+ e-commerce brands across India.",
    styleTags: ["Product", "Studio", "E-Commerce", "Minimalist"],
    badge: "Startup Favourite",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500",
    ],
  },
  {
    id: "4",
    name: "Ananya Singh",
    specialty: "Portrait & Lifestyle",
    startingPriceINR: 10000,
    rating: 4.8,
    distance: "4 km",
    reviews: 132,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    location: "Delhi, NCR",
    bio: "Capturing the real you. Portrait and lifestyle photographer blending natural Indian light with authentic emotion. Specializing in personal branding and LinkedIn shoots.",
    styleTags: ["Portrait", "Lifestyle", "Candid", "Branding"],
    badge: "Most Booked",
    gallery: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500",
    ],
  },
  {
    id: "5",
    name: "Kabir Arora",
    specialty: "Street & Documentary",
    startingPriceINR: 6000,
    rating: 4.6,
    distance: "12 km",
    reviews: 67,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    location: "Kolkata, West Bengal",
    bio: "Street photographer documenting the vibrant chaos of Indian cities. From Durga Puja pandals to chai stalls at dawn — every frame tells a story of India.",
    styleTags: ["Street", "Documentary", "Travel", "Culture"],
    badge: "Rising Star",
    isVerified: false,
    gallery: [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500",
      "https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=500",
      "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=500",
      "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=500",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500",
    ],
  },
  {
    id: "6",
    name: "Meera Joshi",
    specialty: "Events & Corporate",
    startingPriceINR: 12000,
    rating: 4.7,
    distance: "6 km",
    reviews: 89,
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    location: "Pune, Maharashtra",
    bio: "Event photographer covering corporate conferences, product launches, and cultural festivals. Trusted by TCS, Infosys, and Pune's top event planners.",
    styleTags: ["Events", "Corporate", "Conference", "Festival"],
    badge: "Popular in Pune",
    gallery: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500",
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=500",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500",
    ],
  },
];

// ---------- Packages (INR) ----------
export const MOCK_PACKAGES: PackageOption[] = [
  {
    id: "pkg_1",
    name: "Essential",
    description: "Perfect for quick sessions",
    duration: "2 hours",
    price: 7500,
    features: ["2-hour shoot", "25 edited photos", "Digital delivery", "1 location"],
  },
  {
    id: "pkg_2",
    name: "Professional",
    description: "Most popular package",
    duration: "4 hours",
    price: 18000,
    features: ["4-hour shoot", "60 edited photos", "Colour grading", "Digital delivery", "2 locations"],
  },
  {
    id: "pkg_3",
    name: "Premium",
    description: "The complete experience",
    duration: "Full day",
    price: 35000,
    features: ["Full-day shoot", "150+ edited photos", "Advanced retouching", "Priority delivery", "Unlimited locations"],
  },
];

// ---------- Booking Requests (for Photographer Dashboard) ----------
export const MOCK_BOOKING_REQUESTS: BookingRequest[] = [
  {
    id: "bk_1",
    clientName: "Priya Nair",
    clientAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    date: "March 25, 2026",
    packageName: "Professional",
    packagePrice: 18000,
    status: "pending",
    message: "Hi! We'd love to book you for our engagement photoshoot at Amer Fort, Jaipur.",
  },
  {
    id: "bk_2",
    clientName: "Rohit Verma",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    date: "April 2, 2026",
    packageName: "Premium",
    packagePrice: 35000,
    status: "pending",
    message: "Looking for full-day wedding coverage at a heritage haveli. Can we discuss details?",
  },
  {
    id: "bk_3",
    clientName: "Sneha Iyer",
    clientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    date: "March 18, 2026",
    packageName: "Essential",
    packagePrice: 7500,
    status: "accepted",
    message: "Need professional headshots for LinkedIn and my startup pitch deck.",
  },
];

// ---------- Delivery Preview Photos ----------
export const MOCK_DELIVERY_PHOTOS: string[] = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600",
  "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600",
  "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
  "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600",
];

// ---------- AI Match Scores (simulated) ----------
export const AI_MATCH_SCORES: Record<string, number> = {
  "1": 97,
  "2": 94,
  "3": 88,
  "4": 91,
  "5": 85,
  "6": 89,
};
