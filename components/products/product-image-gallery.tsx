"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImageSource } from "@sanity/image-url";
import { createPortal } from "react-dom";

interface ProductImageGalleryProps {
  images?: SanityImageSource[];
  title: string;
}

export default function ProductImageGallery({
  images = [],
  title,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle escape key and body scroll lock
  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsZoomed(false);
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isZoomed]);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-square bg-brand-lightGray rounded-lg flex items-center justify-center">
        <p className="text-brand-gray">No image available</p>
      </div>
    );
  }

  const mainImage = images[selectedIndex];
  const mainImageUrl = urlFor(mainImage).width(800).height(800).url();

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const zoomModal = (
    <AnimatePresence>
      {isZoomed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[99999] flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsZoomed(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={urlFor(images[selectedIndex])
                  .width(1600)
                  .height(1200)
                  .fit("max")
                  .url()}
                alt={title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-all hover:scale-110 active:scale-95 z-50 group"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-all hover:scale-110 active:scale-95 z-50 group"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                </button>
              </>
            )}

            {/* Close Button */}
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute -top-12 sm:top-4 right-0 sm:right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all hover:rotate-90 z-50"
              aria-label="Close zoom"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Counter */}
            {images.length > 1 && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white font-medium bg-black/50 px-4 py-1 rounded-full text-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full aspect-square bg-white rounded-lg overflow-hidden group shadow-sm border border-gray-100">
        {/* Main Image Container */}
        <div className="relative w-full h-full">
          <Image
            src={mainImageUrl}
            alt={`${title} - Image ${selectedIndex + 1}`}
            fill
            className="object-contain p-4 cursor-zoom-in"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={selectedIndex === 0}
            onClick={() => setIsZoomed(true)}
          />
        </div>

        {/* Floating Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={() => setIsZoomed(true)}
            className="bg-white/90 hover:bg-white rounded-full p-2.5 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95"
            aria-label="Zoom image"
          >
            <ZoomIn className="w-5 h-5 text-brand-darkBlue" />
          </button>
        </div>

        {/* Inline Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-brand-darkBlue" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-brand-darkBlue" />
            </button>
          </>
        )}

        {/* Counter Overlay */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Bar */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x p-1">
          {images.map((image, index) => {
            const thumbUrl = urlFor(image).width(200).height(200).url();
            return (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative flex-shrink-0 w-20 aspect-square rounded-lg overflow-hidden border-2 transition-all snap-start ${
                  selectedIndex === index
                    ? "border-brand-orange shadow-md scale-95"
                    : "border-gray-100 hover:border-brand-darkBlue opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={thumbUrl}
                  alt={`${title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Portal for Zoom Modal */}
      {mounted && isZoomed && createPortal(zoomModal, document.body)}
    </div>
  );
}
