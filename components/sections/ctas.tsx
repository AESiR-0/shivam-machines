"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, DollarSign, Phone, Mail } from "lucide-react";

const CTAs = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
                    <motion.div
                      animate={hoveredCard === 1 ? { rotate: [0, 5, -5, 5, 0] } : {}}
                      transition={{ duration: 0.6, repeat: hoveredCard === 1 ? Infinity : 0, repeatDelay: 2 }}
                    >
                      <ShoppingCart className="w-8 h-8 text-brand-darkBlue" />
                    </motion.div>
                  </motion.div>
                  <motion.h3
                    className="text-3xl font-bold text-brand-darkBlue mb-4 font-candara"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    Looking to <motion.span
                      className="text-brand-darkBlue inline-block"
                      whileHover={{ scale: 1.1, x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >Buy?</motion.span>
                  </motion.h3>
                  <motion.p
                    className="text-brand-gray mb-6 leading-relaxed font-calibri"
                    initial={{ opacity: 0.9 }}
                    whileHover={{ opacity: 1 }}
                  >
                    Browse our extensive inventory of premium used machine tools. 
                    All machines are carefully inspected and come with detailed specifications. 
                    Find the perfect machine for your manufacturing needs.
                  </motion.p>
                  <div className="space-y-4 mb-6">
                    {[
                      { title: "Premium Quality", desc: "Imported from Europe and UK" },
                      { title: "Expert Support", desc: "Technical consultation and after-sales support" },
                      { title: "Competitive Pricing", desc: "Fair and reasonable prices for quality machines" }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 4 }}
                      >
                        <motion.div
                          className="w-6 h-6 bg-brand-darkBlue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          whileHover={{ scale: 1.2, rotate: 180 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <motion.span
                            className="w-2 h-2 bg-brand-darkBlue rounded-full"
                            whileHover={{ scale: 1.5 }}
                          />
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-brand-darkBlue font-candara">{item.title}</h4>
                          <p className="text-sm text-brand-gray font-calibri">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="secondary" className="flex-1 font-candara group relative overflow-hidden">
                        <span className="relative z-10 flex items-center gap-2">
                          Browse Machines
                          <motion.span
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.span>
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-brand-darkBlue/5"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="primary" className="flex-1 font-candara group relative overflow-hidden">
                        <motion.span
                          className="flex items-center relative z-10"
                          whileHover={{ scale: 1.05 }}
                        >
                          <motion.span
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          >
                            <Phone className="mr-2 w-4 h-4" />
                          </motion.span>
                          Call Us
                        </motion.span>
                        <motion.div
                          className="absolute inset-0 bg-brand-gray"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Button>
                    </motion.div>
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
                    <motion.div
                      animate={hoveredCard === 2 ? { rotate: [0, -5, 5, -5, 0] } : {}}
                      transition={{ duration: 0.6, repeat: hoveredCard === 2 ? Infinity : 0, repeatDelay: 2 }}
                    >
                      <DollarSign className="w-8 h-8 text-brand-darkBlue" />
                    </motion.div>
                  </motion.div>
                  <motion.h3
                    className="text-3xl font-bold text-brand-darkBlue mb-4 font-candara"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    Looking to <motion.span
                      className="text-brand-darkBlue inline-block"
                      whileHover={{ scale: 1.1, x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >Sell?</motion.span>
                  </motion.h3>
                  <motion.p
                    className="text-brand-gray mb-6 leading-relaxed font-calibri"
                    initial={{ opacity: 0.9 }}
                    whileHover={{ opacity: 1 }}
                  >
                    Have a machine tool to sell? We're always looking to expand our inventory 
                    with quality used machines. Get a fair valuation and quick transaction 
                    for your industrial equipment.
                  </motion.p>
                  <div className="space-y-4 mb-6">
                    {[
                      { title: "Fair Valuation", desc: "Expert assessment of your machine's value" },
                      { title: "Quick Process", desc: "Fast evaluation and payment process" },
                      { title: "We Handle Everything", desc: "Inspection, logistics, and payment" }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: -4 }}
                      >
                        <motion.div
                          className="w-6 h-6 bg-brand-darkBlue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          whileHover={{ scale: 1.2, rotate: -180 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <motion.span
                            className="w-2 h-2 bg-brand-darkBlue rounded-full"
                            whileHover={{ scale: 1.5 }}
                          />
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-brand-darkBlue font-candara">{item.title}</h4>
                          <p className="text-sm text-brand-gray font-calibri">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="secondary" className="flex-1 font-candara group relative overflow-hidden">
                        <span className="relative z-10 flex items-center gap-2">
                          Sell Your Machine
                          <motion.span
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.span>
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-brand-darkBlue/5"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="primary" className="flex-1 font-candara group relative overflow-hidden">
                        <motion.span
                          className="flex items-center relative z-10"
                          whileHover={{ scale: 1.05 }}
                        >
                          <motion.span
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                          >
                            <Mail className="mr-2 w-4 h-4" />
                          </motion.span>
                          Email Us
                        </motion.span>
                        <motion.div
                          className="absolute inset-0 bg-brand-gray"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Button>
                    </motion.div>
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

export default CTAs;
