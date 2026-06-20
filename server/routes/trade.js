const express = require("express");

const router = express.Router();

/**
 * In-memory trade sessions. A trade is created between two players, each sets
 * an offer, then both lock and confirm.
 */
const trades = new Map();
let nextTradeId = 1;

router.post("/trades", (req, res) => {
  const { a, b } = req.body;
  if (!a || !b) return res.status(400).json({ error: "two players required" });
  const id = nextTradeId++;
  trades.set(id, {
    id,
    a: { player: a, items: [], gold: 0, locked: false, confirmed: false },
    b: { player: b, items: [], gold: 0, locked: false, confirmed: false },
    status: "open",
  });
  res.status(201).json({ id });
});

router.post("/trades/:id/offer", (req, res) => {
  const trade = trades.get(Number(req.params.id));
  if (!trade) return res.status(404).json({ error: "not found" });
  const { player, items, gold } = req.body;
  const side = trade.a.player === player ? trade.a : trade.b;
  side.items = items ?? [];
  side.gold = gold ?? 0;
  trade.a.confirmed = trade.b.confirmed = false;
  res.json({ ok: true });
});

router.post("/trades/:id/confirm", (req, res) => {
  const trade = trades.get(Number(req.params.id));
  if (!trade) return res.status(404).json({ error: "not found" });
  const { player } = req.body;
  const side = trade.a.player === player ? trade.a : trade.b;
  side.confirmed = true;
  if (trade.a.confirmed && trade.b.confirmed) trade.status = "completed";
  res.json({ status: trade.status });
});

module.exports = router;
