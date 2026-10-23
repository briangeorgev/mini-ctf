const challenges = [
  {
    id: 1,
    title: 'View Page Source',
    description: 'Find the hidden flag in the page source.',
    hint: 'Right-click → View Page Source.',
    flag: 'CTF{source_flag}',
  },
  {
    id: 2,
    title: 'Inspect Element',
    description: 'Inspect elements to find a hidden attribute.',
    hint: 'Look for a data-flag attribute.',
    flag: 'CTF{inspect_flag}',
  },
  {
    id: 3,
    title: 'Hidden Element',
    description: 'Find a hidden element containing the flag.',
    hint: 'Search for hidden text in the DOM.',
    flag: 'CTF{hidden_flag}',
  },
  {
    id: 4,
    title: 'Browser Console',
    description: 'Open the developer console to find the flag.',
    hint: 'Press F12 or Ctrl+Shift+I.',
    flag: 'CTF{console_flag}',
  },
  {
    id: 5,
    title: 'Find the Final Flag',
    description: 'Search the HTML source for the final flag.',
    hint: 'It is hidden somewhere in the code.',
    flag: 'CTF{final_flag}',
  },
];

const storageKey = 'mini_ctf_players';
let players = JSON.parse(localStorage.getItem(storageKey)) || {};
let currentPlayer = null;

function startGame() {
  const nameInput = document.getElementById('playerName');
  const name = nameInput.value.trim();

  if (!name) {
    alert('Please enter your name.');
    return;
  }

  if (!players[name]) {
    players[name] = { score: 0, completed: [] };
  }

  currentPlayer = name;
  localStorage.setItem(storageKey, JSON.stringify(players));
  nameInput.value = '';

  document.getElementById('currentPlayer').textContent = `Player: ${currentPlayer}`;
  updateScore();
  renderChallenges();
  renderLeaderboard();
}

function renderChallenges() {
  const container = document.getElementById('challenges');
  container.innerHTML = '';

  challenges.forEach((challenge) => {
    const card = document.createElement('div');
    card.className = 'challenge';
    card.innerHTML = `
      <h2>${challenge.title}</h2>
      <p>${challenge.description}</p>
      <p><em>Hint:</em> ${challenge.hint}</p>
      <input type="text" id="answer-${challenge.id}" placeholder="Enter flag" />
      <button type="button" onclick="submitAnswer(${challenge.id})">Submit</button>
      <p id="message-${challenge.id}"></p>
    `;
    container.appendChild(card);
  });
}

function submitAnswer(id) {
  if (!currentPlayer) {
    alert('Start the game first.');
    return;
  }

  const answer = document.getElementById(`answer-${id}`).value.trim();
  const challenge = challenges.find((item) => item.id === id);
  const message = document.getElementById(`message-${id}`);

  if (players[currentPlayer].completed.includes(id)) {
    message.innerHTML = '<span class="error">Already completed!</span>';
    return;
  }

  if (answer === challenge.flag) {
    players[currentPlayer].score += 100;
    players[currentPlayer].completed.push(id);
    message.innerHTML = '<span class="success">Correct! Flag captured.</span>';
  } else {
    message.innerHTML = '<span class="error">Incorrect flag.</span>';
  }

  localStorage.setItem(storageKey, JSON.stringify(players));
  updateScore();
  renderLeaderboard();
}

function updateScore() {
  if (!currentPlayer) {
    document.getElementById('currentScore').textContent = '';
    return;
  }

  const player = players[currentPlayer];
  document.getElementById('currentScore').textContent =
    `Score: ${player.score} | Completed: ${player.completed.length}`;
}

function renderLeaderboard() {
  const leaderboardBody = document.getElementById('leaderboardBody');
  leaderboardBody.innerHTML = '';

  const sortedPlayers = Object.entries(players).sort((a, b) => b[1].score - a[1].score);

  sortedPlayers.forEach(([name, data]) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${name}</td><td>${data.score}</td><td>${data.completed.length}</td>`;
    leaderboardBody.appendChild(row);
  });
}

window.onload = () => {
  document.getElementById('startButton').addEventListener('click', startGame);
  renderLeaderboard();
  updateScore();
};

// Hidden flags in the page
// Challenge 1 flag hidden in HTML comment:
// CTF{source_flag}
// Challenge 2 flag hidden in attribute:
// <div id="hiddenAttr" data-flag="CTF{inspect_flag}" style="display:none;"></div>
// Challenge 3 flag hidden element:
// <div style="display:none;">CTF{hidden_flag}</div>
// Challenge 4 flag in console:
// console.log('CTF{console_flag}');
// Challenge 5 flag hidden in source:
// <!-- Final flag: CTF{final_flag} -->
