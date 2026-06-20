/**
 * Server-side $WOC marketplace.
 *
 * A player-driven order book settled in the $WOC SPL token on Solana. Listings
 * escrow the item until the on-chain transfer is confirmed; `buy()` returns a
 * settlement intent the client uses to build the Solana transaction.
 */
const WOC_TOKEN = {
  symbol: "WOC",
  name: "World of Crypto",
  network: "solana-mainnet-beta",
  standard: "SPL",
  decimals: 6,
  contractAddress: "7iuTToHkV5cdFMXYu4ftMT9obcMgbiRttxF5cXDypump",
};

class MarketBook {
  constructor() {
    this.listings = [];
    this.nextId = 1;
  }

  /** List an item for sale at a $WOC price. The item is held in escrow. */
  list(sellerId, item, price) {
    if (!sellerId || !item || !(price > 0)) {
      throw new Error("list requires sellerId, item and a positive price");
    }
    const listing = {
      id: this.nextId++,
      sellerId,
      item,
      price,
      currency: WOC_TOKEN.symbol,
      escrowed: true,
      createdAt: Date.now(),
    };
    this.listings.push(listing);
    return listing;
  }

  /** Open listings, optionally filtered by item id or seller. */
  open({ item, seller } = {}) {
    return this.listings.filter(
      (l) => (!item || l.item.id === item) && (!seller || l.sellerId === seller),
    );
  }

  /**
   * Buy a listing. Removes it from the book and returns a settlement intent the
   * buyer signs against the $WOC token program.
   */
  buy(listingId, buyerId) {
    const idx = this.listings.findIndex((l) => l.id === listingId);
    if (idx === -1) return null;
    const [sold] = this.listings.splice(idx, 1);
    return {
      listing: sold,
      buyerId,
      settlement: {
        token: WOC_TOKEN.contractAddress,
        network: WOC_TOKEN.network,
        from: buyerId,
        to: sold.sellerId,
        amount: sold.price,
        decimals: WOC_TOKEN.decimals,
        memo: `woc:trade:${sold.id}`,
      },
    };
  }

  /** Floor and average $WOC price for an item across the open book. */
  priceStats(itemId) {
    const prices = this.open({ item: itemId }).map((l) => l.price);
    if (!prices.length) return { itemId, floor: null, average: null, listings: 0 };
    const sum = prices.reduce((a, b) => a + b, 0);
    return {
      itemId,
      floor: Math.min(...prices),
      average: Math.round((sum / prices.length) * 100) / 100,
      listings: prices.length,
    };
  }
}

module.exports = { WOC_TOKEN, MarketBook };
