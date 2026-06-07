import { ArrowRight, BarChart3, Globe2, Images, MonitorSmartphone, TrendingUp } from "lucide-react";
import { scrollToId } from "../../utils/ui";

export function HeroSection({ href, onStart }) {
  return (
    <section id="top" className="relative min-h-screen overflow-visible bg-[var(--background)] px-4 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-12 pb-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div className="relative z-10 max-w-[50rem] text-left lg:-translate-y-[5vh]">
          <p className="mb-6 text-sm font-black uppercase tracking-[0.18em] text-[var(--emerald)] sm:text-base">
            Websites for small businesses
          </p>
          <h1 className="max-w-[50rem] text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--forest)] sm:text-6xl lg:text-[4.75rem] xl:text-[5.6rem]">
            Move your business forward online.
          </h1>
          <p className="mt-7 max-w-[24rem] text-lg font-medium leading-8 text-[var(--text-muted)] sm:max-w-[46rem] sm:text-xl sm:leading-9 lg:max-w-[50rem] lg:text-[1.35rem]">
            Clear, professional websites built for you - <span className="whitespace-nowrap">starting from <span className="font-extrabold text-[var(--gold-dark)]">&euro;199</span>.</span>
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={href}
              onClick={onStart}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--gold)] px-7 py-4 text-base font-extrabold text-[var(--forest)] shadow-[var(--shadow-subtle)] transition hover:-translate-y-0.5 hover:bg-[var(--gold-dark)] focus-visible:bg-[var(--gold-dark)] sm:px-8 sm:py-5"
            >
              Start your website <ArrowRight className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => scrollToId("examples")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--forest)] bg-white/80 px-7 py-4 text-base font-extrabold text-[var(--forest)] transition hover:-translate-y-0.5 hover:bg-[var(--forest-soft)] focus-visible:bg-[var(--forest-soft)] sm:px-8 sm:py-5"
            >
              See examples <Images className="h-5 w-5 text-[var(--emerald)]" />
            </button>
          </div>
        </div>

        <HeroVisual />
      </div>
      <HeroConnector />
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative z-10 mx-auto hidden h-[34rem] w-full max-w-[44rem] lg:block lg:-translate-y-[3vh]" aria-hidden="true">
      <WalkingGlobe />
      <BrowserMockup />
      <PhoneMockup />
      <GoldRisePath />
      <IconBadge className="left-2 top-[58%]" icon={Globe2} />
      <IconBadge className="left-[40%] top-[2%]" icon={BarChart3} />
      <IconBadge className="right-10 top-[10%]" icon={TrendingUp} />
      <IconBadge className="right-1 bottom-[20%]" icon={MonitorSmartphone} />
    </div>
  );
}

