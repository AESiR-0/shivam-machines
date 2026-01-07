import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import AboutSection from "@/components/sections/about-section";

export default function About() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-lightGray via-white to-brand-lightGray py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-brand-darkBlue mb-6 font-montserrat">
              About <span className="text-brand-orange">Shivam Enterprise</span>
            </h1>
            <p className="text-xl text-brand-gray max-w-4xl mx-auto font-nunito leading-relaxed">
              For over 25 years, we have been India's trusted supplier of premium used machine tools, 
              delivering precision, reliability, and innovation to industries across the nation.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-brand-darkBlue mb-6 font-montserrat">
                Our Story
              </h2>
              <div className="space-y-6 text-brand-gray font-nunito leading-relaxed">
                <p>
                  Established in 1997, Shivam Enterprise is a leading supplier of used machine tools in India. 
                  Our machines are imported from Europe and UK and our goal is to provide used machine tools 
                  at a fair and reasonable price.
                </p>
                <p>
                  We have a great collection of used machinery including Horizontal Borers, Vertical Lathes, 
                  Centre lathes, Gear Machinery, Grinders, Milling machine, Planomillers, Radial Drills, 
                  Roll Grinders etc.
                </p>
                <p>
                  Should you require our assistance in importing the right machine we will be pleased to help you. 
                  You are welcome to view the vast selection of machinery and industrial machine tools at our website. 
                  If the machine required by you is not listed in our website, please feel free to contact us as 
                  we can import the machine required by you.
                </p>
              </div>
            </div>
            <div className="bg-brand-darkBlue rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="w-24 h-24 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-white font-montserrat">SE</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-montserrat">
                  Founded in 1997
                </h3>
                <p className="text-brand-lightGray font-nunito">
                  Leading supplier of used machine tools imported from Europe and UK
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-12 bg-brand-lightGray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-darkBlue mb-6 font-montserrat">
              Our Mission & Values
            </h2>
            <p className="text-xl text-brand-gray max-w-3xl mx-auto font-nunito">
              We are driven by our commitment to excellence and customer satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-brand-darkBlue mb-4 font-inter">
                Our Mission
              </h3>
              <p className="text-brand-gray font-nunito leading-relaxed">
                To provide high-quality used machine tools that enable our clients to achieve 
                their manufacturing goals while maintaining the highest standards of service and reliability.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-brand-darkBlue mb-4 font-inter">
                Quality First
              </h3>
              <p className="text-brand-gray font-nunito leading-relaxed">
                Every machine undergoes rigorous inspection and testing to ensure it meets 
                our high standards before being offered to our clients.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-brand-darkBlue mb-4 font-inter">
                Customer Focus
              </h3>
              <p className="text-brand-gray font-nunito leading-relaxed">
                We build lasting relationships with our clients by understanding their needs 
                and providing personalized solutions that exceed their expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section from Homepage */}
      <AboutSection />

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
