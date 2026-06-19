"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Eye, Smartphone, Globe } from "lucide-react";

const weeklyData = [
  { day: "Mon", views: 450, spins: 120, signups: 35 },
  { day: "Tue", views: 520, spins: 145, signups: 42 },
  { day: "Wed", views: 480, spins: 132, signups: 38 },
  { day: "Thu", views: 610, spins: 178, signups: 55 },
  { day: "Fri", views: 890, spins: 256, signups: 78 },
  { day: "Sat", views: 1200, spins: 342, signups: 95 },
  { day: "Sun", views: 950, spins: 289, signups: 72 },
];

const trafficSources = [
  { source: "Instagram", percentage: 42, color: "bg-pink-500" },
  { source: "Direct", percentage: 28, color: "bg-sago-gold" },
  { source: "WhatsApp", percentage: 18, color: "bg-green-500" },
  { source: "Google", percentage: 8, color: "bg-blue-500" },
  { source: "Other", percentage: 4, color: "bg-gray-500" },
];

const deviceStats = [
  { device: "Mobile", percentage: 76, icon: Smartphone },
  { device: "Desktop", percentage: 20, icon: Globe },
  { device: "Tablet", percentage: 4, icon: Globe },
];

const maxViews = Math.max(...weeklyData.map((d) => d.views));

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-sago-cream flex items-center gap-2">
          <BarChart3 size={20} className="text-sago-gold" />
          Analytics
        </h1>
        <p className="text-sm text-sago-cream/40 mt-1">
          Website performance & engagement metrics
        </p>
      </div>

      {/* Weekly Chart */}
      <div className="card-luxury p-6">
        <h3 className="text-sm font-semibold text-sago-cream mb-1 flex items-center gap-2">
          <TrendingUp size={14} className="text-sago-gold" />
          Weekly Overview
        </h3>
        <p className="text-xs text-sago-cream/30 mb-6">Page views this week</p>

        <div className="flex items-end gap-2 h-40">
          {weeklyData.map((data, i) => (
            <motion.div
              key={data.day}
              initial={{ height: 0 }}
              animate={{ height: `${(data.views / maxViews) * 100}%` }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <span className="text-[10px] text-sago-gold">{data.views}</span>
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-sago-gold/30 to-sago-gold/80 min-h-[4px]"
                style={{ height: "100%" }}
              />
              <span className="text-[10px] text-sago-cream/40 mt-1">{data.day}</span>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex gap-6 mt-6 pt-4 border-t border-sago-gold/10">
          {[
            { label: "Total Views", value: weeklyData.reduce((a, b) => a + b.views, 0).toLocaleString() },
            { label: "Total Spins", value: weeklyData.reduce((a, b) => a + b.spins, 0).toLocaleString() },
            { label: "New Signups", value: weeklyData.reduce((a, b) => a + b.signups, 0).toLocaleString() },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-lg font-bold text-sago-gold font-[family-name:var(--font-display)]">
                {stat.value}
              </p>
              <p className="text-[10px] text-sago-cream/40 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="card-luxury p-6">
          <h3 className="text-sm font-semibold text-sago-cream mb-4 flex items-center gap-2">
            <Eye size={14} className="text-sago-gold" />
            Traffic Sources
          </h3>
          <div className="space-y-3">
            {trafficSources.map((source, i) => (
              <motion.div
                key={source.source}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-sago-cream">{source.source}</span>
                  <span className="text-sm text-sago-gold">{source.percentage}%</span>
                </div>
                <div className="h-2 bg-sago-charcoal rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${source.percentage}%` }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                    className={`h-full rounded-full ${source.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="card-luxury p-6">
          <h3 className="text-sm font-semibold text-sago-cream mb-4 flex items-center gap-2">
            <Users size={14} className="text-sago-gold" />
            Device Breakdown
          </h3>
          <div className="space-y-4">
            {deviceStats.map((device) => {
              const Icon = device.icon;
              return (
                <div key={device.device} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-sago-charcoal flex items-center justify-center">
                    <Icon size={16} className="text-sago-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-sago-cream">{device.device}</span>
                      <span className="text-sm font-bold text-sago-gold">{device.percentage}%</span>
                    </div>
                    <div className="h-2 bg-sago-charcoal rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sago-gold to-sago-amber"
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-sago-gold/10 text-center">
            <p className="text-xs text-sago-cream/40">
              📱 76% mobile traffic confirms mobile-first strategy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
