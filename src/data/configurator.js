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
  { label: "Get bookings", tag: "conversion" },
  { label: "Show portfolio", tag: "visual" },
  { label: "Sell products", tag: "commerce" },
  { label: "Collect leads", tag: "conversion" },
  { label: "Build credibility", tag: "trust" },
  { label: "Promote services", tag: "service" },
  { label: "Replace old website", tag: "rebuild" },
  { label: "Look more premium", tag: "brand" },
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
  { label: "Home", price: 0, recommended: true },
  { label: "Services", price: 35, recommended: true },
  { label: "Pricing", price: 35, recommended: true },
  { label: "Gallery", price: 35, recommended: false },
  { label: "About", price: 35, recommended: true },
  { label: "Contact", price: 0, recommended: true },
  { label: "Booking", price: 70, recommended: false },
  { label: "Reviews", price: 35, recommended: true },
  { label: "FAQ", price: 35, recommended: false },
  { label: "Blog", price: 70, recommended: false },
  { label: "Shop", price: 140, recommended: false },
  { label: "Location", price: 35, recommended: false },
  { label: "Before / After", price: 35, recommended: false },
];

export const FUNCTIONALITY = [
  { label: "Booking system", price: 150, icon: CalendarDays },
  { label: "WhatsApp button", price: 30, icon: Phone },
  { label: "Google Maps", price: 50, icon: MapPin },
  { label: "Contact form", price: 60, icon: Mail },
  { label: "Online payment / deposit link", price: 180, icon: CreditCard },
  { label: "CMS / editable content", price: 300, icon: Settings },
  { label: "Multilingual", price: 200, icon: Globe2 },
  { label: "Animations", price: 180, icon: Sparkles },
  { label: "SEO setup", price: 100, icon: Search },
  { label: "Google Analytics", price: 90, icon: BarChart3 },
  { label: "Cookie / analytics consent", price: 90, icon: ShieldCheck },
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
    price: 0,
  },
  {
    label: "7-day full package",
    description: "Faster full-service delivery with priority planning and execution.",
    price: 100,
  },
  {
    label: "72h express",
    description: "For simple/controlled websites where content is mostly ready.",
    price: 300,
  },
];

export const MAINTENANCE_OPTIONS = [
  {
    label: "Handover only",
    description: "Launch-ready website with clear handover, no monthly care plan.",
    price: 0,
    monthly: 0,
    icon: FileText,
  },
  {
    label: "Basic maintenance",
    description: "Updates, small fixes and light checks after launch.",
    price: 0,
    monthly: 14,
    icon: Wrench,
  },
  {
    label: "Managed growth",
    description: "Priority updates, improvements, monitoring and ongoing support.",
    price: 0,
    monthly: 39,
    icon: ShieldCheck,
  },
];

