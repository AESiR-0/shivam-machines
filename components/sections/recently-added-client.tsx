"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, Wrench, Cog, Gauge, Calendar } from "lucide-react";
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
  const title = data?.title || "Recently";
  const titleHighlight = data?.titleHighlight || "Added Machines";
  const description = data?.description || "Check out our latest additions to the inventory. Premium quality machines imported from Europe and UK.";
  
  const machines = data?.machines || [];

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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {machines.map((machine, index) => {
              const IconComponent = categoryIconMap[machine.category] || Settings;
              const imageUrl = machine.images?.[0]
                ? urlFor(machine.images[0]).width(600).height(400).url()
                : null;
              
              return (
                <motion.div
                  key={machine._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    className="group hover:shadow-2xl transition-all duration-300 bg-white border border-gray-200 hover:border-brand-orange/40 flex flex-col h-full overflow-hidden"
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
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                            priority={false}
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
                      <CardTitle className="text-lg font-bold text-brand-darkBlue mb-2 font-inter line-clamp-2 group-hover:text-brand-orange transition-colors">
                        {machine.title}
                      </CardTitle>

                      <CardDescription className="text-sm text-brand-gray font-nunito leading-relaxed mb-4 line-clamp-2">
                        {machine.description}
                      </CardDescription>

                      <div className="space-y-3 flex-1">
                        {machine.specifications && (
                          <div className="bg-brand-lightGray/50 rounded-lg p-3 border border-gray-100">
                            <div className="text-xs font-semibold text-brand-darkBlue mb-1 font-inter uppercase tracking-wide">
                              Specifications
                            </div>
                            <div className="text-xs text-brand-gray font-nunito line-clamp-2">
                              {machine.specifications}
                            </div>
                          </div>
                        )}

                        {machine.features && machine.features.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {machine.features.slice(0, 3).map((feature, featureIndex) => (
                              <span
                                key={featureIndex}
                                className="px-2.5 py-1 bg-brand-orange/10 text-brand-orange text-xs font-medium rounded-md font-nunito border border-brand-orange/20"
                              >
                                {feature}
                              </span>
                            ))}
                            {machine.features.length > 3 && (
                              <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md font-nunito border border-gray-200">
                                +{machine.features.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {machine.dateAdded && (
                          <div className="text-xs text-gray-500 font-nunito pt-3 border-t border-gray-100 mt-auto flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>Added {formatDate(machine.dateAdded)}</span>
                          </div>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="p-6 pt-0 mt-auto border-t border-gray-100">
                      <Button
                        variant="primary"
                        className="w-full flex items-center justify-center gap-2 font-candara text-sm"
                        asChild
                      >
                        <Link
                          href={`/products/${machine.slug?.current || machine._id}`}
                          className="flex gap-2"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
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

