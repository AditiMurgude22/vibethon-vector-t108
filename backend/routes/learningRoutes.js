const express = require("express");
const {
  listModules,
  getModule,
  getQuiz,
  submitQuiz,
  predictSpam,
  getLeaderboard,
  getProfile
} = require("../controllers/learningController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/modules", requireAuth, listModules);
router.get("/modules/:id", requireAuth, getModule);
router.get("/quiz/:id", requireAuth, getQuiz);
router.post("/quiz/:id/submit", requireAuth, submitQuiz);
router.post("/predict", requireAuth, predictSpam);
router.get("/leaderboard", requireAuth, getLeaderboard);
router.get("/profile", requireAuth, getProfile);

module.exports = router;
