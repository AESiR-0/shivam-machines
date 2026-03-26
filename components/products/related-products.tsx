"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";
import type { Product } from "@/lib/sanity/types";

interface RelatedProductsProps {
  products: Product[];
  currentSlug: string;
}

export default function RelatedProducts({
  products,
  currentSlug,
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-brand-darkBlue mb-6 font-candara">
        Related Products
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => {
          const imageUrl = product.images?.[0]
            ? urlFor(product.images[0]).width(400).height(300).url()
            : "/api/placeholder/400/300";

          return (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/products/${product.slug.current}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-brand-orange/20 h-full flex flex-col">
                    <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src={imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                    <CardHeader className="p-4 flex-1 flex flex-col">
                      <div className="mb-2">
                        <CardTitle className="text-lg font-bold text-brand-darkBlue mb-1 font-inter line-clamp-2 group-hover:text-brand-blue transition-colors">
                          {product.title}
                        </CardTitle>
                        {product.subcategory && (
                          <div className="text-xs font-semibold text-brand-gray/80 font-nunito">
                            {product.subcategory}
                          </div>
                        )}
                      </div>

                      {/* Blue Divider */}
                      <div className="w-full h-px bg-brand-blue/20 mb-3" />

                      <div className="space-y-1.5 flex-1">
                        {product.technicalSpecs &&
                        Object.entries(product.technicalSpecs).length > 0 ? (
                          <div className="grid grid-cols-1 gap-1">
                            {Object.entries(product.technicalSpecs)
                              .filter(
                                ([_, value]) =>
                                  value !== undefined &&
                                  value !== null &&
                                  value !== "",
                              )
                              .slice(0, 3)
                              .map(([key, value], idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between items-center text-[10px] font-inter border-b border-gray-50 pb-0.5"
                                >
                                  <span className="text-brand-gray font-medium capitalize truncate mr-2">
                                    {key.replace(/([A-Z])/g, " $1").trim()}:
                                  </span>
                                  <span className="text-brand-darkBlue font-semibold text-right truncate">
                                    {value}
                                  </span>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div className="text-[10px] text-brand-gray font-nunito line-clamp-2 opacity-70">
                            {product.category.name}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 mt-auto border-t border-gray-50">
                      <div className="w-full bg-brand-orange text-white text-center py-2 rounded-lg font-nunito text-xs font-medium transition-colors group-hover:bg-brand-darkBlue">
                        View Details
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
