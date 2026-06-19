"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import GoldParticles from "@/components/ui/GoldParticles";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Layers */}
      <div className="absolute inset-0">
        {/* Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-sago-black via-sago-dark to-sago-green-dark" />

        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-sago-gold/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sago-green/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-sago-amber/5 rounded-full blur-[100px]" />
      </div>

      {/* Particles */}
      <GoldParticles count={40} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-80px)]">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-sago-gold animate-pulse" />
              <span className="text-xs tracking-[0.2em] uppercase text-sago-gold">
                Now Available in Kenya
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="hero-title font-[family-name:var(--font-display)] text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
              <span className="text-sago-cream">The Last</span>
              <br />
              <span className="text-gold-shimmer">Pour</span>
              <span className="text-sago-cream/60">…</span>
              <br />
              <span className="text-sago-cream/80">The Deepest One</span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="font-[family-name:var(--font-accent)] text-lg sm:text-xl text-sago-cream/60 max-w-lg mx-auto lg:mx-0 mb-8 italic"
            >
              Premium Oak Whisky crafted from the finest grain. Experience the
              golden warmth of Sago Gold Reserve.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/about"
                className="btn-gold px-8 py-4 rounded-sm text-sm tracking-widest text-center"
                id="hero-cta-explore"
              >
                Explore Sago
              </Link>
              <Link
                href="/bars"
                className="btn-outline-gold px-8 py-4 rounded-sm text-sm tracking-widest text-center"
                id="hero-cta-bars"
              >
                Find a Bar
              </Link>
              <Link
                href="/play"
                className="relative px-8 py-4 rounded-sm text-sm tracking-widest text-center bg-gradient-to-r from-sago-green to-sago-green-light text-sago-gold font-bold border border-sago-gold/30 hover:border-sago-gold/60 transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,168,76,0.3)]"
                id="hero-cta-play"
              >
                🎰 Play & Win
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex gap-8 mt-12 justify-center lg:justify-start"
            >
              {[
                { value: "42.8%", label: "ABV" },
                { value: "750ml", label: "Volume" },
                { value: "Premium", label: "Oak Aged" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-bold text-sago-gold font-[family-name:var(--font-display)]">
                    {stat.value}
                  </div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-sago-cream/40 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Bottle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            {/* Glow behind bottle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-sago-gold/8 rounded-full blur-[80px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] bg-sago-green/15 rounded-full blur-[60px]" />

            {/* Bottle Image */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <Image
                src="/images/sago-bottle-hero.jpeg"
                alt="Sago Gold Reserve Whisky - Premium Oak Whisky"
                width={400}
                height={600}
                className="w-[280px] sm:w-[350px] lg:w-[400px] h-auto object-contain drop-shadow-[0_20px_60px_rgba(201,168,76,0.15)]"
                priority
              />
            </motion.div>

            {/* Decorative Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] border border-sago-gold/10 rounded-full animate-[spin_30s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] border border-sago-gold/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-sago-gold/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-8 bg-gradient-to-b from-sago-gold/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
