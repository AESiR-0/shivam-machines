import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Products from "@/components/sections/products";
import Industries from "@/components/sections/industries";
import Contact from "@/components/sections/contact";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Industries />
      <Contact />
      <Footer />
    </main>
  );
}
