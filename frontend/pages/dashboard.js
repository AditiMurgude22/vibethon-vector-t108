import { api } from "../services/api.js";
import { clearSession, requireAuth, updateSessionUser, getUser } from "../services/auth.js";
import { renderBadges } from "../components/ui.js";

if (!requireAuth()) {
  throw new Error("Unauthenticated");
}

document.getElementById("logout-btn").addEventListener("click", () => {
  clearSession();
  window.location.href = "./login.html";
});

document.getElementById("start-learning-btn").addEventListener("click", () => {
  window.location.href = "./learn.html";
});

async function bootstrapDashboard() {
  try {
    const localUser = getUser();
    let user = localUser;

    try {
      const me = await api.getMe();
      user = localUser
        ? {
            ...me.user,
            score: Math.max(me.user.score || 0, localUser.score || 0),
            streak: Math.max(me.user.streak || 0, localUser.streak || 0),
            progress: Math.max(me.user.progress || 0, localUser.progress || 0),
            badges: localUser.badges?.length ? localUser.badges : me.user.badges,
            completedModules: localUser.completedModules?.length ? localUser.completedModules : me.user.completedModules,
            quizScores: { ...(me.user.quizScores || {}), ...(localUser.quizScores || {}) }
          }
        : me.user;
      updateSessionUser(user);
    } catch (error) {
      if (!localUser) throw error;
    }

    renderStats(user);
  } catch (error) {
    if (error.message.includes("token")) {
      clearSession();
      window.location.href = "./login.html";
      return;
    }
    document.getElementById("dashboard-error").textContent = error.message;
  }
}

function renderStats(user) {
  const streakDays = Number(user.streak || 0);
  const progressValue = Number(user.progress || 0);
  const scoreValue = Number(user.score || 0);

  document.getElementById("welcome").textContent = `👋 Welcome, ${user.name}`;
  document.getElementById("summary-streak").textContent = `🔥 Streak: ${streakDays} days`;
  document.getElementById("summary-progress").textContent = `📊 Progress: ${progressValue}%`;
  document.getElementById("summary-score").textContent = `🏆 Score: ${scoreValue} pts`;

  document.getElementById("score").textContent = String(user.score);
  document.getElementById("streak").textContent = String(user.streak);
  document.getElementById("progress").textContent = `${user.progress}%`;
  document.getElementById("progress-fill").style.width = `${user.progress}%`;
  document.getElementById("badges").innerHTML = renderBadges(user.badges);
}

bootstrapDashboard();
