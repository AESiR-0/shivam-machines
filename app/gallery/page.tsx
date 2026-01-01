"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, Phone, Mail } from "lucide-react";

export default function Gallery() {
  const machines = [
    {
      title: "Horizontal Boring Machine - Table Type",
      image: "/api/placeholder/600/400",
      specifications: {
        "AXIS": "X-2200, Y-2000",
        "Table Dimensions": "1500 x 1800",
        "Spindle Diameter": "125"
      },
      description: "High-precision horizontal boring machine with table type configuration for large-scale manufacturing operations."
    },
    {
      title: "Floor Type Boring Machine",
      image: "/api/placeholder/600/400",
      specifications: {
        "Altezza Punte": "1.000 mm.",
        "Passaggio tra i Montanti": "1.000 mm."
      },
      description: "Heavy-duty floor type boring machine designed for large workpiece machining operations."
    },
    {
      title: "Vertical Lathe Machine",
      image: "/api/placeholder/600/400",
      specifications: {
        "Altezza Punte": "1.000 mm.",
        "Passaggio tra i Montanti": "1.000 mm."
      },
      description: "Advanced vertical lathe machine for complex turning operations with superior accuracy and surface finish."
    },
    {
      title: "Lathe Machine",
      image: "/api/placeholder/600/400",
      specifications: {
        "Altezza Punte": "1.000 mm.",
        "Passaggio tra i Montanti": "1.000 mm."
      },
      description: "Precision lathe machine for various turning operations with excellent surface finish capabilities."
    },
    {
      title: "Plano Miller Machine",
      image: "/api/placeholder/600/400",
      specifications: {
        "Altezza Punte": "1.000 mm.",
        "Passaggio tra i Montanti": "1.000 mm."
      },
      description: "Heavy-duty plano miller machine for large surface milling operations with exceptional precision."
    },
    {
      title: "Planning Machine",
      image: "/api/placeholder/600/400",
      specifications: {
        "Altezza Punte": "1.000 mm.",
        "Passaggio tra i Montanti": "1.000 mm."
      },
      description: "Professional planning machine for accurate surface planning operations on large workpieces."
    },
    {
      title: "Milling Machine",
      image: "/api/placeholder/600/400",
      specifications: {
        "Altezza Punte": "1.000 mm.",
        "Passaggio tra i Montanti": "1.000 mm."
      },
      description: "Versatile milling machine for various machining operations with high precision and reliability."
    },
    {
      title: "Grinding Machine - Surface Grinder",
      image: "/api/placeholder/600/400",
      specifications: {
        "Altezza Punte": "1.000 mm.",
        "Passaggio tra i Montanti": "1.000 mm."
      },
      description: "High-precision surface grinder for achieving exceptional surface finish and dimensional accuracy."
    },
    {
      title: "Cylindrical Grinding Machine",
      image: "/api/placeholder/600/400",
      specifications: {
        "Altezza Punte": "1.000 mm.",
        "Passaggio tra i Montanti": "1.000 mm."
      },
      description: "Advanced cylindrical grinding machine for external and internal grinding operations with superior precision."
    },
    {
      title: "Roll Grinder",
      image: "/api/placeholder/600/400",
      specifications: {
        "Altezza Punte": "1.000 mm.",
        "Passaggio tra i Montanti": "1.000 mm."
      },
      description: "Specialized roll grinder for precision grinding of rolls used in rolling mills and paper industries."
    },
    {
      title: "Drill Machine",
      image: "/api/placeholder/600/400",
      specifications: {
        "Altezza Punte": "1.000 mm.",
        "Passaggio tra i Montanti": "1.000 mm."
      },
      description: "Heavy-duty drill machine for precision drilling operations with excellent accuracy and reliability."
    },
    {
      title: "Gear Machines",
      image: "/api/placeholder/600/400",
      specifications: {
        "Altezza Punte": "1.000 mm.",
        "Passaggio tra i Montanti": "1.000 mm."
      },
      description: "Specialized gear cutting and finishing machines for precision gear manufacturing operations."
    },
    {
      title: "CNC Machines - Horizontal Machining Centre",
      image: "/api/placeholder/600/400",
      specifications: {
        "Altezza Punte": "1.000 mm.",
        "Passaggio tra i Montanti": "1.000 mm."
      },
      description: "Advanced CNC horizontal machining centre for complex manufacturing operations with automation and precision control."
    },
    {
      title: "Vertical Machining Center",
      image: "/api/placeholder/600/400",
      specifications: {
        "Altezza Punte": "1.000 mm.",
        "Passaggio tra i Montanti": "1.000 mm."
      },
      description: "High-performance vertical machining centre for precision manufacturing operations with CNC control."
    },
    {
      title: "Turning Center",
      image: "/api/placeholder/600/400",
      specifications: {
        "Altezza Punte": "1.000 mm.",
        "Passaggio tra i Montanti": "1.000 mm."
      },
      description: "Advanced turning center for precision turning operations with CNC control and automation features."
    },
    {
      title: "Accessories/Others",
      image: "/api/placeholder/600/400",
      specifications: {
        "Altezza Punte": "1.000 mm.",
        "Passaggio tra i Montanti": "1.000 mm."
      },
      description: "Various machine accessories and specialized equipment for enhanced manufacturing capabilities."
    }
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-lightGray via-white to-brand-steel/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-brand-darkBlue mb-6 font-montserrat">
              Machine <span className="text-brand-orange">Gallery</span>
            </h1>
            <p className="text-xl text-brand-gray max-w-4xl mx-auto font-nunito leading-relaxed">
              Browse our comprehensive collection of used machine tools. Each machine is carefully 
              inspected and comes with detailed specifications. Contact us for more information 
              or to schedule a viewing.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-gradient-to-br from-white to-brand-lightGray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {machines.map((machine, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-brand-orange/20">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={machine.image}
                    alt={machine.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <Button variant="secondary" className="opacity-0 group-hover:opacity-100 flex transition-opacity duration-300" asChild>
                      <Link href={`/products/${machine.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold text-brand-darkBlue mb-3 font-inter">
                    {machine.title}
                  </CardTitle>
                  
                  <CardDescription className="text-brand-gray font-nunito leading-relaxed mb-4">
                    {machine.description}
                  </CardDescription>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-brand-darkBlue font-inter">Specifications:</h4>
                    <div className="space-y-2">
                      {Object.entries(machine.specifications).map(([key, value], specIndex) => (
                        <div key={specIndex} className="flex justify-between text-sm">
                          <span className="text-brand-gray font-nunito">{key}:</span>
                          <span className="text-brand-darkBlue font-nunito font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 pt-0">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="primary" className="flex-1 font-nunito" asChild>
                      <a href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi, I'm interested in ${machine.title}. Can you provide more details?`)}`} target="_blank" rel="noopener noreferrer">
                        <Phone className="w-4 h-4 mr-2" />
                        Quick Inquiry
                      </a>
                    </Button>
                    <Button variant="secondary" className="flex-1 font-nunito" asChild>
                      <Link href={`/products/${machine.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        More Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download PDF Section */}
      <section className="py-12 bg-brand-lightGray">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-brand-darkBlue mb-6 font-montserrat">
            Download Our Complete Catalog
          </h2>
          <p className="text-xl text-brand-gray mb-8 font-nunito">
            Get our comprehensive PDF catalog with detailed specifications, 
            images, and technical information about all our available machines.
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                  <Download className="w-8 h-8 text-brand-orange" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-brand-darkBlue font-inter">Complete Machine Catalog</h3>
                  <p className="text-brand-gray font-nunito">PDF format • 25+ pages • Detailed specifications</p>
                </div>
              </div>
              
              <Button variant="primary" className="font-inter">
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-brand-darkBlue mb-6 font-montserrat">
            Need More Information?
          </h2>
          <p className="text-xl text-brand-gray mb-8 font-nunito">
            Our team is ready to help you find the perfect machine for your manufacturing needs. 
            Contact us for detailed specifications, pricing, and availability.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-brand-orange" />
              </div>
              <h3 className="text-lg font-semibold text-brand-darkBlue mb-2 font-inter">Call Us</h3>
              <p className="text-brand-gray font-nunito">+91-9824080055</p>
              <p className="text-sm text-brand-gray font-nunito">Mr. Dinesh Soni</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-brand-orange" />
              </div>
              <h3 className="text-lg font-semibold text-brand-darkBlue mb-2 font-inter">Email Us</h3>
              <p className="text-brand-gray font-nunito">shivamenterprise@yahoo.com</p>
              <p className="text-sm text-brand-gray font-nunito">Quick response guaranteed</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-brand-orange" />
              </div>
              <h3 className="text-lg font-semibold text-brand-darkBlue mb-2 font-inter">Download</h3>
              <p className="text-brand-gray font-nunito">Complete Catalog</p>
              <p className="text-sm text-brand-gray font-nunito">PDF with all details</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
