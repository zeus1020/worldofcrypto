/**
 * In-game economy: vendor pricing, an auction house and gold sinks.
 *
 * Vendor and auction prices are quoted in gold; the player-driven marketplace
 * (see `marketplace.js`) settles in the $WOC SPL token on Solana.
 */
import { WOC_TOKEN } from "../../config/token.config.js";

export const CURRENCY = {
  gold: { symbol: "g", name: "Gold", onChain: false },
  woc: { symbol: WOC_TOKEN.symbol, name: WOC_TOKEN.name, onChain: true, contract: WOC_TOKEN.contractAddress },
};

export const BASE_PRICES = {
  health_potion: 25,
  mana_potion: 30,
  iron_sword: 120,
  steel_armor: 400,
};

export function sellPrice(itemId, rarity = "common") {
  const base = BASE_PRICES[itemId] ?? 10;
  const mult = { common: 1, uncommon: 1.5, rare: 2.5, epic: 4, legendary: 8 }[rarity] ?? 1;
  return Math.floor(base * mult * 0.4);
}

export function buyPrice(itemId, rarity = "common") {
  const base = BASE_PRICES[itemId] ?? 10;
  const mult = { common: 1, uncommon: 1.5, rare: 2.5, epic: 4, legendary: 8 }[rarity] ?? 1;
  return Math.ceil(base * mult);
}

export class AuctionHouse {
  constructor() {
    this.listings = [];
    this.nextId = 1;
  }

  list(sellerId, item, price) {
    const id = this.nextId++;
    this.listings.push({ id, sellerId, item, price, ts: Date.now() });
    return id;
  }

  buy(listingId, buyerId) {
    const idx = this.listings.findIndex((l) => l.id === listingId);
    if (idx === -1) return null;
    const [sold] = this.listings.splice(idx, 1);
    return { ...sold, buyerId };
  }

  search(query) {
    return this.listings.filter((l) => l.item.id.includes(query));
  }
}
