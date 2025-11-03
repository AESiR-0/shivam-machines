import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero-carousel";
import RecentlyAdded from "@/components/sections/recently-added";
import MachineTools from "@/components/sections/machine-tools";
import About from "@/components/sections/about";
import CTAs from "@/components/sections/ctas";
import Footer from "@/components/layout/footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <RecentlyAdded />
      <MachineTools />
      <About />
      <CTAs />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
