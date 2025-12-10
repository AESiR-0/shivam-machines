"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, Wrench, Cog, Gauge, Filter, Calendar, SortAsc } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import type { Product } from "@/lib/sanity/types";

interface ProductsListingClientProps {
  products: Product[];
}

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

function ProductsContent({ products }: ProductsListingClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [specFilters, setSpecFilters] = useState({
    maxLength: "",
    maxSwing: "",
    spindleSpeed: "",
    hasCNC: false,
  });

  // Extract common specification values for filters
  const extractSpecValue = (specs: string | undefined, pattern: RegExp): string => {
    if (!specs) return "";
    const match = specs.match(pattern);
    return match ? match[1] : "";
  };

  // Parse specifications to extract common values
  const parseSpecifications = (specs: string | undefined) => {
    if (!specs) return { hasCNC: false };
    const specObj: Record<string, string | boolean> = {};
    
    // Common patterns in specifications
    const patterns = {
      maxLength: /(?:Max|Maximum).*?(?:Length|Grinding Length|Turning Length)[:\s]*(\d+)/i,
      maxSwing: /(?:Max|Maximum).*?(?:Swing|Diameter)[:\s]*(\d+)/i,
      spindleSpeed: /(?:Spindle|Speed)[:\s]*(\d+)\s*(?:RPM|rpm)/i,
      workEnvelope: /(?:Work Envelope|Table Size)[:\s]*(\d+)/i,
    };

    for (const [key, pattern] of Object.entries(patterns)) {
      const match = specs.match(pattern);
      if (match) {
        specObj[key] = match[1];
      }
    }

    // Check for CNC
    specObj.hasCNC = /CNC|cnc/i.test(specs);

    return specObj;
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Date filter
    if (dateFilter !== "all" && products.length > 0) {
      const now = new Date();
      filtered = filtered.filter((product) => {
        if (!product.dateAdded) return false;
        const productDate = new Date(product.dateAdded);
        const diffDays = Math.floor((now.getTime() - productDate.getTime()) / (1000 * 60 * 60 * 24));

        if (dateFilter === "week") return diffDays <= 7;
        if (dateFilter === "month") return diffDays <= 30;
        if (dateFilter === "quarter") return diffDays <= 90;
        return true;
      });
    }

    // Specification filters
    if (specFilters.maxLength) {
      filtered = filtered.filter((product) => {
        const specs = parseSpecifications(product.specifications);
        return typeof specs.maxLength === 'string' && parseInt(specs.maxLength) >= parseInt(specFilters.maxLength);
      });
    }

    if (specFilters.maxSwing) {
      filtered = filtered.filter((product) => {
        const specs = parseSpecifications(product.specifications);
        return typeof specs.maxSwing === 'string' && parseInt(specs.maxSwing) >= parseInt(specFilters.maxSwing);
      });
    }

    if (specFilters.spindleSpeed) {
      filtered = filtered.filter((product) => {
        const specs = parseSpecifications(product.specifications);
        return typeof specs.spindleSpeed === 'string' && parseInt(specs.spindleSpeed) >= parseInt(specFilters.spindleSpeed);
      });
    }

    if (specFilters.hasCNC) {
      filtered = filtered.filter((product) => {
        const specs = parseSpecifications(product.specifications);
        return (specs.hasCNC === true) || /CNC|cnc/i.test(product.category) || /CNC|cnc/i.test(product.title);
      });
    }

    // Sorting
    if (sortBy === "newest") {
      filtered.sort((a, b) => {
        const dateA = a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
        const dateB = b.dateAdded ? new Date(b.dateAdded).getTime() : 0;
        return dateB - dateA;
      });
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => {
        const dateA = a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
        const dateB = b.dateAdded ? new Date(b.dateAdded).getTime() : 0;
        return dateA - dateB;
      });
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [products, selectedCategory, dateFilter, sortBy, specFilters]);

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return [
      { id: "all", name: "All Categories" },
      ...Array.from(cats)
        .filter(Boolean)
        .map((cat) => ({
          id: cat,
          name: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, " "),
        })),
    ];
  }, [products]);

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
              Premium used machine tools for precision manufacturing. From cylindrical grinding to
              CNC machining centers, we provide reliable solutions for your industrial needs.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-4">
            {/* Main Filters Row */}
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

            {/* Specification Filters */}
            <div className="flex flex-wrap gap-4 items-center pt-4 border-t border-gray-200">
              <span className="text-sm font-semibold text-brand-gray font-inter">Specifications:</span>

              {/* Max Length Filter */}
              <div className="flex items-center space-x-2">
                <label className="text-sm text-brand-gray font-nunito">Min Length (mm):</label>
                <input
                  type="number"
                  placeholder="e.g. 1000"
                  value={specFilters.maxLength}
                  onChange={(e) =>
                    setSpecFilters({ ...specFilters, maxLength: e.target.value })
                  }
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent font-nunito w-24"
                />
              </div>

              {/* Max Swing Filter */}
              <div className="flex items-center space-x-2">
                <label className="text-sm text-brand-gray font-nunito">Min Swing (mm):</label>
                <input
                  type="number"
                  placeholder="e.g. 400"
                  value={specFilters.maxSwing}
                  onChange={(e) =>
                    setSpecFilters({ ...specFilters, maxSwing: e.target.value })
                  }
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent font-nunito w-24"
                />
              </div>

              {/* Spindle Speed Filter */}
              <div className="flex items-center space-x-2">
                <label className="text-sm text-brand-gray font-nunito">Min RPM:</label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={specFilters.spindleSpeed}
                  onChange={(e) =>
                    setSpecFilters({ ...specFilters, spindleSpeed: e.target.value })
                  }
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent font-nunito w-24"
                />
              </div>

              {/* CNC Filter */}
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={specFilters.hasCNC}
                    onChange={(e) =>
                      setSpecFilters({ ...specFilters, hasCNC: e.target.checked })
                    }
                    className="w-4 h-4 text-brand-orange border-gray-300 rounded focus:ring-brand-orange"
                  />
                  <span className="text-sm text-brand-gray font-nunito">CNC Only</span>
                </label>
              </div>

              {/* Clear Filters */}
              {(specFilters.maxLength ||
                specFilters.maxSwing ||
                specFilters.spindleSpeed ||
                specFilters.hasCNC) && (
                <button
                  onClick={() =>
                    setSpecFilters({
                      maxLength: "",
                      maxSwing: "",
                      spindleSpeed: "",
                      hasCNC: false,
                    })
                  }
                  className="px-4 py-1 text-sm text-brand-orange hover:text-brand-darkBlue font-nunito underline"
                >
                  Clear Spec Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-gradient-to-br from-white to-brand-lightGray">
        <div className="max-w-7xl mx-auto px-6">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-brand-gray font-nunito">
                No products found matching your filters.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-sm text-brand-gray font-nunito">
                Showing {filteredAndSortedProducts.length} of {products.length} products
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedProducts.map((product) => {
                  const IconComponent =
                    categoryIconMap[product.category] || Settings;
                  return (
                    <Card
                      key={product._id}
                      className="group hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-brand-orange/20"
                    >
                      <CardHeader className="p-8">
                        <div className="flex items-center justify-between mb-6">
                          <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-brand-orange" />
                          </div>
                          <span className="text-sm text-brand-gray font-nunito bg-brand-lightGray px-3 py-1 rounded-full capitalize">
                            {product.category}
                          </span>
                        </div>

                        <CardTitle className="text-xl font-semibold text-brand-darkBlue mb-3 font-inter">
                          {product.title}
                        </CardTitle>

                        <CardDescription className="text-brand-gray font-nunito leading-relaxed mb-4">
                          {product.description}
                        </CardDescription>

                        <div className="space-y-3">
                          {product.specifications && (
                            <div className="text-sm text-brand-gray font-nunito">
                              <strong>Specifications:</strong> {product.specifications}
                            </div>
                          )}

                          {product.features && product.features.length > 0 && (
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
                          )}

                          {product.dateAdded && (
                            <div className="text-xs text-brand-slate font-nunito pt-2 border-t border-gray-100">
                              Added: {new Date(product.dateAdded).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="p-8 pt-0">
                        <Button
                          variant="primary"
                          className="w-full flex items-center gap-2 font-calibri"
                          asChild
                        >
                          <Link
                            href={`/products/${product.slug?.current || product._id}`}
                          >
                            View Details
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}

export default function ProductsListingClient({ products }: ProductsListingClientProps) {
  return (
    <ProductsContent products={products} />
  );
}

