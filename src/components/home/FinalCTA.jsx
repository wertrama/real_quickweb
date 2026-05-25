import { ArrowRight } from "lucide-react";

export function FinalCTA({ onStart }) {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-zinc-950 p-8 text-white shadow-2xl shadow-zinc-950/20 sm:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">Start now</p>
            <h2 className="max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">Start with a clear website plan, not a vague quote request.</h2>
            <p className="mt-4 max-w-2xl leading-8 text-zinc-300">Choose a package if you already know the direction, or use the configurator if you want a recommendation first.</p>
          </div>
          <button onClick={onStart} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-medium text-zinc-950 transition hover:bg-zinc-100">
            Start website plan <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
