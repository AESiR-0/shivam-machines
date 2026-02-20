"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, Wrench, Cog, Gauge, Filter, Calendar, SortAsc, X, ChevronDown, ChevronUp, Tag, SlidersHorizontal, RotateCcw, Grid, LayoutGrid } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import { urlFor } from "@/lib/sanity/image";
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

  // Dynamic Specification Filters State Map
  const [specFilters, setSpecFilters] = useState<Record<string, string>>({});

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [gridColumns, setGridColumns] = useState<3 | 4>(3);
  const [mobileGridColumns, setMobileGridColumns] = useState<1 | 2>(1);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    date: true,
    sort: true,
    specs: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Format date consistently to avoid hydration errors
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
  };

  // Parse specifications into generic key-value pairs
  const parseSpecifications = (specs: string | undefined): Record<string, string | boolean> => {
    const specObj: Record<string, string | boolean> = { hasCNC: false };
    if (!specs) return specObj;

    // Check for CNC
    specObj.hasCNC = /CNC|cnc/i.test(specs);

    // Split by comma or pipe
    const parts = specs.split(/[,|]/);
    parts.forEach(part => {
      // Split by colon
      const kv = part.split(":");
      if (kv.length === 2) {
        let key = kv[0].trim();
        const valueStr = kv[1].trim();

        // Simplify key names slightly for grouping (optional but good for UI)
        key = key.replace(/^(Max|Maximum)\s+/i, "Max ");

        // Extract numeric part from value
        const numericMatch = valueStr.match(/(\d+(?:\.\d+)?)/);
        if (numericMatch) {
          specObj[key] = numericMatch[1];
        } else {
          // Keep strings too for potential future non-numeric exact match filters
          specObj[key] = valueStr;
        }
      }
    });

    return specObj;
  };

  // Get unique dynamically available numeric specifications
  const availableSpecKeys = useMemo(() => {
    const keys = new Set<string>();
    products.forEach(p => {
      const parsed = parseSpecifications(p.specifications);
      Object.entries(parsed).forEach(([key, val]) => {
        // Only add to dynamic inputs if we successfully parsed a numeric value to filter on (and it's not the boolean hasCNC flag)
        if (key !== "hasCNC" && !isNaN(parseFloat(String(val)))) {
          keys.add(key);
        }
      });
    });
    return Array.from(keys).sort(); // Alphabetical sort
  }, [products]);

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

    // Dynamic Specification filters
    // We only keep products that have the parsed specification AND the value is >= the filtered value
    Object.entries(specFilters).forEach(([filterKey, filterVal]) => {
      if (filterVal) { // skip empty values
        if (filterKey === "hasCNC") {
          // Special handling for the boolean CNC filter
          filtered = filtered.filter((product) => {
            const specs = parseSpecifications(product.specifications);
            return specs.hasCNC || /CNC|cnc/i.test(product.category) || /CNC|cnc/i.test(product.title);
          });
        } else {
          const filterNum = parseFloat(filterVal);
          if (!isNaN(filterNum)) {
            filtered = filtered.filter((product) => {
              const specs = parseSpecifications(product.specifications);
              const prodSpecVal = parseFloat(String(specs[filterKey]));
              // If product doesn't have the spec or it's unparseable, we reject it from the filter.
              // If it does have it, it must be greater than or equal to user input constraint.
              return !isNaN(prodSpecVal) && prodSpecVal >= filterNum;
            });
          }
        }
      }
    });

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

  // Derived state to check if ANY spec filter is active
  const hasActiveSpecFilters = Object.values(specFilters).some(v => v !== "");

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-lightGray via-white to-brand-steel/5 py-12">
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

      {/* Main Content with Sidebar */}
      <div className="flex flex-col lg:flex-row gap-6 py-6 bg-gradient-to-br from-white to-brand-lightGray">
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden px-6">
          <Button
            variant="secondary"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 font-candara"
          >
            <Filter className="w-4 h-4" />
            {sidebarOpen ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {/* Desktop Sidebar Toggle Button (when collapsed) */}
        {sidebarCollapsed && (
          <div className="hidden lg:flex flex-shrink-0">
            <Button
              variant="secondary"
              onClick={() => setSidebarCollapsed(false)}
              className="h-12 w-12 p-0 rounded-lg shadow-lg"
              title="Show Filters"
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Sidebar Filters */}
        <motion.aside
          initial={false}
          animate={{
            width: sidebarCollapsed ? 0 : "auto",
            opacity: sidebarCollapsed ? 0 : 1,
            marginRight: sidebarCollapsed ? 0 : undefined,
          }}
          transition={{ duration: 0.3 }}
          className={`
            ${sidebarOpen ? "block" : "hidden"} lg:block
            ${sidebarCollapsed ? "lg:w-0 lg:overflow-hidden lg:p-0 lg:border-0" : "w-full lg:w-80"}
            flex-shrink-0
            bg-gradient-to-br from-white via-white to-brand-lightGray/30
            rounded-xl shadow-xl border border-gray-200/50
            p-6 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto
            backdrop-blur-sm
            transition-all duration-300
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <h2 className={`text-xl font-bold text-brand-darkBlue font-candara flex items-center gap-2 ${sidebarCollapsed ? "lg:hidden" : ""}`}>
              <div className="w-8 h-8 bg-gradient-to-br from-brand-orange to-brand-orange/80 rounded-lg flex items-center justify-center">
                <Filter className="w-4 h-4 text-white" />
              </div>
              Filters
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex text-brand-gray hover:text-brand-darkBlue transition-colors p-1.5 rounded-lg hover:bg-gray-100"
                title={sidebarCollapsed ? "Expand Filters" : "Collapse Filters"}
              >
                {sidebarCollapsed ? (
                  <Filter className="w-5 h-5" />
                ) : (
                  <X className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-brand-gray hover:text-brand-darkBlue transition-colors p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Filters Count */}
          {!sidebarCollapsed && (
            <>
              {(selectedCategory !== "all" || dateFilter !== "all" || hasActiveSpecFilters) && (
                <div className="mb-4 p-3 bg-brand-orange/10 rounded-lg border border-brand-orange/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-brand-darkBlue font-nunito">
                      Active Filters
                    </span>
                    <button
                      onClick={() => {
                        setSelectedCategory("all");
                        setDateFilter("all");
                        setSpecFilters({});
                      }}
                      className="text-xs text-brand-orange hover:text-brand-darkBlue font-nunito flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Clear All
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {/* Category Filter - Collapsible */}
                <div className="bg-white/80 rounded-lg border border-gray-200/50 overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleSection("category")}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-brand-orange" />
                      <span className="text-sm font-semibold text-brand-darkBlue font-inter">
                        Category
                      </span>
                    </div>
                    {expandedSections.category ? (
                      <ChevronUp className="w-4 h-4 text-brand-gray" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-brand-gray" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedSections.category && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4">
                          <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent font-nunito text-sm bg-white"
                          >
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Date Filter - Collapsible */}
                <div className="bg-white/80 rounded-lg border border-gray-200/50 overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleSection("date")}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brand-orange" />
                      <span className="text-sm font-semibold text-brand-darkBlue font-inter">
                        Date Added
                      </span>
                    </div>
                    {expandedSections.date ? (
                      <ChevronUp className="w-4 h-4 text-brand-gray" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-brand-gray" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedSections.date && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4">
                          <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent font-nunito text-sm bg-white"
                          >
                            <option value="all">All Dates</option>
                            <option value="week">Last Week</option>
                            <option value="month">Last Month</option>
                            <option value="quarter">Last 3 Months</option>
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sort Filter - Collapsible */}
                <div className="bg-white/80 rounded-lg border border-gray-200/50 overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleSection("sort")}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <SortAsc className="w-4 h-4 text-brand-orange" />
                      <span className="text-sm font-semibold text-brand-darkBlue font-inter">
                        Sort By
                      </span>
                    </div>
                    {expandedSections.sort ? (
                      <ChevronUp className="w-4 h-4 text-brand-gray" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-brand-gray" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedSections.sort && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4">
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent font-nunito text-sm bg-white"
                          >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="name">Name (A-Z)</option>
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Specification Filters - Collapsible */}
                {availableSpecKeys.length > 0 && (
                  <div className="bg-white/80 rounded-lg border border-gray-200/50 overflow-hidden shadow-sm">
                    <button
                      onClick={() => toggleSection("specs")}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4 text-brand-orange" />
                        <span className="text-sm font-semibold text-brand-darkBlue font-inter">
                          Specifications
                        </span>
                        {hasActiveSpecFilters && (
                          <span className="ml-2 px-2 py-0.5 bg-brand-orange/20 text-brand-orange text-xs rounded-full font-nunito">
                            Active
                          </span>
                        )}
                      </div>
                      {expandedSections.specs ? (
                        <ChevronUp className="w-4 h-4 text-brand-gray" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-brand-gray" />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedSections.specs && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-4 pt-2">
                            {/* Dynamic Filters */}
                            {availableSpecKeys.map((key) => (
                              <div key={key}>
                                <label className="block text-xs text-brand-gray mb-1.5 font-nunito font-medium">
                                  Min {key}
                                </label>
                                <input
                                  type="number"
                                  placeholder={`e.g. 100`}
                                  value={specFilters[key] || ""}
                                  onChange={(e) =>
                                    setSpecFilters({ ...specFilters, [key]: e.target.value })
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent font-nunito text-sm bg-white"
                                />
                              </div>
                            ))}

                            {/* CNC Filter */}
                            <div>
                              <label className="flex items-center space-x-2 cursor-pointer group">
                                <input
                                  type="checkbox"
                                  checked={specFilters.hasCNC === "true"}
                                  onChange={(e) =>
                                    setSpecFilters({ ...specFilters, hasCNC: e.target.checked ? "true" : "" })
                                  }
                                  className="w-4 h-4 text-brand-orange border-gray-300 rounded focus:ring-brand-orange focus:ring-2"
                                />
                                <span className="text-sm text-brand-gray font-nunito group-hover:text-brand-darkBlue transition-colors">
                                  CNC Only
                                </span>
                              </label>
                            </div>

                            {/* Clear Spec Filters */}
                            {hasActiveSpecFilters && (
                              <button
                                onClick={() => setSpecFilters({})}
                                className="w-full px-3 py-2 text-sm text-brand-orange hover:text-white hover:bg-brand-orange rounded-lg font-nunito transition-all duration-200 border border-brand-orange/30"
                              >
                                Clear Spec Filters
                              </button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.aside>

        {/* Products Grid */}
        <div className="flex-1 px-6">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-brand-gray font-nunito">
                No products found matching your filters.
              </p>
            </div>
          ) : (
            <>
              {/* Products Header with Count and Grid Toggle */}
              <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-sm text-brand-gray font-nunito">
                  Showing <span className="font-semibold text-brand-darkBlue">{filteredAndSortedProducts.length}</span> of <span className="font-semibold text-brand-darkBlue">{products.length}</span> products
                </div>
                <div className="flex items-center gap-4">
                  {/* Mobile Grid Toggle (1 or 2 columns) */}
                  <div className="flex items-center gap-2 lg:hidden">
                    <span className="text-xs text-brand-gray font-nunito">Grid:</span>
                    <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
                      <button
                        onClick={() => setMobileGridColumns(1)}
                        className={`p-2 rounded transition-all ${mobileGridColumns === 1
                          ? "bg-brand-orange text-white shadow-sm"
                          : "text-brand-gray hover:text-brand-darkBlue hover:bg-gray-50"
                          }`}
                        title="1 Column"
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setMobileGridColumns(2)}
                        className={`p-2 rounded transition-all ${mobileGridColumns === 2
                          ? "bg-brand-orange text-white shadow-sm"
                          : "text-brand-gray hover:text-brand-darkBlue hover:bg-gray-50"
                          }`}
                        title="2 Columns"
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {/* Desktop Grid Toggle (3 or 4 columns) */}
                  <div className="hidden lg:flex items-center gap-2">
                    <span className="text-xs text-brand-gray font-nunito">Grid:</span>
                    <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
                      <button
                        onClick={() => setGridColumns(3)}
                        className={`p-2 rounded transition-all ${gridColumns === 3
                          ? "bg-brand-orange text-white shadow-sm"
                          : "text-brand-gray hover:text-brand-darkBlue hover:bg-gray-50"
                          }`}
                        title="3 Columns"
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setGridColumns(4)}
                        className={`p-2 rounded transition-all ${gridColumns === 4
                          ? "bg-brand-orange text-white shadow-sm"
                          : "text-brand-gray hover:text-brand-darkBlue hover:bg-gray-50"
                          }`}
                        title="4 Columns"
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`grid gap-8 ${mobileGridColumns === 1
                ? "grid-cols-1"
                : "grid-cols-2"
                } md:grid-cols-2 ${gridColumns === 3
                  ? "xl:grid-cols-3"
                  : "xl:grid-cols-4"
                }`}>
                {filteredAndSortedProducts.map((product) => {
                  const IconComponent =
                    categoryIconMap[product.category] || Settings;
                  const imageUrl = product.images?.[0]
                    ? urlFor(product.images[0]).width(600).height(400).url()
                    : null;

                  return (
                    <Card
                      key={product._id}
                      className="group hover:shadow-2xl transition-all duration-300 bg-white border border-gray-200 hover:border-brand-orange/40 flex flex-col h-full overflow-hidden"
                    >
                      {/* Hero Image */}
                      <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        {imageUrl ? (
                          <>
                            <Image
                              src={imageUrl}
                              alt={product.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                            {product.category}
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
                          {product.title}
                        </CardTitle>

                        <CardDescription className="text-sm text-brand-gray font-nunito leading-relaxed mb-4 line-clamp-2">
                          {product.description}
                        </CardDescription>

                        <div className="space-y-3 flex-1">
                          {product.specifications && (
                            <div className="bg-brand-lightGray/50 rounded-lg p-3 border border-gray-100">
                              <div className="text-xs font-semibold text-brand-darkBlue mb-1 font-inter uppercase tracking-wide">
                                Specifications
                              </div>
                              <div className="text-xs text-brand-gray font-nunito line-clamp-2">
                                {product.specifications}
                              </div>
                            </div>
                          )}

                          {product.features && product.features.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {product.features.slice(0, 3).map((feature, featureIndex) => (
                                <span
                                  key={featureIndex}
                                  className="px-2.5 py-1 bg-brand-orange/10 text-brand-orange text-xs font-medium rounded-md font-nunito border border-brand-orange/20"
                                >
                                  {feature}
                                </span>
                              ))}
                              {product.features.length > 3 && (
                                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md font-nunito border border-gray-200">
                                  +{product.features.length - 3}
                                </span>
                              )}
                            </div>
                          )}

                          {product.dateAdded && (
                            <div className="text-xs text-gray-500 font-nunito pt-3 border-t border-gray-100 mt-auto flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>Added {formatDate(product.dateAdded)}</span>
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
                            href={`/products/${product.slug?.current || product._id}`}
                            className="flex gap-2"
                          >
                            <span>View Details</span>
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
      </div>

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

