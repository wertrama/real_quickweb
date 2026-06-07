import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Clock,
  CreditCard,
  Download,
  Mail,
  Palette,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  BUSINESS_TYPES,
  CALL_PREFERENCES,
  CONTENT_ITEMS,
  FUNCTIONALITY,
  MAINTENANCE_OPTIONS,
  PACKAGE_DEFAULTS,
  PROJECT_MODES,
  SECTIONS,
  STYLE_DIRECTIONS,
  URGENCY,
  WEBSITE_GOALS,
  defaultAnswers,
  getBusinessTypeMeta,
  getSectionIcon,
  steps,
} from "../../data/configurator";
import { trackEvent } from "../../utils/analytics";
import { calculateResult, toggleArrayValue } from "../../utils/configurator";
import { cn } from "../../utils/ui";
import { Brand } from "../shared/Brand";
import {
  BriefDocument,
  ColorEditor,
  ContentReadyCard,
  GoalOption,
  Input,
  MiniBrief,
  NotesBox,
  OptionButton,
  Progress,
  ProjectModeCard,
  StepRail,
  StepShell,
} from "./ConfiguratorUi";

export function ConfiguratorPage({ onBackHome, initialPackageKey = "starter" }) {
  const [step, setStep] = useState(0);
  const [colorEditorOpen, setColorEditorOpen] = useState(false);
  const [answers, setAnswers] = useState(() => {
    const packageDefaults = PACKAGE_DEFAULTS[initialPackageKey] || PACKAGE_DEFAULTS.starter;
    return {
      ...defaultAnswers,
      packagePreference: initialPackageKey,
      sections: [...packageDefaults.sections],
      functionality: [...packageDefaults.functionality],
    };
  });
  const result = useMemo(() => calculateResult(answers), [answers]);

  useEffect(() => {
    trackEvent("configurator_viewed", { package_preference: initialPackageKey || "none" });
  }, [initialPackageKey]);

  const canGoBack = step > 0;

  const update = (patch) => setAnswers((prev) => ({ ...prev, ...patch }));
  const updateLead = (patch) => setAnswers((prev) => ({ ...prev, lead: { ...prev.lead, ...patch } }));
  const updateNote = (key, value) => setAnswers((prev) => ({ ...prev, notes: { ...prev.notes, [key]: value } }));
  const updateContentReady = (key, value) =>
    setAnswers((prev) => ({
      ...prev,
      contentReady: { ...prev.contentReady, [key]: value },
    }));
  const allSectionsSelected = answers.sections.length === SECTIONS.length;
  const goalPriceLabel = () => "Included";
  const sectionPriceLabel = (section) => (section.price > 0 ? `+€${section.price}` : "Included");
  const currentWebsiteRequired = answers.projectMode === "Improve current website";
  const urgencyPriceLabel = (urgency) => (urgency.price > 0 ? `+€${urgency.price.toLocaleString("nl-NL")}` : "Included");

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
    setColorEditorOpen(false);
    trackEvent("style_selected", { style: styleLabel });
  };

  const selectProjectMode = (modeValue) => {
    update({
      projectMode: modeValue,
      currentWebsiteUrl: modeValue === "Improve current website" ? answers.currentWebsiteUrl : "",
      contentReady:
        modeValue === "Improve current website"
          ? { ...answers.contentReady, domain: "yes" }
          : answers.contentReady,
    });
  };

  const selectAllSections = () => {
    const nextSections = allSectionsSelected ? [] : SECTIONS.map((section) => section.label);
    update({ sections: nextSections });
    trackEvent(allSectionsSelected ? "all_sections_cleared" : "all_sections_selected");
  };

  const goToStep = (targetStep) => {
    setStep(targetStep);
    trackEvent("configurator_step_clicked", {
      step_number: targetStep + 1,
      step_title: steps[targetStep].title,
    });
  };

  const next = () => {
    trackEvent("step_completed", { step_number: step + 1, step_title: steps[step].title });
    if (step === 6) {
      trackEvent("scope_pricing_confirmed", {
        package: result.package.name,
        estimate: result.estimatedPrice,
        urgency: answers.urgency,
        maintenance: answers.maintainability,
      });
    }
    if (step === 7) trackEvent("lead_submitted", { preferred_contact: answers.lead.preferredContact });
    if (step === 8) {
      trackEvent("deposit_and_call_confirmed", {
        wants_call: answers.wantsCall,
        deposit: result.deposit,
      });
    }
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
    (step === 0 && answers.projectMode && (!currentWebsiteRequired || answers.currentWebsiteUrl) && answers.businessType) ||
    (step === 1 && answers.goals.length > 0) ||
    (step === 2 && answers.style) ||
    step === 3 ||
    step === 4 ||
    step === 5 ||
    (step === 6 && answers.urgency && answers.maintainability) ||
    (step === 7 && leadComplete) ||
    (step === 8 && answers.wantsCall) ||
    step === 9;

  const briefEmailBody = encodeURIComponent(
    `Hi, I created a website brief.

Business: ${answers.lead.businessName}
Name: ${answers.lead.name}
Email: ${answers.lead.email}
Phone: ${answers.lead.phone}

Starting point: ${answers.projectMode}
Current website: ${answers.currentWebsiteUrl || "-"}
Business type: ${answers.businessType}
Goals: ${answers.goals.join(", ")}
Style: ${answers.style}
Colors: ${answers.customColors.join(", ")}
Sections: ${answers.sections.join(", ")}
Functionality: ${answers.functionality.join(", ") || "None"}
Design direction: ${result.selectedDesign.name}
Chosen package: ${result.package.name}
Estimated price: €${result.estimatedPrice}
Deposit: €${result.deposit}
Monthly maintenance: €${result.monthly}/month
Maintainability: ${answers.maintainability}
Delivery: ${result.delivery}

Notes:
Business: ${answers.notes.business}
Goals: ${answers.notes.goals}
Style: ${answers.notes.style}
Sections: ${answers.notes.sections}
Functionality: ${answers.notes.functionality}
Content: ${answers.notes.content}
Urgency: ${answers.notes.urgency}
Package: ${answers.notes.package}`
  );

  const briefMailto = `mailto:${encodeURIComponent(answers.lead.email)}?subject=${encodeURIComponent(
    `Your website brief - ${answers.lead.businessName || "NaarWeb Studio"}`
  )}&body=${briefEmailBody}`;

  const briefSentRef = useRef(false);

  useEffect(() => {
    if (step === 9 && answers.lead.email && !briefSentRef.current) {
      briefSentRef.current = true;
      trackEvent("brief_email_auto_sent", { to: answers.lead.email });
      window.location.href = briefMailto;
    }
  }, [step, answers.lead.email, briefMailto]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-main)]">
      <BriefDocument answers={answers} result={result} />

      <header className="border-b border-[var(--border)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button onClick={onBackHome} className="text-left transition hover:-translate-y-0.5">
            <Brand />
          </button>
          <button onClick={onBackHome} className="hidden rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--primary)] transition hover:-translate-y-0.5 hover:bg-[var(--primary-soft)] sm:block">
            Back to homepage
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-[96rem] gap-6 px-4 py-8 sm:px-6 lg:px-8 xl:grid-cols-[170px_minmax(0,1fr)_300px] 2xl:grid-cols-[180px_minmax(0,1fr)_320px]">
        <StepRail currentStep={step} onStepSelect={goToStep} />
        <section className="min-w-0">
          {step === 0 && (
          <div className="mb-8 overflow-hidden rounded-[2rem] bg-[var(--primary)] p-6 text-white shadow-2xl shadow-blue-500/20 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-zinc-200">
                  <Zap className="h-4 w-4" /> Website plan in plain English
                </p>
                <h1 className="max-w-3xl text-3xl font-black tracking-tight !text-white sm:text-5xl">
                  Shape the website around the business goal, not a blank template.
                </h1>
                <p className="mt-4 max-w-2xl text-blue-100">
                  Choose the starting point, business type, outcomes, style, sections, features and content readiness. The result is a clear package recommendation and brief.
                </p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4 text-sm text-blue-100 md:w-72">
                <p className="font-bold text-white">Less guessing</p>
                <p className="mt-1">The estimate appears after the important choices are clear, so the price feels easier to understand.</p>
              </div>
            </div>
          </div>
          )}

          <Progress currentStep={step} onStepSelect={goToStep} />

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
                          onSelect={() => selectProjectMode(mode.value)}
                        />
                      ))}
                    </div>
                  </div>

                  {currentWebsiteRequired && (
                    <Input
                      label="Current website link"
                      type="url"
                      value={answers.currentWebsiteUrl}
                      onChange={(value) => update({ currentWebsiteUrl: value })}
                      placeholder="https://yourwebsite.com"
                    />
                  )}

                  {answers.projectMode && (
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
                        >
                          {type}
                        </OptionButton>
                      ))}
                    </div>
                  </div>
                  )}
                  <NotesBox
                    label="Tell us more about the business"
                    placeholder="Example: I run a premium barber studio in Enschede focused on men's haircuts and beard treatments."
                    value={answers.notes.business}
                    onChange={(value) => updateNote("business", value)}
                  />
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {WEBSITE_GOALS.map((goal) => (
                      <GoalOption
                        key={goal.label}
                        goal={goal}
                        selected={answers.goals.includes(goal.label)}
                        onClick={() => update({ goals: toggleArrayValue(answers.goals, goal.label) })}
                        price={goalPriceLabel(goal)}
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
                    <button
                      type="button"
                      onClick={() => {
                        update({ style: "Keep current colors" });
                        setColorEditorOpen(false);
                      }}
                      className={cn(
                        "relative min-h-36 overflow-hidden rounded-2xl border p-5 text-left shadow-md transition hover:-translate-y-0.5 hover:shadow-xl",
                        answers.style === "Keep current colors" ? "border-zinc-950 bg-zinc-950 text-white ring-4 ring-zinc-950/10" : "border-zinc-200 bg-white text-zinc-950"
                      )}
                    >
                      <div className="flex h-full min-h-24 flex-col justify-between">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-xl font-black">Keep current colors</h3>
                            <p className={cn("mt-2 max-w-sm text-sm leading-6", answers.style === "Keep current colors" ? "text-white/75" : "text-zinc-600")}>
                              Use the colors from the existing website or brand.
                            </p>
                          </div>
                          <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full", answers.style === "Keep current colors" ? "bg-white text-[var(--primary)]" : "bg-zinc-100 text-transparent")}>
                            <Check className="h-4 w-4" />
                          </span>
                        </div>
                        <div className="mt-5 flex -space-x-2">
                          {answers.customColors.map((color) => (
                            <span key={color} className="h-7 w-7 rounded-full border-2 border-white" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                      </div>
                    </button>
                    {STYLE_DIRECTIONS.map((style) => {
                      const selected = answers.style === style.label;

                      return (
                        <button
                          key={style.label}
                          type="button"
                          onClick={() => selectStyle(style.label)}
                          className={cn(
                            "relative min-h-36 overflow-hidden rounded-2xl border p-5 text-left text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-xl",
                            selected ? "border-zinc-950 ring-4 ring-zinc-950/10" : "border-white/60"
                          )}
                          style={{ background: `linear-gradient(135deg, ${style.palette[0]}, ${style.palette[1]} 58%, ${style.palette[2]})` }}
                        >
                          <div className="absolute inset-0 bg-black/25" />
                          <div className="relative z-10 flex h-full min-h-24 flex-col justify-between">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h3 className="text-xl font-black">{style.label}</h3>
                                <p className="mt-2 max-w-sm text-sm leading-6 text-white/80">{style.description}</p>
                              </div>
                              <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[var(--primary)]", selected ? "opacity-100" : "opacity-0")}>
                                <Check className="h-4 w-4" />
                              </span>
                            </div>
                            <div className="mt-5 flex -space-x-2">
                              {style.palette.map((color) => (
                                <span key={color} className="h-7 w-7 rounded-full border-2 border-white" style={{ backgroundColor: color }} />
                              ))}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setColorEditorOpen((open) => !open)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--primary)] bg-white px-5 py-3 text-sm font-bold text-[var(--primary)] transition hover:-translate-y-0.5 hover:bg-[var(--primary-soft)] hover:shadow-md"
                  >
                    <Palette className="h-4 w-4" />
                    {colorEditorOpen ? "Hide custom colors" : "Customize colors"}
                  </button>

                  {colorEditorOpen && (
                    <ColorEditor colors={answers.customColors} updateColor={updateColor} colorMode={answers.colorMode} setColorMode={(value) => update({ colorMode: value })} />
                  )}

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
                  <div className="flex flex-col gap-3 rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
                    <p>Choose the sections you want. Each selected section adds only the price shown.</p>
                    <button
                      type="button"
                      onClick={selectAllSections}
                      className={cn(
                        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition",
                        allSectionsSelected
                          ? "bg-zinc-950 text-white hover:bg-zinc-800"
                          : "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]"
                      )}
                    >
                      {allSectionsSelected ? "Unselect all" : "Select all"}
                    </button>
                    </div>

                  <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
                    {SECTIONS.map((section) => (
                      <OptionButton
                        key={section.label}
                        selected={answers.sections.includes(section.label)}
                        onClick={() => update({ sections: toggleArrayValue(answers.sections, section.label) })}
                        icon={getSectionIcon(section.label)}
                        description={section.recommended ? "Usually recommended" : "Optional / scope-dependent"}
                        price={sectionPriceLabel(section)}
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
                    Choose only the add-ons you need. The price shown is the exact amount added to the estimate.
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {FUNCTIONALITY.map((feature) => (
                      <OptionButton
                        key={feature.label}
                        selected={answers.functionality.includes(feature.label)}
                        onClick={() => update({ functionality: toggleArrayValue(answers.functionality, feature.label) })}
                        icon={feature.icon}
                        price={`+€${feature.price}`}
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
                  {CONTENT_ITEMS.map((item) => {
                    const domainCoveredByCurrentSite = currentWebsiteRequired && item.key === "domain";

                    return (
                      <ContentReadyCard
                        key={item.key}
                        item={item}
                        value={answers.contentReady[item.key]}
                        disabled={domainCoveredByCurrentSite}
                        disabledReason="Covered by the current website link from step 1."
                        onChange={(value) => updateContentReady(item.key, value)}
                      />
                    );
                  })}
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
                  <div>
                    <h3 className="mb-3 text-lg font-black text-zinc-950">Urgency</h3>
                    <div className="grid gap-3">
                      {URGENCY.map((urgency) => (
                        <OptionButton
                          key={urgency.label}
                          selected={answers.urgency === urgency.label}
                          onClick={() => update({ urgency: urgency.label })}
                          icon={Clock}
                          description={urgency.description}
                          price={urgencyPriceLabel(urgency)}
                        >
                          {urgency.label}
                        </OptionButton>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-black text-zinc-950">Maintenance</h3>
                    <div className="grid gap-3">
                      {MAINTENANCE_OPTIONS.map((option) => (
                        <OptionButton
                          key={option.label}
                          selected={answers.maintainability === option.label}
                          onClick={() => update({ maintainability: option.label })}
                          icon={option.icon}
                          description={option.description}
                          price={option.monthly > 0 ? `+€${option.monthly}/month` : "Included"}
                        >
                          {option.label}
                        </OptionButton>
                      ))}
                    </div>
                  </div>

                  <NotesBox
                    label="Timeline or maintenance notes"
                    placeholder="Example: I need the website before my shop opens next Friday and want help with small updates after launch."
                    value={answers.notes.urgency}
                    onChange={(value) => updateNote("urgency", value)}
                  />
                </div>
              )}

              {step === 7 && (
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

              {step === 8 && (
                <div className="space-y-6">
                  <div className="flex flex-col gap-4 rounded-2xl border border-[var(--primary)]/15 bg-[var(--primary-soft)] p-5 sm:flex-row sm:items-start">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                      <CreditCard className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-black text-zinc-950">A deposit of €{result.deposit.toLocaleString("nl-NL")} secures your spot</p>
                      <p className="mt-1 text-sm leading-6 text-zinc-600">
                        Every project starts with this deposit so the plan, timeline and work can be reserved and scheduled. Once it is confirmed, your full website brief is sent straight to the email you provided - automatically, after your final confirmation.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-black text-zinc-950">Would you like a short call before we start?</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {CALL_PREFERENCES.map((option) => (
                        <OptionButton
                          key={option.value}
                          selected={answers.wantsCall === option.value}
                          onClick={() => {
                            update({ wantsCall: option.value });
                            trackEvent("call_preference_selected", { wants_call: option.value });
                          }}
                          icon={option.icon}
                          description={option.description}
                        >
                          {option.label}
                        </OptionButton>
                      ))}
                    </div>
                  </div>

                  <NotesBox
                    label="Anything to mention before we start?"
                    placeholder="Example: I want to start next week, but I first need to confirm the exact scope."
                    value={answers.notes.next}
                    onChange={(value) => updateNote("next", value)}
                  />
                </div>
              )}

              {step === 9 && (
                <div className="space-y-6">
                  <div className="rounded-[1.75rem] bg-[var(--primary)] p-6 text-white">
                    <div className="mb-4 inline-flex rounded-full bg-white/10 p-3">
                      <Check className="h-6 w-6" />
                    </div>
                    <h3 className="text-3xl font-black">Confirmed - your brief is on its way.</h3>
                    <p className="mt-3 max-w-2xl text-zinc-300">
                      An email with the full website brief, package, estimate and deposit details has been sent to <strong className="text-white">{answers.lead.email || "your email"}</strong>. If a draft opened in your mail app, just hit send to keep your copy.
                      {answers.wantsCall === "yes"
                        ? " We will also reach out to plan the short call you asked for."
                        : " We will follow up once the deposit is confirmed to get started."}
                    </p>
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
                      <p className="mt-1 text-sm text-zinc-500">Uses the browser print dialog. Choose "Save as PDF".</p>
                    </button>

                    <a
                      href={briefMailto}
                      onClick={() => trackEvent("email_brief_resent")}
                      className="rounded-2xl border border-zinc-200 bg-white p-5 text-left shadow-md shadow-zinc-200/60 transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <Mail className="mb-4 h-6 w-6" />
                      <p className="font-semibold">Resend brief by email</p>
                      <p className="mt-1 text-sm text-zinc-500">Reopens the brief addressed to {answers.lead.email || "your email"}, ready to send again.</p>
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
                canGoBack ? "border border-[var(--border)] bg-white text-[var(--primary)] hover:bg-[var(--primary-soft)]" : "cursor-not-allowed border border-[var(--border)] bg-slate-100 text-slate-400"
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
                    ? "bg-[var(--cta)] text-white hover:bg-[var(--cta-dark)]"
                    : "cursor-not-allowed bg-slate-300 text-slate-500"
                )}
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>

        <MiniBrief answers={answers} result={result} />
      </main>
    </div>
  );
}
