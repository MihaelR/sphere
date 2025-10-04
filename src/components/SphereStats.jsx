import React from "react";
import { useAppContext } from "../context/AppContext";

export default function SphereStats() {
  const {
    totalItems,
    totalImages,
    selectedSpotNumber,
    hasSelection,
    spotData,
  } = useAppContext();

  const stats = [
    {
      label: "Total Spots",
      value: totalItems.toLocaleString(),
      icon: "🪐",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      label: "Spots Taken",
      value: totalImages.toLocaleString(),
      icon: "✨",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
    },
    {
      label: "Active Spot",
      value: hasSelection ? `#${selectedSpotNumber}` : "None",
      icon: "🎯",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
    },
    {
      label: "Total Views",
      value: spotData.totalViews.toLocaleString(),
      icon: "👁️",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/30",
    },
    {
      label: "Total Likes",
      value: spotData.totalLikes.toLocaleString(),
      icon: "❤️",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
    },
    {
      label: "Comments",
      value: spotData.totalComments.toLocaleString(),
      icon: "💬",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
  ];

  return (
    <div className="w-full max-w-2xl">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`p-3 rounded-lg border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${stat.bgColor} ${stat.borderColor}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">{stat.icon}</span>
              <span className="text-xs font-medium text-white/80 truncate">
                {stat.label}
              </span>
            </div>
            <div className={`text-lg font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
