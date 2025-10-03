import React, { useState } from "react";

export default function Buy() {
  const [selectedRarity, setSelectedRarity] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [swapAmount, setSwapAmount] = useState("1");
  const [swapFrom, setSwapFrom] = useState("ETH");

  const featuredOrbs = [
    {
      id: 1,
      name: "Celestial Nexus",
      rarity: "Legendary",
      price: "2.5 ETH",
      image: "🌌",
      traits: ["Cosmic Aura", "Stellar Core", "Nebula Essence"],
      owner: "0xABC...123",
    },
    {
      id: 7,
      name: "Quantum Sphere",
      rarity: "Rare",
      price: "1.2 ETH",
      image: "⚛️",
      traits: ["Quantum Field", "Energy Matrix", "Particle Flow"],
      owner: "0xDEF...456",
    },
    {
      id: 42,
      name: "Solar Flare",
      rarity: "Common",
      price: "0.8 ETH",
      image: "☀️",
      traits: ["Solar Wind", "Plasma Core", "Heat Signature"],
      owner: "0x789...GHI",
    },
    {
      id: 888,
      name: "Dark Matter",
      rarity: "Legendary",
      price: "3.1 ETH",
      image: "🕳️",
      traits: ["Void Essence", "Gravity Well", "Space-Time Distortion"],
      owner: "0x321...ABC",
    },
    {
      id: 156,
      name: "Crystal Vortex",
      rarity: "Rare",
      price: "1.5 ETH",
      image: "💎",
      traits: ["Crystal Matrix", "Prismatic Core", "Light Refraction"],
      owner: "0x654...DEF",
    },
    {
      id: 999,
      name: "Infinity Loop",
      rarity: "Legendary",
      price: "4.7 ETH",
      image: "♾️",
      traits: ["Infinite Recursion", "Loop Dynamics", "Eternal Motion"],
      owner: "0x987...654",
    },
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "Legendary":
        return "text-purple-400 bg-purple-500/20 border-purple-500/30";
      case "Rare":
        return "text-blue-400 bg-blue-500/20 border-blue-500/30";
      case "Common":
        return "text-gray-400 bg-gray-500/20 border-gray-500/30";
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30";
    }
  };

  const mintingPhases = [
    {
      phase: "Genesis Collection",
      description: "First 1,000 orbs with exclusive traits",
      price: "0.5 ETH",
      status: "Sold Out",
      available: 0,
      total: 1000,
    },
    {
      phase: "Cosmic Expansion",
      description: "Premium orbs with enhanced properties",
      price: "0.8 ETH",
      status: "Live",
      available: 234,
      total: 2000,
    },
    {
      phase: "Universal Collection",
      description: "Standard collection with diverse traits",
      price: "0.3 ETH",
      status: "Coming Soon",
      available: 7000,
      total: 7000,
    },
  ];

  const getSwapEstimate = () => {
    const rates = { ETH: 1, USDC: 0.0003, DAI: 0.0003 };
    const orbPrice = 0.8; // ETH
    const fromRate = rates[swapFrom];
    const estimatedOrbs = (parseFloat(swapAmount) * fromRate) / orbPrice;
    return estimatedOrbs.toFixed(2);
  };

  return (
    <div className="page-content">
      {/* Hero Section - Compact */}
      <div className="content-card mb-6 text-center bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-gradient">
          Collect MOONR Orbs
        </h1>
        <p className="text-lg leading-relaxed mb-6 text-center">
          Discover and collect unique 3D orbs in the MOONR universe. Each orb is
          a one-of-a-kind digital masterpiece with provable ownership on the
          blockchain.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-400 mb-1">10,000</div>
            <p className="text-xs text-gray-400">Total Supply</p>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-400 mb-1">3,247</div>
            <p className="text-xs text-gray-400">Minted</p>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-400 mb-1">
              0.85 ETH
            </div>
            <p className="text-xs text-gray-400">Floor Price</p>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-yellow-400 mb-1">
              127.5 ETH
            </div>
            <p className="text-xs text-gray-400">Volume</p>
          </div>
        </div>
      </div>

      {/* Swap Section */}
      <div className="content-card mb-6 max-w-2xl">
        <h2 className="text-accent mb-4 text-center text-xl">Quick Swap</h2>
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700/50">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={swapAmount}
                  onChange={(e) => setSwapAmount(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  placeholder="1.0"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  From
                </label>
                <select
                  value={swapFrom}
                  onChange={(e) => setSwapFrom(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="ETH">ETH</option>
                  <option value="USDC">USDC</option>
                  <option value="DAI">DAI</option>
                </select>
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">Estimated Orbs</div>
              <div className="text-2xl font-bold text-green-400">
                {getSwapEstimate()}
              </div>
            </div>

            <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-300">
              Swap & Mint
            </button>
          </div>
        </div>
      </div>

      {/* Minting Phases - Compact */}
      <div className="content-card mb-6 max-w-4xl">
        <h2 className="text-accent mb-4 text-center text-xl">Minting Phases</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {mintingPhases.map((phase, index) => (
            <div
              key={index}
              className={`rounded-xl p-4 border-2 transition-all duration-300 ${
                phase.status === "Live"
                  ? "bg-green-500/10 border-green-500/50 shadow-lg shadow-green-500/20"
                  : phase.status === "Sold Out"
                  ? "bg-red-500/10 border-red-500/30"
                  : "bg-blue-500/10 border-blue-500/30"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-bold text-white">
                  {phase.phase}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    phase.status === "Live"
                      ? "bg-green-500 text-white"
                      : phase.status === "Sold Out"
                      ? "bg-red-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {phase.status}
                </span>
              </div>
              <p className="text-sm text-gray-300 mb-3">{phase.description}</p>
              <div className="space-y-1 mb-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Price:</span>
                  <span className="text-sm font-bold text-blue-300">
                    {phase.price}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Available:</span>
                  <span className="text-sm font-bold text-green-300">
                    {phase.available.toLocaleString()}
                  </span>
                </div>
              </div>
              <button
                className={`w-full py-2 rounded-lg font-medium transition-all duration-300 ${
                  phase.status === "Live"
                    ? "bg-green-500 hover:bg-green-600 text-white hover:scale-105"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
                disabled={phase.status !== "Live"}
              >
                {phase.status === "Live" ? "Mint Now" : phase.status}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Marketplace - Compact */}
      <div className="content-card mb-6 max-w-4xl">
        <h2 className="text-accent mb-4 text-center text-xl">Marketplace</h2>
        <div className="grid md:grid-cols-3 gap-3 mb-4">
          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Rarities</option>
            <option value="legendary">Legendary</option>
            <option value="rare">Rare</option>
            <option value="common">Common</option>
          </select>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Prices</option>
            <option value="under1">Under 1 ETH</option>
            <option value="1to3">1-3 ETH</option>
            <option value="over3">Over 3 ETH</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rarity">Rarity</option>
          </select>
        </div>

        {/* Featured Orbs Grid - Compact */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredOrbs.map((orb) => (
            <div
              key={orb.id}
              className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="text-3xl">{orb.image}</div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold border ${getRarityColor(
                      orb.rarity
                    )}`}
                  >
                    {orb.rarity}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  #{orb.id} {orb.name}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Owned by {orb.owner}
                </p>

                {/* Traits */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {orb.traits.map((trait, idx) => (
                      <span
                        key={idx}
                        className="px-1 py-0.5 bg-gray-700/50 rounded text-xs text-gray-300"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-base font-bold text-blue-400">
                      {orb.price}
                    </p>
                  </div>
                  <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 text-sm">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
