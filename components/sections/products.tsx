"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Settings, Wrench, Cog, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Products = () => {
  const products = [
    {
      title: "Horizontal Boring Machines",
      description: "Precision boring solutions for large-scale manufacturing operations with exceptional accuracy.",
      icon: Settings,
      features: ["High Precision", "Heavy Duty", "CNC Ready"],
      image: "/api/placeholder/400/300",
    },
    {
      title: "Vertical Lathe Machines",
      description: "Advanced vertical turning centers for complex machining operations and large workpieces.",
      icon: Wrench,
      features: ["Large Capacity", "High Speed", "Precision Control"],
      image: "/api/placeholder/400/300",
    },
    {
      title: "Gear Machines",
      description: "Specialized gear cutting and finishing machines for automotive and industrial applications.",
      icon: Cog,
      features: ["Gear Cutting", "High Accuracy", "Versatile"],
      image: "/api/placeholder/400/300",
    },
    {
      title: "CNC Machines",
      description: "Computer-controlled machining centers for automated precision manufacturing processes.",
      icon: Gauge,
      features: ["CNC Control", "Automation", "High Productivity"],
      image: "/api/placeholder/400/300",
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-steel-900 mb-4">
            Our <span className="text-accent-600">Product Range</span>
          </h2>
          <p className="text-lg text-steel-600 max-w-3xl mx-auto">
            From precision boring machines to advanced CNC centers, we offer 
            a comprehensive range of industrial machinery to meet your manufacturing needs.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group hover:shadow-industrial-xl transition-all duration-300 border-0 shadow-industrial-lg">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <product.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-steel-900 group-hover:text-accent-600 transition-colors">
                    {product.title}
                  </CardTitle>
                  <CardDescription className="text-steel-600">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-3 py-1 bg-steel-100 text-steel-700 text-sm rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-accent-600 group-hover:text-white group-hover:border-accent-600 transition-all duration-300"
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
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
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-steel-800 to-steel-900 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Need a Specific Machine?
            </h3>
            <p className="text-steel-300 mb-6 max-w-2xl mx-auto">
              Our extensive inventory includes machines from leading manufacturers. 
              Contact us to find the perfect solution for your manufacturing needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="glass" size="lg">
                Browse All Machines
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-steel-900">
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

