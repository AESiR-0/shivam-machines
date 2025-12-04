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
              const IconComponent = categoryIconMap[product.category] || Settings;
              return (
                <motion.div 
                  key={product._id} 
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-brand-orange/20">
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
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-8 pt-0">
                      <Button 
                        variant="primary"
                        className="w-full font-nunito"
                        asChild
                      >
                        <Link href={`/products/${product.slug?.current || '#'}`}>
                          View Details
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
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
                    className="bg-brand-orange hover:bg-accent-600 text-white px-8 py-4 rounded-lg font-medium text-lg" 
                    size="lg"
                    asChild
                  >
                    <a href={cta.primaryButtonLink || "/products"}>
                      {cta.primaryButtonText}
                      <ArrowRight className="ml-2 w-5 h-5" />
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

