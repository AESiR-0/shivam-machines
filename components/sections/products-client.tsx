"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Settings, Wrench, Cog, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product, CTA } from "@/lib/sanity/types";
import Link from "next/link";

interface ProductsClientProps {
  products: Product[];
  cta: CTA | null;
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

const ProductsClient = ({ products, cta }: ProductsClientProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  // Use products from Sanity or empty array
  const displayProducts = products.length > 0 ? products : [];

  return (
    <section className="py-24 bg-gradient-to-br from-brand-lightGray to-brand-steel/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-brand-darkBlue mb-6 font-montserrat">
            Our <span className="text-brand-orange">Machine Tools</span>
          </h2>
          <p className="text-xl text-brand-gray max-w-4xl mx-auto font-nunito leading-relaxed">
            Premium used machine tools for precision manufacturing. 
            From cylindrical grinding to CNC machining centers, we provide 
            reliable solutions for your industrial needs.
          </p>
        </motion.div>

        {/* Products Grid */}
        {displayProducts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayProducts.map((product) => {
              const IconComponent = categoryIconMap[product.category.slug] || Settings;
              return (
                <motion.div 
                  key={product._id} 
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    href={`/products/${product.slug?.current || product._id}`}
                    className="flex h-full"
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-brand-orange/20 w-full overflow-hidden flex flex-col">
                        <CardHeader className="p-8 flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-6 h-6 text-brand-orange" />
                            </div>
                            <span className="text-sm text-brand-gray font-nunito bg-brand-lightGray px-3 py-1 rounded-full capitalize">
                              {product.category.name}
                            </span>
                          </div>
                          
                          <div className="mb-4">
                            <CardTitle className="text-xl font-bold text-brand-darkBlue mb-1 font-inter group-hover:text-brand-blue transition-colors">
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

                          <div className="space-y-2">
                            {product.technicalSpecs && Object.entries(product.technicalSpecs).length > 0 ? (
                              <div className="grid grid-cols-1 gap-1.5">
                                {Object.entries(product.technicalSpecs)
                                  .filter(([_, value]) => value !== undefined && value !== null && value !== "")
                                  .slice(0, 5)
                                  .map(([key, value], idx) => (
                                    <div key={idx} className="flex justify-between items-center text-xs font-inter border-b border-gray-50 pb-1">
                                      <span className="text-brand-gray font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                      <span className="text-brand-darkBlue font-semibold text-right">{value}</span>
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <CardDescription className="text-brand-gray font-nunito leading-relaxed line-clamp-3">
                                {product.description}
                              </CardDescription>
                            )}
                          </div>
                        </CardHeader>
                      
                      <CardContent className="p-8 pt-0 mt-auto border-t border-gray-50">
                        <div
                          className="w-full bg-brand-orange text-white text-center py-2.5 rounded-lg font-nunito font-medium transition-colors group-hover:bg-brand-darkBlue flex items-center justify-center gap-2"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-brand-gray text-lg">No products available at the moment.</p>
          </div>
        )}

        {/* CTA Section */}
        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mt-20"
          >
            <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
              <h3 className="text-3xl font-bold text-brand-darkBlue mb-6 font-montserrat">
                {cta.title || "Looking for Something Specific?"}
              </h3>
              <p className="text-brand-gray mb-8 max-w-2xl mx-auto text-lg font-nunito">
                {cta.description || "Our extensive inventory includes machines from leading manufacturers. Contact us to find the perfect solution for your manufacturing needs."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {cta.primaryButtonText && (
                  <Button 
                    className="bg-brand-orange hover:bg-accent-600 text-white px-8 py-4 rounded-lg font-medium text-lg flex items-center gap-2" 
                    size="lg"
                    asChild
                  >
                    <a href={cta.primaryButtonLink || "/products"}>
                      {cta.primaryButtonText}
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                )}
                {cta.secondaryButtonText && (
                  <Button 
                    className="border-2 border-brand-gray text-brand-gray hover:bg-brand-gray hover:text-white px-8 py-4 rounded-lg font-medium text-lg" 
                    size="lg"
                    asChild
                  >
                    <a href={cta.secondaryButtonLink || "/contact"}>
                      {cta.secondaryButtonText}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductsClient;

