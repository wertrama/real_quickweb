import React, { useMemo, useState } from "react";
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
} from "lucide-react";

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
];

const FUNCTIONALITY = [
  { label: "Booking system", price: 150, weight: 2, icon: CalendarDays },
  { label: "WhatsApp button", price: 50, weight: 1, icon: Phone },
  { label: "Google Maps", price: 75, weight: 1, icon: MapPin },
  { label: "Online payment", price: 250, weight: 3, icon: CreditCard },
  { label: "CMS / editable content", price: 300, weight: 3, icon: Settings },
  { label: "Multilingual", price: 250, weight: 2, icon: Layers },
  { label: "Animations", price: 200, weight: 2, icon: Sparkles },
  { label: "SEO setup", price: 200, weight: 2, icon: Target },
  { label: "Analytics", price: 100, weight: 1, icon: ShieldCheck },
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
    name: "Starter Website",
    base: 499,
    monthly: 39,
    badge: "Simple online presence",
    description:
      "Best for a simple professional website with essential sections and basic contact flow.",
    included: [
      "Custom landing page or small website",
      "Mobile-responsive layout",
      "Contact section",
      "Basic SEO structure",
      "Simple delivery process",
    ],
  },
  business: {
    name: "Business Website",
    base: 899,
    monthly: 79,
    badge: "Most recommended",
    description:
      "Best for service businesses that need bookings, leads, credibility and a stronger structure.",
    included: [
      "Custom homepage",
      "Service and pricing sections",
      "Mobile-first design",
      "Contact form / CTA flow",
      "Google Maps or WhatsApp integration",
      "Basic SEO setup",
      "Monthly maintenance option",
    ],
  },
  premium: {
    name: "Premium Website",
    base: 1499,
    monthly: 149,
    badge: "Advanced custom build",
    description:
      "Best for advanced layouts, stronger branding, CMS, multilingual content, shop features or animations.",
    included: [
      "Custom multi-section design",
      "Advanced visual direction",
      "CMS or content-editing option",
      "Advanced functionality planning",
      "Animations / premium polish",
      "SEO and analytics foundation",
      "Priority maintenance option",
    ],
  },
};

const steps = [
  { title: "Business type", subtitle: "What kind of business is this for?", icon: Building2 },
  { title: "Website goal", subtitle: "What should the website mainly achieve?", icon: Target },
  { title: "Style direction", subtitle: "Choose the visual feeling you want.", icon: Palette },
  { title: "Required sections", subtitle: "Select the sections your website needs.", icon: Layers },
  { title: "Functionality", subtitle: "Choose features that affect price and complexity.", icon: Settings },
  { title: "Content readiness", subtitle: "Tell us what you already have ready.", icon: FileText },
  { title: "Urgency", subtitle: "How fast do you need the website?", icon: Clock },
  { title: "Design directions", subtitle: "Preview possible visual approaches before pricing.", icon: Sparkles },
  { title: "Recommended package", subtitle: "Now we recommend the best package based on your answers.", icon: PackageCheck },
  { title: "Your details", subtitle: "Where should we send your website brief?", icon: User },
  { title: "Deposit or consultation", subtitle: "Choose the next step that feels right.", icon: CreditCard },
  { title: "Confirmation", subtitle: "Your brief is ready.", icon: Check },
];

