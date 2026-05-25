export function CookieBanner({ onAccept, onDecline }) {
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-3xl border border-[var(--border)] bg-white p-5 shadow-2xl shadow-black/10">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="font-semibold text-[var(--text-main)]">Analytics cookies</p>
          <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
            We can use analytics to understand how people move through the configurator. No names, emails, phone numbers or private notes are sent.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={onDecline} className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-muted)] hover:bg-[var(--background)]">Decline</button>
          <button onClick={onAccept} className="rounded-full bg-[var(--cta)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--cta-dark)]">Accept</button>
        </div>
      </div>
    </div>
  );
}
