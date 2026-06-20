const { pool } = require("../db");

/**
 * Optional DB-backed session persistence (mirrors the in-memory SessionStore).
 */
const Session = {
  async save(token, playerId) {
    await pool.query(
      `INSERT INTO sessions (token, player_id, created_at)
       VALUES ($1, $2, now()) ON CONFLICT (token) DO NOTHING`,
      [token, playerId]
    );
  },

  async lookup(token) {
    const { rows } = await pool.query(
      `SELECT player_id FROM sessions WHERE token = $1`,
      [token]
    );
    return rows[0]?.player_id ?? null;
  },

  async destroy(token) {
    await pool.query(`DELETE FROM sessions WHERE token = $1`, [token]);
  },
};

module.exports = { Session };
