"use client";

import { useEffect, useRef } from "react";

export default function GoldParticles({ count = 30 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      const size = Math.random() * 4 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.setProperty("--tx", `${(Math.random() - 0.5) * 200}px`);
      particle.style.setProperty("--ty", `${-Math.random() * 300 - 100}px`);
      particle.style.setProperty("--tr", `${Math.random() * 720}deg`);
      particle.style.setProperty("--duration", `${Math.random() * 6 + 5}s`);
      particle.style.setProperty("--delay", `${Math.random() * 8}s`);
      particle.style.background = Math.random() > 0.5
        ? "#C9A84C"
        : "rgba(226, 201, 122, 0.7)";
      container.appendChild(particle);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [count]);

  return <div ref={containerRef} className="particles-container" />;
}
