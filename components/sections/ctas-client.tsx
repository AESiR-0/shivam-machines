"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, DollarSign, Phone, Mail } from "lucide-react";
import type { CTA } from "@/lib/sanity/types";
import Link from "next/link";

interface CTAsClientProps {
  ctas: CTA[];
}

const CTAsClient = ({ ctas }: CTAsClientProps) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Use CTAs from Sanity or show default "Buy/Sell" cards
  const displayCTAs = ctas.length > 0 ? ctas : [];

  // If no CTAs from Sanity, show default buy/sell cards
  if (displayCTAs.length === 0) {
    return (
      <section className="py-24 bg-brand-darkBlue">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Looking to Buy */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onHoverStart={() => setHoveredCard(1)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="bg-gradient-to-br from-white to-brand-lightGray border-0 shadow-2xl h-full cursor-pointer overflow-hidden group">
                  <CardContent className="p-8">
                    <motion.div
                      className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 shadow-lg"
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ShoppingCart className="w-8 h-8 text-brand-darkBlue" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-brand-darkBlue mb-4 font-candara">
                      Looking to <span className="text-brand-darkBlue inline-block">Buy?</span>
                    </h3>
                    <p className="text-brand-gray mb-6 leading-relaxed font-calibri">
                      Browse our extensive inventory of premium used machine tools. 
                      All machines are carefully inspected and come with detailed specifications.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="secondary" className="flex-1 font-candara" asChild>
                        <Link href="/products">Browse Machines</Link>
                      </Button>
                      <Button variant="primary" className="flex-1 font-candara" asChild>
                        <Link href="tel:+919824080055">Call Us</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Looking to Sell */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onHoverStart={() => setHoveredCard(2)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="bg-gradient-to-br from-white to-brand-lightGray border-0 shadow-2xl h-full cursor-pointer overflow-hidden group">
                  <CardContent className="p-8">
                    <motion.div
                      className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 shadow-lg"
                      whileHover={{ rotate: [0, 10, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <DollarSign className="w-8 h-8 text-brand-darkBlue" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-brand-darkBlue mb-4 font-candara">
                      Looking to <span className="text-brand-darkBlue inline-block">Sell?</span>
                    </h3>
                    <p className="text-brand-gray mb-6 leading-relaxed font-calibri">
                      Have a machine tool to sell? We're always looking to expand our inventory 
                      with quality used machines. Get a fair valuation and quick transaction.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="secondary" className="flex-1 font-candara" asChild>
                        <Link href="/contact">Sell Your Machine</Link>
                      </Button>
                      <Button variant="primary" className="flex-1 font-candara" asChild>
                        <Link href="mailto:shivamenterprise@yahoo.com">Email Us</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // Render CTAs from Sanity
  return (
    <section className="py-24 bg-brand-darkBlue">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {displayCTAs.map((cta, index) => (
            <motion.div
              key={cta._id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="bg-gradient-to-br from-white to-brand-lightGray border-0 shadow-2xl hover:shadow-3xl h-full transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold text-brand-darkBlue mb-4 font-candara">
                    {cta.title}
                  </h3>
                  {cta.description && (
                    <p className="text-brand-gray mb-6 leading-relaxed font-calibri">
                      {cta.description}
                    </p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {cta.primaryButtonText && (
                      <Button variant="secondary" className="flex-1 flex items-center gap-2 font-candara" asChild>
                        <Link href={cta.primaryButtonLink || "#"}>
                          {cta.primaryButtonText}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                    {cta.secondaryButtonText && (
                      <Button variant="primary" className="flex-1 font-candara" asChild>
                        <Link href={cta.secondaryButtonLink || "#"}>
                          {cta.secondaryButtonText}
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTAsClient;

