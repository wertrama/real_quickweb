import { ArrowRight, Compass } from "lucide-react";
import { PROCESS_STEPS } from "../../data/configurator";
import { SectionHeader } from "../shared/SectionHeader";

export function ProcessSection() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="How it works"
        title="Two paths, same clear outcome."
        text="Some clients know the package already. Others need the configurator to recommend one."
        icon={Compass}
      />
      <div className="mb-8 grid gap-5 lg:grid-cols-2">
        <PathCard title="Path A: I know what I want" steps={["Choose package", "Start project / send brief"]} />
        <PathCard title="Path B: I do not know what I need" steps={["Use configurator", "Get recommended package", "Start project / send brief"]} />
      </div>
      <div className="grid gap-5 lg:grid-cols-4">
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

function PathCard({ title, steps }) {
  return (
    <div className="rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-lg shadow-zinc-200/50">
      <h3 className="text-xl font-black text-zinc-950">{title}</h3>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-3">
            <span className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-bold text-white">{step}</span>
            {index < steps.length - 1 && <ArrowRight className="hidden h-4 w-4 text-zinc-400 sm:block" />}
          </div>
        ))}
      </div>
    </div>
  );
}
