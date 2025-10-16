import React, { useEffect, useState, useCallback } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const HELIUS_API_KEY = import.meta.env.VITE_HELIUS_API_KEY;
const HELIUS_BALANCES_URL = (walletAddress) =>
  `https://api.helius.xyz/v0/addresses/${walletAddress}/balances?api-key=${HELIUS_API_KEY}`;

export default function PhantomHeliusTokensApp() {
  const [provider, setProvider] = useState(null);
  const [publicKey, setPublicKey] = useState(
    () => localStorage.getItem("phantomPublicKey") || null
  );
  const [balances, setBalances] = useState({ sol: null, tokens: [] });
  const [connected, setConnected] = useState(
    () => localStorage.getItem("phantomConnected") === "true"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const detect = () => {
      const ph = window?.phantom?.solana || window?.solana || null;
      if (ph && ph.isPhantom) {
        setProvider(ph);
      } else {
        setProvider(null);
      }
    };
    detect();
    window.addEventListener("load", detect);
    return () => window.removeEventListener("load", detect);
  }, []);

  useEffect(() => {
    if (provider && connected && publicKey) {
      fetchBalances(publicKey);
    }
    // eslint-disable-next-line
  }, [provider]);

  const fetchBalances = useCallback(async (walletAddress) => {
    setLoading(true);
    try {
      const res = await fetch(HELIUS_BALANCES_URL(walletAddress));
      const data = await res.json();
      const solLamports = data.nativeBalance;
      setBalances({
        sol: solLamports / LAMPORTS_PER_SOL,
        tokens: data.tokens || [],
      });
    } catch (err) {
      console.error("Failed to fetch token balances:", err);
      alert("Error fetching token balances.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleConnected = useCallback(
    async (pubKeyString) => {
      setConnected(true);
      setPublicKey(pubKeyString);
      localStorage.setItem("phantomConnected", "true");
      localStorage.setItem("phantomPublicKey", pubKeyString);
      await fetchBalances(pubKeyString);
    },
    [fetchBalances]
  );

  const connectWallet = async () => {
    if (!provider) {
      alert("No Phantom wallet detected. Install Phantom.");
      return;
    }
    try {
      const res = await provider.connect();
      if (res?.publicKey) {
        handleConnected(res.publicKey.toString());
      }
    } catch (err) {
      console.error("Wallet connection failed:", err);
      alert("Failed to connect Phantom wallet.");
    }
  };

  const disconnectWallet = async () => {
    if (!provider) return;
    try {
      await provider.disconnect();
    } catch (err) {}
    setConnected(false);
    setPublicKey(null);
    setBalances({ sol: null, tokens: [] });
    localStorage.removeItem("phantomConnected");
    localStorage.removeItem("phantomPublicKey");
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 rounded-2xl bg-[#23284a]/80 border border-purple-400 shadow-xl text-white font-inter backdrop-blur-lg">
      <h2 className="font-orbitron text-xl font-bold text-purple-400 mb-4 tracking-wide text-center">
        Phantom Wallet
      </h2>

      {!connected ? (
        <button
          onClick={connectWallet}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-400 to-blue-400 text-white font-bold text-lg shadow-lg hover:from-purple-500 hover:to-blue-500 transition mb-6"
        >
          Connect Phantom
        </button>
      ) : (
        <div className="mb-6">
          <div className="mb-2 font-orbitron text-purple-400 font-bold text-sm break-all">
            Wallet: {publicKey}
          </div>
          <div className="mb-4 text-blue-400 font-semibold">
            SOL balance:{" "}
            <span className="font-bold">
              {balances.sol ?? (loading ? "Loading..." : "0")}
            </span>
          </div>
          <div className="mb-2">
            <strong className="text-purple-400">SPL Tokens</strong>
            {loading ? (
              <p className="text-white/80">Loading tokens...</p>
            ) : balances.tokens.length === 0 ? (
              <p className="text-white/80">No tokens found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-xl overflow-hidden bg-[#23284a]/90 text-sm">
                  <thead>
                    <tr className="bg-[#181825]">
                      <th className="text-purple-400 px-3 py-2 font-bold">
                        Symbol
                      </th>
                      <th className="text-purple-400 px-3 py-2 font-bold">
                        Mint
                      </th>
                      <th className="text-purple-400 px-3 py-2 font-bold">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {balances.tokens.map((t) => (
                      <tr
                        key={t.mint}
                        className="border-b border-[#23284a] hover:bg-purple-900/10"
                      >
                        <td className="px-3 py-2 text-white">
                          {t.symbol || "-"}
                        </td>
                        <td className="px-3 py-2 max-w-xs truncate text-blue-400 relative group">
                          <span title={t.mint}>{t.mint}</span>
                        </td>
                        <td className="px-3 py-2 text-purple-400">
                          {t.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <button
            onClick={disconnectWallet}
            className="w-full py-3 mt-4 rounded-xl bg-[#181825] text-purple-400 font-bold border border-purple-400 shadow hover:bg-purple-900/30 transition"
          >
            Disconnect
          </button>
        </div>
      )}

      <div className="mt-4 text-xs text-purple-200/80">
        <strong>Notes:</strong>
        <ul className="list-disc ml-4">
          <li>
            Connect your Phantom wallet to fetch SOL and SPL token balances via
            Helius RPC.
          </li>
          <li>
            Your wallet address is never sent anywhere else; it is used locally
            to query the blockchain.
          </li>
        </ul>
      </div>
    </div>
  );
}
