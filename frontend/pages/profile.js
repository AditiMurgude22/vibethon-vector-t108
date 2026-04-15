import { api } from "../services/api.js";
import { clearSession, requireAuth } from "../services/auth.js";
import { renderBadges } from "../components/ui.js";

if (!requireAuth()) {
  throw new Error("Unauthenticated");
}

document.getElementById("logout-btn").addEventListener("click", () => {
  clearSession();
  window.location.href = "./login.html";
});

async function bootstrapProfile() {
  try {
    const response = await api.getProfile();
    const user = response.profile;

    document.getElementById("profile-name").textContent = user.name;
    document.getElementById("profile-email").textContent = user.email;
    document.getElementById("profile-score").textContent = String(user.score);
    document.getElementById("profile-progress").textContent = `${user.progress}%`;
    document.getElementById("profile-streak").textContent = String(user.streak);
    document.getElementById("profile-badges").innerHTML = renderBadges(user.badges);

    const quizScoreList = document.getElementById("quiz-score-list");
    const entries = Object.entries(user.quizScores || {});
    quizScoreList.innerHTML =
      entries.length === 0
        ? "<li>No quizzes attempted yet.</li>"
        : entries.map(([quizId, score]) => `<li>Quiz ${quizId}: ${score}/100</li>`).join("");
  } catch (error) {
    document.getElementById("profile-error").textContent = error.message;
  }
}

bootstrapProfile();
