import { motion } from "framer-motion";
import { ArrowRight, BadgeEuro } from "lucide-react";
import { scrollToId } from "../../utils/ui";

export function HeroSection({ href, onStart }) {
  return (
    <section className="mx-auto flex min-h-screen max-w-7xl items-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-5xl text-left">
        <h1 className="text-5xl font-extrabold leading-[0.96] tracking-tight text-[var(--text-main)] sm:text-6xl lg:text-7xl">
          Websites built for you.
          <span className="block text-[var(--accent)]">Starting from €199.</span>
        </h1>
        <p className="mt-7 max-w-3xl text-2xl font-medium leading-10 text-[var(--text-muted)]">
          We turn your business idea into a clean website with purpose.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href={href} onClick={onStart} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--cta)] px-7 py-4 text-lg font-semibold text-white shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[var(--cta-dark)]">
            Start website plan <ArrowRight className="h-5 w-5" />
          </a>
          <button onClick={() => scrollToId("packages")} className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-7 py-4 text-lg font-semibold text-[var(--text-main)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]">
            View packages <BadgeEuro className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-8 max-w-3xl text-base font-semibold leading-7 text-[var(--primary)]">
          No DIY builder. No confusing agency process. You define what you need - we build it.
        </p>
      </motion.div>
    </section>
  );
}
