import AboutSection from "@/components/sections/about-section";
import { fetchSanityData } from "@/lib/sanity/fetch";
import { aboutQuery } from "@/lib/sanity/queries";
import type { About as AboutType } from "@/lib/sanity/types";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutHighlights from "@/components/sections/about/AboutHighlights";
import AboutJourney from "@/components/sections/about/AboutJourney";

export default async function About() {
  const aboutData = await fetchSanityData<AboutType>(aboutQuery);

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading about content...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fa]">
      <AboutHero
        badge={aboutData.heroBadge}
        title={aboutData.heroTitle}
        description={aboutData.heroDescription}
      >
        <AboutHighlights
          highlights={aboutData.highlights}
          industrialFocus={aboutData.industrialFocus}
        />
      </AboutHero>

      <AboutJourney
        title={aboutData.journeyTitle}
        subtitle={aboutData.journeySubtitle}
        timeline={aboutData.timeline}
      />

      <AboutSection />
    </main>
  );
}
