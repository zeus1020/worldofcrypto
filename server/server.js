const express = require("express");
const path = require("path");
const { usRealm } = require("./regions/us");
const { euRealm } = require("./regions/europe");

const progressRoutes = require("./routes/progress");
const leaderboardRoutes = require("./routes/leaderboard");
const authRoutes = require("./routes/auth");
const realmRoutes = require("./routes/realms");
const marketRoutes = require("./routes/market");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

app.use("/api/progress", progressRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/realms", realmRoutes);
app.use("/api/market", marketRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`World of Crypto server running on port ${PORT}`);
  console.log(`Realms online: ${usRealm.label}, ${euRealm.label}`);
});
