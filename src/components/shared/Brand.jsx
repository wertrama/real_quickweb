export function Brand() {
  return (
    <div className="flex items-center gap-3 transition hover:-translate-y-0.5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--primary)] text-sm font-black text-white shadow-lg shadow-black/10 ring-4 ring-[var(--primary-soft)]">
        NS
      </div>
      <div>
        <p className="text-xl font-extrabold leading-none tracking-tight text-[var(--text-main)]">NaarWeb Studio</p>
      </div>
    </div>
  );
}
