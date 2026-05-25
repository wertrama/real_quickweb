export function CookieBanner({ onAccept, onDecline }) {
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-3xl border border-zinc-200 bg-white p-5 shadow-2xl shadow-zinc-950/20">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="font-semibold text-zinc-950">Analytics cookies</p>
          <p className="mt-1 text-sm leading-6 text-zinc-600">
            We can use analytics to understand how people move through the configurator. No names, emails, phone numbers or private notes are sent.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={onDecline} className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-50">Decline</button>
          <button onClick={onAccept} className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">Accept</button>
        </div>
      </div>
    </div>
  );
}
