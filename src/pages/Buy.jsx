import React from "react";

export default function Buy() {
  const predefinedAmounts = [
    { label: "0.1 SOL", value: "0.1", usd: "$10.50" },
    { label: "0.5 SOL", value: "0.5", usd: "$52.50" },
    { label: "1 SOL", value: "1", usd: "$105.00" },
    { label: "5 SOL", value: "5", usd: "$525.00" },
    { label: "10 SOL", value: "10", usd: "$1,050.00" },
  ];

  const paymentMethods = [
    {
      id: "solana",
      name: "Solana (SOL)",
      icon: "◎",
      color: "from-purple-500 to-blue-500",
    },
    {
      id: "usdc",
      name: "USDC",
      icon: "💵",
      color: "from-blue-500 to-green-500",
    },
    {
      id: "phantom",
      name: "Phantom Wallet",
      icon: "👻",
      color: "from-purple-600 to-pink-500",
    },
    {
      id: "solflare",
      name: "Solflare",
      icon: "🔥",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Buy{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              MOONR
            </span>{" "}
            Tokens
          </h1>
          <p className="text-xl text-gray-300">
            Join the MOONR ecosystem on Solana blockchain
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Buy Form */}
          <div className="bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span>💰</span> Purchase MOONR
            </h2>

 

              {/* Custom Amount */}
              <div className="relative">
                <input
                  type="number"
                  placeholder="Enter custom amount..."
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                  min="0"
                  step="0.001"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  SOL
                </span>
              </div>
            </div>

            {/* Conversion Display */}
            <div className="bg-black/30 rounded-lg p-4 mb-6 border border-purple-500/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">You Pay:</span>
                <span className="text-white font-mono">
                  {getCurrentAmount()} SOL
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">You Receive:</span>
                <span className="text-green-400 font-mono">
                  {calculateMOONR(getCurrentAmount())} MOONR
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Rate:</span>
                <span className="text-purple-400 font-mono">
                  1 SOL = 4,273.5 MOONR
                </span>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-gray-400 mt-4 text-center">
              * Prices are subject to market conditions. Minimum purchase: 0.001
              SOL
            </p>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Token Stats */}
            <div className="bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>📊</span> Token Information
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Supply:</span>
                  <span className="text-white font-mono">
                    1,000,000,000 MOONR
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Circulating Supply:</span>
                  <span className="text-white font-mono">
                    750,000,000 MOONR
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Price:</span>
                  <span className="text-green-400 font-mono">$0.0234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Market Cap:</span>
                  <span className="text-white font-mono">$17.55M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Holders:</span>
                  <span className="text-white font-mono">1,247</span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-green-900/40 backdrop-blur-xl rounded-2xl border border-green-500/30 shadow-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🎁</span> MOONR Benefits
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <div className="text-white font-medium">
                      Governance Rights
                    </div>
                    <div className="text-gray-400 text-sm">
                      Vote on protocol decisions
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <div className="text-white font-medium">
                      Staking Rewards
                    </div>
                    <div className="text-gray-400 text-sm">
                      Earn up to 15% APY
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <div className="text-white font-medium">
                      Orb Interactions
                    </div>
                    <div className="text-gray-400 text-sm">
                      Enhanced sphere rewards
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <div className="text-white font-medium">Early Access</div>
                    <div className="text-gray-400 text-sm">
                      New features & partnerships
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-gradient-to-br from-blue-900/40 via-cyan-900/40 to-blue-900/40 backdrop-blur-xl rounded-2xl border border-blue-500/30 shadow-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🔒</span> Security & Trust
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">🛡️</span>
                  <span className="text-white">Audited Smart Contracts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">⚡</span>
                  <span className="text-white">Built on Solana</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">🔐</span>
                  <span className="text-white">Non-custodial</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">📈</span>
                  <span className="text-white">Transparent on-chain</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
