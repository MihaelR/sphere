import React, { useState } from "react";

export default function OrbComments({ selected, totalImages }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      user: "0xABC...123",
      text: "Amazing artwork! Love the colors 🎨",
      time: "2h ago",
      orbId: 1,
    },
    {
      user: "0xDEF...456",
      text: "This is going to moon! 🚀",
      time: "4h ago",
      orbId: 1,
    },
    {
      user: "0x789...GHI",
      text: "Beautiful piece, well done!",
      time: "1d ago",
      orbId: 2,
    },
  ]);

  const orbNumber = selected !== null ? selected + 1 : null;

  // Filter comments for current orb
  const orbComments = comments.filter(
    (comment) =>
      comment.orbId === orbNumber ||
      (orbNumber && comment.orbId === (orbNumber % 3) + 1)
  );

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() && orbNumber) {
      const comment = {
        user: "0x123...456", // Current user
        text: newComment,
        time: "just now",
        orbId: orbNumber,
      };
      setComments((prev) => [comment, ...prev]);
      setNewComment("");
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

  const orbName = getOrbName(selected);

  return (
    <div className="w-64 max-w-full rounded-xl shadow-lg p-3 flex flex-col bg-base-200 bg-opacity-80 h-80">
      <div className="font-bold text-sm mb-2 text-base-content/80 text-center">
        {orbName ? `${orbName} Comments` : "Orb Comments"}
      </div>

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="mb-3">
        <div className="flex flex-col gap-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={
              orbNumber ? "Share your thoughts..." : "Select an orb to comment"
            }
            className="w-full p-2 text-xs rounded bg-base-100 border border-base-content/20 resize-none"
            rows={2}
            disabled={!orbNumber}
          />
          <button
            type="submit"
            className="btn btn-xs btn-primary self-end"
            disabled={!newComment.trim() || !orbNumber}
          >
            Post
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {orbNumber ? (
          orbComments.length > 0 ? (
            orbComments.map((comment, i) => (
              <div key={i} className="bg-base-100 rounded p-2 shadow-sm">
                <div className="flex justify-between items-start mb-1">
                  <div className="font-medium text-primary text-xs">
                    {comment.user}
                  </div>
                  <div className="text-[10px] text-base-content/60">
                    {comment.time}
                  </div>
                </div>
                <div className="text-xs text-base-content/90">
                  {comment.text}
                </div>
                <div className="flex gap-2 mt-1">
                  <button className="text-[10px] text-base-content/60 hover:text-red-500 transition">
                    ❤️ Like
                  </button>
                  <button className="text-[10px] text-base-content/60 hover:text-primary transition">
                    💬 Reply
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-base-content/60 text-xs py-6">
              No comments yet. Be the first!
            </div>
          )
        ) : (
          <div className="text-center text-base-content/60 text-xs py-6">
            Select an orb to view comments
          </div>
        )}
      </div>

      {/* Comments Count */}
      {orbNumber && (
        <div className="mt-2 text-center text-[10px] text-base-content/60 border-t border-base-content/20 pt-1">
          {orbComments.length} comment{orbComments.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
