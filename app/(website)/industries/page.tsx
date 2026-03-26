import { Card, CardContent } from "@/components/ui/card";
import { Car, Building2, Wrench, Plane, Ship, Zap, LucideIcon } from "lucide-react";
import { fetchSanityData } from "@/lib/sanity/fetch";
import { industriesQuery } from "@/lib/sanity/queries";
import type { Industry } from "@/lib/sanity/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Car,
  Building2,
  Wrench,
  Plane,
  Ship,
  Zap,
};

export default async function Industries() {
  const industries = await fetchSanityData<Industry[]>(industriesQuery);

  return (
    <main className="min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-lightGray via-white to-brand-steel/5 py-12">
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
      <section className="py-12 bg-gradient-to-br from-white to-brand-lightGray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries?.map((industry, index) => {
              const IconComponent = ICON_MAP[industry.name] || Wrench;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-brand-orange/20 hover:-translate-y-1">
                  <CardContent className="p-8">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-darkBlue to-brand-steel rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-brand-darkBlue mb-3 group-hover:text-brand-orange transition-colors font-inter text-center">
                      {industry.name}
                    </h3>
                    <p className="text-brand-gray mb-4 leading-relaxed font-nunito text-center">
                      {industry.description}
                    </p>

                    {/* Applications */}
                    {industry.applications && industry.applications.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-brand-darkBlue mb-2 font-inter text-center">Key Applications:</h4>
                        <div className="flex flex-wrap gap-2 justify-center">
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
                    )}

                    {/* Stats */}
                    {industry.stats && (
                      <div className="flex items-center justify-center space-x-2 text-sm text-brand-orange font-nunito">
                        <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                        <span className="font-medium">{industry.stats}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-12 bg-brand-lightGray">
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
      <section className="py-12 bg-white">
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
    </main>
  );
}
