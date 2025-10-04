import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

export default function OrbInfoPanel({ isTabbed = false }) {
  const { selectedSpotNumber, getSpotData, totalImages } = useAppContext();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Reset image states and like state when selection changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);

    // Set initial like count from spot data
    const spotInfo = getSpotData(selectedSpotNumber);
    setLikeCount(spotInfo?.likes || 0);
  }, [selectedSpotNumber, getSpotData]);

  // Get spot data using context function - only returns data for spots 1-14
  const spotInfo = getSpotData(selectedSpotNumber);
  console.log("spotInfo", spotInfo);
  const hasImage = selectedSpotNumber && selectedSpotNumber <= totalImages;

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoaded(false);
    setImageError(true);
  };

  // Handle like/unlike functionality
  const handleLikeToggle = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
      console.log(`🔍 [OrbInfoPanel] Unliked spot ${selectedSpotNumber}`);
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      console.log(`🔍 [OrbInfoPanel] Liked spot ${selectedSpotNumber}`);
    }
  };

  return (
    <div className="h-full p-4 overflow-y-auto bg-black/20 backdrop-blur-sm scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent">
      {selectedSpotNumber ? (
        <div className="space-y-4">
          {/* Image Display - Only show for spots with images (1-14) */}
          {hasImage ? (
            <div className="relative group">
              <div className="aspect-square rounded-xl overflow-hidden border-2 border-purple-500/30 shadow-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                {/* Loading State */}
                <div
                  className={`w-full h-full flex items-center justify-center ${
                    !imageLoaded && !imageError ? "visible" : "hidden"
                  }`}
                >
                  <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                </div>

                {/* Actual Image */}
                <img
                  src={
                    spotInfo?.imageUrl ||
                    `/src/assets/img${selectedSpotNumber}.png`
                  }
                  alt={`Planet Ring #${selectedSpotNumber}`}
                  className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                    imageLoaded && !imageError
                      ? "visible"
                      : "invisible absolute inset-0"
                  }`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />

                {/* Image Error Fallback */}
                <div
                  className={`w-full h-full flex flex-col items-center justify-center text-purple-300 ${
                    imageError ? "visible" : "hidden"
                  }`}
                >
                  <div className="text-6xl mb-2">🖼️</div>
                  <div className="text-lg font-bold">
                    Spot #{selectedSpotNumber}
                  </div>
                  <div className="text-sm opacity-70">Image not available</div>
                </div>
              </div>

              {/* Image Number Overlay */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                #{selectedSpotNumber}
              </div>

              {/* Name Overlay - moved from below */}
              {spotInfo && (
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg border border-white/20 max-w-[180px]">
                  <div className="truncate">{spotInfo.name}</div>
                </div>
              )}

              {/* Views and Likes Overlay - rearranged layout */}
              {spotInfo && (
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  {/* Views and Likes Count - Left side */}
                  <div className="flex gap-2">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-bold border bg-black/80 backdrop-blur-sm border-cyan-500/50 text-cyan-400 flex items-center gap-1 shadow-lg`}
                    >
                      <span>👁️</span>
                      <span>{spotInfo.views.toLocaleString()}</span>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-bold border bg-black/80 backdrop-blur-sm border-red-500/50 text-red-400 flex items-center gap-1 shadow-lg`}
                    >
                      <span>❤️</span>
                      <span>{likeCount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Like Button - Right side - Improved circular design */}
                  <button
                    data-like-button
                    onClick={handleLikeToggle}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-300 transform hover:scale-110 shadow-lg flex items-center justify-center ${
                      isLiked
                        ? "bg-gradient-to-br from-red-500/80 to-pink-500/80 border-red-400/60 text-white shadow-red-500/40"
                        : "bg-black/90 border-gray-600/50 text-gray-400 hover:border-red-400/60 hover:text-red-300 hover:bg-red-500/20"
                    }`}
                  >
                    <span className="text-base leading-none">
                      {isLiked ? "❤️" : "🤍"}
                    </span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Empty Spot Display - For spots 15-100 (no data) */
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden border-2 border-gray-500/30 shadow-lg bg-gradient-to-br from-gray-600/20 to-gray-700/20">
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-200">
                  <div className="text-6xl mb-4">📍</div>
                  <div className="text-2xl font-bold mb-2">
                    Spot #{selectedSpotNumber}
                  </div>
                  <div className="text-sm opacity-80 text-center px-4">
                    Empty Spot
                  </div>
                  <div className="text-xs opacity-70 mt-2">
                    No data available
                  </div>
                </div>
              </div>

              {/* Spot Number Overlay */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                #{selectedSpotNumber}
              </div>
            </div>
          )}

          {/* Spot Information - Only show if we have data */}
          {spotInfo ? (
            <div className="space-y-3">
              {/* Description only - name moved to overlay */}
              <div className="text-center">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {spotInfo.description}
                </p>
              </div>

              {/* Owner Info */}
              <div className="bg-black/30 rounded-lg p-3 border border-cyan-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-cyan-300">
                    Owner:
                  </span>
                  <span className="text-xs font-mono text-cyan-200">
                    {spotInfo.owner}
                  </span>
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-black/30 rounded-lg p-3 border border-purple-500/30 flex flex-col max-h-80">
                <div className="flex items-center justify-between mb-3 flex-shrink-0">
                  <div className="text-sm font-bold text-purple-300 flex items-center gap-2">
                    <span>💬</span>
                    <span>Comments ({spotInfo.commentsList?.length || 0})</span>
                  </div>
                  <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                    View All
                  </button>
                </div>

                {/* Scrollable Comments Container */}
                <div
                  className="flex-1 overflow-y-auto space-y-2 mb-3 min-h-0 pr-1"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(168, 85, 247, 0.5) transparent",
                  }}
                >
                  {/* Display actual comments from spot data */}
                  {spotInfo.commentsList && spotInfo.commentsList.length > 0 ? (
                    spotInfo.commentsList.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-white/5 rounded-lg p-2 border border-purple-500/20"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs">💬</span>
                          <span className="text-xs font-medium text-purple-300">
                            {comment.user}
                          </span>
                          <span className="text-xs text-gray-400">
                            {comment.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-gray-300">{comment.text}</p>
                      </div>
                    ))
                  ) : (
                    /* Fallback when no comments */
                    <div className="text-center text-purple-200/60 text-xs py-4">
                      <div className="text-2xl mb-2">💭</div>
                      <div>No comments yet</div>
                      <div className="text-purple-300/40 mt-1">
                        Be the first to share your thoughts!
                      </div>
                    </div>
                  )}
                </div>

                {/* Add Comment Input - Fixed at bottom */}
                <div className="border-t border-purple-500/20 pt-3 flex-shrink-0">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 px-3 py-2 text-xs rounded-lg border border-purple-500/30 bg-white/10 backdrop-blur-sm text-white placeholder-purple-200/60 focus:outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/20 transition-all duration-200"
                    />
                    <button className="px-3 py-2 text-xs font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg shadow-purple-500/25">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* No Data Display for spots 15-100 */
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="text-lg font-bold text-white mb-2">
                  Empty Spot #{selectedSpotNumber}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  This spot in the MOONR sphere is currently empty and has no
                  associated data or image.
                </p>
              </div>

              {/* Empty Status */}
              <div className="bg-black/30 rounded-lg p-3 border border-gray-500/30">
                <div className="text-sm font-bold text-gray-300 mb-2">
                  Status
                </div>
                <div className="space-y-1 text-xs">
                  <div>
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white ml-1">Empty Spot</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Position:</span>
                    <span className="text-white ml-1">
                      {selectedSpotNumber}/100
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Data:</span>
                    <span className="text-white ml-1">None available</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-center">
          <div>
            <div className="text-6xl mb-4">🪐</div>
            <h3 className="text-xl font-bold text-white mb-2">Select a Spot</h3>
            <p className="text-purple-200 text-sm max-w-xs">
              Click on any spot in the sphere to view its details. Spots 1-
              {totalImages} have images and full data, spots {totalImages + 1}
              -100 are empty.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
