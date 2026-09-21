"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Who is SmartSeason for?",
    answer:
      "Farm admins who manage multiple fields and agents, and field agents who need a simple way to log conditions and see what's assigned to them.",
  },
  {
    question: "How does SmartSeason know a crop's growth stage?",
    answer:
      "Growth stage is calculated automatically from the planting date, then compared against what's actually recorded — so a mismatch is itself a signal worth checking.",
  },
  {
    question: "Do agents see the whole farm?",
    answer:
      "No — agents only see the fields assigned to them. Admins see everything. Every view in SmartSeason respects that from the backend, not just the interface.",
  },
  {
    question: "What triggers an alert?",
    answer:
      "Conditions like low soil moisture, extreme temperature, a declining trend across recent updates, or a field that hasn't been updated in a while.",
  },
  {
    question: "Can I export field data?",
    answer:
      "Yes — fields, crops, alerts, and analytics can all be exported as CSV, scoped to whatever you're authorized to see.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="bg-white py-20 w-full">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-sm font-medium text-emerald-600">FAQs</p>
        <h2 className="mt-2 font-display text-3xl text-gray-900 sm:text-4xl">
          Questions about how SmartSeason works
        </h2>

        <div className="relative mt-10">
          <div className="absolute left-0 top-0 h-full w-0.75 rounded-full bg-gray-200" aria-hidden />

          <div className="space-y-3 pl-6">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="rounded-lg border border-gray-200 bg-gray-50"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-gray-900">
                      {faq.question}
                    </span>
                    <span
                      className={`shrink-0 text-gray-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                       aria-hidden
                    >
                      ⌄
                    </span>
                  </button>

                  {isOpen && (
                    <p className="px-5 pb-4 text-sm text-gray-600">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}