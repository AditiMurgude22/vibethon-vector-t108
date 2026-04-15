const STORAGE_KEY = "aimlMissionLabSession";

export function saveSession(token, user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }));
}

export function getSession() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function getToken() {
  return getSession()?.token || null;
}

export function getUser() {
  return getSession()?.user || null;
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

export function updateSessionUser(user) {
  const session = getSession();
  if (!session?.token) return;
  saveSession(session.token, user);
}

export function requireAuth() {
  const session = getSession();
  if (!session?.token) {
    window.location.href = "./login.html";
    return false;
  }
  return true;
}
