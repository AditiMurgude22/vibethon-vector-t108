import { requireAuth, getUser } from "../services/auth.js";
import { getLeaderboard } from "../services/leaderboard.js";
import { renderLeaderboardRows } from "../components/ui.js";

if (!requireAuth()) {
  throw new Error("Unauthenticated");
}

const currentUser = getUser();
const board = getLeaderboard(currentUser);
document.getElementById("leaderboard-list").innerHTML = renderLeaderboardRows(board, currentUser?.email || "");
