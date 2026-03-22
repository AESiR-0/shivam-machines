"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
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
  };

  return (
    <footer className="bg-steel-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  py-10 ">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-start justify-start space-x-3">
              <div className="w-64 h-64 relative">
                <Image
                  src="/static/logo_1.png"
                  alt="Shivam Enterprise logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <p className="text-steel-300 mb-6 leading-relaxed text-lg">
              Leading supplier of premium used machine tools since 1997. We
              deliver precision, reliability, and innovation to industries
              across India with our extensive inventory and expert service.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-lg">
                <Phone className="w-5 h-5 text-accent-400" />
                <span className="text-steel-300">+91-9824080055</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent-400" />
                <span className="text-steel-300">
                  shivamenterprise@yahoo.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-accent-400" />
                <span className="text-steel-300">
                  Ahmedabad, Gujarat, India
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-6 tracking-wide">
              Company
            </h3>
            <ul className="space-y-4">
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
            <h3 className="text-xl font-semibold mb-6 tracking-wide">
              Products
            </h3>
            <ul className="space-y-4">
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
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-steel-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left w-full">
            <div className="text-steel-400 text-base mx-auto">
              © {currentYear} Shivam Enterprise. All rights reserved.
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
