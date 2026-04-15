const users = [];

const learningModules = [
  {
    id: 1,
    slug: "spam-detection",
    title: "Spam Detection (Classification)",
    description: "Learn how classification models identify spam messages.",
    sections: [
      {
        key: "concept",
        title: "Concept",
        content:
          "Spam detection is a classification task. The model learns patterns from labeled examples and predicts if a new message is Spam or Not Spam."
      },
      {
        key: "example",
        title: "Example",
        content:
          "Message: 'Congratulations! You won a free prize. Click now.' -> Spam. Message: 'Team meeting moved to 3 PM.' -> Not Spam."
      },
      {
        key: "practice",
        title: "Practice",
        content:
          "Try short messages in the spam simulator and check how keyword-based logic classifies them in real time."
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
    title: "Spam Detection Quiz",
    questions: [
      {
        question: "What type of ML task is spam detection?",
        options: ["Classification", "Regression", "Clustering", "Reinforcement Learning"],
        correctIndex: 0
      },
      {
        question: "Which message is most likely spam?",
        options: [
          "Please review today's class notes",
          "You won a FREE gift card, click now!",
          "Can we meet at 5 PM?",
          "Homework deadline is tomorrow"
        ],
        correctIndex: 1
      },
      {
        question: "Why are labels important in spam detection training?",
        options: [
          "To speed up internet connection",
          "To identify message language",
          "To teach the model what is spam vs not spam",
          "To encrypt messages"
        ],
        correctIndex: 2
      },
      {
        question: "A high spam false-positive rate means:",
        options: [
          "Too many spam messages are missed",
          "Too many genuine messages are marked as spam",
          "The model has no training data",
          "The model only uses numbers"
        ],
        correctIndex: 1
      },
      {
        question: "Which keyword often appears in spam?",
        options: ["meeting agenda", "free", "assignment", "schedule"],
        correctIndex: 1
      }
    ]
  }
];

function buildBadges(user) {
  const badges = [];
  if (user.score >= 100) badges.push("Century Scorer");
  if (user.streak >= 2) badges.push("Consistency Star");
  if ((user.completedModules || []).length >= 1) badges.push("Spam Buster");
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
