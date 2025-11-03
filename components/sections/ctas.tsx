"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, DollarSign, Phone, Mail } from "lucide-react";

const CTAs = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-brand-navy via-brand-steel to-brand-darkBlue">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Looking to Buy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-white to-brand-lightGray border-0 shadow-2xl h-full">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-orange to-brand-accent rounded-xl flex items-center justify-center mb-6">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-brand-darkBlue mb-4 font-montserrat">
                  Looking to <span className="text-brand-orange">Buy?</span>
                </h3>
                <p className="text-brand-gray mb-6 leading-relaxed font-nunito">
                  Browse our extensive inventory of premium used machine tools. 
                  All machines are carefully inspected and come with detailed specifications. 
                  Find the perfect machine for your manufacturing needs.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-orange/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-darkBlue font-inter">Premium Quality</h4>
                      <p className="text-sm text-brand-gray font-nunito">Imported from Europe and UK</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-orange/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-darkBlue font-inter">Expert Support</h4>
                      <p className="text-sm text-brand-gray font-nunito">Technical consultation and after-sales support</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-orange/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-darkBlue font-inter">Competitive Pricing</h4>
                      <p className="text-sm text-brand-gray font-nunito">Fair and reasonable prices for quality machines</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1 bg-gradient-to-r from-brand-orange to-brand-accent hover:from-brand-orange/90 hover:to-brand-accent/90 text-white font-inter">
                    Browse Machines
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button className="flex-1 border-2 border-brand-steel text-brand-steel hover:bg-brand-steel hover:text-white font-inter">
                    <Phone className="mr-2 w-4 h-4" />
                    Call Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Looking to Sell */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-white to-brand-lightGray border-0 shadow-2xl h-full">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-accent to-brand-steel rounded-xl flex items-center justify-center mb-6">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-brand-darkBlue mb-4 font-montserrat">
                  Looking to <span className="text-brand-orange">Sell?</span>
                </h3>
                <p className="text-brand-gray mb-6 leading-relaxed font-nunito">
                  Have a machine tool to sell? We're always looking to expand our inventory 
                  with quality used machines. Get a fair valuation and quick transaction 
                  for your industrial equipment.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 bg-brand-accent rounded-full"></span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-darkBlue font-inter">Fair Valuation</h4>
                      <p className="text-sm text-brand-gray font-nunito">Expert assessment of your machine's value</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 bg-brand-accent rounded-full"></span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-darkBlue font-inter">Quick Process</h4>
                      <p className="text-sm text-brand-gray font-nunito">Fast evaluation and payment process</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 bg-brand-accent rounded-full"></span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-darkBlue font-inter">We Handle Everything</h4>
                      <p className="text-sm text-brand-gray font-nunito">Inspection, logistics, and payment</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1 bg-gradient-to-r from-brand-accent to-brand-steel hover:from-brand-accent/90 hover:to-brand-steel/90 text-white font-inter">
                    Sell Your Machine
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button className="flex-1 border-2 border-brand-steel text-brand-steel hover:bg-brand-steel hover:text-white font-inter">
                    <Mail className="mr-2 w-4 h-4" />
                    Email Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTAs;
