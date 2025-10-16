import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

export default function OrbInfoPanel({ isTabbed = false }) {
  const { selectedSpotNumber, getSpotData, totalImages, setSelected } =
    useAppContext();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
    const spotInfo = getSpotData(selectedSpotNumber);
    setLikeCount(spotInfo?.likes || 0);
    setShowComments(false);
  }, [selectedSpotNumber, getSpotData]);

  const spotInfo = getSpotData(selectedSpotNumber);
  const hasImage = selectedSpotNumber && selectedSpotNumber <= totalImages;

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoaded(false);
    setImageError(true);
  };

  const handleLikeToggle = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setSelected(
      (prev) => (prev - 1 + totalImages) % totalImages || totalImages
    );
  };

  const handleNext = () => {
    setSelected((prev) => (prev + 1) % totalImages || 1);
  };

  const handleCommentToggle = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <div className="h-full overflow-y-auto bg-[#181825]">
      {selectedSpotNumber ? (
        <div>
          {hasImage ? (
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden border border-purple-500/30 bg-[#23284a]">
                {/* Loading State */}
                <div
                  className={`w-full h-full flex items-center justify-center ${
                    !imageLoaded && !imageError ? "visible" : "hidden"
                  }`}
                >
                  <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                </div>

                {/* Left Arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center border border-purple-500/40"
                  aria-label="Previous"
                  style={{ transform: "translateY(-50%)" }}
                >
                  <span className="text-2xl">&#8592;</span>
                </button>

                {/* Actual Image */}
                <img
                  src={
                    spotInfo?.imageUrl ||
                    `/src/assets/img${selectedSpotNumber}.png`
                  }
                  alt={`Planet Ring #${selectedSpotNumber}`}
                  className={`w-full h-full object-cover ${
                    imageLoaded && !imageError
                      ? "visible"
                      : "invisible absolute inset-0"
                  }`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />

                {/* Right Arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center border border-purple-500/40"
                  aria-label="Next"
                  style={{ transform: "translateY(-50%)" }}
                >
                  <span className="text-2xl">&#8594;</span>
                </button>

                {/* Spot Number (top left) */}
                <div className="absolute top-3 left-3 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  #{selectedSpotNumber}
                </div>
                {/* Likes and Views (top right) */}
                {spotInfo && (
                  <div className="absolute top-3 right-3 z-10 flex gap-2">
                    <div className="px-2 py-1 rounded-full text-xs font-bold border bg-black border-red-500 text-red-400 flex items-center gap-1">
                      <img
                        src="/src/assets/logos/heart.png"
                        alt="Likes"
                        className="w-4 h-4"
                      />
                      <span>{likeCount.toLocaleString()}</span>
                    </div>
                    <div className="px-2 py-1 rounded-full text-xs font-bold border bg-black border-cyan-500 text-cyan-400 flex items-center gap-1">
                      <img
                        src="/src/assets/logos/eye.png"
                        alt="Views"
                        className="w-4 h-4"
                      />
                      <span>{spotInfo.views.toLocaleString()}</span>
                    </div>
                  </div>
                )}
                {/* Spot Name (bottom left) */}
                {spotInfo && (
                  <div className="absolute bottom-3 left-3 bg-black text-white px-3 py-1 rounded-lg text-sm font-bold border border-white/20 max-w-[180px] truncate">
                    {spotInfo.name}
                  </div>
                )}
                {/* Like & Comment Buttons (bottom right) */}
                <div className="absolute bottom-3 right-3 z-10 flex gap-2">
                  <button
                    data-like-button
                    onClick={handleLikeToggle}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                      isLiked
                        ? "bg-white border-black"
                        : "bg-black border-gray-600"
                    }`}
                  >
                    <img
                      src="/src/assets/logos/heart.png"
                      alt="Like"
                      className={`w-6 h-6 ${
                        isLiked ? "opacity-100" : "opacity-60"
                      }`}
                    />
                  </button>
                  <button
                    onClick={handleCommentToggle}
                    className="relative w-10 h-10 rounded-full border-2 border-purple-400 hover:bg-purple-500/20 hover:border-purple-400 transition-all flex items-center justify-center"
                    aria-label="Show Comments"
                  >
                    💬
                    {spotInfo?.commentsList && (
                      <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">
                        {spotInfo.commentsList.length}
                      </span>
                    )}
                  </button>
                </div>

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
            </div>
          ) : (
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden border border-gray-500 bg-[#23284a]">
                <img
                  src="/src/assets/default.png"
                  alt="Default spot"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <div className="text-2xl font-bold mb-1 drop-shadow">
                    Spot #{selectedSpotNumber}
                  </div>
                  <div className="text-base opacity-90 mb-1 drop-shadow">
                    Empty Spot
                  </div>
                  <div className="text-xs opacity-80 drop-shadow">
                    No data available
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Socials, owner, holds - moved below image */}
          {spotInfo && !showComments && (
            <div className="flex flex-col items-center gap-3 mt-3 w-full">
              <div className="w-full bg-[#23284a] border border-purple-500/20 rounded-lg px-4 py-2 mb-1 text-center">
                <p className="text-sm text-purple-100 leading-relaxed font-medium">
                  {spotInfo.description}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1 w-full">
                <div className="flex items-center gap-2 bg-black border border-cyan-400 rounded-full px-3 py-1 text-xs font-mono text-cyan-200">
                  <span className="font-bold">Owner:</span>
                  <span className="truncate max-w-[120px]">
                    {spotInfo.owner}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-black border border-green-400 rounded-full px-3 py-1 text-xs font-mono text-green-200">
                  <span className="font-bold">Holds:</span>
                  <span>100k $MOONR</span>
                </div>
              </div>
              <div className="flex gap-2 mt-1 flex-wrap justify-center">
                {spotInfo.socials?.twitter && (
                  <a
                    href={spotInfo.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter"
                    className="bg-black border border-blue-400 rounded-full p-1 hover:bg-blue-500/20"
                  >
                    <img
                      src="/src/assets/logos/twitter.png"
                      alt="Twitter"
                      className="w-6 h-6"
                    />
                  </a>
                )}
                {spotInfo.socials?.telegram && (
                  <a
                    href={spotInfo.socials.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Telegram"
                    className="bg-black border border-blue-400 rounded-full p-1 hover:bg-blue-500/20"
                  >
                    <img
                      src="/src/assets/logos/telegram.png"
                      alt="Telegram"
                      className="w-6 h-6"
                    />
                  </a>
                )}
                {spotInfo.socials?.discord && (
                  <a
                    href={spotInfo.socials.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Discord"
                    className="bg-black border border-indigo-400 rounded-full p-1 hover:bg-indigo-500/20"
                  >
                    <img
                      src="/src/assets/logos/discord.png"
                      alt="Discord"
                      className="w-6 h-6"
                    />
                  </a>
                )}
                {spotInfo.socials?.facebook && (
                  <a
                    href={spotInfo.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    className="bg-black border border-blue-400 rounded-full p-1 hover:bg-blue-500/20"
                  >
                    <img
                      src="/src/assets/logos/facebook.png"
                      alt="Facebook"
                      className="w-6 h-6"
                    />
                  </a>
                )}
                {spotInfo.socials?.instagram && (
                  <a
                    href={spotInfo.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    className="bg-black border border-pink-400 rounded-full p-1 hover:bg-pink-500/20"
                  >
                    <img
                      src="/src/assets/logos/instagram.png"
                      alt="Instagram"
                      className="w-6 h-6"
                    />
                  </a>
                )}
                {spotInfo.socials?.website && (
                  <a
                    href={spotInfo.socials.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Website"
                    className="bg-black border border-purple-400 rounded-full p-1 hover:bg-purple-500/20"
                  >
                    <img
                      src="/src/assets/logos/browser.png"
                      alt="Website"
                      className="w-6 h-6"
                    />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Spot Information - Only show if we have data */}
          {spotInfo ? (
            <div className="space-y-3">
              {/* Comments Section - toggled */}
              {showComments && (
                <div className="bg-black rounded-lg p-3 border border-purple-500/30 flex flex-col max-h-80">
                  <div className="flex items-center justify-between mb-3 flex-shrink-0">
                    <div className="text-sm font-bold text-purple-300 flex items-center gap-2">
                      <span>💬</span>
                      <span>
                        Comments ({spotInfo.commentsList?.length || 0})
                      </span>
                    </div>
                    <button
                      className="text-xs text-purple-400 hover:text-purple-300"
                      onClick={handleCommentToggle}
                    >
                      Close
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
                    {spotInfo.commentsList &&
                    spotInfo.commentsList.length > 0 ? (
                      spotInfo.commentsList.map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-white/5 rounded-lg p-2 border border-purple-500/20"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-purple-300">
                              {comment.user}
                            </span>
                            <span className="text-xs text-gray-400">
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className="text-xs text-gray-300">
                            {comment.text}
                          </p>
                        </div>
                      ))
                    ) : (
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
                        className="flex-1 px-3 py-2 text-xs rounded-lg border border-purple-500/30 bg-white/10 text-white placeholder-purple-200/60 focus:outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/20"
                      />
                      <button className="px-3 py-2 text-xs font-bold bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
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

              <div className="bg-black rounded-lg p-3 border border-gray-500/30">
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
