import {
  BadgeCheck,
  BadgeEuro,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  Check,
  Clock,
  Compass,
  CreditCard,
  Dumbbell,
  FileQuestion,
  FileText,
  Globe2,
  Goal,
  Hammer,
  Handshake,
  HeartPulse,
  Image as ImageIcon,
  Images,
  Layers,
  LayoutTemplate,
  Mail,
  MapPin,
  MapPinned,
  Megaphone,
  PackageCheck,
  Palette,
  PenTool,
  Phone,
  Quote,
  Rocket,
  Scissors,
  Search,
  Send,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Target,
  User,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";

export const BUSINESS_TYPES = [
  "Barber / Hair salon",
  "Restaurant / Cafe",
  "Coach / Consultant",
  "Tattoo artist",
  "Artist / Portfolio",
  "Local service business",
  "Webshop",
  "Fitness / Gym",
  "Beauty / Wellness",
  "Other",
];

export const PROJECT_MODES = [
  {
    value: "Improve current website",
    label: "Improve my current website",
    eyebrow: "Already online",
    description:
      "Best when you have a website, but it feels outdated, unclear, slow or not persuasive enough.",
    points: ["Sharper first impression", "Better copy and structure", "More calls, bookings or messages"],
    icon: Wrench,
  },
  {
    value: "Build new website",
    label: "Build a completely new website",
    eyebrow: "Fresh start",
    description:
      "Best when you need a first website or want to replace the old one with a cleaner direction.",
    points: ["New structure", "New visual direction", "Launch-ready plan"],
    icon: Rocket,
  },
];

export const WEBSITE_GOALS = [
  { label: "Get bookings", weight: 2, tag: "conversion" },
  { label: "Show portfolio", weight: 1, tag: "visual" },
  { label: "Sell products", weight: 3, tag: "commerce" },
  { label: "Collect leads", weight: 2, tag: "conversion" },
  { label: "Build credibility", weight: 1, tag: "trust" },
  { label: "Promote services", weight: 1, tag: "service" },
  { label: "Replace old website", weight: 1, tag: "rebuild" },
  { label: "Look more premium", weight: 1, tag: "brand" },
];

export const GOAL_META = {
  "Get bookings": {
    icon: CalendarDays,
    description: "Make it easy for visitors to choose a time, request an appointment or start a booking.",
    outcome: "More appointments",
  },
  "Show portfolio": {
    icon: Images,
    description: "Show the quality of your work with projects, galleries, before/after images or case studies.",
    outcome: "More trust in your work",
  },
  "Sell products": {
    icon: ShoppingBag,
    description: "Present products clearly and guide people toward payment, checkout or a sales request.",
    outcome: "More product sales",
  },
  "Collect leads": {
    icon: Send,
    description: "Turn interested visitors into enquiries through forms, WhatsApp, calls or consultation requests.",
    outcome: "More serious enquiries",
  },
  "Build credibility": {
    icon: BadgeCheck,
    description: "Use reviews, proof, photos, process and clear messaging to make the business feel reliable.",
    outcome: "More confidence",
  },
  "Promote services": {
    icon: Megaphone,
    description: "Explain what you offer, who it is for and why people should choose you.",
    outcome: "Clearer services",
  },
  "Replace old website": {
    icon: Wrench,
    description: "Keep what still works, but rebuild the parts that feel dated, confusing or hard to use.",
    outcome: "A better version",
  },
  "Look more premium": {
    icon: Sparkles,
    description: "Improve the visual direction so the business feels more professional, polished and memorable.",
    outcome: "Stronger brand feel",
  },
};

export const SECTION_META = {
  Home: LayoutTemplate,
  Services: BriefcaseBusiness,
  Pricing: BadgeEuro,
  Gallery: Images,
  About: User,
  Contact: Mail,
  Booking: CalendarDays,
  Reviews: Quote,
  FAQ: FileQuestion,
  Blog: FileText,
  Shop: ShoppingBag,
  Location: MapPinned,
  "Before / After": ImageIcon,
};

export const CONTENT_META = {
  logo: BadgeCheck,
  text: PenTool,
  images: Images,
  colors: Palette,
  domain: Globe2,
  hosting: ShieldCheck,
};

export function getBusinessTypeMeta(type) {
  const lower = type.toLowerCase();

  if (lower.includes("barber") || lower.includes("hair")) {
    return { icon: Scissors, description: "Bookings, services, reviews and location need to feel effortless." };
  }

  if (lower.includes("restaurant") || lower.includes("cafe") || lower.includes("café")) {
    return { icon: UtensilsCrossed, description: "Menu, atmosphere, location and quick contact should be obvious." };
  }

  if (lower.includes("coach") || lower.includes("consultant")) {
    return { icon: Handshake, description: "Trust, expertise and a clear path to a call matter most." };
  }

  if (lower.includes("tattoo")) {
    return { icon: PenTool, description: "Portfolio, style, booking and artist credibility lead the experience." };
  }

  if (lower.includes("artist") || lower.includes("portfolio")) {
    return { icon: Camera, description: "Visual work needs room to breathe, with a simple enquiry path." };
  }

  if (lower.includes("local service")) {
    return { icon: Hammer, description: "People need to understand the service, trust it and contact quickly." };
  }

  if (lower.includes("webshop")) {
    return { icon: Store, description: "Products, proof and checkout steps need to feel clear and safe." };
  }

  if (lower.includes("fitness") || lower.includes("gym")) {
    return { icon: Dumbbell, description: "Programs, memberships, transformations and signups should be easy to scan." };
  }

  if (lower.includes("beauty") || lower.includes("wellness")) {
    return { icon: HeartPulse, description: "Services, atmosphere, pricing and booking should feel calm and premium." };
  }

  return { icon: Compass, description: "We will shape the structure around your audience and offer." };
}

export function getGoalMeta(label) {
  return GOAL_META[label] || { icon: Goal, description: "Clarify what success should look like for this website.", outcome: "Clearer direction" };
}

export function getSectionIcon(label) {
  return SECTION_META[label] || Layers;
}

export function getContentIcon(key) {
  return CONTENT_META[key] || FileText;
}

export const STYLE_DIRECTIONS = [
  {
    label: "Luxury",
    description: "Premium, spacious, elegant and high-value.",
    palette: ["#18120f", "#8a6a43", "#f4eadc"],
  },
  {
    label: "Minimal",
    description: "Clean layout, strong whitespace, simple structure.",
    palette: ["#111827", "#e5e7eb", "#ffffff"],
  },
  {
    label: "Dark masculine",
    description: "Bold dark visuals, strong contrast, confident tone.",
    palette: ["#09090b", "#3f2f20", "#d6b179"],
  },
  {
    label: "Clean corporate",
    description: "Professional, trustworthy and clear.",
    palette: ["#0f172a", "#2563eb", "#f8fafc"],
  },
  {
    label: "Playful",
    description: "Friendly, colorful, approachable and energetic.",
    palette: ["#312e81", "#f97316", "#fef3c7"],
  },
  {
    label: "Elegant",
    description: "Soft, refined, stylish and calm.",
    palette: ["#3f3f46", "#d4a373", "#fff7ed"],
  },
  {
    label: "Bold",
    description: "Large typography, direct CTAs and strong contrast.",
    palette: ["#020617", "#ef4444", "#f8fafc"],
  },
  {
    label: "Artistic",
    description: "Expressive, portfolio-focused and image-led.",
    palette: ["#1e1b4b", "#a855f7", "#faf5ff"],
  },
];

export const SECTIONS = [
  { label: "Home", weight: 0, recommended: true },
  { label: "Services", weight: 1, recommended: true },
  { label: "Pricing", weight: 1, recommended: true },
  { label: "Gallery", weight: 1, recommended: false },
  { label: "About", weight: 1, recommended: true },
  { label: "Contact", weight: 0, recommended: true },
  { label: "Booking", weight: 2, recommended: false },
  { label: "Reviews", weight: 1, recommended: true },
  { label: "FAQ", weight: 1, recommended: false },
  { label: "Blog", weight: 2, recommended: false },
  { label: "Shop", weight: 4, recommended: false },
  { label: "Location", weight: 1, recommended: false },
  { label: "Before / After", weight: 1, recommended: false },
];

export const FUNCTIONALITY = [
  { label: "Booking system", price: 150, weight: 3, icon: CalendarDays, complexity: "High" },
  { label: "WhatsApp button", price: 30, weight: 1, icon: Phone, complexity: "Low" },
  { label: "Google Maps", price: 50, weight: 1, icon: MapPin, complexity: "Low" },
  { label: "Contact form", price: 60, weight: 2, icon: Mail, complexity: "Medium" },
  { label: "Online payment / deposit link", price: 180, weight: 4, icon: CreditCard, complexity: "High" },
  { label: "CMS / editable content", price: 300, weight: 5, icon: Settings, complexity: "High" },
  { label: "Multilingual", price: 200, weight: 4, icon: Globe2, complexity: "High" },
  { label: "Animations", price: 180, weight: 3, icon: Sparkles, complexity: "Medium / High" },
  { label: "SEO setup", price: 100, weight: 2, icon: Search, complexity: "Medium" },
  { label: "Google Analytics", price: 90, weight: 2, icon: BarChart3, complexity: "Medium" },
  { label: "Cookie / analytics consent", price: 90, weight: 2, icon: ShieldCheck, complexity: "Medium" },
];

export const CONTENT_ITEMS = [
  { key: "logo", label: "Logo", missingPrice: 100 },
  { key: "text", label: "Website text / copy", missingPrice: 200 },
  { key: "images", label: "Photos / images", missingPrice: 150 },
  { key: "colors", label: "Brand colors", missingPrice: 75 },
  { key: "domain", label: "Domain name", missingPrice: 75 },
  { key: "hosting", label: "Hosting", missingPrice: 100 },
];

export const URGENCY = [
  {
    label: "Normal delivery",
    description: "Best for most projects. Usually 7-14 days depending on scope.",
    multiplier: 1,
  },
  {
    label: "72h express",
    description: "For simple/controlled websites where content is mostly ready.",
    multiplier: 1.3,
  },
  {
    label: "7-day full package",
    description: "Faster full-service delivery with priority planning and execution.",
    multiplier: 1.15,
  },
];

export const PACKAGES = {
  starter: {
    key: "starter",
    shortName: "Basic",
    name: "Basic Website",
    base: 349,
    max: 349,
    monthly: 14,
    rawValue: 450,
    badge: "Simple online presence",
    bestFor: "A simple professional online presence.",
    description: "For a simple professional online presence.",
    included: [
      "One-page website",
      "Up to 4 core sections",
      "Mobile-responsive layout",
      "Basic style customization",
      "Contact section / WhatsApp CTA",
      "Basic SEO title and description",
      "Deployment help",
      "1 revision round",
    ],
    homepageIncluded: [
      "One-page website",
      "Up to 4 sections",
      "Mobile-friendly design",
      "Contact / WhatsApp CTA",
      "Basic SEO",
      "1 revision",
    ],
    probable: ["Hero", "Services", "About", "Contact", "WhatsApp", "Mobile design"],
    boundaries: ["No CMS", "No payment system", "No booking integration", "No multilingual setup"],
  },
  business: {
    key: "business",
    shortName: "Advanced",
    name: "Advanced Website",
    base: 899,
    max: 899,
    monthly: 24,
    rawValue: 1230,
    badge: "Most popular",
    bestFor: "Local businesses that need leads, trust, maps, reviews and analytics.",
    description: "For local businesses that need leads, trust, maps, reviews and analytics.",
    included: [
      "One-page or small business website",
      "Up to 7 sections",
      "Custom homepage structure",
      "Services / pricing section",
      "Gallery or reviews section",
      "Contact form or WhatsApp flow",
      "Google Maps",
      "SEO setup",
      "Visitor insights setup",
      "2 revision rounds",
    ],
    homepageIncluded: [
      "Up to 7 sections",
      "Services/pricing section",
      "Gallery or reviews",
      "Contact form",
      "Google Maps",
      "SEO setup",
      "Google Analytics",
      "2 revisions",
    ],
    probable: ["Hero", "Services", "Pricing", "Gallery", "Reviews", "Contact", "Maps", "Analytics"],
    boundaries: ["No full webshop", "No custom app", "CMS/payment only in Premium"],
  },
  premium: {
    key: "premium",
    shortName: "Premium",
    name: "Premium Website",
    base: 1499,
    max: 1499,
    monthly: 39,
    rawValue: 2690,
    badge: "Complete website package",
    bestFor: "Businesses that need the full website package.",
    description:
      "For businesses that need the full website package.",
    included: [
      "Premium custom website",
      "Up to 10 sections/pages",
      "Premium visual direction",
      "Booking integration",
      "Payment / deposit link setup",
      "CMS or editable content setup",
      "Multilingual structure",
      "Animations",
      "SEO setup",
      "Basic visitor insights setup",
      "Cookie / analytics consent banner",
      "Content/copy polish",
      "3 revision rounds",
      "Launch support",
    ],
    homepageIncluded: [
      "Up to 10 sections/pages",
      "Premium design direction",
      "Booking integration",
      "Payment/deposit link",
      "CMS/editable content",
      "Multilingual structure",
      "Animations",
      "Advanced tracking",
      "3 revisions",
    ],
    probable: ["Custom hero", "Services", "Booking", "Payment link", "CMS", "Multilingual", "Animations", "SEO", "Analytics"],
    boundaries: ["No full custom SaaS", "No user accounts", "No complex webshop with inventory/shipping"],
  },
};

export const EXAMPLE_DIRECTIONS = [
  {
    title: "Local business website",
    whoFor: "For service businesses that need trust and contact flow.",
    description: "Services, reviews, Google Maps, contact form and WhatsApp.",
    sections: ["Services", "Reviews", "Maps", "WhatsApp"],
    palette: ["#111111", "#d6b179", "#f5f1e8"],
  },
  {
    title: "Visual portfolio website",
    whoFor: "For creatives, artists and personal brands.",
    description: "Gallery, projects, about and inquiry form.",
    sections: ["Gallery", "Projects", "About", "Inquiry"],
    palette: ["#18181b", "#db2777", "#fafafa"],
  },
  {
    title: "Booking-focused website",
    whoFor: "For businesses that want appointments or requests.",
    description: "Services, pricing, booking CTA, reviews and FAQ.",
    sections: ["Pricing", "Booking", "Reviews", "FAQ"],
    palette: ["#0f172a", "#14b8a6", "#f8fafc"],
  },
];

export const PROCESS_STEPS = [
  {
    title: "Choose package or answer questions",
    description:
      "Choose Basic, Advanced or Premium, or use the configurator if you are not sure what fits.",
    icon: Compass,
  },
  {
    title: "We create the website plan",
    description:
      "Your answers become a clear plan for the goal, sections, style, features and package.",
    icon: Target,
  },
  {
    title: "We build and launch it",
    description:
      "QuickWeb Studio turns the plan into a finished website that is ready to share.",
    icon: Wrench,
  },
];

export const steps = [
  { title: "Starting point", subtitle: "Are we improving an existing site or planning a new one?", icon: Rocket, noteKey: "business" },
  { title: "Main outcome", subtitle: "What should the website make easier for the business?", icon: Goal, noteKey: "goals" },
  { title: "Style + colors", subtitle: "Choose the visual feeling and adjust colors.", icon: Palette, noteKey: "style" },
  { title: "Required sections", subtitle: "Select the sections your website needs.", icon: Layers, noteKey: "sections" },
  { title: "Functionality", subtitle: "Choose features that affect price and complexity.", icon: Settings, noteKey: "functionality" },
  { title: "Content readiness", subtitle: "Tell us what you already have ready.", icon: FileText, noteKey: "content" },
  { title: "Urgency", subtitle: "How fast do you need the website?", icon: Clock, noteKey: "urgency" },
  { title: "Design preview", subtitle: "Choose a direction, edit colors and leave design notes.", icon: Sparkles, noteKey: "design" },
  { title: "Package comparison", subtitle: "See the likely website version next to each package.", icon: PackageCheck, noteKey: "package" },
  { title: "Your details", subtitle: "Where should we send your website brief?", icon: User, noteKey: "lead" },
  { title: "Deposit or consultation", subtitle: "Choose the next step that feels right.", icon: CreditCard, noteKey: "next" },
  { title: "Confirmation", subtitle: "Your brief is ready.", icon: Check, noteKey: "confirmation" },
];

export const defaultAnswers = {
  packagePreference: "",
  projectMode: "",
  businessType: "",
  goals: [],
  style: "",
  customColors: ["#09090b", "#3f2f20", "#d6b179"],
  colorMode: "Dark",
  sections: ["Home", "Services", "About", "Contact", "Reviews"],
  functionality: [],
  contentReady: {
    logo: "unknown",
    text: "unknown",
    images: "unknown",
    colors: "unknown",
    domain: "unknown",
    hosting: "unknown",
  },
  urgency: "Normal delivery",
  selectedDesign: "",
  lead: {
    name: "",
    email: "",
    phone: "",
    businessName: "",
    preferredContact: "Email",
  },
  nextStep: "",
  notes: {
    business: "",
    goals: "",
    style: "",
    sections: "",
    functionality: "",
    content: "",
    urgency: "",
    design: "",
    package: "",
    lead: "",
    next: "",
  },
};
