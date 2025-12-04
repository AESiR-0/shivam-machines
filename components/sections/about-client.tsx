"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Clock, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { About } from "@/lib/sanity/types";

interface AboutClientProps {
  data: About | null;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  Users,
  Clock,
  Shield,
};

const AboutClient = ({ data }: AboutClientProps) => {
  // Fallback data
  const defaultStats = [
    {
      icon: Award,
      title: "25+ Years Experience",
      description: "Decades of expertise in machine tool industry",
      value: "25+",
      color: "from-brand-orange to-accent-600"
    },
    {
      icon: Users,
      title: "500+ Happy Clients",
      description: "Satisfied customers across India",
      value: "500+",
      color: "from-brand-darkBlue to-primary-800"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer service",
      value: "24/7",
      color: "from-brand-gray to-gray-600"
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "All machines thoroughly tested",
      value: "100%",
      color: "from-green-500 to-green-600"
    },
  ];

  const defaultFeatures = [
    {
      title: "Premium Quality",
      description: "All our used machine tools are carefully inspected and refurbished to ensure optimal performance and reliability."
    },
    {
      title: "Expert Service",
      description: "Our experienced team provides comprehensive support from selection to installation and maintenance."
    },
    {
      title: "Wide Inventory",
      description: "Extensive range of machine tools including grinding, boring, lathe, and CNC machines from top manufacturers."
    },
    {
      title: "Competitive Pricing",
      description: "Best value for money with competitive pricing on premium used machine tools without compromising quality."
    }
  ];

  const stats = data?.stats?.map(stat => ({
    ...stat,
    icon: typeof stat.icon === 'string' ? iconMap[stat.icon] || Award : Award,
  })) || defaultStats;

  const features = data?.features || defaultFeatures;
  const title = data?.title || "About";
  const titleHighlight = data?.titleHighlight || "Shivam Enterprise";
  const description = data?.description || "Since 1997, we have been India's trusted supplier of premium used machine tools. Our commitment to quality, reliability, and customer satisfaction has made us a leading name in the industrial machinery sector.";

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-brand-darkBlue mb-6 font-montserrat">
            {title} <span className="text-brand-orange">{titleHighlight}</span>
          </h2>
          <p className="text-xl text-brand-gray max-w-4xl mx-auto font-nunito leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon || Award;
            return (
              <Card key={index} className="text-center bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color || 'from-brand-orange to-accent-600'} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-brand-darkBlue mb-2 font-montserrat">
                    {stat.value}
                  </div>
                  <h3 className="text-lg font-semibold text-brand-darkBlue mb-2 font-inter">
                    {stat.title}
                  </h3>
                  <p className="text-brand-gray text-sm font-nunito">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <Card key={index} className="bg-brand-lightGray border-0 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-brand-darkBlue mb-4 font-inter">
                  {feature.title}
                </h3>
                <p className="text-brand-gray font-nunito leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutClient;

