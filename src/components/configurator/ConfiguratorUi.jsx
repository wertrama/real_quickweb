import { motion } from "framer-motion";
import { BriefcaseBusiness, Check, Eye, FileText, MessageSquareText } from "lucide-react";
import { getContentIcon, getGoalMeta, steps } from "../../data/configurator";
import { getPackageEstimateForDisplay } from "../../utils/configurator";
import { cn } from "../../utils/ui";

export function MetricCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-xs uppercase tracking-wide text-zinc-400">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}

export function ProjectModeCard({ mode, selected, onSelect }) {
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

export function GoalOption({ goal, selected, onClick }) {
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

export function ContentReadyCard({ item, value, onChange }) {
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

export function OptionButton({ selected, children, onClick, icon: Icon, description }) {
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

export function StepShell({ step, children }) {
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

export function Progress({ currentStep }) {
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

export function MiniBrief({ answers, result, showPrice = false }) {
  return (
    <aside className="rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-lg shadow-zinc-200/50 lg:sticky lg:top-6">
      <div className="mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-zinc-700" />
        <h3 className="font-semibold text-zinc-950">Live brief</h3>
      </div>
      <div className="space-y-4 text-sm">
        <BriefLine label="Package" value={result.package.name} />
        <BriefLine label="Recommended" value={result.recommendedPackage.name} />
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
            <p className="text-xs uppercase tracking-wide text-zinc-400">Package price</p>
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

export function ColorEditor({ colors, updateColor, colorMode, setColorMode }) {
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

export function NotesBox({ label, value, onChange, placeholder }) {
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

export function DesignCard({ direction, selected, onSelect }) {
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

export function PackageComparisonCard({ pack, answers, selected, recommended, onSelect }) {
  const estimate = getPackageEstimateForDisplay(pack.key, answers);
  const likelyItems = Array.from(new Set([...pack.probable, ...answers.sections.slice(0, 5), ...answers.functionality.slice(0, 3)]));

  return (
    <div
      className={cn(
        "rounded-[1.75rem] border p-5",
        selected
          ? "border-zinc-950 bg-zinc-950 text-white shadow-xl shadow-zinc-950/20"
          : recommended
          ? "border-teal-500 bg-white ring-4 ring-teal-500/10"
          : "border-zinc-200 bg-white"
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className={cn("rounded-full px-3 py-1 text-xs font-medium", selected ? "bg-white text-zinc-950" : recommended ? "bg-teal-50 text-teal-700" : "bg-zinc-100 text-zinc-600")}>
          {selected ? "Selected" : recommended ? "Recommended" : pack.badge}
        </span>
        {(selected || recommended) && <Check className="h-5 w-5" />}
      </div>
      <h3 className="text-xl font-black">{pack.name}</h3>
      <p className={cn("mt-2 text-sm leading-6", selected ? "text-zinc-300" : "text-zinc-600")}>{pack.bestFor}</p>
      <p className="mt-5 text-sm uppercase tracking-wide opacity-70">Estimated with your scope</p>
      <p className="mt-1 text-3xl font-black">€{estimate.toLocaleString("nl-NL")}</p>
      <p className={cn("mt-1 text-sm", selected ? "text-zinc-300" : "text-zinc-500")}>Maintenance from €{pack.monthly}/month</p>
      <div className={cn("mt-5 rounded-2xl p-4", selected ? "bg-white/10" : "bg-zinc-100")}>
        <p className="mb-3 text-sm font-semibold">Probable website version</p>
        <div className="flex flex-wrap gap-2">
          {likelyItems.slice(0, 8).map((item) => (
            <span key={item} className={cn("rounded-full px-3 py-1 text-xs", selected ? "bg-white/10 text-zinc-200" : "bg-white text-zinc-700")}>{item}</span>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={onSelect}
        className={cn("mt-5 w-full rounded-full px-4 py-3 text-sm font-bold transition", selected ? "bg-white text-zinc-950 hover:bg-zinc-100" : "bg-zinc-950 text-white hover:bg-zinc-800")}
      >
        {selected ? "Selected package" : `Use ${pack.shortName}`}
      </button>
    </div>
  );
}

export function ProbableWebsiteVersion({ answers, result }) {
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

export function SelectedDesignPreview({ result }) {
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

export function BriefDocument({ answers, result }) {
  const noteEntries = Object.entries(answers.notes).filter(([, value]) => value?.trim());

  return (
    <div className="print:block hidden" id="print-brief">
      <div className="p-10 font-sans text-zinc-950">
        <h1 className="text-3xl font-bold">Website Brief</h1>
        <p className="mt-2 text-zinc-600">Generated from the QuickWeb Studio configurator.</p>
        <div className="mt-8 grid grid-cols-2 gap-6">
          <PrintSection title="Client details">
            <p>Name: {answers.lead.name || "-"}</p>
            <p>Business: {answers.lead.businessName || answers.businessType || "-"}</p>
            <p>Email: {answers.lead.email || "-"}</p>
            <p>Phone: {answers.lead.phone || "-"}</p>
            <p>Preferred contact: {answers.lead.preferredContact || "-"}</p>
          </PrintSection>
          <PrintSection title="Package">
            <p>Chosen package: {result.package.name}</p>
            <p>Recommended package: {result.recommendedPackage.name}</p>
            <p>Package price: €{result.estimatedPrice.toLocaleString("nl-NL")}</p>
            <p>Internal raw value: €{result.internalRawValue.toLocaleString("nl-NL")}</p>
            <p>Deposit: €{result.deposit.toLocaleString("nl-NL")}</p>
            <p>Maintenance: €{result.monthly}/month</p>
            <p>Lead score: {result.leadScore}/100</p>
          </PrintSection>
          <PrintSection title="Website direction">
            <p>Starting point: {answers.projectMode || "-"}</p>
            <p>Business type: {answers.businessType || "-"}</p>
            <p>Goals: {answers.goals.join(", ") || "-"}</p>
            <p>Style: {answers.style || "-"}</p>
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

export function Input({ label, value, onChange, placeholder, type = "text" }) {
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
