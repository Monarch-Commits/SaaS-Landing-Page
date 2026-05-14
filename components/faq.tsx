'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What is FlowAI?',
    answer:
      'FlowAI is an AI-powered workflow automation platform that helps teams automate repetitive tasks, generate insights, and scale operations. It combines intelligent automation with intuitive design to make workflow management effortless.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes! Our Starter plan is completely free forever with up to 3 workflows. For Pro and Business plans, we offer a 14-day free trial with full access to all features. No credit card required.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      "Absolutely. You can cancel your subscription at any time from your account settings. If you cancel, you'll continue to have access until the end of your billing period.",
  },
  {
    question: 'Is my data secure?',
    answer:
      'Security is our top priority. FlowAI is SOC 2 Type II certified, uses end-to-end encryption, and offers SSO/SAML for enterprise customers. Your data is stored in secure, geographically distributed data centers.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-16 text-center">
          <span className="bg-primary/10 text-primary mb-4 inline-block px-4 py-1.5 text-sm font-medium">
            FAQ
          </span>
          <h2 className="mb-4 text-3xl font-bold text-balance md:text-4xl lg:text-5xl">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            Everything you need to know about FlowAI.
          </p>
        </div>

        <div className="w-full space-y-4 border-y p-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="bg-card/40 border-border/50 hover:border-border overflow-hidden border transition-all duration-300"
            >
              <button
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-foreground font-medium">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`text-muted-foreground h-5 w-5 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="text-muted-foreground px-6 pb-5 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
