import {
  CONTENT_ITEMS,
  FUNCTIONALITY,
  MAINTENANCE_OPTIONS,
  PACKAGES,
  SECTIONS,
  STYLE_DIRECTIONS,
  URGENCY,
} from "../data/configurator";

export function toggleArrayValue(array, value) {
  return array.includes(value) ? array.filter((item) => item !== value) : [...array, value];
}

export function getSuggestedSelections(businessType, goals) {
  const lowerBusiness = businessType.toLowerCase();
  const goalText = goals.join(" ").toLowerCase();

  let sections = ["Home", "Services", "About", "Contact", "Reviews"];
  let functionality = ["SEO setup", "Google Analytics"];

  if (lowerBusiness.includes("barber") || lowerBusiness.includes("tattoo") || lowerBusiness.includes("beauty")) {
    sections = ["Home", "Services", "Pricing", "Gallery", "Booking", "Reviews", "Contact", "Location"];
    functionality = ["Booking system", "WhatsApp button", "Google Maps", "SEO setup", "Google Analytics"];
  }

  if (lowerBusiness.includes("restaurant") || lowerBusiness.includes("cafe") || lowerBusiness.includes("café")) {
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

export function getPackageKey(packagePreference = "starter") {
  return PACKAGES[packagePreference] ? packagePreference : "starter";
}

export function getDesignDirections(answers) {
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

export function calculateResult(answers) {
  const pricedContentItems = CONTENT_ITEMS.filter(
    (item) => !(answers.projectMode === "Improve current website" && item.key === "domain")
  );
  const notReadyContent = pricedContentItems.filter((item) => answers.contentReady[item.key] === "no");
  const unsureContent = pricedContentItems.filter((item) => answers.contentReady[item.key] === "unknown");
  const missingContent = pricedContentItems.filter((item) => answers.contentReady[item.key] !== "yes");

  const packageKey = getPackageKey(answers.packagePreference);
  const recommendedPackageKey = packageKey;
  const selectedPackage = PACKAGES[packageKey];

  const functionalityPrice = answers.functionality.reduce((sum, item) => {
    const found = FUNCTIONALITY.find((feature) => feature.label === item);
    return sum + (found?.price || 0);
  }, 0);

  const goalPrice = 0;
  const sectionPrice = answers.sections.reduce((sum, section) => {
    const found = SECTIONS.find((item) => item.label === section);
    return sum + (found?.price || 0);
  }, 0);
  const extraSections = 0;
  const contentPrice = notReadyContent.reduce((sum, item) => sum + item.missingPrice, 0);
  const selectedUrgency = URGENCY.find((item) => item.label === answers.urgency) || URGENCY[0];
  const selectedMaintenance = MAINTENANCE_OPTIONS.find((item) => item.label === answers.maintainability) || MAINTENANCE_OPTIONS[0];
  const maintenancePrice = 0;
  const urgencyPrice = selectedUrgency.price || 0;
  const estimatedPrice =
    selectedPackage.base +
    goalPrice +
    sectionPrice +
    functionalityPrice +
    contentPrice +
    maintenancePrice +
    urgencyPrice;
  const internalRawValue = estimatedPrice;

  const deposit = Math.max(79, Math.round((estimatedPrice * 0.2) / 10) * 10);

  const delivery =
    selectedUrgency.label === "72h express"
      ? "48-72 hours, only if the scope and content are ready"
      : selectedUrgency.label === "7-day full package"
      ? "Around 7 days, depending on feedback speed"
      : packageKey === "premium"
      ? "2-3 weeks"
      : packageKey === "business"
      ? "5-10 days"
      : "3-7 days";

  const designDirections = getDesignDirections(answers);
  const selectedDesign = designDirections.find((item) => item.name === answers.selectedDesign) || designDirections[0];

  const leadScore =
    (answers.lead.email ? 25 : 0) +
    (answers.wantsCall ? 35 : 0) +
    (answers.wantsCall === "yes" ? 10 : 0) +
    (answers.urgency !== "Normal delivery" ? 10 : 0) +
    (missingContent.length <= 2 ? 15 : 5) +
    (answers.goals.length > 1 ? 10 : 0) +
    (answers.functionality.length > 0 ? 5 : 0);

  return {
    score: 0,
    recommendedPackageKey,
    recommendedPackage: PACKAGES[recommendedPackageKey],
    packagePreference: packageKey,
    packageKey,
    package: selectedPackage,
    missingContent,
    notReadyContent,
    unsureContent,
    functionalityPrice,
    goalPrice,
    sectionPrice,
    contentPrice,
    extraSections,
    maintenancePrice,
    selectedMaintenance,
    internalRawValue,
    urgencyMultiplier: 1,
    urgencyPrice,
    estimatedPrice,
    deposit,
    delivery,
    monthly: selectedMaintenance.monthly,
    designDirections,
    selectedDesign,
    leadScore: Math.min(100, leadScore),
  };
}

export function getPackageEstimateForDisplay(packageKey, answers) {
  if (answers) {
    return calculateResult({ ...answers, packagePreference: packageKey }).estimatedPrice;
  }

  return PACKAGES[packageKey].base;
}
