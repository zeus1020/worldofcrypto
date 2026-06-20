const API_BASE = "/api";

export async function loadProgress() {
  try {
    const res = await fetch(`${API_BASE}/progress`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn("Could not load progress:", err);
    return null;
  }
}

export async function saveProgress(data) {
  try {
    const res = await fetch(`${API_BASE}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (err) {
    console.warn("Could not save progress:", err);
    return false;
  }
}

export async function fetchLeaderboard() {
  try {
    const res = await fetch(`${API_BASE}/leaderboard`);
    return await res.json();
  } catch (err) {
    return [];
  }
}
