"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface Country {
  name: string;
  region: "europe" | "asia";
  // Using longitude and latitude for proper geographic positioning
  longitude: number; // -180 to 180
  latitude: number;  // -90 to 90
}

// Countries to display on the map
// Note: mapdata.js is available in public/ for reference or if you want to use Simplemaps library
// You can also add locations to mapdata.js locations object if needed
const countries: Country[] = [
  // Europe
  { name: "Germany", region: "europe", longitude: 10.5, latitude: 51.2 },
  { name: "United Kingdom", region: "europe", longitude: -2.0, latitude: 54.5 },
  { name: "Italy", region: "europe", longitude: 12.5, latitude: 41.9 },
  { name: "France", region: "europe", longitude: 2.2, latitude: 46.2 },
  { name: "Switzerland", region: "europe", longitude: 8.2, latitude: 46.8 },
  { name: "Netherlands", region: "europe", longitude: 5.3, latitude: 52.1 },
  { name: "Belgium", region: "europe", longitude: 4.3, latitude: 50.5 },
  { name: "Spain", region: "europe", longitude: -3.7, latitude: 40.4 },
  
  // Asia
  { name: "Japan", region: "asia", longitude: 138.6, latitude: 36.2 },
  { name: "South Korea", region: "asia", longitude: 127.8, latitude: 36.5 },
  { name: "China", region: "asia", longitude: 104.2, latitude: 35.9 },
  { name: "Taiwan", region: "asia", longitude: 121.0, latitude: 23.5 },
  { name: "Singapore", region: "asia", longitude: 103.8, latitude: 1.3 },
  { name: "Thailand", region: "asia", longitude: 100.5, latitude: 13.8 },
  { name: "India", region: "asia", longitude: 78.0, latitude: 20.6 },
];

// Convert longitude/latitude to SVG coordinates (equirectangular projection)
// The world.svg has viewBox="0 0 2000 857"
const geoToSVG = (longitude: number, latitude: number, width: number = 2000, height: number = 857) => {
  // Simple equirectangular projection
  const x = ((longitude + 180) / 360) * width;
  const y = ((90 - latitude) / 180) * height;
  return { x, y };
};

const WorldMapSection = () => {
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);

  const handleMarkerHover = (country: Country) => {
    setHoveredCountry(country);
  };

  const handleMarkerLeave = () => {
    setHoveredCountry(null);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-white to-brand-lightGray">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-brand-darkBlue mb-6 font-montserrat">
            Global <span className="text-brand-orange">Import Network</span>
          </h2>
          <p className="text-xl text-brand-gray max-w-4xl mx-auto font-nunito leading-relaxed">
            We import premium quality machine tools from leading manufacturing countries across Europe and Asia
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-brand-darkBlue mb-4 font-inter">
                Our Global Reach
              </h3>
              <p className="text-brand-gray font-nunito leading-relaxed mb-6">
                With over 25 years of experience, Shivam Enterprise has established strong partnerships with leading machine tool manufacturers and suppliers across Europe and Asia. Our extensive network allows us to source the finest quality used machinery for our clients.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-darkBlue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-brand-darkBlue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-darkBlue mb-1 font-inter">European Excellence</h4>
                    <p className="text-sm text-brand-gray font-nunito">
                      We source premium machinery from Germany, UK, Italy, France, and other European manufacturing hubs known for precision engineering.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-darkBlue mb-1 font-inter">Asian Innovation</h4>
                    <p className="text-sm text-brand-gray font-nunito">
                      Our Asian network includes Japan, South Korea, China, and Taiwan, providing access to advanced CNC and precision machinery.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Countries List */}
            {/* <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                <h4 className="text-lg font-bold text-brand-darkBlue mb-4 font-inter flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-darkBlue"></div>
                  Europe
                </h4>
                <div className="space-y-2">
                  {countries
                    .filter((c) => c.region === "europe")
                    .map((country) => (
                      <div
                        key={country.name}
                        className="flex items-center gap-2 text-sm text-brand-gray font-nunito"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-darkBlue"></div>
                        <span>{country.name}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                <h4 className="text-lg font-bold text-brand-darkBlue mb-4 font-inter flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  Asia
                </h4>
                <div className="space-y-2">
                  {countries
                    .filter((c) => c.region === "asia")
                    .map((country) => (
                      <div
                        key={country.name}
                        className="flex items-center gap-2 text-sm text-brand-gray font-nunito"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                        <span>{country.name}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div> */}
          </motion.div>

          {/* Right Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
          >
            <div className="relative w-full aspect-[4/3] min-h-[500px]">
              {/* World Map SVG - Using world.svg from public folder */}
              <svg
                viewBox="0 0 2000 857"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Load world map SVG as background image */}
                <image
                  href="/world.svg"
                  x="0"
                  y="0"
                  width="2000"
                  height="857"
                  preserveAspectRatio="xMidYMid meet"
                />
                
                {/* Country Markers using proper geographic coordinates */}
                {countries.map((country) => {
                  const { x, y } = geoToSVG(country.longitude, country.latitude, 2000, 857);
                  
                  return (
                    <g key={country.name} style={{ pointerEvents: "auto" }}>
                      <circle
                        cx={x}
                        cy={y}
                        r="12"
                        fill={country.region === "europe" ? "#006bb3" : "#ff9800"}
                        stroke="white"
                        strokeWidth="3"
                        className="cursor-pointer"
                        onMouseEnter={() => handleMarkerHover(country)}
                        onMouseLeave={handleMarkerLeave}
                        style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.4))" }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Tooltip - positioned over SVG */}
              {hoveredCountry && (() => {
                const { x, y } = geoToSVG(hoveredCountry.longitude, hoveredCountry.latitude, 2000, 857);
                return (
                  <div
                    className="absolute z-50 bg-brand-darkBlue text-white px-4 py-2 rounded-lg shadow-xl pointer-events-none"
                    style={{
                      left: `${(x / 2000) * 100}%`,
                      top: `${(y / 857) * 100}%`,
                      transform: "translate(-50%, calc(-100% - 16px))",
                    }}
                  >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-semibold font-inter text-sm whitespace-nowrap">
                      {hoveredCountry.name}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-brand-darkBlue"></div>
                  </div>
                </div>
                );
              })()}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-darkBlue"></div>
                  <span className="text-xs font-semibold text-brand-darkBlue font-inter">Europe</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-xs font-semibold text-brand-darkBlue font-inter">Asia</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorldMapSection;

