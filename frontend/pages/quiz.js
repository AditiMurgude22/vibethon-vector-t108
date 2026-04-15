import { api } from "../services/api.js";
import { clearSession, requireAuth, updateSessionUser } from "../services/auth.js";
import { renderQuizFeedback } from "../components/ui.js";

if (!requireAuth()) {
  throw new Error("Unauthenticated");
}

document.getElementById("logout-btn").addEventListener("click", () => {
  clearSession();
  window.location.href = "./login.html";
});

const state = {
  quiz: null,
  currentQuestion: 0,
  answers: []
};

const progressText = document.getElementById("quiz-progress");
const prompt = document.getElementById("quiz-prompt");
const options = document.getElementById("quiz-options");
const feedbackBox = document.getElementById("quiz-feedback");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");

nextBtn.addEventListener("click", () => {
  const selectedOption = document.querySelector("input[name='quiz-option']:checked");
  if (!selectedOption) return;
  state.answers[state.currentQuestion] = Number(selectedOption.value);
  state.currentQuestion += 1;
  renderQuestion();
});

submitBtn.addEventListener("click", async () => {
  const selectedOption = document.querySelector("input[name='quiz-option']:checked");
  if (!selectedOption) return;
  state.answers[state.currentQuestion] = Number(selectedOption.value);

  try {
    const response = await api.submitQuiz(1, state.answers);
    updateSessionUser(response.user);

    feedbackBox.style.display = "block";
    feedbackBox.innerHTML = `
      <h3>Final Score: ${response.score}/100</h3>
      <p>Correct: ${response.correctCount}/${response.totalQuestions}</p>
      <ul class="feedback-list">${renderQuizFeedback(response.feedback)}</ul>
      <a class="primary-btn" href="./dashboard.html">Back to Dashboard</a>
    `;
    nextBtn.style.display = "none";
    submitBtn.style.display = "none";
    options.innerHTML = "";
    prompt.textContent = "Quiz Completed";
    progressText.textContent = "Done";
  } catch (error) {
    feedbackBox.style.display = "block";
    feedbackBox.textContent = error.message;
  }
});

function renderQuestion() {
  const question = state.quiz.questions[state.currentQuestion];
  progressText.textContent = `Q${state.currentQuestion + 1}/${state.quiz.questions.length}`;
  prompt.textContent = question.question;
  options.innerHTML = question.options
    .map(
      (option, index) => `
      <label class="quiz-option">
        <input type="radio" name="quiz-option" value="${index}" />
        <span>${option}</span>
      </label>
    `
    )
    .join("");

  const lastQuestion = state.currentQuestion === state.quiz.questions.length - 1;
  submitBtn.style.display = lastQuestion ? "inline-block" : "none";
  nextBtn.style.display = lastQuestion ? "none" : "inline-block";
}

async function bootstrapQuiz() {
  try {
    const response = await api.getQuiz(1);
    state.quiz = response.quiz;
    document.getElementById("quiz-title").textContent = response.quiz.title;
    renderQuestion();
  } catch (error) {
    feedbackBox.style.display = "block";
    feedbackBox.textContent = error.message;
  }
}

bootstrapQuiz();
