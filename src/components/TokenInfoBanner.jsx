import React, { useState, useEffect } from "react";
import "./TokenInfoBanner.css";

const TokenInfoBanner = () => {
  const [tokenData, setTokenData] = useState({
    symbol: "MOONR",
    name: "MOONR Token",
    price: 0.00234,
    change24h: 12.5,
    change1h: 2.3,
    change5m: 0.8,
    marketCap: 2340000,
    volume24h: 450000,
    liquidity: 180000,
    holders: 1250,
    ath: 0.00456,
    atl: 0.00089,
    ca: "4jYfUZuoKDbBpZwRWDV6ZEnbZbECGmqKKru5E4QZpump",
    dex: "Raydium",
    lastUpdated: new Date(),
  });

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTokenData((prev) => ({
        ...prev,
        price: prev.price * (1 + (Math.random() - 0.5) * 0.02), // ±1% change
        change24h: prev.change24h + (Math.random() - 0.5) * 2, // ±1% change
        change1h: prev.change1h + (Math.random() - 0.5) * 1, // ±0.5% change
        change5m: (Math.random() - 0.5) * 2, // New 5m change
        volume24h: prev.volume24h * (1 + (Math.random() - 0.5) * 0.1), // ±5% change
        lastUpdated: new Date(),
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
    return num.toFixed(2);
  };

  const formatPrice = (price) => {
    if (price < 0.000001) return price.toExponential(3);
    if (price < 0.01) return price.toFixed(6);
    return price.toFixed(4);
  };

  const formatChange = (change) => {
    return Math.round(change);
  };

  const getChangeColor = (change) => {
    if (change > 0) return "positive";
    if (change < 0) return "negative";
    return "neutral";
  };

  const copyCA = () => {
    navigator.clipboard.writeText(tokenData.ca);
  };

  return (
    <div className="token-info-banner">
      <div className="token-banner-content">
        {/* Main Token Info */}
        <div className="token-main-info">
          <div className="token-identity">
            <div className="token-logo">
              <span className="token-emoji">🌙</span>
            </div>
            <div className="token-names">
              <h2 className="token-symbol">${tokenData.symbol}</h2>
              <div className="main-price">${formatPrice(tokenData.price)}</div>
            </div>
          </div>

          <div className="token-price-section">
            <div className="price-changes">
              <span className={`change ${getChangeColor(tokenData.change24h)}`}>
                24h: {tokenData.change24h >= 0 ? "+" : ""}
                {formatChange(tokenData.change24h)}%
              </span>
              <span className={`change ${getChangeColor(tokenData.change1h)}`}>
                1h: {tokenData.change1h >= 0 ? "+" : ""}
                {formatChange(tokenData.change1h)}%
              </span>
              <span className={`change ${getChangeColor(tokenData.change5m)}`}>
                5m: {tokenData.change5m >= 0 ? "+" : ""}
                {formatChange(tokenData.change5m)}%
              </span>
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div className="market-stats">
          <div className="stat-group">
            <div className="stat-item">
              <span className="stat-label">Market Cap</span>
              <span className="stat-value">
                ${formatNumber(tokenData.marketCap)}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">24h Volume</span>
              <span className="stat-value">
                ${formatNumber(tokenData.volume24h)}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Holders</span>
              <span className="stat-value">
                {formatNumber(tokenData.holders)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenInfoBanner;
