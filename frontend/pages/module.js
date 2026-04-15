import { api } from "../services/api.js";
import { requireAuth, clearSession } from "../services/auth.js";

if (!requireAuth()) {
  throw new Error("Unauthenticated");
}

document.getElementById("logout-btn").addEventListener("click", () => {
  clearSession();
  window.location.href = "./login.html";
});

document.getElementById("run-predict").addEventListener("click", async () => {
  const message = document.getElementById("message-input").value.trim();
  const resultEl = document.getElementById("predict-result");

  if (!message) {
    resultEl.textContent = "Enter a message first.";
    return;
  }

  try {
    const response = await api.predict(message);
    resultEl.textContent = `${response.result} - ${response.reason}`;
  } catch (error) {
    resultEl.textContent = error.message;
  }
});

async function bootstrapModule() {
  try {
    const response = await api.getModule(1);
    const sectionContainer = document.getElementById("module-sections");
    sectionContainer.innerHTML = response.module.sections
      .map(
        (section) => `
        <section class="content-section">
          <h3>${section.title}</h3>
          <p>${section.content}</p>
        </section>
      `
      )
      .join("");
  } catch (error) {
    document.getElementById("module-error").textContent = error.message;
  }
}

bootstrapModule();
