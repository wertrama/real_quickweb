import logoMark from "../../assets/logo-mark.png";

export function Brand() {
  return (
    <div className="flex items-center gap-3" aria-label="NaarWeb Studio">
      <img src={logoMark} alt="" aria-hidden="true" className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
      <span className="h-7 w-px shrink-0 bg-[var(--gold)]" aria-hidden="true" />
      <span className="font-[var(--font-heading)] text-xl font-extrabold leading-none tracking-tight text-[var(--forest)] sm:text-2xl">
        NaarWeb <span className="font-bold text-[var(--emerald)]">Studio</span>
      </span>
    </div>
  );
}
