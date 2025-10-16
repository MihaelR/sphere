import React, { useState } from "react";
import OrbInfoPanel from "./OrbInfoPanel";
import SphereSearch from "./SphereSearch";
import { useAppContext } from "../context/AppContext";

export default function InfoTabs() {
  const { selected, selectedSpotNumber, hasSelection } = useAppContext();
  const [activeTab, setActiveTab] = useState("info"); // "info" or "search"

  return (
    <div className="w-full h-full rounded-xl border border-purple-500/30 bg-[#181825] flex flex-col">
      {/* Tab Header */}
      <div className="bg-[#23284a] p-2 text-white flex-shrink-0">
        <div className="flex rounded-lg overflow-hidden">
          <button
            onClick={() => setActiveTab("info")}
            className={`flex-1 px-2 py-1.5 text-xs font-bold flex items-center justify-center gap-1.5 ${
              activeTab === "info"
                ? "bg-purple-700 text-white"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <span className="text-sm">🪐</span>
            <span>Info Panel</span>
          </button>
          <button
            onClick={() => setActiveTab("search")}
            className={`flex-1 px-2 py-1.5 text-xs font-bold flex items-center justify-center gap-1.5 ${
              activeTab === "search"
                ? "bg-purple-700 text-white"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <span className="text-sm">🔍</span>
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden min-h-0">
        {activeTab === "info" ? (
          <div className="h-full min-h-0">
            <OrbInfoPanel isTabbed={true} />
          </div>
        ) : (
          <div className="h-full min-h-0 flex flex-col">
            <div className="p-4 flex-1 min-h-0">
              <SphereSearch />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
