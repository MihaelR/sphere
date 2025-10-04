import React from "react";

export default function About() {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      avatar: "🚀",
      bio: "Former blockchain architect at major DeFi protocols",
      social: "@alexchen",
    },
    {
      name: "Sarah Kim",
      role: "CTO",
      avatar: "⚡",
      bio: "Full-stack developer with 8+ years in crypto",
      social: "@sarahbuilds",
    },
    {
      name: "Marcus Johnson",
      role: "Head of Design",
      avatar: "🎨",
      bio: "Award-winning UI/UX designer from top tech companies",
      social: "@marcusdesigns",
    },
    {
      name: "Luna Rodriguez",
      role: "Community Lead",
      avatar: "🌙",
      bio: "Building engaged communities in Web3 space",
      social: "@lunacommunity",
    },
  ];

  const milestones = [
    {
      date: "Q4 2023",
      title: "Concept & Development",
      description: "Initial concept development and team formation",
      status: "completed",
    },
    {
      date: "Q1 2024",
      title: "MVP Launch",
      description: "Core sphere functionality and basic interactions",
      status: "completed",
    },
    {
      date: "Q2 2024",
      title: "Token Launch",
      description: "MOONR token launch on Solana",
      status: "current",
    },
    {
      date: "Q3 2024",
      title: "Enhanced Features",
      description: "Advanced orb mechanics and governance",
      status: "upcoming",
    },
    {
      date: "Q4 2024",
      title: "Ecosystem Expansion",
      description: "Partnerships and cross-chain integration",
      status: "upcoming",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              MOONR
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A revolutionary decentralized platform that combines interactive 3D
            experiences with blockchain technology, creating a new paradigm for
            digital ownership and community engagement.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span>🌟</span> Our Vision
            </h2>
            <p className="text-gray-300 leading-relaxed">
              To create the most engaging and rewarding decentralized community
              platform where digital interactions transcend traditional
              boundaries. We envision a future where every user action has
              meaning, value, and contributes to a thriving ecosystem.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/40 via-cyan-900/40 to-blue-900/40 backdrop-blur-xl rounded-2xl border border-blue-500/30 shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span>🎯</span> Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed">
              To democratize access to immersive digital experiences while
              rewarding community participation through innovative tokenomics.
              We're building the infrastructure for the next generation of
              decentralized applications.
            </p>
          </div>
        </div>

        {/* What Makes MOONR Special */}
        <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-green-900/40 backdrop-blur-xl rounded-2xl border border-green-500/30 shadow-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            <span>✨</span> What Makes MOONR Special
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Interactive 3D Universe
              </h3>
              <p className="text-gray-300">
                Explore a dynamic sphere with unique orbs, each offering
                different experiences and rewards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                True Ownership
              </h3>
              <p className="text-gray-300">
                Built on Solana blockchain ensuring transparent, secure, and
                true digital ownership.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Community Driven
              </h3>
              <p className="text-gray-300">
                Governance token holders shape the future through democratic
                decision-making.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            <span>👥</span> Meet Our Team
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl p-6 text-center"
              >
                <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{member.avatar}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-purple-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-300 text-sm mb-3">{member.bio}</p>
                <p className="text-blue-400 text-sm">{member.social}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <div className="bg-gradient-to-br from-gray-900/40 via-purple-900/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            <span>🗺️</span> Development Roadmap
          </h2>

          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-4">
                <div
                  className={`w-4 h-4 rounded-full mt-2 ${
                    milestone.status === "completed"
                      ? "bg-green-500"
                      : milestone.status === "current"
                      ? "bg-yellow-500 animate-pulse"
                      : "bg-gray-500"
                  }`}
                ></div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-purple-400 font-mono text-sm">
                      {milestone.date}
                    </span>
                    <h3 className="text-white font-bold">{milestone.title}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        milestone.status === "completed"
                          ? "bg-green-500/20 text-green-400"
                          : milestone.status === "current"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {milestone.status}
                    </span>
                  </div>
                  <p className="text-gray-300">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
