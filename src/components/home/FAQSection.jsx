import { ChevronDown, FileQuestion } from "lucide-react";

const FAQS = [
  ["Is this a website builder?", "No. You use the form to explain what you need. NaarWeb Studio uses that plan to design, build and launch the website for you."],
  ["What if I already know the package I want?", "Choose Basic, Advanced or Premium from the homepage. The configurator opens with that package selected."],
  ["What if I do not know which package fits?", "Click Help me choose. Your answers help recommend the package that fits your business goal."],
  ["Can you improve my current website?", 'Yes. Choose "Improve my current website" at the start. We can keep what works and rebuild the parts that feel outdated, unclear or hard to use.'],
  ["Do I need all my text and photos ready?", "No. It helps, but it is not required. We can include content help in the scope."],
  ["Do I have to pay immediately?", "No. At the end you can choose a deposit, a short consultation or send the brief first."],
];

export function FAQSection() {
  return (
    <section id="faq" className="bg-[var(--cream)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="rounded-2xl bg-[var(--forest-soft)] p-4 text-[var(--forest)] shadow-[var(--shadow-subtle)]">
              <FileQuestion className="h-7 w-7" />
            </span>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--emerald)]">FAQ</p>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-[var(--forest)] sm:text-5xl">Practical questions, plain answers.</h2>
        </div>

        <div className="divide-y divide-[var(--border)] rounded-[var(--radius-card)] border border-[var(--border)] bg-white shadow-[var(--shadow-subtle)]">
          {FAQS.map(([question, answer]) => (
            <details key={question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg px-5 py-5 font-semibold text-[var(--forest)] focus-visible:bg-[var(--forest-soft)] sm:px-6">
                <span>{question}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-[var(--emerald)] group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-5 leading-7 text-[var(--text-muted)] sm:px-6">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
