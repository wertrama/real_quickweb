import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Clock,
  Mail,
  Phone,
  Building2,
  CreditCard,
  CalendarDays,
  FileText,
  Download,
  ShieldCheck,
  Zap,
  MapPin,
  Palette,
  Target,
  Layers,
  Settings,
  PackageCheck,
  User,
  Menu,
  X,
  BarChart3,
  MousePointerClick,
  Star,
  Globe2,
  MessageSquareText,
  ChevronDown,
  Eye,
  BriefcaseBusiness,
  Search,
  Wrench,
  Rocket,
  LayoutTemplate,
  Scissors,
  UtensilsCrossed,
  Dumbbell,
  HeartPulse,
  Store,
  Camera,
  Handshake,
  Hammer,
  ShoppingBag,
  Image as ImageIcon,
  Images,
  Quote,
  ClipboardCheck,
  BadgeCheck,
  Compass,
  Megaphone,
  MonitorSmartphone,
  PenTool,
  Send,
  Goal,
  FileQuestion,
  BadgeEuro,
  MapPinned,
} from "lucide-react";

// ============================================================
// QUICKWEB STUDIO MVP
// Paste this whole file into: src/App.jsx
// Dependencies: framer-motion lucide-react tailwindcss @tailwindcss/vite
// ============================================================

// 1) GOOGLE ANALYTICS SETUP
// Replace this with your real GA4 Measurement ID when you create one.
// Example format: G-ABC123XYZ
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

function loadGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") return;
  if (window.gtag) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
  });
}

function trackEvent(eventName, params = {}) {
  // Never send names, emails, phone numbers, or private notes to analytics.
  if (window.gtag) {
    window.gtag("event", eventName, params);
  }
}

const BUSINESS_TYPES = [
  "Barber / Hair salon",
  "Restaurant / Café",
  "Coach / Consultant",
  "Tattoo artist",
  "Artist / Portfolio",
  "Local service business",
  "Webshop",
  "Fitness / Gym",
  "Beauty / Wellness",
  "Other",
];

