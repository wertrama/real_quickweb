import { ArrowRight } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Examples", href: "#examples" },
  { label: "Services", href: "#what-you-get" },
  { label: "Pricing", href: "#packages" },
  { label: "FAQ", href: "#faq" },
];

export function FinalCTA({ href, onStart }) {
  return (
    <>
      <section className="bg-[var(--cream)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[var(--radius-panel)] bg-[var(--forest)] p-8 text-[var(--cream)] shadow-2xl shadow-black/20 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--gold-soft)]">Start now</p>
              <h2 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl" style={{ color: "var(--cream)" }}>
                Ready to move your business forward?
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-[var(--forest-soft)]">
                Tell us what you need. We will turn it into a clear, professional website.
              </p>
            </div>
            <a
              href={href}
              onClick={onStart}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-4 font-extrabold text-[var(--forest)] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[var(--gold-dark)] focus-visible:bg-[var(--gold-dark)]"
            >
              Start your website <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer href={href} onStart={onStart} />
    </>
  );
}

function Footer({ href, onStart }) {
  return (
    <footer className="bg-[var(--forest-dark)] px-4 py-12 text-[var(--cream)] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <a href="#top" className="inline-flex items-center gap-3 rounded-md text-[var(--cream)] focus-visible:bg-white/10">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--gold)]/40 bg-white/10 font-[var(--font-heading)] text-lg font-black text-[var(--cream)]">
              NW
            </span>
            <span className="font-[var(--font-heading)] text-2xl font-extrabold tracking-tight text-[var(--cream)]">
              NaarWeb Studio
            </span>
          </a>
          <p className="mt-5 max-w-md leading-7 text-[var(--forest-soft)]">
            Clear, professional websites for small local businesses.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em]" style={{ color: "var(--gold-soft)" }}>
            Links
          </h3>
          <nav className="mt-4 grid gap-3" aria-label="Footer navigation">
            {FOOTER_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="w-fit rounded-md text-[var(--forest-soft)] transition hover:text-[var(--gold)] focus-visible:bg-white/10">
                {link.label}
              </a>
            ))}
            <a href={href} onClick={onStart} className="w-fit rounded-md font-semibold text-[var(--gold)] transition hover:text-[var(--gold-soft)] focus-visible:bg-white/10">
              Start your website
            </a>
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em]" style={{ color: "var(--gold-soft)" }}>
            Contact & legal
          </h3>
          <div className="mt-4 space-y-3 text-[var(--forest-soft)]">
            <p>Use the website planner to send your brief.</p>
            <p>&copy; 2026 NaarWeb Studio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
