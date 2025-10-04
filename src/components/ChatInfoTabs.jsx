import React, { useState } from "react";
import FirebaseChat from "./FirebaseChat";
import OrbInfoPanel from "./OrbInfoPanel";
import { useAppContext } from "../context/AppContext";

export default function ChatInfoTabs() {
  const { selected, selectedSpotNumber, hasSelection } = useAppContext();
  const [activeTab, setActiveTab] = useState("info"); // "info" or "chat"

  return (
    <div className="w-full h-full max-h-[900px] rounded-xl shadow-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 via-blue-900/30 to-purple-900/20 backdrop-blur-lg border border-purple-500/30 flex flex-col">
      {/* Tab Header - Made smaller to match TokenInfoTabs */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 p-2 text-white flex-shrink-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"></div>
        <div className="relative z-10">
          {/* Tab Buttons - Smaller to match TokenInfoTabs */}
          <div className="flex bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab("info")}
              className={`flex-1 px-2 py-1.5 text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                activeTab === "info"
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="text-sm">🪐</span>
              <span>Info Panel</span>
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 px-2 py-1.5 text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                activeTab === "chat"
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="text-sm">💬</span>
              <span>Global Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content - Takes remaining height with proper scroll */}
      <div className="flex-1 overflow-hidden min-h-0">
        {activeTab === "info" ? (
          <div className="h-full min-h-0">
            <OrbInfoPanel isTabbed={true} />
          </div>
        ) : (
          <div className="h-full min-h-0">
            <FirebaseChat isTabbed={true} />
          </div>
        )}
      </div>
    </div>
  );
}
