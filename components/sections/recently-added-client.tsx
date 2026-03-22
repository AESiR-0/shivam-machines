"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, Wrench, Cog, Gauge, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { RecentlyAdded, Product } from "@/lib/sanity/types";

interface RecentlyAddedClientProps {
  data: RecentlyAdded | null;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Settings,
  Wrench,
  Cog,
  Gauge,
};

const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  grinding: Settings,
  boring: Wrench,
  lathe: Gauge,
  cnc: Cog,
  gear: Settings,
  milling: Wrench,
  drill: Wrench,
  others: Cog,
};

const RecentlyAddedClient = ({ data }: RecentlyAddedClientProps) => {
  // Handle both old format (data.machines) and new format (data.section + data.machines)
  const section = (data as any)?.section || data;
  const machines = ((data as any)?.machines || data?.machines || []).slice(0, 10);
  
  const title = section?.title || "Recently";
  const titleHighlight = section?.titleHighlight || "Added Machines";
  const description = section?.description || "Check out our latest additions to the inventory. Premium quality machines imported from Europe and UK.";

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
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

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
  };

  return (
    <section className="py-12 bg-gradient-to-br from-white to-brand-lightGray">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-brand-darkBlue mb-6 font-montserrat">
            {title} <span className="text-brand-orange">{titleHighlight}</span>
          </h2>
          <p className="text-xl text-brand-gray max-w-4xl mx-auto font-nunito leading-relaxed">
            {description}
          </p>
        </motion.div>

        {machines.length > 0 ? (
          <div className="relative w-full -mx-6 px-6">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {machines.map((machine: Product, index: number) => {
                  const IconComponent = categoryIconMap[machine.category] || Settings;
                  const imageUrl = machine.images?.[0]
                    ? urlFor(machine.images[0]).width(600).height(400).url()
                    : null;
                  
                  return (
                    <div 
                      key={machine._id} 
                      className="min-w-0 flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 px-3"
                    >
                      <Link
                        href={`/products/${machine.slug?.current || machine._id}`}
                        className="flex h-full"
                      >
                        <Card
                            className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 hover:border-brand-orange/40 flex flex-col h-full overflow-hidden w-full"
                          >
                            {/* Hero Image */}
                            <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                              {imageUrl ? (
                                <>
                                  <Image
                                    src={imageUrl}
                                    alt={machine.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    priority={index < 4}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
                                </>
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <IconComponent className="w-20 h-20 text-gray-300" />
                                </div>
                              )}
                              
                              {/* Category Badge Overlay */}
                              <div className="absolute top-4 left-4">
                                <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-brand-darkBlue text-xs font-semibold rounded-full capitalize shadow-sm font-nunito">
                                  {machine.category}
                                </span>
                              </div>
                              
                              {/* Icon Badge Overlay */}
                              <div className="absolute top-4 right-4">
                                <div className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
                                  <IconComponent className="w-5 h-5 text-brand-orange" />
                                </div>
                              </div>
                            </div>
                            
                            <CardHeader className="p-6 flex-1 flex flex-col">
                              <div className="mb-4">
                                <CardTitle className="text-xl font-bold text-brand-darkBlue mb-1 font-inter line-clamp-2 group-hover:text-brand-blue transition-colors">
                                  {machine.title}
                                </CardTitle>
                                {machine.subcategory && (
                                  <div className="text-sm font-semibold text-brand-gray/80 font-nunito">
                                    {machine.subcategory}
                                  </div>
                                )}
                              </div>

                              {/* Blue Divider */}
                              <div className="w-full h-px bg-brand-blue/20 mb-4" />

                              <div className="space-y-2 flex-1">
                                {machine.technicalSpecs && Object.entries(machine.technicalSpecs).length > 0 ? (
                                  <div className="grid grid-cols-1 gap-1.5">
                                    {Object.entries(machine.technicalSpecs)
                                      .filter(([_, value]) => value !== undefined && value !== null && value !== "")
                                      .slice(0, 5)
                                      .map(([key, value], idx) => (
                                        <div key={idx} className="flex justify-between items-center text-xs font-nunito border-b border-gray-50 pb-1">
                                          <span className="text-brand-gray font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                          <span className="text-brand-darkBlue font-semibold text-right">{value}</span>
                                        </div>
                                      ))}
                                  </div>
                                ) : (
                                  <CardDescription className="text-sm text-brand-gray font-nunito leading-relaxed mb-4 line-clamp-2">
                                    {machine.description}
                                  </CardDescription>
                                )}

                                {machine.dateAdded && (
                                  <div className="text-[10px] text-gray-400 font-nunito pt-2 flex items-center gap-1 opacity-70">
                                    <Calendar className="w-2.5 h-2.5" />
                                    <span>Added {formatDate(machine.dateAdded)}</span>
                                  </div>
                                )}
                              </div>
                            </CardHeader>

                            <CardContent className="p-6 pt-0 mt-auto border-t border-gray-100">
                              <div
                                className="w-full bg-brand-orange text-white text-center py-2.5 rounded-lg font-candara text-sm font-medium transition-colors group-hover:bg-brand-darkBlue flex items-center justify-center gap-2"
                              >
                                <span>View Details</span>
                                <ArrowRight className="w-4 h-4" />
                              </div>
                            </CardContent>
                          </Card>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Arrows */}
            {machines.length > 1 && (
              <>
                <button
                  onClick={scrollPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-brand-lightGray border-2 border-brand-darkBlue/20 hover:border-brand-darkBlue/40 text-brand-darkBlue rounded-full p-3 shadow-xl transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={scrollNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-brand-lightGray border-2 border-brand-darkBlue/20 hover:border-brand-darkBlue/40 text-brand-darkBlue rounded-full p-3 shadow-xl transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Pagination Dots */}
            {machines.length > 1 && emblaApi && emblaApi.scrollSnapList().length > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: emblaApi.scrollSnapList().length }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi.scrollTo(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === selectedIndex 
                        ? "bg-brand-darkBlue w-8" 
                        : "bg-brand-darkBlue/30 w-2 hover:bg-brand-darkBlue/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-brand-gray">No recently added machines at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentlyAddedClient;

