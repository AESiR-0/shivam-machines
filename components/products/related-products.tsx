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
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg font-semibold text-brand-darkBlue mb-2 font-inter line-clamp-2 group-hover:text-brand-orange transition-colors">
                        {product.title}
                      </CardTitle>
                      {product.price && (
                        <div className="text-xl font-bold text-brand-darkBlue font-candara">
                          {product.price}
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="p-4 pt-0 mt-auto">
                      <Button
                        variant="primary"
                        className="w-full flex items-center gap-2 font-calibri text-sm"
                        asChild
                      >
                        <div>
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </Button>
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

