import { getSession } from "../services/auth.js";

const actionBtn = document.getElementById("start-btn");

if (actionBtn) {
  actionBtn.addEventListener("click", () => {
    const hasSession = Boolean(getSession()?.token);
    window.location.href = hasSession ? "./pages/dashboard.html" : "./pages/login.html";
  });
}
