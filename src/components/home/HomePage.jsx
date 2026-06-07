import { useEffect, useState } from "react";
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

const NAV_ITEMS = [
  { label: "Home", id: "top" },
  { label: "Examples", id: "examples" },
  { label: "Services", id: "what-you-get" },
  { label: "How It Works", id: "process" },
  { label: "Pricing", id: "packages" },
  { label: "FAQ", id: "faq" },
];

export function HomePage({ onStart, getPlanHref }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("top");
  const mobileMenuId = "site-mobile-menu";

  const start = (packageKey = "starter", event) => {
    event?.preventDefault();
    trackEvent("start_configurator_clicked", {
      location: packageKey ? "homepage_package" : "homepage",
      package_key: packageKey || "starter",
    });
    onStart(packageKey || "starter");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToNavItem = (id) => {
    setActiveId(id);

    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    scrollToId(id);
  };

  useEffect(() => {
    const updateActiveSection = () => {
      const nextActiveId = NAV_ITEMS.reduce((currentId, item) => {
        const section = document.getElementById(item.id);

        if (!section) {
          return currentId;
        }

        return section.getBoundingClientRect().top <= 140 ? item.id : currentId;
      }, "top");

      setActiveId(nextActiveId);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <div className="bg-[var(--background)]">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--border)] bg-[var(--cream)]/95 shadow-[var(--shadow-subtle)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <button type="button" onClick={() => goToNavItem("top")} className="text-left transition hover:-translate-y-0.5" aria-label="Go to homepage top">
            <Brand />
          </button>
          <nav className="hidden items-center gap-8 text-base font-extrabold text-[var(--forest)] lg:flex" aria-label="Main navigation">
            {NAV_ITEMS.map(({ label, id }) => {
              const active = activeId === id;

              return (
              <button
                key={id}
                type="button"
                onClick={() => goToNavItem(id)}
                className={`relative rounded-md px-1.5 py-3.5 transition hover:text-[var(--emerald)] focus-visible:bg-[var(--forest-soft)] ${
                  active ? "after:absolute after:inset-x-1 after:bottom-1 after:h-1 after:rounded-full after:bg-[var(--gold)]" : ""
                }`}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </button>
              );
            })}
          </nav>
          <div className="hidden items-center lg:flex">
            <a
              href={getPlanHref("starter")}
              onClick={(event) => start("starter", event)}
              className="rounded-lg bg-[var(--gold)] px-7 py-4 text-base font-extrabold text-[var(--forest)] shadow-[var(--shadow-subtle)] transition hover:-translate-y-0.5 hover:bg-[var(--gold-dark)] focus-visible:bg-[var(--gold-dark)]"
            >
              Start your website
            </a>
          </div>
          <button
            type="button"
            className="rounded-xl border border-[var(--border)] bg-white/80 p-3 text-[var(--forest)] transition hover:-translate-y-0.5 hover:bg-[var(--forest-soft)] focus-visible:bg-[var(--forest-soft)] lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls={mobileMenuId}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <div id={mobileMenuId} className="border-t border-[var(--border)] bg-[var(--cream)] px-4 py-4 shadow-[var(--shadow-subtle)] lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {NAV_ITEMS.map(({ label, id }) => {
                const active = activeId === id;

                return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    goToNavItem(id);
                  }}
                  className={`rounded-xl px-3 py-3 text-left text-sm font-semibold text-[var(--forest)] transition hover:-translate-y-0.5 hover:bg-[var(--forest-soft)] hover:text-[var(--emerald)] focus-visible:bg-[var(--forest-soft)] ${
                    active ? "border-l-2 border-[var(--gold)] bg-white/60" : ""
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                </button>
                );
              })}
              <a
                href={getPlanHref("starter")}
                onClick={(event) => {
                  setMenuOpen(false);
                  start("starter", event);
                }}
                className="mt-2 rounded-lg bg-[var(--gold)] px-4 py-3 text-center text-sm font-bold text-[var(--forest)] transition hover:-translate-y-0.5 hover:bg-[var(--gold-dark)] focus-visible:bg-[var(--gold-dark)]"
              >
                Start your website
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
