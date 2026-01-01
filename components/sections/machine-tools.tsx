"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, Wrench, Cog, Gauge, Drill, Layers, Factory } from "lucide-react";
import Link from "next/link";

const MachineTools = () => {
  const machineGroups = [
    {
      name: "Boring Machines",
      icon: Wrench,
      description: "Horizontal and floor type boring machines for precision manufacturing",
      count: "25+ Machines",
      href: "/products?category=boring",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Grinding Machines",
      icon: Settings,
      description: "Cylindrical, surface, and roll grinders for superior finish",
      count: "30+ Machines",
      href: "/products?category=grinding",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Lathe Machines",
      icon: Gauge,
      description: "Vertical and horizontal lathes for turning operations",
      count: "20+ Machines",
      href: "/products?category=lathe",
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "CNC Machines",
      icon: Cog,
      description: "CNC machining centers and turning centers",
      count: "15+ Machines",
      href: "/products?category=cnc",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Milling Machines",
      icon: Drill,
      description: "Plano millers and vertical milling machines",
      count: "18+ Machines",
      href: "/products?category=milling",
      color: "from-red-500 to-red-600",
    },
    {
      name: "Gear Machines",
      icon: Layers,
      description: "Gear cutting and finishing machines",
      count: "12+ Machines",
      href: "/products?category=gear",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      name: "Drill Machines",
      icon: Drill,
      description: "Radial drills and precision drilling equipment",
      count: "10+ Machines",
      href: "/products?category=drill",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      name: "Others",
      icon: Factory,
      description: "Planning machines and specialized equipment",
      count: "15+ Machines",
      href: "/products?category=others",
      color: "from-gray-500 to-gray-600",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-brand-lightGray to-white">
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
          {machineGroups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={group.href}>
                <Card className="group hover:shadow-2xl transition-all duration-500 bg-white border-0 shadow-xl hover:shadow-2xl cursor-pointer h-full flex flex-col overflow-hidden rounded-3xl hover:-translate-y-1">
                  {/* Hero Icon Section - More Compact */}
                  <div className={`relative w-full h-40 overflow-hidden bg-gradient-to-br ${group.color} p-6 flex items-center justify-center`}>
                    {/* Subtle animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/3 to-white/8 group-hover:from-white/5 group-hover:via-white/10 group-hover:to-white/15 transition-all duration-700"></div>
                    
                    {/* Icon with refined glassmorphism */}
                    <motion.div
                      className={`w-20 h-20 bg-white/30 backdrop-blur-2xl rounded-2xl flex items-center justify-center shadow-[0_4px_20px_0_rgba(0,0,0,0.25)] border border-white/50 group-hover:scale-105 group-hover:rotate-2 transition-all duration-300`}
                      whileHover={{ scale: 1.1, rotate: 3 }}
                    >
                      <group.icon className="w-10 h-10 text-white drop-shadow-lg" />
                    </motion.div>
                    
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
                      <Button variant="primary" className="w-full flex items-center justify-center gap-2 font-candara text-sm rounded-xl group-hover:shadow-lg transition-all" asChild>
                        <Link href={group.href} className="flex gap-2">
                          <span>View Category</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MachineTools;
