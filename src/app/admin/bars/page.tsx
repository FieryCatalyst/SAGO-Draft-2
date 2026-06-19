"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Plus, Edit2, Trash2, CheckCircle, XCircle } from "lucide-react";

interface AdminBar {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  isActive: boolean;
  redemptions: number;
}

const mockBars: AdminBar[] = [
  { id: 1, name: "The Whisky Lounge", address: "Westlands Rd, Westlands", city: "Nairobi", phone: "+254 712 345 678", hours: "5:00 PM – 2:00 AM", isActive: true, redemptions: 45 },
  { id: 2, name: "Hemingway's Brasserie", address: "Karen Rd, Karen", city: "Nairobi", phone: "+254 720 123 456", hours: "11:00 AM – 11:00 PM", isActive: true, redemptions: 32 },
  { id: 3, name: "The Lord Erroll", address: "Runda Estate", city: "Nairobi", phone: "+254 733 456 789", hours: "12:00 PM – 12:00 AM", isActive: true, redemptions: 18 },
  { id: 4, name: "Sarabi Rooftop", address: "Kenyatta Avenue", city: "Nairobi", phone: "+254 711 789 012", hours: "4:00 PM – 2:00 AM", isActive: true, redemptions: 12 },
  { id: 5, name: "Tamarind Dhow", address: "Cement Silo Rd, Nyali", city: "Mombasa", phone: "+254 741 234 567", hours: "12:30 PM – 11:00 PM", isActive: true, redemptions: 28 },
  { id: 6, name: "Moonshine Beach Bar", address: "Diani Beach Rd", city: "Mombasa", phone: "+254 735 678 901", hours: "10:00 AM – 1:00 AM", isActive: false, redemptions: 5 },
];

export default function AdminBarsPage() {
  const [bars, setBars] = useState<AdminBar[]>(mockBars);
  const [showAdd, setShowAdd] = useState(false);

  const toggleActive = (id: number) => {
    setBars(bars.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b)));
  };

  const deleteBar = (id: number) => {
    setBars(bars.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-sago-cream flex items-center gap-2">
            <MapPin size={20} className="text-sago-gold" />
            Participating Bars
          </h1>
          <p className="text-sm text-sago-cream/40 mt-1">
            {bars.filter((b) => b.isActive).length} active bars
          </p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="btn-gold px-4 py-2.5 rounded-lg text-xs tracking-wider flex items-center gap-2"
        >
          <Plus size={14} />
          Add Bar
        </button>
      </div>

      {/* Add Bar Form (toggle) */}
      {showAdd && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="card-luxury p-6"
        >
          <h3 className="text-sm font-semibold text-sago-cream mb-4">Add New Bar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Name", "Address", "City", "Phone", "Hours"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field}
                className="bg-sago-charcoal border border-sago-gold/15 rounded-lg px-4 py-2.5 text-sm text-sago-cream placeholder:text-sago-cream/30 focus:outline-none focus:border-sago-gold/40"
              />
            ))}
            <button className="btn-gold py-2.5 rounded-lg text-xs tracking-wider">
              Save Bar
            </button>
          </div>
        </motion.div>
      )}

      {/* Bars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bars.map((bar, i) => (
          <motion.div
            key={bar.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`card-luxury p-5 ${!bar.isActive ? "opacity-60" : ""}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sago-cream">{bar.name}</h3>
                {bar.isActive ? (
                  <CheckCircle size={14} className="text-green-400" />
                ) : (
                  <XCircle size={14} className="text-red-400" />
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleActive(bar.id)}
                  className={`text-xs px-2 py-1 rounded ${
                    bar.isActive
                      ? "text-red-400 hover:bg-red-400/10"
                      : "text-green-400 hover:bg-green-400/10"
                  } transition-colors`}
                >
                  {bar.isActive ? "Deactivate" : "Activate"}
                </button>
                <button className="text-sago-cream/30 hover:text-sago-gold transition-colors">
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => deleteBar(bar.id)}
                  className="text-sago-cream/30 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="text-xs text-sago-cream/40">{bar.address}, {bar.city}</p>
            <p className="text-xs text-sago-cream/30 mt-1">{bar.phone} · {bar.hours}</p>
            <div className="mt-3 pt-3 border-t border-sago-gold/5 flex items-center justify-between">
              <span className="text-xs text-sago-cream/40">Redemptions</span>
              <span className="text-sm font-bold text-sago-gold">{bar.redemptions}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
