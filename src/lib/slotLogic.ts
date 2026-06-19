// Slot machine symbols and game logic — Playing Card themed

export type SymbolType =
  | "ace"
  | "king"
  | "queen"
  | "jack"
  | "ten"
  | "nine"
  | "eight"
  | "seven";

export type CardCategory = "ace" | "face" | "number";

export interface SlotSymbol {
  id: SymbolType;
  label: string;
  display: string;       // What shows on the card face (A, K, Q, J, 10, 9, 8, 7)
  category: CardCategory;
  suit: string;           // Default suit icon
  suitColor: "red" | "black";
  value: number;
}

export const SYMBOLS: SlotSymbol[] = [
  { id: "ace",   label: "Ace",   display: "A",  category: "ace",    suit: "♠", suitColor: "black", value: 100 },
  { id: "king",  label: "King",  display: "K",  category: "face",   suit: "♥", suitColor: "red",   value: 60 },
  { id: "queen", label: "Queen", display: "Q",  category: "face",   suit: "♦", suitColor: "red",   value: 55 },
  { id: "jack",  label: "Jack",  display: "J",  category: "face",   suit: "♣", suitColor: "black", value: 50 },
  { id: "ten",   label: "10",    display: "10", category: "number",  suit: "♠", suitColor: "black", value: 40 },
  { id: "nine",  label: "9",     display: "9",  category: "number",  suit: "♥", suitColor: "red",   value: 30 },
  { id: "eight", label: "8",     display: "8",  category: "number",  suit: "♦", suitColor: "red",   value: 20 },
  { id: "seven", label: "7",     display: "7",  category: "number",  suit: "♣", suitColor: "black", value: 10 },
];

// Category helpers
const ACE_SYMBOLS: SymbolType[] = ["ace"];
const FACE_SYMBOLS: SymbolType[] = ["king", "queen", "jack"];
const NUMBER_SYMBOLS: SymbolType[] = ["ten", "nine", "eight", "seven"];

export type RewardTier = "jackpot" | "premium" | "standard" | "none";

export interface SpinResult {
  reels: [SymbolType, SymbolType, SymbolType];
  reward: RewardTier;
  rewardText: string;
  rewardDescription: string;
  voucherCode?: string;
}

// Win probabilities
const WIN_RATES = {
  jackpot: 0.02,    // 2%  — 3 Aces → Free SAGO bottle
  premium: 0.08,    // 8%  — 3 Face Cards (any matching J/Q/K) → Free 30ml drink
  standard: 0.25,   // 25% — 3 Number Cards (any matching 7/8/9/10) → 10% discount
  // 65% — No win
};

function generateVoucherCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "SAGO-";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
    if (i === 3) code += "-";
  }
  return code;
}

function getRandomSymbol(): SymbolType {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)].id;
}

function getRandomFaceSymbol(): SymbolType {
  return FACE_SYMBOLS[Math.floor(Math.random() * FACE_SYMBOLS.length)];
}

function getRandomNumberSymbol(): SymbolType {
  return NUMBER_SYMBOLS[Math.floor(Math.random() * NUMBER_SYMBOLS.length)];
}

export function spin(): SpinResult {
  const random = Math.random();

  // JACKPOT: 3 Aces → Free bottle of SAGO whiskey
  if (random < WIN_RATES.jackpot) {
    return {
      reels: ["ace", "ace", "ace"],
      reward: "jackpot",
      rewardText: "🎉 JACKPOT! FREE SAGO BOTTLE!",
      rewardDescription:
        "Congratulations! You've landed 3 Aces! You've won a FREE bottle of SAGO Whiskey! Redeem at any participating bar.",
      voucherCode: generateVoucherCode(),
    };
  }

  // PREMIUM: 3 matching Face Cards → Free 30ml drink at bar
  if (random < WIN_RATES.jackpot + WIN_RATES.premium) {
    const symbol = getRandomFaceSymbol();
    return {
      reels: [symbol, symbol, symbol],
      reward: "premium",
      rewardText: "👑 WINNER! FREE 30ML DRINK!",
      rewardDescription:
        "You've matched 3 Face Cards! You've won a FREE 30ml SAGO drink at the bar! Visit any participating bar to claim.",
      voucherCode: generateVoucherCode(),
    };
  }

  // STANDARD: 3 matching Number Cards → 10% discount
  if (random < WIN_RATES.jackpot + WIN_RATES.premium + WIN_RATES.standard) {
    const symbol = getRandomNumberSymbol();
    return {
      reels: [symbol, symbol, symbol],
      reward: "standard",
      rewardText: "🎯 10% DISCOUNT!",
      rewardDescription:
        "You've matched 3 Number Cards! You've won a 10% discount on your next SAGO purchase at any participating bar!",
      voucherCode: generateVoucherCode(),
    };
  }

  // NO WIN: Random non-matching symbols
  let reels: [SymbolType, SymbolType, SymbolType];
  do {
    reels = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
  } while (reels[0] === reels[1] && reels[1] === reels[2]);

  return {
    reels,
    reward: "none",
    rewardText: "So close! Try again tomorrow.",
    rewardDescription: "Better luck next time! Come back tomorrow for another free spin.",
  };
}

export function getExpiryDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getSymbol(id: SymbolType): SlotSymbol {
  return SYMBOLS.find((s) => s.id === id)!;
}
