"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqData";

export default function FaqSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="faq"
      className="py-12 md:py-20 bg-bg-base"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-300 mx-auto px-4 sm:px-6">
        <div
          className={`text-center mb-8 md:mb-14 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-primary font-body mb-3">
            Dúvidas frequentes
          </span>
          <h2
            className="font-heading font-semibold text-text-primary mb-4 leading-[1.2]"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            Perguntas frequentes
          </h2>
          <p className="text-text-muted text-sm max-w-75 mx-auto leading-relaxed font-body">
            Agendamento, domiciliar, odontologia e o que este site (não)
            substitui.
          </p>
        </div>

        <div
          className={`max-w-3xl mx-auto transition-all duration-500 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Accordion multiple={false}>
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-b border-border-default last:border-b-0"
              >
                <AccordionTrigger className="py-5 font-heading font-medium text-text-primary text-[15px] hover:no-underline hover:text-primary [&>svg]:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-text-muted text-[14px] font-body leading-[1.7] pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