export const PACKAGES = {
  starter: {
    key: "starter",
    shortName: "Basic",
    name: "Basic Website",
    base: 199,
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
    base: 399,
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
      "Visit tracking",
      "2 revisions",
    ],
    probable: ["Hero", "Services", "Pricing", "Gallery", "Reviews", "Contact", "Maps", "Analytics"],
    boundaries: ["No full webshop", "No custom app", "CMS/payment only in Premium"],
  },
  premium: {
    key: "premium",
    shortName: "Premium",
    name: "Premium Website",
    base: 949,
    max: 1499,
    monthly: 39,
    rawValue: 2690,
    badge: "Complete website package",
    bestFor: "Businesses that need booking, payment links, CMS, multilingual structure or animations.",
    description:
      "For businesses that need booking, payment links, CMS, multilingual structure or animations.",
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

// Sections/functionality pre-selected when a package is chosen, mirroring each package's "included" list above.
export const PACKAGE_DEFAULTS = {
  starter: {
    sections: ["Home", "Services", "About", "Contact"],
    functionality: ["WhatsApp button"],
  },
  business: {
    sections: ["Home", "Services", "Pricing", "Gallery", "Reviews", "Contact", "Location"],
    functionality: ["Google Maps", "SEO setup", "Google Analytics"],
  },
  premium: {
    sections: ["Home", "Services", "Pricing", "Gallery", "About", "Contact", "Booking", "Reviews"],
    functionality: [
      "Booking system",
      "Online payment / deposit link",
      "CMS / editable content",
      "Multilingual",
      "Animations",
      "SEO setup",
      "Google Analytics",
      "Cookie / analytics consent",
    ],
  },
};

export const CALL_PREFERENCES = [
  {
    value: "yes",
    label: "Yes, book a short call",
    description: "We plan a quick call to confirm scope, answer questions and align before the work starts.",
    icon: CalendarDays,
  },
  {
    value: "no",
    label: "No, start from the brief",
    description: "Skip the call - the project is planned from your brief, and we only reach out if something needs clarifying.",
    icon: Check,
  },
];

export const EXAMPLE_DIRECTIONS = [
  {
    category: "Local services",
    title: "Local business website",
    whoFor: "For barbers, salons, repair services, restaurants and service businesses.",
    description: "Services, pricing, reviews, contact, Google Maps and WhatsApp.",
    result: "Helps visitors compare services, trust the business and contact you in one clear path.",
    href: "#examples",
    sections: ["Services", "Pricing", "Reviews", "Maps"],
    preview: ["Services", "Reviews", "Map"],
    palette: ["#334E68", "#B7791F", "#F3E8D0"],
  },
  {
    category: "Creative portfolio",
    title: "Portfolio website",
    whoFor: "For artists, tattoo artists, creatives and personal brands.",
    description: "Visual gallery, about section, project highlights and inquiry form.",
    result: "Shows selected work with enough context to turn interest into serious enquiries.",
    href: "#examples",
    sections: ["Gallery", "Projects", "About", "Inquiry"],
    preview: ["Gallery", "Projects", "Inquiry"],
    palette: ["#1F2933", "#6B7280", "#EEEAE3"],
  },
  {
    category: "Appointments",
    title: "Booking-focused website",
    whoFor: "For businesses that need appointments or leads.",
    description: "Services, pricing, booking CTA, reviews, FAQ and contact flow.",
    result: "Guides visitors from service details to an appointment request without extra steps.",
    href: "#examples",
    sections: ["Services", "Booking", "Reviews", "FAQ"],
    preview: ["Services", "Booking", "FAQ"],
    palette: ["#334E68", "#4B7F52", "#D9E2EC"],
  },
];

export const PROCESS_STEPS = [
  {
    title: "Choose a package or answer questions",
    description:
      "Pick Basic, Advanced or Premium - or use the website planner if you are not sure.",
    icon: Compass,
  },
  {
    title: "We create the website plan",
    description:
      "We define the structure, style, sections, features and content needed.",
    icon: Target,
  },
  {
    title: "We build and launch it",
    description:
      "You review the website, request changes, and we help publish it online.",
    icon: Wrench,
  },
];

export const steps = [
  { title: "Starting point", subtitle: "Are we improving an existing site or planning a new one?", icon: Rocket, noteKey: "business" },
  { title: "Main outcomes", subtitle: "A booking site, portfolio, shop and credibility site should not be structured the same way.", icon: Goal, noteKey: "goals" },
  { title: "Style + colors", subtitle: "Choose the visual feeling and adjust colors.", icon: Palette, noteKey: "style" },
  { title: "Required sections", subtitle: "Select the sections your website needs.", icon: Layers, noteKey: "sections" },
  { title: "Functionality", subtitle: "Choose add-ons that affect the price.", icon: Settings, noteKey: "functionality" },
  { title: "Content readiness", subtitle: "Tell us what you already have ready.", icon: FileText, noteKey: "content" },
  { title: "Timeline + maintenance", subtitle: "Urgency and maintainability affect the estimate.", icon: Clock, noteKey: "urgency" },
  { title: "Your details", subtitle: "Where should we send your website brief?", icon: User, noteKey: "lead" },
  { title: "Deposit & call", subtitle: "A deposit secures the project, and you decide if a short call helps first.", icon: CreditCard, noteKey: "next" },
  { title: "Confirmation", subtitle: "Your brief is ready.", icon: Check, noteKey: "confirmation" },
];

export const defaultAnswers = {
  packagePreference: "",
  projectMode: "",
  currentWebsiteUrl: "",
  businessType: "",
  goals: [],
  style: "",
  customColors: ["#1F2933", "#B7791F", "#F6F4F0"],
  colorMode: "Dark",
  sections: [],
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
  maintainability: "Handover only",
  selectedDesign: "",
  lead: {
    name: "",
    email: "",
    phone: "",
    businessName: "",
    preferredContact: "Email",
  },
  wantsCall: "",
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
