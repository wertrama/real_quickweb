import { cn } from "../../utils/ui";

export function SectionHeader({ eyebrow, title, text, icon: Icon, invert = false, align = "center" }) {
  const centered = align === "center";

  return (
    <div className={cn("mb-10 max-w-3xl", centered && "mx-auto text-center")}>
      <div className={cn("mb-4 flex items-center gap-3", centered && "justify-center")}>
        {Icon && (
          <span className={cn("rounded-2xl p-3", invert ? "bg-white/10 text-amber-200" : "bg-zinc-950 text-white")}>
            <Icon className="h-5 w-5" />
          </span>
        )}
        <p className={cn("text-sm font-black uppercase tracking-[0.18em]", invert ? "text-zinc-300" : "text-zinc-500")}>{eyebrow}</p>
      </div>
      <h2 className={cn("text-4xl font-black tracking-tight sm:text-5xl", invert ? "text-white" : "text-zinc-950")}>{title}</h2>
      {text && <p className={cn("mt-4 text-lg leading-8", invert ? "text-zinc-300" : "text-zinc-600")}>{text}</p>}
    </div>
  );
}
