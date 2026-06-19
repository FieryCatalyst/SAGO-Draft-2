"use client";

import { motion } from "framer-motion";
import { InstagramIcon } from "@/components/ui/Icons";
import Image from "next/image";

const instaPosts = [
  { image: "/images/sago-bottle-hero.jpeg", likes: "2.4K" },
  { image: "/images/sago-box-sunset.jpeg", likes: "1.8K" },
  { image: "/images/gold-reserve.webp", likes: "3.1K" },
  { image: "/images/sago-box-rocks.jpeg", likes: "2.7K" },
  { image: "/images/abstract.webp", likes: "1.5K" },
  { image: "/images/coffee-brandy.webp", likes: "2.2K" },
];

export default function InstagramPreview() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sago-black to-sago-dark" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.4em] uppercase text-sago-gold/60">
            Follow Us
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-gold-gradient mt-3 mb-4">
            @sagowhisky
          </h2>
          <p className="font-[family-name:var(--font-accent)] text-lg text-sago-cream/50 max-w-xl mx-auto">
            Join our community of whisky connoisseurs. Follow us on Instagram for the latest.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {instaPosts.map((post, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/sagowhisky/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
            >
              <Image
                src={post.image}
                alt="Sago Whisky Instagram"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-sago-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <InstagramIcon className="mx-auto text-sago-gold mb-2" size={24} />
                  <span className="text-sm font-semibold text-sago-cream">
                    ❤️ {post.likes}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="https://www.instagram.com/sagowhisky/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold px-8 py-3.5 rounded-sm text-sm tracking-widest inline-flex items-center gap-2"
            id="instagram-cta"
          >
            <InstagramIcon size={16} />
            Follow @sagowhisky
          </a>
        </motion.div>
      </div>
    </section>
  );
}
