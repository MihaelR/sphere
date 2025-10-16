import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AppProvider, useAppContext } from "./context/AppContext";
import Header from "./components/Header";
import SphereStats from "./components/SphereStats";
import NewsUpdates from "./components/NewsUpdates";
import SpotifyPlayer from "./components/SpotifyPlayer";
import Buy from "./pages/Buy";
import About from "./pages/About";
import Governance from "./pages/Governance";
import Community from "./pages/Community";
import InfoTabs from "./components/InfoTabs";
import TokenInfoTabs from "./components/TokenInfoTabs";
import FirebaseChat from "./components/FirebaseChat";
import MoonInteractiveSVG from "./components/MoonInteractiveSVG";
import WalletConnectPanel from "./components/WalletConnectPanel";
import Marquee from "./components/Marquee";

function SphereMain() {
  const { spotData, handleMarqueeImageClick } = useAppContext();
  return (
    <div className="main-content">
      {/*       <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div> */}
      <div className="marquee-below-header">
        <Marquee spotData={spotData} onImageClick={handleMarqueeImageClick} />
      </div>
      {/* Main layout: Left (Token+Search) | Center sphere | Right (Combined Chat+Info) */}
      <div className="sphere-main-layout">
        {/* Left Sidebar: Token Info + Top Holders tabs, Search bottom */}
        <div className="left-sidebar">
          <div className="mb-4">
            {" "}
            <TokenInfoTabs />{" "}
          </div>
          <WalletConnectPanel />
          {/* Search */}
          <div>Airdrop info</div>
        </div>

        {/* Center: MoonInteractiveSVG */}
        <div
          className="center-sphere-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <MoonInteractiveSVG />
          <FirebaseChat />
        </div>

        {/* Right Sidebar: Combined Chat + Info Panel with Tabs */}
        <div className="right-sidebar">
          {" "}
          <InfoTabs />{" "}
        </div>
      </div>
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
          {/*  <SpotifyPlayer /> */}

          <main className="app-main">
            <Routes>
              <Route path="/" element={<SphereMain />} />
              <Route path="/about" element={<About />} />
              <Route path="/buy" element={<Buy />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/community" element={<Community />} />
              <Route path="/ads" element={<Community />} />
            </Routes>
          </main>
        </div>
      </AppProvider>
    </Router>
  );
}
