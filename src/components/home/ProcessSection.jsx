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
          <div key={item.title} className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-lg shadow-black/5">
            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-2xl bg-[var(--primary-soft)] p-4 text-[var(--primary)]">
                <item.icon className="h-7 w-7" />
              </div>
              <span className="ml-auto text-lg font-black text-[var(--primary)]">0{index + 1}</span>
            </div>
            <h3 className="text-2xl font-extrabold leading-tight text-[var(--text-main)]">{item.title}</h3>
            <p className="mt-4 text-lg leading-8 text-[var(--text-muted)]">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
