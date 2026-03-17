import HeroSection from "@/components/sections/hero-section";
import RecentlyAddedSection from "@/components/sections/recently-added-section";
import MachineToolsSection from "@/components/sections/machine-tools-section";
import CTAsSection from "@/components/sections/ctas-section";

export default async function Home() {
  return (
    <main className="min-h-screen">
      <MachineToolsSection />
      <CTAsSection />
    </main>
  );
}

