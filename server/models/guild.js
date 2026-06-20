const { pool } = require("../db");

/**
 * Guilds group players together across both regional realms.
 */
const Guild = {
  async create(name, leaderId) {
    const { rows } = await pool.query(
      `INSERT INTO guilds (name, leader_id, created_at)
       VALUES ($1, $2, now()) RETURNING id`,
      [name, leaderId]
    );
    return rows[0].id;
  },

  async addMember(guildId, playerId) {
    await pool.query(
      `INSERT INTO guild_members (guild_id, player_id) VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [guildId, playerId]
    );
  },

  async members(guildId) {
    const { rows } = await pool.query(
      `SELECT player_id FROM guild_members WHERE guild_id = $1`,
      [guildId]
    );
    return rows.map((r) => r.player_id);
  },
};

module.exports = { Guild };
