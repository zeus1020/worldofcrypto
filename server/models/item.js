const { pool } = require("../db");

/**
 * Inventory items persisted per player.
 */
const Item = {
  async add(playerId, itemId, rarity = "common", quantity = 1) {
    const { rows } = await pool.query(
      `INSERT INTO inventory_items (player_id, item_id, rarity, quantity)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [playerId, itemId, rarity, quantity]
    );
    return rows[0].id;
  },

  async forPlayer(playerId) {
    const { rows } = await pool.query(
      `SELECT id, item_id, rarity, quantity
         FROM inventory_items WHERE player_id = $1`,
      [playerId]
    );
    return rows;
  },

  async remove(id) {
    await pool.query(`DELETE FROM inventory_items WHERE id = $1`, [id]);
  },
};

module.exports = { Item };
