const { pool } = require("../db");

/**
 * Data-access layer for player profiles.
 */
const Player = {
  async get(playerId) {
    const { rows } = await pool.query(
      `SELECT player_id, name, class, x, y, level, gold
         FROM player_profiles WHERE player_id = $1`,
      [playerId]
    );
    return rows[0] || null;
  },

  async upsert(playerId, data) {
    await pool.query(
      `INSERT INTO player_profiles (player_id, name, class, x, y, level, gold, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, now())
       ON CONFLICT (player_id) DO UPDATE SET
         name = EXCLUDED.name, class = EXCLUDED.class,
         x = EXCLUDED.x, y = EXCLUDED.y,
         level = EXCLUDED.level, gold = EXCLUDED.gold,
         updated_at = now()`,
      [playerId, data.name, data.class, data.x, data.y, data.level, data.gold]
    );
  },
};

module.exports = { Player };
