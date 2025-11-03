"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Star, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Horizontal Boring Machine",
      subtitle: "Table Type",
      description: "High-precision horizontal boring machines for large-scale manufacturing operations with exceptional accuracy and reliability.",
      specs: "X-2200, Y-2000 | Table: 1500 x 1800 | Spindle: 125",
      image: "/api/placeholder/1200/800",
    },
    {
      title: "Cylindrical Grinding Machine",
      subtitle: "Premium Quality",
      description: "Advanced cylindrical grinding machines for external and internal grinding operations with superior precision and surface finish.",
      specs: "Max Length: 1000mm | Max Swing: 400mm | CNC Control",
      image: "/api/placeholder/1200/800",
    },
    {
      title: "Vertical Lathe Machine",
      subtitle: "Heavy Duty",
      description: "Heavy-duty vertical lathe machines for complex turning operations with exceptional accuracy and surface finish capabilities.",
      specs: "Max Turning: 1500mm | Max Swing: 500mm | Precision",
      image: "/api/placeholder/1200/800",
    },
    {
      title: "CNC Machining Centers",
      subtitle: "Automation Ready",
      description: "Advanced CNC machining centers for complex manufacturing operations with automation and precision control systems.",
      specs: "Work Envelope: 1000x800x600mm | Spindle: 8000 RPM",
      image: "/api/placeholder/1200/800",
    },
  ];

  const stats = [
    { label: "Years of Excellence", value: "25+", icon: Star },
    { label: "Machines Supplied", value: "1000+", icon: Shield },
    { label: "Happy Clients", value: "500+", icon: Zap },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-lightGray via-white to-brand-steel/5 overflow-hidden">
      {/* Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-steel to-brand-darkBlue"
              >
                <div className="absolute inset-0 bg-black/30"></div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 text-white"
            >
              <div className="inline-flex items-center px-4 py-2 bg-brand-orange/20 text-white rounded-full text-sm font-medium mb-4 border border-brand-orange/30">
                <span className="w-2 h-2 bg-brand-orange rounded-full mr-2"></span>
                Trusted Since 1997
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight font-montserrat">
                {slides[currentSlide].title}
                <span className="block text-brand-orange">{slides[currentSlide].subtitle}</span>
              </h1>
              
              <p className="text-xl text-gray-200 max-w-2xl leading-relaxed font-nunito">
                {slides[currentSlide].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-to-r from-brand-orange to-brand-accent hover:from-brand-orange/90 hover:to-brand-accent/90 text-white px-8 py-4 text-lg font-medium rounded-lg group font-inter shadow-lg">
                  Explore Machines
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button className="border-2 border-white text-white hover:bg-white hover:text-brand-darkBlue px-8 py-4 text-lg font-medium rounded-lg group font-inter">
                  Get Quote
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-brand-orange/20 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-brand-orange" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white font-montserrat">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-300 font-nunito">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Image/Carousel Indicators */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                {slides.map((slide, index) => (
                  index === currentSlide && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-gradient-to-br from-brand-darkBlue to-brand-steel flex items-center justify-center"
                    >
                      <div className="text-center text-white p-8">
                        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <span className="text-3xl font-bold font-montserrat">SE</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 font-montserrat">{slide.title}</h3>
                        <p className="text-gray-300 mb-4">{slide.subtitle}</p>
                        <div className="flex justify-center space-x-4 text-sm">
                          <span className="bg-white/20 px-3 py-1 rounded-full">{slide.specs.split(' | ')[0]}</span>
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? "bg-brand-orange w-8" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
