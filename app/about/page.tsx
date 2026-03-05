import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import AboutSection from "@/components/sections/about-section";
export default function About() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero + Story Section - Combined to reduce scroll */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-brand-lightGray via-white to-brand-lightGray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Title + Story */}
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold text-brand-darkBlue mb-4 font-montserrat">
                About{" "}
                <span className="text-brand-orange">Shivam Enterprise</span>
              </h1>
              <div className="space-y-4 text-brand-gray font-nunito leading-relaxed">
                <p>
                  Established in 1997, Shivam Enterprise is a leading supplier of used machine tools in India.
                  Our machines are imported from Europe and UK and our goal is to provide used machine tools
                  at a fair and reasonable price.
                </p>
                <p>
                  We have a great collection of used machinery including Horizontal Borers, Vertical Lathes,
                  Centre lathes, Gear Machinery, Grinders, Milling machines, Planomillers, Radial Drills,
                  Roll Grinders and more.
                </p>
                <p>
                  If the machine required by you is not listed on our website, please feel free to contact us —
                  we can import the machine required by you.
                </p>
              </div>
            </div>

            {/* Right: Stats + Values */}
            <div className="space-y-6">
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "25+", label: "Years Experience" },
                  { value: "500+", label: "Happy Clients" },
                  { value: "100%", label: "Quality Assured" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-2xl p-5 shadow-lg text-center border border-gray-100"
                  >
                    <div className="text-3xl font-bold text-brand-darkBlue font-montserrat">
                      {stat.value}
                    </div>
                    <div className="text-xs text-brand-gray font-nunito mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Values */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { emoji: "🎯", title: "Our Mission", text: "Provide high-quality used machine tools that enable clients to achieve their manufacturing goals with the highest standards of service." },
                  { emoji: "⭐", title: "Quality First", text: "Every machine undergoes rigorous inspection and testing to ensure it meets our high standards before being offered." },
                  { emoji: "🤝", title: "Customer Focus", text: "We build lasting relationships by understanding client needs and providing personalized solutions." },
                ].map((v) => (
                  <div key={v.title} className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                    <div className="text-2xl mb-2">{v.emoji}</div>
                    <h3 className="text-sm font-bold text-brand-darkBlue mb-1 font-inter">{v.title}</h3>
                    <p className="text-xs text-brand-gray font-nunito leading-relaxed">{v.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section from Homepage (stats/features) */}
      <AboutSection />

      <Footer />
      <WhatsAppButton />
    </main>
  );
}

