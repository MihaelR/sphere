import React, { useState, useEffect, useRef } from "react";
import "./SpotifyPlayer.css";
import vynlImg from "../assets/vynil.png";
import youtubeLogo from "../assets/youtube.png";
import spotifyLogo from "../assets/spotify.png";

const GENRES = [
  {
    label: "Lofi",
    color: "#a3e635",
    youtube: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1",
    spotify:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DX889U0CL85jj?autoplay=1",
  },
  {
    label: "Rock",
    color: "#f87171",
    youtube: "https://www.youtube.com/embed/njqkg8o4C84?autoplay=1",
    spotify:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DWXRqgorJj26U?autoplay=1",
  },
  {
    label: "Synthwave",
    color: "#818cf8",
    youtube: "https://www.youtube.com/embed/ICjyAe9S54c?autoplay=1",
    spotify:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DX0b1hHYQtJjp?autoplay=1",
  },
  {
    label: "Jazz",
    color: "#fbbf24",
    youtube: "https://www.youtube.com/embed/MF7m5B2Xp6I?autoplay=1",
    spotify:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DXbITWG1ZJKYt?autoplay=1",
  },
  {
    label: "Pop",
    color: "#38bdf8",
    youtube: "https://www.youtube.com/embed/OpQFFLBMEPI?autoplay=1", // Top Pop Hits 2024
    spotify:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?autoplay=1", // Today's Top Hits
  },
  {
    label: "Rap/Trap",
    color: "#f472b6",
    youtube: "https://www.youtube.com/embed/2Vv-BfVoq4g?autoplay=1", // Example: Rap/Trap radio
    spotify:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd?autoplay=1", // RapCaviar
  },
  {
    label: "EDM",
    color: "#34d399",
    youtube: "https://www.youtube.com/embed/7vK5F0UkQeE?autoplay=1", // Example: EDM radio
    spotify:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DX4dyzvuaRJ0n?autoplay=1", // Dance Party
  },
  {
    label: "Metal",
    color: "#a78bfa",
    youtube: "https://www.youtube.com/embed/1k8craCGpgs?autoplay=1", // Example: Metal radio
    spotify:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DX9qNs32fujYe?autoplay=1", // Kickass Metal
  },
  {
    label: "Reggae",
    color: "#facc15",
    youtube: "https://www.youtube.com/embed/CHekNnySAfM?autoplay=1", // Example: Reggae radio
    spotify:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DXbSbnqxMTGx9?autoplay=1", // Reggae Classics
  },
];

// Default to YouTube Rock
const DEFAULT_YOUTUBE_RADIO = GENRES[1].youtube;
const DEFAULT_SPOTIFY_PLAYLIST = GENRES[1].spotify;

