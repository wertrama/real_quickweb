import { cn } from "../../utils/ui";

export function SectionHeader({ eyebrow, title, text, icon: Icon, invert = false, align = "center" }) {
  const centered = align === "center";

  return (
    <div className={cn("mb-14 max-w-4xl", centered && "mx-auto text-center")}>
      <div className={cn("mb-5 flex items-center gap-4", centered && "justify-center")}>
        {Icon && (
          <span className={cn("rounded-[1.25rem] p-4 shadow-lg", invert ? "bg-white/10 text-white shadow-black/20" : "bg-[var(--primary-soft)] text-[var(--primary)] shadow-black/5")}>
            <Icon className="h-7 w-7" />
          </span>
        )}
        <p className={cn("text-base font-black uppercase tracking-[0.18em]", invert ? "text-[var(--primary-soft)]" : "text-[var(--primary)]")}>{eyebrow}</p>
      </div>
      <h2 className={cn("text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl", invert ? "text-white" : "text-[var(--text-main)]")}>{title}</h2>
      {text && <p className={cn("mt-6 text-xl leading-9", invert ? "text-[var(--primary-soft)]" : "text-[var(--text-muted)]")}>{text}</p>}
    </div>
  );
}
