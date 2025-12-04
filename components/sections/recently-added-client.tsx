"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, Wrench, Cog, Gauge } from "lucide-react";
import Link from "next/link";
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
    if (!dateString) return "Recently added";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Added today";
    if (diffDays === 1) return "Added yesterday";
    if (diffDays < 7) return `Added ${diffDays} days ago`;
    if (diffDays < 30) return `Added ${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return `Added ${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  };

  return (
    <section className="py-24 bg-gradient-to-br from-white to-brand-lightGray">
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
              return (
                <motion.div
                  key={machine._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-brand-orange/20 h-full flex flex-col">
                    <CardHeader className="p-6 pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-brand-orange" />
                        </div>
                        <span className="text-xs text-brand-gray font-nunito bg-brand-lightGray px-2 py-1 rounded">
                          {formatDate(machine.dateAdded)}
                        </span>
                      </div>
                      
                      <CardTitle className="text-lg font-semibold text-brand-darkBlue mb-2 font-inter line-clamp-2">
                        {machine.title}
                      </CardTitle>
                      
                      <CardDescription className="text-brand-gray text-sm font-nunito line-clamp-2 mb-3">
                        {machine.description}
                      </CardDescription>

                      <div className="space-y-2">
                        {machine.specifications && (
                          <div className="text-xs text-brand-gray font-nunito">
                            <strong>Specs:</strong> {machine.specifications.split(' | ')[0]}
                          </div>
                        )}
                        <span className="inline-block px-2 py-1 bg-brand-orange/10 text-brand-orange text-xs rounded-full font-nunito capitalize">
                          {machine.category}
                        </span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6 pt-0 mt-auto">
                      <Link href={`/products/${machine.slug?.current || '#'}`}>
                        <Button variant="primary" className="w-full font-calibri text-sm">
                          View Details
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  </motion.div>
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

