"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation, Search, ExternalLink } from "lucide-react";
import GoldParticles from "@/components/ui/GoldParticles";

interface Bar {
  id: number;
  name: string;
  address: string;
  city: string;
  area: string;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
  distance?: number;
}

const BARS: Bar[] = [
  {
    id: 1,
    name: "The Whisky Lounge",
    address: "Westlands Rd, Westlands",
    city: "Nairobi",
    area: "Westlands",
    lat: -1.2669,
    lng: 36.8116,
    phone: "+254 712 345 678",
    hours: "5:00 PM – 2:00 AM",
  },
  {
    id: 2,
    name: "Hemingway's Brasserie",
    address: "Karen Rd, Karen",
    city: "Nairobi",
    area: "Karen",
    lat: -1.3232,
    lng: 36.7123,
    phone: "+254 720 123 456",
    hours: "11:00 AM – 11:00 PM",
  },
  {
    id: 3,
    name: "The Lord Erroll",
    address: "Runda Estate",
    city: "Nairobi",
    area: "Runda",
    lat: -1.2262,
    lng: 36.7981,
    phone: "+254 733 456 789",
    hours: "12:00 PM – 12:00 AM",
  },
  {
    id: 4,
    name: "Sarabi Rooftop",
    address: "Kenyatta Avenue",
    city: "Nairobi",
    area: "CBD",
    lat: -1.2841,
    lng: 36.8255,
    phone: "+254 711 789 012",
    hours: "4:00 PM – 2:00 AM",
  },
  {
    id: 5,
    name: "Alchemist Bar",
    address: "Parklands Rd",
    city: "Nairobi",
    area: "Parklands",
    lat: -1.2599,
    lng: 36.8179,
    phone: "+254 722 345 678",
    hours: "6:00 PM – 4:00 AM",
  },
  {
    id: 6,
    name: "Brew Bistro & Lounge",
    address: "Ngong Rd",
    city: "Nairobi",
    area: "Ngong Road",
    lat: -1.2994,
    lng: 36.7823,
    phone: "+254 710 567 890",
    hours: "11:00 AM – 12:00 AM",
  },
  {
    id: 7,
    name: "Tamarind Dhow",
    address: "Cement Silo Rd, Nyali",
    city: "Mombasa",
    area: "Nyali",
    lat: -4.0309,
    lng: 39.6903,
    phone: "+254 741 234 567",
    hours: "12:30 PM – 11:00 PM",
  },
  {
    id: 8,
    name: "Moonshine Beach Bar",
    address: "Diani Beach Rd",
    city: "Mombasa",
    area: "Diani",
    lat: -4.3321,
    lng: 39.5862,
    phone: "+254 735 678 901",
    hours: "10:00 AM – 1:00 AM",
  },
  {
    id: 9,
    name: "Sails Beach Bar",
    address: "Bamburi Beach",
    city: "Mombasa",
    area: "Bamburi",
    lat: -3.9893,
    lng: 39.7258,
    phone: "+254 728 901 234",
    hours: "9:00 AM – 11:00 PM",
  },
  {
    id: 10,
    name: "The Carnivore",
    address: "Langata Rd",
    city: "Nairobi",
    area: "Langata",
    lat: -1.3282,
    lng: 36.7613,
    phone: "+254 715 456 789",
    hours: "12:00 PM – 12:00 AM",
  },
  {
    id: 11,
    name: "Vic Hotel Lounge",
    address: "Oginga Odinga St",
    city: "Kisumu",
    area: "City Center",
    lat: -0.1022,
    lng: 34.7611,
    phone: "+254 719 012 345",
    hours: "10:00 AM – 11:00 PM",
  },
  {
    id: 12,
    name: "Kiboko Bay Resort",
    address: "Dunga Beach Rd",
    city: "Kisumu",
    area: "Dunga",
    lat: -0.1179,
    lng: 34.7327,
    phone: "+254 732 567 890",
    hours: "8:00 AM – 10:00 PM",
  },
];

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function BarsPage() {
  const [bars, setBars] = useState<Bar[]>(BARS);
  const [selectedBar, setSelectedBar] = useState<Bar | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [locationLoading, setLocationLoading] = useState(false);

  const cities = ["All", ...Array.from(new Set(BARS.map((b) => b.city)))];

  const detectLocation = useCallback(() => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(loc);

          // Sort bars by distance
          const barsWithDistance = BARS.map((bar) => ({
            ...bar,
            distance: calculateDistance(loc.lat, loc.lng, bar.lat, bar.lng),
          })).sort((a, b) => (a.distance || 0) - (b.distance || 0));

          setBars(barsWithDistance);
          setLocationLoading(false);
        },
        () => {
          setLocationLoading(false);
        }
      );
    }
  }, []);

  useEffect(() => {
    detectLocation();
  }, [detectLocation]);

  const filteredBars = bars.filter((bar) => {
    const matchesSearch =
      bar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bar.area.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === "All" || bar.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-b from-sago-black via-sago-dark to-sago-black" />
      <GoldParticles count={15} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.4em] uppercase text-sago-gold/60">
            Discover
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold text-gold-gradient mt-2 mb-3">
            Find a Bar
          </h1>
          <p className="font-[family-name:var(--font-accent)] text-lg text-sago-cream/50 max-w-xl mx-auto">
            Locate participating bars near you. Enjoy Sago and redeem your
            rewards.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-sago-gold/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bars..."
              className="w-full bg-sago-charcoal border border-sago-gold/15 rounded-lg pl-11 pr-4 py-3 text-sm text-sago-cream placeholder:text-sago-cream/30 focus:outline-none focus:border-sago-gold/40 transition-colors"
              id="bar-search"
            />
          </div>

          {/* City Filter */}
          <div className="flex gap-2 flex-wrap">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all ${
                  selectedCity === city
                    ? "btn-gold"
                    : "glass text-sago-cream/60 hover:text-sago-gold"
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* GPS Button */}
          <button
            onClick={detectLocation}
            disabled={locationLoading}
            className="btn-outline-gold px-4 py-2.5 rounded-lg text-xs tracking-wider flex items-center gap-2 shrink-0"
            id="detect-location"
          >
            <Navigation size={14} className={locationLoading ? "animate-spin" : ""} />
            {locationLoading ? "Detecting..." : "Near Me"}
          </button>
        </motion.div>

        {/* Map + Bar List */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-3">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden glass border border-sago-gold/10">
              <iframe
                src={`https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=bars+in+${selectedCity === "All" ? "Kenya" : selectedCity + "+Kenya"}&zoom=${selectedCity === "All" ? 6 : 12}&maptype=roadmap`}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.7)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Participating Bars Map"
                className="rounded-2xl"
              />

              {/* Map Overlay */}
              <div className="absolute bottom-4 left-4 right-4 glass rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-sago-gold animate-pulse" />
                  <span className="text-xs text-sago-cream/70">
                    {filteredBars.length} participating bar{filteredBars.length !== 1 ? "s" : ""}
                  </span>
                </div>
                {userLocation && (
                  <span className="text-xs text-sago-gold/60">
                    📍 GPS Active
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bar List */}
          <div className="lg:col-span-2 space-y-3 max-h-[600px] overflow-y-auto pr-1" style={{ scrollbarWidth: "thin" }}>
            {filteredBars.map((bar, i) => (
              <motion.div
                key={bar.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedBar(selectedBar?.id === bar.id ? null : bar)}
                className={`card-luxury p-4 cursor-pointer transition-all ${
                  selectedBar?.id === bar.id
                    ? "border-sago-gold/40 casino-glow"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-sago-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={16} className="text-sago-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-sago-cream truncate">
                        {bar.name}
                      </h3>
                      {bar.distance !== undefined && (
                        <span className="text-xs text-sago-gold shrink-0">
                          {bar.distance < 1
                            ? `${(bar.distance * 1000).toFixed(0)}m`
                            : `${bar.distance.toFixed(1)}km`}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-sago-cream/40 mt-0.5">
                      {bar.address}, {bar.city}
                    </p>

                    {/* Expanded Details */}
                    {selectedBar?.id === bar.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 pt-3 border-t border-sago-gold/10 space-y-2"
                      >
                        <div className="flex items-center gap-2 text-xs text-sago-cream/50">
                          <Phone size={12} className="text-sago-gold/60" />
                          {bar.phone}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-sago-cream/50">
                          <Clock size={12} className="text-sago-gold/60" />
                          {bar.hours}
                        </div>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${bar.lat},${bar.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-sago-gold hover:text-sago-gold-light transition-colors mt-1"
                        >
                          <ExternalLink size={12} />
                          Get Directions
                        </a>
                        <div className="mt-2 glass-gold rounded-lg px-3 py-2">
                          <p className="text-[10px] text-sago-gold">
                            🎫 Voucher redemption available here
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredBars.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sago-cream/40">No bars found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
