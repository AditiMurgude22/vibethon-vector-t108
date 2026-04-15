import { getToken, clearSession } from "./auth.js";

const API_BASE = "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await response.json();

  if (response.status === 401) {
    clearSession();
  }

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const api = {
  signup(payload) {
    return request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },
  login(payload) {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },
  getMe() {
    return request("/auth/me");
  },
  getModules() {
    return request("/modules");
  },
  getModule(id) {
    return request(`/modules/${id}`);
  },
  getQuiz(id) {
    return request(`/quiz/${id}`);
  },
  submitQuiz(id, answers) {
    return request(`/quiz/${id}/submit`, {
      method: "POST",
      body: JSON.stringify({ answers })
    });
  },
  getLeaderboard() {
    return request("/leaderboard");
  },
  getProfile() {
    return request("/profile");
  }
};
