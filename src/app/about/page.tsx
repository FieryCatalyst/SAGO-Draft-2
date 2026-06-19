"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import GoldParticles from "@/components/ui/GoldParticles";

const timelineSteps = [
  {
    icon: "🌾",
    title: "Grain Selection",
    description:
      "Only the finest grains are hand-selected, ensuring each batch meets our exacting standards of quality and character.",
    year: "Step 1",
  },
  {
    icon: "⚗️",
    title: "Distillation",
    description:
      "Through careful copper pot distillation, we capture the purest spirit — rich in flavor, smooth in finish.",
    year: "Step 2",
  },
  {
    icon: "🪵",
    title: "Oak Aging",
    description:
      "Matured in premium oak casks, our whisky develops its distinctive golden hue and deep, complex flavor profile.",
    year: "Step 3",
  },
  {
    icon: "🍾",
    title: "Bottling",
    description:
      "Each bottle is filled, sealed, and inspected by hand — a grenade-shaped vessel of emerald green glass.",
    year: "Step 4",
  },
];

const kenyaCities = [
  { name: "Nairobi", bars: 8, status: "Active" },
  { name: "Mombasa", bars: 4, status: "Active" },
  { name: "Kisumu", bars: 3, status: "Coming Soon" },
  { name: "Nakuru", bars: 2, status: "Coming Soon" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sago-black via-sago-green-dark/30 to-sago-black" />
        <div className="absolute inset-0">
          <Image
            src="/images/sago-box-sunset.jpeg"
            alt="Sago Whisky Story"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <GoldParticles count={25} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-4 pt-20"
        >
          <span className="text-xs tracking-[0.4em] uppercase text-sago-gold/60">
            Our Story
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl lg:text-7xl font-bold text-gold-gradient mt-3 mb-4">
            The Sago Journey
          </h1>
          <p className="font-[family-name:var(--font-accent)] text-xl text-sago-cream/50 max-w-2xl mx-auto italic">
            From the heart of India to the spirit of Kenya — a story of craft, courage, and the finest grain.
          </p>
        </motion.div>
      </section>

      {/* Brand Vision */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-sago-dark" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/images/sago-box-open.jpeg"
                  alt="Sago Gold Reserve Gift Box"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sago-dark/60 to-transparent" />
              </div>
              {/* Floating quote */}
              <div className="absolute -bottom-6 -right-6 sm:right-4 glass-gold rounded-xl p-6 max-w-[250px]">
                <p className="font-[family-name:var(--font-accent)] text-sm italic text-sago-cream/80">
                  &ldquo;When the night grows slow and deep, keep the last pour… for me.&rdquo;
                </p>
                <p className="text-xs text-sago-gold mt-2">
                  — Vivek & Ritu Lakhotia
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs tracking-[0.4em] uppercase text-sago-gold/60">
                Brand Vision
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-sago-cream mt-3 mb-6">
                Custodians of
                <br />
                <span className="text-gold-gradient">the Cask</span>
              </h2>
              <div className="space-y-4 text-sago-cream/60 leading-relaxed">
                <p>
                  Sago was born from a simple belief: that exceptional whisky should be accessible to those who appreciate the craft. Founded by Vivek and Ritu Lakhotia, Sago represents a new chapter in premium spirits.
                </p>
                <p>
                  The distinctive grenade-shaped emerald green bottle is more than packaging — it&apos;s a statement. Bold, unmistakable, and crafted with the same attention to detail as the spirit within.
                </p>
                <p>
                  Now, Sago Gold Reserve Whisky arrives in Kenya, bringing its unique character to a market that appreciates authenticity, quality, and a good story well told.
                </p>
              </div>
              <div className="divider-gold mt-8 mb-6" />
              <div className="flex gap-8">
                <div>
                  <div className="text-2xl font-bold text-sago-gold font-[family-name:var(--font-display)]">
                    42.8%
                  </div>
                  <div className="text-xs text-sago-cream/40 tracking-wider uppercase">
                    ABV Strength
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-sago-gold font-[family-name:var(--font-display)]">
                    Premium
                  </div>
                  <div className="text-xs text-sago-cream/40 tracking-wider uppercase">
                    Oak Casks
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-sago-gold font-[family-name:var(--font-display)]">
                    750ml
                  </div>
                  <div className="text-xs text-sago-cream/40 tracking-wider uppercase">
                    Net Volume
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sago-dark via-sago-black to-sago-dark" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs tracking-[0.4em] uppercase text-sago-gold/60">
              Craftsmanship
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-gold-gradient mt-3 mb-4">
              Crafted from Finest Grain
            </h2>
            <p className="font-[family-name:var(--font-accent)] text-lg text-sago-cream/50 max-w-2xl mx-auto mb-16">
              Every drop of Sago Gold Reserve is a testament to patience, precision,
              and an unwavering commitment to quality.
            </p>
          </motion.div>

          {/* Distillation Timeline */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sago-gold/30 to-transparent -translate-y-1/2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {timelineSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                >
                  {/* Node */}
                  <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full glass-gold flex items-center justify-center text-2xl casino-glow">
                    {step.icon}
                  </div>

                  {/* Step Number */}
                  <div className="text-xs tracking-[0.3em] uppercase text-sago-gold/40 mb-2">
                    {step.year}
                  </div>

                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-sago-cream mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-sago-cream/50 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kenya Presence */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sago-dark via-sago-green-dark/20 to-sago-black" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs tracking-[0.4em] uppercase text-sago-gold/60">
              Kenya Market
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-gold-gradient mt-3 mb-4">
              Growing Across Kenya
            </h2>
            <p className="font-[family-name:var(--font-accent)] text-lg text-sago-cream/50 max-w-2xl mx-auto">
              From Nairobi to the coast, Sago is finding its home in Kenya&apos;s
              finest bars and lounges.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kenyaCities.map((city, i) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-luxury p-6 text-center"
              >
                <div className="text-3xl font-bold text-sago-gold font-[family-name:var(--font-display)] mb-1">
                  {city.bars}
                </div>
                <div className="text-lg font-semibold text-sago-cream mb-2">
                  {city.name}
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    city.status === "Active"
                      ? "bg-sago-green/20 text-sago-green-light"
                      : "bg-sago-gold/10 text-sago-gold/60"
                  }`}
                >
                  {city.status}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12"
          >
            {[
              { value: "15+", label: "Participating Bars" },
              { value: "4", label: "Cities" },
              { value: "1000+", label: "Bottles Served" },
              { value: "★★★★★", label: "Customer Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-6">
                <div className="text-2xl sm:text-3xl font-bold text-gold-gradient font-[family-name:var(--font-display)]">
                  {stat.value}
                </div>
                <div className="text-xs text-sago-cream/40 tracking-wider uppercase mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
