import { ArrowRight, BadgeEuro, Check, CircleHelp, Star, X } from "lucide-react";
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
        <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {Object.values(PACKAGES).map((pack) => (
            <PackageHomeCard key={pack.key} pack={pack} href={getPlanHref(pack.key)} featured={pack.key === "business"} onChoosePackage={onChoosePackage} />
          ))}
        </div>
        <div className="mt-8 rounded-[1.75rem] border border-[var(--border)] bg-[var(--background)] p-6 text-center">
          <p className="font-extrabold text-[var(--text-main)]">Not sure which package fits?</p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Answer a few questions and we will recommend one.</p>
          <a
            href={getPlanHref("starter")}
            onClick={onHelpChoose}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-4 font-semibold text-[var(--forest)] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[var(--gold-dark)] focus-visible:bg-[var(--gold-dark)]"
          >
            <CircleHelp className="h-5 w-5" /> Help me choose
          </a>
        </div>
      </div>
    </section>
  );
}

function PackageHomeCard({ pack, href, featured, onChoosePackage }) {
  const premium = pack.key === "premium";
  const starter = pack.key === "starter";

  return (
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border bg-white shadow-xl shadow-black/5 transition hover:-translate-y-1 hover:shadow-2xl",
        featured ? "border-2 border-[var(--forest)] shadow-black/10" : starter ? "border-[var(--forest-soft)]" : "border-[var(--border)]"
      )}
    >
      <div className={cn("p-6", premium ? "bg-[var(--forest-dark)]" : "bg-white")}>
        <div className="flex min-h-8 items-start justify-between gap-4">
          <PackageBadge pack={pack} featured={featured} premium={premium} />
        </div>
        <h3 className="mt-5 text-2xl font-extrabold" style={{ color: premium ? "var(--white)" : "var(--forest)" }}>
          {pack.name}
        </h3>
        <p className={cn("mt-3 text-sm leading-6", premium ? "text-[var(--cream)]" : "text-[var(--text-muted)]")}>{pack.bestFor}</p>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--text-muted)]">From</p>
          <p className="mt-1 text-5xl font-extrabold tracking-tight text-[var(--forest)]">&euro;{pack.base}</p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">up to &euro;{pack.max}</p>
        </div>

        <FeatureList title="Included" items={pack.homepageIncluded} type="included" className="mt-6" />
        <FeatureList title="Not included" items={pack.boundaries} type="excluded" className="mt-6 border-t border-[var(--border)] pt-5" />

        <p className="mt-6 text-sm font-semibold text-[var(--text-muted)]">Maintenance from &euro;{pack.monthly}/month</p>
        <a
          href={href}
          onClick={(event) => onChoosePackage(pack.key, event)}
          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-extrabold text-[var(--forest)] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[var(--gold-dark)] focus-visible:bg-[var(--gold-dark)]"
        >
          Choose {pack.shortName} <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

function PackageBadge({ pack, featured, premium }) {
  if (featured) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-[var(--forest)] shadow-sm">
        <Star className="h-3.5 w-3.5" />
        {pack.badge}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-bold", premium ? "bg-white/10 text-[var(--gold-soft)]" : "bg-[var(--forest-soft)] text-[var(--forest)]")}>
      {pack.badge}
    </span>
  );
}

function FeatureList({ title, items, type, className }) {
  const excluded = type === "excluded";
  const Icon = excluded ? X : Check;

  return (
    <div className={className}>
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--forest)]">{title}</p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6">
            <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", excluded ? "text-[var(--text-muted)]" : "text-[var(--emerald)]")} />
            <span className={excluded ? "text-[var(--text-muted)]" : "text-[var(--text-main)]"}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
