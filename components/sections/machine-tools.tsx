"use client";

import React from "react";
import { motion } from "framer-motion";
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
                <Card className="group hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-brand-orange/20 hover:-translate-y-2 cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${group.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <group.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-lg font-semibold text-brand-darkBlue mb-2 group-hover:text-brand-orange transition-colors font-inter">
                      {group.name}
                    </h3>
                    <p className="text-brand-gray text-sm mb-4 leading-relaxed font-nunito line-clamp-2">
                      {group.description}
                    </p>

                    <div className="flex items-center justify-center space-x-2 text-sm text-brand-orange font-nunito mb-4">
                      <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                      <span className="font-medium">{group.count}</span>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-brand-orange to-brand-accent hover:from-brand-orange/90 hover:to-brand-accent/90 text-white font-nunito py-2 rounded-lg transition-all duration-300 text-sm">
                      View Category
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
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
