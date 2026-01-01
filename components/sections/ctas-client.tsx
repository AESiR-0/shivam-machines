"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, DollarSign, Phone, Mail, Search } from "lucide-react";
import type { CTA } from "@/lib/sanity/types";
import Link from "next/link";

interface CTAsClientProps {
  ctas: CTA[];
}

const CTAsClient = ({ ctas }: CTAsClientProps) => {
  // Get the first CTA from Sanity, or use default "Looking for Something Specific"
  const sanityCTA = ctas.length > 0 ? ctas[0] : null;

  return (
    <section className="py-12 bg-gradient-to-br from-brand-darkBlue via-brand-darkBlue/95 to-brand-darkBlue relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-orange rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Buy/Sell Combined Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="bg-white border-0 shadow-2xl h-full cursor-pointer overflow-hidden group flex flex-col rounded-3xl">
                <CardContent className="p-10 flex flex-col flex-1 relative">
                  {/* Decorative gradient background */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-orange/5 to-transparent rounded-full blur-3xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <motion.div
                        className="w-20 h-20 bg-gradient-to-br from-brand-darkBlue to-brand-darkBlue/80 rounded-2xl flex items-center justify-center shadow-xl"
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <ShoppingCart className="w-10 h-10 text-white" />
                      </motion.div>
                      <motion.div
                        className="w-20 h-20 bg-gradient-to-br from-brand-orange to-brand-orange/80 rounded-2xl flex items-center justify-center shadow-xl"
                        whileHover={{ rotate: [0, 10, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <DollarSign className="w-10 h-10 text-white" />
                      </motion.div>
                    </div>
                    <h3 className="text-3xl font-bold text-brand-darkBlue mb-5 font-candara">
                      Looking to <span className="text-brand-orange inline-block">Buy or Sell?</span>
                    </h3>
                    <p className="text-brand-gray mb-8 leading-relaxed font-calibri flex-1 text-base">
                      Browse our extensive inventory of premium used machine tools or sell your equipment. 
                      All machines are carefully inspected and come with detailed specifications. 
                      Get a fair valuation and quick transaction for your industrial equipment.
                    </p>
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button variant="secondary" className="flex-1 flex items-center justify-center gap-2 font-candara" asChild>
                          <Link href="/products" className="flex gap-2">
                            <span>Buy Machines</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="secondary" className="flex-1 flex items-center justify-center gap-2 font-candara" asChild>
                          <Link href="/contact" className="flex gap-2">
                            <span>Sell Your Machine</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
 
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Sanity CTA or Default "Looking for Something Specific" */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="bg-white border-0 shadow-2xl h-full cursor-pointer overflow-hidden group flex flex-col rounded-3xl">
                <CardContent className="p-10 flex flex-col flex-1 relative">
                  {/* Decorative gradient background */}
                  <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-brand-darkBlue/5 to-transparent rounded-full blur-3xl"></div>
                  
                  <div className="relative z-10">
                    <motion.div
                      className="w-20 h-20 bg-gradient-to-br from-brand-darkBlue to-brand-darkBlue/80 rounded-2xl flex items-center justify-center mb-8 shadow-xl mx-auto"
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Search className="w-10 h-10 text-white" />
                    </motion.div>
                    {sanityCTA ? (
                      <>
                        <h3 className="text-3xl font-bold text-brand-darkBlue mb-5 font-candara text-center">
                          {sanityCTA.title || "Looking for Something Specific?"}
                        </h3>
                        {sanityCTA.description && (
                          <p className="text-brand-gray mb-8 leading-relaxed font-calibri flex-1 text-base text-center">
                            {sanityCTA.description}
                          </p>
                        )}
                        <div className="flex flex-col gap-3">
                          {sanityCTA.primaryButtonText && (
                            <Button variant="primary" className="w-full flex items-center justify-center gap-2 font-candara" asChild>
                              <Link href={sanityCTA.primaryButtonLink || "#"} className="flex gap-2">
                                <span>{sanityCTA.primaryButtonText}</span>
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </Button>
                          )}
                          {sanityCTA.secondaryButtonText && (
                            <Button variant="secondary" className="w-full flex items-center justify-center gap-2 font-candara" asChild>
                              <Link href={sanityCTA.secondaryButtonLink || "#"}>
                                {sanityCTA.secondaryButtonText}
                              </Link>
                            </Button>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-3xl font-bold text-brand-darkBlue mb-5 font-candara text-center">
                          Looking for Something <span className="text-brand-orange inline-block">Specific?</span>
                        </h3>
                        <p className="text-brand-gray mb-8 leading-relaxed font-calibri flex-1 text-base text-center">
                          Our extensive inventory includes machines from leading manufacturers. Contact us to find the perfect solution for your manufacturing needs.
                        </p>
                        <div className="flex flex-col gap-3">
                          <Button variant="primary" className="w-full flex items-center justify-center gap-2 font-candara" asChild>
                            <Link href="/products" className="flex gap-2">
                              <span>Browse All Machines</span>
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button variant="secondary" className="w-full flex items-center justify-center gap-2 font-candara" asChild>
                            <Link href="/contact">Request Quote</Link>
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTAsClient;
