import { motion } from "framer-motion";
import { ArrowRight, BadgeEuro, Check, FileText, MonitorSmartphone, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import heroImage from "../../assets/hero.png";
import { scrollToId } from "../../utils/ui";

export function HeroSection({ onStart }) {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
      <div className="flex flex-col justify-center">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-zinc-900 shadow-sm">
            <Sparkles className="h-4 w-4 text-amber-600" /> Website plan, package and finished build
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
            You define the website. We build it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">
            QuickWeb Studio helps small businesses turn a vague website idea into a clear website plan, package, design direction and finished website.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={onStart} className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-4 font-bold text-white shadow-xl shadow-zinc-950/20 transition hover:-translate-y-0.5 hover:bg-zinc-800">
              Start website plan <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => scrollToId("packages")} className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-4 font-bold text-zinc-900 transition hover:-translate-y-0.5 hover:shadow-lg">
              View packages <BadgeEuro className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <TrustPill icon={FileText} title="Clear brief" text="No vague scope" />
            <TrustPill icon={MonitorSmartphone} title="Mobile-friendly" text="Built for real visitors" />
            <TrustPill icon={ShieldCheck} title="Human build" text="Not another DIY builder" />
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="relative">
        <div className="relative overflow-hidden rounded-[2rem] border border-zinc-900 bg-zinc-950 p-4 shadow-2xl shadow-zinc-950/25">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-white">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-amber-200">Project snapshot</p>
                <h3 className="text-2xl font-black">Website plan ready</h3>
              </div>
              <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-zinc-950">Ready to build</span>
            </div>
            <div className="grid gap-5 overflow-hidden rounded-3xl border border-white/10 bg-[#151515] p-5 sm:grid-cols-[0.9fr_1.1fr]">
              <div className="overflow-hidden rounded-2xl bg-white/10">
                <img src={heroImage} alt="QuickWeb website planning preview" className="h-full min-h-56 w-full object-cover" />
              </div>
              <div className="flex flex-col justify-between gap-5">
                <div>
                  <p className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-zinc-200">Recommended path</p>
                  <h4 className="text-3xl font-black leading-tight">Choose a package or let the plan recommend one.</h4>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">Both paths end with a clear brief and a website that can actually be built.</p>
                </div>
                <div className="grid gap-3">
                  <SnapshotLine icon={PackageCheck} title="Package" text="Basic, Advanced or Premium" />
                  <SnapshotLine icon={Check} title="Brief" text="Goal, sections, style and features" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">Path A</p>
              <p className="mt-1 text-xl font-black">Choose package</p>
              <p className="mt-1 text-sm text-zinc-500">For people who know what they want.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">Path B</p>
              <p className="mt-1 text-xl font-black">Use configurator</p>
              <p className="mt-1 text-sm text-zinc-500">For people who need direction.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function TrustPill({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="rounded-xl bg-teal-50 p-2 text-teal-700">
          <Icon className="h-4 w-4" />
        </span>
        <p className="font-black text-zinc-950">{title}</p>
      </div>
      <p className="mt-1 text-sm text-zinc-500">{text}</p>
    </div>
  );
}

function SnapshotLine({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <Icon className="mb-3 h-5 w-5 text-amber-200" />
      <p className="text-sm font-bold">{title}</p>
      <p className="mt-1 text-xs text-zinc-400">{text}</p>
    </div>
  );
}
