"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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
import { companyInfo } from "@/lib/company";
import type { Footer } from "@/lib/sanity/types";

interface FooterClientProps {
  data: Footer | null;
}

const socialIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Facebook,
  Twitter,
  LinkedIn: Linkedin,
  Instagram,
};

const FooterClient = ({ data }: FooterClientProps) => {
  const currentYear = new Date().getFullYear();

  const companyName = data?.companyName || "Shivam Enterprise";
  const description =
    data?.description ||
    "Leading supplier of premium used machine tools since 1997. We deliver precision, reliability, and innovation to industries across India with our extensive inventory and expert service.";
  const phone = data?.phone || companyInfo.phone;
  const email = data?.email || companyInfo.primaryEmail;
  const address = data?.address || companyInfo.shortAddress;

  return (
    <footer className="bg-steel-950 text-white border-t border-steel-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Company Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="w-52 h-52 relative">
              <Image
                src="/static/logo_1.png"
                alt="Shivam Enterprise logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <p className="text-steel-300 text-lg leading-relaxed md:-mt-10 max-w-2xl">
              {description}
            </p>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="bg-steel-900/50 p-8 rounded-2xl border border-steel-800 space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>
              <div className="space-y-5">
                {phone && (
                  <div className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-steel-800 flex items-center justify-center text-accent-400 group-hover:bg-accent-600 group-hover:text-white transition-all duration-300">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-xs text-steel-500 uppercase font-bold tracking-wider mb-0.5">Call Us</p>
                      <a
                        href={`tel:${phone}`}
                        className="text-steel-200 hover:text-accent-400 text-lg transition-colors block truncate md:whitespace-normal"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>
                )}
                {email && (
                  <div className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-steel-800 flex items-center justify-center text-accent-400 group-hover:bg-accent-600 group-hover:text-white transition-all duration-300">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-xs text-steel-500 uppercase font-bold tracking-wider mb-0.5">Email Us</p>
                      <a
                        href={`mailto:${email}`}
                        className="text-steel-200 hover:text-accent-400 text-lg transition-colors block truncate md:whitespace-normal"
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                )}
                {address && (
                  <div className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-steel-800 flex items-center justify-center text-accent-400 group-hover:bg-accent-600 group-hover:text-white transition-all duration-300">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-xs text-steel-500 uppercase font-bold tracking-wider mb-0.5">Visit Us</p>
                      <span className="text-steel-200 text-lg leading-tight block break-words">
                        {address}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-steel-400 text-sm">
            <div>
              © {currentYear} {companyName}. All rights reserved.
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterClient;
