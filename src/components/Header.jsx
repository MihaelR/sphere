import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TABS = [
  { label: "HOME", path: "/" },
  { label: "About", path: "/about" },
  { label: "Buy", path: "/buy" },
  { label: "Governance", path: "/governance" },
  { label: "Community", path: "/community" },
  { label: "Ads", path: "/ads" },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 w-full px-4 py-2 bg-[#181825] border-t border-white/10 z-50">
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img
              src="/src/assets/default.png"
              alt="Logo"
              className="w-8 h-8 object-cover rounded-full"
            />
            <span className="font-bold text-white text-lg">MOONR</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 flex justify-center">
          <div className="flex bg-[#23284a] border border-white/20 rounded-lg overflow-hidden">
            {TABS.map((tab) => {
              const isActive = location.pathname === tab.path;
              return (
                <button
                  key={tab.label}
                  onClick={() => navigate(tab.path)}
                  className={`relative px-4 py-2 text-xs font-bold tracking-wide uppercase focus:outline-none ${
                    isActive
                      ? "text-white bg-purple-700"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400"></div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Right Section - Wallet */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#23284a] text-white font-mono text-xs border border-gray-500/30 hover:border-purple-400/40">
            <span className="text-xs font-medium text-gray-300 hover:text-white">
              3mK8...7nQp
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
