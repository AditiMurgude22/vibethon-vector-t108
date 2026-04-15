import { api } from "../services/api.js";
import { clearSession, requireAuth, updateSessionUser } from "../services/auth.js";
import { renderBadges, renderLeaderboardRows } from "../components/ui.js";

if (!requireAuth()) {
  throw new Error("Unauthenticated");
}

document.getElementById("logout-btn").addEventListener("click", () => {
  clearSession();
  window.location.href = "./login.html";
});

async function bootstrapDashboard() {
  try {
    const me = await api.getMe();
    updateSessionUser(me.user);
    renderStats(me.user);

    const modulesResponse = await api.getModules();
    renderModules(modulesResponse.modules, me.user);

    const leaderboardResponse = await api.getLeaderboard();
    const leaderboardEl = document.getElementById("leaderboard-list");
    leaderboardEl.innerHTML = renderLeaderboardRows(leaderboardResponse.leaderboard, me.user.email);
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
  document.getElementById("welcome").textContent = `Welcome, ${user.name}!`;
  document.getElementById("score").textContent = String(user.score);
  document.getElementById("streak").textContent = String(user.streak);
  document.getElementById("progress").textContent = `${user.progress}%`;
  document.getElementById("progress-fill").style.width = `${user.progress}%`;
  document.getElementById("badges").innerHTML = renderBadges(user.badges);
}

function renderModules(modules, user) {
  const container = document.getElementById("modules-container");
  container.innerHTML = modules
    .map((moduleItem) => {
      const isDone = user.completedModules.includes(moduleItem.id);
      return `
        <article class="module-card">
          <h3>${moduleItem.title}</h3>
          <p>${moduleItem.description}</p>
          <p class="status ${isDone ? "done" : ""}">${isDone ? "Completed" : "In Progress"}</p>
          <a class="primary-btn" href="./module1.html">Open Module</a>
        </article>
      `;
    })
    .join("");
}

bootstrapDashboard();
