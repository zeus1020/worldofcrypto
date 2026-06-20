const { pool } = require("../db");

/**
 * Global leaderboard aggregated across all regional realms.
 */
const Leaderboard = {
  async top(limit = 10) {
    const { rows } = await pool.query(
      `SELECT name, class, level, gold
         FROM player_profiles
        ORDER BY level DESC, gold DESC
        LIMIT $1`,
      [limit]
    );
    return rows;
  },

  async rankOf(playerId) {
    const { rows } = await pool.query(
      `SELECT count(*) + 1 AS rank
         FROM player_profiles
        WHERE level > (SELECT level FROM player_profiles WHERE player_id = $1)`,
      [playerId]
    );
    return Number(rows[0]?.rank ?? 0);
  },
};

module.exports = { Leaderboard };
