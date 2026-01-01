"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Settings, Wrench, Cog, Gauge } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Products = () => {
  const products = [
    {
      title: "Cylindrical Grinding Machines",
      description: "High-precision cylindrical grinding machines for external and internal grinding operations with exceptional surface finish.",
      icon: Settings,
      features: ["Precision Grinding", "CNC Control", "Heavy Duty"],
      category: "Grinding Machines",
      specifications: "Max Grinding Length: 1000mm, Max Swing: 400mm"
    },
    {
      title: "Horizontal Boring Machines",
      description: "Heavy-duty horizontal boring machines for large-scale manufacturing operations with exceptional accuracy and reliability.",
      icon: Wrench,
      features: ["Large Capacity", "High Precision", "Heavy Duty"],
      category: "Boring Machines",
      specifications: "Max Boring Diameter: 200mm, Table Size: 2000x1500mm"
    },
    {
      title: "Automatic Production Bore Grinding",
      description: "Fully automated bore grinding machines for high-volume production with consistent quality and efficiency.",
      icon: Cog,
      features: ["Automated", "High Volume", "Consistent Quality"],
      category: "Production Machines",
      specifications: "Production Rate: 200 pieces/hour, Accuracy: ±0.005mm"
    },
    {
      title: "Precision Lathe Machines",
      description: "Advanced precision lathe machines for complex turning operations with superior accuracy and surface finish.",
      icon: Gauge,
      features: ["High Precision", "CNC Control", "Versatile"],
      category: "Lathe Machines",
      specifications: "Max Turning Length: 1500mm, Max Swing: 500mm"
    },
    {
      title: "Gear Grinding Machines",
      description: "Specialized gear grinding machines for precision gear manufacturing with exceptional accuracy and surface quality.",
      icon: Settings,
      features: ["Gear Grinding", "High Accuracy", "Precision"],
      category: "Gear Machines",
      specifications: "Max Gear Diameter: 800mm, Module Range: 1-20"
    },
    {
      title: "CNC Machining Centers",
      description: "Advanced CNC machining centers for complex manufacturing operations with automation and precision control.",
      icon: Gauge,
      features: ["CNC Control", "Automation", "High Productivity"],
      category: "CNC Machines",
      specifications: "Work Envelope: 1000x800x600mm, Spindle Speed: 8000 RPM"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-br from-brand-lightGray to-brand-steel/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-brand-darkBlue mb-6 font-montserrat">
            Our <span className="text-brand-orange">Machine Tools</span>
          </h2>
          <p className="text-xl text-brand-gray max-w-4xl mx-auto font-nunito leading-relaxed">
            Premium used machine tools for precision manufacturing.
            From cylindrical grinding to CNC machining centers, we provide
            reliable solutions for your industrial needs.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-brand-orange/20">
                <CardHeader className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                      <product.icon className="w-6 h-6 text-brand-orange" />
                    </div>
                    <span className="text-sm text-brand-gray font-nunito bg-brand-lightGray px-3 py-1 rounded-full">
                      {product.category}
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
                  </div>
                </CardHeader>

                <CardContent className="p-8 pt-0">
                  <Button
                    variant="primary"
                    className="w-full flex items-center gap-2 font-nunito"
                    asChild
                  >
                    <Link href={`/products/${product.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`} className="flex gap-2">
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div> 
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-20"
        >
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
            <h3 className="text-3xl font-bold text-brand-darkBlue mb-6 font-montserrat">
              Looking for Something Specific?
            </h3>
            <p className="text-brand-gray mb-8 max-w-2xl mx-auto text-lg font-nunito">
              Our extensive inventory includes machines from leading manufacturers.
              Contact us to find the perfect solution for your manufacturing needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-brand-orange hover:bg-accent-600 text-white px-8 py-4 rounded-lg font-medium text-lg flex items-center gap-2" size="lg">
                Browse All Machines
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button className="border-2 border-brand-gray text-brand-gray hover:bg-brand-gray hover:text-white px-8 py-4 rounded-lg font-medium text-lg" size="lg">
                Request Quote
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;

