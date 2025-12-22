"use client";

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-md open:border-l-4 open:border-l-primary open:shadow-lg">
      <summary className="flex justify-between items-center w-full p-6 text-left cursor-pointer list-none select-none group-hover:bg-slate-50 dark:group-hover:bg-slate-700/50 group-open:bg-transparent transition-colors">
        <span className="font-semibold text-lg text-slate-900 dark:text-white group-hover:text-primary group-open:text-primary transition-colors pr-8">
          {question}
        </span>
        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center group-hover:bg-primary/10 group-open:bg-primary transition-all duration-300 shrink-0">
          <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 group-hover:text-primary group-open:text-white text-xl transition-transform duration-300 group-open:rotate-180">
            expand_more
          </span>
        </div>
      </summary>
      <div className="px-6 pb-6 pt-2 text-slate-600 dark:text-slate-300 text-base leading-relaxed border-t border-slate-100 dark:border-slate-700">
        <p dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </details>
  );
}

const faqData = [
  {
    question: "How do I file a new insurance claim?",
    answer:
      'You can file a claim online through our Claims Center, via our mobile app, or by calling our 24/7 claims hotline at <strong class="text-slate-900 dark:text-white">1-800-METRO-01</strong>. Have your policy number and incident details ready for faster processing.',
  },
  {
    question: "Can I update my policy coverage online?",
    answer:
      "Yes, existing customers can log in to their account portal to request coverage changes, update beneficiaries, or change deductibles. Some changes may require review by an underwriter and will be processed within 1-2 business days.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, Amex), direct bank transfers (ACH), and checks. You can also set up autopay in your account settings to ensure you never miss a premium payment.",
  },
  {
    question: "How long does it take to get a quote?",
    answer:
      "For most personal insurance products like auto or home, you can get an instant quote online in under 5 minutes. Complex business liability quotes may take up to 24 hours as our specialists review your specific risk profile.",
  },
];

export default function FAQ() {
  return (
    <div className="mb-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Find quick answers to common questions about our policies, claims process, and support
          services before reaching out.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((item, index) => (
          <FAQItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
