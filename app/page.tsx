import Navbar from "@/components/layout/navbar";
import HeroSection from "@/components/sections/hero-section";
import RecentlyAddedSection from "@/components/sections/recently-added-section";
import MachineToolsSection from "@/components/sections/machine-tools-section";
import AboutSection from "@/components/sections/about-section";
import CTAsSection from "@/components/sections/ctas-section";
import FooterSection from "@/components/layout/footer-section";
import WhatsAppButton from "@/components/ui/whatsapp-button";

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <RecentlyAddedSection />
      <MachineToolsSection />
      <AboutSection />
      <CTAsSection />
      <FooterSection />
      <WhatsAppButton />
    </main>
  );
}
