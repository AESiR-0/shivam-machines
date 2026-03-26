"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  getMachineCategoryDisplayName,
  getMachineCategoryId,
  getProductCategoryKey,
  getProductCategoryName,
} from "@/lib/category-utils";
import { urlFor } from "@/lib/sanity/image";
import type { Product, MachineToolCategory } from "@/lib/sanity/types";

interface ProductsListingClientProps {
  products: Product[];
  categories: MachineToolCategory[];
}

function ProductsContent({ products, categories: sanityCategories }: ProductsListingClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const initialCategory = searchParams.get("category") || "all";
  const initialSubcategory = searchParams.get("subcategory") || "all";
 
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSubcategory);
 
  // Sync state with URL when search params change (e.g. back button)
  React.useEffect(() => {
    const cat = searchParams.get("category") || "all";
    const subcat = searchParams.get("subcategory") || "all";
    
    if (cat !== selectedCategory) {
      setSelectedCategory(cat);
    }
    if (subcat !== selectedSubcategory) {
      setSelectedSubcategory(subcat);
    }
  }, [searchParams, selectedCategory, selectedSubcategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory("all"); // Reset subcategory when category changes
    
    const params = new URLSearchParams(searchParams.toString());
    params.delete("subcategory"); // Clear subcategory param
    
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    const params = new URLSearchParams(searchParams.toString());
    if (subcategory === "all") {
      params.delete("subcategory");
    } else {
      params.set("subcategory", subcategory);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Specification Filters State
  const [specFilters, setSpecFilters] = useState<Record<string, string>>({});

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    subcategory: true,
    specs: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };


  // Get unique dynamically available numeric specifications
  const availableSpecKeys = useMemo(() => {
    const keys = new Set<string>();
    products.forEach(p => {
      // Safely access technical specs
      const techSpecs = (p.technicalSpecs as Record<string, string>) || {};
      Object.entries(techSpecs).forEach(([key, val]) => {
        // Strip string components from numeric specs and parse
        // e.g. "1000 mm" -> 1000
        const numericMatch = val?.match(/(\d+(?:\.\d+)?)/);
        if (numericMatch) {
          keys.add(key);
        }
      });
    });
    return Array.from(keys).sort(); // Alphabetical sort
  }, [products]);
  const isProductInCategory = useCallback((product: Product, selectedCatId: string) => {
    if (!product.category) return false;

    const prodCat = getProductCategoryKey(product.category);
    const selCat = selectedCatId.toLowerCase().trim();

    if (!prodCat || !selCat) {
      return false;
    }

    const matchedCat = (sanityCategories || []).find(
      (category) => getMachineCategoryId(category) === selCat,
    );

    if (matchedCat) {
      return prodCat === getMachineCategoryId(matchedCat);
    }

    return prodCat === selCat;
  }, [sanityCategories]);

  // Combined product filtering and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => isProductInCategory(product, selectedCategory));
    }

    // Subcategory filter
    if (selectedSubcategory !== "all") {
      filtered = filtered.filter(
        (product) => product.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase()
      );
    }

    // Dynamic Specification filters
    Object.entries(specFilters).forEach(([filterKey, filterVal]) => {
      if (filterVal) {
        if (filterKey === "hasCNC") {
          filtered = filtered.filter((product) => {
            const techSpecs = (product.technicalSpecs as Record<string, string>) || {};
            const oldSpecs = product.specifications || "";
            const title = product.title || "";
            const cat = product.category.name || "";

            return techSpecs.controlSystem?.toLowerCase().includes("cnc") ||
              oldSpecs.toLowerCase().includes("cnc") ||
              title.toLowerCase().includes("cnc") ||
              cat.toLowerCase().includes("cnc");
          });
        } else {
          const filterNum = parseFloat(filterVal);
          if (!Number.isNaN(filterNum)) {
            filtered = filtered.filter((product) => {
              const techSpecs = (product.technicalSpecs as Record<string, string>) || {};
              const rawSpecVal = techSpecs[filterKey];

              if (!rawSpecVal) return false;

              const numericMatch = String(rawSpecVal).match(/(\d+(?:\.\d+)?)/);
              if (!numericMatch) return false;

              const prodSpecVal = parseFloat(numericMatch[1]);
              return !Number.isNaN(prodSpecVal) && prodSpecVal >= filterNum;
            });
          }
        }
      }
    });

    return filtered;
  }, [products, selectedCategory, selectedSubcategory, specFilters, isProductInCategory]);

  // Show categories from Sanity only
  const categories = useMemo(() => {
    const uniqueSanityMap = new Map();
    (sanityCategories || []).forEach(cat => {
      const key = getMachineCategoryId(cat);
      if (!uniqueSanityMap.has(key)) {
        uniqueSanityMap.set(key, cat);
      }
    });

    const fromSanity = Array.from(uniqueSanityMap.values()).map((cat) => ({
      id: getMachineCategoryId(cat),
      name: getMachineCategoryDisplayName(cat),
      original: cat
    }));

    return [
      { id: "all", name: "All Categories" },
      ...fromSanity.map(({ id, name }) => ({ id, name })),
    ];
  }, [sanityCategories]);

  // Derive unique subcategories based on current products and category
  const subcategories = useMemo(() => {
    const subSet = new Set<string>();
    
    // Use products filtered ONLY by category to show relevant subcategories
    let categoryFiltered = products;
    if (selectedCategory !== "all") {
      categoryFiltered = categoryFiltered.filter(p => isProductInCategory(p, selectedCategory));
    }

    categoryFiltered.forEach(p => {
      if (p.subcategory) subSet.add(p.subcategory);
    });

    return [
      { id: "all", name: "All Subcategories" },
      ...Array.from(subSet).sort().map(sub => ({ id: sub.toLowerCase(), name: sub }))
    ];
  }, [products, selectedCategory, isProductInCategory]);

  // Derived state to check if ANY spec filter is active
  const hasActiveSpecFilters = Object.values(specFilters).some(v => v !== "");

  return (
    <main className="min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-lightGray via-white to-brand-steel/5 pt-12 pb-12">
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
              Filter
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
            <h2 className={`text-xl font-bold text-brand-darkBlue font-candara ${sidebarCollapsed ? "lg:hidden" : ""}`}>
              Filters
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex text-brand-gray hover:text-brand-darkBlue transition-colors p-1.5 rounded-lg hover:bg-gray-100"
                title={sidebarCollapsed ? "Expand" : "Collapse"}
              >
                {sidebarCollapsed ? "Filter" : "Close"}
              </button>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-brand-gray hover:text-brand-darkBlue transition-colors p-1 rounded-lg hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>

          {/* Active Filters Count */}
          {!sidebarCollapsed && (
            <>
              {(selectedCategory !== "all" || selectedSubcategory !== "all" || hasActiveSpecFilters) && (
                <div className="mb-4 p-3 bg-brand-orange/10 rounded-lg border border-brand-orange/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-brand-darkBlue font-nunito">
                      Active Filters
                    </span>
                    <button
                      onClick={() => {
                        setSelectedCategory("all");
                        setSelectedSubcategory("all");
                        setSpecFilters({});
                        const params = new URLSearchParams(searchParams.toString());
                        params.delete("category");
                        params.delete("subcategory");
                        router.push(`${pathname}?${params.toString()}`, { scroll: false });
                      }}
                      className="text-xs text-brand-orange hover:text-brand-darkBlue font-nunito transition-colors"
                    >
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
                    <span className="text-sm font-semibold text-brand-darkBlue font-inter">
                      Category
                    </span>
                    <span className="text-xs text-brand-gray">
                      {expandedSections.category ? "Hide" : "Show"}
                    </span>
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
                            onChange={(e) => handleCategoryChange(e.target.value)}
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

                {/* Subcategory Filter - Collapsible */}
                {subcategories.length > 1 && (
                  <div className="bg-white/80 rounded-lg border border-gray-200/50 overflow-hidden shadow-sm">
                    <button
                      onClick={() => toggleSection("subcategory")}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-brand-darkBlue font-inter">
                        Subcategory
                      </span>
                      <span className="text-xs text-brand-gray">
                        {expandedSections.subcategory ? "Hide" : "Show"}
                      </span>
                    </button>
                    <AnimatePresence>
                      {expandedSections.subcategory && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4">
                            <select
                              value={selectedSubcategory}
                              onChange={(e) => handleSubcategoryChange(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent font-nunito text-sm bg-white"
                            >
                              {subcategories.map((sub) => (
                                <option key={sub.id} value={sub.id}>
                                  {sub.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Specification Filters - Collapsible */}
                {availableSpecKeys.length > 0 && (
                  <div className="bg-white/80 rounded-lg border border-gray-200/50 overflow-hidden shadow-sm">
                    <button
                      onClick={() => toggleSection("specs")}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-brand-darkBlue font-inter">
                          Specifications
                        </span>
                        {hasActiveSpecFilters && (
                          <span className="ml-2 px-2 py-0.5 bg-brand-orange/20 text-brand-orange text-xs rounded-full font-nunito">
                            Active
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-brand-gray">
                        {expandedSections.specs ? "Hide" : "Show"}
                      </span>
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
              {/* Products Header with Count */}
              <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-sm text-brand-gray font-nunito">
                  Showing <span className="font-semibold text-brand-darkBlue">{filteredAndSortedProducts.length}</span> of <span className="font-semibold text-brand-darkBlue">{products.length}</span> products
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredAndSortedProducts.map((product) => {
                  const imageUrl = product.images?.[0]
                    ? urlFor(product.images[0]).width(600).height(400).url()
                    : null;

                  return (
                    <Link
                      key={product._id}
                      href={`/products/${product.slug?.current || product._id}`}
                      className="flex"
                    >
                      <Card className="group hover:shadow-2xl transition-all duration-300 bg-white border border-gray-200 hover:border-brand-orange/40 flex flex-col h-full overflow-hidden w-full">
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
                            <div className="w-full h-full flex items-center justify-center p-4 text-center text-gray-400 text-xs font-nunito">
                              No Image Available
                            </div>
                          )}

                          {/* Category Badge Overlay */}
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-brand-darkBlue text-xs font-semibold rounded-full capitalize shadow-sm font-nunito">
                              {getProductCategoryName(product.category)}
                            </span>
                          </div>
                        </div>

                        <CardHeader className="p-6 flex-1 flex flex-col">
                          <div className="mb-4">
                            <CardTitle className="text-xl font-bold text-brand-darkBlue mb-1 font-inter line-clamp-2 group-hover:text-brand-blue transition-colors">
                              {product.title}
                            </CardTitle>
                            {product.subcategory && (
                              <div className="text-sm font-semibold text-brand-gray/80 font-nunito">
                                {product.subcategory}
                              </div>
                            )}
                          </div>

                          {/* Blue Divider */}
                          <div className="w-full h-px bg-brand-blue/20 mb-4" />

                          <div className="space-y-2 flex-1">
                            {product.technicalSpecs && Object.entries(product.technicalSpecs).length > 0 ? (
                              <div className="grid grid-cols-1 gap-1.5">
                                {Object.entries(product.technicalSpecs)
                                  .filter(([_, value]) => value !== undefined && value !== null && value !== "")
                                  .slice(0, 5)
                                  .map(([key, value], idx) => (
                                    <div key={idx} className="flex justify-between items-center text-xs font-nunito border-b border-gray-50 pb-1">
                                      <span className="text-brand-gray font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                      <span className="text-brand-darkBlue font-semibold text-right">{value}</span>
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <CardDescription className="text-sm text-brand-gray font-nunito leading-relaxed line-clamp-3">
                                {product.description}
                              </CardDescription>
                            )}
                          </div>
                        </CardHeader>

                        <CardContent className="p-6 pt-0 mt-auto border-t border-gray-100">
                          <div
                            className="w-full bg-brand-orange text-white text-center py-2.5 rounded-lg font-candara text-sm font-medium transition-colors group-hover:bg-brand-darkBlue"
                          >
                            View Details
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

    </main>
  );
}

export default function ProductsListingClient({ products, categories }: ProductsListingClientProps) {
  return (
    <ProductsContent products={products} categories={categories} />
  );
}

