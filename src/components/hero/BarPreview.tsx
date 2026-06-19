"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Navigation } from "lucide-react";

const sampleBars = [
  { name: "The Whisky Lounge", city: "Nairobi", area: "Westlands" },
  { name: "Hemingway's Bar", city: "Nairobi", area: "Karen" },
  { name: "Tamarind Mombasa", city: "Mombasa", area: "Nyali" },
];

export default function BarPreview() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sago-dark via-sago-charcoal/50 to-sago-dark" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Map Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden glass border border-sago-gold/10"
          >
            {/* Stylized Kenya Map */}
            <div className="absolute inset-0 bg-sago-charcoal flex items-center justify-center">
              <svg
                viewBox="0 0 400 500"
                className="w-full h-full opacity-20"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="0.5"
              >
                {/* Simplified Kenya outline */}
                <path d="M200 80 L280 120 L320 180 L340 260 L300 340 L280 400 L240 440 L200 460 L160 440 L120 400 L100 340 L80 280 L100 200 L140 140 L200 80Z" />
              </svg>

              {/* City Markers */}
              {[
                { x: "50%", y: "55%", name: "Nairobi", pulse: true },
                { x: "65%", y: "65%", name: "Mombasa", pulse: false },
                { x: "35%", y: "45%", name: "Kisumu", pulse: false },
              ].map((city) => (
                <div
                  key={city.name}
                  className="absolute flex flex-col items-center"
                  style={{ left: city.x, top: city.y }}
                >
                  <div
                    className={`w-3 h-3 rounded-full bg-sago-gold ${
                      city.pulse ? "animate-pulse-gold" : ""
                    }`}
                  />
                  <span className="text-[10px] text-sago-gold/60 mt-1">
                    {city.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-sago-dark/90 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 glass rounded-lg p-4">
              <div className="flex items-center gap-2 text-sago-gold">
                <Navigation size={14} />
                <span className="text-xs tracking-wider uppercase">
                  3 Cities — 15+ Bars
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs tracking-[0.4em] uppercase text-sago-gold/60">
              Discover
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-gold-gradient mt-3 mb-4">
              Find a Bar
            </h2>
            <p className="font-[family-name:var(--font-accent)] text-lg text-sago-cream/50 mb-8">
              Locate participating bars near you. Enjoy Sago and redeem your
              Play & Win rewards.
            </p>

            {/* Sample Bars */}
            <div className="space-y-3 mb-8">
              {sampleBars.map((bar, i) => (
                <motion.div
                  key={bar.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-lg px-5 py-4 flex items-center gap-4 group hover:border-sago-gold/30 transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-sago-gold/10 flex items-center justify-center shrink-0 group-hover:bg-sago-gold/20 transition-colors">
                    <MapPin size={16} className="text-sago-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-sago-cream">
                      {bar.name}
                    </p>
                    <p className="text-xs text-sago-cream/40">
                      {bar.area}, {bar.city}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/bars"
              className="btn-outline-gold px-8 py-3.5 rounded-sm text-sm tracking-widest inline-block"
              id="bar-preview-cta"
            >
              View All Bars
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
