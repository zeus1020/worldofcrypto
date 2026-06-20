const { pool } = require("../db");

/**
 * Persisted achievement unlocks.
 */
const Achievement = {
  async unlock(playerId, achievement) {
    await pool.query(
      `INSERT INTO achievements (player_id, achievement)
       VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [playerId, achievement]
    );
  },

  async forPlayer(playerId) {
    const { rows } = await pool.query(
      `SELECT achievement, unlocked_at FROM achievements WHERE player_id = $1`,
      [playerId]
    );
    return rows;
  },
};

module.exports = { Achievement };
