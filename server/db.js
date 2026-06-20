const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS player_profiles (
      player_id TEXT PRIMARY KEY,
      x REAL DEFAULT 480,
      y REAL DEFAULT 270,
      level INTEGER DEFAULT 1,
      gold INTEGER DEFAULT 0,
      updated_at TIMESTAMPTZ DEFAULT now()
    );
  `);
}

const db = {
  async getProfile(playerId) {
    const { rows } = await pool.query(
      "SELECT x, y, level, gold FROM player_profiles WHERE player_id = $1",
      [playerId]
    );
    return rows[0] || { x: 480, y: 270, level: 1, gold: 0 };
  },

  async saveProfile(playerId, data) {
    await pool.query(
      `INSERT INTO player_profiles (player_id, x, y, level, gold, updated_at)
       VALUES ($1, $2, $3, $4, $5, now())
       ON CONFLICT (player_id) DO UPDATE SET
         x = EXCLUDED.x, y = EXCLUDED.y,
         level = EXCLUDED.level, gold = EXCLUDED.gold,
         updated_at = now()`,
      [playerId, data.x, data.y, data.level, data.gold]
    );
  },

  async getLeaderboard() {
    const { rows } = await pool.query(
      "SELECT player_id, level, gold FROM player_profiles ORDER BY level DESC, gold DESC LIMIT 10"
    );
    return rows;
  },
};

init().catch((err) => console.error("DB init failed:", err));

module.exports = { db, pool };
