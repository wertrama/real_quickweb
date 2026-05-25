import { BarChart3, LifeBuoy, PackageCheck, Target, Wrench } from "lucide-react";
import { SectionHeader } from "../shared/SectionHeader";

export function WhatWeBuildSection() {
  const items = [
    {
      icon: Target,
      title: "Website planned around your goal",
      text: "We structure the site around bookings, leads, portfolio, trust or sales.",
    },
    {
      icon: Wrench,
      title: "Designed and built for you",
      text: "You do not need to use a DIY builder. We turn your answers into a finished website.",
    },
    {
      icon: BarChart3,
      title: "Mobile, SEO and analytics ready",
      text: "Your website is built for mobile users, basic Google visibility and tracking.",
    },
    {
      icon: LifeBuoy,
      title: "Maintenance after launch",
      text: "Small updates, fixes and support from €14/month.",
    },
  ];

  return (
    <section id="what-you-get" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="What you get"
        title="The important parts handled for you."
        text="A clear website plan, a finished build, and the basics needed to launch with confidence."
        icon={PackageCheck}
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <BuildCard key={item.title} {...item} />
        ))}
      </div>
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
