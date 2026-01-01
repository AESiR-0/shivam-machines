"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, Wrench, Cog, Gauge, Drill, Layers, Factory } from "lucide-react";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { MachineToolCategory } from "@/lib/sanity/types";

interface MachineToolsClientProps {
  categories: MachineToolCategory[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Settings,
  Wrench,
  Cog,
  Gauge,
  Drill,
  Layers,
  Factory,
};

const MachineToolsClient = ({ categories }: MachineToolsClientProps) => {
  // Default categories if none from Sanity
  const defaultCategories = [
    {
      name: "Boring Machines",
      description: "Horizontal and floor type boring machines for precision manufacturing",
      count: "25+ Machines",
      href: "/products?category=boring",
      color: "from-blue-500 to-blue-600",
      icon: "Wrench",
    },
    {
      name: "Grinding Machines",
      description: "Cylindrical, surface, and roll grinders for superior finish",
      count: "30+ Machines",
      href: "/products?category=grinding",
      color: "from-green-500 to-green-600",
      icon: "Settings",
    },
    {
      name: "Lathe Machines",
      description: "Vertical and horizontal lathes for turning operations",
      count: "20+ Machines",
      href: "/products?category=lathe",
      color: "from-orange-500 to-orange-600",
      icon: "Gauge",
    },
    {
      name: "CNC Machines",
      description: "CNC machining centers and turning centers",
      count: "15+ Machines",
      href: "/products?category=cnc",
      color: "from-purple-500 to-purple-600",
      icon: "Cog",
    },
    {
      name: "Milling Machines",
      description: "Plano millers and vertical milling machines",
      count: "18+ Machines",
      href: "/products?category=milling",
      color: "from-red-500 to-red-600",
      icon: "Drill",
    },
    {
      name: "Gear Machines",
      description: "Gear cutting and finishing machines",
      count: "12+ Machines",
      href: "/products?category=gear",
      color: "from-indigo-500 to-indigo-600",
      icon: "Layers",
    },
    {
      name: "Drill Machines",
      description: "Radial drills and precision drilling equipment",
      count: "10+ Machines",
      href: "/products?category=drill",
      color: "from-cyan-500 to-cyan-600",
      icon: "Drill",
    },
    {
      name: "Others",
      description: "Planning machines and specialized equipment",
      count: "15+ Machines",
      href: "/products?category=others",
      color: "from-gray-500 to-gray-600",
      icon: "Factory",
    },
  ];

  const displayCategories = categories.length > 0 
    ? categories.map(cat => ({
        name: cat.name,
        description: cat.description || "",
        count: cat.count || "0 Machines",
        href: cat.href || `/products?category=${cat.slug?.current || cat.name.toLowerCase()}`,
        color: cat.color || "from-gray-500 to-gray-600",
        icon: cat.icon || "Settings",
      }))
    : defaultCategories;

  return (
    <section className="py-12 bg-gradient-to-br from-brand-lightGray to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-brand-darkBlue mb-6 font-montserrat">
            Machine <span className="text-brand-orange">Tools</span>
          </h2>
          <p className="text-xl text-brand-gray max-w-4xl mx-auto font-nunito leading-relaxed">
            Browse our comprehensive collection of machine tools organized by category. 
            Click on any category to view available machines with detailed specifications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((group, index) => {
            const IconComponent = iconMap[group.icon] || Settings;
            // Get image from Sanity category if available
            const categoryData = categories.find(cat => cat.name === group.name || cat.slug?.current === group.href.split('category=')[1]);
            const imageUrl = categoryData?.image
              ? urlFor(categoryData.image).width(600).height(400).url()
              : null;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={group.href}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card className="group transition-all duration-500 bg-white border-0 shadow-xl hover:shadow-2xl cursor-pointer h-full flex flex-col overflow-hidden rounded-3xl hover:-translate-y-1">
                      {/* Hero Icon Section - More Compact */}
                      <div className={`relative w-full h-40 overflow-hidden bg-gradient-to-br ${group.color} p-6 flex items-center justify-center`}>
                        {imageUrl ? (
                          <>
                            <Image
                              src={imageUrl}
                              alt={group.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-10"
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                              priority={false}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-transparent" />
                          </>
                        ) : null}
                        
                        {/* Subtle animated gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/3 to-white/8 group-hover:from-white/5 group-hover:via-white/10 group-hover:to-white/15 transition-all duration-700"></div>
                        
                        {/* Icon with refined glassmorphism */}
                        <div className="relative z-10">
                          <motion.div
                            className={`w-20 h-20 bg-white/30 backdrop-blur-2xl rounded-2xl flex items-center justify-center shadow-[0_4px_20px_0_rgba(0,0,0,0.25)] border border-white/50 group-hover:scale-105 group-hover:rotate-2 transition-all duration-300`}
                            whileHover={{ scale: 1.1, rotate: 3 }}
                          >
                            <IconComponent className="w-10 h-10 text-white drop-shadow-lg" />
                          </motion.div>
                        </div>
                        
                        {/* Subtle decorative elements */}
                        <div className="absolute top-3 right-3 w-12 h-12 bg-white/8 rounded-full blur-xl"></div>
                        <div className="absolute bottom-3 left-3 w-10 h-10 bg-white/6 rounded-full blur-lg"></div>
                      </div>
                      
                      <CardContent className="p-6 text-center flex flex-col flex-1 bg-white">
                        <h3 className="text-lg font-bold text-brand-darkBlue mb-2.5 group-hover:text-brand-orange transition-colors duration-300 font-inter">
                          {group.name}
                        </h3>
                        <p className="text-brand-gray text-sm mb-4 leading-relaxed font-nunito line-clamp-2 flex-1 min-h-[2.5rem]">
                          {group.description}
                        </p>

                        <div className="flex items-center justify-center mb-5">
                          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-orange/8 rounded-full border border-brand-orange/20 group-hover:bg-brand-orange/12 group-hover:border-brand-orange/30 transition-all">
                            <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                            <span className="text-xs font-semibold text-brand-orange font-nunito">{group.count}</span>
                          </div>
                        </div>

                        <div className="mt-auto pt-2">
                          <Button
                            variant="primary"
                            className="w-full flex items-center justify-center gap-2 font-candara text-sm rounded-xl group-hover:shadow-lg transition-all"
                            asChild
                          >
                            <Link href={group.href} className="flex gap-2">
                              <span>View Category</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MachineToolsClient;