const defaultAnswers = {
  businessType: "",
  goals: [],
  style: "",
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
  lead: {
    name: "",
    email: "",
    phone: "",
    businessName: "",
    preferredContact: "Email",
  },
  nextStep: "",
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function toggleArrayValue(array, value) {
  return array.includes(value) ? array.filter((item) => item !== value) : [...array, value];
}

function getPackageKey(score, selectedSections, selectedFunctionality) {
  const hasShop = selectedSections.includes("Shop") || selectedFunctionality.includes("Online payment");
  const hasAdvanced = selectedFunctionality.some((item) =>
    ["CMS / editable content", "Multilingual", "Animations", "Online payment"].includes(item)
  );

  if (hasShop || hasAdvanced || score >= 15) return "premium";
  if (score >= 7) return "business";
  return "starter";
}

function getDesignDirections(answers) {
  const style = answers.style || "Clean corporate";
  const business = answers.businessType || "Local service business";
  const primaryGoal = answers.goals[0] || "Build credibility";

  const styleObject = STYLE_DIRECTIONS.find((item) => item.label === style) || STYLE_DIRECTIONS[3];

  const cards = [
    {
      name: `${style} Signature`,
      tag: "Closest to your selected style",
      headline: business.includes("Other") ? "A focused website with a clear offer" : `A ${style.toLowerCase()} website for ${business.toLowerCase()}`,
      description: `Built around your main goal: ${primaryGoal.toLowerCase()}. This direction uses your chosen visual mood and turns it into a clear, premium first impression.`,
      palette: styleObject.palette,
      layout: "Large hero, clear CTA, trust section, service blocks, contact flow.",
    },
    {
      name: "Conversion Focus",
      tag: "Best for leads and bookings",
      headline: "A website designed to turn visitors into enquiries",
      description:
        "This direction puts the offer, CTA buttons, services, reviews and contact options higher on the page, so users know what to do quickly.",
      palette: ["#0f172a", "#f8fafc", "#22c55e"],
      layout: "Direct headline, CTA row, benefits, services, proof, FAQ, contact.",
    },
    {
      name: "Brand Story",
      tag: "Best for trust and premium positioning",
      headline: "A website that makes the business feel established and memorable",
      description:
        "This direction focuses more on story, visual identity, atmosphere, brand confidence and a polished presentation.",
      palette: ["#1c1917", "#a16207", "#fafaf9"],
      layout: "Atmospheric hero, about story, visual gallery, values, testimonials, contact.",
    },
  ];

  return cards;
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

  const functionalityPrice = answers.functionality.reduce((sum, item) => {
    const found = FUNCTIONALITY.find((feature) => feature.label === item);
    return sum + (found?.price || 0);
  }, 0);

  const contentPrice = missingContent.reduce((sum, item) => sum + item.missingPrice, 0);
  const extraSections = Math.max(0, answers.sections.length - 5) * 75;
  const urgencyObject = URGENCY.find((item) => item.label === answers.urgency) || URGENCY[0];

  const subtotal = selectedPackage.base + functionalityPrice + contentPrice + extraSections;
  const estimatedPrice = Math.round((subtotal * urgencyObject.multiplier) / 10) * 10;
  const deposit = Math.max(149, Math.round(estimatedPrice * 0.2 / 10) * 10);

  const delivery =
    answers.urgency === "72h express"
      ? "48–72 hours, if the scope and content are ready"
      : answers.urgency === "7-day full package"
      ? "Around 7 days, depending on feedback speed"
      : packageKey === "premium"
      ? "2–3 weeks"
      : packageKey === "business"
      ? "5–10 days"
      : "3–7 days";

  return {
    score: totalScore,
    packageKey,
    package: selectedPackage,
    missingContent,
    functionalityPrice,
    contentPrice,
    extraSections,
    urgencyMultiplier: urgencyObject.multiplier,
    estimatedPrice,
    deposit,
    delivery,
    monthly: selectedPackage.monthly,
    designDirections: getDesignDirections(answers),
  };
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
              "mt-0.5 rounded-xl p-2",
              selected ? "bg-white/10" : "bg-zinc-100 group-hover:bg-zinc-200"
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2 font-medium">
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
      <div className="mb-7 flex items-start gap-4">
        <div className="rounded-2xl bg-zinc-950 p-3 text-white">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-500">Step {step + 1} of {steps.length}</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">{steps[step].title}</h2>
          <p className="mt-2 max-w-2xl text-zinc-600">{steps[step].subtitle}</p>
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
          className="h-full rounded-full bg-zinc-950"
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
        <BriefLine label="Business" value={answers.businessType || "Not selected yet"} />
        <BriefLine label="Goal" value={answers.goals.length ? answers.goals.join(", ") : "Not selected yet"} />
        <BriefLine label="Style" value={answers.style || "Not selected yet"} />
        <BriefLine label="Sections" value={answers.sections.length ? answers.sections.join(", ") : "Not selected yet"} />
        <BriefLine label="Features" value={answers.functionality.length ? answers.functionality.join(", ") : "No advanced features yet"} />
        <BriefLine label="Urgency" value={answers.urgency} />
        {showPrice ? (
          <div className="rounded-2xl bg-zinc-950 p-4 text-white">
            <p className="text-xs uppercase tracking-wide text-zinc-400">Estimated project</p>
            <p className="mt-1 text-2xl font-semibold">€{result.estimatedPrice.toLocaleString("nl-NL")}</p>
            <p className="mt-1 text-xs text-zinc-300">Deposit from €{result.deposit.toLocaleString("nl-NL")}</p>
          </div>
        ) : (
          <div className="rounded-2xl bg-zinc-100 p-4 text-zinc-700">
            <p className="font-medium">Price hidden for now</p>
            <p className="mt-1 text-xs text-zinc-500">The estimate appears after the design direction and package recommendation.</p>
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

function DesignCard({ direction }) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-md shadow-zinc-200/60">
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">{direction.tag}</p>
            <h3 className="mt-1 text-xl font-semibold text-zinc-950">{direction.name}</h3>
          </div>
          <div className="flex -space-x-2">
            {direction.palette.map((color) => (
              <span
                key={color}
                className="h-7 w-7 rounded-full border-2 border-white"
                style={{ backgroundColor: color }}
              />
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
              <h4 className="max-w-xs text-2xl font-semibold leading-tight">{direction.headline}</h4>
              <p className="mt-3 max-w-sm text-sm text-white/75">{direction.description}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-3 py-2 text-xs font-medium text-zinc-950">View services</span>
              <span className="rounded-full bg-white/15 px-3 py-2 text-xs font-medium text-white">Contact</span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-zinc-600"><span className="font-medium text-zinc-950">Suggested layout:</span> {direction.layout}</p>
      </div>
    </div>
  );
}

function BriefDocument({ answers, result }) {
  return (
    <div className="print:block hidden" id="print-brief">
      <div className="p-10 font-sans text-zinc-950">
        <h1 className="text-3xl font-bold">Website Brief</h1>
        <p className="mt-2 text-zinc-600">Generated from the website configurator.</p>
        <div className="mt-8 grid grid-cols-2 gap-6">
          <PrintSection title="Client details">
            <p>Name: {answers.lead.name || "—"}</p>
            <p>Business: {answers.lead.businessName || answers.businessType || "—"}</p>
            <p>Email: {answers.lead.email || "—"}</p>
            <p>Phone: {answers.lead.phone || "—"}</p>
          </PrintSection>
          <PrintSection title="Recommended package">
            <p>{result.package.name}</p>
            <p>Estimated price: €{result.estimatedPrice.toLocaleString("nl-NL")}</p>
            <p>Deposit: €{result.deposit.toLocaleString("nl-NL")}</p>
            <p>Maintenance: €{result.monthly}/month</p>
          </PrintSection>
          <PrintSection title="Website direction">
            <p>Business type: {answers.businessType}</p>
            <p>Goals: {answers.goals.join(", ")}</p>
            <p>Style: {answers.style}</p>
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

export default function WebsiteConfiguratorMVP() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(defaultAnswers);

  const result = useMemo(() => calculateResult(answers), [answers]);
  const canGoBack = step > 0;
  const showPriceInSidebar = step >= 8;

  const update = (patch) => setAnswers((prev) => ({ ...prev, ...patch }));
  const updateLead = (patch) => setAnswers((prev) => ({ ...prev, lead: { ...prev.lead, ...patch } }));
  const updateContentReady = (key, value) =>
    setAnswers((prev) => ({
      ...prev,
      contentReady: { ...prev.contentReady, [key]: value },
    }));

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));
  const restart = () => {
    setAnswers(defaultAnswers);
    setStep(0);
  };

  const leadComplete = answers.lead.name && answers.lead.email && answers.lead.businessName;
  const canContinue =
    (step === 0 && answers.businessType) ||
    (step === 1 && answers.goals.length > 0) ||
    (step === 2 && answers.style) ||
    (step === 3 && answers.sections.length >= 3) ||
    (step === 4) ||
    (step === 5) ||
    (step === 6 && answers.urgency) ||
    (step === 7) ||
    (step === 8) ||
    (step === 9 && leadComplete) ||
    (step === 10 && answers.nextStep) ||
    step === 11;

  const briefEmailBody = encodeURIComponent(
    `Hi, I created a website brief.\n\nBusiness: ${answers.lead.businessName}\nName: ${answers.lead.name}\nEmail: ${answers.lead.email}\nPhone: ${answers.lead.phone}\n\nBusiness type: ${answers.businessType}\nGoals: ${answers.goals.join(", ")}\nStyle: ${answers.style}\nSections: ${answers.sections.join(", ")}\nFunctionality: ${answers.functionality.join(", ") || "None"}\nRecommended package: ${result.package.name}\nEstimated price: €${result.estimatedPrice}\nDeposit: €${result.deposit}\nMonthly maintenance: €${result.monthly}/month\nDelivery: ${result.delivery}`
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#f4f4f5,transparent_30%),linear-gradient(to_bottom,#ffffff,#f4f4f5)] text-zinc-950">
      <BriefDocument answers={answers} result={result} />

      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-zinc-950 p-2 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold leading-none">BuildPlan Studio</p>
              <p className="mt-1 text-xs text-zinc-500">Website concept + quote configurator</p>
            </div>
          </div>
          <button className="hidden rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-50 sm:block">
            Need help?
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <section>
          <div className="mb-8 overflow-hidden rounded-[2rem] bg-zinc-950 p-6 text-white shadow-2xl shadow-zinc-950/20 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-zinc-200">
                  <Zap className="h-4 w-4" /> Website plan in 3 minutes
                </p>
                <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
                  Get a custom website concept and price estimate without guessing your scope.
                </h1>
                <p className="mt-4 max-w-2xl text-zinc-300">
                  Choose your business type, goal, style, sections and features. The system creates a recommended package, design direction and brief.
                </p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4 text-sm text-zinc-200 md:w-72">
                <p className="font-medium text-white">Smart pricing rule</p>
                <p className="mt-1">The price appears only after the system understands the goal, complexity and design direction.</p>
              </div>
            </div>
          </div>

          <Progress currentStep={step} />

          <AnimatePresence mode="wait">
            <StepShell step={step}>
              {step === 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {BUSINESS_TYPES.map((type) => (
                    <OptionButton
                      key={type}
                      selected={answers.businessType === type}
                      onClick={() => update({ businessType: type })}
                      icon={Building2}
                    >
                      {type}
                    </OptionButton>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div>
                  <div className="mb-4 rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-600">
                    Choose one or more. This step matters because a website for bookings should be designed differently from a portfolio or webshop.
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {WEBSITE_GOALS.map((goal) => (
                      <OptionButton
                        key={goal.label}
                        selected={answers.goals.includes(goal.label)}
                        onClick={() => update({ goals: toggleArrayValue(answers.goals, goal.label) })}
                        icon={Target}
                      >
                        {goal.label}
                      </OptionButton>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {STYLE_DIRECTIONS.map((style) => (
                    <OptionButton
                      key={style.label}
                      selected={answers.style === style.label}
                      onClick={() => update({ style: style.label })}
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
              )}

              {step === 3 && (
                <div>
                  <div className="mb-4 rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-600">
                    Select at least three sections. Extra sections can increase the estimated project scope.
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {SECTIONS.map((section) => (
                      <OptionButton
                        key={section.label}
                        selected={answers.sections.includes(section.label)}
                        onClick={() => update({ sections: toggleArrayValue(answers.sections, section.label) })}
                        icon={Layers}
                        description={section.recommended ? "Usually recommended" : "Optional / scope-dependent"}
                      >
                        {section.label}
                      </OptionButton>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <div className="mb-4 rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-600">
                    These features affect complexity and pricing. You can skip this step if the website only needs standard content and contact details.
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {FUNCTIONALITY.map((feature) => (
                      <OptionButton
                        key={feature.label}
                        selected={answers.functionality.includes(feature.label)}
                        onClick={() => update({ functionality: toggleArrayValue(answers.functionality, feature.label) })}
                        icon={feature.icon}
                        description={`Adds from €${feature.price}`}
                      >
                        {feature.label}
                      </OptionButton>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-600">
                    Missing content does not block the project, but it affects difficulty, timeline and price. This is why the estimate becomes more realistic.
                  </div>
                  {CONTENT_ITEMS.map((item) => (
                    <div key={item.key} className="rounded-2xl border border-zinc-200 p-4">
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium text-zinc-950">{item.label}</p>
                          <p className="text-sm text-zinc-500">If missing, planning/support may add from €{item.missingPrice}.</p>
                        </div>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-3">
                        {["yes", "no", "unknown"].map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => updateContentReady(item.key, value)}
                            className={cn(
                              "rounded-xl border px-4 py-2 text-sm font-medium capitalize transition",
                              answers.contentReady[item.key] === value
                                ? "border-zinc-950 bg-zinc-950 text-white"
                                : "border-zinc-200 hover:bg-zinc-50"
                            )}
                          >
                            {value === "yes" ? "Ready" : value === "no" ? "Not ready" : "Not sure"}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {step === 6 && (
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
              )}

              {step === 7 && (
                <div>
                  <div className="mb-5 rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-600">
                    These are not full free website designs. They are visual directions that help the client choose a style before seeing the recommended package.
                  </div>
                  <div className="grid gap-5 xl:grid-cols-3">
                    {result.designDirections.map((direction) => (
                      <DesignCard key={direction.name} direction={direction} />
                    ))}
                  </div>
                </div>
              )}

              {step === 8 && (
                <div className="space-y-6">
                  <div className="rounded-[1.75rem] bg-zinc-950 p-6 text-white">
                    <p className="mb-2 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm text-zinc-200">Recommended for you</p>
                    <h3 className="text-3xl font-semibold">{result.package.name}</h3>
                    <p className="mt-3 max-w-2xl text-zinc-300">{result.package.description}</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white/10 p-4">
                        <p className="text-xs uppercase tracking-wide text-zinc-400">Estimated build</p>
                        <p className="mt-1 text-2xl font-semibold">€{result.estimatedPrice.toLocaleString("nl-NL")}</p>
                      </div>
                      <div className="rounded-2xl bg-white/10 p-4">
                        <p className="text-xs uppercase tracking-wide text-zinc-400">Deposit from</p>
                        <p className="mt-1 text-2xl font-semibold">€{result.deposit.toLocaleString("nl-NL")}</p>
                      </div>
                      <div className="rounded-2xl bg-white/10 p-4">
                        <p className="text-xs uppercase tracking-wide text-zinc-400">Maintenance</p>
                        <p className="mt-1 text-2xl font-semibold">€{result.monthly}/mo</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-2">
                    <div className="rounded-[1.75rem] border border-zinc-200 p-5">
                      <h4 className="font-semibold text-zinc-950">Included</h4>
                      <ul className="mt-4 space-y-3">
                        {result.package.included.map((item) => (
                          <li key={item} className="flex gap-3 text-sm text-zinc-700">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-950" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-[1.75rem] border border-zinc-200 p-5">
                      <h4 className="font-semibold text-zinc-950">Why this package?</h4>
                      <p className="mt-3 text-sm leading-6 text-zinc-600">
                        Based on your answers, the project needs {answers.sections.length} sections, {answers.functionality.length || "no"} advanced features, a {answers.style.toLowerCase()} visual direction and {answers.urgency.toLowerCase()}. The estimate also considers content readiness.
                      </p>
                      <div className="mt-4 rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-600">
                        Expected delivery: <span className="font-medium text-zinc-950">{result.delivery}</span>
                      </div>
                    </div>
                  </div>
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
                </div>
              )}

              {step === 10 && (
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
                      onClick={() => update({ nextStep: option.value })}
                      icon={option.icon}
                      description={option.description}
                    >
                      {option.label}
                    </OptionButton>
                  ))}
                </div>
              )}

              {step === 11 && (
                <div className="space-y-6">
                  <div className="rounded-[1.75rem] bg-zinc-950 p-6 text-white">
                    <div className="mb-4 inline-flex rounded-full bg-white/10 p-3">
                      <Check className="h-6 w-6" />
                    </div>
                    <h3 className="text-3xl font-semibold">Your website brief is ready.</h3>
                    <p className="mt-3 max-w-2xl text-zinc-300">
                      The client can now receive the brief, save it as a PDF, pay a deposit, or book a consultation.
                    </p>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-3">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="rounded-2xl border border-zinc-200 bg-white p-5 text-left shadow-md shadow-zinc-200/60 transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <Download className="mb-4 h-6 w-6" />
                      <p className="font-semibold">Save brief as PDF</p>
                      <p className="mt-1 text-sm text-zinc-500">Uses the browser print dialog. Choose “Save as PDF”.</p>
                    </button>

                    <a
                      href={`mailto:?subject=Website brief for ${encodeURIComponent(answers.lead.businessName || "new project")}&body=${briefEmailBody}`}
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
