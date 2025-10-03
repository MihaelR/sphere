import React from "react";

export default function About() {
  const features = [
    {
      icon: "🌌",
      title: "Immersive 3D Universe",
      description:
        "Experience stunning 3D orbs in an interactive cosmic environment.",
    },
    {
      icon: "🔗",
      title: "Blockchain Native",
      description:
        "Built on Ethereum with smart contracts ensuring true ownership.",
    },
    {
      icon: "🎨",
      title: "Generative Art",
      description:
        "Each orb is algorithmically generated with unique properties.",
    },
    {
      icon: "💫",
      title: "Dynamic Rarity",
      description: "Rarity levels evolve based on community interaction.",
    },
    {
      icon: "🌐",
      title: "Metaverse Ready",
      description:
        "MOONR orbs are designed for integration with virtual worlds.",
    },
    {
      icon: "👥",
      title: "Community Driven",
      description: "Governance decisions are made by the community.",
    },
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Former Meta engineer with 8+ years in blockchain technology.",
      avatar: "👨‍💻",
    },
    {
      name: "Sarah Johnson",
      role: "Lead Artist",
      bio: "Digital artist and generative art pioneer.",
      avatar: "👩‍🎨",
    },
    {
      name: "Marcus Rodriguez",
      role: "Blockchain Lead",
      bio: "Smart contract expert and former Ethereum Foundation researcher.",
      avatar: "🧑‍💼",
    },
    {
      name: "Emily Zhang",
      role: "Community Manager",
      bio: "Community building expert with experience growing Web3 communities.",
      avatar: "👩‍💼",
    },
  ];

  return (
    <div className="page-content">
      {/* Hero Section - More Compact */}
      <div className="content-card mb-6 text-center max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-gradient">About MOONR</h1>
        <p className="text-lg leading-relaxed mb-6 text-center">
          MOONR is a revolutionary NFT platform that combines cutting-edge 3D
          visualization with blockchain technology to create an immersive
          digital collectibles experience.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium">
            10,000 Unique Orbs
          </span>
          <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
            3D Interactive Experience
          </span>
          <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-sm font-medium">
            Community Owned
          </span>
        </div>
      </div>

      {/* Mission Section - Smaller */}
      <div className="content-card mb-6 max-w-4xl">
        <h2 className="text-accent mb-4 text-center text-xl">Our Mission</h2>
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-base leading-relaxed mb-3">
              We believe that digital ownership should be beautiful, meaningful,
              and accessible. MOONR transforms the traditional NFT experience by
              providing an immersive 3D environment where collectors can truly
              interact with their digital assets.
            </p>
            <p className="text-base leading-relaxed">
              Our vision extends beyond simple ownership - we're creating a
              platform where art, technology, and community converge to build
              the next generation of digital experiences.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
            <div className="text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-lg font-bold text-blue-300 mb-2">
                Innovation First
              </h3>
              <p className="text-sm text-gray-300">
                Pushing the boundaries of what's possible in the NFT space.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid - More Compact */}
      <div className="content-card mb-6 max-w-4xl">
        <h2 className="text-accent mb-6 text-center text-xl">
          Platform Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-base font-bold text-blue-300 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack - Smaller */}
      <div className="content-card mb-6 max-w-4xl">
        <h2 className="text-accent mb-6 text-center text-xl">
          Technology Stack
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">⚛️</span>
            </div>
            <h3 className="text-base font-bold text-blue-300 mb-2">Frontend</h3>
            <p className="text-sm text-gray-300">
              React, Three.js, WebGL for immersive 3D experiences
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">🔗</span>
            </div>
            <h3 className="text-base font-bold text-purple-300 mb-2">
              Blockchain
            </h3>
            <p className="text-sm text-gray-300">
              Ethereum, Solidity smart contracts, IPFS storage
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">🎨</span>
            </div>
            <h3 className="text-base font-bold text-green-300 mb-2">
              Art Engine
            </h3>
            <p className="text-sm text-gray-300">
              Custom algorithms for procedural generation
            </p>
          </div>
        </div>
      </div>

      {/* Team Section - More Compact */}
      <div className="content-card mb-6 max-w-4xl">
        <h2 className="text-accent mb-6 text-center text-xl">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700/50 text-center hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{member.avatar}</div>
              <h3 className="text-base font-bold text-blue-300 mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-purple-300 mb-2 font-medium">
                {member.role}
              </p>
              <p className="text-xs text-gray-300 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section - Compact */}
      <div className="content-card mb-6 max-w-4xl">
        <h2 className="text-accent mb-6 text-center text-xl">
          Platform Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">10,000</div>
            <p className="text-sm text-gray-400">Total Orbs</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">3,247</div>
            <p className="text-sm text-gray-400">Minted</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">892</div>
            <p className="text-sm text-gray-400">Owners</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">127.5</div>
            <p className="text-sm text-gray-400">ETH Volume</p>
          </div>
        </div>
      </div>

      {/* Call to Action - Smaller */}
      <div className="content-card text-center bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30 max-w-2xl">
        <h2 className="text-xl font-bold text-white mb-3">
          Ready to Join the MOONR Universe?
        </h2>
        <p className="text-base text-gray-300 mb-4">
          Explore our collection and become part of the future of digital
          ownership.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="/buy" className="btn-primary text-sm px-4 py-2">
            Explore Collection
          </a>
          <a href="/community" className="btn-secondary text-sm px-4 py-2">
            Join Community
          </a>
        </div>
      </div>
    </div>
  );
}
