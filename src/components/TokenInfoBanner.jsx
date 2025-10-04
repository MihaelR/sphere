import React, { useState, useEffect, useRef } from "react";

export default function TokenInfoBanner() {
  const [tokenData, setTokenData] = useState({
    symbol: "MOONR",
    price: "$0.0234",
    change24h: "+12.5%",
    volume24h: "$892.3K",
    marketCap: "$2.1M",
    holders: "1,247",
    network: "Solana",
    ca: "4jYfUZuoKDbBpZwRWDV6ZEnbZbECGmqKKru5E4QZpump",
  });

  const [isPositive, setIsPositive] = useState(true);
  const [priceHistory, setPriceHistory] = useState([]);
  const canvasRef = useRef(null);

  // Initialize price history
  useEffect(() => {
    const basePrice = 0.0234;
    const history = [];
    for (let i = 30; i >= 0; i--) {
      const variation = (Math.random() - 0.5) * 0.002;
      history.push(basePrice + variation + Math.sin(i / 5) * 0.001);
    }
    setPriceHistory(history);
  }, []);

  // Simulate price updates and chart
  useEffect(() => {
    const interval = setInterval(() => {
      setTokenData((prev) => ({
        ...prev,
        price: `$${(0.0234 + (Math.random() - 0.5) * 0.002).toFixed(4)}`,
        change24h: `${(12.5 + (Math.random() - 0.5) * 2).toFixed(1)}%`,
        volume24h: `$${(45678 + Math.random() * 10000).toLocaleString()}`,
        marketCap: `$${(234567 + Math.random() * 50000).toLocaleString()}`,
        holders: Math.floor(1234 + Math.random() * 100),
      }));
    }, 30000); // Changed from 2000ms to 30000ms (30 seconds)

    return () => clearInterval(interval);
  }, []);

  // Draw chart
  useEffect(() => {
    if (!canvasRef.current || priceHistory.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const minPrice = Math.min(...priceHistory);
    const maxPrice = Math.max(...priceHistory);
    const priceRange = maxPrice - minPrice || 0.001;

    // Draw grid lines
    ctx.strokeStyle = "rgba(147, 51, 234, 0.1)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 3; i++) {
      const y = (height / 3) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw price line
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(
      0,
      isPositive ? "rgba(34, 197, 94, 0.6)" : "rgba(239, 68, 68, 0.6)"
    );
    gradient.addColorStop(
      1,
      isPositive ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)"
    );

    ctx.fillStyle = gradient;
    ctx.strokeStyle = isPositive ? "#22c55e" : "#ef4444";
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    priceHistory.forEach((price, index) => {
      const x = (width / (priceHistory.length - 1)) * index;
      const y = height - ((price - minPrice) / priceRange) * height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    const lastX = width;
    const lastY =
      height -
      ((priceHistory[priceHistory.length - 1] - minPrice) / priceRange) *
        height;
    ctx.lineTo(lastX, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    priceHistory.forEach((price, index) => {
      const x = (width / (priceHistory.length - 1)) * index;
      const y = height - ((price - minPrice) / priceRange) * height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Current price dot
    const currentX = width - width / (priceHistory.length - 1);
    const currentY =
      height -
      ((priceHistory[priceHistory.length - 1] - minPrice) / priceRange) *
        height;

    ctx.beginPath();
    ctx.arc(currentX, currentY, 2, 0, 2 * Math.PI);
    ctx.fillStyle = isPositive ? "#22c55e" : "#ef4444";
    ctx.fill();
  }, [priceHistory, isPositive]);

  const copyCA = () => {
    navigator.clipboard.writeText(tokenData.ca);
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-xl border border-purple-500/30 shadow-xl shadow-purple-500/10 p-3 min-w-60 max-w-72">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-xs">M</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white">
                ${tokenData.symbol}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-500/30 text-purple-200 rounded-full">
                {tokenData.network}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div
            className={`w-1.5 h-1.5 rounded-full animate-pulse ${
              isPositive ? "bg-green-400" : "bg-red-400"
            }`}
          ></div>
          <span className="text-[10px] text-gray-300">Live</span>
        </div>
      </div>

      {/* Price & Change */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">
            {tokenData.price}
          </span>
          <span
            className={`text-sm font-bold ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {tokenData.change24h}
          </span>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-400">Volume</div>
          <div className="text-sm font-bold text-white">
            {tokenData.volume24h}
          </div>
        </div>
      </div>

      {/* Token Chart */}
      <div className="mb-3">
        <div className="bg-black/20 rounded-lg p-2 border border-purple-500/20">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-purple-300">
              Price Chart
            </span>
            <span className="text-[9px] text-white/60">Live</span>
          </div>
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={180}
              height={30}
              className="w-full h-6 rounded"
              style={{ background: "transparent" }}
            />

            <div className="absolute top-0 left-1 text-[8px] text-white/70 font-mono">
              $
              {priceHistory.length > 0 &&
                priceHistory[priceHistory.length - 1]?.toFixed(4)}
            </div>

            <div
              className={`absolute top-0 right-1 text-[8px] ${
                isPositive ? "text-green-400" : "text-red-400"
              }`}
            >
              {isPositive ? "📈" : "📉"}
            </div>
          </div>
        </div>
      </div>

      {/* Market Cap & Holders */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-black/20 rounded p-2 border border-purple-500/20">
          <div className="text-[10px] text-gray-400">Market Cap</div>
          <div className="text-sm font-bold text-white">
            {tokenData.marketCap}
          </div>
        </div>
        <div className="bg-black/20 rounded p-2 border border-purple-500/20">
          <div className="text-[10px] text-gray-400">Holders</div>
          <div className="text-sm font-bold text-white">
            {tokenData.holders}
          </div>
        </div>
      </div>

      {/* Contract Address */}
      <div className="bg-black/20 rounded p-2 border border-purple-500/20 mb-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] text-gray-400">Contract</div>
            <div className="text-[11px] font-mono text-white">
              {tokenData.ca.slice(0, 8)}...{tokenData.ca.slice(-8)}
            </div>
          </div>
          <button
            onClick={copyCA}
            className="p-1 rounded bg-purple-500/30 hover:bg-purple-500/50 transition-colors"
            title="Copy CA"
          >
            <svg
              className="w-3 h-3 text-purple-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 py-2 px-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-[11px] rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200">
          Buy MOONR
        </button>
        <button className="flex-1 py-2 px-3 bg-purple-500/20 border border-purple-500/50 text-purple-200 font-bold text-[11px] rounded-lg hover:bg-purple-500/30 transition-all duration-200">
          Chart
        </button>
      </div>
    </div>
  );
}
