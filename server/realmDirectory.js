/**
 * Realm directory service.
 *
 * Exposes the global realm registry (124 sharded realms across 13 regions) to
 * the launcher and routes players to the lowest-latency realm. Live population
 * and status are refreshed periodically from each realm's heartbeat; when no
 * heartbeat has been seen the registry's declared status is used as a fallback.
 */
const {
  REALMS,
  REALM_REGIONS,
  realmsByRegion,
  totalCapacity,
} = require("../config/realms");

const heartbeats = new Map(); // realmId -> { population, status, ts }
const HEARTBEAT_TTL_MS = 30_000;

/** Record a heartbeat from a realm shard. */
function recordHeartbeat(realmId, population, status) {
  heartbeats.set(realmId, { population, status, ts: Date.now() });
}

/** Merge static registry data with live heartbeat data. */
function decorate(realm) {
  const hb = heartbeats.get(realm.id);
  const fresh = hb && Date.now() - hb.ts < HEARTBEAT_TTL_MS;
  return {
    ...realm,
    population: fresh ? hb.population : null,
    status: fresh ? hb.status : realm.status,
    live: Boolean(fresh),
  };
}

/** Full realm list, decorated with live status. */
function listRealms() {
  return REALMS.map(decorate);
}

/** Realms for a single region. */
function listRegionRealms(code) {
  return realmsByRegion(code).map(decorate);
}

/** A compact summary used by the launcher landing screen. */
function directorySummary() {
  const realms = listRealms();
  const online = realms.filter((r) => r.status !== "full").length;
  return {
    totalRealms: realms.length,
    regions: REALM_REGIONS.length,
    capacity: totalCapacity(),
    online,
  };
}

/**
 * Pick the recommended realm for a player given their approximate region code.
 * Falls back to the least-loaded realm anywhere if the region is unknown.
 */
function recommendRealm(regionCode) {
  const pool = regionCode ? listRegionRealms(regionCode) : listRealms();
  const candidates = (pool.length ? pool : listRealms()).filter(
    (r) => r.status !== "full",
  );
  candidates.sort((a, b) => (a.population ?? 0) - (b.population ?? 0));
  return candidates[0] ?? listRealms()[0];
}

module.exports = {
  recordHeartbeat,
  listRealms,
  listRegionRealms,
  directorySummary,
  recommendRealm,
};
