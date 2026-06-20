const { WebSocketServer } = require("ws");
const { usRealm } = require("./regions/us");
const { euRealm } = require("./regions/europe");
const { RateLimiter } = require("./rateLimiter");

const REALMS = { us: usRealm, eu: euRealm };

/**
 * WebSocket gateway. Routes each connection to its chosen regional realm and
 * relays state at a fixed broadcast tick. Per-client rate limiting protects
 * the realm from message floods.
 */
function attachGateway(httpServer) {
  const wss = new WebSocketServer({ server: httpServer, path: "/realm" });

  wss.on("connection", (ws, req) => {
    const url = new URL(req.url, "http://localhost");
    const regionId = url.searchParams.get("region") || "us";
    const realm = REALMS[regionId] || usRealm;
    const playerId = url.searchParams.get("playerId") || "guest";
    const limiter = new RateLimiter(30, 1000);

    const result = realm.join(playerId, { x: 480, y: 270 });
    if (!result.ok) {
      ws.send(JSON.stringify({ type: "error", reason: result.reason }));
      ws.close();
      return;
    }

    ws.on("message", (data) => {
      if (!limiter.allow()) return;
      try {
        const msg = JSON.parse(data);
        if (msg.type === "state") realm.setState(playerId, msg);
      } catch (_) {
        /* ignore malformed frames */
      }
    });

    ws.on("close", () => realm.leave(playerId));
  });

  const interval = setInterval(() => {
    for (const realm of Object.values(REALMS)) {
      const snapshot = JSON.stringify(realm.snapshot());
      wss.clients.forEach((c) => {
        if (c.readyState === 1) c.send(snapshot);
      });
    }
  }, 1000 / 18);

  wss.on("close", () => clearInterval(interval));
  return wss;
}

module.exports = { attachGateway };
