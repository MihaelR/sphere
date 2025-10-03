import React, { useEffect, useRef, useState } from "react";

// Mock live activity data
const initialFeed = [
  {
    msg: "User 0xA1...B2 bought spot #12 for 2.1 ETH",
    ts: "just now",
    type: "purchase",
  },
  {
    msg: "User 0xC3...D4 placed a bid on spot #7",
    ts: "1 min ago",
    type: "bid",
  },
  { msg: "Spot #88 just sold for 1.8 ETH", ts: "3 min ago", type: "sale" },
  {
    msg: "User 0xE5...F6 bought spot #3 for 1.2 ETH",
    ts: "10 min ago",
    type: "purchase",
  },
  { msg: "User 0xG7...H8 liked spot #42", ts: "15 min ago", type: "like" },
];

const randomActivities = [
  { msg: "User 0xB9...C0 bought spot #21 for 2.3 ETH", type: "purchase" },
  { msg: "User 0xD1...E2 placed a bid on spot #15", type: "bid" },
  { msg: "Spot #55 just sold for 1.5 ETH", type: "sale" },
  { msg: "User 0xF3...A4 bought spot #8 for 0.9 ETH", type: "purchase" },
  { msg: "User 0xA5...B6 liked spot #77", type: "like" },
  { msg: "User 0xC7...D8 commented on spot #33", type: "comment" },
  { msg: "User 0xE9...F0 shared spot #19", type: "share" },
  { msg: "New user 0xA1...B2 joined MOONR", type: "join" },
];

export default function LiveActivityFeed({ onNewActivity }) {
  const [feed, setFeed] = useState(initialFeed);
  const [totalActivities, setTotalActivities] = useState(1247);
  const feedRef = useRef(null);

  // Simulate new activity every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const activity =
        randomActivities[Math.floor(Math.random() * randomActivities.length)];
      const newActivity = {
        ...activity,
        ts: "just now",
        id: Date.now(), // Add unique ID for key
      };
      setFeed((prev) => [newActivity, ...prev.slice(0, 9)]);
      setTotalActivities((prev) => prev + 1);
      if (onNewActivity) onNewActivity(newActivity);
    }, 7000);
    return () => clearInterval(interval);
  }, [onNewActivity]);

  // Auto-scroll to top on new feed
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = 0;
    }
  }, [feed]);

  const getActivityIcon = (type) => {
    switch (type) {
      case "purchase":
      case "sale":
        return "💰";
      case "bid":
        return "📈";
      case "like":
        return "❤️";
      case "comment":
        return "💬";
      case "share":
        return "🔄";
      case "join":
        return "👋";
      default:
        return "📊";
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "purchase":
      case "sale":
        return "text-green-400";
      case "bid":
        return "text-blue-400";
      case "like":
        return "text-red-400";
      case "comment":
        return "text-purple-400";
      case "share":
        return "text-yellow-400";
      case "join":
        return "text-cyan-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="w-64 min-w-0 max-w-full rounded-xl shadow-lg overflow-hidden bg-base-200 bg-opacity-80 backdrop-blur-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-bold text-xs">Live Activity</span>
          </div>
          <div className="flex items-center gap-1 text-[10px]">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></span>
            <span>{totalActivities.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div
        ref={feedRef}
        className="h-48 overflow-y-auto p-2 space-y-1 bg-base-100/50"
        style={{ scrollbarWidth: "thin" }}
      >
        {feed.map((item, i) => (
          <div
            key={item.id || i}
            className="group bg-base-200/80 rounded p-2 shadow-sm hover:shadow-md transition-all duration-200 border border-base-content/10 hover:border-primary/30"
          >
            <div className="flex items-start gap-1.5">
              <div
                className={`text-sm ${getActivityColor(
                  item.type
                )} flex-shrink-0`}
              >
                {getActivityIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-base-content/90 leading-relaxed break-words">
                  {item.msg}
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <div className="text-[9px] text-base-content/60">
                    {item.ts}
                  </div>
                  <div
                    className={`text-[9px] px-1.5 py-0.5 rounded-full bg-base-300/50 ${getActivityColor(
                      item.type
                    )} font-medium`}
                  >
                    {item.type}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-base-content/20 bg-base-100/80">
        <div className="text-[9px] text-base-content/60 text-center">
          Real-time activity
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .h-48::-webkit-scrollbar {
          width: 3px;
        }
        .h-48::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        .h-48::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.5);
          border-radius: 2px;
        }
        .h-48::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.8);
        }
      `}</style>
    </div>
  );
}
