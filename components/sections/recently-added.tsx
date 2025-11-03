"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, Wrench, Cog, Gauge } from "lucide-react";
import Link from "next/link";

const RecentlyAdded = () => {
  const recentMachines = [
    {
      title: "Horizontal Boring Machine - Table Type",
      description: "High-precision horizontal boring machine with table type configuration.",
      icon: Settings,
      specifications: "X-2200, Y-2000 | Table: 1500 x 1800",
      category: "Boring Machines",
      date: "Added 2 days ago",
    },
    {
      title: "Cylindrical Grinding Machine",
      description: "Advanced cylindrical grinding machine for external and internal operations.",
      icon: Cog,
      specifications: "Max Length: 1000mm | Max Swing: 400mm",
      category: "Grinding Machines",
      date: "Added 5 days ago",
    },
    {
      title: "Vertical Lathe Machine",
      description: "Heavy-duty vertical lathe machine for complex turning operations.",
      icon: Gauge,
      specifications: "Max Turning: 1500mm | Max Swing: 500mm",
      category: "Lathe Machines",
      date: "Added 1 week ago",
    },
    {
      title: "CNC Machining Centre",
      description: "Advanced CNC machining center with automation and precision control.",
      icon: Wrench,
      specifications: "Work Envelope: 1000x800x600mm | Spindle: 8000 RPM",
      category: "CNC Machines",
      date: "Added 1 week ago",
    },
  ];

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
            Recently <span className="text-brand-orange">Added Machines</span>
          </h2>
          <p className="text-xl text-brand-gray max-w-4xl mx-auto font-nunito leading-relaxed">
            Check out our latest additions to the inventory. Premium quality machines 
            imported from Europe and UK.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentMachines.map((machine, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-brand-orange/20 h-full flex flex-col">
                <CardHeader className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                      <machine.icon className="w-6 h-6 text-brand-orange" />
                    </div>
                    <span className="text-xs text-brand-gray font-nunito bg-brand-lightGray px-2 py-1 rounded">
                      {machine.date}
                    </span>
                  </div>
                  
                  <CardTitle className="text-lg font-semibold text-brand-darkBlue mb-2 font-inter line-clamp-2">
                    {machine.title}
                  </CardTitle>
                  
                  <CardDescription className="text-brand-gray text-sm font-nunito line-clamp-2 mb-3">
                    {machine.description}
                  </CardDescription>

                  <div className="space-y-2">
                    <div className="text-xs text-brand-gray font-nunito">
                      <strong>Specs:</strong> {machine.specifications.split(' | ')[0]}
                    </div>
                    <span className="inline-block px-2 py-1 bg-brand-orange/10 text-brand-orange text-xs rounded-full font-nunito">
                      {machine.category}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 pt-0 mt-auto">
                  <Link href={`/products?machine=${encodeURIComponent(machine.title)}`}>
                    <Button className="w-full bg-gradient-to-r from-brand-orange to-brand-accent hover:from-brand-orange/90 hover:to-brand-accent/90 text-white font-nunito py-2 rounded-lg transition-all duration-300 text-sm">
                      View Details
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyAdded;
