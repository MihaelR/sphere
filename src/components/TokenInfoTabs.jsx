import React, { useState } from "react";
import TokenInfoBanner from "./TokenInfoBanner";

export default function TokenInfoTabs() {
  const [activeTab, setActiveTab] = useState("info"); // "info" or "holders"

  // Mock top holders data - simplified
  const topHolders = [
    { address: "0xA1B2...C3D4", spots: 12 },
    { address: "0xE5F6...G7H8", spots: 8 },
    { address: "0xI9J0...K1L2", spots: 6 },
    { address: "0xM3N4...O5P6", spots: 5 },
    { address: "0xQ7R8...S9T0", spots: 4 },
    { address: "0xU1V2...W3X4", spots: 3 },
    { address: "0xY5Z6...A7B8", spots: 3 },
    { address: "0xC9D0...E1F2", spots: 2 },
    { address: "0xF3G4...H5I6", spots: 2 },
    { address: "0xJ7K8...L9M0", spots: 1 },
  ];

  return (
    <div className="w-full h-full rounded-xl shadow-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 via-blue-900/30 to-purple-900/20 backdrop-blur-lg border border-purple-500/30 flex flex-col">
      {/* Tab Header - Made smaller */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 p-2 text-white flex-shrink-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"></div>
        <div className="relative z-10">
          {/* Tab Buttons - Smaller */}
          <div className="flex bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab("info")}
              className={`flex-1 px-2 py-1.5 text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                activeTab === "info"
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="text-sm">💰</span>
              <span>Token Info</span>
            </button>
            <button
              onClick={() => setActiveTab("holders")}
              className={`flex-1 px-2 py-1.5 text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                activeTab === "holders"
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="text-sm">👑</span>
              <span>Top Holders</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden min-h-0 p-3">
        {activeTab === "info" ? (
          <div className="h-full">
            <TokenInfoBanner />
          </div>
        ) : (
          <div className="h-full">
            {/* Top Holders List - Simplified */}
            <div className="space-y-3">
              <div className="text-center mb-3">
                <h3 className="text-sm font-bold text-white mb-1">
                  Top MOONR Holders
                </h3>
                <p className="text-xs text-purple-200/80">
                  Spots owned by wallet
                </p>
              </div>

              <div
                className="space-y-1.5 max-h-96 overflow-y-auto pr-1"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(168, 85, 247, 0.5) transparent",
                }}
              >
                {topHolders.map((holder, index) => (
                  <div
                    key={holder.address}
                    className="bg-black/30 rounded-lg p-2.5 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-200 hover:bg-black/40"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {/* Rank - smaller */}
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold text-xs">
                          #{index + 1}
                        </div>

                        {/* Wallet Address */}
                        <div className="text-xs font-mono text-purple-300 font-medium">
                          {holder.address}
                        </div>
                      </div>

                      {/* Number of spots - simplified */}
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-400">
                          {holder.spots}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary - simplified */}
              <div className="mt-3 pt-2 border-t border-purple-500/30">
                <div className="text-center">
                  <div className="bg-black/20 rounded-lg p-2">
                    <div className="text-sm font-bold text-cyan-400">
                      98 Total Holders
                    </div>
                    <div className="text-xs text-gray-400">46 spots owned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
