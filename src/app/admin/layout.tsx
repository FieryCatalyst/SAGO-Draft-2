"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Gift,
  MapPin,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users & Leads", icon: Users },
  { href: "/admin/rewards", label: "Rewards", icon: Gift },
  { href: "/admin/bars", label: "Bars", icon: MapPin },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const auth = sessionStorage.getItem("sago-admin-auth");
    if (auth === "true") setAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password auth (replace with proper auth in production)
    if (password === "sagoadmin2025") {
      setAuthenticated(true);
      sessionStorage.setItem("sago-admin-auth", "true");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem("sago-admin-auth");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-sago-black flex items-center justify-center p-4">
        <div className="max-w-sm w-full">
          <div className="card-luxury p-8 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gold-gradient mb-1">
              Admin Panel
            </h2>
            <p className="text-xs text-sago-cream/40 mb-6">Sago Whisky Management</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-sago-charcoal border border-sago-gold/15 rounded-lg px-4 py-3 text-sm text-sago-cream placeholder:text-sago-cream/30 focus:outline-none focus:border-sago-gold/40"
                id="admin-password"
              />
              <button
                type="submit"
                className="btn-gold w-full py-3 rounded-lg text-xs tracking-widest"
                id="admin-login"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sago-black flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-sago-dark border-r border-sago-gold/10 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col pt-20 lg:pt-8">
          {/* Logo */}
          <div className="px-6 mb-8">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gold-gradient">
              sago
            </h2>
            <p className="text-[10px] tracking-[0.2em] uppercase text-sago-gold/40 mt-0.5">
              Admin Dashboard
            </p>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    isActive
                      ? "bg-sago-gold/10 text-sago-gold border border-sago-gold/20"
                      : "text-sago-cream/50 hover:text-sago-cream hover:bg-sago-charcoal/50"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-sago-gold/10">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sago-cream/40 hover:text-red-400 transition-colors w-full"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-20 left-4 z-50 lg:hidden bg-sago-charcoal border border-sago-gold/20 rounded-lg p-2 text-sago-gold"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8 pt-24 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}
