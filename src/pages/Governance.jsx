import React, { useState, useEffect } from "react";

export default function Governance() {
  const [activeTab, setActiveTab] = useState("proposals");
  const [userVotingPower, setUserVotingPower] = useState(15420);
  const [totalVotingPower, setTotalVotingPower] = useState(2847392);

  const proposals = [
    {
      id: 1,
      title: "Implement Advanced Orb Mechanics",
      description:
        "Introduce new interactive features for orbs including particle effects, sound integration, and enhanced user customization options.",
      status: "active",
      type: "Feature",
      proposer: "0xA1B2...C3D4",
      votesFor: 245670,
      votesAgainst: 42380,
      totalVotes: 288050,
      quorum: 300000,
      timeLeft: "5 days",
      category: "Development",
    },
    {
      id: 2,
      title: "Increase Staking Rewards to 18% APY",
      description:
        "Proposal to increase staking rewards from current 15% to 18% APY to attract more long-term holders and improve token economics.",
      status: "active",
      type: "Economic",
      proposer: "0xE5F6...G7H8",
      votesFor: 189230,
      votesAgainst: 156780,
      totalVotes: 346010,
      quorum: 300000,
      timeLeft: "3 days",
      category: "Tokenomics",
    },
    {
      id: 3,
      title: "Community Grant Program",
      description:
        "Establish a 500,000 MOONR grant program to fund community-driven projects and third-party integrations.",
      status: "passed",
      type: "Funding",
      proposer: "0xI9J0...K1L2",
      votesFor: 456890,
      votesAgainst: 123450,
      totalVotes: 580340,
      quorum: 300000,
      timeLeft: "Executed",
      category: "Community",
    },
    {
      id: 4,
      title: "Partnership with MetaVerse Platform",
      description:
        "Strategic partnership proposal with leading metaverse platform to integrate MOONR spheres into virtual worlds.",
      status: "failed",
      type: "Partnership",
      proposer: "0xM3N4...O5P6",
      votesFor: 178920,
      votesAgainst: 298740,
      totalVotes: 477660,
      quorum: 300000,
      timeLeft: "Rejected",
      category: "Business",
    },
  ];

  const governanceStats = [
    {
      label: "Total Proposals",
      value: "47",
      change: "+3 this month",
      icon: "📋",
    },
    {
      label: "Active Voters",
      value: "1,247",
      change: "+12% this month",
      icon: "🗳️",
    },
    {
      label: "Avg Participation",
      value: "68%",
      change: "+5% this month",
      icon: "📊",
    },
    {
      label: "Passed Proposals",
      value: "34",
      change: "72% success rate",
      icon: "✅",
    },
  ];

  const votingHistory = [
    {
      proposal: "Orb Enhancement V2",
      vote: "For",
      date: "2024-01-15",
      power: 15420,
    },
    {
      proposal: "Staking Rewards Boost",
      vote: "For",
      date: "2024-01-10",
      power: 15420,
    },
    {
      proposal: "Community Treasury",
      vote: "Against",
      date: "2024-01-05",
      power: 14200,
    },
    {
      proposal: "UI/UX Improvements",
      vote: "For",
      date: "2023-12-28",
      power: 13800,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "from-blue-500 to-cyan-500";
      case "passed":
        return "from-green-500 to-emerald-500";
      case "failed":
        return "from-red-500 to-pink-500";
      case "pending":
        return "from-yellow-500 to-orange-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Voting Active";
      case "passed":
        return "Passed";
      case "failed":
        return "Failed";
      case "pending":
        return "Pending";
      default:
        return "Unknown";
    }
  };

  const calculateProgress = (votesFor, votesAgainst) => {
    const total = votesFor + votesAgainst;
    return total > 0 ? (votesFor / total) * 100 : 0;
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
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
            Governance
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Shape the future of MOONR through decentralized decision-making
          </p>

          {/* User Voting Power */}
          <div className="bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl p-6 max-w-2xl mx-auto mb-8">
            <h3 className="text-lg font-bold text-white mb-4">
              Your Voting Power
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {formatNumber(userVotingPower)}
                </div>
                <div className="text-sm text-gray-300">MOONR Tokens</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {((userVotingPower / totalVotingPower) * 100).toFixed(3)}%
                </div>
                <div className="text-sm text-gray-300">Voting Power</div>
              </div>
            </div>
          </div>
        </div>

        {/* Governance Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {governanceStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-xl border border-purple-500/30 shadow-xl p-4 text-center"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-300 mb-1">{stat.label}</div>
              <div className="text-xs text-green-400">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-1 flex">
            {[
              { id: "proposals", label: "Proposals", icon: "📋" },
              { id: "voting", label: "My Votes", icon: "🗳️" },
              { id: "create", label: "Create Proposal", icon: "✏️" },
              { id: "docs", label: "Documentation", icon: "📚" },
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
          {/* Proposals Tab */}
          {activeTab === "proposals" && (
            <div className="space-y-6">
              {proposals.map((proposal) => (
                <div
                  key={proposal.id}
                  className="bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">
                          {proposal.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getStatusColor(
                            proposal.status
                          )}`}
                        >
                          {getStatusText(proposal.status)}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-3 leading-relaxed">
                        {proposal.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Proposed by: {proposal.proposer}</span>
                        <span>Category: {proposal.category}</span>
                        <span>Time left: {proposal.timeLeft}</span>
                      </div>
                    </div>
                  </div>

                  {/* Voting Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-green-400">
                        For: {formatNumber(proposal.votesFor)}
                      </span>
                      <span className="text-red-400">
                        Against: {formatNumber(proposal.votesAgainst)}
                      </span>
                    </div>

                    <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
                        style={{
                          width: `${calculateProgress(
                            proposal.votesFor,
                            proposal.votesAgainst
                          )}%`,
                        }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-400">
                      <span>
                        {formatNumber(proposal.totalVotes)} total votes
                      </span>
                      <span>
                        Quorum: {formatNumber(proposal.quorum)} (
                        {(
                          (proposal.totalVotes / proposal.quorum) *
                          100
                        ).toFixed(1)}
                        %)
                      </span>
                    </div>
                  </div>

                  {/* Voting Buttons */}
                  {proposal.status === "active" && (
                    <div className="flex gap-3">
                      <button className="flex-1 py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-sm rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200">
                        Vote For
                      </button>
                      <button className="flex-1 py-2 px-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-sm rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200">
                        Vote Against
                      </button>
                      <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold text-sm rounded-lg transition-all duration-200">
                        Details
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Voting History Tab */}
          {activeTab === "voting" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🗳️</span> Your Voting History
              </h2>

              <div className="bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl p-6">
                <div className="space-y-4">
                  {votingHistory.map((vote, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-black/30 rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="text-white font-bold mb-1">
                          {vote.proposal}
                        </h4>
                        <div className="text-gray-400 text-sm">
                          Voted on {vote.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-bold text-sm ${
                            vote.vote === "For"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {vote.vote}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {formatNumber(vote.power)} voting power
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Create Proposal Tab */}
          {activeTab === "create" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span>✏️</span> Create New Proposal
              </h2>

              <div className="bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl p-6">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      Proposal Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                      placeholder="Enter a clear, descriptive title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      Category
                    </label>
                    <select className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20">
                      <option value="">Select category...</option>
                      <option value="development">Development</option>
                      <option value="tokenomics">Tokenomics</option>
                      <option value="community">Community</option>
                      <option value="business">Business</option>
                      <option value="governance">Governance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      Description
                    </label>
                    <textarea
                      rows={6}
                      className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 resize-none"
                      placeholder="Provide a detailed description of your proposal, including rationale, implementation details, and expected outcomes..."
                    ></textarea>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-white mb-2">
                        Voting Duration
                      </label>
                      <select className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20">
                        <option value="7">7 days</option>
                        <option value="14">14 days</option>
                        <option value="21">21 days</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-white mb-2">
                        Required Quorum
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                        placeholder="300000"
                        defaultValue="300000"
                      />
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <h4 className="text-yellow-300 font-bold mb-2">
                      Requirements to Submit
                    </h4>
                    <ul className="text-yellow-200 text-sm space-y-1">
                      <li>• Minimum 10,000 MOONR tokens required</li>
                      <li>• Proposal will be reviewed by moderators</li>
                      <li>
                        • 48-hour community discussion period before voting
                      </li>
                    </ul>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-lg rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg shadow-purple-500/25"
                  >
                    Submit Proposal
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Documentation Tab */}
          {activeTab === "docs" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span>📚</span> Governance Documentation
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "How to Vote",
                    description:
                      "Learn about the voting process, requirements, and how your voting power is calculated.",
                    icon: "🗳️",
                    topics: [
                      "Voting Power Calculation",
                      "Proposal Lifecycle",
                      "Quorum Requirements",
                    ],
                  },
                  {
                    title: "Creating Proposals",
                    description:
                      "Guidelines for creating effective proposals that benefit the MOONR ecosystem.",
                    icon: "✏️",
                    topics: [
                      "Proposal Templates",
                      "Community Guidelines",
                      "Review Process",
                    ],
                  },
                  {
                    title: "Governance Token",
                    description:
                      "Understanding MOONR tokenomics and governance mechanics.",
                    icon: "💎",
                    topics: [
                      "Token Distribution",
                      "Staking Benefits",
                      "Delegation",
                    ],
                  },
                  {
                    title: "DAO Structure",
                    description:
                      "Learn about MOONR's decentralized autonomous organization structure.",
                    icon: "🏛️",
                    topics: [
                      "Governance Councils",
                      "Multi-sig Wallets",
                      "Treasury Management",
                    ],
                  },
                ].map((doc, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl p-6"
                  >
                    <div className="text-3xl mb-3">{doc.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {doc.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{doc.description}</p>

                    <div className="space-y-2 mb-4">
                      {doc.topics.map((topic, topicIndex) => (
                        <div
                          key={topicIndex}
                          className="flex items-center gap-2 text-sm text-gray-300"
                        >
                          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>

                    <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-sm rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200">
                      Read Documentation
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
