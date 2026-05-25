import { Check, Handshake } from "lucide-react";
import { SectionHeader } from "../shared/SectionHeader";

export function WhoThisIsForSection() {
  const situations = [
    "You need a professional website but do not know what sections it should have.",
    "You want a clear price before starting.",
    "You want someone to build it for you, not another DIY website builder.",
    "You need bookings, leads, contact requests or a stronger online presence.",
    "You already have an old website and want a cleaner, more modern version.",
  ];

  return (
    <section id="who-this-is-for" className="bg-zinc-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Who this is for"
          title="This is for you if..."
          text="People recognize their situation faster than a generic industry list. That is why the planning starts with the problem, not the label."
          icon={Handshake}
          invert
        />
        <div className="mx-auto grid max-w-5xl gap-3">
          {situations.map((situation) => (
            <div key={situation} className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-5 transition hover:bg-white/[0.09]">
              <span className="mt-0.5 rounded-2xl bg-white/10 p-2 text-teal-200">
                <Check className="h-5 w-5" />
              </span>
              <p className="text-lg font-bold leading-7">{situation}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-4xl rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-center leading-8 text-zinc-300">
          <span className="font-black text-white">Popular clients:</span> barbers, salons, tattoo artists, coaches, local services, restaurants, freelancers and creatives.
        </p>
      </div>
    </section>
  );
}
