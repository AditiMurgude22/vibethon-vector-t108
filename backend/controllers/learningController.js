const {
  users,
  learningModules,
  quizzes,
  buildBadges,
  calculateProgress,
  toSafeUser
} = require("../models/store");

function listModules(req, res) {
  return res.json({ success: true, modules: learningModules });
}

function getModule(req, res) {
  const moduleId = Number(req.params.id);
  const moduleData = learningModules.find((moduleItem) => moduleItem.id === moduleId);
  if (!moduleData) {
    return res.status(404).json({ success: false, message: "Module not found" });
  }
  return res.json({ success: true, module: moduleData });
}

function getQuiz(req, res) {
  const quizId = Number(req.params.id);
  const quiz = quizzes.find((quizItem) => quizItem.id === quizId);
  if (!quiz) {
    return res.status(404).json({ success: false, message: "Quiz not found" });
  }
  return res.json({ success: true, quiz });
}

function submitQuiz(req, res) {
  const quizId = Number(req.params.id);
  const { answers } = req.body;

  if (!Array.isArray(answers)) {
    return res.status(400).json({ success: false, message: "answers must be an array" });
  }

  const quiz = quizzes.find((quizItem) => quizItem.id === quizId);
  if (!quiz) {
    return res.status(404).json({ success: false, message: "Quiz not found" });
  }

  const feedback = quiz.questions.map((question, index) => {
    const selected = Number(answers[index]);
    const isCorrect = selected === question.correctIndex;
    return {
      question: question.question,
      selectedIndex: Number.isNaN(selected) ? null : selected,
      correctIndex: question.correctIndex,
      isCorrect
    };
  });

  const correctCount = feedback.filter((item) => item.isCorrect).length;
  const score = correctCount * 20;

  const user = req.user;
  user.quizScores[String(quizId)] = score;
  user.score += score;
  user.streak += 1;
  if (!user.completedModules.includes(quiz.moduleId)) {
    user.completedModules.push(quiz.moduleId);
  }
  user.progress = calculateProgress(user);
  user.badges = buildBadges(user);

  return res.json({
    success: true,
    score,
    totalQuestions: quiz.questions.length,
    correctCount,
    feedback,
    user: toSafeUser(user)
  });
}

function getLeaderboard(req, res) {
  const ranked = [...users]
    .sort((a, b) => b.score - a.score)
    .map((user, index) => ({
      rank: index + 1,
      id: user.id,
      name: user.name,
      email: user.email,
      score: user.score,
      streak: user.streak,
      progress: user.progress
    }));

  return res.json({ success: true, leaderboard: ranked });
}

function getProfile(req, res) {
  return res.json({ success: true, profile: toSafeUser(req.user) });
}

module.exports = {
  listModules,
  getModule,
  getQuiz,
  submitQuiz,
  getLeaderboard,
  getProfile
};
