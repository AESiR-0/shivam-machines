"use client";

import React, { useState, useMemo, Suspense } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, Wrench, Cog, Gauge, Filter, Calendar, SortAsc } from "lucide-react";
import { useSearchParams } from "next/navigation";
import WhatsAppButton from "@/components/ui/whatsapp-button";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const productCategories = [
    {
      id: "cylindrical-grinding",
      title: "Cylindrical Grinding Machines",
      description: "High-precision cylindrical grinding machines for external and internal grinding operations with exceptional surface finish.",
      icon: Settings,
      features: ["Precision Grinding", "CNC Control", "Heavy Duty"],
      specifications: "Max Grinding Length: 1000mm, Max Swing: 400mm",
      machines: ["Universal Cylindrical Grinder", "Internal Grinder", "Centerless Grinder"],
      dateAdded: "2024-01-15",
    },
    {
      id: "horizontal-boring",
      title: "Horizontal Boring Machines",
      description: "Heavy-duty horizontal boring machines for large-scale manufacturing operations with exceptional accuracy and reliability.",
      icon: Wrench,
      features: ["Large Capacity", "High Precision", "Heavy Duty"],
      specifications: "Max Boring Diameter: 200mm, Table Size: 2000x1500mm",
      machines: ["Floor Type Boring", "Table Type Boring", "Planer Type Boring"],
      dateAdded: "2024-01-10",
    },
    {
      id: "bore-grinding",
      title: "Automatic Production Bore Grinding",
      description: "Fully automated bore grinding machines for high-volume production with consistent quality and efficiency.",
      icon: Cog,
      features: ["Automated", "High Volume", "Consistent Quality"],
      specifications: "Production Rate: 200 pieces/hour, Accuracy: ±0.005mm",
      machines: ["CNC Bore Grinder", "Automatic Bore Grinder", "Production Grinder"],
      dateAdded: "2024-01-05",
    },
    {
      id: "lathe",
      title: "Precision Lathe Machines",
      description: "Advanced precision lathe machines for complex turning operations with superior accuracy and surface finish.",
      icon: Gauge,
      features: ["High Precision", "CNC Control", "Versatile"],
      specifications: "Max Turning Length: 1500mm, Max Swing: 500mm",
      machines: ["CNC Lathe", "Engine Lathe", "Toolroom Lathe"],
      dateAdded: "2023-12-20",
    },
    {
      id: "gear",
      title: "Gear Grinding Machines",
      description: "Specialized gear grinding machines for precision gear manufacturing with exceptional accuracy and surface quality.",
      icon: Settings,
      features: ["Gear Grinding", "High Accuracy", "Precision"],
      specifications: "Max Gear Diameter: 800mm, Module Range: 1-20",
      machines: ["Gear Hobber", "Gear Shaper", "Gear Grinder"],
      dateAdded: "2023-12-15",
    },
    {
      id: "cnc",
      title: "CNC Machining Centers",
      description: "Advanced CNC machining centers for complex manufacturing operations with automation and precision control.",
      icon: Gauge,
      features: ["CNC Control", "Automation", "High Productivity"],
      specifications: "Work Envelope: 1000x800x600mm, Spindle Speed: 8000 RPM",
      machines: ["Vertical Machining Center", "Horizontal Machining Center", "5-Axis Machining Center"],
      dateAdded: "2023-12-10",
    },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = productCategories;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.id === selectedCategory);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      filtered = filtered.filter(product => {
        const productDate = new Date(product.dateAdded);
        const diffDays = Math.floor((now.getTime() - productDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (dateFilter === 'week') return diffDays <= 7;
        if (dateFilter === 'month') return diffDays <= 30;
        if (dateFilter === 'quarter') return diffDays <= 90;
        return true;
      });
    }

    // Sorting
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [selectedCategory, dateFilter, sortBy]);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'horizontal-boring', name: 'Horizontal Boring' },
    { id: 'cylindrical-grinding', name: 'Cylindrical Grinding' },
    { id: 'lathe', name: 'Lathe Machines' },
    { id: 'cnc', name: 'CNC Machines' },
    { id: 'gear', name: 'Gear Machines' },
    { id: 'bore-grinding', name: 'Bore Grinding' },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-lightGray via-white to-brand-steel/5 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-brand-darkBlue mb-6 font-montserrat">
              Our <span className="text-brand-orange">Machine Tools</span>
            </h1>
            <p className="text-xl text-brand-gray max-w-4xl mx-auto font-nunito leading-relaxed">
              Premium used machine tools for precision manufacturing. From cylindrical grinding 
              to CNC machining centers, we provide reliable solutions for your industrial needs.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-brand-gray" />
              <span className="font-semibold text-brand-darkBlue font-inter">Filters:</span>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent font-nunito"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Date Filter */}
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-brand-gray" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent font-nunito"
              >
                <option value="all">All Dates</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last 3 Months</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center space-x-2 ml-auto">
              <SortAsc className="w-4 h-4 text-brand-gray" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent font-nunito"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-gradient-to-br from-white to-brand-lightGray">
        <div className="max-w-7xl mx-auto px-6">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-brand-gray font-nunito">No products found matching your filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedProducts.map((product, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-brand-orange/20">
                  <CardHeader className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                        <product.icon className="w-6 h-6 text-brand-orange" />
                      </div>
                      <span className="text-sm text-brand-gray font-nunito bg-brand-lightGray px-3 py-1 rounded-full">
                        {product.title.split(' ')[0]}
                      </span>
                    </div>
                    
                    <CardTitle className="text-xl font-semibold text-brand-darkBlue mb-3 font-inter">
                      {product.title}
                    </CardTitle>
                    
                    <CardDescription className="text-brand-gray font-nunito leading-relaxed mb-4">
                      {product.description}
                    </CardDescription>

                    <div className="space-y-3">
                      <div className="text-sm text-brand-gray font-nunito">
                        <strong>Specifications:</strong> {product.specifications}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-sm rounded-full font-nunito"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="text-sm text-brand-gray font-nunito">
                        <strong>Available Machines:</strong>
                        <ul className="mt-2 space-y-1">
                          {product.machines.map((machine, machineIndex) => (
                            <li key={machineIndex} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-brand-orange rounded-full mr-2"></span>
                              {machine}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-xs text-brand-slate font-nunito pt-2 border-t border-gray-100">
                        Added: {new Date(product.dateAdded).toLocaleDateString()}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-8 pt-0">
                    <Button variant="primary" className="w-full font-calibri">
                      View Details
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}

export default function Products() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}