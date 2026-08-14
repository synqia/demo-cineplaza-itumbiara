import { cinemaInfo } from "@/data/cinema";
import { getBaseUrl } from "@/lib/env";

export default function JsonLdMovieTheater() {
  const baseUrl = getBaseUrl() || "https://www.cineplaza.demo.br";

  const data = {
    "@context": "https://schema.org",
    "@type": "MovieTheater",
    name: cinemaInfo.name,
    description: cinemaInfo.description,
    url: baseUrl,
    telephone: cinemaInfo.phone,
    email: cinemaInfo.email,
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80",
    address: {
      "@type": "PostalAddress",
      streetAddress: cinemaInfo.address.street,
      addressLocality: cinemaInfo.address.city,
      addressRegion: cinemaInfo.address.state,
      postalCode: cinemaInfo.address.zip,
      addressCountry: "BR",
    },
    openingHours: "Mo-Su 13:00-23:00",
    hasMap: cinemaInfo.mapsUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLdBreadcrumb({
  items,
}: {
  items: Array<{ name: string; path: string }>;
}) {
  const baseUrl = getBaseUrl() || "https://www.cineplaza.demo.br";
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl.replace(/\/$/, "")}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLdMovie({
  title,
  description,
  image,
  director,
  datePublished,
  url,
}: {
  title: string;
  description: string;
  image: string;
  director: string;
  datePublished: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: title,
    description,
    image,
    director: {
      "@type": "Person",
      name: director,
    },
    datePublished,
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
