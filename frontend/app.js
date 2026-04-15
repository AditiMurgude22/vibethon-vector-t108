const API = "http://localhost:5000";

// LOGIN
async function login() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.success) {
    saveUser(data.user);
    window.location.href = "pages/dashboard.html";
  } else {
    alert("Invalid credentials");
  }

}

// SIGNUP
async function signup() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const res = await fetch(`${API}/signup`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.success) {
    saveUser({ email, password, points: 0, completedModules: [], quizScores: {} });
    window.location.href = "pages/dashboard.html";
  } else {
    alert("Signup failed");
  }
}

// LOAD LEADERBOARD
async function loadLeaderboard() {
  const res = await fetch(`${API}/leaderboard`);
  const data = await res.json();

  const container = document.getElementById("leaderboard");

  if (!container) return;

  container.innerHTML = data.map(user => `
    <div class="card">
      <h3>${user.name}</h3>
      <p>${user.points} pts</p>
    </div>
  `).join("");
}

// SPAM CHECK
async function checkSpam() {
  const msg = document.getElementById("message").value;

  const res = await fetch(`${API}/predict`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();

  document.getElementById("result").innerText = data.result;
}

// USER SESSION
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

function saveUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

function clearUser() {
  localStorage.removeItem('currentUser');
  currentUser = null;
}

function checkAuth() {
  if (!currentUser && window.location.pathname.includes('/pages/')) {
    window.location.href = 'login.html';
  }
}

function goToDashboard() {
  if (currentUser) {
    window.location.href = 'pages/dashboard.html';
  } else {
    window.location.href = 'pages/login.html';
  }
}

function checkLandingAuth() {
  goToDashboard();
}

function goToModule(id) {
  window.location.href = `module${id}.html`;
}

function startQuiz(id) {
  window.location.href = `quiz${id}.html?moduleId=${id}`;
}

async function loadModules() {
  const res = await fetch(`${API}/modules`);
  const modules = await res.json();
  
  const container = document.getElementById('modules-container');
  if (container) {
    container.innerHTML = modules.map(m => `
      <div class="module-card" onclick="goToModule(${m.id})">
        <h3>${m.title}</h3>
        <p>${m.description}</p>
        <span class="status ${currentUser?.completedModules?.includes(m.id) ? 'completed' : ''}">
          ${currentUser?.completedModules?.includes(m.id) ? '✓ Completed' : 'New'}
        </span>
        <button>Start Module</button>
      </div>
    `).join('');
  }
}

async function loadModule(id) {
  const res = await fetch(`${API}/module/${id}`);
  const module = await res.json();
  
  document.getElementById('module-title').textContent = module.title; // if exists
  const contentDiv = document.getElementById('content-sections');
  if (contentDiv) {
    contentDiv.innerHTML = module.content.map(section => `
      <div class="content-section">
        <h2>${section.section}</h2>
        <p>${section.text.replace(/\\n/g, '<br>')}</p>
      </div>
    `).join('');
  }
}

async function loadQuiz(id) {
  const urlParams = new URLSearchParams(window.location.search);
  const moduleId = urlParams.get('moduleId') || id;
  
  const res = await fetch(`${API}/quiz/${id}`);
  const quiz = await res.json();
  
  document.getElementById('quiz-title').textContent = quiz.title;
  
  const questionsDiv = document.getElementById('questions');
  questionsDiv.innerHTML = '';
  
  quiz.questions.forEach((q, i) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'question';
    qDiv.innerHTML = `
      <h3>Q${i+1}: ${q.q}</h3>
      ${q.options.map((opt, j) => `
        <label><input type="radio" name="q${i}" value="${j}" required> ${opt}</label><br>
      `).join('')}
    `;
    questionsDiv.appendChild(qDiv);
  });
  
  document.getElementById('submit-quiz').style.display = 'block';
}

async function submitQuiz(id) {
  const answers = [];
  document.querySelectorAll('input[type="radio"]:checked').forEach((radio, i) => {
    answers[i] = parseInt(radio.value);
  });

  if (answers.length !== 5) {
    alert('Please answer all questions!');
    return;
  }

  const res = await fetch(`${API}/submit-quiz/${id}`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ userEmail: currentUser.email, answers })
  });

  const data = await res.json();

  if (data.success) {
    alert(`Great! Score: ${data.score}/100. Total Points: ${data.totalPoints}`);
    currentUser = { ...currentUser, points: data.totalPoints };
    saveUser(currentUser);
    window.location.href = 'dashboard.html';
  } else {
    alert('Error submitting quiz');
  }
}

async function loadProfile() {
  window.location.href = 'profile.html';
}

async function loadProfileData() {
  const profileName = document.getElementById('profile-name');
  const profilePoints = document.getElementById('profile-points');
  const completedEl = document.getElementById('completed-modules');
  const scoresList = document.getElementById('scores-list');

  if (profileName && currentUser) {
    profileName.textContent = currentUser.email;
    profilePoints.textContent = currentUser.points;
    completedEl.textContent = currentUser.completedModules?.length || 0;
    
    scoresList.innerHTML = Object.entries(currentUser.quizScores || {}).map(([id, score]) => 
      `<li>Quiz ${id}: ${score}/100</li>`
    ).join('');
  }
}

function logout() {
  clearUser();
  window.location.href = '../index.html';
}

// PAGE INIT
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}

function initPage() {
  checkAuth();
  
  if (window.location.pathname.includes('dashboard.html')) {
    loadModules();
  } else if (window.location.pathname.includes('module1.html')) {
    loadModule(1);
  } else if (window.location.pathname.includes('quiz1.html')) {
    loadQuiz(1);
  } else if (window.location.pathname.includes('profile.html')) {
    loadProfileData();
  } else if (window.location.pathname.includes('login.html')) {
    // existing
  }
  
  loadLeaderboard(); // global where applicable
}

window.onload = loadLeaderboard;
