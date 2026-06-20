const express = require("express");
const { Leaderboard } = require("../models/leaderboard");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const top = await Leaderboard.top(Number(req.query.limit) || 10);
    res.json(top);
  } catch (err) {
    res.status(500).json({ error: "Failed to load leaderboard" });
  }
});

router.get("/rank/:playerId", async (req, res) => {
  try {
    const rank = await Leaderboard.rankOf(req.params.playerId);
    res.json({ rank });
  } catch (err) {
    res.status(500).json({ error: "Failed to load rank" });
  }
});

module.exports = router;
