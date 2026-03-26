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

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingCart,
  DollarSign,
  Search,
  Phone,
  Mail,
  ArrowRight,
};

const CTAsClient = ({ ctas }: CTAsClientProps) => {
  // Helper to append intent to contact links
  const getContactHref = (baseHref: string, buttonText: string) => {
    if (baseHref !== "/contact") return baseHref;
    
    const text = buttonText.toLowerCase();
    if (text.includes("sell")) return "/contact?intent=sell";
    if (text.includes("quote")) return "/contact?intent=quote";
    if (text.includes("buy")) return "/contact?intent=buy";
    return "/contact";
  };

  // If no CTAs from Sanity, use defaults for rendering
  const displayCTAs = ctas.length > 0 ? ctas : [
    {
      _id: "default-1",
      title: "Looking to Buy or Sell?",
      description: "Browse our extensive inventory of premium used machine tools or sell your equipment. All machines are carefully inspected and come with detailed specifications.",
      icon: "ShoppingCart",
      secondaryIcon: "DollarSign",
      primaryButtonText: "Buy Machines",
      primaryButtonLink: "/products",
      secondaryButtonText: "Sell Your Machine",
      secondaryButtonLink: "/contact",
    },
    {
      _id: "default-2",
      title: "Looking for Something Specific?",
      description: "Our extensive inventory includes machines from leading manufacturers. Contact us to find the perfect solution for your manufacturing needs.",
      icon: "Search",
      primaryButtonText: "Browse All Machines",
      primaryButtonLink: "/products",
      secondaryButtonText: "Request Quote",
      secondaryButtonLink: "/contact",
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-brand-darkBlue via-brand-darkBlue/95 to-brand-darkBlue relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-orange rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {displayCTAs.map((cta, index) => {
            const Icon = cta.icon ? iconMap[cta.icon] : Search;
            const SecondaryIcon = cta.secondaryIcon ? iconMap[cta.secondaryIcon] : null;
            
            return (
              <motion.div
                key={cta._id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-1"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-full"
                >
                  <Card className="bg-white border-0 shadow-2xl h-full cursor-pointer overflow-hidden group flex flex-col rounded-3xl">
                    <CardContent className="p-10 flex flex-col flex-1 relative">
                      {/* Decorative gradient background */}
                      <div className={`absolute ${index % 2 === 0 ? 'top-0 right-0' : 'top-0 left-0'} w-64 h-64 bg-gradient-to-br ${index % 2 === 0 ? 'from-brand-orange/5' : 'from-brand-darkBlue/5'} to-transparent rounded-full blur-3xl`}></div>
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-8 justify-center sm:justify-start">
                          <motion.div
                            className={`w-20 h-20 bg-gradient-to-br ${index % 2 === 0 ? 'from-brand-darkBlue to-brand-darkBlue/80' : 'from-brand-orange to-brand-orange/80'} rounded-2xl flex items-center justify-center shadow-xl`}
                            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            {Icon && <Icon className="w-10 h-10 text-white" />}
                          </motion.div>
                          
                          {SecondaryIcon && (
                            <motion.div
                              className={`w-20 h-20 bg-gradient-to-br ${index % 2 === 0 ? 'from-brand-orange to-brand-orange/80' : 'from-brand-darkBlue to-brand-darkBlue/80'} rounded-2xl flex items-center justify-center shadow-xl`}
                              whileHover={{ rotate: [0, 10, -10, 10, 0], scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                            >
                              <SecondaryIcon className="w-10 h-10 text-white" />
                            </motion.div>
                          )}
                        </div>

                        <h3 className={`text-3xl font-bold text-brand-darkBlue mb-5 font-candara ${SecondaryIcon ? '' : 'text-center sm:text-left'}`}>
                          {cta.title}
                        </h3>
                        
                        <p className={`text-brand-gray mb-8 leading-relaxed font-calibri flex-1 text-base ${SecondaryIcon ? '' : 'text-center sm:text-left'}`}>
                          {cta.description}
                        </p>

                        <div className="space-y-3 mt-auto">
                          <div className="flex flex-col sm:flex-row gap-3">
                            {cta.primaryButtonText && (
                              <Button 
                                variant={index % 2 === 0 ? "secondary" : "primary"} 
                                className="flex-1 flex items-center justify-center gap-2 font-candara" 
                                asChild
                              >
                                <Link href={getContactHref(cta.primaryButtonLink || "#", cta.primaryButtonText)} className="flex gap-2">
                                  <span>{cta.primaryButtonText}</span>
                                  <ArrowRight className="w-4 h-4" />
                                </Link>
                              </Button>
                            )}
                            {cta.secondaryButtonText && (
                              <Button 
                                variant="secondary" 
                                className="flex-1 flex items-center justify-center gap-2 font-candara" 
                                asChild
                              >
                                <Link href={getContactHref(cta.secondaryButtonLink || "#", cta.secondaryButtonText)} className="flex gap-2">
                                  <span>{cta.secondaryButtonText}</span>
                                  {index % 2 === 0 && <ArrowRight className="w-4 h-4" />}
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CTAsClient;
