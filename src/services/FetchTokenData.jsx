import { useEffect, useState } from "react";
console.log("FetchTokenda mount");

/* Helius - holders */
export function FetchTokenDataHelius() {
  const heliusApiKey = import.meta.env.VITE_HELIUS_API_KEY;
  const tokenAddress = import.meta.env.VITE_TOKEN_ADDRESS;
  const [dataHelius, setDataHelius] = useState(null);

  useEffect(() => {
    async function fetchAllTokenHolders(mintAddress) {
      const url = `https://mainnet.helius-rpc.com/?api-key=${heliusApiKey}`;
      const body = {
        jsonrpc: "2.0",
        id: "1",
        method: "getProgramAccounts",
        params: [
          "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          {
            encoding: "jsonParsed",
            filters: [
              { dataSize: 165 },
              {
                memcmp: {
                  offset: 0,
                  bytes: mintAddress,
                },
              },
            ],
          },
        ],
      };

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        setDataHelius(data);
        const accounts = Array.isArray(data.result) ? data.result : [];
        const holders = accounts
          .filter(
            (acc) => acc.account?.data?.parsed?.info?.tokenAmount?.uiAmount > 0
          )
          .map((acc) => ({
            address: acc.pubkey,
            amount: acc.account.data.parsed.info.tokenAmount.uiAmount,
          }));
        console.log("All holders (Helius):", holders);
        console.log("Total holders:", holders.length);
      } catch (error) {
        console.error("Error fetching all token holders:", error);
      }
    }

    if (tokenAddress) {
      fetchAllTokenHolders(tokenAddress);
    } else {
      console.warn("VITE_TOKEN_ADDRESS is not set in .env");
    }
  }, [heliusApiKey, tokenAddress]);

  return null;
}

/* Dexscreener - MC, num.holders, volume,.. */
/* Every 10sec */
export function useFetchTokenDataDex() {
  const tokenAddress = import.meta.env.VITE_TOKEN_ADDRESS;
  const [dataDex, setDataDex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;

    const fetchDexscreener = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`
        );
        const data = await res.json();
        setDataDex(data?.pairs[0]);
      } catch (err) {
        setError(err);
        setDataDex(null);
      } finally {
        setLoading(false);
      }
    };

    if (tokenAddress) {
      fetchDexscreener();
      intervalId = setInterval(fetchDexscreener, 10000);
    } else {
      setError("VITE_TOKEN_ADDRESS is not set in .env");
      setLoading(false);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [tokenAddress]);

  useEffect(() => {
    console.log("dataDex updated:", dataDex);
  }, [dataDex]);

  return { data: dataDex, loading, error };
}
