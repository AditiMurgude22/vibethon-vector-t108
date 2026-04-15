import { TOPIC_LIBRARY } from "../services/topics.js";
import { requireAuth } from "../services/auth.js";

if (!requireAuth()) {
  throw new Error("Unauthenticated");
}

const topicKey = sessionStorage.getItem("selectedTopicKey");
const selectedTopicRaw = sessionStorage.getItem("selectedTopicData");
const topicData = selectedTopicRaw ? JSON.parse(selectedTopicRaw) : topicKey ? TOPIC_LIBRARY[topicKey] : null;

if (!topicData) {
  window.location.href = "./learn.html";
  throw new Error("No topic selected");
}

const quizCounter = document.getElementById("quiz-counter");
const topicTitle = document.getElementById("quiz-topic-title");
const questionEl = document.getElementById("quiz-question");
const optionsEl = document.getElementById("quiz-options");
const nextButton = document.getElementById("next-btn");

const state = {
  index: 0,
  selected: null,
  correctCount: 0
};

topicTitle.textContent = `${topicData.title} Quiz`;

function renderQuestion() {
  const question = topicData.quiz[state.index];
  state.selected = null;
  nextButton.disabled = true;
  quizCounter.textContent = `Q${state.index + 1}/${topicData.quiz.length}`;
  questionEl.textContent = question.question;

  optionsEl.innerHTML = question.options
    .map(
      (option, optionIdx) => `
      <button class="option-btn" data-index="${optionIdx}" type="button">${option}</button>
    `
    )
    .join("");

  document.querySelectorAll(".option-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".option-btn").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      state.selected = Number(button.dataset.index);
      nextButton.disabled = false;
    });
  });

  nextButton.textContent = state.index === topicData.quiz.length - 1 ? "Finish Quiz" : "Next";
}

nextButton.addEventListener("click", () => {
  const currentQuestion = topicData.quiz[state.index];
  if (state.selected === currentQuestion.answer) {
    state.correctCount += 1;
  }

  if (state.index === topicData.quiz.length - 1) {
    sessionStorage.setItem(
      "quizResult",
      JSON.stringify({
        topicTitle: topicData.title,
        score: state.correctCount,
        total: topicData.quiz.length
      })
    );
    window.location.href = "./score.html";
    return;
  }

  state.index += 1;
  renderQuestion();
});

renderQuestion();
