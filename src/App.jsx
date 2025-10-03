import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Orb from "./components/Orb";
import ImagesMarquee from "./components/ImagesMarquee";
import Header from "./components/Header";
import OrbInfoPanel from "./components/OrbInfoPanel";
import SphereSearch from "./components/SphereSearch";
import SphereStats from "./components/SphereStats";
import TopOwners from "./components/TopOwners";
import LiveActivityFeed from "./components/LiveActivityFeed";
import NewsUpdates from "./components/NewsUpdates";
import SpotifyPlayer from "./components/SpotifyPlayer";
import TokenInfoBanner from "./components/TokenInfoBanner";
import Buy from "./pages/Buy";
import About from "./pages/About";
import Governance from "./pages/Governance";
import Community from "./pages/Community";
import OrbComments from "./components/OrbComments";

function SphereMain() {
  const [selected, setSelected] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [lastSearchIndex, setLastSearchIndex] = useState(null);
  const totalImages = 30;
  const totalItems = 100;

  const handleSearch = (e) => {
    e.preventDefault();
    const num = parseInt(searchValue, 10);
    if (!isNaN(num) && num >= 1 && num <= totalItems) {
      setSelected(num - 1);
      setLastSearchIndex(num - 1);
    }
  };

  const handleMarqueeImageClick = (imgIndex) => {
    setSelected(imgIndex);
    setSearchValue((imgIndex + 1).toString());
    setLastSearchIndex(imgIndex);
  };

  return (
    <div className="main-content">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>

      {/* Marquee and Token Info in same line */}
      <div className="top-section">
        <div className="c-images-marquee-container">
          <ImagesMarquee
            totalImages={totalImages}
            onImageClick={handleMarqueeImageClick}
          />
        </div>
        <div className="token-info-container">
          <TokenInfoBanner />
        </div>
      </div>

      {/* Main horizontal layout: (search + info + comments) | orb | chat + activity */}
      <div className="sphere-layout">
        {/* Search, OrbInfoPanel, and Comments (left of sphere) */}
        <div className="info-panel-container">
          {/* Search component above info */}
          <div className="mb-3">
            <SphereSearch
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              handleSearch={handleSearch}
              totalItems={totalItems}
            />
          </div>

          {/* Orb Info Panel */}
          <div className="mb-3">
            <OrbInfoPanel selected={selected} totalImages={totalImages} />
          </div>

          {/* Comments below info panel */}
          <OrbComments selected={selected} totalImages={totalImages} />
        </div>

        {/* Orb (center) */}
        <div className="orb-container">
          {/* Orb */}
          <div className="orb-wrapper">
            <Orb
              selected={selected}
              setSelected={setSelected}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              totalImages={totalImages}
              totalItems={totalItems}
              handleSearch={handleSearch}
              lastSearchIndex={lastSearchIndex}
            />
          </div>

          {/* Stats below orb */}
          <div className="stats-container">
            <SphereStats />
          </div>
        </div>

        {/* Chat/activity widgets (right) */}
        <div className="chat-widgets-container">
          <LiveActivityFeed />
        </div>
      </div>

      {/* TopOwners below */}
      <div className="top-owners-container">
        <TopOwners />
      </div>

      <NewsUpdates />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* Global Music Player - appears on all pages */}
        <SpotifyPlayer />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<SphereMain />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/about" element={<About />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
