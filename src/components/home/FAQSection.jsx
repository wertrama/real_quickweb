import { ChevronDown, FileQuestion } from "lucide-react";
import { SectionHeader } from "../shared/SectionHeader";

export function FAQSection() {
  const faqs = [
    ["Is this a website builder?", "No. You use the form to explain what you need. NaarWeb uses that plan to design, build and launch the website for you."],
    ["What if I already know the package I want?", "Choose Basic, Advanced or Premium from the homepage. The configurator opens with that package selected."],
    ["What if I do not know which package fits?", "Click Help me choose. Your answers help recommend the package that fits your business goal."],
    ["Can you improve my current website?", "Yes. Choose \"Improve my current website\" at the start. We can keep what works and rebuild the parts that feel outdated, unclear or hard to use."],
    ["Do I need all my text and photos ready?", "No. It helps, but it is not required. We can include content help in the scope."],
    ["Do I have to pay immediately?", "No. At the end you can choose a deposit, a short consultation or send the brief first."],
  ];

  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="FAQ" title="Practical questions, plain answers." icon={FileQuestion} />
      <div className="space-y-3">
        {faqs.map(([question, answer]) => (
          <details key={question} className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-semibold text-[var(--text-main)]">
              {question}
              <ChevronDown className="h-5 w-5 text-[var(--primary)] transition group-open:rotate-180" />
            </summary>
            <p className="px-5 pb-5 leading-7 text-[var(--text-muted)]">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
