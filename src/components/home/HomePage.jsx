import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Brand } from "../shared/Brand";
import { scrollToId } from "../../utils/ui";
import { trackEvent } from "../../utils/analytics";
import { HeroSection } from "./HeroSection";
import { WhatWeBuildSection } from "./WhatWeBuildSection";
import { WhoThisIsForSection } from "./WhoThisIsForSection";
import { PackagesSection } from "./PackagesSection";
import { ExampleDirectionsSection } from "./ExampleDirectionsSection";
import { ProcessSection } from "./ProcessSection";
import { FAQSection } from "./FAQSection";
import { FinalCTA } from "./FinalCTA";

export function HomePage({ onStart }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const start = (packageKey = "") => {
    trackEvent("start_configurator_clicked", {
      location: packageKey ? "homepage_package" : "homepage",
      package_key: packageKey || "not_selected",
    });
    onStart(packageKey);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    ["What we build", "what-we-build"],
    ["Who it is for", "who-this-is-for"],
    ["Packages", "packages"],
    ["Examples", "examples"],
    ["How it works", "process"],
    ["FAQ", "faq"],
  ];

  return (
    <div className="bg-[linear-gradient(180deg,#fffdf7_0%,#eef7f6_42%,#f7f7fb_100%)]">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Brand />
          <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-600 lg:flex">
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => scrollToId(id)} className="transition hover:text-zinc-950">
                {label}
              </button>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <button onClick={() => scrollToId("packages")} className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-50">
              View packages
            </button>
            <button onClick={() => start()} className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-amber-500/15 hover:bg-zinc-800">
              Start website plan
            </button>
          </div>
          <button className="rounded-xl border border-zinc-200 p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-zinc-200 bg-white px-4 py-4 lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {navItems.map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => {
                    setMenuOpen(false);
                    scrollToId(id);
                  }}
                  className="rounded-xl px-3 py-3 text-left text-sm font-medium hover:bg-zinc-100"
                >
                  {label}
                </button>
              ))}
              <button onClick={() => start()} className="mt-2 rounded-xl bg-zinc-950 px-4 py-3 text-sm font-medium text-white">
                Start website plan
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        <HeroSection onStart={() => start()} />
        <WhatWeBuildSection />
        <WhoThisIsForSection />
        <PackagesSection onChoosePackage={start} onHelpChoose={() => start()} />
        <ExampleDirectionsSection />
        <ProcessSection />
        <FAQSection />
        <FinalCTA onStart={() => start()} />
      </main>
    </div>
  );
}
