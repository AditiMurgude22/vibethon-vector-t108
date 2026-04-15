const jwt = require("jsonwebtoken");
const { users, toSafeUser } = require("../models/store");

const JWT_SECRET = process.env.JWT_SECRET || "aiml-mission-lab-secret";

function createToken(user) {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "2h" });
}

function signup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "name, email, and password are required" });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = users.find((u) => u.email === normalizedEmail);
  if (existingUser) {
    return res.status(409).json({ success: false, message: "Email is already registered" });
  }

  const newUser = {
    id: users.length + 1,
    name: name.trim(),
    email: normalizedEmail,
    // Hackathon scope: plain password in-memory only.
    password,
    score: 0,
    streak: 0,
    progress: 0,
    badges: [],
    completedModules: [],
    quizScores: {}
  };

  users.push(newUser);
  const token = createToken(newUser);
  return res.status(201).json({ success: true, token, user: toSafeUser(newUser) });
}

function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "email and password are required" });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((u) => u.email === normalizedEmail && u.password === password);

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const token = createToken(user);
  return res.json({ success: true, token, user: toSafeUser(user) });
}

function getMe(req, res) {
  return res.json({ success: true, user: toSafeUser(req.user) });
}

module.exports = {
  signup,
  login,
  getMe,
  JWT_SECRET
};
