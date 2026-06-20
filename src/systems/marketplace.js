/**
 * Client-side marketplace model.
 *
 * Mirrors the server order book so the launcher UI can render listings and
 * compute totals without a round-trip. All prices are denominated in $WOC; the
 * contract address comes from the shared token config.
 */
import { WOC_TOKEN, shortAddress } from "../../config/token.config.js";

export class Marketplace {
  constructor() {
    this.listings = [];
    this.token = WOC_TOKEN;
  }

  /** Replace the local cache with listings fetched from the server. */
  sync(listings) {
    this.listings = Array.isArray(listings) ? listings : [];
    return this.listings;
  }

  /** Open listings for a single item id. */
  forItem(itemId) {
    return this.listings.filter((l) => l.item.id === itemId);
  }

  /** The lowest $WOC asking price for an item, or null when none are listed. */
  floorPrice(itemId) {
    const prices = this.forItem(itemId).map((l) => l.price);
    return prices.length ? Math.min(...prices) : null;
  }

  /** Total $WOC value of every open listing. */
  totalVolume() {
    return this.listings.reduce((sum, l) => sum + l.price, 0);
  }

  /** A label like "$WOC (7iuT…pump)" for the marketplace header. */
  tokenLabel() {
    return `$${this.token.symbol} (${shortAddress()})`;
  }
}
