"use client";

import React from "react";
import { Facebook, Youtube, ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white py-6 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-700 space-y-4 md:space-y-0">
          {/* Left - Copyright */}
          <div className="flex items-center">
            Copyright ©{currentYear}{" "}
            <span className="text-[#a52a2a] mx-1 font-medium">
              Shivam Enterprise
            </span>{" "}
            All Rights Reserved
          </div>

          {/* Center - Contact Info */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
            <div className="flex items-center">
              <span className="mr-1">Phone.:</span>
              <a
                href="tel:+919824080055"
                className="text-[#a52a2a] hover:underline"
              >
                +91-9824080055
              </a>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              <span className="mr-1">Mail:</span>
              <a
                href="mailto:shivamenterprise@yahoo.com"
                className="text-[#a52a2a] hover:underline"
              >
                shivamenterprise@yahoo.com
              </a>
            </div>
          </div>

          {/* Right - Socials & Scroll to Top */}
          <div className="flex items-center space-x-3">
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4 fill-current" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Youtube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-[#a4c2f4] flex items-center justify-center hover:bg-[#8baec2] transition-colors ml-4"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

