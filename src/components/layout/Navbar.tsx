"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Our Story" },
  { href: "/play", label: "Play & Win" },
  { href: "/bars", label: "Find a Bar" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-dark py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <svg width="32" height="32" viewBox="0 0 40 40" className="text-sago-gold">
                <path
                  d="M20 5C20 5 12 10 12 22C12 28 15 35 20 35C25 35 28 28 28 22C28 10 20 5 20 5Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M16 18C16 18 14 22 14 26C14 30 17 33 20 33"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.5"
                />
                <circle cx="20" cy="3" r="2" fill="currentColor" opacity="0.6" />
              </svg>
            </div>
            <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-gold-gradient tracking-wide">
              sago
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium tracking-widest uppercase text-sago-cream/80 hover:text-sago-gold transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-sago-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="/play"
              className="btn-gold px-5 py-2.5 rounded-sm text-xs tracking-widest"
            >
              Play & Win
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-sago-gold p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[280px] glass-dark z-50 md:hidden flex flex-col"
            >
              <div className="flex justify-end p-5">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-sago-gold"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-1 px-6 mt-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-4 text-lg font-[family-name:var(--font-display)] text-sago-cream/90 hover:text-sago-gold transition-colors border-b border-sago-gold/10"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="px-6 mt-8">
                <Link
                  href="/play"
                  onClick={() => setMobileOpen(false)}
                  className="btn-gold block text-center py-3 rounded-sm text-sm tracking-widest"
                >
                  Play & Win
                </Link>
              </div>
              <div className="mt-auto p-6">
                <p className="text-xs text-sago-cream/30 font-[family-name:var(--font-accent)]">
                  Sago Gold Reserve Whisky
                  <br />
                  Premium Oak Whisky
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
