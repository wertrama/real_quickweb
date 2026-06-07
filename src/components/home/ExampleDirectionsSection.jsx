import { ArrowUpRight, Images } from "lucide-react";
import { EXAMPLE_DIRECTIONS } from "../../data/configurator";
import { SectionHeader } from "../shared/SectionHeader";

const DEFAULT_PROJECT_LINK = "#examples";

export function ExampleDirectionsSection() {
  return (
    <section id="examples" className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      <SectionHeader
        eyebrow="Website directions"
        title="See what we can build"
        text="A few website directions for different types of businesses. Your final design is shaped around your business, style and goals."
        icon={Images}
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {EXAMPLE_DIRECTIONS.map((direction) => (
          <DirectionCard key={direction.title} direction={direction} />
        ))}
      </div>
    </section>
  );
}

function DirectionCard({ direction }) {
  const href = direction.href || direction.projectHref || direction.link || DEFAULT_PROJECT_LINK;
  const isExternal = /^https?:\/\//.test(href);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-white shadow-xl shadow-black/5 transition duration-200 hover:border-[var(--emerald)] hover:shadow-2xl hover:shadow-black/10 motion-safe:hover:-translate-y-1">
      <ProjectPreview direction={direction} />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="w-fit rounded-full bg-[var(--forest-soft)] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--emerald)]">
          {direction.category}
        </p>
        <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-[var(--forest)]">{direction.title}</h3>
        <p className="mt-4 leading-7 text-[var(--text-muted)]">{direction.result}</p>
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-md font-bold text-[var(--gold-dark)] transition hover:text-[var(--forest)] focus-visible:bg-[var(--gold-soft)]"
          aria-label={`View project: ${direction.title}`}
        >
          View project
          <ArrowUpRight className="h-4 w-4 transition motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
        </a>
      </div>
    </article>
  );
}

function ProjectPreview({ direction }) {
  const previewItems = direction.preview || direction.sections.slice(0, 3);

  return (
    <div className="border-b border-[var(--border)] bg-[var(--forest-soft)] p-4 sm:p-5" aria-hidden="true">
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--cream)] shadow-sm">
        <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] bg-white px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--forest)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--emerald)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
          </div>
          <span className="h-2 w-16 rounded-full bg-[var(--forest-soft)]" />
        </div>

        <div className="p-4">
          <div className="rounded-xl bg-[var(--forest)] p-4">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
              <span className="h-2 w-20 rounded-full bg-white/60" />
            </div>
            <div className="space-y-2">
              <span className="block h-3 w-3/4 rounded-full bg-white/90" />
              <span className="block h-2.5 w-full rounded-full bg-white/25" />
              <span className="block h-2.5 w-5/6 rounded-full bg-white/20" />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {previewItems.map((item) => (
              <div key={item} className="min-h-16 rounded-xl border border-[var(--border)] bg-white p-2">
                <span className="mb-3 block h-1.5 w-8 rounded-full bg-[var(--emerald)]" />
                <span className="block text-[0.65rem] font-bold leading-tight text-[var(--forest)]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
