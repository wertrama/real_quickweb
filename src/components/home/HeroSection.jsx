import { motion } from "framer-motion";
import { ArrowRight, BadgeEuro } from "lucide-react";
import { scrollToId } from "../../utils/ui";

export function HeroSection({ onStart }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mx-auto max-w-5xl text-center">
        <p className="mb-6 inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-bold text-[var(--primary)] shadow-sm">
          QuickWeb Studio
        </p>
        <h1 className="text-5xl font-extrabold leading-[0.96] tracking-tight text-[var(--text-main)] sm:text-6xl lg:text-7xl">
          Websites built for you.
          <span className="block text-[var(--accent)]">Starting from €199.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-3xl text-2xl font-medium leading-10 text-[var(--text-muted)]">
          We turn your business idea into a clean website with purpose.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={onStart} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--cta)] px-7 py-4 text-lg font-semibold text-white shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[var(--cta-dark)]">
            Start website plan <ArrowRight className="h-5 w-5" />
          </button>
          <button onClick={() => scrollToId("packages")} className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-7 py-4 text-lg font-semibold text-[var(--text-main)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]">
            View packages <BadgeEuro className="h-5 w-5" />
          </button>
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-base font-semibold leading-7 text-[var(--primary)]">
          No DIY builder. No confusing agency process. You define what you need - we build it.
        </p>
      </motion.div>
    </section>
  );
}
