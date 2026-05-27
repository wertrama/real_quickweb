import { ArrowRight, BadgeEuro, Check, CircleHelp, Star } from "lucide-react";
import { PACKAGES } from "../../data/configurator";
import { cn } from "../../utils/ui";
import { SectionHeader } from "../shared/SectionHeader";

export function PackagesSection({ getPlanHref, onChoosePackage, onHelpChoose }) {
  return (
    <section id="packages" className="border-y border-[var(--border)] bg-[var(--surface)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Packages"
          title="Pick the package that fits your business"
          text="Every package has a clear maximum price. If you are not sure, answer a few questions and we will recommend the best option."
          icon={BadgeEuro}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {Object.values(PACKAGES).map((pack) => (
            <PackageHomeCard key={pack.key} pack={pack} href={getPlanHref(pack.key)} featured={pack.key === "business"} onChoosePackage={onChoosePackage} />
          ))}
        </div>
        <div className="mt-8 rounded-[1.75rem] border border-[var(--border)] bg-[var(--background)] p-6 text-center">
          <p className="font-extrabold text-[var(--text-main)]">Not sure which package fits?</p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Answer a few questions and we will recommend one.</p>
          <a href={getPlanHref("starter")} onClick={onHelpChoose} className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--cta)] px-6 py-4 font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[var(--cta-dark)]">
            <CircleHelp className="h-5 w-5" /> Help me choose
          </a>
        </div>
      </div>
    </section>
  );
}

function PackageHomeCard({ pack, href, featured, onChoosePackage }) {
  const premium = pack.key === "premium";

  return (
    <div
      className={cn(
        "rounded-[2rem] border p-6 shadow-xl transition hover:-translate-y-1",
        featured
          ? "border-[var(--accent)] bg-[#FFFBF5] text-[var(--text-main)] shadow-black/10"
          : "border-[var(--border)] bg-white text-[var(--text-main)] shadow-black/5"
      )}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-bold",
            featured
              ? "bg-[var(--accent)] text-white"
              : premium
              ? "bg-[var(--text-main)] text-white"
              : "bg-[var(--primary-soft)] text-[var(--primary)]"
          )}
        >
          {pack.badge}
        </span>
        {featured && <Star className="h-5 w-5 text-[var(--accent)]" />}
      </div>
      <h3 className="text-2xl font-extrabold">{pack.name}</h3>
      <p className="mt-6 text-sm uppercase tracking-wide opacity-70">From</p>
      <p className="mt-1 text-4xl font-extrabold">€{pack.base}</p>
      <p className="mt-1 text-sm text-[var(--text-muted)]">up to €{pack.max}</p>
      <div className={cn("mt-5 rounded-2xl p-4", featured ? "bg-white/10" : "bg-[var(--background)]")}>
        <p className="text-xs font-black uppercase tracking-wide opacity-70">Best for</p>
        <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{pack.bestFor}</p>
      </div>
      <ul className="mt-6 space-y-3">
        {pack.homepageIncluded.map((item) => (
          <li key={item} className="flex gap-3 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success)]" />
            <span className="text-[var(--text-main)]">{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-[var(--text-muted)]">Maintenance from €{pack.monthly}/month</p>
      <a
        href={href}
        onClick={(event) => onChoosePackage(pack.key, event)}
        className={cn(
          "mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition",
          featured
            ? "bg-[var(--cta)] text-white shadow-lg shadow-black/10 hover:bg-[var(--cta-dark)]"
            : premium
            ? "bg-[var(--text-main)] text-white hover:bg-[var(--primary-dark)]"
            : "border border-[var(--primary)] bg-white text-[var(--primary)] hover:bg-[var(--primary-soft)]"
        )}
      >
        Choose {pack.shortName} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
