"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Download,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { companyInfo } from "@/lib/company";
import { Button } from "@/components/ui/button";
import {
  generateCatalogPDF,
  type CatalogPdfProduct,
} from "@/lib/pdf-generator";
import { cn } from "@/lib/utils";
import type { MachineToolCategory } from "@/lib/sanity/types";

const Navbar = ({
  categories = [],
}: {
  categories?: MachineToolCategory[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsHover, setProductsHover] = useState(false);
  const [othersHover, setOthersHover] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Extract category ID from href (e.g., "boring" from "/products?category=boring") or fallback to slug
  const getCategoryId = (cat: MachineToolCategory) => {
    if (cat.href && cat.href.includes("category=")) {
      return cat.href.split("category=")[1];
    }
    return cat.slug?.current || cat.name.toLowerCase();
  };

  const displayCategories = categories.map((cat) => ({
    name: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
    href: `/products?category=${getCategoryId(cat)}`,
  }));

  const mainCategories = displayCategories.slice(0, 8);
  const otherCategories = displayCategories.slice(8);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products", hasDropdown: true },
    { name: "Contact", href: "/contact" },
  ];

  const handleDownloadCatalog = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      const response = await fetch("/api/download-catalog", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load catalog products");
      }

      const data = (await response.json()) as {
        products?: CatalogPdfProduct[];
      };
      await generateCatalogPDF(data.products || []);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-industrial-lg border-b border-primary-200"
            : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center z-20 space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
              >
                <div className="w-32 h-32 relative">
                  <Image
                    src="/static/logo_1.png"
                    alt="Shivam Enterprise logo"
                    fill
                    className="object-contain"
                    priority
                    sizes="96px"
                  />
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() =>
                    item.hasDropdown && setProductsHover(true)
                  }
                  onMouseLeave={() => setProductsHover(false)}
                >
                  <Link
                    href={item.href}
                    className="text-brand-gray hover:text-brand-darkBlue font-medium transition-all duration-200 font-nunito flex items-center space-x-1 hover:scale-105"
                  >
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-darkBlue after:transition-all after:duration-300 hover:after:w-full">
                      {item.name}
                    </span>
                    {item.hasDropdown && (
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                    )}
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
                          {mainCategories.map((category) => (
                            <Link
                              key={category.href}
                              href={category.href}
                              className="block px-4 py-2 text-sm text-brand-gray hover:bg-brand-orange/10 hover:text-brand-orange transition-colors font-nunito"
                            >
                              {category.name}
                            </Link>
                          ))}

                          {otherCategories.length > 0 && (
                            <div
                              className="relative"
                              onMouseEnter={() => setOthersHover(true)}
                              onMouseLeave={() => setOthersHover(false)}
                            >
                              <div className="flex items-center justify-between px-4 py-2 text-sm text-brand-gray hover:bg-brand-orange/10 hover:text-brand-orange transition-colors font-nunito cursor-pointer">
                                <span>Others</span>
                                <ChevronDown className="w-4 h-4 -rotate-90" />
                              </div>

                              <AnimatePresence>
                                {othersHover && (
                                  <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="absolute left-full -top-10 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 ml-1"
                                  >
                                    {otherCategories.map((category) => (
                                      <Link
                                        key={category.href}
                                        href={category.href}
                                        className="block px-4 py-2 text-sm text-brand-gray hover:bg-brand-orange/10 hover:text-brand-orange transition-colors font-nunito"
                                      >
                                        {category.name}
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          <div className="border-t border-gray-100 mt-1 pt-1">
                            <Link
                              href="/products"
                              className="block px-4 py-2 text-sm font-bold text-brand-darkBlue hover:bg-brand-orange/10 hover:text-brand-orange transition-colors font-nunito"
                            >
                              View All Products
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Info & CTA */}
            <div className="hidden z-20 lg:flex items-center space-x-4">
              <Button
                onClick={handleDownloadCatalog}
                disabled={isDownloading}
                className="text-white bg-brand-steel hover:text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2"
                size="sm"
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>{isDownloading ? "Generating..." : "Catalog"}</span>
              </Button>
              <Button variant="primary" size="sm" className="font-candara">
                Inquire Now
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-steel-700 hover:text-steel-900 hover:bg-steel-100"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
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
                    <span>{companyInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-brand-gray font-nunito">
                    <Mail className="w-4 h-4" />
                    <span>{companyInfo.primaryEmail}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-brand-gray font-nunito">
                    <MapPin className="w-4 h-4" />
                    <span>Ahmedabad, Gujarat</span>
                  </div>
                  <Button
                    onClick={handleDownloadCatalog}
                    disabled={isDownloading}
                    className="w-full border border-brand-steel text-brand-steel hover:bg-brand-steel hover:text-white mb-2"
                  >
                    {isDownloading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    {isDownloading ? "Generating PDF..." : "Download Catalog"}
                  </Button>
                  <Button
                    variant="primary"
                    className="w-full font-candara"
                    asChild
                  >
                    <Link href="/contact">Inquire Now</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      <div className="h-20" aria-hidden="true" />
    </>
  );
};

export default Navbar;
