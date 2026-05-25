import { Check, Images } from "lucide-react";
import { EXAMPLE_DIRECTIONS } from "../../data/configurator";
import { SectionHeader } from "../shared/SectionHeader";

export function ExampleDirectionsSection() {
  return (
    <section id="examples" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Example website directions"
        title="A few possible directions before real client work is shown."
        text="These are example directions, not a portfolio claim. Later, real projects can become selected work."
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
    <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-xl shadow-zinc-200/60 transition hover:-translate-y-1 hover:shadow-2xl">
      <div
        className="min-h-64 p-5 text-white"
        style={{ background: `linear-gradient(135deg, ${direction.palette[0]}, ${direction.palette[1]})` }}
      >
        <div className="rounded-3xl border border-white/15 bg-black/15 p-4">
          <div className="mb-5 flex items-center justify-between gap-3">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">Mini visual preview</span>
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
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-black tracking-tight text-zinc-950">{direction.title}</h3>
        <p className="mt-3 text-sm font-semibold text-zinc-500">{direction.whoFor}</p>
        <p className="mt-4 leading-7 text-zinc-600">{direction.description}</p>
        <div className="mt-5 grid gap-2">
          {direction.sections.map((section) => (
            <div key={section} className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-3 text-sm font-bold text-zinc-800">
              <Check className="h-4 w-4 text-teal-600" />
              {section}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
