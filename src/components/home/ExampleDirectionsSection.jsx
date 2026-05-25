import { Check, Images } from "lucide-react";
import { EXAMPLE_DIRECTIONS } from "../../data/configurator";
import { SectionHeader } from "../shared/SectionHeader";

export function ExampleDirectionsSection() {
  return (
    <section id="examples" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Website directions"
        title="See what we can build"
        text="A few website directions for different types of businesses. Your final design is shaped around your business, style and goals."
        icon={Images}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {EXAMPLE_DIRECTIONS.map((direction) => (
          <DirectionCard key={direction.title} direction={direction} />
        ))}
      </div>
    </section>
  );
}

function DirectionCard({ direction }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-xl shadow-black/5 transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="min-h-72 p-5 text-white" style={{ background: `linear-gradient(135deg, ${direction.palette[0]}, ${direction.palette[1]})` }}>
        <div className="rounded-3xl border border-white/20 bg-white/10 p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">Preview</span>
            <span className="h-8 w-8 rounded-full border border-white/20" style={{ backgroundColor: direction.palette[2] }} />
          </div>
          <div className="space-y-3">
            <div className="h-5 w-2/3 rounded-full bg-white/70" />
            <div className="h-3 w-full rounded-full bg-white/25" />
            <div className="h-3 w-5/6 rounded-full bg-white/20" />
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3">
            <div className="h-20 rounded-2xl bg-white/15" />
            <div className="h-20 rounded-2xl bg-white/10" />
          </div>
          <div className="mt-3 h-12 rounded-2xl bg-white/20" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-extrabold tracking-tight text-[var(--text-main)]">{direction.title}</h3>
        <p className="mt-3 text-sm font-semibold text-[var(--primary)]">{direction.whoFor}</p>
        <p className="mt-4 leading-7 text-[var(--text-muted)]">{direction.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {direction.sections.map((section) => (
            <div key={section} className="flex items-center gap-2 rounded-full bg-[var(--background)] px-3 py-2 text-xs font-bold text-[var(--text-main)]">
              <Check className="h-4 w-4 text-[var(--success)]" />
              {section}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
