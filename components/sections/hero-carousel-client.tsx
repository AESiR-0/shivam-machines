"use client";

import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight, Star, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { Hero, Product } from "@/lib/sanity/types";

interface HeroCarouselClientProps {
  data: Hero | null;
  products?: Product[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Star,
  Shield,
  Zap,
};

const HeroCarouselClient = ({ data, products = [] }: HeroCarouselClientProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    duration: 25,
    dragFree: false,
    containScroll: "trimSnaps"
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Create slides from products or use default
  const slides = products.length > 0 
    ? products.slice(0, 4).map((product) => ({
        title: product.title,
        subtitle: product.category || "Premium Quality",
        description: product.description,
        specs: product.specifications || "",
        badge: product.isInStock ? "In Stock" : "Available Soon",
        image: product.images && product.images.length > 0 ? product.images[0] : null,
      }))
    : [
        {
          title: "Horizontal Boring Machine",
          subtitle: "Table Type",
          description: "High-precision horizontal boring machines for large-scale manufacturing operations with exceptional accuracy and reliability.",
          specs: "X-2200, Y-2000 | Table: 1500 x 1800 | Spindle: 125",
          badge: "Premium Quality",
          image: null,
        },
        {
          title: "Cylindrical Grinding Machine",
          subtitle: "Premium Quality",
          description: "Advanced cylindrical grinding machines for external and internal grinding operations with superior precision and surface finish.",
          specs: "Max Length: 1000mm | Max Swing: 400mm | CNC Control",
          badge: "New Arrival",
          image: null,
        },
        {
          title: "Vertical Lathe Machine",
          subtitle: "Heavy Duty",
          description: "Heavy-duty vertical lathe machines for complex turning operations with exceptional accuracy and surface finish capabilities.",
          specs: "Max Turning: 1500mm | Max Swing: 500mm | Precision",
          badge: "Best Seller",
          image: null,
        },
        {
          title: "CNC Machining Centers",
          subtitle: "Automation Ready",
          description: "Advanced CNC machining centers for complex manufacturing operations with automation and precision control systems.",
          specs: "Work Envelope: 1000x800x600mm | Spindle: 8000 RPM",
          badge: "Featured",
          image: null,
        },
      ];

  // Use Sanity stats or defaults
  const stats = data?.stats || [
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
          {slides.map((slide, index) => {
            const imageUrl = slide.image ? urlFor(slide.image).width(1920).height(1080).url() : null;
            
            return (
              <div key={index} className="min-w-0 flex-shrink-0 w-full">
                <div className="relative h-[85vh] flex items-center overflow-hidden">
                  {/* Background Image */}
                  {imageUrl ? (
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={imageUrl}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        sizes="100vw"
                      />
                      {/* Dark overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-darkBlue via-brand-darkBlue/90 to-brand-darkBlue/80" />
                  )}
                  
                  {/* Content */}
                  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="flex items-center justify-between gap-8">
                      {/* Content */}
                      <div className="flex-1 space-y-6 max-w-3xl">
                        <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30">
                          <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                          {slide.badge}
                        </div>
                        
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight font-candara text-white">
                          {slide.title}
                          <span className="block text-white/90 mt-2 text-3xl sm:text-4xl lg:text-5xl">{slide.subtitle}</span>
                        </h1>
                        
                        <p className="text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed font-calibri">
                          {slide.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <Button 
                            variant="primary"
                            size="xl"
                            className="group font-candara shadow-lg flex items-center gap-2"
                            asChild
                          >
                            <a href={data?.primaryButtonLink || "/products"} className="flex gap-2">
                              <span>{data?.primaryButtonText || "Explore Machines"}</span>
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                          </Button>
                          <Button 
                            variant="secondary"
                            size="xl"
                            className="font-candara flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
                            asChild
                          >
                            <a href={data?.secondaryButtonLink || "/contact"}>
                              {data?.secondaryButtonText || "Get Quote"}
                            </a>
                          </Button>
                        </div>
                      </div>

                      {/* Compact Stats */}
                      <div className="hidden lg:flex items-center gap-6 border-l border-white/30 pl-6">
                        {stats.slice(0, 3).map((stat, statIndex) => {
                          const IconComponent: React.ComponentType<{ className?: string }> = 'icon' in stat && typeof stat.icon === 'string'
                            ? iconMap[stat.icon] || Star
                            : 'icon' in stat && stat.icon
                            ? (stat.icon as React.ComponentType<{ className?: string }>)
                            : Star;
                          return (
                            <div key={statIndex} className="text-center">
                              <div className="flex justify-center mb-2">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                                  <IconComponent className="w-6 h-6 text-white" />
                                </div>
                              </div>
                              <div className="text-2xl font-bold text-white font-candara">
                                {stat.value}
                              </div>
                              <div className="text-xs text-white/80 font-calibri">
                                {stat.label}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/40 hover:border-white/60 text-white rounded-full p-3 shadow-xl transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/40 hover:border-white/60 text-white rounded-full p-3 shadow-xl transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === selectedIndex 
                  ? "bg-white w-10 shadow-lg" 
                  : "bg-white/40 w-3 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarouselClient;

