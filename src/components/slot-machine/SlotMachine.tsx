"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SYMBOLS, getSymbol, spin, getExpiryDate, type SpinResult, type SymbolType } from "@/lib/slotLogic";
import GoldParticles from "@/components/ui/GoldParticles";
import { Volume2, VolumeX } from "lucide-react";

// Realistic Playing Card component
function PlayingCard({ symbolId, size = "normal" }: { symbolId: SymbolType; size?: "normal" | "large" }) {
  const symbol = getSymbol(symbolId);
  if (!symbol) return null;

  const isLarge = size === "large";
  const cardW = isLarge ? "w-20 h-28 sm:w-24 sm:h-[8.5rem]" : "w-14 h-20 sm:w-16 sm:h-[5.6rem]";
  const mainText = isLarge ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl";
  const cornerText = isLarge ? "text-xs sm:text-sm" : "text-[9px] sm:text-[10px]";
  const cornerSuit = isLarge ? "text-[10px] sm:text-xs" : "text-[8px] sm:text-[9px]";

  const isRed = symbol.suitColor === "red";
  const textColor = isRed ? "text-red-600" : "text-gray-900";

  // Face card royal icons
  const faceIcon = symbol.category === "face"
    ? symbol.id === "king" ? "♚" : symbol.id === "queen" ? "♛" : "♞"
    : null;

  // Ace gets a big centered suit
  const isAce = symbol.category === "ace";

  return (
    <div className={`${cardW} relative rounded-lg overflow-hidden select-none`}
      style={{
        background: "linear-gradient(145deg, #FFFEF5 0%, #F5F0E0 50%, #EDE8D5 100%)",
        boxShadow: isLarge
          ? "0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.6)"
          : "0 2px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.6)",
        border: "1.5px solid rgba(180,170,140,0.5)",
      }}
    >
      {/* Card inner border */}
      <div className="absolute inset-[3px] sm:inset-[4px] rounded-[4px] border border-gray-300/50 pointer-events-none" />

      {/* Top left corner */}
      <div className={`absolute top-[3px] left-[5px] sm:top-1 sm:left-1.5 flex flex-col items-center ${textColor} leading-none`}>
        <span className={`font-serif font-bold ${cornerText}`}>{symbol.display}</span>
        <span className={`${cornerSuit} -mt-[1px]`}>{symbol.suit}</span>
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isAce ? (
          // Ace: Large suit symbol in center
          <span className={`${isLarge ? "text-5xl sm:text-6xl" : "text-3xl sm:text-4xl"} ${textColor} drop-shadow-sm`}>
            {symbol.suit}
          </span>
        ) : faceIcon ? (
          // Face cards: Royal icon with decorative flourish
          <div className="flex flex-col items-center gap-0.5">
            <span className={`${mainText} ${textColor}`}>
              {faceIcon}
            </span>
            <span className={`${isLarge ? "text-[10px]" : "text-[8px]"} ${textColor} opacity-60 font-serif`}>
              {symbol.display}
            </span>
          </div>
        ) : (
          // Number cards: Suit pattern
          <div className="flex flex-col items-center gap-0.5">
            <span className={`font-serif font-bold ${mainText} ${textColor}`}>
              {symbol.display}
            </span>
            <span className={`${isLarge ? "text-sm" : "text-xs"} ${textColor} opacity-70`}>
              {symbol.suit}
            </span>
          </div>
        )}
      </div>

      {/* Bottom right corner (rotated 180°) */}
      <div className={`absolute bottom-[3px] right-[5px] sm:bottom-1 sm:right-1.5 flex flex-col items-center rotate-180 ${textColor} leading-none`}>
        <span className={`font-serif font-bold ${cornerText}`}>{symbol.display}</span>
        <span className={`${cornerSuit} -mt-[1px]`}>{symbol.suit}</span>
      </div>

      {/* Subtle card shine effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
        }}
      />
    </div>
  );
}

// Mini card for pay table
function MiniCard({ display, suit, isRed }: { display: string; suit: string; isRed: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-6 h-8 rounded-[3px] text-[10px] font-serif font-bold mx-[1px]
        ${isRed ? "text-red-600" : "text-gray-900"}`}
      style={{
        background: "linear-gradient(145deg, #FFFEF5, #EDE8D5)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        border: "1px solid rgba(180,170,140,0.4)",
      }}
    >
      <span className="flex flex-col items-center leading-none">
        <span>{display}</span>
        <span className="text-[7px] -mt-[1px]">{suit}</span>
      </span>
    </span>
  );
}

// Single reel animation
function Reel({
  targetSymbol,
  spinning,
  reelIndex,
  onStop,
}: {
  targetSymbol: SymbolType;
  spinning: boolean;
  reelIndex: number;
  onStop: () => void;
}) {
  const [displayedSymbol, setDisplayedSymbol] = useState<SymbolType>(targetSymbol);
  const [isStopping, setIsStopping] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (spinning) {
      setIsStopping(false);
      // Rapidly cycle through random symbols
      intervalRef.current = setInterval(() => {
        const randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)].id;
        setDisplayedSymbol(randomSymbol);
      }, 80);

      // Stop after staggered delay
      timeoutRef.current = setTimeout(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsStopping(true);
        setDisplayedSymbol(targetSymbol);
        onStop();
      }, 1500 + reelIndex * 500);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning, targetSymbol, reelIndex]);

  return (
    <div className="slot-reel relative flex items-center justify-center"
      style={{ width: "fit-content", height: "fit-content" }}
    >
      <motion.div
        animate={isStopping ? { scale: [1.1, 0.95, 1] } : spinning ? { scale: [1, 1.02, 1] } : {}}
        transition={isStopping ? { duration: 0.3 } : { duration: 0.08, repeat: Infinity }}
      >
        <PlayingCard symbolId={displayedSymbol} size="large" />
      </motion.div>
    </div>
  );
}

// Player registration form
function PlayerForm({ onSubmit }: { onSubmit: (data: { name: string; email: string; whatsapp: string }) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, whatsapp });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4"
    >
      <div>
        <label className="text-xs tracking-wider uppercase text-sago-gold/60 mb-1 block">
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full bg-sago-charcoal border border-sago-gold/15 rounded-lg px-4 py-3 text-sm text-sago-cream placeholder:text-sago-cream/30 focus:outline-none focus:border-sago-gold/40 transition-colors"
          required
          id="slot-player-name"
        />
      </div>
      <div>
        <label className="text-xs tracking-wider uppercase text-sago-gold/60 mb-1 block">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-sago-charcoal border border-sago-gold/15 rounded-lg px-4 py-3 text-sm text-sago-cream placeholder:text-sago-cream/30 focus:outline-none focus:border-sago-gold/40 transition-colors"
          required
          id="slot-player-email"
        />
      </div>
      <div>
        <label className="text-xs tracking-wider uppercase text-sago-gold/60 mb-1 block">
          WhatsApp Number
        </label>
        <input
          type="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="+254 7XX XXX XXX"
          className="w-full bg-sago-charcoal border border-sago-gold/15 rounded-lg px-4 py-3 text-sm text-sago-cream placeholder:text-sago-cream/30 focus:outline-none focus:border-sago-gold/40 transition-colors"
          required
          id="slot-player-whatsapp"
        />
      </div>
      <button
        type="submit"
        className="btn-gold w-full py-4 rounded-lg text-sm tracking-widest mt-2"
        id="slot-player-submit"
      >
        Start Playing
      </button>
      <p className="text-[10px] text-sago-cream/25 text-center">
        Your details are stored securely and used only for promotional communications.
      </p>
    </motion.form>
  );
}

// Reward modal
function RewardModal({ result, onClose }: { result: SpinResult; onClose: () => void }) {
  const isWin = result.reward !== "none";
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    if (result.voucherCode) {
      navigator.clipboard.writeText(result.voucherCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareWhatsApp = () => {
    const text = `🎉 I just won at Sago Play & Win! My reward: ${result.rewardText}. Code: ${result.voucherCode}. Try your luck at sagowhisky.co.ke/play`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  // Show the winning reels in the modal
  const reelCards = result.reels.map((r) => getSymbol(r));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="relative max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-sago-gold/40 via-sago-gold/10 to-sago-gold/40" />
        <div className="relative bg-sago-dark rounded-2xl p-8 text-center overflow-hidden">
          {isWin && <GoldParticles count={30} />}

          {/* Result */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="relative z-10"
          >
            {/* Show the 3 winning cards */}
            {isWin && (
              <div className="flex justify-center gap-2 mb-4">
                {reelCards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ rotateY: 180, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                  >
                    <PlayingCard symbolId={card.id} size="normal" />
                  </motion.div>
                ))}
              </div>
            )}

            <div className="text-5xl mb-4">
              {isWin ? "🎉" : "😅"}
            </div>
            <h3 className={`font-[family-name:var(--font-display)] text-2xl font-bold mb-2 ${
              isWin ? "text-gold-shimmer" : "text-sago-cream"
            }`}>
              {result.rewardText}
            </h3>
            <p className="text-sm text-sago-cream/60 mb-6">
              {result.rewardDescription}
            </p>
          </motion.div>

          {/* Voucher Details */}
          {isWin && result.voucherCode && (
            <div className="relative z-10 space-y-4">
              <div className="glass-gold rounded-lg p-4">
                <p className="text-xs text-sago-gold/60 mb-1">Your Voucher Code</p>
                <p className="font-mono text-xl font-bold text-sago-gold tracking-wider">
                  {result.voucherCode}
                </p>
                <p className="text-xs text-sago-cream/40 mt-2">
                  Expires: {getExpiryDate()}
                </p>
              </div>

              <p className="text-xs text-sago-cream/40 italic">
                ⚡ Rewards are redeemable only at participating bars.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={copyCode}
                  className="btn-outline-gold flex-1 py-3 rounded-lg text-xs tracking-wider"
                  id="voucher-copy"
                >
                  {copied ? "✓ Copied!" : "Copy Code"}
                </button>
                <button
                  onClick={shareWhatsApp}
                  className="btn-gold flex-1 py-3 rounded-lg text-xs tracking-wider"
                  id="voucher-share"
                >
                  Share WhatsApp
                </button>
              </div>
            </div>
          )}

          {!isWin && (
            <button
              onClick={onClose}
              className="btn-outline-gold px-8 py-3 rounded-lg text-xs tracking-wider relative z-10"
              id="try-again"
            >
              Close
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main Slot Machine
export default function SlotMachine() {
  const [registered, setRegistered] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<SpinResult | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [spinsLeft, setSpinsLeft] = useState(1);
  const [stoppedReels, setStoppedReels] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioContext = useRef<AudioContext | null>(null);

  // Simple sound effect generator
  const playSound = useCallback((type: "spin" | "stop" | "win" | "lose") => {
    if (!soundEnabled) return;
    try {
      if (!audioContext.current) {
        audioContext.current = new AudioContext();
      }
      const ctx = audioContext.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      switch (type) {
        case "spin":
          oscillator.frequency.setValueAtTime(220, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.2);
          break;
        case "stop":
          oscillator.frequency.setValueAtTime(600, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.15);
          break;
        case "win":
          oscillator.type = "triangle";
          oscillator.frequency.setValueAtTime(523, ctx.currentTime);
          oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.15);
          oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.3);
          oscillator.frequency.setValueAtTime(1047, ctx.currentTime + 0.45);
          gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.6);
          break;
        case "lose":
          oscillator.type = "sawtooth";
          oscillator.frequency.setValueAtTime(300, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.4);
          gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.4);
          break;
      }
    } catch {
      // Silently fail if audio isn't available
    }
  }, [soundEnabled]);

  const handleRegister = (data: { name: string; email: string; whatsapp: string }) => {
    // Store user data (in production, this goes to the API)
    localStorage.setItem("sago-player", JSON.stringify(data));
    setRegistered(true);

    // Check if user has spins left today
    const lastSpin = localStorage.getItem("sago-last-spin");
    const today = new Date().toDateString();
    if (lastSpin === today) {
      setSpinsLeft(0);
    }
  };

  const handleSpin = () => {
    if (spinning || spinsLeft <= 0) return;

    setSpinning(true);
    setStoppedReels(0);
    playSound("spin");

    const spinResult = spin();
    setResult(spinResult);

    // After all reels stop
    setTimeout(() => {
      setSpinning(false);
      setSpinsLeft((prev) => prev - 1);
      localStorage.setItem("sago-last-spin", new Date().toDateString());

      if (spinResult.reward !== "none") {
        playSound("win");
      } else {
        playSound("lose");
      }

      setTimeout(() => {
        setShowReward(true);
      }, 500);
    }, 3000);
  };

  const handleReelStop = () => {
    setStoppedReels((prev) => {
      const next = prev + 1;
      if (next <= 3) playSound("stop");
      return next;
    });
  };

  // Check registration on mount
  useEffect(() => {
    const player = localStorage.getItem("sago-player");
    if (player) {
      setRegistered(true);
      const lastSpin = localStorage.getItem("sago-last-spin");
      const today = new Date().toDateString();
      if (lastSpin === today) {
        setSpinsLeft(0);
      }
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sago-black via-sago-green-dark/20 to-sago-black" />
      <GoldParticles count={35} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="text-xs tracking-[0.4em] uppercase text-sago-gold/60">
            Sago Casino
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold mt-2 mb-3">
            <span className="text-sago-cream">Play</span>
            <span className="text-sago-cream/40"> & </span>
            <span className="text-gold-shimmer">Win</span>
          </h1>
          <p className="font-[family-name:var(--font-accent)] text-lg text-sago-cream/50">
            Spin the cards for a chance to win exclusive Sago rewards
          </p>
        </motion.div>

        {!registered ? (
          /* Registration Form */
          <div className="max-w-lg mx-auto">
            <div className="card-luxury p-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-center text-sago-cream mb-2">
                Enter Your Details
              </h2>
              <p className="text-sm text-sago-cream/40 text-center mb-6">
                Register to start spinning. One free spin per day!
              </p>
              <PlayerForm onSubmit={handleRegister} />
            </div>
          </div>
        ) : (
          /* Slot Machine */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto"
          >
            {/* Machine Frame */}
            <div className="relative">
              <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-sago-gold/30 via-sago-gold/5 to-sago-gold/30" />
              <div className="relative bg-sago-dark rounded-3xl p-6 sm:p-8 casino-glow">
                {/* Sound Toggle */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="absolute top-4 right-4 text-sago-gold/40 hover:text-sago-gold transition-colors"
                  aria-label="Toggle sound"
                >
                  {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>

                {/* Machine Title */}
                <div className="text-center mb-6">
                  <h3 className="text-gold-shimmer font-[family-name:var(--font-display)] text-xl font-bold">
                    SAGO SLOTS
                  </h3>
                  <div className="divider-gold mt-2" />
                </div>

                {/* Reels Display — 3 playing cards */}
                <div className="flex justify-center items-center gap-3 sm:gap-5 mb-8">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="relative">
                      {/* Reel glow border */}
                      <div
                        className="absolute -inset-[3px] rounded-xl opacity-60"
                        style={{
                          background: "linear-gradient(135deg, rgba(212,175,55,0.4), rgba(212,175,55,0.05), rgba(212,175,55,0.4))",
                        }}
                      />
                      <Reel
                        targetSymbol={result?.reels[i] || "ace"}
                        spinning={spinning}
                        reelIndex={i}
                        onStop={handleReelStop}
                      />
                    </div>
                  ))}
                </div>

                {/* Spin Button */}
                <div className="text-center">
                  <button
                    onClick={handleSpin}
                    disabled={spinning || spinsLeft <= 0}
                    className={`relative px-12 py-4 rounded-xl text-sm tracking-widest font-bold uppercase transition-all duration-300 ${
                      spinning || spinsLeft <= 0
                        ? "bg-sago-charcoal text-sago-cream/30 cursor-not-allowed"
                        : "btn-gold animate-pulse-gold"
                    }`}
                    id="slot-spin-button"
                  >
                    {spinning
                      ? "Spinning..."
                      : spinsLeft <= 0
                      ? "Come Back Tomorrow"
                      : "🃏 DEAL"}
                  </button>

                  {/* Spins remaining */}
                  <p className="text-xs text-sago-cream/30 mt-3">
                    {spinsLeft > 0
                      ? `${spinsLeft} free spin${spinsLeft > 1 ? "s" : ""} remaining today`
                      : "You've used your daily spin. See you tomorrow!"}
                  </p>
                </div>

                {/* Pay Table — Now shows card types and their rewards */}
                <div className="mt-8 pt-6 border-t border-sago-gold/10">
                  <h4 className="text-xs tracking-[0.3em] uppercase text-sago-gold/50 text-center mb-4">
                    Rewards
                  </h4>
                  <div className="space-y-3">
                    {/* 3 Aces → Free Bottle */}
                    <div className="glass rounded-lg px-4 py-3 flex items-center gap-3">
                      <div className="flex items-center gap-1 shrink-0">
                        <MiniCard display="A" suit="♠" isRed={false} />
                        <MiniCard display="A" suit="♥" isRed={true} />
                        <MiniCard display="A" suit="♦" isRed={true} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-sago-gold font-bold">FREE SAGO BOTTLE</p>
                        <p className="text-[10px] text-sago-cream/40">3 Aces = JACKPOT 🍾</p>
                      </div>
                    </div>

                    {/* 3 Face Cards → Free 30ml */}
                    <div className="glass rounded-lg px-4 py-3 flex items-center gap-3">
                      <div className="flex items-center gap-1 shrink-0">
                        <MiniCard display="K" suit="♥" isRed={true} />
                        <MiniCard display="Q" suit="♦" isRed={true} />
                        <MiniCard display="J" suit="♣" isRed={false} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-sago-gold font-bold">FREE 30ML DRINK</p>
                        <p className="text-[10px] text-sago-cream/40">3 matching Face Cards 👑</p>
                      </div>
                    </div>

                    {/* 3 Numbers → 10% Discount */}
                    <div className="glass rounded-lg px-4 py-3 flex items-center gap-3">
                      <div className="flex items-center gap-1 shrink-0">
                        <MiniCard display="7" suit="♣" isRed={false} />
                        <MiniCard display="8" suit="♦" isRed={true} />
                        <MiniCard display="9" suit="♥" isRed={true} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-sago-gold font-bold">10% DISCOUNT</p>
                        <p className="text-[10px] text-sago-cream/40">3 matching Number Cards 🎯</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-center text-[10px] text-sago-cream/25 mt-4">
              Rewards are redeemable only at participating bars. Vouchers expire 30 days after issue.
            </p>
          </motion.div>
        )}
      </div>

      {/* Reward Modal */}
      <AnimatePresence>
        {showReward && result && (
          <RewardModal result={result} onClose={() => setShowReward(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
