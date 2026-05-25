import {
  CONTENT_ITEMS,
  FUNCTIONALITY,
  PACKAGES,
  SECTIONS,
  STYLE_DIRECTIONS,
  WEBSITE_GOALS,
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

export function getPackageKey(score, selectedSections, selectedFunctionality) {
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
  const recommendedPackageKey = getPackageKey(totalScore, answers.sections, answers.functionality);
  const preferredPackageKey = PACKAGES[answers.packagePreference] ? answers.packagePreference : "";
  const packageKey = preferredPackageKey || recommendedPackageKey;
  const selectedPackage = PACKAGES[packageKey];

  // Internal feature values explain complexity, but they do not push the client above the package cap.
  const functionalityPrice = answers.functionality.reduce((sum, item) => {
    const found = FUNCTIONALITY.find((feature) => feature.label === item);
    return sum + (found?.price || 0);
  }, 0);

  const contentPrice = missingContent.reduce((sum, item) => sum + item.missingPrice, 0);
  const extraSections = Math.max(0, answers.sections.length - 5) * 75;
  const internalRawValue = selectedPackage.rawValue + functionalityPrice + contentPrice + extraSections;

  const estimatedPrice = selectedPackage.max;
  const deposit = Math.max(79, Math.round((estimatedPrice * 0.2) / 10) * 10);

  const delivery =
    answers.urgency === "72h express"
      ? "48-72 hours, only if the scope and content are ready"
      : answers.urgency === "7-day full package"
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
    (answers.nextStep === "Pay deposit" ? 35 : answers.nextStep === "Book consultation" ? 25 : answers.nextStep === "Send brief only" ? 10 : 0) +
    (answers.urgency !== "Normal delivery" ? 10 : 0) +
    (missingContent.length <= 2 ? 15 : 5) +
    (answers.goals.length > 1 ? 10 : 0) +
    (answers.functionality.length > 0 ? 5 : 0);

  return {
    score: totalScore,
    recommendedPackageKey,
    recommendedPackage: PACKAGES[recommendedPackageKey],
    packagePreference: preferredPackageKey,
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

export function getPackageEstimateForDisplay(packageKey) {
  return PACKAGES[packageKey].max;
}
