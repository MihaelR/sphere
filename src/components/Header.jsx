import React from "react";
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

  return (
    <header className="fixed top-0 left-0 right-0 w-full px-4 py-2 backdrop-blur-md bg-black/20 border-b border-white/10 relative z-50">
      {/* Background gradient overlay - full width */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 pointer-events-none"></div>

      {/* Header content container with max-width */}
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between relative z-10">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {/* Logo Icon */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <span className="text-white font-bold text-sm">M</span>
            </div>

            {/* Logo Text */}
            <span className="text-xl font-black tracking-wider select-none header-title bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              MO
              <span className="line-through decoration-purple-400">O</span>
              NR
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 flex justify-center">
          <div className="flex bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden shadow-xl">
            {TABS.map((tab, index) => {
              const isActive = location.pathname === tab.path;
              return (
                <button
                  key={tab.label}
                  onClick={() => navigate(tab.path)}
                  className={`relative px-4 py-2 text-xs font-bold tracking-wide uppercase transition-all duration-300 focus:outline-none group ${
                    isActive
                      ? "text-white bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/25"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-md"></div>
                  )}

                  {/* Tab text */}
                  <span className="relative z-10">{tab.label}</span>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-blue-400/0 to-purple-400/0 group-hover:from-purple-400/10 group-hover:via-blue-400/10 group-hover:to-purple-400/10 transition-all duration-300 rounded-md"></div>

                  {/* Bottom border for active state */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 shadow-lg shadow-purple-400/50"></div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Right Section - Smaller stats, prominent wallet */}
        <div className="flex items-center gap-4">
          {/* Live Status & Visitor Stats - Made smaller */}
          <div className="flex items-center gap-3 px-3 py-1.5 bg-gradient-to-r from-green-500/15 to-blue-500/15 backdrop-blur-sm border border-green-500/25 rounded-lg shadow-md hover:shadow-green-500/15 transition-all duration-300">
            <div className="flex items-center gap-1.5">
              <div className="relative">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400/50"></div>
                <div className="absolute inset-0 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-xs font-medium text-green-300">
                Online: <span className="text-white font-bold">{24}</span>
              </span>
            </div>

            <div className="w-px h-3 bg-white/15"></div>

            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse shadow-sm shadow-purple-400/50"></div>
              <span className="text-xs font-medium text-purple-300">
                Today: <span className="text-white font-bold">{2055}</span>
              </span>
            </div>
          </div>

          {/* Wallet Address - Made smaller and less prominent */}
          <button className="relative group flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/40 backdrop-blur-sm text-white font-mono text-xs tracking-wide border border-gray-500/30 hover:border-purple-400/40 transition-all duration-300 hover:scale-[1.02]">
            {/* Wallet icon */}
            <div className="w-4 h-4 rounded-sm bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-all duration-300">
              <svg
                className="w-2.5 h-2.5 text-white/80 group-hover:text-white transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </div>

            {/* Wallet address */}
            <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
              3mK8...7nQp
            </span>

            {/* Small connected indicator dot */}
            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-70"></div>
          </button>
        </div>
      </div>

      {/* Header glow effect - full width */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
    </header>
  );
}
