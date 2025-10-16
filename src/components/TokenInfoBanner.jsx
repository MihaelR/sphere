import React from "react";
import { useFetchTokenDataDex } from "../services/FetchTokenData";

export default function TokenInfoBanner() {
  const { data } = useFetchTokenDataDex();
  const tokenAddress = import.meta.env.VITE_TOKEN_ADDRESS;

  const copyCA = () => {
    navigator.clipboard.writeText(tokenAddress);
  };

  return (
    <div className="rounded-xl border border-purple-500/30 p-3 min-w-60 bg-[#181825]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
            <span className="text-white font-bold text-xs">M</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white">MOONR</span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-500/30 text-purple-200 rounded-full">
                Solana
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-gray-300">Live</span>
        </div>
      </div>

      {/* Price & Change */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">
            {data?.priceUsd || "$0"}
          </span>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-400">Volume</div>
          <div className="text-sm font-bold text-white">
            {data?.volume?.h24 || "$0"}
          </div>
        </div>
      </div>

      {/* Market Cap & Holders */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="rounded p-2 border border-purple-500/20 bg-[#23284a]">
          <div className="text-[10px] text-gray-400">Market Cap</div>
          <div className="text-sm font-bold text-white">
            {data?.marketCap || "$0"}
          </div>
        </div>
        <div className="rounded p-2 border border-purple-500/20 bg-[#23284a]">
          <div className="text-[10px] text-gray-400">Holders</div>
          <div className="text-sm font-bold text-white">
            {data?.holders || "1000"}
          </div>
        </div>
      </div>

      {/* Contract Address */}
      <div className="rounded p-2 border border-purple-500/20 mb-3 bg-[#23284a]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] text-gray-400">Contract</div>
            <div className="text-[11px] font-mono text-white">
              {tokenAddress}
            </div>
          </div>
          <button
            onClick={copyCA}
            className="p-1 rounded bg-purple-500/30 hover:bg-purple-500/50 transition-colors"
            title="Copy CA"
          >
            <svg
              className="w-3 h-3 text-purple-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 py-2 px-3 bg-purple-500 text-white font-bold text-[11px] rounded-lg hover:bg-purple-600 transition-all duration-200">
          Buy MOONR
        </button>
        <button className="flex-1 py-2 px-3 bg-purple-500/20 border border-purple-500/50 text-purple-200 font-bold text-[11px] rounded-lg hover:bg-purple-500/30 transition-all duration-200">
          Chart
        </button>
      </div>
    </div>
  );
}
