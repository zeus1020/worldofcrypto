const { RealmServer } = require("../realm");

/**
 * Europe realm (EU-Central). Separate live population from the US realm;
 * guild and account data are shared across regions via the database.
 */
const euRealm = new RealmServer({
  id: "eu",
  label: "Europe (EU-Central)",
  tickRate: 20,
  maxPlayers: 200,
});

module.exports = { euRealm };
