const express = require("express");
const { Player } = require("../models/player");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const profile = await Player.get(req.query.playerId || "guest");
    res.json(profile || { x: 480, y: 270, level: 1, gold: 0, class: "knight" });
  } catch (err) {
    res.status(500).json({ error: "Failed to load progress" });
  }
});

router.post("/", async (req, res) => {
  try {
    await Player.upsert(req.body.playerId || "guest", req.body);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save progress" });
  }
});

module.exports = router;
