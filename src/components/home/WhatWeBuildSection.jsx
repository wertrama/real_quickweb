import { BriefcaseBusiness, Images, MousePointerClick, PackageCheck } from "lucide-react";
import { SectionHeader } from "../shared/SectionHeader";

export function WhatWeBuildSection() {
  const items = [
    {
      icon: BriefcaseBusiness,
      title: "Business websites",
      text: "For local businesses that need trust, services, pricing, reviews, maps and contact flow.",
    },
    {
      icon: Images,
      title: "Portfolio websites",
      text: "For creatives, artists, barbers, tattoo artists and personal brands that need strong visual presentation.",
    },
    {
      icon: MousePointerClick,
      title: "Conversion websites",
      text: "For businesses that need bookings, leads, WhatsApp clicks, contact forms or payment/deposit links.",
    },
  ];

  return (
    <section id="what-we-build" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="What we build"
        title="Three website types, one clear planning flow."
        text="The first job is making the website easy to understand. The second job is building it properly."
        icon={PackageCheck}
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {items.map((item) => (
          <BuildCard key={item.title} {...item} />
        ))}
      </div>
      <p className="mx-auto mt-7 max-w-3xl text-center text-base font-semibold leading-7 text-zinc-700">
        All websites are mobile-friendly, SEO-ready, analytics-ready and built around your business goal.
      </p>
    </section>
  );
}

function BuildCard({ icon: Icon, title, text }) {
  return (
    <div className="group relative overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-lg shadow-zinc-200/50 transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-300 via-teal-300 to-rose-300" />
      <div className="mb-5 flex items-center gap-3">
        <span className="rounded-2xl bg-zinc-950 p-3 text-white shadow-lg shadow-zinc-950/10">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="text-xl font-black leading-tight text-zinc-950">{title}</h3>
      </div>
      <p className="leading-7 text-zinc-600">{text}</p>
    </div>
  );
}
