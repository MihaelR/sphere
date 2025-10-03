import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TABS = [
  { label: "Sphere", path: "/" },
  { label: "Buy", path: "/buy" },
  { label: "About", path: "/about" },
  { label: "Governance", path: "/governance" },
  { label: "Community", path: "/community" },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [visitorsToday, setVisitorsToday] = useState(502);
  const [onlineNow, setOnlineNow] = useState(9);

  // Token data state - simplified
  const [tokenData, setTokenData] = useState({
    symbol: "MOONR",
    ca: "4jYfUZuoKDbBpZwRWDV6ZEnbZbECGmqKKru5E4QZpump",
  });

  // Simulate visitor count changes
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorsToday((prev) => prev + Math.floor(Math.random() * 3));
      setOnlineNow((prev) =>
        Math.max(1, prev + Math.floor(Math.random() * 3) - 1)
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const copyTokenCA = () => {
    navigator.clipboard.writeText(tokenData.ca);
    // Could add a toast notification here
  };

  return (
    <header className="w-full px-4 py-2 flex items-center justify-between backdrop-blur-md bg-black/20 border-b border-white/10 relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 pointer-events-none"></div>

      {/* Logo Section */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="flex items-center gap-2">
          {/* Logo Icon */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <span className="text-white font-bold text-sm">M</span>
          </div>

          {/* Logo Text */}
          <span className="text-xl font-black tracking-wider select-none header-title bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            MO
            <span className="line-through decoration-blue-400">O</span>
            NR
          </span>
        </div>

        {/* Beta badge */}
        <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-full shadow-lg">
          BETA
        </span>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex-1 flex justify-center relative z-10">
        <div className="flex bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden shadow-xl">
          {TABS.map((tab, index) => {
            const isActive = location.pathname === tab.path;
            return (
              <button
                key={tab.label}
                onClick={() => navigate(tab.path)}
                className={`relative px-4 py-2 text-xs font-bold tracking-wide uppercase transition-all duration-300 focus:outline-none group ${
                  isActive
                    ? "text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-md"></div>
                )}

                {/* Tab text */}
                <span className="relative z-10">{tab.label}</span>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-blue-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/10 group-hover:to-blue-400/10 transition-all duration-300 rounded-md"></div>

                {/* Bottom border for active state */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg shadow-blue-400/50"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Right Section - Simplified Token Info */}
      <div className="flex items-center gap-3 relative z-10">
        {/* Simplified Token Information */}
        <div className="flex items-center gap-3 px-3 py-1.5 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg">
          {/* Token Symbol */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-yellow-400">
              ${tokenData.symbol}
            </span>
          </div>

          {/* Token CA */}
          <button
            onClick={copyTokenCA}
            className="flex items-center gap-1 px-2 py-1 rounded bg-gradient-to-r from-yellow-400/20 to-orange-400/20 hover:from-yellow-400/30 hover:to-orange-400/30 transition-all duration-200 group"
            title="Click to copy token address"
          >
            <span className="text-xs font-mono text-gray-300">
              {tokenData.ca.slice(0, 6)}...{tokenData.ca.slice(-6)}
            </span>
            <svg
              className="w-3 h-3 text-gray-400 group-hover:text-yellow-400 transition-colors"
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

        {/* Live Status & Visitor Stats */}
        <div className="flex items-center gap-3 px-3 py-1.5 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 bg-green-400 rounded-full"></span>
              <span className="text-xs text-gray-300 font-mono">
                Online: {onlineNow}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></span>
              <span className="text-xs text-gray-300 font-mono">
                Today: {visitorsToday}
              </span>
            </div>
          </div>
        </div>

        {/* Wallet Address */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-mono font-bold text-xs tracking-wider shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 transition-all duration-300 hover:scale-105 group">
          <span>0x53b9...DAD9</span>
          <svg
            className="w-3 h-3 text-black group-hover:rotate-12 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" />
          </svg>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/20 to-orange-400/20 blur-md -z-10"></div>
        </button>
      </div>

      {/* Header glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
    </header>
  );
}
