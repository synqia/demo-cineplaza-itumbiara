import { cinemaInfo } from "@/data/cinema";
import { getBaseUrl } from "@/lib/env";

export default function JsonLdOrganization() {
  const baseUrl = getBaseUrl() || "https://www.cineplaza.demo.br";

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: cinemaInfo.name,
    url: baseUrl,
    description: cinemaInfo.description,
    email: cinemaInfo.email,
    telephone: cinemaInfo.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: cinemaInfo.address.street,
      addressLocality: cinemaInfo.address.city,
      addressRegion: cinemaInfo.address.state,
      postalCode: cinemaInfo.address.zip,
      addressCountry: "BR",
    },
    sameAs: [
      cinemaInfo.social.instagram?.url,
      cinemaInfo.social.facebook?.url,
      cinemaInfo.social.youtube?.url,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
