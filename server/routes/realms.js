/**
 * Realm directory REST routes.
 *
 *   GET  /api/realms                 — full realm list with live status
 *   GET  /api/realms/summary         — aggregate directory summary
 *   GET  /api/realms/region/:code    — realms within one region
 *   GET  /api/realms/recommend       — recommended realm (?region=eu-west)
 *   POST /api/realms/:id/heartbeat   — internal shard heartbeat
 */
const express = require("express");
const {
  listRealms,
  listRegionRealms,
  directorySummary,
  recommendRealm,
  recordHeartbeat,
} = require("../realmDirectory");

const router = express.Router();

router.get("/", (_req, res) => {
  res.json({ realms: listRealms() });
});

router.get("/summary", (_req, res) => {
  res.json(directorySummary());
});

router.get("/region/:code", (req, res) => {
  res.json({ realms: listRegionRealms(req.params.code) });
});

router.get("/recommend", (req, res) => {
  res.json({ realm: recommendRealm(req.query.region) });
});

router.post("/:id/heartbeat", (req, res) => {
  const { population, status } = req.body ?? {};
  recordHeartbeat(Number(req.params.id), population, status);
  res.json({ ok: true });
});

module.exports = router;
