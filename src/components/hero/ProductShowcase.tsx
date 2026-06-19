"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const products = [
  {
    name: "Gold Reserve Whisky",
    tagline: "Premium Oak Whisky",
    abv: "42.8%",
    image: "/images/gold-reserve.webp",
    description: "Crafted from finest grain, aged in premium oak casks for a smooth, golden finish.",
  },
  {
    name: "Coffee Liqueur",
    tagline: "Rich & Aromatic",
    abv: "21%",
    image: "/images/coffee-brandy.webp",
    description: "A bold fusion of premium spirits and hand-selected coffee beans.",
  },
  {
    name: "The Sago Collection",
    tagline: "Complete Range",
    abv: "Various",
    image: "/images/sago-family.webp",
    description: "From Gold Reserve to Port Wines — discover the full Sago family of spirits.",
  },
  {
    name: "Gift Edition",
    tagline: "Luxury Presentation",
    abv: "42.8%",
    image: "/images/sago-box-open.jpeg",
    description: "The signature green gift box with red velvet interior — a statement of distinction.",
  },
];

export default function ProductShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="products" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sago-black via-sago-dark to-sago-black" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sago-gold/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.4em] uppercase text-sago-gold/60">
            The Collection
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-gold-gradient mt-3 mb-4">
            Our Spirits
          </h2>
          <p className="font-[family-name:var(--font-accent)] text-lg text-sago-cream/50 max-w-xl mx-auto">
            Each bottle tells a story of craftsmanship, patience, and an unwavering pursuit of perfection.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div
          ref={scrollRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="card-luxury group p-1"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] rounded-t-lg overflow-hidden bg-sago-charcoal">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sago-black/80 via-transparent to-transparent" />

                {/* ABV Badge */}
                <div className="absolute top-4 right-4 glass-gold rounded-full px-3 py-1">
                  <span className="text-xs font-bold text-sago-gold">
                    {product.abv}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <p className="text-[10px] tracking-[0.3em] uppercase text-sago-gold/60 mb-1">
                  {product.tagline}
                </p>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-sago-cream mb-2">
                  {product.name}
                </h3>
                <p className="text-xs text-sago-cream/40 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
