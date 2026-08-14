import SiteShell from "@/components/layout/SiteShell";
import HomePage from "@/components/home/HomePage";
import JsonLdMovieTheater from "@/components/seo/JsonLdMovieTheater";

export default function Page() {
  return (
    <SiteShell>
      <JsonLdMovieTheater />
      <HomePage />
    </SiteShell>
  );
}
