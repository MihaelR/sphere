import React, { useState, useEffect } from "react";

const mockNews = [
  {
    id: 1,
    title: "MOONR Protocol V2.0 Launch",
    content:
      "New features including advanced orb interactions and enhanced blockchain integration.",
    timestamp: "2024-01-15T10:30:00Z",
    type: "update",
    urgent: false,
  },
  {
    id: 2,
    title: "Community Governance Vote Live",
    content:
      "Vote on the next major feature implementation. Your voice matters.",
    timestamp: "2024-01-14T15:45:00Z",
    type: "governance",
    urgent: true,
  },
  {
    id: 3,
    title: "Partnership with MetaCorp",
    content:
      "Strategic partnership to expand MOONR ecosystem into the metaverse.",
    timestamp: "2024-01-13T09:20:00Z",
    type: "partnership",
    urgent: false,
  },
  {
    id: 4,
    title: "Security Audit Completed",
    content:
      "Third-party security audit completed with no critical issues found.",
    timestamp: "2024-01-12T14:15:00Z",
    type: "security",
    urgent: false,
  },
];

export default function NewsUpdates() {
  const [news, setNews] = useState(mockNews);
  const [selectedNews, setSelectedNews] = useState(null);

  const getTypeIcon = (type) => {
    switch (type) {
      case "update":
        return "🚀";
      case "governance":
        return "🗳️";
      case "partnership":
        return "🤝";
      case "security":
        return "🔒";
      default:
        return "📢";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "update":
        return "from-blue-500 to-cyan-500";
      case "governance":
        return "from-purple-500 to-pink-500";
      case "partnership":
        return "from-green-500 to-emerald-500";
      case "security":
        return "from-red-500 to-orange-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <div className="bg-gradient-to-br from-base-200/80 to-base-300/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 overflow-hidden">
        {/* Header - More Compact */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-3 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <span className="text-lg">📰</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold">News & Updates</h2>
                  <p className="text-white/80 text-xs">Latest developments</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">Live</span>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
        </div>

        {/* News Grid - More Compact */}
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {news.map((item) => (
              <div
                key={item.id}
                className="group relative bg-base-100/80 backdrop-blur-sm rounded-lg border border-base-content/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden"
                onClick={() => setSelectedNews(item)}
              >
                {/* Urgent indicator */}
                {item.urgent && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse z-10"></div>
                )}

                {/* Type indicator gradient */}
                <div
                  className={`h-0.5 bg-gradient-to-r ${getTypeColor(
                    item.type
                  )}`}
                ></div>

                <div className="p-3">
                  {/* Header */}
                  <div className="flex items-start gap-2 mb-2">
                    <div className="text-lg flex-shrink-0">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xs text-base-content/90 line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[10px] text-base-content/60 mt-0.5">
                        {formatDate(item.timestamp)}
                      </p>
                    </div>
                  </div>

                  {/* Content preview */}
                  <p className="text-[10px] text-base-content/70 line-clamp-3 mb-2">
                    {item.content}
                  </p>

                  {/* Type badge */}
                  <div
                    className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium text-white bg-gradient-to-r ${getTypeColor(
                      item.type
                    )}`}
                  >
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between text-[10px] text-base-content/60 border-t border-base-content/10 pt-2">
            <div>Last updated: {formatDate(news[0]?.timestamp)}</div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for selected news - Compact */}
      {selectedNews && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="bg-base-200 rounded-xl max-w-md w-full max-h-80 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`p-4 bg-gradient-to-r ${getTypeColor(
                selectedNews.type
              )} text-white rounded-t-xl`}
            >
              <div className="flex items-start gap-2">
                <span className="text-2xl">
                  {getTypeIcon(selectedNews.type)}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">
                    {selectedNews.title}
                  </h3>
                  <p className="text-white/80 text-xs">
                    {formatDate(selectedNews.timestamp)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-4">
              <p className="text-base-content/80 leading-relaxed text-sm">
                {selectedNews.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
