// =====================================
// pixel-lyrics — Mock Data Layer
// Hackathon Prototype: No backend needed
// =====================================

export interface Photographer {
  id: string;
  name: string;
  specialty: string;
  hourlyRate: number;
  rating: number;
  distance: string;
  reviews: number;
  img: string;
  location: string;
  bio: string;
  styleTags: string[];
  gallery: string[];
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
    name: "Maria Rodriguez",
    specialty: "Wedding & Cinematic",
    hourlyRate: 150,
    rating: 4.8,
    distance: "2 miles",
    reviews: 142,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    location: "New York, USA",
    bio: "Award-winning wedding & cinematic photographer with 8+ years of experience capturing timeless moments. Specializing in candid emotions and dramatic lighting.",
    styleTags: ["Wedding", "Cinematic", "Portrait"],
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400",
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400",
    ],
  },
  {
    id: "2",
    name: "David Kim",
    specialty: "Product & Studio",
    hourlyRate: 90,
    rating: 4.9,
    distance: "5 miles",
    reviews: 88,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    location: "Los Angeles, USA",
    bio: "Product photographer helping brands tell visual stories. Clean, minimal, impactful. Currently working with 12+ e-commerce brands.",
    styleTags: ["Product", "Studio", "Minimalist"],
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400",
    ],
  },
  {
    id: "3",
    name: "Sarah Jenkins",
    specialty: "Candid Portraits",
    hourlyRate: 120,
    rating: 4.7,
    distance: "7 miles",
    reviews: 56,
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    location: "Chicago, USA",
    bio: "Capturing the real you. Candid portrait photographer blending natural light with authentic emotion. No fake smiles allowed.",
    styleTags: ["Candid", "Portrait", "Lifestyle"],
    gallery: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400",
    ],
  },
  {
    id: "4",
    name: "Alex Chen",
    specialty: "Events & Concerts",
    hourlyRate: 110,
    rating: 4.6,
    distance: "3 miles",
    reviews: 73,
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    location: "San Francisco, USA",
    bio: "Live events specialist. From intimate concerts to massive festivals, I freeze the energy in every frame.",
    styleTags: ["Events", "Concert", "Nightlife"],
    gallery: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400",
    ],
  },
  {
    id: "5",
    name: "Priya Patel",
    specialty: "Fashion & Editorial",
    hourlyRate: 200,
    rating: 4.9,
    distance: "10 miles",
    reviews: 201,
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    location: "Miami, USA",
    bio: "High-fashion editorial photographer. Published in Vogue, Elle, and Harper's Bazaar. Transforming vision into visual art.",
    styleTags: ["Fashion", "Editorial", "Luxury"],
    gallery: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400",
      "https://images.unsplash.com/photo-1581044777550-4cfa60707998?w=400",
    ],
  },
  {
    id: "6",
    name: "James Wright",
    specialty: "Nature & Landscape",
    hourlyRate: 85,
    rating: 4.5,
    distance: "15 miles",
    reviews: 34,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    location: "Denver, USA",
    bio: "Landscape and nature photographer exploring the American West. Available for travel and destination shoots.",
    styleTags: ["Nature", "Landscape", "Travel"],
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400",
      "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=400",
    ],
  },
];

// ---------- Packages ----------
export const MOCK_PACKAGES: PackageOption[] = [
  {
    id: "pkg_1",
    name: "Essential",
    description: "Perfect for small sessions",
    duration: "1 hour",
    price: 150,
    features: ["1-hour session", "25 edited photos", "Digital delivery", "1 location"],
  },
  {
    id: "pkg_2",
    name: "Professional",
    description: "Most popular package",
    duration: "3 hours",
    price: 400,
    features: ["3-hour session", "75 edited photos", "Digital delivery", "2 locations", "Outfit change"],
  },
  {
    id: "pkg_3",
    name: "Premium",
    description: "The full experience",
    duration: "Full day",
    price: 800,
    features: ["Full-day session", "200+ edited photos", "Digital + print delivery", "Unlimited locations", "Styling consultation"],
  },
];

// ---------- Booking Requests (for Photographer Dashboard) ----------
export const MOCK_BOOKING_REQUESTS: BookingRequest[] = [
  {
    id: "bk_1",
    clientName: "Emma Thompson",
    clientAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    date: "March 25, 2026",
    packageName: "Professional",
    packagePrice: 400,
    status: "pending",
    message: "Hi! We'd love to book you for our engagement photoshoot at Central Park.",
  },
  {
    id: "bk_2",
    clientName: "Michael Santos",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    date: "April 2, 2026",
    packageName: "Premium",
    packagePrice: 800,
    status: "pending",
    message: "Looking for a full-day wedding coverage. Can we discuss details?",
  },
  {
    id: "bk_3",
    clientName: "Lisa Park",
    clientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    date: "March 18, 2026",
    packageName: "Essential",
    packagePrice: 150,
    status: "accepted",
    message: "Need headshots for my LinkedIn & portfolio. Quick session preferred.",
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
