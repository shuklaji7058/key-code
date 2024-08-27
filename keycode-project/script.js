// New features and enhancements
function setupSearch() {
  const searchInput = document.getElementById("tableSearch");
  const tableRows = document.querySelectorAll("#codeTable tbody tr");

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    tableRows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(searchTerm) ? "" : "none";
    });
  });
}

// Game Mode
// Game Mode
let gameInterval;
let gameScore = 0;
let gameDifficulty = "normal";
const gameKey = document.getElementById("gameKey");
const gameScoreDisplay = document.getElementById("gameScore");
const startGameButton = document.getElementById("startGame");
const difficultySelect = document.getElementById("gameDifficulty");
const resetLevelButton = document.getElementById("resetLevel");

function startGame() {
  gameScore = 0;
  updateGameScore();
  startGameButton.disabled = true;
  difficultySelect.disabled = true;
  resetLevelButton.style.display = "none";
  const interval = getDifficultyInterval();
  gameInterval = setInterval(showRandomKey, interval);
  showRandomKey();
}

function getDifficultyInterval() {
  switch (gameDifficulty) {
    case "very_easy":
      return 8000; // 8 seconds
    case "easy":
      return 6000; // 6 seconds
    case "normal":
      return 4000; // 4 seconds
    case "hard":
      return 2000; // 2 seconds
    default:
      return 4000;
  }
}

function showRandomKey() {
  const randomKey = keyCodeData[Math.floor(Math.random() * keyCodeData.length)];
  gameKey.textContent = randomKey.key;
  gameKey.dataset.keyCode = randomKey.keyCode;
}

function updateGameScore() {
  gameScoreDisplay.textContent = `Score: ${gameScore}`;
}

function endGame() {
  clearInterval(gameInterval);
  gameKey.textContent = "Game Over!";
  startGameButton.disabled = false;
  difficultySelect.disabled = false;
  resetLevelButton.style.display = "inline-block";
}

function resetLevel() {
  gameDifficulty = "normal";
  difficultySelect.value = "normal";
  resetLevelButton.style.display = "none";
  gameKey.textContent = "Press Start";
}

window.addEventListener("keydown", function (e) {
  if (gameInterval) {
    if (parseInt(gameKey.dataset.keyCode) === e.keyCode) {
      gameScore++;
      updateGameScore();
      showRandomKey();
    } else {
      endGame();
    }
  }
});

startGameButton.addEventListener("click", startGame);
difficultySelect.addEventListener("change", function () {
  gameDifficulty = this.value;
});
resetLevelButton.addEventListener("click", resetLevel);

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  populateKeyCodeTable();
  setupTabs();
  setupSearch();
});

// Add tooltip functionality
function setupTooltips() {
  const keys = document.querySelectorAll(".key");
  keys.forEach((key) => {
    key.addEventListener("mouseenter", showTooltip);
    key.addEventListener("mouseleave", hideTooltip);
  });
}

function showTooltip(e) {
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.textContent = `Press ${this.querySelector("small").textContent}`;
  this.appendChild(tooltip);
}

function hideTooltip() {
  const tooltip = this.querySelector(".tooltip");
  if (tooltip) {
    tooltip.remove();
  }
}

function showKeyCodes(e) {
  const insert = document.getElementById("insert");
  insert.innerHTML = "";

  const keyCodes = {
    Key: e.key === " " ? "Space" : e.key,
    "Key Code": e.keyCode,
    Code: e.code,
    Which: e.which,
    Location: e.location,
  };
  setupTooltips();

  for (let key in keyCodes) {
    const div = document.createElement("div");
    div.className = "key";
    const small = document.createElement("small");

    const keyText = document.createTextNode(key);
    const valueText = document.createTextNode(keyCodes[key]);

    small.appendChild(keyText);
    div.appendChild(valueText);
    div.appendChild(small);

    insert.appendChild(div);
  }

  insert.classList.add("animate");
  setTimeout(() => insert.classList.remove("animate"), 300);
}

