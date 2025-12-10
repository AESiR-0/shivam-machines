"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star, Shield, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  const stats = [
    { label: "Years of Excellence", value: "25+", icon: Star },
    { label: "Machines Supplied", value: "1000+", icon: Shield },
    { label: "Happy Clients", value: "500+", icon: Zap },
  ];

  const features = [
    "Premium Quality Machines",
    "Expert Technical Support", 
    "Competitive Pricing",
    "Nationwide Delivery"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-lightGray via-white to-brand-steel/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center px-4 py-2 bg-white/10 text-brand-darkBlue rounded-full text-sm font-medium mb-4 border border-brand-darkBlue/20">
                <span className="w-2 h-2 bg-brand-orange rounded-full mr-2"></span>
                Trusted Since 1997
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-darkBlue leading-tight font-montserrat">
                Industrial
                <span className="block text-brand-orange">Machine Tools</span>
                <span className="block text-brand-steel">Excellence</span>
              </h1>
              
              <p className="text-xl text-brand-gray max-w-2xl leading-relaxed font-nunito">
                India's premier supplier of premium used machine tools. 
                Specializing in cylindrical grinding, boring machines, 
                and precision manufacturing equipment for industrial excellence.
              </p>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0" />
                    <span className="text-brand-gray font-nunito">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                variant="primary"
                size="xl"
                className="group flex items-center gap-2 font-candara shadow-lg"
              >
                Explore Machines
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="secondary"
                size="xl"
                className="group font-candara"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-brand-orange" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-brand-darkBlue font-montserrat">
                    {stat.value}
                  </div>
                  <div className="text-sm text-brand-gray font-nunito">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image with Demo Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-brand-darkBlue flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold font-montserrat">SE</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 font-montserrat">Cylindrical Grinding Machine</h3>
                    <p className="text-gray-300 mb-4">High Precision • CNC Control</p>
                    <div className="flex justify-center space-x-4 text-sm">
                      <span className="bg-white/20 px-3 py-1 rounded-full">Max Length: 1000mm</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full">Max Swing: 400mm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-brand-darkBlue font-inter">In Stock</span>
                </div>
                <div className="text-xs text-brand-gray mt-1">Ready for Delivery</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-orange font-montserrat">25+</div>
                  <div className="text-xs text-brand-gray font-nunito">Years Experience</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute top-1/2 -right-8 bg-brand-orange text-white rounded-lg shadow-lg p-3 transform -translate-y-1/2"
              >
                <div className="text-center">
                  <div className="text-lg font-bold font-montserrat">500+</div>
                  <div className="text-xs">Happy Clients</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-brand-steel rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-brand-steel rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

