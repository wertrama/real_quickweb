import { Compass } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Tell us about your business",
    text: "Share what you do, who you serve and what the website should achieve.",
  },
  {
    number: "02",
    title: "We design and build",
    text: "We turn the plan into a clear, responsive website for your business.",
  },
  {
    number: "03",
    title: "You review the website",
    text: "You check the pages and request small changes before launch.",
  },
  {
    number: "04",
    title: "Your website goes live",
    text: "We connect the basics and help you publish with confidence.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="bg-[var(--forest-dark)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="rounded-2xl bg-white/10 p-4 text-[var(--gold)] shadow-[0_14px_35px_rgba(0,0,0,0.2)]">
              <Compass className="h-7 w-7" />
            </span>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[var(--gold-soft)]">How it works</p>
          </div>
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "var(--white)" }}>
            A clear path from idea to launch.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--cream)]">
            Four focused steps keep the process simple, calm and easy to follow.
          </p>
        </div>

        <div className="relative">
          <div className="absolute bottom-10 left-8 top-8 w-px bg-white/20 lg:bottom-auto lg:left-[7%] lg:right-[7%] lg:top-8 lg:h-px lg:w-auto" aria-hidden="true" />
          <div className="grid gap-6 lg:grid-cols-4">
            {STEPS.map((step) => (
              <ProcessStep key={step.number} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step }) {
  return (
    <article className="relative grid grid-cols-[4rem_1fr] gap-4 lg:block">
      <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--gold)]/50 bg-[var(--gold)] text-2xl font-black text-[var(--forest-dark)] shadow-[0_0_0_8px_var(--forest-dark)] lg:mx-auto">
        {step.number}
      </span>
      <div className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.18)] lg:mt-6 lg:min-h-56">
        <h3 className="text-2xl font-extrabold leading-tight" style={{ color: "var(--white)" }}>
          {step.title}
        </h3>
        <p className="mt-4 leading-7 text-[var(--cream)]">{step.text}</p>
      </div>
    </article>
  );
}
