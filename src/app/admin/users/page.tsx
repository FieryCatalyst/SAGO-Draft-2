"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, Mail, Phone } from "lucide-react";

const mockUsers = [
  { id: 1, name: "John Mwangi", email: "john@email.com", whatsapp: "+254 712 345 678", spins: 5, wins: 1, joined: "2025-06-15" },
  { id: 2, name: "Grace Wanjiku", email: "grace@email.com", whatsapp: "+254 720 123 456", spins: 3, wins: 0, joined: "2025-06-14" },
  { id: 3, name: "Peter Kamau", email: "peter@email.com", whatsapp: "+254 733 456 789", spins: 8, wins: 2, joined: "2025-06-12" },
  { id: 4, name: "Anne Odhiambo", email: "anne@email.com", whatsapp: "+254 711 789 012", spins: 2, wins: 1, joined: "2025-06-10" },
  { id: 5, name: "David Njuguna", email: "david@email.com", whatsapp: "+254 722 345 678", spins: 12, wins: 3, joined: "2025-06-08" },
  { id: 6, name: "Mary Juma", email: "mary@email.com", whatsapp: "+254 710 567 890", spins: 6, wins: 1, joined: "2025-06-05" },
  { id: 7, name: "James Lekimenju", email: "james@email.com", whatsapp: "+254 741 234 567", spins: 4, wins: 0, joined: "2025-06-03" },
  { id: 8, name: "Sarah Kiplagat", email: "sarah@email.com", whatsapp: "+254 735 678 901", spins: 9, wins: 2, joined: "2025-06-01" },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");

  const filtered = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-sago-cream">
            Users & Leads
          </h1>
          <p className="text-sm text-sago-cream/40 mt-1">
            {mockUsers.length} registered users
          </p>
        </div>
        <button className="btn-outline-gold px-4 py-2.5 rounded-lg text-xs tracking-wider flex items-center gap-2">
          <Download size={14} />
          Export CSV
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-sago-gold/40" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full bg-sago-charcoal border border-sago-gold/15 rounded-lg pl-11 pr-4 py-2.5 text-sm text-sago-cream placeholder:text-sago-cream/30 focus:outline-none focus:border-sago-gold/40"
        />
      </div>

      {/* Table */}
      <div className="card-luxury overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sago-gold/10">
                <th className="text-left px-4 py-3 text-xs text-sago-gold/60 tracking-wider uppercase font-medium">Name</th>
                <th className="text-left px-4 py-3 text-xs text-sago-gold/60 tracking-wider uppercase font-medium hidden sm:table-cell">Contact</th>
                <th className="text-center px-4 py-3 text-xs text-sago-gold/60 tracking-wider uppercase font-medium">Spins</th>
                <th className="text-center px-4 py-3 text-xs text-sago-gold/60 tracking-wider uppercase font-medium">Wins</th>
                <th className="text-right px-4 py-3 text-xs text-sago-gold/60 tracking-wider uppercase font-medium hidden md:table-cell">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-sago-gold/5 hover:bg-sago-charcoal/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-sago-cream">{user.name}</p>
                    <p className="text-xs text-sago-cream/30 sm:hidden">{user.email}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs text-sago-cream/50">
                        <Mail size={10} /> {user.email}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-sago-cream/30 mt-0.5">
                      <Phone size={10} /> {user.whatsapp}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-sago-cream/60">{user.spins}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      user.wins > 0 ? "bg-sago-gold/10 text-sago-gold" : "text-sago-cream/30"
                    }`}>
                      {user.wins}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-sago-cream/30 hidden md:table-cell">
                    {user.joined}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
