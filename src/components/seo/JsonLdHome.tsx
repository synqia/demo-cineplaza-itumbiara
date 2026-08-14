import { getBaseUrl } from "@/lib/env";
import { faqs } from "@/data/faqData";
import { servicesData } from "@/data/servicesData";

const baseUrl = getBaseUrl();

function buildFaqPageJsonLd() {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function buildServiceJsonLd() {
  const organizationId = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}#organization`
    : undefined;
  return servicesData.map((service) => ({
    "@type": "Service",
    name: service.title,
    description: service.description,
    areaServed: "Joinville, SC",
    ...(organizationId && {
      provider: {
        "@id": organizationId,
      },
    }),
  }));
}

export default function JsonLdHome() {
  const faqPage = buildFaqPageJsonLd();
  const services = buildServiceJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(services) }}
      />
    </>
  );
}