const PROJECT_MODES = [
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

const WEBSITE_GOALS = [
  { label: "Get bookings", weight: 2, tag: "conversion" },
  { label: "Show portfolio", weight: 1, tag: "visual" },
  { label: "Sell products", weight: 3, tag: "commerce" },
  { label: "Collect leads", weight: 2, tag: "conversion" },
  { label: "Build credibility", weight: 1, tag: "trust" },
  { label: "Promote services", weight: 1, tag: "service" },
  { label: "Replace old website", weight: 1, tag: "rebuild" },
  { label: "Look more premium", weight: 1, tag: "brand" },
];

const GOAL_META = {
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

const SECTION_META = {
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

const CONTENT_META = {
  logo: BadgeCheck,
  text: PenTool,
  images: Images,
  colors: Palette,
  domain: Globe2,
  hosting: ShieldCheck,
};

function getBusinessTypeMeta(type) {
  const lower = type.toLowerCase();

  if (lower.includes("barber") || lower.includes("hair")) {
    return { icon: Scissors, description: "Bookings, services, reviews and location need to feel effortless." };
  }

  if (lower.includes("restaurant")) {
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

function getGoalMeta(label) {
  return GOAL_META[label] || { icon: Goal, description: "Clarify what success should look like for this website.", outcome: "Clearer direction" };
}

function getSectionIcon(label) {
  return SECTION_META[label] || Layers;
}

function getContentIcon(key) {
  return CONTENT_META[key] || FileText;
}

const STYLE_DIRECTIONS = [
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

const SECTIONS = [
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

const FUNCTIONALITY = [
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

const CONTENT_ITEMS = [
  { key: "logo", label: "Logo", missingPrice: 100 },
  { key: "text", label: "Website text / copy", missingPrice: 200 },
  { key: "images", label: "Photos / images", missingPrice: 150 },
  { key: "colors", label: "Brand colors", missingPrice: 75 },
  { key: "domain", label: "Domain name", missingPrice: 75 },
  { key: "hosting", label: "Hosting", missingPrice: 100 },
];

const URGENCY = [
  {
    label: "Normal delivery",
    description: "Best for most projects. Usually 7–14 days depending on scope.",
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

const PACKAGES = {
  starter: {
    key: "starter",
    name: "Basic Website",
    base: 199,
    max: 349,
    monthly: 14,
    rawValue: 450,
    badge: "Simple online presence",
    bestFor: "Freelancers, personal brands, small local businesses and simple one-page websites.",
    description:
      "Best for a simple professional website with essential sections and a basic contact flow.",
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
    probable: ["Hero", "Services", "About", "Contact", "WhatsApp", "Mobile design"],
    boundaries: ["No CMS", "No payment system", "No booking integration", "No multilingual setup"],
  },
  business: {
    key: "business",
    name: "Advanced Website",
    base: 349,
    max: 899,
    monthly: 24,
    rawValue: 1230,
    badge: "Most recommended",
    bestFor: "Local businesses that need leads, trust, reviews, maps, analytics and clear CTAs.",
    description:
      "Best for service businesses that need a stronger structure, lead flow, trust sections and analytics.",
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
    probable: ["Hero", "Services", "Pricing", "Gallery", "Reviews", "Contact", "Maps", "Analytics"],
    boundaries: ["No full webshop", "No custom app", "CMS/payment only in Premium"],
  },
  premium: {
    key: "premium",
    name: "Premium Website",
    base: 899,
    max: 1499,
    monthly: 34,
    rawValue: 2690,
    badge: "Complete website package",
    bestFor: "Businesses that need the full normal website package: booking, editable content, payments, languages, animations and launch support.",
    description:
      "Best for businesses that need the complete website package with advanced features and stronger polish.",
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
    probable: ["Custom hero", "Services", "Booking", "Payment link", "CMS", "Multilingual", "Animations", "SEO", "Analytics"],
    boundaries: ["No full custom SaaS", "No user accounts", "No complex webshop with inventory/shipping"],
  },
};

const PORTFOLIO_CONCEPTS = [
  {
    title: "Premium Barber Launch",
    type: "Barber / salon",
    status: "Featured concept",
    outcome: "Booking-first mobile flow",
    description:
      "A sharp dark website direction with prices, services, reviews, gallery, location and a booking CTA that stays easy to find.",
    palette: ["#09090b", "#3f2f20", "#d6b179"],
    sections: ["Booking", "Prices", "Gallery", "Reviews"],
    highlights: ["Clear service menu", "Mobile booking buttons", "Location proof"],
    icon: Scissors,
  },
  {
    title: "Local Service Enquiries",
    type: "Contractor / repair / cleaning",
    status: "Lead-focused build",
    outcome: "Fewer doubts before contact",
    description:
      "A practical structure that explains the service area, shows proof, answers common questions and gives visitors quick contact options.",
    palette: ["#0f172a", "#0ea5e9", "#f8fafc"],
    sections: ["Services", "Reviews", "FAQ", "Call CTA"],
    highlights: ["Service-area clarity", "Trust signals", "Fast quote flow"],
    icon: Hammer,
  },
  {
    title: "Consultant Credibility Site",
    type: "Personal brand",
    status: "Trust-first direction",
    outcome: "Warmer first call requests",
    description:
      "A calm, expert-led layout with a clear offer, about story, testimonials and a simple path to book a consultation.",
    palette: ["#1f2937", "#14b8a6", "#f8fafc"],
    sections: ["Offer", "About", "Testimonials", "Call"],
    highlights: ["Plain-language offer", "Proof-led copy", "Consultation path"],
    icon: Handshake,
  },
  {
    title: "Artist Portfolio Showcase",
    type: "Creative / portfolio",
    status: "Visual showcase",
    outcome: "Projects that feel curated",
    description:
      "An image-led portfolio direction with selected projects, a short story section and a commission enquiry path.",
    palette: ["#111827", "#ec4899", "#fdf2f8"],
    sections: ["Projects", "Gallery", "About", "Inquiry"],
    highlights: ["Project-led layout", "Commission CTA", "Strong visual rhythm"],
    icon: Camera,
  },
];

const PROCESS_STEPS = [
  {
    title: "Define the website",
    description:
      "The configurator turns vague ideas into a clear website brief: goal, pages, style, features and content needs.",
    icon: Target,
  },
  {
    title: "Choose direction",
    description:
      "You see possible visual directions, adjust colors and explain the feeling you want before committing.",
    icon: Palette,
  },
  {
    title: "Get package + estimate",
    description:
      "The system recommends Starter, Business or Premium with a realistic scope and estimated price.",
    icon: PackageCheck,
  },
  {
    title: "We build it for you",
    description:
      "You do not build the website yourself. We use the brief to design, build and launch it properly.",
    icon: Wrench,
  },
];

const steps = [
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

const defaultAnswers = {
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

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function toggleArrayValue(array, value) {
  return array.includes(value) ? array.filter((item) => item !== value) : [...array, value];
}

function getSuggestedSelections(businessType, goals) {
  const lowerBusiness = businessType.toLowerCase();
  const goalText = goals.join(" ").toLowerCase();

  let sections = ["Home", "Services", "About", "Contact", "Reviews"];
  let functionality = ["SEO setup", "Google Analytics"];

  if (lowerBusiness.includes("barber") || lowerBusiness.includes("tattoo") || lowerBusiness.includes("beauty")) {
    sections = ["Home", "Services", "Pricing", "Gallery", "Booking", "Reviews", "Contact", "Location"];
    functionality = ["Booking system", "WhatsApp button", "Google Maps", "SEO setup", "Google Analytics"];
  }

  if (lowerBusiness.includes("restaurant") || lowerBusiness.includes("café")) {
    sections = ["Home", "Services", "Pricing", "Gallery", "Reviews", "Contact", "Location", "FAQ"];
    functionality = ["Google Maps", "WhatsApp button", "SEO setup", "Google Analytics"];
  }

  if (lowerBusiness.includes("artist") || lowerBusiness.includes("portfolio")) {
    sections = ["Home", "Gallery", "About", "Contact", "FAQ"];
    functionality = ["Animations", "SEO setup", "Google Analytics"];
  }

  if (lowerBusiness.includes("local service")) {
    sections = ["Home", "Services", "Pricing", "Reviews", "FAQ", "Contact", "Location", "Before / After"];
    functionality = ["WhatsApp button", "Google Maps", "SEO setup", "Google Analytics"];
  }

  if (lowerBusiness.includes("webshop") || goalText.includes("sell products")) {
    sections = ["Home", "Shop", "About", "Reviews", "FAQ", "Contact"];
    functionality = ["Online payment / deposit link", "CMS / editable content", "SEO setup", "Google Analytics"];
  }

  if (goalText.includes("bookings")) {
    sections = Array.from(new Set([...sections, "Booking", "Pricing"]));
    functionality = Array.from(new Set([...functionality, "Booking system"]));
  }

  if (goalText.includes("portfolio")) {
    sections = Array.from(new Set([...sections, "Gallery"]));
  }

  if (goalText.includes("collect leads")) {
    sections = Array.from(new Set([...sections, "FAQ", "Reviews"]));
    functionality = Array.from(new Set([...functionality, "WhatsApp button"]));
  }

  return { sections, functionality };
}

function getPackageKey(score, selectedSections, selectedFunctionality) {
  const hasShop = selectedSections.includes("Shop");
  const mustBePremium = selectedFunctionality.some((item) =>
    [
      "CMS / editable content",
      "Multilingual",
      "Online payment / deposit link",
    ].includes(item)
  );

  const premiumCombination =
    selectedFunctionality.includes("Booking system") &&
    (selectedSections.length >= 8 || selectedFunctionality.includes("Animations"));

  if (hasShop || mustBePremium || premiumCombination || score >= 15) return "premium";
  if (score >= 7 || selectedSections.length >= 5) return "business";
  return "starter";
}

function getDesignDirections(answers) {
  const style = answers.style || "Clean corporate";
  const business = answers.businessType || "Local service business";
  const primaryGoal = answers.goals[0] || "Build credibility";
  const styleObject = STYLE_DIRECTIONS.find((item) => item.label === style) || STYLE_DIRECTIONS[3];
  const palette = answers.customColors?.length === 3 ? answers.customColors : styleObject.palette;

  return [
    {
      name: `${style} Signature`,
      tag: "Closest to your selected style",
      headline: business.includes("Other") ? "A focused website with a clear offer" : `A ${style.toLowerCase()} website for ${business.toLowerCase()}`,
      description: `Built around your main goal: ${primaryGoal.toLowerCase()}. This direction turns your chosen mood into a clear, premium first impression.`,
      palette,
      layout: "Large hero, clear CTA, trust section, service blocks, contact flow.",
    },
    {
      name: "Conversion Focus",
      tag: "Best for leads and bookings",
      headline: "A website designed to turn visitors into enquiries",
      description:
        "This direction puts the offer, CTA buttons, services, reviews and contact options higher on the page, so users know what to do quickly.",
      palette: [palette[0], "#f8fafc", "#22c55e"],
      layout: "Direct headline, CTA row, benefits, services, proof, FAQ, contact.",
    },
    {
      name: "Brand Story",
      tag: "Best for trust and premium positioning",
      headline: "A website that makes the business feel established and memorable",
      description:
        "This direction focuses more on story, visual identity, atmosphere, brand confidence and polished presentation.",
      palette: [palette[0], palette[1], palette[2]],
      layout: "Atmospheric hero, about story, visual gallery, values, testimonials, contact.",
    },
  ];
}

function calculateResult(answers) {
  const goalScore = answers.goals.reduce((sum, goal) => {
    const found = WEBSITE_GOALS.find((item) => item.label === goal);
    return sum + (found?.weight || 0);
  }, 0);

  const sectionScore = answers.sections.reduce((sum, section) => {
    const found = SECTIONS.find((item) => item.label === section);
    return sum + (found?.weight || 0);
  }, 0);

  const functionScore = answers.functionality.reduce((sum, item) => {
    const found = FUNCTIONALITY.find((feature) => feature.label === item);
    return sum + (found?.weight || 0);
  }, 0);

  const missingContent = CONTENT_ITEMS.filter((item) => answers.contentReady[item.key] !== "yes");
  const contentScore = missingContent.length >= 4 ? 3 : missingContent.length >= 2 ? 2 : missingContent.length >= 1 ? 1 : 0;

  const totalScore = goalScore + sectionScore + functionScore + contentScore;
  const packageKey = getPackageKey(totalScore, answers.sections, answers.functionality);
  const selectedPackage = PACKAGES[packageKey];

  // Internal feature values explain complexity, but they do NOT push the client above the package cap.
  const functionalityPrice = answers.functionality.reduce((sum, item) => {
    const found = FUNCTIONALITY.find((feature) => feature.label === item);
    return sum + (found?.price || 0);
  }, 0);

  const contentPrice = missingContent.reduce((sum, item) => sum + item.missingPrice, 0);
  const extraSections = Math.max(0, answers.sections.length - 5) * 75;
  const internalRawValue = selectedPackage.rawValue + functionalityPrice + contentPrice + extraSections;

  // Productized pricing rule: final visible price is capped by package.
  const estimatedPrice = selectedPackage.max;
  const deposit = Math.max(79, Math.round((estimatedPrice * 0.2) / 10) * 10);

  const delivery =
    answers.urgency === "72h express"
      ? "48–72 hours, only if the scope and content are ready"
      : answers.urgency === "7-day full package"
      ? "Around 7 days, depending on feedback speed"
      : packageKey === "premium"
      ? "2–3 weeks"
      : packageKey === "business"
      ? "5–10 days"
      : "3–7 days";

  const designDirections = getDesignDirections(answers);
  const selectedDesign = designDirections.find((item) => item.name === answers.selectedDesign) || designDirections[0];

  const leadScore =
    (answers.lead.email ? 25 : 0) +
    (answers.nextStep === "Pay deposit" ? 35 : answers.nextStep === "Book consultation" ? 25 : answers.nextStep === "Send brief only" ? 10 : 0) +
    (answers.urgency !== "Normal delivery" ? 10 : 0) +
    (missingContent.length <= 2 ? 15 : 5) +
    (answers.goals.length > 1 ? 10 : 0) +
    (answers.functionality.length > 0 ? 5 : 0);

  return {
    score: totalScore,
    packageKey,
    package: selectedPackage,
    missingContent,
    functionalityPrice,
    contentPrice,
    extraSections,
    internalRawValue,
    urgencyMultiplier: 1,
    estimatedPrice,
    deposit,
    delivery,
    monthly: selectedPackage.monthly,
    designDirections,
    selectedDesign,
    leadScore: Math.min(100, leadScore),
  };
}

function getPackageEstimateForDisplay(packageKey, answers) {
  return PACKAGES[packageKey].max;
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function App() {
  const [view, setView] = useState("home");
  const [analyticsConsent, setAnalyticsConsent] = useState(() => localStorage.getItem("qw_analytics_consent") || "unset");

  useEffect(() => {
    if (analyticsConsent === "accepted") {
      loadGoogleAnalytics();
      trackEvent("analytics_consent_accepted");
    }
  }, [analyticsConsent]);

  const acceptAnalytics = () => {
    localStorage.setItem("qw_analytics_consent", "accepted");
    setAnalyticsConsent("accepted");
  };

  const declineAnalytics = () => {
    localStorage.setItem("qw_analytics_consent", "declined");
    setAnalyticsConsent("declined");
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      {view === "home" ? <HomePage onStart={() => setView("configurator")} /> : <ConfiguratorPage onBackHome={() => setView("home")} />}
      {analyticsConsent === "unset" && <CookieBanner onAccept={acceptAnalytics} onDecline={declineAnalytics} />}
    </div>
  );
}

export default App;

function HomePage({ onStart }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const start = () => {
    trackEvent("start_configurator_clicked", { location: "homepage" });
    onStart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    ["What you get", "deliverables"],
    ["Examples", "portfolio"],
    ["Packages", "packages"],
    ["Process", "process"],
    ["FAQ", "faq"],
  ];

  return (
    <div className="bg-[linear-gradient(180deg,#fffdf7_0%,#eef7f6_42%,#f7f7fb_100%)]">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Brand />
          <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-600 lg:flex">
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => scrollToId(id)} className="transition hover:text-zinc-950">
                {label}
              </button>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <button onClick={() => scrollToId("packages")} className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-50">
              View packages
            </button>
            <button onClick={start} className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-amber-500/15 hover:bg-zinc-800">
              Start website plan
            </button>
          </div>
          <button className="rounded-xl border border-zinc-200 p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-zinc-200 bg-white px-4 py-4 lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {navItems.map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => {
                    setMenuOpen(false);
                    scrollToId(id);
                  }}
                  className="rounded-xl px-3 py-3 text-left text-sm font-medium hover:bg-zinc-100"
                >
                  {label}
                </button>
              ))}
              <button onClick={start} className="mt-2 rounded-xl bg-zinc-950 px-4 py-3 text-sm font-medium text-white">
                Start website plan
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        <HeroSection onStart={start} />
        <PositioningStrip />
        <DeliverablesSection />
        <WhoWeHelpSection />
        <PortfolioSection />
        <PackagesSection onStart={start} />
        <ProcessSection />
        <PlainLanguageSection />
        <FAQSection />
        <FinalCTA onStart={start} />
      </main>
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-sm font-black text-white shadow-lg shadow-amber-500/25 ring-2 ring-amber-300/60">
        QW
      </div>
      <div>
        <p className="text-base font-black leading-none tracking-tight">QuickWeb Studio</p>
        <p className="mt-1 text-xs font-medium text-zinc-500">Plain-English plans. Human-built sites.</p>
      </div>
    </div>
  );
}

function HeroSection({ onStart }) {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
      <div className="flex flex-col justify-center">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-zinc-900 shadow-sm">
            <Sparkles className="h-4 w-4 text-amber-600" /> Website plan + clear quote direction in minutes
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
            Websites that make your business obvious in 5 seconds.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">
            QuickWeb Studio helps local businesses turn "I need a better website" into a clear plan: what to say, what to show, which features matter and what package fits.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={onStart} className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-4 font-bold text-white shadow-xl shadow-zinc-950/20 transition hover:-translate-y-0.5 hover:bg-zinc-800">
              Plan my website <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => scrollToId("portfolio")} className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-4 font-bold text-zinc-900 transition hover:-translate-y-0.5 hover:shadow-lg">
              View work examples <Eye className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <TrustPill icon={MessageSquareText} title="Plain copy" text="No vague web jargon" />
            <TrustPill icon={MonitorSmartphone} title="Mobile-first" text="Built for quick decisions" />
            <TrustPill icon={ShieldCheck} title="Human build" text="You are not left with a template" />
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="relative">
        <div className="relative overflow-hidden rounded-[2rem] border border-zinc-900 bg-zinc-950 p-4 shadow-2xl shadow-zinc-950/25">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-white">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-amber-200">Brief snapshot</p>
                <h3 className="text-2xl font-black">Premium Barber Studio</h3>
              </div>
              <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-zinc-950">Ready to build</span>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#151515]">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-medium text-zinc-400">quickweb-preview.site</span>
              </div>
              <div className="grid gap-5 p-5 sm:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-zinc-200">Open until 19:00</p>
                  <h4 className="text-3xl font-black leading-tight">Book a sharper cut without calling first.</h4>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">Services, prices, work examples and booking are all visible before visitors start scrolling.</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-amber-300 px-3 py-2 text-xs font-black text-zinc-950">Book now</span>
                    <span className="rounded-full border border-white/15 px-3 py-2 text-xs font-bold text-white">View prices</span>
                  </div>
                </div>
                <div className="grid gap-3">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <Scissors className="mb-3 h-5 w-5 text-amber-200" />
                    <p className="text-sm font-bold">Haircut + beard</p>
                    <p className="mt-1 text-xs text-zinc-400">45 min · from €42</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <Quote className="mb-3 h-5 w-5 text-teal-200" />
                    <p className="text-sm font-bold">4.9 average rating</p>
                    <p className="mt-1 text-xs text-zinc-400">Reviews visible before contact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">Package cap</p>
              <p className="mt-1 text-3xl font-black">€899</p>
              <p className="mt-1 text-sm text-zinc-500">Advanced website</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">Plan includes</p>
              <p className="mt-1 text-3xl font-black">8 sections</p>
              <p className="mt-1 text-sm text-zinc-500">Booking, reviews, maps</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function TrustPill({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="rounded-xl bg-teal-50 p-2 text-teal-700">
          <Icon className="h-4 w-4" />
        </span>
        <p className="font-black text-zinc-950">{title}</p>
      </div>
      <p className="mt-1 text-sm text-zinc-500">{text}</p>
    </div>
  );
}

function PositioningStrip() {
  return (
    <section className="border-y border-zinc-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 lg:grid-cols-3 lg:px-8">
        <PositioningLine number="01" text="Visitors understand the offer quickly." />
        <PositioningLine number="02" text="The website shows proof before asking for trust." />
        <PositioningLine number="03" text="The next step is obvious: book, call, message or buy." />
      </div>
    </section>
  );
}

function PositioningLine({ number, text }) {
  return (
    <div className="flex gap-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-sm font-black text-zinc-950">{number}</span>
      <p className="font-bold leading-6 text-zinc-900">{text}</p>
    </div>
  );
}

function SectionHeader({ eyebrow, title, text, icon: Icon, invert = false, align = "center" }) {
  const centered = align === "center";
  return (
    <div className={cn("mb-10 max-w-3xl", centered && "mx-auto text-center")}>
      <div className={cn("mb-4 flex items-center gap-3", centered && "justify-center")}>
        {Icon && (
          <span className={cn("rounded-2xl p-3", invert ? "bg-white/10 text-amber-200" : "bg-zinc-950 text-white")}>
            <Icon className="h-5 w-5" />
          </span>
        )}
        <p className={cn("text-sm font-black uppercase tracking-[0.18em]", invert ? "text-zinc-300" : "text-zinc-500")}>{eyebrow}</p>
      </div>
      <h2 className={cn("text-4xl font-black tracking-tight sm:text-5xl", invert ? "text-white" : "text-zinc-950")}>{title}</h2>
      {text && <p className={cn("mt-4 text-lg leading-8", invert ? "text-zinc-300" : "text-zinc-600")}>{text}</p>}
    </div>
  );
}

function DeliverablesSection() {
  const items = [
    {
      icon: LayoutTemplate,
      title: "A website structure that sells the offer",
      text: "We decide what visitors need to see first, what proof they need and where every call-to-action belongs.",
    },
    {
      icon: MonitorSmartphone,
      title: "Mobile-first design",
      text: "Most customers will check you from their phone. The site is planned around fast scanning and easy taps.",
    },
    {
      icon: MousePointerClick,
      title: "Clear next steps",
      text: "Booking, WhatsApp, calls, quote requests and contact forms are placed where people naturally need them.",
    },
    {
      icon: Search,
      title: "Search-friendly basics",
      text: "Clean titles, page structure, local details and content hierarchy so Google and customers understand the business.",
    },
    {
      icon: PenTool,
      title: "Copy polish",
      text: "We turn rough notes into simple, confident website text that explains the offer without sounding robotic.",
    },
    {
      icon: Wrench,
      title: "Launch and care",
      text: "We help get the website online and can handle updates, small fixes and improvements after launch.",
    },
  ];

  return (
    <section id="deliverables" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="What we deliver"
        title="A build-ready website plan, then the actual website."
        text="The form is not the product. It simply turns messy ideas into a practical brief so the website can be designed and built with less guesswork."
        icon={PackageCheck}
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <FeatureCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <div className="group relative overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-lg shadow-zinc-200/50 transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-300 via-teal-300 to-rose-300" />
      <div className="mb-5 flex items-center gap-3">
        <span className="rounded-2xl bg-zinc-950 p-3 text-white shadow-lg shadow-zinc-950/10">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="text-xl font-black leading-tight text-zinc-950">{title}</h3>
      </div>
      <p className="mt-3 leading-7 text-zinc-600">{text}</p>
    </div>
  );
}

function WhoWeHelpSection() {
  const groups = [
    { label: "Barbers", note: "Booking, prices, reviews", icon: Scissors },
    { label: "Salons", note: "Services, style, booking", icon: Sparkles },
    { label: "Restaurants", note: "Menu, location, contact", icon: UtensilsCrossed },
    { label: "Local services", note: "Trust, areas, quick quotes", icon: Hammer },
    { label: "Coaches", note: "Offer, proof, consultation", icon: Handshake },
    { label: "Portfolios", note: "Projects, story, enquiries", icon: Camera },
  ];

  return (
    <section className="bg-zinc-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Who it is for"
          title="For people who know they need a better site, but not the web jargon."
          text="The flow works best for small businesses, solo experts and local teams that need a polished website without turning the planning into homework."
          icon={Handshake}
          invert
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 transition hover:bg-white/[0.09]">
              <div className="flex items-center gap-3">
                <span className="rounded-2xl bg-white/10 p-3 text-amber-200">
                  <group.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-black">{group.label}</p>
                  <p className="mt-1 text-sm text-zinc-400">{group.note}</p>
                </div>
                <Check className="ml-auto h-5 w-5 shrink-0 text-teal-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Featured work examples"
        title="Show visitors what is possible before they fill out the form."
        text="These example directions make the offer more concrete: different businesses, different goals, different website structures."
        icon={Images}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {PORTFOLIO_CONCEPTS.map((concept) => (
          <ConceptCard key={concept.title} concept={concept} />
        ))}
      </div>
    </section>
  );
}

function ConceptCard({ concept }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-xl shadow-zinc-200/60 transition hover:-translate-y-1 hover:shadow-2xl">
      <div
        className="min-h-72 p-6 text-white"
        style={{ background: `linear-gradient(135deg, ${concept.palette[0]}, ${concept.palette[1]})` }}
      >
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white">{concept.status}</p>
            <h3 className="mt-4 max-w-md text-3xl font-black tracking-tight">{concept.title}</h3>
            <p className="mt-2 text-sm font-medium text-white/75">{concept.type}</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-3">
            <concept.icon className="h-6 w-6" />
          </div>
        </div>
        <div className="rounded-3xl border border-white/15 bg-black/15 p-4">
          <p className="text-sm font-bold text-amber-100">{concept.outcome}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {concept.sections.map((section) => (
              <span key={section} className="rounded-full bg-white/15 px-3 py-2 text-sm font-bold text-white">
                {section}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="leading-7 text-zinc-600">{concept.description}</p>
        <div className="mt-5 grid gap-2">
          {concept.highlights.map((highlight) => (
            <div key={highlight} className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-3 text-sm font-bold text-zinc-800">
              <Check className="h-4 w-4 text-teal-600" />
              {highlight}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PackagesSection({ onStart }) {
  return (
    <section id="packages" className="border-y border-zinc-200 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Packages"
          title="Simple packages, clearer expectations."
          text="Visitors can see the rough price range first. The configurator then recommends the package that fits their goals, features and content readiness."
          icon={BadgeEuro}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {Object.values(PACKAGES).map((pack) => (
            <PackageHomeCard key={pack.key} pack={pack} featured={pack.key === "business"} onStart={onStart} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PackageHomeCard({ pack, featured, onStart }) {
  return (
    <div className={cn("rounded-[2rem] border p-6 shadow-xl shadow-zinc-200/60", featured ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white")}> 
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className={cn("rounded-full px-3 py-1 text-xs font-medium", featured ? "bg-white text-zinc-950" : "bg-zinc-100 text-zinc-600")}>{pack.badge}</span>
        {featured && <Star className="h-5 w-5" />}
      </div>
      <h3 className="text-2xl font-black">{pack.name}</h3>
      <p className={cn("mt-3 leading-7", featured ? "text-zinc-300" : "text-zinc-600")}>{pack.description}</p>
      <p className="mt-6 text-sm uppercase tracking-wide opacity-70">From</p>
      <p className="mt-1 text-4xl font-black">€{pack.base}</p>
      <p className={cn("mt-1 text-sm", featured ? "text-zinc-300" : "text-zinc-500")}>Max €{pack.max}</p>
      <p className={cn("mt-1 text-sm", featured ? "text-zinc-300" : "text-zinc-500")}>Maintenance from €{pack.monthly}/month</p>
      <ul className="mt-6 space-y-3">
        {pack.included.slice(0, 5).map((item) => (
          <li key={item} className="flex gap-3 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0" />
            <span className={featured ? "text-zinc-200" : "text-zinc-700"}>{item}</span>
          </li>
        ))}
      </ul>
      <button onClick={onStart} className={cn("mt-7 w-full rounded-full px-5 py-3 text-sm font-medium transition", featured ? "bg-white text-zinc-950 hover:bg-zinc-100" : "bg-zinc-950 text-white hover:bg-zinc-800")}>Start with this package</button>
    </div>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Process"
        title="From unclear idea to website that can be built."
        text="The client answers practical questions. You get a focused plan for content, design, sections, features and next steps."
        icon={Compass}
      />
      <div className="grid gap-5 lg:grid-cols-4">
        {PROCESS_STEPS.map((item, index) => (
          <div key={item.title} className="rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-lg shadow-zinc-200/50">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-zinc-950 p-3 text-white">
                <item.icon className="h-5 w-5" />
              </div>
              <span className="ml-auto text-sm font-black text-zinc-400">0{index + 1}</span>
            </div>
            <h3 className="text-lg font-black">{item.title}</h3>
            <p className="mt-3 leading-7 text-zinc-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PlainLanguageSection() {
  const translations = [
    {
      icon: MessageSquareText,
      client: "I want more people to contact me.",
      plan: "We make the offer, proof and contact buttons easier to find.",
    },
    {
      icon: Camera,
      client: "My work looks better than my current site.",
      plan: "We build around photos, examples, reviews and a more premium visual direction.",
    },
    {
      icon: FileQuestion,
      client: "I do not know what pages I need.",
      plan: "We recommend the right sections based on the business type and goal.",
    },
    {
      icon: ClipboardCheck,
      client: "I need a quote, but I am not technical.",
      plan: "We turn your answers into a clear brief, package and next step.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div>
          <SectionHeader
            eyebrow="No-tech translation"
            title="Clients say what they mean. The form turns it into website decisions."
            text="The configurator uses practical questions small business owners actually recognize."
            icon={MessageSquareText}
            align="left"
          />
          <p className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 leading-8 text-zinc-700">
            The goal is fewer "what does this mean?" moments: clear labels, concrete examples and choices that sound like real business problems.
          </p>
        </div>
        <div className="grid gap-4">
          {translations.map((item) => (
            <div key={item.client} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="flex items-start gap-4">
                <span className="rounded-2xl bg-zinc-950 p-3 text-white">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-black text-zinc-950">{item.client}</p>
                  <p className="mt-2 leading-7 text-zinc-600">{item.plan}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    ["Is this a website builder?", "No. You use the form to explain what you need. QuickWeb Studio uses that plan to design, build and launch the website for you."],
    ["Can you improve my current website?", "Yes. Choose \"Improve my current website\" at the start. We can keep what works and rethink the parts that feel outdated, unclear or hard to use."],
    ["Can you build a completely new website?", "Yes. Choose \"Build a completely new website\" if you need a fresh start, a first website or a replacement for an old site."],
    ["What if I do not know which pages I need?", "That is exactly what the questions are for. Your business type and goals help suggest useful sections like services, reviews, booking, FAQ, gallery or location."],
    ["Do I need all my text and photos ready?", "No. It helps, but it is not required. The form asks what you already have so we can include copy, image selection or content help in the scope."],
    ["Can people book, call or message me through the site?", "Yes. You can select booking, WhatsApp, contact forms, maps, payment links and other practical features during the configurator."],
    ["Will the website work well on phones?", "Yes. The design is planned mobile-first because most local customers will visit from their phone before they call, book or message."],
    ["Do I have to pay immediately?", "No. At the end you can choose a deposit, a short consultation or just send the brief first."],
    ["How long does it take?", "Simple websites can often be planned and built faster. Bigger projects with booking, payments, multiple languages or lots of content need more time."],
  ];

  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="FAQ" title="Practical questions, plain answers." icon={FileQuestion} />
      <div className="space-y-3">
        {faqs.map(([question, answer]) => (
          <details key={question} className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              {question}
              <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
            </summary>
            <p className="mt-3 leading-7 text-zinc-600">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function FinalCTA({ onStart }) {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-zinc-950 p-8 text-white shadow-2xl shadow-zinc-950/20 sm:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">Start now</p>
            <h2 className="max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">Start with a clear website plan, not a vague quote request.</h2>
            <p className="mt-4 max-w-2xl leading-8 text-zinc-300">A better brief means stronger copy, cleaner pricing and fewer confusing back-and-forth messages.</p>
          </div>
          <button onClick={onStart} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-medium text-zinc-950 transition hover:bg-zinc-100">
            Start website plan <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function CookieBanner({ onAccept, onDecline }) {
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-3xl border border-zinc-200 bg-white p-5 shadow-2xl shadow-zinc-950/20">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="font-semibold text-zinc-950">Analytics cookies</p>
          <p className="mt-1 text-sm leading-6 text-zinc-600">
            We can use analytics to understand how people move through the configurator. No names, emails, phone numbers or private notes are sent.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={onDecline} className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-50">Decline</button>
          <button onClick={onAccept} className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">Accept</button>
        </div>
      </div>
    </div>
  );
}

function ConfiguratorPage({ onBackHome }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(defaultAnswers);
  const result = useMemo(() => calculateResult(answers), [answers]);
  const suggestions = useMemo(() => getSuggestedSelections(answers.businessType, answers.goals), [answers.businessType, answers.goals]);

  useEffect(() => {
    trackEvent("configurator_viewed");
  }, []);

  const canGoBack = step > 0;
  const showPriceInSidebar = step >= 8;

  const update = (patch) => setAnswers((prev) => ({ ...prev, ...patch }));
  const updateLead = (patch) => setAnswers((prev) => ({ ...prev, lead: { ...prev.lead, ...patch } }));
  const updateNote = (key, value) => setAnswers((prev) => ({ ...prev, notes: { ...prev.notes, [key]: value } }));
  const updateContentReady = (key, value) =>
    setAnswers((prev) => ({
      ...prev,
      contentReady: { ...prev.contentReady, [key]: value },
    }));

  const updateColor = (index, value) => {
    setAnswers((prev) => {
      const nextColors = [...prev.customColors];
      nextColors[index] = value;
      return { ...prev, customColors: nextColors };
    });
  };

  const selectStyle = (styleLabel) => {
    const found = STYLE_DIRECTIONS.find((item) => item.label === styleLabel);
    update({ style: styleLabel, customColors: found?.palette || answers.customColors });
    trackEvent("style_selected", { style: styleLabel });
  };

  const applySuggestions = () => {
    update({ sections: suggestions.sections, functionality: suggestions.functionality });
    trackEvent("smart_suggestions_applied", { business_type: answers.businessType });
  };

  const next = () => {
    trackEvent("step_completed", { step_number: step + 1, step_title: steps[step].title });
    if (step === 8) trackEvent("package_recommended", { package: result.package.name });
    if (step === 9) trackEvent("lead_submitted", { preferred_contact: answers.lead.preferredContact });
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const back = () => setStep((prev) => Math.max(prev - 1, 0));
  const restart = () => {
    setAnswers(defaultAnswers);
    setStep(0);
    trackEvent("configurator_restarted");
  };

  const leadComplete = answers.lead.name && answers.lead.email && answers.lead.businessName;
  const canContinue =
    (step === 0 && answers.projectMode && answers.businessType) ||
    (step === 1 && answers.goals.length > 0) ||
    (step === 2 && answers.style) ||
    (step === 3 && answers.sections.length >= 3) ||
    step === 4 ||
    step === 5 ||
    (step === 6 && answers.urgency) ||
    (step === 7 && result.selectedDesign) ||
    step === 8 ||
    (step === 9 && leadComplete) ||
    (step === 10 && answers.nextStep) ||
    step === 11;

  const briefEmailBody = encodeURIComponent(
    `Hi, I created a website brief.

Business: ${answers.lead.businessName}
Name: ${answers.lead.name}
Email: ${answers.lead.email}
Phone: ${answers.lead.phone}

Starting point: ${answers.projectMode}
Business type: ${answers.businessType}
Goals: ${answers.goals.join(", ")}
Style: ${answers.style}
Colors: ${answers.customColors.join(", ")}
Sections: ${answers.sections.join(", ")}
Functionality: ${answers.functionality.join(", ") || "None"}
Selected design: ${result.selectedDesign.name}
Recommended package: ${result.package.name}
Estimated price: €${result.estimatedPrice}
Deposit: €${result.deposit}
Monthly maintenance: €${result.monthly}/month
Delivery: ${result.delivery}

Notes:
Business: ${answers.notes.business}
Goals: ${answers.notes.goals}
Style: ${answers.notes.style}
Sections: ${answers.notes.sections}
Functionality: ${answers.notes.functionality}
Content: ${answers.notes.content}
Urgency: ${answers.notes.urgency}
Design: ${answers.notes.design}
Package: ${answers.notes.package}`
  );

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffdf7_0%,#eef7f6_48%,#f7f7fb_100%)] text-zinc-950">
      <BriefDocument answers={answers} result={result} />

      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button onClick={onBackHome} className="text-left">
            <Brand />
          </button>
          <button onClick={onBackHome} className="hidden rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-50 sm:block">
            Back to homepage
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <section>
          <div className="mb-8 overflow-hidden rounded-[2rem] bg-zinc-950 p-6 text-white shadow-2xl shadow-zinc-950/20 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-zinc-200">
                  <Zap className="h-4 w-4" /> Website plan in plain English
                </p>
                <h1 className="max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
                  Shape the website around the business goal, not a blank template.
                </h1>
                <p className="mt-4 max-w-2xl text-zinc-300">
                  Choose the starting point, business type, outcomes, style, sections, features and content readiness. The result is a clear package recommendation and brief.
                </p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4 text-sm text-zinc-200 md:w-72">
                <p className="font-bold text-white">Less guessing</p>
                <p className="mt-1">The estimate appears after the important choices are clear, so the price feels easier to understand.</p>
              </div>
            </div>
          </div>

          <Progress currentStep={step} />

          <AnimatePresence mode="wait">
            <StepShell step={step}>
              {step === 0 && (
                <div className="space-y-7">
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Rocket className="h-5 w-5 text-zinc-700" />
                      <h3 className="text-lg font-black text-zinc-950">What are we starting from?</h3>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-2">
                      {PROJECT_MODES.map((mode) => (
                        <ProjectModeCard
                          key={mode.value}
                          mode={mode}
                          selected={answers.projectMode === mode.value}
                          onSelect={() => update({ projectMode: mode.value })}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-zinc-700" />
                      <h3 className="text-lg font-black text-zinc-950">Who is the website for?</h3>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                    {BUSINESS_TYPES.map((type) => (
                      <OptionButton
                        key={type}
                        selected={answers.businessType === type}
                        onClick={() => {
                          update({ businessType: type });
                          trackEvent("business_type_selected", { business_type: type });
                        }}
                        icon={getBusinessTypeMeta(type).icon}
                        description={getBusinessTypeMeta(type).description}
                      >
                        {type}
                      </OptionButton>
                    ))}
                    </div>
                  </div>
                  <NotesBox
                    label="Tell us more about the business"
                    placeholder="Example: I run a premium barber studio in Enschede focused on men’s haircuts and beard treatments."
                    value={answers.notes.business}
                    onChange={(value) => updateNote("business", value)}
                  />
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5">
                    <div className="flex items-start gap-3">
                      <Goal className="mt-1 h-5 w-5 text-amber-700" />
                      <div>
                        <p className="font-black text-zinc-950">Pick the outcomes that would make the website worth it.</p>
                        <p className="mt-1 text-sm leading-6 text-zinc-700">A booking site, portfolio, shop and credibility site should not be structured the same way.</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {WEBSITE_GOALS.map((goal) => (
                      <GoalOption
                        key={goal.label}
                        goal={goal}
                        selected={answers.goals.includes(goal.label)}
                        onClick={() => update({ goals: toggleArrayValue(answers.goals, goal.label) })}
                      />
                    ))}
                  </div>
                  <NotesBox
                    label="What result matters most?"
                    placeholder="Example: The most important thing is that visitors book appointments through the website."
                    value={answers.notes.goals}
                    onChange={(value) => updateNote("goals", value)}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {STYLE_DIRECTIONS.map((style) => (
                      <OptionButton
                        key={style.label}
                        selected={answers.style === style.label}
                        onClick={() => selectStyle(style.label)}
                        icon={Palette}
                        description={style.description}
                      >
                        <span className="flex items-center gap-3">
                          {style.label}
                          <span className="flex -space-x-1">
                            {style.palette.map((color) => (
                              <span key={color} className="h-4 w-4 rounded-full border border-white/60" style={{ backgroundColor: color }} />
                            ))}
                          </span>
                        </span>
                      </OptionButton>
                    ))}
                  </div>

                  <ColorEditor colors={answers.customColors} updateColor={updateColor} colorMode={answers.colorMode} setColorMode={(value) => update({ colorMode: value })} />

                  <NotesBox
                    label="Describe the style in your own words"
                    placeholder="Example: Dark, masculine, premium, wood tones, not too flashy, strong typography."
                    value={answers.notes.style}
                    onChange={(value) => updateNote("style", value)}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div className="rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-600">
                    Select at least three sections. You can also apply smart recommendations based on business type and goals.
                  </div>

                  {answers.businessType && (
                    <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-medium text-zinc-950">Smart recommendation</p>
                          <p className="mt-1 text-sm text-zinc-500">Suggested sections: {suggestions.sections.join(", ")}</p>
                        </div>
                        <button onClick={applySuggestions} className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
                          Apply suggestions
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {SECTIONS.map((section) => (
                      <OptionButton
                        key={section.label}
                        selected={answers.sections.includes(section.label)}
                        onClick={() => update({ sections: toggleArrayValue(answers.sections, section.label) })}
                        icon={getSectionIcon(section.label)}
                        description={section.recommended ? "Usually recommended" : "Optional / scope-dependent"}
                      >
                        {section.label}
                      </OptionButton>
                    ))}
                  </div>

                  <NotesBox
                    label="Any specific pages or sections?"
                    placeholder="Example: I need a price calculator, a beard treatments section and a separate gallery for before/after photos."
                    value={answers.notes.sections}
                    onChange={(value) => updateNote("sections", value)}
                  />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5">
                  <div className="rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-600">
                    These features affect complexity and pricing. You can skip advanced features if the website only needs standard information and contact details.
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {FUNCTIONALITY.map((feature) => (
                      <OptionButton
                        key={feature.label}
                        selected={answers.functionality.includes(feature.label)}
                        onClick={() => update({ functionality: toggleArrayValue(answers.functionality, feature.label) })}
                        icon={feature.icon}
                        description={`Build effort: ${feature.complexity} · from €${feature.price}`}
                      >
                        {feature.label}
                      </OptionButton>
                    ))}
                  </div>
                  <NotesBox
                    label="Any integrations or special features?"
                    placeholder="Example: I use Calendly for booking and want WhatsApp contact plus Google Maps."
                    value={answers.notes.functionality}
                    onChange={(value) => updateNote("functionality", value)}
                  />
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-600">
                    Missing content does not block the project, but it affects difficulty, timeline and price.
                  </div>
                  {CONTENT_ITEMS.map((item) => (
                    <ContentReadyCard
                      key={item.key}
                      item={item}
                      value={answers.contentReady[item.key]}
                      onChange={(value) => updateContentReady(item.key, value)}
                    />
                  ))}
                  <NotesBox
                    label="What content do you already have?"
                    placeholder="Example: I have a logo and Instagram photos, but no website text yet."
                    value={answers.notes.content}
                    onChange={(value) => updateNote("content", value)}
                  />
                </div>
              )}

              {step === 6 && (
                <div className="space-y-5">
                  <div className="grid gap-3">
                    {URGENCY.map((urgency) => (
                      <OptionButton
                        key={urgency.label}
                        selected={answers.urgency === urgency.label}
                        onClick={() => update({ urgency: urgency.label })}
                        icon={Clock}
                        description={urgency.description}
                      >
                        {urgency.label}
                      </OptionButton>
                    ))}
                  </div>
                  <NotesBox
                    label="Deadline or reason for urgency"
                    placeholder="Example: I need the website before my shop opens next Friday."
                    value={answers.notes.urgency}
                    onChange={(value) => updateNote("urgency", value)}
                  />
                </div>
              )}

              {step === 7 && (
                <div className="space-y-6">
                  <div className="rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-600">
                    These are not full free website designs. They are visual directions that help the client choose the mood before final pricing.
                  </div>

                  <ColorEditor colors={answers.customColors} updateColor={updateColor} colorMode={answers.colorMode} setColorMode={(value) => update({ colorMode: value })} />

                  <div className="grid gap-5 xl:grid-cols-3">
                    {result.designDirections.map((direction) => (
                      <DesignCard
                        key={direction.name}
                        direction={direction}
                        selected={(answers.selectedDesign || result.designDirections[0].name) === direction.name}
                        onSelect={() => {
                          update({ selectedDesign: direction.name });
                          trackEvent("design_direction_selected", { direction: direction.name });
                        }}
                      />
                    ))}
                  </div>
                  <NotesBox
                    label="Design notes"
                    placeholder="Example: I like the dark premium option, but make it warmer with brown/wood tones and less gold."
                    value={answers.notes.design}
                    onChange={(value) => updateNote("design", value)}
                  />
                </div>
              )}

              {step === 8 && (
                <div className="space-y-6">
                  <div className="rounded-[1.75rem] bg-zinc-950 p-6 text-white">
                    <p className="mb-2 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm text-zinc-200">Recommended for you</p>
                    <h3 className="text-3xl font-black">{result.package.name}</h3>
                    <p className="mt-3 max-w-2xl text-zinc-300">{result.package.description}</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      <MetricCard label="Package cap" value={`€${result.estimatedPrice.toLocaleString("nl-NL")}`} />
                      <MetricCard label="Deposit from" value={`€${result.deposit.toLocaleString("nl-NL")}`} />
                      <MetricCard label="Maintenance" value={`€${result.monthly}/mo`} />
                    </div>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-3">
                    {Object.values(PACKAGES).map((pack) => (
                      <PackageComparisonCard
                        key={pack.key}
                        pack={pack}
                        answers={answers}
                        result={result}
                        recommended={pack.key === result.packageKey}
                      />
                    ))}
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                    <ProbableWebsiteVersion answers={answers} result={result} />
                    <SelectedDesignPreview result={result} />
                  </div>

                  <NotesBox
                    label="Package notes"
                    placeholder="Example: Business package looks right, but I may need CMS later."
                    value={answers.notes.package}
                    onChange={(value) => updateNote("package", value)}
                  />
                </div>
              )}

              {step === 9 && (
                <div className="space-y-5">
                  <div className="rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-600">
                    Your website brief is ready. Enter contact details so the brief can be sent and followed up professionally.
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input label="Your name" value={answers.lead.name} onChange={(value) => updateLead({ name: value })} placeholder="Maxim" />
                    <Input label="Business name" value={answers.lead.businessName} onChange={(value) => updateLead({ businessName: value })} placeholder="Your business" />
                    <Input label="Email" type="email" value={answers.lead.email} onChange={(value) => updateLead({ email: value })} placeholder="name@email.com" />
                    <Input label="Phone" value={answers.lead.phone} onChange={(value) => updateLead({ phone: value })} placeholder="+31 ..." />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-zinc-700">Preferred contact method</p>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {["Email", "Phone", "WhatsApp"].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => updateLead({ preferredContact: method })}
                          className={cn(
                            "rounded-xl border px-4 py-3 text-sm font-medium transition",
                            answers.lead.preferredContact === method
                              ? "border-zinc-950 bg-zinc-950 text-white"
                              : "border-zinc-200 hover:bg-zinc-50"
                          )}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>
                  <NotesBox
                    label="Contact notes"
                    placeholder="Example: Please contact me after 17:00 or send WhatsApp first."
                    value={answers.notes.lead}
                    onChange={(value) => updateNote("lead", value)}
                  />
                </div>
              )}

              {step === 10 && (
                <div className="space-y-5">
                  <div className="grid gap-4 lg:grid-cols-3">
                    {[
                      {
                        label: "Pay deposit",
                        value: "Pay deposit",
                        icon: CreditCard,
                        description: `Reserve the project and start from €${result.deposit.toLocaleString("nl-NL")}.`,
                      },
                      {
                        label: "Book a short call",
                        value: "Book consultation",
                        icon: CalendarDays,
                        description: "Discuss the project first before paying.",
                      },
                      {
                        label: "Send me the brief",
                        value: "Send brief only",
                        icon: Mail,
                        description: "Receive the website plan and decide later.",
                      },
                    ].map((option) => (
                      <OptionButton
                        key={option.value}
                        selected={answers.nextStep === option.value}
                        onClick={() => {
                          update({ nextStep: option.value });
                          trackEvent(option.value === "Pay deposit" ? "deposit_clicked" : option.value === "Book consultation" ? "consultation_clicked" : "brief_requested");
                        }}
                        icon={option.icon}
                        description={option.description}
                      >
                        {option.label}
                      </OptionButton>
                    ))}
                  </div>
                  <NotesBox
                    label="Next-step notes"
                    placeholder="Example: I want to start next week, but I first need to confirm the exact scope."
                    value={answers.notes.next}
                    onChange={(value) => updateNote("next", value)}
                  />
                </div>
              )}

              {step === 11 && (
                <div className="space-y-6">
                  <div className="rounded-[1.75rem] bg-zinc-950 p-6 text-white">
                    <div className="mb-4 inline-flex rounded-full bg-white/10 p-3">
                      <Check className="h-6 w-6" />
                    </div>
                    <h3 className="text-3xl font-black">Your website brief is ready.</h3>
                    <p className="mt-3 max-w-2xl text-zinc-300">
                      The client can now receive the brief, save it as a PDF, pay a deposit, or book a consultation.
                    </p>
                    <div className="mt-5 rounded-2xl bg-white/10 p-4">
                      <p className="text-sm text-zinc-300">Internal lead quality score</p>
                      <p className="mt-1 text-3xl font-semibold">{result.leadScore}/100</p>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-3">
                    <button
                      type="button"
                      onClick={() => {
                        trackEvent("pdf_brief_downloaded");
                        window.print();
                      }}
                      className="rounded-2xl border border-zinc-200 bg-white p-5 text-left shadow-md shadow-zinc-200/60 transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <Download className="mb-4 h-6 w-6" />
                      <p className="font-semibold">Save brief as PDF</p>
                      <p className="mt-1 text-sm text-zinc-500">Uses the browser print dialog. Choose “Save as PDF”.</p>
                    </button>

                    <a
                      href={`mailto:?subject=Website brief for ${encodeURIComponent(answers.lead.businessName || "new project")}&body=${briefEmailBody}`}
                      onClick={() => trackEvent("email_brief_opened")}
                      className="rounded-2xl border border-zinc-200 bg-white p-5 text-left shadow-md shadow-zinc-200/60 transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <Mail className="mb-4 h-6 w-6" />
                      <p className="font-semibold">Open email draft</p>
                      <p className="mt-1 text-sm text-zinc-500">Creates an email-ready brief using the selected answers.</p>
                    </a>

                    <button
                      type="button"
                      onClick={restart}
                      className="rounded-2xl border border-zinc-200 bg-white p-5 text-left shadow-md shadow-zinc-200/60 transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <Sparkles className="mb-4 h-6 w-6" />
                      <p className="font-semibold">Create another plan</p>
                      <p className="mt-1 text-sm text-zinc-500">Restart the configurator for a new client.</p>
                    </button>
                  </div>
                </div>
              )}
            </StepShell>
          </AnimatePresence>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={back}
              disabled={!canGoBack}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition",
                canGoBack ? "border border-zinc-300 bg-white hover:bg-zinc-50" : "cursor-not-allowed border border-zinc-200 bg-zinc-100 text-zinc-400"
              )}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            {step < steps.length - 1 && (
              <button
                type="button"
                onClick={next}
                disabled={!canContinue}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition",
                  canContinue
                    ? "bg-zinc-950 text-white hover:bg-zinc-800"
                    : "cursor-not-allowed bg-zinc-300 text-zinc-500"
                )}
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>

        <MiniBrief answers={answers} result={result} showPrice={showPriceInSidebar} />
      </main>
    </div>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-xs uppercase tracking-wide text-zinc-400">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}

function ProjectModeCard({ mode, selected, onSelect }) {
  const Icon = mode.icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border p-5 text-left transition-all",
        selected
          ? "border-zinc-950 bg-zinc-950 text-white shadow-xl shadow-zinc-950/20"
          : "border-zinc-200 bg-white hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-lg"
      )}
    >
      <div className={cn("absolute inset-x-0 top-0 h-1.5", selected ? "bg-amber-300" : "bg-gradient-to-r from-amber-300 via-teal-300 to-rose-300")} />
      <div className="flex items-start gap-4">
        <span className={cn("rounded-2xl p-3", selected ? "bg-white/10 text-amber-200" : "bg-zinc-950 text-white")}>
          <Icon className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <p className={cn("text-xs font-black uppercase tracking-[0.18em]", selected ? "text-zinc-300" : "text-zinc-500")}>{mode.eyebrow}</p>
          <h4 className="mt-2 text-2xl font-black leading-tight">{mode.label}</h4>
          <p className={cn("mt-3 leading-7", selected ? "text-zinc-300" : "text-zinc-600")}>{mode.description}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-2">
        {mode.points.map((point) => (
          <span key={point} className={cn("flex items-center gap-2 text-sm font-bold", selected ? "text-zinc-200" : "text-zinc-700")}>
            <Check className="h-4 w-4 text-teal-500" />
            {point}
          </span>
        ))}
      </div>
      {selected && <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-black text-zinc-950"><Check className="h-3 w-3" /> Selected</span>}
    </button>
  );
}

function GoalOption({ goal, selected, onClick }) {
  const meta = getGoalMeta(goal.label);
  const Icon = meta.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group rounded-[1.5rem] border p-5 text-left transition-all",
        selected
          ? "border-zinc-950 bg-zinc-950 text-white shadow-xl shadow-zinc-950/15"
          : "border-zinc-200 bg-white hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-lg"
      )}
    >
      <div className="flex items-start gap-4">
        <span className={cn("rounded-2xl p-3", selected ? "bg-white/10 text-amber-200" : "bg-zinc-100 text-zinc-800 group-hover:bg-amber-50")}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-black">{goal.label}</h4>
            {selected && <Check className="h-4 w-4" />}
          </div>
          <p className={cn("mt-2 text-sm leading-6", selected ? "text-zinc-300" : "text-zinc-600")}>{meta.description}</p>
        </div>
      </div>
      <p className={cn("mt-4 inline-flex rounded-full px-3 py-1 text-xs font-black", selected ? "bg-white text-zinc-950" : "bg-teal-50 text-teal-700")}>
        {meta.outcome}
      </p>
    </button>
  );
}

function ContentReadyCard({ item, value, onChange }) {
  const Icon = getContentIcon(item.key);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="mb-4 flex items-start gap-3">
        <span className="rounded-2xl bg-zinc-100 p-3 text-zinc-800">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="font-black text-zinc-950">{item.label}</p>
          <p className="mt-1 text-sm text-zinc-500">If missing, planning/support may add from €{item.missingPrice}.</p>
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {["yes", "no", "unknown"].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "rounded-xl border px-4 py-2 text-sm font-bold capitalize transition",
              value === option
                ? "border-zinc-950 bg-zinc-950 text-white"
                : "border-zinc-200 hover:bg-zinc-50"
            )}
          >
            {option === "yes" ? "Ready" : option === "no" ? "Not ready" : "Not sure"}
          </button>
        ))}
      </div>
    </div>
  );
}

function OptionButton({ selected, children, onClick, icon: Icon, description }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group w-full rounded-2xl border p-4 text-left transition-all duration-200",
        selected
          ? "border-zinc-950 bg-zinc-950 text-white shadow-lg shadow-zinc-950/10"
          : "border-zinc-200 bg-white hover:border-zinc-400 hover:shadow-md"
      )}
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <div
            className={cn(
              "mt-0.5 rounded-xl p-2.5",
              selected ? "bg-white/10" : "bg-zinc-100 group-hover:bg-amber-50"
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2 font-bold">
            {children}
            {selected && <Check className="h-4 w-4" />}
          </div>
          {description && (
            <p className={cn("mt-1 text-sm", selected ? "text-zinc-300" : "text-zinc-500")}>{description}</p>
          )}
        </div>
      </div>
    </button>
  );
}

function StepShell({ step, children }) {
  const Icon = steps[step].icon;
  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.22 }}
      className="rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-xl shadow-zinc-200/60 sm:p-8"
    >
      <div className="mb-7 rounded-[1.75rem] border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-lg shadow-zinc-950/15">
            <Icon className="h-7 w-7" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-zinc-500">Step {step + 1} of {steps.length}</p>
            <h2 className="mt-1 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">{steps[step].title}</h2>
            <p className="mt-2 max-w-2xl leading-7 text-zinc-600">{steps[step].subtitle}</p>
          </div>
        </div>
      </div>
      {children}
    </motion.div>
  );
}

function Progress({ currentStep }) {
  const percent = ((currentStep + 1) / steps.length) * 100;
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between text-sm text-zinc-500">
        <span>Website plan progress</span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-zinc-950 via-teal-700 to-amber-500"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.25 }}
        />
      </div>
    </div>
  );
}

function MiniBrief({ answers, result, showPrice = false }) {
  return (
    <aside className="rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-lg shadow-zinc-200/50 lg:sticky lg:top-6">
      <div className="mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-zinc-700" />
        <h3 className="font-semibold text-zinc-950">Live brief</h3>
      </div>
      <div className="space-y-4 text-sm">
        <BriefLine label="Starting point" value={answers.projectMode || "Not selected yet"} />
        <BriefLine label="Business" value={answers.businessType || "Not selected yet"} />
        <BriefLine label="Goal" value={answers.goals.length ? answers.goals.join(", ") : "Not selected yet"} />
        <BriefLine label="Style" value={answers.style || "Not selected yet"} />
        <BriefLine label="Colors" value={answers.customColors.join(" / ")} />
        <BriefLine label="Sections" value={answers.sections.length ? answers.sections.join(", ") : "Not selected yet"} />
        <BriefLine label="Features" value={answers.functionality.length ? answers.functionality.join(", ") : "No advanced features yet"} />
        <BriefLine label="Design" value={result.selectedDesign?.name || "Not selected yet"} />
        <BriefLine label="Urgency" value={answers.urgency} />
        {showPrice ? (
          <div className="rounded-2xl bg-zinc-950 p-4 text-white">
            <p className="text-xs uppercase tracking-wide text-zinc-400">Package cap</p>
            <p className="mt-1 text-2xl font-semibold">€{result.estimatedPrice.toLocaleString("nl-NL")}</p>
            <p className="mt-1 text-xs text-zinc-300">Deposit from €{result.deposit.toLocaleString("nl-NL")}</p>
          </div>
        ) : (
          <div className="rounded-2xl bg-zinc-100 p-4 text-zinc-700">
            <p className="font-medium">Price hidden for now</p>
            <p className="mt-1 text-xs text-zinc-500">The estimate appears after the design direction and package comparison.</p>
          </div>
        )}
      </div>
    </aside>
  );
}

function BriefLine({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-zinc-400">{label}</p>
      <p className="mt-1 font-medium text-zinc-800">{value}</p>
    </div>
  );
}

function ColorEditor({ colors, updateColor, colorMode, setColorMode }) {
  return (
    <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold text-zinc-950">Color direction</h3>
          <p className="mt-1 text-sm text-zinc-500">Change the palette without turning this into a full design tool.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 rounded-full bg-zinc-100 p-1 text-sm font-medium">
          {["Light", "Dark"].map((mode) => (
            <button
              key={mode}
              onClick={() => setColorMode(mode)}
              className={cn("rounded-full px-4 py-2", colorMode === mode ? "bg-zinc-950 text-white" : "text-zinc-600")}
              type="button"
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {["Primary", "Accent", "Background"].map((label, index) => (
          <label key={label} className="rounded-2xl border border-zinc-200 p-4">
            <span className="mb-2 block text-sm font-medium text-zinc-700">{label}</span>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colors[index]}
                onChange={(event) => updateColor(index, event.target.value)}
                className="h-10 w-12 cursor-pointer rounded-lg border-0 bg-transparent p-0"
              />
              <input
                value={colors[index]}
                onChange={(event) => updateColor(index, event.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-950"
              />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

function NotesBox({ label, value, onChange, placeholder }) {
  return (
    <label className="block rounded-[1.5rem] border border-zinc-200 bg-white p-4">
      <span className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-700">
        <MessageSquareText className="h-4 w-4" /> {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:ring-4 focus:ring-zinc-950/10"
      />
    </label>
  );
}

function DesignCard({ direction, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "overflow-hidden rounded-[1.75rem] border bg-white text-left shadow-md shadow-zinc-200/60 transition hover:-translate-y-0.5 hover:shadow-xl",
        selected ? "border-zinc-950 ring-4 ring-zinc-950/10" : "border-zinc-200"
      )}
    >
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">{direction.tag}</p>
            <h3 className="mt-1 text-xl font-black text-zinc-950">{direction.name}</h3>
          </div>
          <div className="flex -space-x-2">
            {direction.palette.map((color) => (
              <span key={color} className="h-7 w-7 rounded-full border-2 border-white" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
        <div
          className="relative min-h-56 overflow-hidden rounded-3xl p-5 text-white"
          style={{ background: `linear-gradient(135deg, ${direction.palette[0]}, ${direction.palette[1]})` }}
        >
          <div className="absolute right-4 top-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
          <div className="relative z-10 flex min-h-44 flex-col justify-between">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs">Concept preview</p>
              <h4 className="max-w-xs text-2xl font-black leading-tight">{direction.headline}</h4>
              <p className="mt-3 max-w-sm text-sm text-white/75">{direction.description}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-3 py-2 text-xs font-medium text-zinc-950">View services</span>
              <span className="rounded-full bg-white/15 px-3 py-2 text-xs font-medium text-white">Contact</span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-zinc-600"><span className="font-medium text-zinc-950">Suggested layout:</span> {direction.layout}</p>
        {selected && <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-3 py-2 text-xs font-medium text-white"><Check className="h-3 w-3" /> Selected direction</p>}
      </div>
    </button>
  );
}

function PackageComparisonCard({ pack, answers, result, recommended }) {
  const estimate = getPackageEstimateForDisplay(pack.key, answers);
  const likelyItems = Array.from(new Set([...pack.probable, ...answers.sections.slice(0, 5), ...answers.functionality.slice(0, 3)]));

  return (
    <div className={cn("rounded-[1.75rem] border p-5", recommended ? "border-zinc-950 bg-zinc-950 text-white shadow-xl shadow-zinc-950/20" : "border-zinc-200 bg-white")}> 
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className={cn("rounded-full px-3 py-1 text-xs font-medium", recommended ? "bg-white text-zinc-950" : "bg-zinc-100 text-zinc-600")}>{recommended ? "Recommended" : pack.badge}</span>
        {recommended && <Check className="h-5 w-5" />}
      </div>
      <h3 className="text-xl font-black">{pack.name}</h3>
      <p className={cn("mt-2 text-sm leading-6", recommended ? "text-zinc-300" : "text-zinc-600")}>{pack.bestFor}</p>
      <p className="mt-5 text-sm uppercase tracking-wide opacity-70">Estimated with your scope</p>
      <p className="mt-1 text-3xl font-black">€{estimate.toLocaleString("nl-NL")}</p>
      <p className={cn("mt-1 text-sm", recommended ? "text-zinc-300" : "text-zinc-500")}>Maintenance from €{pack.monthly}/month</p>
      <div className={cn("mt-5 rounded-2xl p-4", recommended ? "bg-white/10" : "bg-zinc-100")}> 
        <p className="mb-3 text-sm font-semibold">Probable website version</p>
        <div className="flex flex-wrap gap-2">
          {likelyItems.slice(0, 8).map((item) => (
            <span key={item} className={cn("rounded-full px-3 py-1 text-xs", recommended ? "bg-white/10 text-zinc-200" : "bg-white text-zinc-700")}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProbableWebsiteVersion({ answers, result }) {
  const blocks = Array.from(new Set(["Hero", ...answers.sections, ...answers.functionality])).slice(0, 12);
  return (
    <div className="rounded-[1.75rem] border border-zinc-200 bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        <BriefcaseBusiness className="h-5 w-5" />
        <h3 className="font-semibold text-zinc-950">Likely website structure</h3>
      </div>
      <p className="mb-5 text-sm leading-6 text-zinc-600">
        Based on your answers, the {result.package.name} would probably be structured like this:
      </p>
      <div className="grid gap-2">
        {blocks.map((block, index) => (
          <div key={`${block}-${index}`} className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-xs font-semibold text-white">{index + 1}</span>
            <span className="font-medium text-zinc-800">{block}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SelectedDesignPreview({ result }) {
  const direction = result.selectedDesign;
  return (
    <div className="rounded-[1.75rem] border border-zinc-200 bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        <Eye className="h-5 w-5" />
        <h3 className="font-semibold text-zinc-950">Selected visual direction</h3>
      </div>
      <div
        className="min-h-80 rounded-3xl p-5 text-white"
        style={{ background: `linear-gradient(135deg, ${direction.palette[0]}, ${direction.palette[1]})` }}
      >
        <p className="mb-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-sm">{direction.name}</p>
        <h4 className="max-w-sm text-3xl font-black tracking-tight">{direction.headline}</h4>
        <p className="mt-4 max-w-md leading-7 text-white/75">{direction.description}</p>
        <div className="mt-8 grid gap-3">
          <div className="h-16 rounded-2xl bg-white/15" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-24 rounded-2xl bg-white/15" />
            <div className="h-24 rounded-2xl bg-white/15" />
          </div>
          <div className="h-16 rounded-2xl bg-white/15" />
        </div>
      </div>
    </div>
  );
}

function BriefDocument({ answers, result }) {
  const noteEntries = Object.entries(answers.notes).filter(([, value]) => value?.trim());

  return (
    <div className="print:block hidden" id="print-brief">
      <div className="p-10 font-sans text-zinc-950">
        <h1 className="text-3xl font-bold">Website Brief</h1>
        <p className="mt-2 text-zinc-600">Generated from the QuickWeb Studio configurator.</p>
        <div className="mt-8 grid grid-cols-2 gap-6">
          <PrintSection title="Client details">
            <p>Name: {answers.lead.name || "—"}</p>
            <p>Business: {answers.lead.businessName || answers.businessType || "—"}</p>
            <p>Email: {answers.lead.email || "—"}</p>
            <p>Phone: {answers.lead.phone || "—"}</p>
            <p>Preferred contact: {answers.lead.preferredContact || "—"}</p>
          </PrintSection>
          <PrintSection title="Recommended package">
            <p>{result.package.name}</p>
            <p>Package cap: €{result.estimatedPrice.toLocaleString("nl-NL")}</p>
            <p>Internal raw value: €{result.internalRawValue.toLocaleString("nl-NL")}</p>
            <p>Deposit: €{result.deposit.toLocaleString("nl-NL")}</p>
            <p>Maintenance: €{result.monthly}/month</p>
            <p>Lead score: {result.leadScore}/100</p>
          </PrintSection>
          <PrintSection title="Website direction">
            <p>Starting point: {answers.projectMode || "—"}</p>
            <p>Business type: {answers.businessType}</p>
            <p>Goals: {answers.goals.join(", ")}</p>
            <p>Style: {answers.style}</p>
            <p>Colors: {answers.customColors.join(", ")}</p>
            <p>Design: {result.selectedDesign.name}</p>
            <p>Urgency: {answers.urgency}</p>
            <p>Delivery: {result.delivery}</p>
          </PrintSection>
          <PrintSection title="Selected scope">
            <p>Sections: {answers.sections.join(", ")}</p>
            <p>Functionality: {answers.functionality.length ? answers.functionality.join(", ") : "No advanced features selected"}</p>
            <p>Missing/unclear content: {result.missingContent.length ? result.missingContent.map((item) => item.label).join(", ") : "Everything appears ready"}</p>
          </PrintSection>
        </div>
        <div className="mt-8 rounded-2xl border border-zinc-300 p-5">
          <h2 className="text-xl font-semibold">Included in {result.package.name}</h2>
          <ul className="mt-3 list-disc pl-6">
            {result.package.included.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        {noteEntries.length > 0 && (
          <div className="mt-8 rounded-2xl border border-zinc-300 p-5">
            <h2 className="text-xl font-semibold">Client notes</h2>
            <div className="mt-3 space-y-3 text-sm">
              {noteEntries.map(([key, value]) => (
                <div key={key}>
                  <p className="font-semibold capitalize">{key}</p>
                  <p className="text-zinc-700">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PrintSection({ title, children }) {
  return (
    <section className="rounded-2xl border border-zinc-300 p-5">
      <h2 className="mb-3 text-xl font-semibold">{title}</h2>
      <div className="space-y-1 text-sm text-zinc-700">{children}</div>
    </section>
  );
}

function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-zinc-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-4 focus:ring-zinc-950/10"
      />
    </label>
  );
}
