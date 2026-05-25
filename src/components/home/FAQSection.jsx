import { ChevronDown, FileQuestion } from "lucide-react";
import { SectionHeader } from "../shared/SectionHeader";

export function FAQSection() {
  const faqs = [
    ["Is this a website builder?", "No. You use the form to explain what you need. QuickWeb Studio uses that plan to design, build and launch the website for you."],
    ["What if I already know the package I want?", "Choose Basic, Advanced or Premium from the homepage. The configurator opens with that package selected so you can continue toward a brief."],
    ["What if I do not know which package fits?", "Start the website plan. Your answers help recommend the package that matches the goal, sections, features and content readiness."],
    ["Can you improve my current website?", "Yes. Choose \"Improve my current website\" at the start. We can keep what works and rebuild the parts that feel outdated, unclear or hard to use."],
    ["Do I need all my text and photos ready?", "No. It helps, but it is not required. The form asks what you already have so content help can be included in the scope."],
    ["Can people book, call or message me through the site?", "Yes. You can select booking, WhatsApp, contact forms, maps, payment links and other practical features during the configurator."],
    ["Do I have to pay immediately?", "No. At the end you can choose a deposit, a short consultation or just send the brief first."],
  ];

  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="FAQ" title="Practical questions, plain answers." icon={FileQuestion} />
      <div className="space-y-3">
        {faqs.map(([question, answer]) => (
          <details key={question} className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              {question}
              <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
            </summary>
            <p className="mt-3 leading-7 text-zinc-600">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
