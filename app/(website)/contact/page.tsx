"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { companyInfo } from "@/lib/company";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: [companyInfo.phone, companyInfo.contactPerson],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Mail,
      title: "Email",
      details: [companyInfo.primaryEmail, companyInfo.secondaryEmail],
      color: "from-green-500 to-green-600",
    },
    {
      icon: MapPin,
      title: "Address",
      details: [...companyInfo.addressLines],
      color: "from-red-500 to-red-600",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Mon - Fri: 9:00 AM - 6:00 PM",
        "Sat: 9:00 AM - 2:00 PM",
        "Sun: Closed",
      ],
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-brand-lightGray via-white to-brand-steel/5 pt-12 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-brand-darkBlue mb-6 font-montserrat">
              Get In <span className="text-brand-orange">Touch</span>
            </h1>
            <p className="text-xl text-brand-gray max-w-4xl mx-auto font-nunito leading-relaxed">
              Ready to find the perfect machinery solution for your business?
              Contact our experts today for personalized assistance and quotes.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-brand-darkBlue mb-6 font-montserrat">
                Contact Information
              </h2>
              <div className="grid gap-6">
                {contactInfo.map((info) => (
                  <Card key={info.title} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          <info.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-brand-darkBlue mb-2 font-inter">
                            {info.title}
                          </h4>
                          <div className="space-y-1">
                            {info.details.map((detail) => (
                              <p
                                key={detail}
                                className="text-brand-gray text-sm font-nunito"
                              >
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
          </div>

          <div>
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-brand-darkBlue mb-6 font-montserrat">
                  Send us a Message
                </h3>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-brand-darkBlue mb-2 font-inter"
                      >
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Enter your full name"
                        className="border-gray-200 focus:border-brand-orange focus:ring-brand-orange"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-brand-darkBlue mb-2 font-inter"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="border-gray-200 focus:border-brand-orange focus:ring-brand-orange"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-brand-darkBlue mb-2 font-inter"
                      >
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        className="border-gray-200 focus:border-brand-orange focus:ring-brand-orange"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-brand-darkBlue mb-2 font-inter"
                      >
                        Company Name
                      </label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Enter your company name"
                        className="border-gray-200 focus:border-brand-orange focus:ring-brand-orange"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="machine-type"
                      className="block text-sm font-medium text-brand-darkBlue mb-2 font-inter"
                    >
                      Machine Type Interest
                    </label>
                    <select
                      id="machine-type"
                      name="machine-type"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                    >
                      <option value="">Select machine type</option>
                      <option value="cylindrical-grinding">
                        Cylindrical Grinding Machines
                      </option>
                      <option value="boring-machines">Boring Machines</option>
                      <option value="lathe-machines">Lathe Machines</option>
                      <option value="cnc-machines">CNC Machines</option>
                      <option value="gear-machines">Gear Machines</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-brand-darkBlue mb-2 font-inter"
                    >
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Tell us about your requirements, specifications, or any questions you have..."
                      rows={5}
                      className="border-gray-200 focus:border-brand-orange focus:ring-brand-orange"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-brand-orange hover:bg-red-700 text-white py-3 rounded-lg font-inter"
                  >
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
