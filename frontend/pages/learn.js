import { getUniqueTopicsByCategory, resolveTopic } from "../services/topics.js";
import { requireAuth } from "../services/auth.js";

if (!requireAuth()) {
  throw new Error("Unauthenticated");
}

const topicInput = document.getElementById("topic-input");
const learnButton = document.getElementById("learn-btn");
const errorBox = document.getElementById("learn-error");
const contentCard = document.getElementById("learn-content");
const titleEl = document.getElementById("learn-title");
const sectionsEl = document.getElementById("learn-sections");
const takeQuizButton = document.getElementById("take-quiz-btn");
const suggestedTopicsContainer = document.getElementById("suggested-topics");
const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
let selectedTopicKey = null;
let selectedTopicData = null;
let activeCategory = "All";

function renderSuggestedTopics(category = "All") {
  const topics = getUniqueTopicsByCategory(category).slice(0, 16);
  suggestedTopicsContainer.innerHTML = topics
    .map(
      ([key, topic]) => `
      <button class="topic-card" data-topic-key="${key}" type="button">
        <strong>${topic.title}</strong>
        <span>${topic.category}</span>
      </button>
    `
    )
    .join("");

  suggestedTopicsContainer.querySelectorAll(".topic-card").forEach((button) => {
    button.addEventListener("click", () => {
      topicInput.value = button.querySelector("strong").textContent;
      learnButton.click();
    });
  });
}

function renderTopic(topicData) {
  titleEl.textContent = topicData.title;
  sectionsEl.innerHTML = `
    <section class="content-section">
      <h3>Definition</h3>
      <p>${topicData.definition}</p>
    </section>
    <section class="content-section">
      <h3>Detailed Explanation</h3>
      <p>${topicData.detailedExplanation}</p>
    </section>
    <section class="content-section">
      <h3>Key Points</h3>
      <ul>${topicData.keyPoints.map((point) => `<li>${point}</li>`).join("")}</ul>
    </section>
    <section class="content-section">
      <h3>Example</h3>
      <p>${topicData.example}</p>
    </section>
  `;
}

learnButton.addEventListener("click", () => {
  const topicMatch = resolveTopic(topicInput.value);

  errorBox.textContent = topicMatch.fallback
    ? "Topic not found in library. Showing a smart fallback lesson with quiz."
    : "";

  renderTopic(topicMatch.topic);
  contentCard.style.display = "block";
  takeQuizButton.style.display = "inline-block";
  selectedTopicKey = topicMatch.key;
  selectedTopicData = topicMatch.topic;
  sessionStorage.setItem("selectedTopicKey", topicMatch.key);
  sessionStorage.setItem("selectedTopicData", JSON.stringify(topicMatch.topic));
});

takeQuizButton.addEventListener("click", () => {
  if (!selectedTopicKey || !selectedTopicData) {
    errorBox.textContent = "Please learn a topic first.";
    return;
  }
  window.location.href = "./quiz.html";
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderSuggestedTopics(activeCategory);
  });
});

renderSuggestedTopics(activeCategory);
