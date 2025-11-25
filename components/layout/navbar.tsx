"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, MapPin, ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateCatalogPDF } from "@/lib/pdf-generator";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsHover, setProductsHover] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const productCategories = [
    { name: "Horizontal Boring Machines", href: "/products?category=horizontal-boring" },
    { name: "Vertical Lathe Machines", href: "/products?category=vertical-lathe" },
    { name: "Lathe Machines", href: "/products?category=lathe" },
    { name: "Cylindrical Grinding Machines", href: "/products?category=cylindrical-grinding" },
    { name: "CNC Machines", href: "/products?category=cnc" },
    { name: "Gear Machines", href: "/products?category=gear" },
    { name: "Milling Machines", href: "/products?category=milling" },
    { name: "Surface Grinders", href: "/products?category=grinding" },
    { name: "View All Products", href: "/products" },
  ];

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products", hasDropdown: true },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const handleDownloadCatalog = () => {
    try {
      generateCatalogPDF();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-industrial-lg border-b border-primary-200"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-brand-darkBlue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SE</span>
              </div>
              <span className="text-xl font-bold text-brand-darkBlue font-dream-avenue">
                Shivam Enterprise
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setProductsHover(true)}
                onMouseLeave={() => setProductsHover(false)}
              >
                <Link
                  href={item.href}
                  className="text-brand-gray hover:text-brand-darkBlue font-medium transition-colors duration-200 font-nunito flex items-center space-x-1"
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Products Dropdown */}
                {item.hasDropdown && (
                  <AnimatePresence>
                    {productsHover && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                      >
                        {productCategories.map((category, idx) => (
                          <Link
                            key={idx}
                            href={category.href}
                            className="block px-4 py-2 text-sm text-brand-gray hover:bg-brand-orange/10 hover:text-brand-orange transition-colors font-nunito"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              onClick={handleDownloadCatalog}
              className=" text-white bg-brand-steel hover:text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2"
              size="sm"
            >
              <Download className="w-4 h-4" />
              <span>Catalog</span>
            </Button>
            <Button className="bg-brand-darkBlue hover:bg-brand-darkBlue/90 text-white px-4 py-2 rounded-lg font-medium font-candara" size="sm">
              Inquire Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-steel-700 hover:text-steel-900 hover:bg-steel-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-primary-200 shadow-industrial-lg"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-steel-700 hover:text-steel-900 font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-primary-200 space-y-3">
                <div className="flex items-center space-x-2 text-sm text-brand-gray font-nunito">
                  <Phone className="w-4 h-4" />
                  <span>+91-9824080055</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-brand-gray font-nunito">
                  <Mail className="w-4 h-4" />
                  <span>shivamenterprise@yahoo.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-brand-gray font-nunito">
                  <MapPin className="w-4 h-4" />
                  <span>Ahmedabad, Gujarat</span>
                </div>
                <Button
                  onClick={handleDownloadCatalog}
                  className="w-full border border-brand-steel text-brand-steel hover:bg-brand-steel hover:text-white mb-2"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Catalog
                </Button>
                <Button className="w-full bg-brand-darkBlue hover:bg-brand-darkBlue/90 text-white font-candara">
                  Inquire Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

