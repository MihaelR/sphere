import React, { useState, useEffect } from "react";

export default function Community() {
  const [activeTab, setActiveTab] = useState("events");
  const [communityStats, setCommunityStats] = useState({
    totalMembers: "3,247",
    activeToday: "156",
    messagesDaily: "892",
    githubContributors: "23",
  });

  const upcomingEvents = [
    {
      id: 1,
      title: "MOONR Community AMA",
      date: "2024-01-25",
      time: "18:00 UTC",
      type: "AMA",
      platform: "Discord",
      description: "Monthly Ask Me Anything session with the core team",
      attendees: 234,
      status: "upcoming",
    },
    {
      id: 2,
      title: "Sphere Building Workshop",
      date: "2024-01-28",
      time: "16:00 UTC",
      type: "Workshop",
      platform: "YouTube Live",
      description:
        "Learn how to create your own interactive sphere experiences",
      attendees: 89,
      status: "upcoming",
    },
    {
      id: 3,
      title: "Token Holder Meetup",
      date: "2024-02-02",
      time: "20:00 UTC",
      type: "Meetup",
      platform: "Twitter Spaces",
      description: "Exclusive gathering for MOONR token holders",
      attendees: 156,
      status: "upcoming",
    },
  ];

  const contributors = [
    {
      name: "Alex Chen",
      role: "Lead Developer",
      avatar: "🚀",
      contributions: 247,
      specialty: "Core Protocol",
      social: "@alexbuilds",
    },
    {
      name: "Sarah Kim",
      role: "Frontend Architect",
      avatar: "⚡",
      contributions: 189,
      specialty: "UI/UX Design",
      social: "@sarahcodes",
    },
    {
      name: "Marcus Dev",
      role: "Smart Contracts",
      avatar: "🔐",
      contributions: 156,
      specialty: "Solana Integration",
      social: "@marcussol",
    },
    {
      name: "Luna Rodriguez",
      role: "Community Manager",
      avatar: "🌙",
      contributions: 298,
      specialty: "Community Growth",
      social: "@lunacommunity",
    },
    {
      name: "DevNinja",
      role: "Security Auditor",
      avatar: "🥷",
      contributions: 78,
      specialty: "Security Review",
      social: "@devninja",
    },
    {
      name: "CryptoDesigner",
      role: "Visual Designer",
      avatar: "🎨",
      contributions: 134,
      specialty: "Graphics & Animation",
      social: "@cryptodesign",
    },
  ];

  const recentActivity = [
    {
      user: "CosmicBuilder",
      action: "submitted a proposal for new orb mechanics",
      time: "2 hours ago",
      type: "proposal",
    },
    {
      user: "DevMaster123",
      action: "merged pull request #45 - Performance improvements",
      time: "4 hours ago",
      type: "development",
    },
    {
      user: "MoonrFan",
      action: "created community art showcase",
      time: "6 hours ago",
      type: "community",
    },
    {
      user: "SolanaBuilder",
      action: "fixed critical bug in staking contract",
      time: "1 day ago",
      type: "development",
    },
    {
      user: "CommunityLead",
      action: "organized weekly community call",
      time: "2 days ago",
      type: "community",
    },
  ];

  const getEventTypeColor = (type) => {
    switch (type) {
      case "AMA":
        return "from-purple-500 to-pink-500";
      case "Workshop":
        return "from-blue-500 to-cyan-500";
      case "Meetup":
        return "from-green-500 to-emerald-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "proposal":
        return "📋";
      case "development":
        return "💻";
      case "community":
        return "🤝";
      default:
        return "📊";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              MOONR
            </span>{" "}
            Community
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Join a thriving ecosystem of builders, creators, and innovators
          </p>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl rounded-lg border border-purple-500/30 p-4">
              <div className="text-2xl font-bold text-white">
                {communityStats.totalMembers}
              </div>
              <div className="text-sm text-gray-300">Total Members</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-xl rounded-lg border border-green-500/30 p-4">
              <div className="text-2xl font-bold text-white">
                {communityStats.activeToday}
              </div>
              <div className="text-sm text-gray-300">Active Today</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-xl rounded-lg border border-blue-500/30 p-4">
              <div className="text-2xl font-bold text-white">
                {communityStats.messagesDaily}
              </div>
              <div className="text-sm text-gray-300">Daily Messages</div>
            </div>
            <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 backdrop-blur-xl rounded-lg border border-orange-500/30 p-4">
              <div className="text-2xl font-bold text-white">
                {communityStats.githubContributors}
              </div>
              <div className="text-sm text-gray-300">Contributors</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-1 flex">
            {[
              { id: "events", label: "Events", icon: "📅" },
              { id: "contributors", label: "Contributors", icon: "👥" },
              { id: "activity", label: "Activity", icon: "📊" },
              { id: "social", label: "Social Links", icon: "🔗" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{tab.icon}</span>
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {/* Events Tab */}
          {activeTab === "events" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span>📅</span> Upcoming Events
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl p-6 hover:scale-105 transition-transform duration-200"
                  >
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getEventTypeColor(
                        event.type
                      )} mb-3`}
                    >
                      {event.type}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <span>📅</span>
                        <span>
                          {event.date} at {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <span>📍</span>
                        <span>{event.platform}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <span>👥</span>
                        <span>{event.attendees} registered</span>
                      </div>
                    </div>

                    <button className="w-full mt-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-sm rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200">
                      Register Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contributors Tab */}
          {activeTab === "contributors" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span>👥</span> Top Contributors
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contributors.map((contributor, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl p-6 text-center"
                  >
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">{contributor.avatar}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">
                      {contributor.name}
                    </h3>
                    <p className="text-purple-400 font-medium mb-2">
                      {contributor.role}
                    </p>
                    <p className="text-gray-300 text-sm mb-3">
                      {contributor.specialty}
                    </p>

                    <div className="bg-black/30 rounded-lg p-3 mb-3">
                      <div className="text-2xl font-bold text-green-400">
                        {contributor.contributions}
                      </div>
                      <div className="text-xs text-gray-400">Contributions</div>
                    </div>

                    <p className="text-blue-400 text-sm">
                      {contributor.social}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span>📊</span> Recent Activity
              </h2>

              <div className="bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-black/30 rounded-lg"
                    >
                      <div className="text-xl">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm">
                          <span className="font-bold text-purple-400">
                            {activity.user}
                          </span>{" "}
                          {activity.action}
                        </div>
                        <div className="text-gray-400 text-xs mt-1">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Social Links Tab */}
          {activeTab === "social" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🔗</span> Join Our Community
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Discord",
                    icon: "💬",
                    members: "2,847",
                    description: "Real-time chat and community discussions",
                    color: "from-indigo-500 to-purple-500",
                    link: "#",
                  },
                  {
                    name: "Twitter",
                    icon: "🐦",
                    members: "5,234",
                    description: "Latest updates and announcements",
                    color: "from-blue-500 to-cyan-500",
                    link: "#",
                  },
                  {
                    name: "GitHub",
                    icon: "💻",
                    members: "156",
                    description: "Contribute to the codebase",
                    color: "from-gray-600 to-gray-800",
                    link: "#",
                  },
                  {
                    name: "Telegram",
                    icon: "✈️",
                    members: "1,923",
                    description: "Community chat and support",
                    color: "from-blue-500 to-blue-600",
                    link: "#",
                  },
                  {
                    name: "Reddit",
                    icon: "📱",
                    members: "892",
                    description: "Discussions and community content",
                    color: "from-orange-500 to-red-500",
                    link: "#",
                  },
                  {
                    name: "YouTube",
                    icon: "🎥",
                    members: "734",
                    description: "Tutorials and project updates",
                    color: "from-red-500 to-red-600",
                    link: "#",
                  },
                ].map((platform, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${platform.color} backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 text-center hover:scale-105 transition-transform duration-200 cursor-pointer`}
                  >
                    <div className="text-4xl mb-3">{platform.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {platform.name}
                    </h3>
                    <p className="text-white/80 text-sm mb-3">
                      {platform.description}
                    </p>
                    <div className="text-lg font-bold text-white mb-4">
                      {platform.members} members
                    </div>
                    <button className="w-full py-2 bg-white/20 hover:bg-white/30 text-white font-bold text-sm rounded-lg transition-all duration-200">
                      Join Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Community Guidelines */}
        <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-green-900/40 backdrop-blur-xl rounded-2xl border border-green-500/30 shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>📜</span> Community Guidelines
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✅</span>
                <div>
                  <h4 className="text-white font-bold mb-1">Be Respectful</h4>
                  <p className="text-gray-300 text-sm">
                    Treat all community members with respect and kindness
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✅</span>
                <div>
                  <h4 className="text-white font-bold mb-1">Stay On Topic</h4>
                  <p className="text-gray-300 text-sm">
                    Keep discussions relevant to MOONR and blockchain technology
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✅</span>
                <div>
                  <h4 className="text-white font-bold mb-1">Help Others</h4>
                  <p className="text-gray-300 text-sm">
                    Share knowledge and assist fellow community members
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-red-400 text-xl">❌</span>
                <div>
                  <h4 className="text-white font-bold mb-1">No Spam</h4>
                  <p className="text-gray-300 text-sm">
                    Avoid repetitive posts and promotional content
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-red-400 text-xl">❌</span>
                <div>
                  <h4 className="text-white font-bold mb-1">No Harassment</h4>
                  <p className="text-gray-300 text-sm">
                    Zero tolerance for bullying or discriminatory behavior
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-red-400 text-xl">❌</span>
                <div>
                  <h4 className="text-white font-bold mb-1">No Scams</h4>
                  <p className="text-gray-300 text-sm">
                    Report suspicious links and fraudulent activities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
