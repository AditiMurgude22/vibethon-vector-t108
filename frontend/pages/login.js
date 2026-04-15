import { api } from "../services/api.js";
import { saveSession, getSession } from "../services/auth.js";

const form = document.getElementById("auth-form");
const submitButton = document.getElementById("submit-auth");
const toggleLink = document.getElementById("toggle-auth");
const title = document.getElementById("auth-title");
const nameField = document.getElementById("name-field");
const errorBox = document.getElementById("auth-error");

let mode = "login";

if (getSession()?.token) {
  window.location.href = "./dashboard.html";
}

function setMode(nextMode) {
  mode = nextMode;
  const isLogin = mode === "login";
  const nameInput = document.getElementById("name");
  title.textContent = isLogin ? "Login" : "Sign Up";
  submitButton.textContent = isLogin ? "Login" : "Create Account";
  toggleLink.textContent = isLogin ? "Need an account? Sign up" : "Already have an account? Login";
  nameField.style.display = isLogin ? "none" : "block";
  nameInput.required = !isLogin;
}

toggleLink.addEventListener("click", () => {
  setMode(mode === "login" ? "signup" : "login");
  errorBox.textContent = "";
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorBox.textContent = "";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const response =
      mode === "login"
        ? await api.login({ email, password })
        : await api.signup({ name, email, password });
    saveSession(response.token, response.user);
    window.location.href = "./dashboard.html";
  } catch (error) {
    errorBox.textContent = error.message;
  }
});

setMode("login");
