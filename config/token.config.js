/**
 * $WOC — the on-chain currency of World of Crypto.
 *
 * Every marketplace trade, premium cosmetic and treasury reward settles in the
 * $WOC SPL token on Solana. The contract address below is the single source of
 * truth for the client; the server keeps its own copy in `server/market.js`.
 */
export const WOC_TOKEN = {
  symbol: "WOC",
  name: "World of Crypto",
  network: "solana-mainnet-beta",
  standard: "SPL",
  decimals: 6,
  contractAddress: "7iuTToHkV5cdFMXYu4ftMT9obcMgbiRttxF5cXDypump",
  explorers: {
    solscan:
      "https://solscan.io/token/7iuTToHkV5cdFMXYu4ftMT9obcMgbiRttxF5cXDypump",
    pumpfun:
      "https://pump.fun/coin/7iuTToHkV5cdFMXYu4ftMT9obcMgbiRttxF5cXDypump",
  },
};

/** Convert a raw on-chain integer amount into a human $WOC value. */
export function fromLamports(raw) {
  return Number(raw) / 10 ** WOC_TOKEN.decimals;
}

/** Convert a human $WOC value into a raw on-chain integer amount. */
export function toLamports(amount) {
  return Math.round(amount * 10 ** WOC_TOKEN.decimals);
}

/** A short, display-friendly form of the contract address. */
export function shortAddress(addr = WOC_TOKEN.contractAddress) {
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`;
}
