"use client";

import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight, Star, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    duration: 25,
    dragFree: false,
    containScroll: "trimSnaps"
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const slides = [
    {
      title: "Horizontal Boring Machine",
      subtitle: "Table Type",
      description: "High-precision horizontal boring machines for large-scale manufacturing operations with exceptional accuracy and reliability.",
      specs: "X-2200, Y-2000 | Table: 1500 x 1800 | Spindle: 125",
      image: "/api/placeholder/1200/800",
      badge: "Premium Quality",
    },
    {
      title: "Cylindrical Grinding Machine",
      subtitle: "Premium Quality",
      description: "Advanced cylindrical grinding machines for external and internal grinding operations with superior precision and surface finish.",
      specs: "Max Length: 1000mm | Max Swing: 400mm | CNC Control",
      image: "/api/placeholder/1200/800",
      badge: "New Arrival",
    },
    {
      title: "Vertical Lathe Machine",
      subtitle: "Heavy Duty",
      description: "Heavy-duty vertical lathe machines for complex turning operations with exceptional accuracy and surface finish capabilities.",
      specs: "Max Turning: 1500mm | Max Swing: 500mm | Precision",
      image: "/api/placeholder/1200/800",
      badge: "Best Seller",
    },
    {
      title: "CNC Machining Centers",
      subtitle: "Automation Ready",
      description: "Advanced CNC machining centers for complex manufacturing operations with automation and precision control systems.",
      specs: "Work Envelope: 1000x800x600mm | Spindle: 8000 RPM",
      image: "/api/placeholder/1200/800",
      badge: "Featured",
    },
  ];

  const stats = [
    { label: "Years of Excellence", value: "25+", icon: Star },
    { label: "Machines Supplied", value: "1000+", icon: Shield },
    { label: "Happy Clients", value: "500+", icon: Zap },
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="relative" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="min-w-0 flex-shrink-0 w-full">
              <div className="relative min-h-[600px] lg:min-h-[700px] flex items-center bg-gradient-to-br from-white via-brand-lightGray to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Content */}
                    <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
                      <div className="inline-flex items-center px-4 py-2 bg-brand-darkBlue/10 text-brand-darkBlue rounded-full text-sm font-medium border border-brand-darkBlue/20">
                        <span className="w-2 h-2 bg-brand-darkBlue rounded-full mr-2 animate-pulse"></span>
                        {slide.badge}
                      </div>
                      
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight font-candara text-brand-darkBlue">
                        {slide.title}
                        <span className="block text-brand-darkBlue mt-2">{slide.subtitle}</span>
                      </h1>
                      
                      <p className="text-lg lg:text-xl text-brand-gray max-w-2xl leading-relaxed font-calibri">
                        {slide.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button variant="primary" size="xl" className="group flex items-center gap-2 font-candara shadow-lg">
                          Explore Machines
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="secondary" size="xl" className="font-candara">
                          Get Quote
                        </Button>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-6 lg:gap-8 pt-8 border-t border-gray-200">
                        {stats.map((stat, statIndex) => (
                          <div key={statIndex} className="text-center">
                            <div className="flex justify-center mb-3">
                              <div className="w-12 h-12 bg-brand-darkBlue/10 rounded-lg flex items-center justify-center">
                                <stat.icon className="w-6 h-6 text-brand-darkBlue" />
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-brand-darkBlue font-candara">
                              {stat.value}
                            </div>
                            <div className="text-sm text-brand-gray font-calibri">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Image */}
                    <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-brand-darkBlue order-1 lg:order-2">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-darkBlue to-brand-darkBlue/90">
                        <div className="text-center text-white p-8">
                          <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                            <span className="text-4xl font-bold font-candara">SE</span>
                          </div>
                          <h3 className="text-3xl font-bold mb-3 font-candara">{slide.title}</h3>
                          <p className="text-white/90 mb-4 font-calibri text-lg">{slide.subtitle}</p>
                          <div className="flex justify-center space-x-2 text-sm">
                            {slide.specs.split(' | ').slice(0, 2).map((spec, specIndex) => (
                              <span key={specIndex} className="bg-white/20 px-3 py-1 rounded-full font-calibri backdrop-blur-sm">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-2 border-brand-darkBlue hover:border-brand-darkBlue text-brand-darkBlue rounded-full p-3 shadow-xl transition-all backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-2 border-brand-darkBlue hover:border-brand-darkBlue text-brand-darkBlue rounded-full p-3 shadow-xl transition-all backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === selectedIndex 
                  ? "bg-brand-darkBlue w-10 shadow-lg" 
                  : "bg-gray-300 w-2.5 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
