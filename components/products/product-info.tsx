"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageCircle, CheckCircle, XCircle, Calendar, Building2, Tag, Download } from "lucide-react";
import Link from "next/link";
import { generateProductPDF } from "@/lib/pdf-generator";
import type { Product } from "@/lib/sanity/types";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getConditionBadge = (condition?: string) => {
    const conditions: Record<string, { label: string; color: string }> = {
      excellent: { label: "Excellent", color: "bg-green-100 text-green-800" },
      "very-good": { label: "Very Good", color: "bg-blue-100 text-blue-800" },
      good: { label: "Good", color: "bg-yellow-100 text-yellow-800" },
      fair: { label: "Fair", color: "bg-orange-100 text-orange-800" },
    };
    return conditions[condition || ""] || { label: "N/A", color: "bg-gray-100 text-gray-800" };
  };

  const conditionBadge = getConditionBadge(product.condition);
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ${product.title}. Can you provide more details?`
  );
  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappMessage}`;

  const handleDownloadProductDetails = () => {
    try {
      generateProductPDF({
        title: product.title,
        description: product.description,
        category: product.category,
        specifications: product.specifications,
        features: product.features,
        price: product.price,
        manufacturer: product.manufacturer,
        year: product.year,
        condition: product.condition,
        isInStock: product.isInStock,
      });
    } catch (error) {
      console.error("Error generating product PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Badge */}
      <div className="inline-block px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-medium capitalize">
        {product.category}
      </div>

      {/* Title */}
      <h1 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue font-candara">
        {product.title}
      </h1>

      {/* Price and Stock Status */}
      <div className="flex items-center justify-between py-4 border-y border-gray-200">
        <div>
          {product.price ? (
            <div className="text-3xl font-bold text-brand-darkBlue font-candara">
              {product.price}
            </div>
          ) : (
            <div className="text-xl font-semibold text-brand-gray font-candara">
              Price on Request
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {product.isInStock ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-600 font-semibold font-nunito">In Stock</span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-600 font-semibold font-nunito">Out of Stock</span>
            </>
          )}
        </div>
      </div>

      {/* Product Details Grid */}
      <div className="grid grid-cols-2 gap-4 py-4">
        {product.manufacturer && (
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-brand-gray" />
            <div>
              <div className="text-xs text-brand-gray font-nunito">Manufacturer</div>
              <div className="font-semibold text-brand-darkBlue font-nunito">
                {product.manufacturer}
              </div>
            </div>
          </div>
        )}
        {product.year && (
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-brand-gray" />
            <div>
              <div className="text-xs text-brand-gray font-nunito">Year</div>
              <div className="font-semibold text-brand-darkBlue font-nunito">{product.year}</div>
            </div>
          </div>
        )}
        {product.condition && (
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-brand-gray" />
            <div>
              <div className="text-xs text-brand-gray font-nunito">Condition</div>
              <span
                className={`inline-block px-2 py-1 rounded text-xs font-semibold ${conditionBadge.color}`}
              >
                {conditionBadge.label}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="primary"
            size="xl"
            className="w-full flex items-center justify-center gap-2 font-candara py-4 text-base"
            asChild
          >
            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Quick Inquiry via WhatsApp
            </Link>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="secondary"
            size="lg"
            className="w-full flex items-center justify-center gap-2 font-candara"
            onClick={handleDownloadProductDetails}
          >
            <Download className="w-4 h-4" />
            Download Product Details
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant="secondary" className="w-full flex items-center justify-center gap-2 font-candara py-3" asChild>
              <a href="tel:+919876543210" className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant="secondary" className="w-full flex items-center justify-center gap-2 font-candara py-3" asChild>
              <a href="mailto:info@shivammachines.in" className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Email Us
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center justify-around text-center">
          <div>
            <div className="text-2xl font-bold text-brand-darkBlue font-candara">25+</div>
            <div className="text-xs text-brand-gray font-nunito">Years Experience</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-brand-darkBlue font-candara">1000+</div>
            <div className="text-xs text-brand-gray font-nunito">Machines Supplied</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-brand-darkBlue font-candara">500+</div>
            <div className="text-xs text-brand-gray font-nunito">Happy Clients</div>
          </div>
        </div>
      </div>
    </div>
  );
}

