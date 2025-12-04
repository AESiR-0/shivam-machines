"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import type { Footer } from "@/lib/sanity/types";

interface FooterClientProps {
  data: Footer | null;
}

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Facebook,
  Twitter,
  LinkedIn: Linkedin,
  Instagram,
};

const FooterClient = ({ data }: FooterClientProps) => {
  const currentYear = new Date().getFullYear();

  // Fallback data
  const defaultFooterLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "News", href: "/news" },
    ],
    products: [
      { name: "Boring Machines", href: "/products/boring" },
      { name: "Lathe Machines", href: "/products/lathe" },
      { name: "Gear Machines", href: "/products/gear" },
      { name: "CNC Machines", href: "/products/cnc" },
    ],
    services: [
      { name: "Machine Installation", href: "/services/installation" },
      { name: "Maintenance", href: "/services/maintenance" },
      { name: "Training", href: "/services/training" },
      { name: "Support", href: "/services/support" },
    ],
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Documentation", href: "/docs" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  };

  const defaultSocialLinks = [
    { platform: "Facebook", url: "#" },
    { platform: "Twitter", url: "#" },
    { platform: "LinkedIn", url: "#" },
    { platform: "Instagram", url: "#" },
  ];

  const companyName = data?.companyName || "Shivam Enterprise";
  const description = data?.description || "Leading supplier of premium used machine tools since 1997. We deliver precision, reliability, and innovation to industries across India with our extensive inventory and expert service.";
  const phone = data?.phone || "+91-9824080055";
  const email = data?.email || "shivamenterprise@yahoo.com";
  const address = data?.address || "Ahmedabad, Gujarat, India";
  
  const footerLinks = {
    company: data?.companyLinks || defaultFooterLinks.company,
    products: data?.productLinks || defaultFooterLinks.products,
    services: data?.serviceLinks || defaultFooterLinks.services,
    support: data?.supportLinks || defaultFooterLinks.support,
  };

  const socialLinks = data?.socialLinks || defaultSocialLinks;

  return (
    <footer className="bg-steel-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SE</span>
              </div>
              <span className="text-xl font-bold">{companyName}</span>
            </div>
            <p className="text-steel-300 mb-6 leading-relaxed">
              {description}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-accent-400" />
                  <a href={`tel:${phone}`} className="text-steel-300 hover:text-accent-400 transition-colors">
                    {phone}
                  </a>
                </div>
              )}
              {email && (
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-accent-400" />
                  <a href={`mailto:${email}`} className="text-steel-300 hover:text-accent-400 transition-colors">
                    {email}
                  </a>
                </div>
              )}
              {address && (
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-accent-400" />
                  <span className="text-steel-300">{address}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-steel-300 hover:text-accent-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-steel-300 hover:text-accent-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-steel-300 hover:text-accent-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-steel-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-steel-400 text-sm">
              © {currentYear} {companyName}. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = socialIconMap[social.platform] || Facebook;
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-steel-800 rounded-lg flex items-center justify-center text-steel-400 transition-colors duration-200 hover:text-accent-400"
                    aria-label={social.platform}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterClient;

