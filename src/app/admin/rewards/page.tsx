"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Search, CheckCircle, Clock, XCircle } from "lucide-react";

type RewardStatus = "active" | "redeemed" | "expired";

const mockRewards = [
  { id: 1, user: "John Mwangi", type: "standard" as const, code: "SAGO-A3F2-K9M1", status: "active" as RewardStatus, reward: "10% Discount", expires: "2025-07-15", bar: null },
  { id: 2, user: "Peter Kamau", type: "premium" as const, code: "SAGO-B7H4-L2P8", status: "redeemed" as RewardStatus, reward: "Free 30ml Pour", expires: "2025-07-12", bar: "The Whisky Lounge" },
  { id: 3, user: "David Njuguna", type: "jackpot" as const, code: "SAGO-C1J6-N5R3", status: "redeemed" as RewardStatus, reward: "Free Bottle", expires: "2025-07-08", bar: "Hemingway's" },
  { id: 4, user: "Anne Odhiambo", type: "premium" as const, code: "SAGO-D4K8-Q7T5", status: "active" as RewardStatus, reward: "Free 30ml Pour", expires: "2025-07-20", bar: null },
  { id: 5, user: "Sarah Kiplagat", type: "standard" as const, code: "SAGO-E2M1-S8V6", status: "expired" as RewardStatus, reward: "10% Discount", expires: "2025-06-01", bar: null },
  { id: 6, user: "Mary Juma", type: "standard" as const, code: "SAGO-F6N3-U1W9", status: "active" as RewardStatus, reward: "10% Discount", expires: "2025-07-18", bar: null },
  { id: 7, user: "David Njuguna", type: "premium" as const, code: "SAGO-G9P5-X4Y2", status: "redeemed" as RewardStatus, reward: "Free 30ml Pour", expires: "2025-07-05", bar: "Alchemist Bar" },
  { id: 8, user: "Sarah Kiplagat", type: "standard" as const, code: "SAGO-H3Q7-Z6A4", status: "active" as RewardStatus, reward: "10% Discount", expires: "2025-07-22", bar: null },
];

export default function AdminRewardsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const filtered = mockRewards.filter((r) => {
    const matchesSearch =
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.code.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || r.status === filter;
    return matchesSearch && matchesFilter;
  });

  const statusIcon = (status: RewardStatus) => {
    switch (status) {
      case "active":
        return <Clock size={14} className="text-sago-gold" />;
      case "redeemed":
        return <CheckCircle size={14} className="text-green-400" />;
      case "expired":
        return <XCircle size={14} className="text-red-400" />;
    }
  };

  const typeColor = (type: string) => {
    switch (type) {
      case "jackpot":
        return "bg-yellow-500/10 text-yellow-400";
      case "premium":
        return "bg-sago-gold/10 text-sago-gold";
      default:
        return "bg-sago-green/10 text-sago-green-light";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-sago-cream flex items-center gap-2">
          <Gift size={20} className="text-sago-gold" />
          Rewards & Vouchers
        </h1>
        <p className="text-sm text-sago-cream/40 mt-1">
          {mockRewards.length} total vouchers issued
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active", count: mockRewards.filter(r => r.status === "active").length, color: "text-sago-gold" },
          { label: "Redeemed", count: mockRewards.filter(r => r.status === "redeemed").length, color: "text-green-400" },
          { label: "Expired", count: mockRewards.filter(r => r.status === "expired").length, color: "text-red-400" },
        ].map((s) => (
          <div key={s.label} className="card-luxury p-4 text-center">
            <div className={`text-2xl font-bold font-[family-name:var(--font-display)] ${s.color}`}>
              {s.count}
            </div>
            <p className="text-xs text-sago-cream/40 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-sago-gold/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vouchers..."
            className="w-full bg-sago-charcoal border border-sago-gold/15 rounded-lg pl-11 pr-4 py-2.5 text-sm text-sago-cream placeholder:text-sago-cream/30 focus:outline-none focus:border-sago-gold/40"
          />
        </div>
        <div className="flex gap-2">
          {["all", "active", "redeemed", "expired"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs tracking-wider uppercase transition-all ${
                filter === f
                  ? "btn-gold"
                  : "glass text-sago-cream/50 hover:text-sago-gold"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Rewards List */}
      <div className="space-y-3">
        {filtered.map((reward, i) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="card-luxury p-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {statusIcon(reward.status)}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-sago-gold font-bold">{reward.code}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${typeColor(reward.type)}`}>
                      {reward.type}
                    </span>
                  </div>
                  <p className="text-xs text-sago-cream/40 mt-0.5">
                    {reward.user} — {reward.reward}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-sago-cream/30">
                  {reward.status === "redeemed"
                    ? `Redeemed at ${reward.bar}`
                    : `Expires ${reward.expires}`}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
