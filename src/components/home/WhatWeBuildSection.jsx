import { CalendarCheck, Globe2, Headset, LayoutList, Search, Smartphone } from "lucide-react";

const BENEFITS = [
  {
    icon: Smartphone,
    title: "Mobile-Friendly Design",
    text: "Your website will look right on phones, tablets and desktops.",
  },
  {
    icon: LayoutList,
    title: "Clear Page Structure",
    text: "Visitors can find what they need without guessing.",
  },
  {
    icon: CalendarCheck,
    title: "Contact or Booking Forms",
    text: "People can send messages or booking requests from your website.",
  },
  {
    icon: Search,
    title: "Basic Search Optimisation",
    text: "Clear page details help more local customers find you online.",
  },
  {
    icon: Globe2,
    title: "Domain Connection",
    text: "Your website is connected to your own business domain.",
  },
  {
    icon: Headset,
    title: "Personal Support",
    text: "You get help before launch and guidance when you need it.",
  },
];

export function WhatWeBuildSection() {
  return (
    <section id="what-you-get" className="bg-[var(--cream)] px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="what-you-get-title">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 text-center">
          <h2 id="what-you-get-title" className="text-3xl font-extrabold tracking-tight text-[var(--forest)] sm:text-4xl">
            What You Get
          </h2>
          <span className="mx-auto mt-4 block h-0.5 w-16 rounded-full bg-[var(--gold)]" aria-hidden="true" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {BENEFITS.map((item) => (
            <BuildCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BuildCard({ icon: Icon, title, text }) {
  return (
    <article className="flex h-full flex-col items-center rounded-lg border border-[var(--border)] bg-white px-4 py-7 text-center shadow-[var(--shadow-subtle)] transition duration-200 hover:-translate-y-1 hover:border-[var(--emerald)] hover:shadow-xl hover:shadow-black/10">
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--forest-soft)] text-[var(--forest)]">
        <Icon className="h-8 w-8" strokeWidth={1.8} />
      </span>
      <h3 className="text-base font-extrabold leading-snug text-[var(--forest)]">{title}</h3>
      <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">{text}</p>
    </article>
  );
}
