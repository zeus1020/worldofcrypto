-- Achievement unlocks and inventory items
CREATE TABLE IF NOT EXISTS achievements (
  player_id     TEXT NOT NULL REFERENCES player_profiles (player_id),
  achievement   TEXT NOT NULL,
  unlocked_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (player_id, achievement)
);

CREATE TABLE IF NOT EXISTS inventory_items (
  id          SERIAL PRIMARY KEY,
  player_id   TEXT NOT NULL REFERENCES player_profiles (player_id),
  item_id     TEXT NOT NULL,
  rarity      TEXT NOT NULL DEFAULT 'common',
  quantity    INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_inventory_player ON inventory_items (player_id);
