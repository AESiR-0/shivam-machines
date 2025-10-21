"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 98765 43210", "+91 98765 43211"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@shivammachines.in", "sales@shivammachines.in"],
      color: "from-green-500 to-green-600",
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Industrial Area", "Mumbai, Maharashtra 400001", "India"],
      color: "from-red-500 to-red-600",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM", "Sun: Closed"],
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
        <section className="py-24 bg-gradient-to-br from-brand-lightGray to-brand-steel/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-brand-darkBlue mb-6 font-dream-avenue">
            Get In <span className="text-brand-orange">Touch</span>
          </h2>
          <p className="text-xl text-brand-gray max-w-4xl mx-auto font-nunito leading-relaxed">
            Ready to find the perfect machinery solution for your business? 
            Contact our experts today for personalized assistance and quotes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-steel-900 mb-6">
                Contact Information
              </h3>
              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-0 shadow-industrial-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <info.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-steel-900 mb-2">
                            {info.title}
                          </h4>
                          <div className="space-y-1">
                            {info.details.map((detail, detailIndex) => (
                              <p key={detailIndex} className="text-steel-600 text-sm">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-steel-800 to-steel-900 text-white border-0 shadow-industrial-xl">
              <CardContent className="p-8">
                <h4 className="text-xl font-bold mb-6">Why Choose Us?</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-400">25+</div>
                    <div className="text-sm text-steel-300">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-400">1000+</div>
                    <div className="text-sm text-steel-300">Machines Supplied</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-400">500+</div>
                    <div className="text-sm text-steel-300">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-400">24/7</div>
                    <div className="text-sm text-steel-300">Support</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-0 shadow-industrial-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-steel-900 mb-6">
                  Send us a Message
                </h3>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-steel-900 mb-2">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-steel-600">
                      We'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-steel-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-steel-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-steel-700 mb-2">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-steel-700 mb-2">
                          Company Name
                        </label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Enter your company name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-steel-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your requirements..."
                        rows={5}
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="industrial"
                      size="lg"
                      className="w-full group"
                    >
                      Send Message
                      <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

