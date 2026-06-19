"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import GoldParticles from "@/components/ui/GoldParticles";

export default function SlotTeaser() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sago-green-dark/50 via-sago-black to-sago-dark" />
      <GoldParticles count={20} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.4em] uppercase text-sago-gold/60">
            Feeling Lucky?
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
            <span className="text-sago-cream">Play</span>
            <span className="text-sago-cream/40"> & </span>
            <span className="text-gold-shimmer">Win</span>
          </h2>
          <p className="font-[family-name:var(--font-accent)] text-lg text-sago-cream/50 max-w-2xl mx-auto mb-10">
            Spin the Sago slot machine for a chance to win exclusive rewards —
            from free bottles to premium pours. Redeem at any participating bar.
          </p>

          {/* Slot Preview Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-3 sm:gap-4 mb-10"
          >
            {["🍾", "🏆", "🥃"].map((symbol, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="w-20 h-20 sm:w-24 sm:h-24 glass-gold rounded-xl flex items-center justify-center text-3xl sm:text-4xl casino-glow"
              >
                {symbol}
              </motion.div>
            ))}
          </motion.div>

          {/* Rewards Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
            {[
              {
                match: "3 × Bottles",
                reward: "Free Sago Bottle",
                color: "from-yellow-600/20 to-amber-700/20",
              },
              {
                match: "3 × Glasses",
                reward: "Free 30ml Pour",
                color: "from-sago-gold/20 to-sago-amber/20",
              },
              {
                match: "3 × Numbers",
                reward: "10% Discount",
                color: "from-sago-green/20 to-sago-camo/20",
              },
            ].map((tier) => (
              <div
                key={tier.match}
                className={`glass rounded-lg p-4 bg-gradient-to-br ${tier.color}`}
              >
                <p className="text-xs text-sago-gold/80 mb-1">{tier.match}</p>
                <p className="text-sm font-semibold text-sago-cream">
                  {tier.reward}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/play"
            className="btn-gold px-10 py-4 rounded-sm text-sm tracking-widest inline-block animate-pulse-gold"
            id="slot-teaser-cta"
          >
            🎰 Spin Now — It&apos;s Free
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
