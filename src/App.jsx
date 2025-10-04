import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AppProvider } from "./context/AppContext";
import Orb from "./components/Orb";
import ImagesMarquee from "./components/ImagesMarquee";
import Header from "./components/Header";
import SphereSearch from "./components/SphereSearch";
import SphereStats from "./components/SphereStats";
import NewsUpdates from "./components/NewsUpdates";
import SpotifyPlayer from "./components/SpotifyPlayer";
import Buy from "./pages/Buy";
import About from "./pages/About";
import Governance from "./pages/Governance";
import Community from "./pages/Community";
import ChatInfoTabs from "./components/ChatInfoTabs";
import TokenInfoTabs from "./components/TokenInfoTabs";
import { useAppContext } from "./context/AppContext";

function SphereMain() {
  const {
    selected,
    totalImages,
    totalItems,
    handleMarqueeImageClick,
    setSelected,
  } = useAppContext();

  return (
    <div className="main-content">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>

      {/* Marquee directly below header */}
      <div className="marquee-below-header">
        <ImagesMarquee
          totalImages={totalImages}
          onImageClick={handleMarqueeImageClick}
        />
      </div>

      {/* Main layout: Left (Token+Search) | Center sphere | Right (Combined Chat+Info) */}
      <div className="sphere-main-layout">
        {/* Left Sidebar: Token Info + Top Holders tabs, Search bottom */}
        <div className="left-sidebar">
          {/* Token Info + Top Holders Tabs */}
          <div className="mb-4">
            <TokenInfoTabs />
          </div>

          {/* Search */}
          <div>
            <SphereSearch />
          </div>
        </div>

        {/* Center: Big Sphere Container */}
        <div className="center-sphere-container">
          {/* Orb */}
          <div className="orb-wrapper">
            <Orb
              selected={selected}
              setSelected={setSelected}
              totalImages={totalImages}
              totalItems={totalItems}
            />
          </div>

          {/* Stats below sphere */}
          <div className="stats-container">
            <SphereStats />
          </div>
        </div>

        {/* Right Sidebar: Combined Chat + Info Panel with Tabs */}
        <div className="right-sidebar">
          <ChatInfoTabs />
        </div>
      </div>

      <NewsUpdates />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppProvider>
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
      </AppProvider>
    </Router>
  );
}
