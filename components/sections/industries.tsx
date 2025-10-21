"use client";

import React from "react";
import { motion } from "framer-motion";
import { Car, Building2, Wrench, Plane, Ship, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Industries = () => {
  const industries = [
    {
      name: "Automotive",
      description: "Precision machining for automotive components and assembly lines.",
      icon: Car,
      color: "from-blue-500 to-blue-600",
      stats: "200+ Machines",
    },
    {
      name: "Construction",
      description: "Heavy-duty equipment for construction and infrastructure projects.",
      icon: Building2,
      color: "from-orange-500 to-orange-600",
      stats: "150+ Machines",
    },
    {
      name: "Manufacturing",
      description: "Industrial machinery for large-scale manufacturing operations.",
      icon: Wrench,
      color: "from-green-500 to-green-600",
      stats: "300+ Machines",
    },
    {
      name: "Aerospace",
      description: "High-precision equipment for aerospace and defense applications.",
      icon: Plane,
      color: "from-purple-500 to-purple-600",
      stats: "100+ Machines",
    },
    {
      name: "Marine",
      description: "Specialized machinery for shipbuilding and marine engineering.",
      icon: Ship,
      color: "from-cyan-500 to-cyan-600",
      stats: "80+ Machines",
    },
    {
      name: "Energy",
      description: "Equipment for power generation and renewable energy sectors.",
      icon: Zap,
      color: "from-yellow-500 to-yellow-600",
      stats: "120+ Machines",
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
        <section className="py-24 bg-gradient-to-br from-white to-brand-lightGray">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-brand-darkBlue mb-6 font-dream-avenue">
            Industries We <span className="text-brand-orange">Serve</span>
          </h2>
          <p className="text-xl text-brand-gray max-w-4xl mx-auto font-nunito leading-relaxed">
            From automotive to aerospace, we provide precision machinery solutions 
            across diverse industries with unmatched expertise and reliability.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {industries.map((industry, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-brand-orange/20 hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${industry.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <industry.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-brand-darkBlue mb-3 group-hover:text-brand-orange transition-colors font-itc-bauhaus">
                    {industry.name}
                  </h3>
                  <p className="text-brand-gray mb-4 leading-relaxed font-nunito">
                    {industry.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-center space-x-2 text-sm text-brand-orange font-nunito">
                    <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                    <span className="font-medium">{industry.stats}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-industrial-lg border border-primary-200">
            <h3 className="text-2xl lg:text-3xl font-bold text-steel-900 mb-4">
              Don't See Your Industry?
            </h3>
            <p className="text-steel-600 mb-6 max-w-2xl mx-auto">
              We work with clients across various sectors. Contact us to discuss 
              how our machinery solutions can meet your specific industry requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-accent-600 text-white rounded-lg font-medium hover:bg-accent-700 transition-colors"
              >
                Discuss Your Needs
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-steel-300 text-steel-700 rounded-lg font-medium hover:bg-steel-50 transition-colors"
              >
                View Case Studies
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Industries;