export default function SpotifyPlayer() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("youtube"); // "youtube" or "spotify"
  const [embedUrl, setEmbedUrl] = useState(DEFAULT_YOUTUBE_RADIO);
  const [isPlaying, setIsPlaying] = useState(true); // Always true for embed with autoplay
  const [minimized, setMinimized] = useState(false);
  const [closed, setClosed] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    title: "Rock Vibes",
    artist: "YouTube Radio",
    genre: "Rock",
  });
  const iframeRef = useRef(null);
  const genresRowRef = useRef(null);
  const [dragPosition, setDragPosition] = useState({ x: 12, y: 120 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsPlaying(embedUrl.includes("autoplay=1"));

    // Update current track info based on mode and selected genre
    const activeGenre = GENRES.find(
      (genre) =>
        embedUrl === (mode === "youtube" ? genre.youtube : genre.spotify)
    );

    if (activeGenre) {
      setCurrentTrack({
        title: `${activeGenre.label} ${
          mode === "youtube" ? "Radio" : "Playlist"
        }`,
        artist: mode === "youtube" ? "YouTube Music" : "Spotify",
        genre: activeGenre.label,
      });
    }
  }, [embedUrl, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "youtube") {
      let url = input.trim() || DEFAULT_YOUTUBE_RADIO;
      if (!url.includes("autoplay=1")) {
        url += (url.includes("?") ? "&" : "?") + "autoplay=1";
      }
      setEmbedUrl(url);
    } else {
      // Accept both embed and normal Spotify URLs
      let url = input.trim();
      let match = url.match(
        /https:\/\/open\.spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+)/
      );
      if (match) {
        // Always use embed format
        url = `https://open.spotify.com/embed/${match[1]}/${match[2]}`;
      }
      if (url.startsWith("https://open.spotify.com/embed/")) {
        // Ensure autoplay=1 is present
        url += url.includes("?") ? "&autoplay=1" : "?autoplay=1";
        setEmbedUrl(url);
      } else {
        setEmbedUrl(DEFAULT_SPOTIFY_PLAYLIST);
      }
    }
  };

  // Switch player and reset input/embedUrl to default for that mode
  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setInput("");
    setEmbedUrl(
      newMode === "youtube" ? DEFAULT_YOUTUBE_RADIO : DEFAULT_SPOTIFY_PLAYLIST
    );
  };

  const handleGenreClick = (genre) => {
    setInput("");
    setEmbedUrl(mode === "youtube" ? genre.youtube : genre.spotify);
  };

  // Scroll genres row left/right
  const scrollGenres = (dir) => {
    if (genresRowRef.current) {
      genresRowRef.current.scrollBy({
        left: dir * 120,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e) => {
    if (minimized) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - dragPosition.x,
        y: e.clientY - dragPosition.y,
      });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && minimized) {
      const newX = Math.max(
        0,
        Math.min(window.innerWidth - 100, e.clientX - dragStart.x)
      );
      const newY = Math.max(
        0,
        Math.min(window.innerHeight - 150, e.clientY - dragStart.y)
      );

      setDragPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global mouse event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none"; // Prevent text selection while dragging

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "";
      };
    }
  }, [isDragging, dragStart, dragPosition]);

  if (closed) return null;

  return (
    <>
      {/* Always render iframe for continuous playback */}
      <div
        className={`spotify-player-container ${
          minimized ? "spotify-player-hidden" : "spotify-player-main"
        }`}
      >
        <div className="spotify-player-card">
          {/* Top Control Bar - Above Header */}
          <div className="player-top-controls">
            {/* Vinyl Logo - Top Left */}
            <div className="vinyl-container-control">
              <VinylPlate isPlaying={isPlaying} />
            </div>

            {/* Platform Icons - Top Middle */}
            <div className="platform-buttons-control">
              <button
                className={`platform-button-control ${
                  mode === "youtube" ? "active" : "inactive"
                }`}
                onClick={() => handleModeSwitch("youtube")}
                type="button"
                aria-label="YouTube"
              >
                <img
                  src={youtubeLogo}
                  alt="YouTube"
                  className={`platform-icon-control ${
                    mode === "youtube" ? "active" : "inactive"
                  }`}
                />
              </button>
              <button
                className={`platform-button-control ${
                  mode === "spotify" ? "active" : "inactive"
                }`}
                onClick={() => handleModeSwitch("spotify")}
                type="button"
                aria-label="Spotify"
              >
                <img
                  src={spotifyLogo}
                  alt="Spotify"
                  className={`platform-icon-control ${
                    mode === "spotify" ? "active" : "inactive"
                  }`}
                />
              </button>
            </div>

            {/* Control Buttons - Top Right */}
            <div className="player-controls-control">
              <button
                onClick={() => setMinimized(true)}
                className="control-button"
                aria-label="Minimize"
              >
                &ndash;
              </button>
              <button
                onClick={() => setClosed(true)}
                className="control-button close"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Header Section - Full Width */}
          <div className="player-header-full">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <span className="text-sm">🎵</span>
                  </div>
                  <div>
                    <h2 className="text-sm font-bold">Music Player</h2>
                    <p className="text-white/80 text-xs">Now playing</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      isPlaying ? "bg-green-400 animate-pulse" : "bg-gray-400"
                    }`}
                  ></div>
                  <span className="text-xs font-medium">
                    {isPlaying ? "Playing" : "Paused"}
                  </span>
                </div>
              </div>

              {/* Current Track Info */}
              <div className="mt-2 bg-black/20 rounded-lg p-2">
                <div className="text-xs font-bold text-white truncate">
                  {currentTrack.title}
                </div>
                <div className="text-xs text-white/70 truncate">
                  {currentTrack.artist}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    {currentTrack.genre}
                  </span>
                  <span className="text-xs text-white/60">
                    {mode === "youtube" ? "📺 YouTube" : "🎵 Spotify"}
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
          </div>

          <div className="genres-container">
            <button
              className="genre-scroll-button"
              onClick={() => scrollGenres(-1)}
              type="button"
              aria-label="Scroll genres left"
            >
              &#8592;
            </button>

            <div ref={genresRowRef} className="genres-row">
              {GENRES.map((genre) => {
                const isActive =
                  embedUrl ===
                  (mode === "youtube" ? genre.youtube : genre.spotify);
                return (
                  <button
                    key={genre.label}
                    className={`genre-button ${isActive ? "active" : ""}`}
                    style={{
                      backgroundColor: isActive ? genre.color : "transparent",
                      borderColor: isActive ? genre.color : "transparent",
                      boxShadow: isActive
                        ? `0 0 0 2px ${genre.color}55`
                        : undefined,
                    }}
                    type="button"
                    onClick={() => handleGenreClick(genre)}
                  >
                    {genre.label}
                  </button>
                );
              })}
            </div>

            <button
              className="genre-scroll-button"
              onClick={() => scrollGenres(1)}
              type="button"
              aria-label="Scroll genres right"
            >
              &#8594;
            </button>
          </div>

          <form onSubmit={handleSubmit} className="input-form">
            <input
              className="url-input"
              placeholder={
                mode === "youtube"
                  ? "Paste YouTube link (optional)"
                  : "Paste Spotify link (track/album/playlist)"
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="play-button" type="submit">
              Play
            </button>
          </form>

          <div className="iframe-container">
            {mode === "youtube" ? (
              <iframe
                ref={iframeRef}
                title="YouTube Radio"
                src={embedUrl}
                className="player-iframe"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            ) : (
              <iframe
                ref={iframeRef}
                title="Spotify Player"
                src={embedUrl}
                className="player-iframe"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            )}
          </div>
        </div>
      </div>

      {/* Minimized button overlay with dragging */}
      {minimized && (
        <div
          className="minimized-player"
          style={{
            left: `${dragPosition.x}px`,
            top: `${dragPosition.y}px`,
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <div className="minimized-container" onMouseDown={handleMouseDown}>
            <button
              onClick={(e) => {
                // Only open player if not dragging
                if (!isDragging) {
                  setMinimized(false);
                }
                e.preventDefault();
              }}
              className="minimized-button"
              aria-label="Open music player"
              style={{ cursor: isDragging ? "grabbing" : "pointer" }}
            >
              <img
                src={vynlImg}
                alt="Open player"
                className={`minimized-vinyl ${
                  isPlaying ? "playing" : "stopped"
                }`}
                draggable={false}
              />
              {/* Open indicator on vinyl */}
              <div className="vinyl-open-indicator">
                <span className="open-text">Open</span>
              </div>
            </button>
            <div className="minimized-text">
              <span className="blinking-text">🎵 Play Music</span>
            </div>

            {/* Drag Indicator - Below the button */}
            <div className="drag-indicator">
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                className="drag-icon"
              >
                <path
                  d="M2 3h12M2 6h12M2 9h12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="drag-text">Drag me</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Use vynl.png as the vinyl plate, rotate if playing
function VinylPlate({ isPlaying }) {
  return (
    <span
      className={`vinyl-plate-control ${isPlaying ? "playing" : "stopped"}`}
    >
      <img src={vynlImg} alt="vinyl" className="vinyl-image-control" />
    </span>
  );
}
