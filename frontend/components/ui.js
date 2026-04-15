export function renderBadges(badges) {
  if (!badges || badges.length === 0) {
    return '<span class="badge muted">No badges yet</span>';
  }
  return badges.map((badge) => `<span class="badge">${badge}</span>`).join("");
}

export function renderLeaderboardRows(leaderboard, currentUserEmail) {
  return leaderboard
    .map((entry) => {
      const highlightClass = entry.email === currentUserEmail ? "leaderboard-row current-user" : "leaderboard-row";
      return `
        <li class="${highlightClass}">
          <span>#${entry.rank} ${entry.name}</span>
          <span>${entry.score} pts</span>
        </li>
      `;
    })
    .join("");
}

export function renderQuizFeedback(feedback) {
  return feedback
    .map((item, index) => {
      const stateClass = item.isCorrect ? "correct" : "wrong";
      const stateText = item.isCorrect ? "Correct" : "Wrong";
      return `<li class="${stateClass}">Q${index + 1}: ${stateText}</li>`;
    })
    .join("");
}