function GoldRisePath() {
  return (
    <svg className="absolute -bottom-1 left-0 z-40 h-[29rem] w-full" viewBox="0 0 700 470" fill="none">
      <path
        d="M16 405C124 322 228 276 329 276C435 276 495 216 603 58"
        stroke="var(--gold)"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path d="M588 58L626 42L623 82" stroke="var(--emerald)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WalkingGlobe() {
  return (
    <svg className="absolute bottom-0 left-[10%] z-10 h-64 w-[78%]" viewBox="0 0 520 260" fill="none">
      <path d="M22 240C38 112 139 24 260 24C381 24 482 112 498 240H22Z" fill="var(--forest)" />
      <path d="M64 238C86 126 164 54 260 54C356 54 434 126 456 238" stroke="var(--cream)" strokeWidth="13" strokeLinecap="round" />
      <path d="M162 238C172 123 210 54 260 54C310 54 348 123 358 238" stroke="var(--cream)" strokeWidth="13" strokeLinecap="round" />
      <path d="M260 54V240" stroke="var(--cream)" strokeWidth="13" strokeLinecap="round" />
      <path d="M56 174H464" stroke="var(--cream)" strokeWidth="13" strokeLinecap="round" />
    </svg>
  );
}

function BrowserMockup() {
  return (
    <div className="absolute left-[22%] top-[18%] z-20 w-[61%] rounded-xl border border-[var(--border)] bg-white shadow-[0_28px_70px_rgba(26,58,42,0.18)]">
      <div className="flex items-center gap-1.5 border-b border-[var(--border)] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--cream)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--emerald)]" />
        <span className="ml-4 h-2.5 w-12 rounded-sm bg-[var(--forest)]" />
        <span className="ml-auto h-2 w-9 rounded-full bg-[var(--forest)]" />
        <span className="h-2 w-9 rounded-full bg-[var(--forest)]" />
      </div>
      <div className="p-4">
        <div className="mb-4 h-28 overflow-hidden rounded-lg bg-[var(--forest-soft)]">
          <BrowserLandscape />
        </div>
        <div className="mb-3 h-2 w-24 rounded-full bg-[var(--emerald)]" />
        <div className="grid grid-cols-3 gap-3">
          <MockBlock />
          <MockBlock />
          <MockBlock />
        </div>
        <div className="mt-3 grid grid-cols-[1fr_0.75fr] gap-3">
          <span className="h-10 rounded bg-[var(--cream)]" />
          <span className="h-10 rounded bg-[var(--gold-soft)]" />
        </div>
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="absolute bottom-[18%] right-[11%] z-30 w-28 rounded-2xl border-[3px] border-[var(--forest)] bg-white p-2 shadow-[0_22px_50px_rgba(26,58,42,0.22)]">
      <div className="mb-2 h-3 w-10 rounded-full bg-[var(--forest)]" />
      <div className="h-16 overflow-hidden rounded-lg bg-[var(--forest-soft)]">
        <BrowserLandscape />
      </div>
      <div className="mt-2 space-y-1.5">
        <span className="block h-2 rounded-full bg-[var(--forest-soft)]" />
        <span className="block h-2 w-2/3 rounded-full bg-[var(--forest-soft)]" />
        <span className="block h-5 w-10 rounded bg-[var(--gold)]" />
      </div>
    </div>
  );
}

function BrowserLandscape() {
  return (
    <svg className="h-full w-full" viewBox="0 0 360 150" preserveAspectRatio="none">
      <rect width="360" height="150" fill="var(--forest-soft)" />
      <path d="M0 112L84 62L136 90L210 28L360 112V150H0Z" fill="var(--forest)" opacity="0.95" />
      <path d="M150 150L238 44L360 104V150H150Z" fill="var(--emerald)" opacity="0.72" />
      <path d="M0 118L92 74L168 104L244 58L360 120V150H0Z" fill="var(--cream)" opacity="0.28" />
      <rect x="22" y="106" width="64" height="10" rx="5" fill="var(--gold-soft)" />
    </svg>
  );
}

function MockBlock() {
  return (
    <span className="block h-14 rounded bg-[var(--cream)]">
      <span className="mx-3 mt-3 block h-1.5 rounded-full bg-white" />
      <span className="mx-3 mt-2 block h-1.5 w-2/3 rounded-full bg-white" />
    </span>
  );
}

function IconBadge({ className, icon: Icon }) {
  return (
    <div className={`absolute z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white/92 text-[var(--emerald)] shadow-[0_16px_35px_rgba(26,58,42,0.13)] ${className}`}>
      <Icon className="h-5 w-5" strokeWidth={2} />
    </div>
  );
}

function HeroConnector() {
  return (
    <svg className="pointer-events-none absolute bottom-0 left-1/2 z-0 hidden h-96 w-[36rem] -translate-x-1/2 lg:block" viewBox="0 0 576 384" fill="none" aria-hidden="true">
      <path
        d="M506 20C506 98 288 88 288 194C288 278 288 322 288 380"
        stroke="var(--gold)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.62"
      />
      <path d="M276 366L288 380L300 366" stroke="var(--gold)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.62" />
    </svg>
  );
}
