import React, { useState, useEffect } from "react";

const mockOwners = [
  {
    address: "0x742d...A6E2",
    count: 127,
    value: "45.7 ETH",
    avatar: "👑",
    rank: 1,
    change: "+5",
  },
  {
    address: "0x8F1C...B3D4",
    count: 89,
    value: "32.1 ETH",
    avatar: "💎",
    rank: 2,
    change: "+2",
  },
  {
    address: "0x5A9E...C7F8",
    count: 67,
    value: "28.4 ETH",
    avatar: "🚀",
    rank: 3,
    change: "0",
  },
  {
    address: "0x3D2B...E9A1",
    count: 54,
    value: "21.8 ETH",
    avatar: "⚡",
    rank: 4,
    change: "-1",
  },
  {
    address: "0x7C8F...D5B6",
    count: 43,
    value: "17.2 ETH",
    avatar: "🌟",
    rank: 5,
    change: "+3",
  },
];

export default function TopOwners() {
  const [owners, setOwners] = useState(mockOwners);
  const [timeFrame, setTimeFrame] = useState("24h");

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 to-orange-400";
      case 2:
        return "from-gray-300 to-gray-400";
      case 3:
        return "from-amber-600 to-amber-700";
      default:
        return "from-blue-400 to-purple-400";
    }
  };

  const getChangeIcon = (change) => {
    const num = parseInt(change);
    if (num > 0) return { icon: "📈", color: "text-green-400" };
    if (num < 0) return { icon: "📉", color: "text-red-400" };
    return { icon: "➖", color: "text-gray-400" };
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-base-200/80 to-base-300/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 overflow-hidden">
        {/* Header - More Compact */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-3 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <span className="text-lg">🏆</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold">Top Owners</h2>
                  <p className="text-white/80 text-xs">Leading collectors</p>
                </div>
              </div>

              {/* Time frame selector */}
              <div className="flex bg-white/20 rounded-lg overflow-hidden backdrop-blur-sm">
                {["24h", "7d", "30d"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimeFrame(period)}
                    className={`px-2 py-1 text-xs font-medium transition-all ${
                      timeFrame === period
                        ? "bg-white/30 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
        </div>

        {/* Owners List - More Compact */}
        <div className="p-4">
          <div className="space-y-2">
            {owners.map((owner, index) => {
              const changeData = getChangeIcon(owner.change);
              return (
                <div
                  key={owner.address}
                  className="group relative bg-base-100/80 backdrop-blur-sm rounded-lg border border-base-content/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg overflow-hidden"
                >
                  {/* Rank indicator gradient */}
                  <div
                    className={`h-0.5 bg-gradient-to-r ${getRankColor(
                      owner.rank
                    )}`}
                  ></div>

                  <div className="p-3">
                    <div className="flex items-center gap-3">
                      {/* Rank */}
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getRankColor(
                          owner.rank
                        )} flex items-center justify-center font-bold text-white shadow-lg text-sm`}
                      >
                        #{owner.rank}
                      </div>

                      {/* Avatar */}
                      <div className="w-6 h-6 bg-base-300 rounded flex items-center justify-center text-sm">
                        {owner.avatar}
                      </div>

                      {/* Owner info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-base-content/90 text-sm">
                            {owner.address}
                          </span>
                          <div
                            className={`flex items-center gap-1 ${changeData.color}`}
                          >
                            <span className="text-[10px]">
                              {changeData.icon}
                            </span>
                            <span className="text-[10px] font-medium">
                              {owner.change}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-base-content/70">
                            <span className="font-semibold text-primary">
                              {owner.count}
                            </span>{" "}
                            orbs
                          </span>
                          <span className="text-xs text-base-content/70">
                            <span className="font-semibold text-accent">
                              {owner.value}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Action button */}
                      <button className="px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium text-xs hover:shadow-lg transition-all duration-300 hover:scale-105">
                        View
                      </button>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between text-[10px] text-base-content/60 border-t border-base-content/10 pt-2">
            <div>Updates every 10 min</div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              <span>Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
