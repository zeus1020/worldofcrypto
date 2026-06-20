-- Guilds and membership
CREATE TABLE IF NOT EXISTS guilds (
  id          SERIAL PRIMARY KEY,
  name        TEXT UNIQUE NOT NULL,
  leader_id   TEXT NOT NULL REFERENCES player_profiles (player_id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS guild_members (
  guild_id    INTEGER NOT NULL REFERENCES guilds (id) ON DELETE CASCADE,
  player_id   TEXT NOT NULL REFERENCES player_profiles (player_id),
  rank        TEXT NOT NULL DEFAULT 'member',
  joined_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (guild_id, player_id)
);
