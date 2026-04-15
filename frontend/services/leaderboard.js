const LEADERBOARD_KEY = "aimlMissionLabLeaderboard";

const seedUsers = [
  { name: "Aarav", email: "aarav@demo.com", score: 120 },
  { name: "Mira", email: "mira@demo.com", score: 90 },
  { name: "Kabir", email: "kabir@demo.com", score: 70 }
];

function readBoard() {
  const raw = localStorage.getItem(LEADERBOARD_KEY);
  if (!raw) return [...seedUsers];
  try {
    return JSON.parse(raw);
  } catch (error) {
    return [...seedUsers];
  }
}

function writeBoard(entries) {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
}

export function upsertLeaderboardUser(user) {
  const entries = readBoard();
  const index = entries.findIndex((entry) => entry.email === user.email);
  const payload = { name: user.name, email: user.email, score: user.score || 0 };
  if (index >= 0) {
    entries[index] = payload;
  } else {
    entries.push(payload);
  }
  writeBoard(entries);
}

export function getLeaderboard(currentUser) {
  const entries = readBoard();
  if (currentUser) {
    const hasCurrent = entries.some((entry) => entry.email === currentUser.email);
    if (!hasCurrent) {
      entries.push({ name: currentUser.name, email: currentUser.email, score: currentUser.score || 0 });
    }
  }
  return entries.sort((a, b) => b.score - a.score).map((entry, idx) => ({ ...entry, rank: idx + 1 }));
}
