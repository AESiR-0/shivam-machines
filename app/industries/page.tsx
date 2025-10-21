import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Building2, Wrench, Plane, Ship, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries We Serve - Shivam Enterprise",
  description: "We provide precision machinery solutions across diverse industries including automotive, aerospace, manufacturing, construction, marine, and energy sectors.",
};

export default function Industries() {
  const industries = [
    {
      name: "Automotive",
      description: "Precision machining for automotive components and assembly lines. Our machines support the production of engine parts, transmission components, and chassis elements.",
      icon: Car,
      color: "from-blue-500 to-blue-600",
      stats: "200+ Machines",
      applications: ["Engine Components", "Transmission Parts", "Chassis Elements", "Brake Systems"]
    },
    {
      name: "Construction",
      description: "Heavy-duty equipment for construction and infrastructure projects. We supply machinery for structural components and construction equipment manufacturing.",
      icon: Building2,
      color: "from-orange-500 to-orange-600",
      stats: "150+ Machines",
      applications: ["Structural Components", "Heavy Equipment", "Infrastructure Parts", "Construction Tools"]
    },
    {
      name: "Manufacturing",
      description: "Industrial machinery for large-scale manufacturing operations. Our machines support various manufacturing processes across different sectors.",
      icon: Wrench,
      color: "from-green-500 to-green-600",
      stats: "300+ Machines",
      applications: ["Production Lines", "Assembly Operations", "Quality Control", "Process Manufacturing"]
    },
    {
      name: "Aerospace",
      description: "High-precision equipment for aerospace and defense applications. Our machines meet the stringent requirements of aerospace manufacturing.",
      icon: Plane,
      color: "from-purple-500 to-purple-600",
      stats: "100+ Machines",
      applications: ["Aircraft Components", "Engine Parts", "Defense Equipment", "Precision Parts"]
    },
    {
      name: "Marine",
      description: "Specialized machinery for shipbuilding and marine engineering. We provide equipment for marine component manufacturing and ship construction.",
      icon: Ship,
      color: "from-cyan-500 to-cyan-600",
      stats: "80+ Machines",
      applications: ["Ship Components", "Marine Engines", "Propeller Systems", "Marine Equipment"]
    },
    {
      name: "Energy",
      description: "Equipment for power generation and renewable energy sectors. Our machines support the manufacturing of energy infrastructure components.",
      icon: Zap,
      color: "from-yellow-500 to-yellow-600",
      stats: "120+ Machines",
      applications: ["Power Generation", "Wind Energy", "Solar Equipment", "Energy Infrastructure"]
    },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-lightGray via-white to-brand-steel/5 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-brand-darkBlue mb-6 font-montserrat">
              Industries We <span className="text-brand-orange">Serve</span>
            </h1>
            <p className="text-xl text-brand-gray max-w-4xl mx-auto font-nunito leading-relaxed">
              From automotive to aerospace, we provide precision machinery solutions 
              across diverse industries with unmatched expertise and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24 bg-gradient-to-br from-white to-brand-lightGray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-brand-orange/20 hover:-translate-y-1">
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${industry.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <industry.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-brand-darkBlue mb-3 group-hover:text-brand-orange transition-colors font-inter">
                    {industry.name}
                  </h3>
                  <p className="text-brand-gray mb-4 leading-relaxed font-nunito">
                    {industry.description}
                  </p>

                  {/* Applications */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-brand-darkBlue mb-2 font-inter">Key Applications:</h4>
                    <div className="flex flex-wrap gap-2">
                      {industry.applications.map((app, appIndex) => (
                        <span
                          key={appIndex}
                          className="px-2 py-1 bg-brand-lightGray text-brand-gray text-xs rounded-full font-nunito"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-center space-x-2 text-sm text-brand-orange font-nunito">
                    <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                    <span className="font-medium">{industry.stats}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-24 bg-brand-lightGray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-darkBlue mb-6 font-montserrat">
              Industry-Specific Solutions
            </h2>
            <p className="text-xl text-brand-gray max-w-3xl mx-auto font-nunito">
              We understand the unique requirements of each industry and provide tailored solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-brand-darkBlue mb-4 font-montserrat">
                  Custom Solutions
                </h3>
                <p className="text-brand-gray font-nunito leading-relaxed mb-6">
                  Every industry has unique requirements. We work closely with our clients to understand 
                  their specific needs and provide customized machine tool solutions that meet their 
                  exact specifications and production goals.
                </p>
                <ul className="space-y-2 text-brand-gray font-nunito">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-brand-orange rounded-full mr-3"></span>
                    Industry-specific machine selection
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-brand-orange rounded-full mr-3"></span>
                    Custom modifications and upgrades
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-brand-orange rounded-full mr-3"></span>
                    Specialized training and support
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-brand-darkBlue mb-4 font-montserrat">
                  Technical Expertise
                </h3>
                <p className="text-brand-gray font-nunito leading-relaxed mb-6">
                  Our team of experienced technicians and engineers has deep knowledge across 
                  various industries. We provide technical consultation, installation support, 
                  and ongoing maintenance to ensure optimal performance.
                </p>
                <ul className="space-y-2 text-brand-gray font-nunito">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-brand-orange rounded-full mr-3"></span>
                    Industry-specific technical support
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-brand-orange rounded-full mr-3"></span>
                    Installation and commissioning
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-brand-orange rounded-full mr-3"></span>
                    Preventive maintenance programs
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-brand-darkBlue mb-6 font-montserrat">
            Don't See Your Industry?
          </h2>
          <p className="text-xl text-brand-gray mb-8 font-nunito">
            We work with clients across various sectors. Contact us to discuss how our 
            machinery solutions can meet your specific industry requirements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-brand-orange hover:bg-red-700 text-white rounded-lg font-medium text-lg transition-colors">
              Discuss Your Needs
            </button>
            <button className="px-8 py-4 border-2 border-brand-steel text-brand-steel hover:bg-brand-steel hover:text-white rounded-lg font-medium text-lg transition-colors">
              View Case Studies
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
