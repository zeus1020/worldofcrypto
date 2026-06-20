const express = require("express");
const { Guild } = require("../models/guild");

const router = express.Router();

/** Create a new guild. */
router.post("/guilds", async (req, res) => {
  const { name, leaderId } = req.body;
  if (!name || !leaderId) return res.status(400).json({ error: "name and leaderId required" });
  try {
    const id = await Guild.create(name, leaderId);
    await Guild.addMember(id, leaderId);
    res.status(201).json({ id, name });
  } catch (err) {
    res.status(409).json({ error: "guild name taken" });
  }
});

/** Join an existing guild. */
router.post("/guilds/:id/members", async (req, res) => {
  const { playerId } = req.body;
  await Guild.addMember(Number(req.params.id), playerId);
  res.json({ ok: true });
});

/** List members of a guild. */
router.get("/guilds/:id/members", async (req, res) => {
  const members = await Guild.members(Number(req.params.id));
  res.json({ members });
});

module.exports = router;
