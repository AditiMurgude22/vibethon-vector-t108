const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let leaderboard = [
  { name: "Alex Chen", points: 2540 },
  { name: "Sarah Kim", points: 2380 },
  { name: "Michael Johnson", points: 2215 }
];

let modules = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    description: "Learn the basics of ML, types of learning, and real-world applications.",
    content: [
      {
        section: "What is Machine Learning?",
        text: "Machine Learning is a subset of AI where computers learn patterns from data without being explicitly programmed. Instead of hard-coding rules, ML algorithms improve through experience."
      },
      {
        section: "Types of ML",
        text: "1. Supervised: Labeled data (e.g., spam/not spam)\\n2. Unsupervised: Find patterns (e.g., clustering)\\n3. Reinforcement: Learn by trial/error (e.g., games)"
      },
      {
        section: "Applications",
        text: "Recommendation systems (Netflix), Image recognition (face unlock), Predictive analytics (stock prices), Natural Language Processing (chatbots)"
      }
    ],
    quizId: 1
  }
];

let quizzes = [
  {
    id: 1,
    title: "Intro to ML Quiz",
    questions: [
      {
        q: "What is Machine Learning?",
        options: ["AI that learns from data", "Hard-coded rules", "Only image recognition", "Game AI"],
        correct: 0
      },
      {
        q: "Which uses labeled data?",
        options: ["Supervised", "Unsupervised", "Reinforcement", "All"],
        correct: 0
      },
      {
        q: "Netflix uses which ML?",
        options: ["Recommendations", "Clustering", "Reinforcement", "None"],
        correct: 0
      },
      {
        q: "Unsupervised ML finds?",
        options: ["Patterns without labels", "Labeled predictions", "Rewards", "Images"],
        correct: 0
      },
      {
        q: "ML improves through?",
        options: ["Experience/data", "Hard-coding", "Manual rules", "Randomness"],
        correct: 0
      }
    ]
  }
];

// Update user model (existing push will use points: 0, add completedModules: [], quizScores: {})
// Handled in signup/login

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Ensure user has required fields
    if (!user.completedModules) user.completedModules = [];
    if (!user.quizScores) user.quizScores = {};
    res.json({ success: true, user });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});


// SIGNUP
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  users.push({ email, password, points: 0, completedModules: [], quizScores: {} });
  res.json({ success: true });
});


// LEADERBOARD
app.get("/leaderboard", (req, res) => {
  res.json(leaderboard);
});

// SPAM DETECTION (basic logic)
app.post("/predict", (req, res) => {
  const { message } = req.body;

  const spamWords = ["win", "free", "urgent", "click", "prize"];

  const isSpam = spamWords.some(word =>
    message.toLowerCase().includes(word)
  );

  res.json({ result: isSpam ? "Spam" : "Not Spam" });
});

// MODULES - List all modules
app.get("/modules", (req, res) => {
  res.json(modules);
});

// MODULE DETAIL
app.get("/module/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const module = modules.find(m => m.id === id);
  if (module) {
    res.json(module);
  } else {
    res.status(404).json({ error: "Module not found" });
  }
});

// QUIZ DETAIL
app.get("/quiz/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const quiz = quizzes.find(q => q.id === id);
  if (quiz) {
    res.json(quiz);
  } else {
    res.status(404).json({ error: "Quiz not found" });
  }
});

// SUBMIT QUIZ
app.post("/submit-quiz/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { userEmail, answers } = req.body;
  
  const user = users.find(u => u.email === userEmail);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const quiz = quizzes.find(q => q.id === id);
  if (!quiz) {
    return res.status(404).json({ success: false, message: "Quiz not found" });
  }

  let score = 0;
  quiz.questions.forEach((q, i) => {
    if (answers[i] === q.correct) score += 20;
  });

  user.quizScores[id] = score;
  user.points += score;
  user.completedModules.push(quiz.moduleId || 1);

  // Update leaderboard (simple top 10)
  const userEntry = { name: user.email.split('@')[0], points: user.points };
  const userIndex = leaderboard.findIndex(l => l.name === userEntry.name);
  if (userIndex > -1) {
    leaderboard[userIndex] = userEntry;
  } else if (leaderboard.length < 10) {
    leaderboard.push(userEntry);
  }
  leaderboard.sort((a, b) => b.points - a.points);

  res.json({ success: true, score, totalPoints: user.points });
});

app.listen(5000, () => console.log("Server running on port 5000"));