"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AgeGate() {
  const [show, setShow] = useState(false);
  const [verified, setVerified] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("sago-age-verified");
    if (!consent) {
      setVerified(false);
      setShow(true);
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem("sago-age-verified", "true");
    setVerified(true);
    setShow(false);
  };

  const handleReject = () => {
    window.location.href = "https://www.google.com";
  };

  if (verified) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="age-gate-overlay"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="relative max-w-md w-full mx-4 text-center"
          >
            {/* Decorative Border */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-sago-gold/40 via-sago-gold/10 to-sago-gold/40" />

            <div className="relative bg-sago-dark rounded-2xl p-10 sm:p-12">
              {/* Logo */}
              <div className="mb-6">
                <svg width="48" height="48" viewBox="0 0 40 40" className="text-sago-gold mx-auto mb-4">
                  <path
                    d="M20 5C20 5 12 10 12 22C12 28 15 35 20 35C25 35 28 28 28 22C28 10 20 5 20 5Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="20" cy="3" r="2" fill="currentColor" opacity="0.6" />
                </svg>
                <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gold-gradient">
                  sago
                </h2>
                <p className="text-sago-gold/60 text-xs tracking-[0.3em] uppercase mt-1">
                  Gold Reserve Whisky
                </p>
              </div>

              {/* Divider */}
              <div className="divider-gold mb-6" />

              {/* Question */}
              <p className="font-[family-name:var(--font-accent)] text-xl text-sago-cream/90 mb-2">
                Are you 18 years or older?
              </p>
              <p className="text-xs text-sago-cream/40 mb-8">
                You must be of legal drinking age to enter this website.
              </p>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleVerify}
                  className="btn-gold flex-1 py-3.5 rounded-sm text-sm tracking-widest"
                  id="age-gate-yes"
                >
                  Yes, I Am
                </button>
                <button
                  onClick={handleReject}
                  className="btn-outline-gold flex-1 py-3.5 rounded-sm text-sm tracking-widest"
                  id="age-gate-no"
                >
                  No
                </button>
              </div>

              {/* Legal */}
              <p className="text-[10px] text-sago-cream/25 mt-6 leading-relaxed">
                By entering this website, you agree to our Terms of Service and
                Privacy Policy. Please drink responsibly.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
