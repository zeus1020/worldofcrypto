const express = require("express");
const crypto = require("crypto");

const router = express.Router();

/**
 * Minimal guest-token auth. A real deployment would verify credentials or an
 * OAuth provider here; for the demo we mint a signed guest session.
 */
router.post("/guest", (req, res) => {
  const id = "guest_" + crypto.randomBytes(6).toString("hex");
  const token = crypto
    .createHmac("sha256", process.env.SESSION_SECRET || "dev-secret")
    .update(id)
    .digest("hex");
  res.json({ playerId: id, token });
});

module.exports = router;
