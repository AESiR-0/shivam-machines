import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, Wrench, Cog, Gauge, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Products - Machine Tools | Shivam Enterprise",
  description: "Explore our comprehensive range of used machine tools including cylindrical grinding machines, boring machines, lathe machines, and CNC machining centers.",
};

export default function Products() {
  const productCategories = [
    {
      title: "Cylindrical Grinding Machines",
      description: "High-precision cylindrical grinding machines for external and internal grinding operations with exceptional surface finish.",
      icon: Settings,
      features: ["Precision Grinding", "CNC Control", "Heavy Duty"],
      specifications: "Max Grinding Length: 1000mm, Max Swing: 400mm",
      machines: ["Universal Cylindrical Grinder", "Internal Grinder", "Centerless Grinder"]
    },
    {
      title: "Horizontal Boring Machines",
      description: "Heavy-duty horizontal boring machines for large-scale manufacturing operations with exceptional accuracy and reliability.",
      icon: Wrench,
      features: ["Large Capacity", "High Precision", "Heavy Duty"],
      specifications: "Max Boring Diameter: 200mm, Table Size: 2000x1500mm",
      machines: ["Floor Type Boring", "Table Type Boring", "Planer Type Boring"]
    },
    {
      title: "Automatic Production Bore Grinding",
      description: "Fully automated bore grinding machines for high-volume production with consistent quality and efficiency.",
      icon: Cog,
      features: ["Automated", "High Volume", "Consistent Quality"],
      specifications: "Production Rate: 200 pieces/hour, Accuracy: ±0.005mm",
      machines: ["CNC Bore Grinder", "Automatic Bore Grinder", "Production Grinder"]
    },
    {
      title: "Precision Lathe Machines",
      description: "Advanced precision lathe machines for complex turning operations with superior accuracy and surface finish.",
      icon: Gauge,
      features: ["High Precision", "CNC Control", "Versatile"],
      specifications: "Max Turning Length: 1500mm, Max Swing: 500mm",
      machines: ["CNC Lathe", "Engine Lathe", "Toolroom Lathe"]
    },
    {
      title: "Gear Grinding Machines",
      description: "Specialized gear grinding machines for precision gear manufacturing with exceptional accuracy and surface quality.",
      icon: Settings,
      features: ["Gear Grinding", "High Accuracy", "Precision"],
      specifications: "Max Gear Diameter: 800mm, Module Range: 1-20",
      machines: ["Gear Hobber", "Gear Shaper", "Gear Grinder"]
    },
    {
      title: "CNC Machining Centers",
      description: "Advanced CNC machining centers for complex manufacturing operations with automation and precision control.",
      icon: Gauge,
      features: ["CNC Control", "Automation", "High Productivity"],
      specifications: "Work Envelope: 1000x800x600mm, Spindle Speed: 8000 RPM",
      machines: ["Vertical Machining Center", "Horizontal Machining Center", "5-Axis Machining Center"]
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
              Our <span className="text-brand-orange">Machine Tools</span>
            </h1>
            <p className="text-xl text-brand-gray max-w-4xl mx-auto font-nunito leading-relaxed">
              Premium used machine tools for precision manufacturing. From cylindrical grinding 
              to CNC machining centers, we provide reliable solutions for your industrial needs.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-gradient-to-br from-white to-brand-lightGray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((product, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-brand-orange/20">
                <CardHeader className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                      <product.icon className="w-6 h-6 text-brand-orange" />
                    </div>
                    <span className="text-sm text-brand-gray font-nunito bg-brand-lightGray px-3 py-1 rounded-full">
                      {product.title.split(' ')[0]}
                    </span>
                  </div>
                  
                  <CardTitle className="text-xl font-semibold text-brand-darkBlue mb-3 font-inter">
                    {product.title}
                  </CardTitle>
                  
                  <CardDescription className="text-brand-gray font-nunito leading-relaxed mb-4">
                    {product.description}
                  </CardDescription>

                  <div className="space-y-3">
                    <div className="text-sm text-brand-gray font-nunito">
                      <strong>Specifications:</strong> {product.specifications}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-sm rounded-full font-nunito"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="text-sm text-brand-gray font-nunito">
                      <strong>Available Machines:</strong>
                      <ul className="mt-2 space-y-1">
                        {product.machines.map((machine, machineIndex) => (
                          <li key={machineIndex} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-brand-orange rounded-full mr-2"></span>
                            {machine}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-8 pt-0">
                  <Button 
                    className="w-full bg-brand-orange hover:bg-red-700 text-white font-nunito py-3 rounded-lg transition-all duration-300"
                  >
                    View Details
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-24 bg-brand-lightGray">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-brand-darkBlue mb-6 font-montserrat">
            Looking for Something Specific?
          </h2>
          <p className="text-xl text-brand-gray mb-8 font-nunito">
            Can't find what you're looking for? Contact us with your requirements and we'll help you find the perfect machine.
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-gray w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for specific machine types, brands, or specifications..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
              <Button className="bg-brand-orange hover:bg-red-700 text-white px-8 py-4 rounded-lg font-inter">
                Search Machines
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-brand-darkBlue mb-6 font-montserrat">
            Ready to Find Your Machine?
          </h2>
          <p className="text-xl text-brand-gray mb-8 font-nunito">
            Our extensive inventory includes machines from leading manufacturers. 
            Contact us to find the perfect solution for your manufacturing needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-brand-orange hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium text-lg">
              Browse All Machines
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button className="border-2 border-brand-steel text-brand-steel hover:bg-brand-steel hover:text-white px-8 py-4 rounded-lg font-medium text-lg">
              Request Quote
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
