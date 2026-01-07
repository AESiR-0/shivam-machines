"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Clock, Shield, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
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
      color: "from-brand-darkBlue to-primary-700",
      bgColor: "bg-primary-100"
    },
    {
      icon: Users,
      title: "500+ Happy Clients",
      description: "Satisfied customers across India",
      value: "500+",
      color: "from-brand-darkBlue to-primary-800",
      bgColor: "bg-primary-100"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer service",
      value: "24/7",
      color: "from-brand-gray to-steel-700",
      bgColor: "bg-brand-lightGray"
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "All machines thoroughly tested",
      value: "100%",
      color: "from-brand-darkBlue to-primary-600",
      bgColor: "bg-primary-100"
    },
  ];

  const defaultFeatures = [
    {
      icon: CheckCircle2,
      title: "Premium Quality",
      description: "All our used machine tools are carefully inspected and refurbished to ensure optimal performance and reliability.",
      gradient: "from-brand-darkBlue to-primary-600"
    },
    {
      icon: TrendingUp,
      title: "Expert Service",
      description: "Our experienced team provides comprehensive support from selection to installation and maintenance.",
      gradient: "from-brand-darkBlue to-primary-700"
    },
    {
      icon: Sparkles,
      title: "Wide Inventory",
      description: "Extensive range of machine tools including grinding, boring, lathe, and CNC machines from top manufacturers.",
      gradient: "from-brand-darkBlue to-primary-800"
    },
    {
      icon: Award,
      title: "Competitive Pricing",
      description: "Best value for money with competitive pricing on premium used machine tools without compromising quality.",
      gradient: "from-brand-darkBlue to-primary-600"
    }
  ];

  const stats = data?.stats?.map(stat => ({
    ...stat,
    icon: typeof stat.icon === 'string' ? iconMap[stat.icon] || Award : Award,
    bgColor: "bg-primary-100"
  })) || defaultStats;

  // Map features to include icon and gradient, using defaults if not present
  const features = (data?.features || defaultFeatures).map((feature, index) => {
    const defaultFeature = defaultFeatures[index] || defaultFeatures[0];
    return {
      ...feature,
      icon: (feature as any).icon || defaultFeature.icon,
      gradient: (feature as any).gradient || defaultFeature.gradient
    };
  });
  const title = data?.title || "About";
  const titleHighlight = data?.titleHighlight || "Shivam Enterprise";
  const description = data?.description || "Since 1997, we have been India's trusted supplier of premium used machine tools. Our commitment to quality, reliability, and customer satisfaction has made us a leading name in the industrial machinery sector.";

  return (
    <section className="relative py-16 bg-gradient-to-br from-white via-brand-lightGray/20 to-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-darkBlue/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-brand-orange/3 to-brand-darkBlue/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section - Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block">
              <span className="px-4 py-2 bg-gradient-to-r from-brand-orange/10 to-brand-orange/5 text-brand-orange font-semibold rounded-full text-sm font-inter border border-brand-orange/20">
                Trusted Since 1997
              </span>
            </div>
            {/* <h2 className="text-5xl sm:text-6xl font-bold text-brand-darkBlue leading-tight font-montserrat">
              {title} <span className="text-brand-orange block">{titleHighlight}</span>
            </h2> */}
            <p className="text-xl text-brand-gray leading-relaxed font-nunito">
              {description}
            </p>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-darkBlue via-brand-darkBlue/90 to-brand-orange/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <motion.div
                    className="w-32 h-32 mx-auto mb-6 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border-2 border-white/20 shadow-2xl"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Award className="w-16 h-16 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2 font-montserrat">Industry Leaders</h3>
                  <p className="text-white/80 font-nunito">Excellence in Every Machine</p>
                </div>
              </div>
              {/* Decorative circles */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards - Modern Grid Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon || Award;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="group"
              >
                <Card className="relative bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden h-full">
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color || 'from-brand-darkBlue to-primary-700'} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Decorative corner element */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bgColor || 'bg-primary-100'} rounded-bl-full opacity-50`}></div>
                  
                  <CardContent className="p-8 relative z-10">
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-br ${stat.color || 'from-brand-darkBlue to-primary-700'} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="w-10 h-10 text-white drop-shadow-lg" />
                    </motion.div>
                    
                    <div className="text-5xl font-bold text-brand-darkBlue mb-3 font-montserrat group-hover:text-brand-orange transition-colors duration-300">
                      {stat.value}
                    </div>
                    <h3 className="text-lg font-bold text-brand-darkBlue mb-2 font-inter">
                      {stat.title}
                    </h3>
                    <p className="text-brand-gray text-sm font-nunito leading-relaxed">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Features Grid - Enhanced Card Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon || CheckCircle2;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="relative bg-white border border-brand-lightGray hover:border-brand-darkBlue/30 hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden h-full">
                  {/* Gradient accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient || 'from-brand-darkBlue to-primary-600'}`}></div>
                  
                  {/* Decorative background */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-brand-darkBlue/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-start gap-6">
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-br ${feature.gradient || 'from-brand-darkBlue to-primary-600'} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.3 }}
                      >
                        <FeatureIcon className="w-8 h-8 text-white" />
                      </motion.div>
                      <div className="flex-1 pt-1">
                        <h3 className="text-2xl font-bold text-brand-darkBlue mb-4 font-inter group-hover:text-brand-orange transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-brand-gray font-nunito leading-relaxed text-base">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutClient;

