"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative bg-sago-dark border-t border-sago-gold/10">
      {/* Gold accent line */}
      <div className="divider-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gold-gradient mb-3">
              sago
            </h3>
            <p className="text-xs tracking-[0.2em] uppercase text-sago-gold/50 mb-4">
              Gold Reserve Whisky
            </p>
            <p className="text-sm text-sago-cream/50 leading-relaxed font-[family-name:var(--font-accent)] italic">
              &ldquo;The last pour… The deepest one… For me.&rdquo;
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/sagowhisky/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-sago-gold/20 flex items-center justify-center text-sago-gold/60 hover:text-sago-gold hover:border-sago-gold/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(201,168,76,0.2)]"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="mailto:info@sagospirits.com"
                className="w-10 h-10 rounded-full border border-sago-gold/20 flex items-center justify-center text-sago-gold/60 hover:text-sago-gold hover:border-sago-gold/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(201,168,76,0.2)]"
                aria-label="Email us"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-sago-gold mb-6 font-semibold">
              Explore
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { href: "/about", label: "Our Story" },
                { href: "/play", label: "Play & Win" },
                { href: "/bars", label: "Find a Bar" },
                { href: "/#products", label: "Our Products" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-sago-cream/50 hover:text-sago-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-sago-gold mb-6 font-semibold">
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-sago-gold/60 mt-1 shrink-0" />
                <p className="text-sm text-sago-cream/50">
                  Nairobi, Kenya
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-sago-gold/60 shrink-0" />
                <p className="text-sm text-sago-cream/50">
                  +254 700 000 000
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-sago-gold/60 shrink-0" />
                <p className="text-sm text-sago-cream/50">
                  info@sagospirits.com
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-sago-gold mb-6 font-semibold">
              Stay Updated
            </h4>
            <p className="text-sm text-sago-cream/50 mb-4">
              Be the first to know about new releases, events, and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-sago-charcoal border border-sago-gold/15 rounded-sm px-4 py-2.5 text-sm text-sago-cream placeholder:text-sago-cream/30 focus:outline-none focus:border-sago-gold/40 transition-colors"
                required
                id="footer-newsletter-email"
              />
              <button
                type="submit"
                className="btn-gold py-2.5 rounded-sm text-xs tracking-widest"
                id="footer-newsletter-submit"
              >
                {subscribed ? "✓ Subscribed!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="divider-gold mt-12 mb-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-sago-cream/25">
            © {new Date().getFullYear()} Sago Spirits Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-xs text-sago-cream/25 text-center sm:text-right">
            🥂 Please drink responsibly. You must be 18+ to purchase or consume alcohol.
          </p>
        </div>
      </div>
    </footer>
  );
}
