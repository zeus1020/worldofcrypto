const { RealmServer } = require("../realm");

/**
 * Americas realm (US-East). Hosts its own player population and world state,
 * sharing the same database cluster for cross-region account data.
 */
const usRealm = new RealmServer({
  id: "us",
  label: "Americas (US-East)",
  tickRate: 20,
  maxPlayers: 200,
});

module.exports = { usRealm };
