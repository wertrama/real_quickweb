import { ArrowRight } from "lucide-react";

export function FinalCTA({ href, onStart }) {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[var(--text-main)] p-8 text-white shadow-2xl shadow-black/20 sm:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-soft)]">Start now</p>
            <h2 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">Get a website plan and package before the build starts.</h2>
            <p className="mt-4 max-w-2xl leading-8 text-[var(--primary-soft)]">Choose a package or answer a few questions. Either way, the next step is clear.</p>
          </div>
          <a href={href} onClick={onStart} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--cta)] px-6 py-4 font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-[var(--cta-dark)]">
            Start website plan <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
