"use client";

import { motion } from "framer-motion";
import { Users, Gift, MapPin, TrendingUp, Activity, Eye } from "lucide-react";

// Mock data for dashboard
const stats = [
  { label: "Total Users", value: "1,247", change: "+12%", icon: Users, color: "text-blue-400" },
  { label: "Total Spins", value: "3,891", change: "+28%", icon: Activity, color: "text-green-400" },
  { label: "Active Vouchers", value: "342", change: "+8%", icon: Gift, color: "text-sago-gold" },
  { label: "Redemptions", value: "156", change: "+15%", icon: TrendingUp, color: "text-purple-400" },
  { label: "Participating Bars", value: "12", change: "+2", icon: MapPin, color: "text-red-400" },
  { label: "Page Views (Today)", value: "4,521", change: "+34%", icon: Eye, color: "text-cyan-400" },
];

const recentActivity = [
  { type: "spin", user: "John M.", result: "Won 10% Discount", time: "2 mins ago" },
  { type: "register", user: "Grace W.", result: "New Registration", time: "5 mins ago" },
  { type: "redeem", user: "Peter K.", result: "Voucher Redeemed", time: "12 mins ago" },
  { type: "spin", user: "Anne O.", result: "Won Free 30ml Pour", time: "18 mins ago" },
  { type: "register", user: "David N.", result: "New Registration", time: "25 mins ago" },
  { type: "spin", user: "Mary J.", result: "No Win", time: "31 mins ago" },
  { type: "redeem", user: "James L.", result: "Voucher Redeemed", time: "45 mins ago" },
  { type: "spin", user: "Sarah K.", result: "Won Free Bottle!", time: "1 hour ago" },
];

const topBars = [
  { name: "The Whisky Lounge", city: "Nairobi", redemptions: 45 },
  { name: "Hemingway's", city: "Nairobi", redemptions: 32 },
  { name: "Tamarind Dhow", city: "Mombasa", redemptions: 28 },
  { name: "Alchemist Bar", city: "Nairobi", redemptions: 21 },
  { name: "The Carnivore", city: "Nairobi", redemptions: 18 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-sago-cream">
          Dashboard
        </h1>
        <p className="text-sm text-sago-cream/40 mt-1">
          Overview of Sago Whisky performance metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-luxury p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg bg-sago-charcoal flex items-center justify-center ${stat.color}`}>
                  <Icon size={16} />
                </div>
                <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-sago-cream font-[family-name:var(--font-display)]">
                {stat.value}
              </div>
              <p className="text-xs text-sago-cream/40 mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card-luxury p-5">
          <h3 className="text-sm font-semibold text-sago-cream mb-4 flex items-center gap-2">
            <Activity size={14} className="text-sago-gold" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-sago-gold/5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "spin"
                        ? "bg-sago-gold"
                        : activity.type === "register"
                        ? "bg-blue-400"
                        : "bg-green-400"
                    }`}
                  />
                  <div>
                    <p className="text-sm text-sago-cream">{activity.user}</p>
                    <p className="text-xs text-sago-cream/40">{activity.result}</p>
                  </div>
                </div>
                <span className="text-[10px] text-sago-cream/30">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Bars */}
        <div className="card-luxury p-5">
          <h3 className="text-sm font-semibold text-sago-cream mb-4 flex items-center gap-2">
            <MapPin size={14} className="text-sago-gold" />
            Top Bars by Redemptions
          </h3>
          <div className="space-y-3">
            {topBars.map((bar, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-sago-gold w-5 text-right font-bold">
                  #{i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm text-sago-cream">{bar.name}</p>
                    <span className="text-xs text-sago-gold">{bar.redemptions}</span>
                  </div>
                  <div className="h-1.5 bg-sago-charcoal rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sago-gold to-sago-amber rounded-full"
                      style={{ width: `${(bar.redemptions / 50) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-sago-cream/30 mt-0.5">{bar.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
