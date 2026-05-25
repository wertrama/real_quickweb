import { Compass } from "lucide-react";
import { PROCESS_STEPS } from "../../data/configurator";
import { SectionHeader } from "../shared/SectionHeader";

export function ProcessSection() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="How it works"
        title="From package choice to finished website."
        text="The flow stays simple whether you already know the package or need help choosing."
        icon={Compass}
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {PROCESS_STEPS.map((item, index) => (
          <div key={item.title} className="rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-lg shadow-zinc-200/50">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-zinc-950 p-3 text-white">
                <item.icon className="h-5 w-5" />
              </div>
              <span className="ml-auto text-sm font-black text-zinc-400">0{index + 1}</span>
            </div>
            <h3 className="text-lg font-black">{item.title}</h3>
            <p className="mt-3 leading-7 text-zinc-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
