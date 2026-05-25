import { ArrowRight, BadgeEuro, Check, CircleHelp, Star } from "lucide-react";
import { PACKAGES } from "../../data/configurator";
import { cn } from "../../utils/ui";
import { SectionHeader } from "../shared/SectionHeader";

export function PackagesSection({ onChoosePackage, onHelpChoose }) {
  return (
    <section id="packages" className="border-y border-zinc-200 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Packages"
          title="Choose a package, or let the plan recommend one."
          text="Path A is for people who know what they want. Path B is for people who need help choosing."
          icon={BadgeEuro}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {Object.values(PACKAGES).map((pack) => (
            <PackageHomeCard key={pack.key} pack={pack} featured={pack.key === "business"} onChoosePackage={onChoosePackage} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button onClick={onHelpChoose} className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-4 font-bold text-zinc-900 transition hover:-translate-y-0.5 hover:shadow-lg">
            <CircleHelp className="h-5 w-5" /> Not sure? Help me choose
          </button>
        </div>
      </div>
    </section>
  );
}

function PackageHomeCard({ pack, featured, onChoosePackage }) {
  return (
    <div className={cn("rounded-[2rem] border p-6 shadow-xl shadow-zinc-200/60", featured ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white")}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className={cn("rounded-full px-3 py-1 text-xs font-medium", featured ? "bg-white text-zinc-950" : "bg-zinc-100 text-zinc-600")}>{pack.badge}</span>
        {featured && <Star className="h-5 w-5" />}
      </div>
      <h3 className="text-2xl font-black">{pack.name}</h3>
      <p className="mt-6 text-sm uppercase tracking-wide opacity-70">Price</p>
      <p className="mt-1 text-4xl font-black">€{pack.max}</p>
      <div className={cn("mt-5 rounded-2xl p-4", featured ? "bg-white/10" : "bg-zinc-50")}>
        <p className="text-xs font-black uppercase tracking-wide opacity-70">Best for</p>
        <p className={cn("mt-2 text-sm leading-6", featured ? "text-zinc-200" : "text-zinc-700")}>{pack.bestFor}</p>
      </div>
      <ul className="mt-6 space-y-3">
        {pack.homepageIncluded.map((item) => (
          <li key={item} className="flex gap-3 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0" />
            <span className={featured ? "text-zinc-200" : "text-zinc-700"}>{item}</span>
          </li>
        ))}
      </ul>
      <p className={cn("mt-6 text-sm", featured ? "text-zinc-300" : "text-zinc-500")}>Maintenance from €{pack.monthly}/month</p>
      <button
        onClick={() => onChoosePackage(pack.key)}
        className={cn("mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition", featured ? "bg-white text-zinc-950 hover:bg-zinc-100" : "bg-zinc-950 text-white hover:bg-zinc-800")}
      >
        Choose {pack.shortName} <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
