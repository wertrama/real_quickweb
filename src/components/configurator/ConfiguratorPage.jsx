import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  Clock,
  CreditCard,
  Download,
  Goal,
  Mail,
  Palette,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  BUSINESS_TYPES,
  CONTENT_ITEMS,
  FUNCTIONALITY,
  PACKAGES,
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
import { calculateResult, getSuggestedSelections, toggleArrayValue } from "../../utils/configurator";
import { cn } from "../../utils/ui";
import { Brand } from "../shared/Brand";
import {
  BriefDocument,
  ColorEditor,
  ContentReadyCard,
  DesignCard,
  GoalOption,
  Input,
  MetricCard,
  MiniBrief,
  NotesBox,
  OptionButton,
  PackageComparisonCard,
  ProbableWebsiteVersion,
  Progress,
  ProjectModeCard,
  SelectedDesignPreview,
  StepShell,
} from "./ConfiguratorUi";

export function ConfiguratorPage({ onBackHome, initialPackageKey = "" }) {
  const [step, setStep] = useState(() => (initialPackageKey ? 8 : 0));
  const [answers, setAnswers] = useState(() => ({
    ...defaultAnswers,
    packagePreference: initialPackageKey,
  }));
  const result = useMemo(() => calculateResult(answers), [answers]);
  const suggestions = useMemo(() => getSuggestedSelections(answers.businessType, answers.goals), [answers.businessType, answers.goals]);

  useEffect(() => {
    trackEvent("configurator_viewed", { package_preference: initialPackageKey || "none" });
  }, [initialPackageKey]);

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
    update({ sections: suggestions.sections, functionality: suggestions.functionality, packagePreference: "" });
    trackEvent("smart_suggestions_applied", { business_type: answers.businessType });
  };

  const next = () => {
    trackEvent("step_completed", { step_number: step + 1, step_title: steps[step].title });
    if (step === 8) {
      trackEvent("package_confirmed", {
        package: result.package.name,
        recommended_package: result.recommendedPackage.name,
        package_preference: result.packagePreference || "none",
      });
    }
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
Chosen package: ${result.package.name}
Recommended package: ${result.recommendedPackage.name}
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
                            update({ businessType: type, packagePreference: "" });
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
                    placeholder="Example: I run a premium barber studio in Enschede focused on men's haircuts and beard treatments."
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
                        onClick={() => update({ goals: toggleArrayValue(answers.goals, goal.label), packagePreference: "" })}
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
                        onClick={() => update({ sections: toggleArrayValue(answers.sections, section.label), packagePreference: "" })}
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
                        onClick={() => update({ functionality: toggleArrayValue(answers.functionality, feature.label), packagePreference: "" })}
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
                    <p className="mb-2 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm text-zinc-200">
                      {result.packagePreference ? "Chosen package" : "Recommended for you"}
                    </p>
                    <h3 className="text-3xl font-black">{result.package.name}</h3>
                    <p className="mt-3 max-w-2xl text-zinc-300">{result.package.description}</p>
                    {result.packagePreference && result.recommendedPackageKey !== result.packageKey && (
                      <p className="mt-3 max-w-2xl text-sm text-amber-100">
                        Based on the current answers, the configurator would recommend {result.recommendedPackage.name}. You can keep your chosen package or adjust it below.
                      </p>
                    )}
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      <MetricCard label="Package price" value={`€${result.estimatedPrice.toLocaleString("nl-NL")}`} />
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
                        selected={pack.key === result.packageKey}
                        recommended={pack.key === result.recommendedPackageKey}
                        onSelect={() => update({ packagePreference: pack.key })}
                      />
                    ))}
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                    <ProbableWebsiteVersion answers={answers} result={result} />
                    <SelectedDesignPreview result={result} />
                  </div>

                  <NotesBox
                    label="Package notes"
                    placeholder="Example: Advanced package looks right, but I may need CMS later."
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
                      <p className="mt-1 text-sm text-zinc-500">Uses the browser print dialog. Choose "Save as PDF".</p>
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
