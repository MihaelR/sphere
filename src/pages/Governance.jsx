import React, { useState } from "react";

export default function Governance() {
  const [selectedProposal, setSelectedProposal] = useState(null);

  const activeProposals = [
    {
      id: "PROP-001",
      title: "Implement Staking Rewards for Orb Holders",
      description:
        "Introduce a staking mechanism where MOONR holders can stake their orbs to earn LUNAR tokens as rewards.",
      proposer: "0xABC...123",
      votesFor: 2847,
      votesAgainst: 432,
      totalVotes: 3279,
      deadline: "2024-02-15",
      status: "Active",
      category: "Economics",
    },
    {
      id: "PROP-002",
      title: "Launch MOONR Mobile App",
      description:
        "Develop and launch a mobile application for iOS and Android to view and manage MOONR collections on the go.",
      proposer: "0xDEF...456",
      votesFor: 1923,
      votesAgainst: 156,
      totalVotes: 2079,
      deadline: "2024-02-20",
      status: "Active",
      category: "Development",
    },
    {
      id: "PROP-003",
      title: "Community Treasury Allocation",
      description:
        "Allocate 500 ETH from the treasury for community grants, events, and marketing initiatives.",
      proposer: "0x789...GHI",
      votesFor: 1456,
      votesAgainst: 892,
      totalVotes: 2348,
      deadline: "2024-02-10",
      status: "Active",
      category: "Treasury",
    },
  ];

  const pastProposals = [
    {
      id: "PROP-000",
      title: "Establish DAO Governance Structure",
      description:
        "Create the foundational governance framework for MOONR DAO with voting mechanisms.",
      result: "Passed",
      votesFor: 4521,
      votesAgainst: 234,
      executedDate: "2024-01-15",
    },
  ];

  const governanceStats = [
    { label: "Total Proposals", value: "24", icon: "📋" },
    { label: "Active Voters", value: "3,847", icon: "🗳️" },
    { label: "Proposals Passed", value: "18", icon: "✅" },
    { label: "Treasury Value", value: "2,847 ETH", icon: "💰" },
  ];

  const votingPower = {
    yourOrbs: 12,
    votingPower: 24, // Might be 2x for early holders
    delegatedTo: null,
    delegatedFrom: 156,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 border-green-500/30 text-green-300";
      case "Passed":
        return "bg-blue-500/20 border-blue-500/30 text-blue-300";
      case "Failed":
        return "bg-red-500/20 border-red-500/30 text-red-300";
      default:
        return "bg-gray-500/20 border-gray-500/30 text-gray-300";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Economics":
        return "bg-purple-500/20 border-purple-500/30 text-purple-300";
      case "Development":
        return "bg-blue-500/20 border-blue-500/30 text-blue-300";
      case "Treasury":
        return "bg-yellow-500/20 border-yellow-500/30 text-yellow-300";
      default:
        return "bg-gray-500/20 border-gray-500/30 text-gray-300";
    }
  };

  return (
    <div className="page-content">
      {/* Hero Section - Compact */}
      <div className="content-card mb-6 text-center bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-gradient">
          MOONR Governance
        </h1>
        <p className="text-lg leading-relaxed mb-6 text-center">
          Shape the future of MOONR through decentralized governance. Every orb
          holder has a voice in our DAO.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {governanceStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="text-lg font-bold text-purple-400 mb-1">
                {stat.value}
              </div>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Your Voting Power - Compact */}
      <div className="content-card mb-6 max-w-4xl">
        <h2 className="text-accent mb-4 text-center text-xl">
          Your Voting Power
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20 text-center">
            <div className="text-2xl mb-2">🌌</div>
            <div className="text-lg font-bold text-blue-400 mb-1">
              {votingPower.yourOrbs}
            </div>
            <p className="text-sm text-gray-400">Orbs Owned</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-lg font-bold text-purple-400 mb-1">
              {votingPower.votingPower}
            </div>
            <p className="text-sm text-gray-400">Voting Power</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20 text-center">
            <div className="text-2xl mb-2">🤝</div>
            <div className="text-lg font-bold text-green-400 mb-1">
              {votingPower.delegatedFrom}
            </div>
            <p className="text-sm text-gray-400">Delegated to You</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-500/20 text-center">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-lg font-bold text-yellow-400 mb-1">
              {votingPower.yourOrbs + votingPower.delegatedFrom}
            </div>
            <p className="text-sm text-gray-400">Total Power</p>
          </div>
        </div>
        <div className="text-center mt-4">
          <button className="btn-primary mr-3 text-sm px-4 py-2">
            Delegate Votes
          </button>
          <button className="btn-secondary text-sm px-4 py-2">
            Create Proposal
          </button>
        </div>
      </div>

      {/* Active Proposals - Compact */}
      <div className="content-card mb-6 max-w-4xl">
        <h2 className="text-accent mb-4 text-center text-xl">
          Active Proposals
        </h2>
        <div className="space-y-4">
          {activeProposals.map((proposal) => {
            const votingPercentage =
              (proposal.votesFor / proposal.totalVotes) * 100;
            const daysLeft = Math.ceil(
              (new Date(proposal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
            );

            return (
              <div
                key={proposal.id}
                className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-base font-bold text-white">
                        {proposal.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                          proposal.status
                        )}`}
                      >
                        {proposal.status}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold border ${getCategoryColor(
                          proposal.category
                        )}`}
                      >
                        {proposal.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">
                      Proposed by {proposal.proposer}
                    </p>
                    <p className="text-sm text-gray-300 mb-3">
                      {proposal.description}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-green-400">
                        For: {proposal.votesFor.toLocaleString()}
                      </span>
                      <span className="text-red-400">
                        Against: {proposal.votesAgainst.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${votingPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {votingPercentage.toFixed(1)}% approval
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-400">Total Votes</p>
                    <p className="text-lg font-bold text-purple-400">
                      {proposal.totalVotes.toLocaleString()}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-400">Days Left</p>
                    <p className="text-lg font-bold text-blue-400">
                      {daysLeft}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 py-2 bg-green-500/20 border border-green-500/30 text-green-300 rounded-lg font-medium hover:bg-green-500/30 transition-all duration-300 text-sm">
                    Vote For
                  </button>
                  <button className="flex-1 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg font-medium hover:bg-red-500/30 transition-all duration-300 text-sm">
                    Vote Against
                  </button>
                  <button
                    onClick={() => setSelectedProposal(proposal)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 text-sm"
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Past Proposals */}
      <div className="content-card mb-8">
        <h2 className="text-accent mb-6 text-center">Past Proposals</h2>
        <div className="space-y-4">
          {pastProposals.map((proposal) => (
            <div
              key={proposal.id}
              className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl p-4 border border-gray-700/30"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-md font-bold text-white">
                      {proposal.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                        proposal.result
                      )}`}
                    >
                      {proposal.result}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Executed on {proposal.executedDate}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-400">
                    For: {proposal.votesFor.toLocaleString()}
                  </p>
                  <p className="text-sm text-red-400">
                    Against: {proposal.votesAgainst.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How Governance Works - Compact */}
      <div className="content-card mb-6 max-w-4xl">
        <h2 className="text-accent mb-4 text-center text-xl">
          How Governance Works
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">💡</span>
            </div>
            <h3 className="text-base font-bold text-purple-300 mb-2">
              1. Proposal
            </h3>
            <p className="text-sm text-gray-300">
              Community members create proposals for platform improvements
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">🗳️</span>
            </div>
            <h3 className="text-base font-bold text-blue-300 mb-2">
              2. Voting
            </h3>
            <p className="text-sm text-gray-300">
              Orb holders vote with power proportional to their holdings
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">📊</span>
            </div>
            <h3 className="text-base font-bold text-green-300 mb-2">
              3. Decision
            </h3>
            <p className="text-sm text-gray-300">
              Proposals pass with majority approval and quorum requirements
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">⚡</span>
            </div>
            <h3 className="text-base font-bold text-yellow-300 mb-2">
              4. Execution
            </h3>
            <p className="text-sm text-gray-300">
              Approved proposals are implemented by the development team
            </p>
          </div>
        </div>
      </div>

      {/* Proposal Modal - Compact */}
      {selectedProposal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProposal(null)}
        >
          <div
            className="bg-gray-900 rounded-2xl max-w-lg w-full max-h-80 overflow-y-auto border border-purple-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-white">
                  {selectedProposal.title}
                </h3>
                <button
                  onClick={() => setSelectedProposal(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-300 mb-3 text-sm">
                {selectedProposal.description}
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-400">Proposal ID:</p>
                  <p className="text-white font-mono">{selectedProposal.id}</p>
                </div>
                <div>
                  <p className="text-gray-400">Category:</p>
                  <p className="text-white">{selectedProposal.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
