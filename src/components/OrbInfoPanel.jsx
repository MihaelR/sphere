import React, { useState, useEffect } from "react";

export default function OrbInfoPanel({ selected, totalImages }) {
  const [imageError, setImageError] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(
    Math.floor(Math.random() * 50) + 10
  );
  const [rating, setRating] = useState(Math.floor(Math.random() * 5) + 1);
  const [userRating, setUserRating] = useState(0);
  const [showMetadata, setShowMetadata] = useState(false);
  const [visitorCount, setVisitorCount] = useState(
    Math.floor(Math.random() * 500) + 100
  );
  const [totalLikes, setTotalLikes] = useState(
    Math.floor(Math.random() * 200) + 50
  );

  const orbNumber = selected !== null ? selected + 1 : null;
  const isOwned = orbNumber && orbNumber <= 67;
  const price = orbNumber
    ? orbNumber <= 67
      ? "SOLD"
      : `${(0.5 + Math.random() * 2).toFixed(2)} ETH`
    : "---";

  // Mock data
  const creationDate = orbNumber
    ? new Date(2024, 0, orbNumber).toLocaleDateString()
    : "---";
  const tokenId = orbNumber
    ? `#${orbNumber.toString().padStart(4, "0")}`
    : "---";
  const contractAddress = "0x1234...5678";
  const fileSize = orbNumber
    ? `${(2.1 + Math.random() * 3).toFixed(1)} MB`
    : "---";
  const format = "PNG";
  const dimensions = "1024x1024";

  const getImagePath = (index) => {
    if (index === null || index < 0) return null;
    const imageNumber = (index % totalImages) + 1;
    try {
      return new URL(`../assets/img${imageNumber}.png`, import.meta.url).href;
    } catch (error) {
      console.warn(`Image img${imageNumber}.png not found`);
      return null;
    }
  };

  const getOrbName = (index) => {
    if (index === null || index < 0) return null;
    const imageNumber = (index % totalImages) + 1;
    const names = [
      "Celestial Nexus",
      "Cosmic Drift",
      "Stellar Bloom",
      "Void Echo",
      "Aurora Pulse",
      "Nebula Heart",
      "Quantum Sphere",
      "Solar Flare",
      "Galactic Core",
      "Astral Ring",
      "Lunar Shadow",
      "Crystal Vortex",
      "Plasma Wave",
      "Dark Matter",
      "Stardust",
      "Infinity Loop",
      "Cosmic Web",
      "Black Hole",
      "Supernova",
      "Meteor Shower",
      "Galaxy Spiral",
      "Space Dust",
      "Comet Trail",
      "Planet Ring",
      "Solar Wind",
      "Cosmic Ray",
      "Star Forge",
      "Void Portal",
      "Energy Field",
      "Time Warp",
    ];
    return names[(imageNumber - 1) % names.length];
  };

  const imagePath = getImagePath(selected);
  const orbName = getOrbName(selected);

  React.useEffect(() => {
    setImageError(false);
    setLiked(false);
    setLikeCount(Math.floor(Math.random() * 50) + 10);
    setRating(Math.floor(Math.random() * 5) + 1);
    setUserRating(0);
    setShowMetadata(false);
    setVisitorCount(Math.floor(Math.random() * 500) + 100);
    setTotalLikes(Math.floor(Math.random() * 200) + 50);
  }, [selected]);

  // Simulate visitor count changes
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount((prev) => prev + Math.floor(Math.random() * 3));
      if (Math.random() < 0.3) {
        // 30% chance to add a like
        setTotalLikes((prev) => prev + 1);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const handleShare = (platform) => {
    const shareText = `Check out ${orbName} #${orbNumber} on MOONR!`;
    const url = window.location.href + `?orb=${orbNumber}`;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "discord":
        navigator.clipboard.writeText(`${shareText} ${url}`).then(() => {
          alert("Discord message copied to clipboard!");
        });
        break;
      default:
        navigator.clipboard.writeText(`${shareText} ${url}`).then(() => {
          alert("Link copied to clipboard!");
        });
    }
  };

  const handleRating = (stars) => {
    setUserRating(stars);
  };

  const renderStars = (currentRating, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`cursor-${interactive ? "pointer" : "default"} text-xs ${
          i < currentRating ? "text-yellow-400" : "text-gray-400"
        }`}
        onClick={interactive ? () => handleRating(i + 1) : undefined}
      >
        ★
      </span>
    ));
  };

  const getRarityBadge = (orbNum) => {
    if (!orbNum) return null;
    const rarity =
      orbNum <= 10 ? "Legendary" : orbNum <= 30 ? "Rare" : "Common";
    const colors = {
      Legendary: "bg-purple-500 text-white",
      Rare: "bg-blue-500 text-white",
      Common: "bg-gray-500 text-white",
    };
    return (
      <span
        className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${colors[rarity]}`}
      >
        {rarity}
      </span>
    );
  };

  return (
    <div className="w-64 max-w-full rounded-xl shadow-lg p-3 flex flex-col items-center bg-base-200 bg-opacity-80 max-h-[70vh] overflow-y-auto">
      {/* Visitor Count Header */}
      <div className="w-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-2 mb-2 border border-blue-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-blue-300">
              {visitorCount.toLocaleString()} visitors
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs">❤️</span>
            <span className="text-xs font-medium text-red-300">
              {totalLikes.toLocaleString()} likes
            </span>
          </div>
        </div>
      </div>

      {/* Orb Image Preview - Smaller */}
      <div className="w-48 h-36 mb-2 rounded-lg overflow-hidden border-2 border-primary/30 bg-base-300 flex items-center justify-center">
        {imagePath && !imageError ? (
          <img
            src={imagePath}
            alt={`Orb #${orbNumber}`}
            className="w-full h-full object-cover"
            onError={() => {
              console.log("Image failed to load:", imagePath);
              setImageError(true);
            }}
            onLoad={() => {
              console.log("Image loaded successfully:", imagePath);
            }}
          />
        ) : (
          <div className="text-xs text-center text-base-content/60">
            {imagePath && imageError ? "No Image Available" : "No orb selected"}
          </div>
        )}
      </div>

      {/* Title, Field Number, and Rarity Badge */}
      <div className="w-full flex justify-between items-center mb-2">
        <div className="font-bold text-sm text-base-content/80 truncate">
          {orbName || "Select an Orb"}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <div className="text-primary font-mono font-semibold text-xs">
            #{orbNumber || "---"}
          </div>
          {orbNumber && getRarityBadge(orbNumber)}
        </div>
      </div>

      {/* Combined Rating & Social Actions - More Compact */}
      {orbNumber && (
        <div className="w-full bg-base-300 rounded-lg p-2 mb-3">
          <div className="flex justify-between items-center mb-2">
            {/* Rating Section */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                {renderStars(rating)}
                <span className="text-[10px] text-base-content/60 ml-1">
                  ({rating}/5)
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[10px]">Rate:</span>
                {renderStars(userRating, true)}
              </div>
            </div>

            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 px-2 py-1 rounded-full transition text-xs ${
                liked
                  ? "bg-red-500 text-white"
                  : "bg-base-100 text-base-content hover:bg-red-500 hover:text-white"
              }`}
            >
              <svg
                className="w-3 h-3"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="text-xs font-medium">{likeCount}</span>
            </button>
          </div>

          {/* Share Buttons */}
          <div className="flex gap-1 justify-center">
            <button
              onClick={() => handleShare("twitter")}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition text-[10px]"
            >
              🐦 Share
            </button>
            <button
              onClick={() => handleShare("discord")}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition text-[10px]"
            >
              💬 Discord
            </button>
          </div>
        </div>
      )}

      {/* Basic Info - More Compact */}
      <div className="w-full space-y-2 mb-3">
        <div className="flex justify-between text-xs">
          <span className="font-semibold">Status:</span>
          <span className={isOwned ? "text-success" : "text-warning"}>
            {orbNumber ? (isOwned ? "Owned" : "Available") : "---"}
          </span>
        </div>

        <div className="flex justify-between text-xs">
          <span className="font-semibold">Price:</span>
          <span className="font-mono">{price}</span>
        </div>

        <div className="flex justify-between text-xs">
          <span className="font-semibold">Created:</span>
          <span className="text-xs">{creationDate}</span>
        </div>

        {isOwned && (
          <div className="flex justify-between text-xs">
            <span className="font-semibold">Owner:</span>
            <span className="text-[10px] font-mono">
              0x{Math.random().toString(16).substr(2, 8)}...
            </span>
          </div>
        )}
      </div>

      {/* Technical Details */}
      {orbNumber && (
        <div className="w-full space-y-1">
          <button
            onClick={() => setShowMetadata(!showMetadata)}
            className="w-full text-left font-semibold text-xs text-primary hover:text-primary/80 transition"
          >
            {showMetadata ? "▼" : "▶"} Technical Details
          </button>

          {showMetadata && (
            <div className="bg-base-300 rounded-lg p-2 space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Token ID:</span>
                <span className="font-mono">{tokenId}</span>
              </div>
              <div className="flex justify-between">
                <span>Contract:</span>
                <span className="font-mono text-[10px]">{contractAddress}</span>
              </div>
              <div className="flex justify-between">
                <span>File Size:</span>
                <span>{fileSize}</span>
              </div>
              <div className="flex justify-between">
                <span>Format:</span>
                <span>{format}</span>
              </div>
              <div className="flex justify-between">
                <span>Dimensions:</span>
                <span>{dimensions}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Buy Button */}
      {orbNumber && !isOwned && (
        <button className="btn btn-primary btn-xs mt-3 w-full text-xs">
          Buy Now
        </button>
      )}
    </div>
  );
}
