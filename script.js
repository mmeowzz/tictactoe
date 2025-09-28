const board = document.getElementById("board");
const winnerText = document.getElementById("winner");
let currentPlayer = "🐱"; // Start with cat
let gameState = ["", "", "", "", "", "", "", "", ""];

// Create cells
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.addEventListener("click", () => makeMove(cell, i));
  board.appendChild(cell);
}

function makeMove(cell, index) {
  if (gameState[index] !== "" || winnerText.textContent !== "") return;
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    winnerText.textContent = currentPlayer + " wins! 🎉";
    return;
  }

  if (!gameState.includes("")) {
    winnerText.textContent = "It's a draw! 🤝";
    return;
  }

  currentPlayer = currentPlayer === "🐱" ? "🐶" : "🐱";
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "🐱";
  winnerText.textContent = "";
  document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
}
