const express = require("express");

const router = express.Router();

/** In-memory party registry. */
const parties = new Map();
let nextPartyId = 1;

router.post("/parties", (req, res) => {
  const { leader } = req.body;
  if (!leader) return res.status(400).json({ error: "leader required" });
  const id = nextPartyId++;
  parties.set(id, { id, leader, members: [leader], maxSize: 5 });
  res.status(201).json({ id });
});

router.post("/parties/:id/invite", (req, res) => {
  const party = parties.get(Number(req.params.id));
  if (!party) return res.status(404).json({ error: "not found" });
  if (party.members.length >= party.maxSize) {
    return res.status(409).json({ error: "party full" });
  }
  const { player } = req.body;
  if (!party.members.includes(player)) party.members.push(player);
  res.json({ members: party.members });
});

router.delete("/parties/:id/members/:player", (req, res) => {
  const party = parties.get(Number(req.params.id));
  if (!party) return res.status(404).json({ error: "not found" });
  party.members = party.members.filter((m) => m !== req.params.player);
  res.json({ members: party.members });
});

module.exports = router;
