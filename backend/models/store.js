const users = [];

const learningModules = [
  {
    id: 1,
    slug: "smart-learning-module",
    title: "Smart Learning Module",
    description: "Enter any supported topic and get an instant explanation + quiz.",
    sections: [
      {
        key: "concept",
        title: "Concept",
        content:
          "Choose a topic and the module explains core ideas in clear and simple language."
      },
      {
        key: "example",
        title: "Example",
        content:
          "Topic: Photosynthesis -> Definition, key points, and a practical example are shown."
      },
      {
        key: "practice",
        title: "Practice",
        content:
          "Try different topics like AI, Machine Learning, Newton Laws, and Photosynthesis."
      },
      {
        key: "quiz",
        title: "Quiz",
        content:
          "Complete the module quiz to earn points, update streak, and unlock badges."
      }
    ],
    quizId: 1
  }
];

const quizzes = [
  {
    id: 1,
    moduleId: 1,
    title: "Smart Learning Quiz",
    questions: [
      {
        question: "Machine Learning belongs to which field?",
        options: ["Artificial Intelligence", "Civil Engineering", "Biochemistry", "Astronomy"],
        correctIndex: 0
      },
      {
        question: "Which process uses sunlight to make food in plants?",
        options: ["Respiration", "Fermentation", "Photosynthesis", "Evaporation"],
        correctIndex: 2
      },
      {
        question: "F = m*a is from which law?",
        options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Hooke's Law"],
        correctIndex: 1
      }
    ]
  }
];

function buildBadges(user) {
  const badges = [];
  if (user.score >= 100) badges.push("Century Scorer");
  if (user.streak >= 2) badges.push("Consistency Star");
  if ((user.completedModules || []).length >= 1) badges.push("Topic Explorer");
  return badges;
}

function calculateProgress(user) {
  const completedCount = (user.completedModules || []).length;
  const totalModules = learningModules.length || 1;
  const completionProgress = Math.round((completedCount / totalModules) * 100);
  return Math.min(100, Math.max(completionProgress, user.progress || 0));
}

function toSafeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    score: user.score,
    streak: user.streak,
    progress: user.progress,
    badges: user.badges,
    completedModules: user.completedModules,
    quizScores: user.quizScores
  };
}

module.exports = {
  users,
  learningModules,
  quizzes,
  buildBadges,
  calculateProgress,
  toSafeUser
};
