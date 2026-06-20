-- Initial schema: player profiles
CREATE TABLE IF NOT EXISTS player_profiles (
  player_id   TEXT PRIMARY KEY,
  name        TEXT,
  class       TEXT NOT NULL DEFAULT 'knight',
  x           REAL NOT NULL DEFAULT 480,
  y           REAL NOT NULL DEFAULT 270,
  level       INTEGER NOT NULL DEFAULT 1,
  xp          INTEGER NOT NULL DEFAULT 0,
  gold        INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_level ON player_profiles (level DESC, gold DESC);
