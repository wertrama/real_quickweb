import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Brand } from "../shared/Brand";
import { scrollToId } from "../../utils/ui";
import { trackEvent } from "../../utils/analytics";
import { HeroSection } from "./HeroSection";
import { WhatWeBuildSection } from "./WhatWeBuildSection";
import { PackagesSection } from "./PackagesSection";
import { ExampleDirectionsSection } from "./ExampleDirectionsSection";
import { ProcessSection } from "./ProcessSection";
import { FAQSection } from "./FAQSection";
import { FinalCTA } from "./FinalCTA";

export function HomePage({ onStart, getPlanHref }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const start = (packageKey = "starter", event) => {
    event?.preventDefault();
    trackEvent("start_configurator_clicked", {
      location: packageKey ? "homepage_package" : "homepage",
      package_key: packageKey || "starter",
    });
    onStart(packageKey || "starter");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    ["Examples", "examples"],
    ["What you get", "what-you-get"],
    ["How it works", "process"],
    ["Packages", "packages"],
    ["FAQ", "faq"],
  ];

  return (
    <div className="bg-[var(--background)]">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/30 bg-white/35 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Brand />
          <nav className="hidden items-center gap-8 text-base font-semibold text-[var(--text-muted)] lg:flex">
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => scrollToId(id)} className="transition hover:-translate-y-0.5 hover:text-[var(--primary)]">
                {label}
              </button>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <button onClick={() => scrollToId("packages")} className="rounded-full border border-[var(--primary)] bg-white/70 px-5 py-3 text-base font-semibold text-[var(--primary)] transition hover:-translate-y-0.5 hover:bg-white">
              View packages
            </button>
            <a href={getPlanHref("starter")} onClick={(event) => start("starter", event)} className="rounded-full bg-[var(--cta)] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[var(--cta-dark)]">
              Start website plan
            </a>
          </div>
          <button className="rounded-xl border border-white/50 bg-white/40 p-2 text-[var(--primary)] transition hover:-translate-y-0.5 lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/30 bg-white/80 px-4 py-4 backdrop-blur-xl lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {navItems.map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => {
                    setMenuOpen(false);
                    scrollToId(id);
                  }}
                  className="rounded-xl px-3 py-3 text-left text-sm font-semibold text-[var(--text-muted)] transition hover:-translate-y-0.5 hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"
                >
                  {label}
                </button>
              ))}
              <a href={getPlanHref("starter")} onClick={(event) => start("starter", event)} className="mt-2 rounded-xl bg-[var(--cta)] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[var(--cta-dark)]">
                Start website plan
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        <HeroSection href={getPlanHref("starter")} onStart={(event) => start("starter", event)} />
        <ExampleDirectionsSection />
        <WhatWeBuildSection />
        <ProcessSection />
        <PackagesSection getPlanHref={getPlanHref} onChoosePackage={start} onHelpChoose={(event) => start("starter", event)} />
        <FAQSection />
        <FinalCTA href={getPlanHref("starter")} onStart={(event) => start("starter", event)} />
      </main>
    </div>
  );
}
