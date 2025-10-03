import React, { useState, useEffect } from "react";

export default function SphereStats() {
  const [stats, setStats] = useState({
    totalOrbs: 10000,
    ownedOrbs: 3247,
    floorPrice: 0.85,
    volume24h: 127.5,
    uniqueOwners: 892,
    avgPrice: 1.24,
  });

  const [animatedStats, setAnimatedStats] = useState(stats);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        volume24h: prev.volume24h + (Math.random() - 0.5) * 2,
        floorPrice: Math.max(
          0.1,
          prev.floorPrice + (Math.random() - 0.5) * 0.05
        ),
        ownedOrbs: Math.min(
          prev.totalOrbs,
          prev.ownedOrbs + Math.floor(Math.random() * 3)
        ),
        uniqueOwners: prev.uniqueOwners + Math.floor(Math.random() * 2),
      }));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Animate stat changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats(stats);
    }, 100);
    return () => clearTimeout(timer);
  }, [stats]);

  const statCards = [
    {
      label: "Total Orbs",
      value: stats.totalOrbs.toLocaleString(),
      icon: "🌐",
      color: "from-blue-500 to-cyan-500",
      change: null,
    },
    {
      label: "Minted",
      value: `${((stats.ownedOrbs / stats.totalOrbs) * 100).toFixed(1)}%`,
      subValue: `${stats.ownedOrbs.toLocaleString()}`,
      icon: "⚡",
      color: "from-green-500 to-emerald-500",
      change: "+0.3%",
    },
    {
      label: "Floor Price",
      value: `${stats.floorPrice.toFixed(2)} ETH`,
      icon: "💎",
      color: "from-purple-500 to-pink-500",
      change: "+2.1%",
    },
    {
      label: "24h Volume",
      value: `${stats.volume24h.toFixed(1)} ETH`,
      icon: "📈",
      color: "from-orange-500 to-red-500",
      change: "+15.7%",
    },
    {
      label: "Owners",
      value: stats.uniqueOwners.toLocaleString(),
      icon: "👥",
      color: "from-teal-500 to-cyan-500",
      change: "+1.2%",
    },
    {
      label: "Avg Price",
      value: `${stats.avgPrice.toFixed(2)} ETH`,
      icon: "⚖️",
      color: "from-indigo-500 to-purple-500",
      change: "+0.8%",
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-base-200/80 to-base-300/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 overflow-hidden">
        {/* Header - Much More Compact */}
        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-1.5 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <span className="text-xs">📊</span>
                </div>
                <h2 className="text-xs font-bold">MOONR stats</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid - More Compact */}
        <div className="p-3">
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
            {statCards.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative bg-base-100/80 backdrop-blur-sm rounded-lg border border-base-content/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden p-1.5"
              >
                {/* Gradient indicator */}
                <div className={`h-0.5 bg-gradient-to-r ${stat.color}`}></div>

                <div className="pt-1.5">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{stat.icon}</span>
                    {stat.change && (
                      <div
                        className={`text-[8px] font-medium px-1 py-0.5 rounded-full ${
                          stat.change.startsWith("+")
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {stat.change}
                      </div>
                    )}
                  </div>

                  {/* Value */}
                  <div className="mb-1">
                    <div className="text-xs font-bold text-base-content/90 group-hover:text-primary transition-colors leading-tight">
                      {stat.value}
                    </div>
                    {stat.subValue && (
                      <div className="text-[9px] text-base-content/60">
                        {stat.subValue}
                      </div>
                    )}
                  </div>

                  {/* Label */}
                  <div className="text-[9px] font-medium text-base-content/70">
                    {stat.label}
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
