"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  Download,
  Mail,
  MessageCircle,
  Phone,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { companyInfo } from "@/lib/company";
import { generateProductPDF } from "@/lib/pdf-generator";
import { urlFor } from "@/lib/sanity/image";
import type { Product } from "@/lib/sanity/types";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const getConditionBadge = (condition?: string) => {
    const conditions: Record<string, { label: string; color: string }> = {
      excellent: { label: "Excellent", color: "bg-green-100 text-green-800" },
      "very-good": { label: "Very Good", color: "bg-blue-100 text-blue-800" },
      good: { label: "Good", color: "bg-yellow-100 text-yellow-800" },
      fair: { label: "Fair", color: "bg-orange-100 text-orange-800" },
    };
    return (
      conditions[condition || ""] || {
        label: "N/A",
        color: "bg-gray-100 text-gray-800",
      }
    );
  };

  const conditionBadge = getConditionBadge(product.condition);
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ${product.title}. Can you provide more details?`,
  );
  const whatsappUrl = `${companyInfo.whatsappHref}?text=${whatsappMessage}`;

  const handleDownloadProductDetails = async () => {
    try {
      await generateProductPDF({
        title: product.title,
        imageUrl: product.images?.[0]
          ? urlFor(product.images[0]).width(1200).height(900).fit("max").url()
          : undefined,
        imageUrls:
          product.images?.map((img) =>
            urlFor(img).width(1200).height(900).fit("max").url(),
          ) || [],
        description: product.description,
        category: product.category.name,
        features: product.features,
        technicalSpecs: product.technicalSpecs,
        price: product.price,
        manufacturer: product.technicalSpecs?.manufacturer as string | undefined,
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
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <div className="inline-block px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-medium capitalize">
          {product.category.name}
        </div>
        {product.condition && (
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${conditionBadge.color}`}
          >
            {conditionBadge.label}
          </div>
        )}
      </div>

      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue font-candara">
          {product.title}
        </h1>
        {product.subcategory && (
          <p className="text-lg font-semibold text-brand-gray/80 font-nunito">
            {product.subcategory}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-0 md:pt-2">
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Button
            variant="primary"
            size="lg"
            className="w-full flex items-center justify-center gap-2 font-candara py-2.5 text-base"
            asChild
          >
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Quick Inquiry via WhatsApp
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-3 gap-2">
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              variant="secondary"
              className="w-full flex flex-col items-center justify-center gap-1 font-candara h-auto py-2 px-1"
              onClick={handleDownloadProductDetails}
            >
              <Download className="w-4 h-4" />
              <span className="text-[10px] sm:text-xs">PDF Details</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              variant="secondary"
              className="w-full flex flex-col items-center justify-center gap-1 font-candara h-auto py-2 px-1"
              asChild
            >
              <a
                href={companyInfo.phoneHref}
                className="flex flex-col items-center justify-center gap-1"
              >
                <Phone className="w-4 h-4" />
                <span className="text-[10px] sm:text-xs">Call Now</span>
              </a>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              variant="secondary"
              className="w-full flex flex-col items-center justify-center gap-1 font-candara h-auto py-2 px-1"
              asChild
            >
              <a
                href={`mailto:${companyInfo.primaryEmail}`}
                className="flex flex-col items-center justify-center gap-1"
              >
                <Mail className="w-4 h-4" />
                <span className="text-[10px] sm:text-xs">Email Us</span>
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
