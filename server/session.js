const crypto = require("crypto");

/**
 * Signed, in-memory session store. Tokens are HMAC-signed so the server can
 * verify them statelessly, while the store tracks active sessions for logout.
 */
class SessionStore {
  constructor(secret = process.env.SESSION_SECRET || "dev-secret") {
    this.secret = secret;
    this.sessions = new Map();
  }

  sign(playerId) {
    return crypto.createHmac("sha256", this.secret).update(playerId).digest("hex");
  }

  create(playerId) {
    const token = this.sign(playerId) + "." + crypto.randomBytes(8).toString("hex");
    this.sessions.set(token, { playerId, created: Date.now() });
    return token;
  }

  verify(token) {
    const session = this.sessions.get(token);
    if (!session) return null;
    return session.playerId;
  }

  destroy(token) {
    this.sessions.delete(token);
  }
}

module.exports = { SessionStore };
