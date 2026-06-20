/**
 * $WOC marketplace REST routes.
 *
 *   GET  /api/market/token          — $WOC token metadata
 *   GET  /api/market/listings       — open listings (?item= / ?seller=)
 *   POST /api/market/list           — list an item for sale (priced in $WOC)
 *   POST /api/market/buy            — buy a listing; returns settlement intent
 *   GET  /api/market/price/:itemId  — floor / average $WOC price for an item
 */
const express = require("express");
const { WOC_TOKEN, MarketBook } = require("../market");

const router = express.Router();
const book = new MarketBook();

router.get("/token", (_req, res) => {
  res.json(WOC_TOKEN);
});

router.get("/listings", (req, res) => {
  res.json({ listings: book.open({ item: req.query.item, seller: req.query.seller }) });
});

router.post("/list", (req, res) => {
  const { sellerId, item, price } = req.body ?? {};
  try {
    res.json({ listing: book.list(sellerId, item, Number(price)) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/buy", (req, res) => {
  const { listingId, buyerId } = req.body ?? {};
  if (!buyerId) return res.status(400).json({ error: "buyerId is required" });
  const result = book.buy(Number(listingId), buyerId);
  if (!result) return res.status(404).json({ error: "listing not found" });
  res.json(result);
});

router.get("/price/:itemId", (req, res) => {
  res.json(book.priceStats(req.params.itemId));
});

module.exports = router;
