"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { MachineToolCategory } from "@/lib/sanity/types";

interface MachineToolsClientProps {
  categories: MachineToolCategory[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Settings,
};

const BG_SHADES = [
  "bg-blue-50/40",
  "bg-orange-50/40",
  "bg-emerald-50/40",
  "bg-purple-50/40",
  "bg-cyan-50/40",
  "bg-indigo-50/40",
  "bg-pink-50/40",
  "bg-teal-50/40",
  "bg-sky-50/40",
  "bg-amber-50/40",
  "bg-rose-50/40",
  "bg-violet-50/40",
  "bg-lime-50/40",
  "bg-yellow-50/40",
  "bg-fuchsia-50/40",
  "bg-slate-50/40",
];

const MachineToolsClient = ({ categories }: MachineToolsClientProps) => {
  // Sort categories by order field
  const sortedCategories = [...(categories || [])].sort(
    (a, b) => (a.order || 999) - (b.order || 999),
  );

  const displayCategories = sortedCategories.map((cat) => ({
    name: cat.name,
    href:
      cat.href ||
      `/products?category=${cat.slug?.current || cat.name.toLowerCase().replace(/\s+/g, "-")}`,
    imageUrl: cat.image ? urlFor(cat.image).width(400).height(400).url() : null,
    icon: cat.icon || "Settings",
  }));

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-brand-darkBlue mb-6 font-montserrat tracking-tight">
            Machine <span className="text-brand-orange">Tools</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayCategories.map((group, index) => {
            const IconComponent = iconMap[group.icon] || Settings;
            const bgShade = BG_SHADES[index % BG_SHADES.length];
            const innerBgShade = BG_SHADES[(index + 4) % BG_SHADES.length]; // Offset for contrast

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={group.href}>
                  <Card
                    className={`group transition-all duration-300 ${bgShade} border border-gray-100 shadow-sm hover:shadow-md cursor-pointer h-24 flex overflow-hidden rounded-xl hover:bg-blue-600 hover:border-blue-600`}
                  >
                    <div className="flex w-full h-full items-center p-3">
                      {/* Image/Icon Area */}
                      <div
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden relative flex items-center justify-center border border-white/40 group-hover:border-transparent transition-colors shadow-sm`}
                      >
                        {group.imageUrl ? (
                          <Image
                            src={group.imageUrl}
                            alt={group.name}
                            fill
                            className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                            sizes="80px"
                            priority={false}
                          />
                        ) : (
                          <IconComponent
                            className={`w-8 h-8 text-gray-400 group-hover:text-white transition-colors  `}
                          />
                        )}
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 ml-4 min-w-0">
                        <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-white transition-colors duration-300 font-inter line-clamp-2 leading-tight pr-2">
                          {group.name}
                        </h3>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MachineToolsClient;
