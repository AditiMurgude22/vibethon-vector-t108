import { requireAuth, getUser, updateSessionUser } from "../services/auth.js";
import { upsertLeaderboardUser } from "../services/leaderboard.js";

if (!requireAuth()) {
  throw new Error("Unauthenticated");
}

const scoreTitle = document.getElementById("score-title");
const scoreValue = document.getElementById("score-value");
const scoreMessage = document.getElementById("score-message");
const goLeaderboardBtn = document.getElementById("go-leaderboard-btn");

const resultRaw = sessionStorage.getItem("quizResult");
if (!resultRaw) {
  window.location.href = "./dashboard.html";
}

const result = JSON.parse(resultRaw);
scoreTitle.textContent = `${result.topicTitle} Score`;
scoreValue.textContent = `${result.score}/${result.total}`;

if (result.score >= 8) {
  scoreMessage.textContent = "Excellent!";
} else if (result.score >= 5) {
  scoreMessage.textContent = "Good job!";
} else {
  scoreMessage.textContent = "Keep practicing!";
}

const user = getUser();
if (user) {
  const pointsEarned = result.score * 10;
  const updatedUser = {
    ...user,
    score: (user.score || 0) + pointsEarned,
    streak: (user.streak || 0) + 1,
    progress: Math.min(100, Math.max(user.progress || 0, 75)),
    completedModules: Array.from(new Set([...(user.completedModules || []), 1])),
    quizScores: {
      ...(user.quizScores || {}),
      [result.topicTitle]: `${result.score}/${result.total}`
    }
  };
  updateSessionUser(updatedUser);
  upsertLeaderboardUser(updatedUser);
}

goLeaderboardBtn.addEventListener("click", () => {
  window.location.href = "./leaderboard.html";
});