window.addEventListener("keydown", showKeyCodes);
// Expanded key code table data
const keyCodeData = [
  // Alphabet
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((char) => ({
    key: char,
    code: `Key${char}`,
    keyCode: char.charCodeAt(0),
  })),

  // Numbers
  ..."0123456789".split("").map((num) => ({
    key: num,
    code: `Digit${num}`,
    keyCode: num.charCodeAt(0),
  })),

  // Function keys
  ...Array.from({ length: 12 }, (_, i) => ({
    key: `F${i + 1}`,
    code: `F${i + 1}`,
    keyCode: 112 + i,
  })),

  // Special keys
  { key: "Backspace", code: "Backspace", keyCode: 8 },
  { key: "Tab", code: "Tab", keyCode: 9 },
  { key: "Enter", code: "Enter", keyCode: 13 },
  { key: "Shift", code: "ShiftLeft", keyCode: 16 },
  { key: "Ctrl", code: "ControlLeft", keyCode: 17 },
  { key: "Alt", code: "AltLeft", keyCode: 18 },
  { key: "Caps Lock", code: "CapsLock", keyCode: 20 },
  { key: "Esc", code: "Escape", keyCode: 27 },
  { key: "Space", code: "Space", keyCode: 32 },
  { key: "Page Up", code: "PageUp", keyCode: 33 },
  { key: "Page Down", code: "PageDown", keyCode: 34 },
  { key: "End", code: "End", keyCode: 35 },
  { key: "Home", code: "Home", keyCode: 36 },
  { key: "Left Arrow", code: "ArrowLeft", keyCode: 37 },
  { key: "Up Arrow", code: "ArrowUp", keyCode: 38 },
  { key: "Right Arrow", code: "ArrowRight", keyCode: 39 },
  { key: "Down Arrow", code: "ArrowDown", keyCode: 40 },
  { key: "Insert", code: "Insert", keyCode: 45 },
  { key: "Delete", code: "Delete", keyCode: 46 },
  { key: "Num Lock", code: "NumLock", keyCode: 144 },
  { key: "Scroll Lock", code: "ScrollLock", keyCode: 145 },

  // Punctuation and symbols
  { key: ";", code: "Semicolon", keyCode: 186 },
  { key: "=", code: "Equal", keyCode: 187 },
  { key: ",", code: "Comma", keyCode: 188 },
  { key: "-", code: "Minus", keyCode: 189 },
  { key: ".", code: "Period", keyCode: 190 },
  { key: "/", code: "Slash", keyCode: 191 },
  { key: "`", code: "Backquote", keyCode: 192 },
  { key: "[", code: "BracketLeft", keyCode: 219 },
  { key: "\\", code: "Backslash", keyCode: 220 },
  { key: "]", code: "BracketRight", keyCode: 221 },
  { key: "'", code: "Quote", keyCode: 222 },

  // Numpad
  { key: "Numpad 0", code: "Numpad0", keyCode: 96 },
  { key: "Numpad 1", code: "Numpad1", keyCode: 97 },
  { key: "Numpad 2", code: "Numpad2", keyCode: 98 },
  { key: "Numpad 3", code: "Numpad3", keyCode: 99 },
  { key: "Numpad 4", code: "Numpad4", keyCode: 100 },
  { key: "Numpad 5", code: "Numpad5", keyCode: 101 },
  { key: "Numpad 6", code: "Numpad6", keyCode: 102 },
  { key: "Numpad 7", code: "Numpad7", keyCode: 103 },
  { key: "Numpad 8", code: "Numpad8", keyCode: 104 },
  { key: "Numpad 9", code: "Numpad9", keyCode: 105 },
  { key: "Numpad *", code: "NumpadMultiply", keyCode: 106 },
  { key: "Numpad +", code: "NumpadAdd", keyCode: 107 },
  { key: "Numpad -", code: "NumpadSubtract", keyCode: 109 },
  { key: "Numpad .", code: "NumpadDecimal", keyCode: 110 },
  { key: "Numpad /", code: "NumpadDivide", keyCode: 111 },

  // Media keys
  { key: "Volume Mute", code: "VolumeMute", keyCode: 173 },
  { key: "Volume Down", code: "VolumeDown", keyCode: 174 },
  { key: "Volume Up", code: "VolumeUp", keyCode: 175 },
  { key: "Media Next Track", code: "MediaTrackNext", keyCode: 176 },
  { key: "Media Previous Track", code: "MediaTrackPrevious", keyCode: 177 },
  { key: "Media Stop", code: "MediaStop", keyCode: 178 },
  { key: "Media Play/Pause", code: "MediaPlayPause", keyCode: 179 },
];

function populateKeyCodeTable() {
  const tableBody = document.querySelector("#codeTable tbody");
  keyCodeData.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${item.key}</td>
          <td>${item.code}</td>
          <td>${item.keyCode}</td>
      `;
    tableBody.appendChild(row);
  });
}
// Tab functionality
function setupTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabName = button.getAttribute("data-tab");

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(tabName).classList.add("active");
    });
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  populateKeyCodeTable();
  setupTabs();
});
