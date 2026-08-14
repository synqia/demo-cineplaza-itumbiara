import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/env";

const baseUrl = getBaseUrl() || "https://www.exemplo.com.br";
const origin = baseUrl.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
