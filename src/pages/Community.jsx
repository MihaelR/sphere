import React, { useState } from "react";

export default function Community() {
  const [activeTab, setActiveTab] = useState("overview");

  const communityStats = [
    { label: "Discord Members", value: "15,247", icon: "💬" },
    { label: "Twitter Followers", value: "8,932", icon: "🐦" },
    { label: "Active Holders", value: "892", icon: "👥" },
    { label: "Daily Active Users", value: "1,234", icon: "📊" },
  ];

  const upcomingEvents = [
    {
      title: "Community AMA",
      date: "Jan 25, 2024",
      time: "2:00 PM UTC",
      description:
        "Monthly AMA with the MOONR team. Ask questions about development, roadmap, and future plans.",
      type: "AMA",
      platform: "Discord",
    },
    {
      title: "Orb Design Contest",
      date: "Feb 1-15, 2024",
      time: "All Day",
      description:
        "Submit your creative orb designs. Winners get their design minted as limited edition NFTs.",
      type: "Contest",
      platform: "Twitter",
    },
    {
      title: "Virtual Gallery Opening",
      date: "Feb 20, 2024",
      time: "6:00 PM UTC",
      description:
        "Explore the new MOONR virtual gallery in our metaverse space. Showcase your collection!",
      type: "Event",
      platform: "Metaverse",
    },
  ];

  const ambassadors = [
    {
      name: "CryptoMike",
      role: "Lead Ambassador",
      contributions: "Content Creation, Community Events",
      avatar: "👨‍🚀",
      badges: ["OG", "Creator", "Leader"],
    },
    {
      name: "ArtisticSarah",
      role: "Art Ambassador",
      contributions: "Artist Support, Design Reviews",
      avatar: "👩‍🎨",
      badges: ["Artist", "Curator", "Mentor"],
    },
    {
      name: "TechGuru",
      role: "Technical Ambassador",
      contributions: "Developer Support, Code Reviews",
      avatar: "🧑‍💻",
      badges: ["Developer", "Expert", "Helper"],
    },
  ];

  const contributeOptions = [
    {
      title: "Content Creation",
      description:
        "Create videos, articles, or social media content about MOONR",
      icon: "📝",
      rewards: "Creator Badge + Exclusive NFTs",
    },
    {
      title: "Community Moderation",
      description:
        "Help moderate our Discord and maintain a positive environment",
      icon: "🛡️",
      rewards: "Moderator Role + Monthly Rewards",
    },
    {
      title: "Development",
      description: "Contribute to open-source projects or suggest improvements",
      icon: "⚡",
      rewards: "Developer Badge + Bounty Rewards",
    },
    {
      title: "Art & Design",
      description: "Create artwork, designs, or contribute to visual assets",
      icon: "🎨",
      rewards: "Artist Badge + Featured Gallery",
    },
  ];

  const tabContent = {
    overview: (
      <div className="space-y-6">
        {/* Community Stats - Compact */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {communityStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700/50 text-center"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-lg font-bold text-blue-400 mb-1">
                {stat.value}
              </div>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Join Community CTA - Compact */}
        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/30 text-center">
          <h3 className="text-xl font-bold text-white mb-3">
            Join the MOONR Community
          </h3>
          <p className="text-base text-gray-300 mb-4">
            Connect with fellow collectors, artists, and enthusiasts in our
            vibrant community.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="#"
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm"
            >
              <span>💬</span> Join Discord
            </a>
            <a
              href="#"
              className="bg-[#1DA1F2] hover:bg-[#0d8bd9] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm"
            >
              <span>🐦</span> Follow Twitter
            </a>
            <a
              href="#"
              className="bg-[#FF6B6B] hover:bg-[#ff5252] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm"
            >
              <span>📺</span> Subscribe YouTube
            </a>
          </div>
        </div>
      </div>
    ),
    events: (
      <div className="space-y-4">
        {upcomingEvents.map((event, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {event.title}
                </h3>
                <p className="text-blue-300 font-medium text-sm">
                  {event.date} • {event.time}
                </p>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-xs">
                  {event.type}
                </span>
                <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-xs">
                  {event.platform}
                </span>
              </div>
            </div>
            <p className="text-gray-300 mb-3 text-sm">{event.description}</p>
            <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 text-sm">
              Set Reminder
            </button>
          </div>
        ))}
      </div>
    ),
    ambassadors: (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white mb-3">
            Community Ambassadors
          </h3>
          <p className="text-base text-gray-300">
            Meet our dedicated community leaders who help make MOONR amazing.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {ambassadors.map((ambassador, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700/50 text-center"
            >
              <div className="text-3xl mb-3">{ambassador.avatar}</div>
              <h3 className="text-base font-bold text-blue-300 mb-1">
                {ambassador.name}
              </h3>
              <p className="text-sm text-purple-300 mb-2 font-medium">
                {ambassador.role}
              </p>
              <p className="text-xs text-gray-400 mb-3">
                {ambassador.contributions}
              </p>
              <div className="flex flex-wrap gap-1 justify-center">
                {ambassador.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-300"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    contribute: (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white mb-3">
            Contribute to MOONR
          </h3>
          <p className="text-base text-gray-300">
            Help shape the future of MOONR and earn exclusive rewards for your
            contributions.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {contributeOptions.map((option, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{option.icon}</div>
              <h3 className="text-base font-bold text-blue-300 mb-2">
                {option.title}
              </h3>
              <p className="text-sm text-gray-300 mb-3">{option.description}</p>
              <div className="mb-3">
                <p className="text-xs text-green-400 font-medium">
                  Rewards: {option.rewards}
                </p>
              </div>
              <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 text-sm">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div className="page-content">
      {/* Hero Section - Compact */}
      <div className="content-card mb-6 text-center bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-gradient">
          MOONR Community
        </h1>
        <p className="text-lg leading-relaxed mb-6 text-center">
          Join thousands of collectors, artists, and enthusiasts building the
          future of digital ownership together.
        </p>
      </div>

      {/* Tab Navigation - Compact */}
      <div className="content-card mb-6 max-w-4xl">
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {[
            { id: "overview", label: "Overview", icon: "🏠" },
            { id: "events", label: "Events", icon: "📅" },
            { id: "ambassadors", label: "Ambassadors", icon: "⭐" },
            { id: "contribute", label: "Contribute", icon: "🤝" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 text-sm ${
                activeTab === tab.id
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tabContent[activeTab]}
      </div>

      {/* Community Guidelines - Compact */}
      <div className="content-card mb-6 max-w-4xl">
        <h2 className="text-accent mb-4 text-center text-xl">
          Community Guidelines
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-base font-bold text-green-300 mb-3">✅ Do's</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Be respectful and inclusive to all members</li>
              <li>• Share your orb collections and creations</li>
              <li>• Help newcomers learn about MOONR</li>
              <li>• Provide constructive feedback and suggestions</li>
              <li>• Follow platform-specific rules and guidelines</li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-bold text-red-300 mb-3">❌ Don'ts</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Share spam, scams, or malicious content</li>
              <li>• Engage in harassment or toxic behavior</li>
              <li>• Share personal information publicly</li>
              <li>• Promote unrelated projects excessively</li>
              <li>• Violate intellectual property rights</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
