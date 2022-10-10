const grid = document.getElementById("cellContainer");
const button = document.getElementById("reBtn");
const flags = document.getElementById("flagCount");
let cells = [];
let startBomb;
let flagCount;
let gameStatus;

initialize();

function initialize() {
  gameStatus = true;
  startBomb = 15;
  flagCount = 15;
  makeCells();
  flags.textContent = `Flags Currently Left: ${flagCount}`;
}

function makeCells() {
  let bombArray = Array(startBomb).fill("bomb");
  let safeArray = Array(100 - startBomb).fill("safe");
  let mixedArray = bombArray.concat(safeArray);
  let gameArray = mixedArray.sort(function () {
    return Math.random() - 0.5;
  });

  for (let i = 0; i < 100; i++) {
    let cell = document.createElement("div");
    cell.setAttribute("id", i);
    cell.classList.add(gameArray[i]);
    grid.appendChild(cell);
    cells.push(cell);

    cell.addEventListener("click", function (evt) {
      onClick(cell);
    });

    cell.oncontextmenu = function (evt) {
      evt.preventDefault();
      addFlag(cell);
    };
  }

  for (let i = 0; i < cells.length; i++) {
    let bombsAround = 0;
    let topRow = i < 10;
    let botRow = i > 89;
    let leftEdge = i % 10 == 0;
    let rightEdge = i % 10 == 9;

    if (cells[i].classList.contains("safe")) {
      if (topRow || leftEdge) {
      } else if (cells[i - 11].classList.contains("bomb")) {
        bombsAround++;
      }
      if (topRow) {
      } else if (cells[i - 10].classList.contains("bomb")) {
        bombsAround++;
      }
      if (topRow || rightEdge) {
      } else if (cells[i - 9].classList.contains("bomb")) {
        bombsAround++;
      }
      if (leftEdge) {
      } else if (cells[i - 1].classList.contains("bomb")) {
        bombsAround++;
      }
      if (rightEdge) {
      } else if (cells[i + 1].classList.contains("bomb")) {
        bombsAround++;
      }
      if (botRow || leftEdge) {
      } else if (cells[i + 9].classList.contains("bomb")) {
        bombsAround++;
      }
      if (botRow) {
      } else if (cells[i + 10].classList.contains("bomb")) {
        bombsAround++;
      }
      if (botRow || rightEdge) {
      } else if (cells[i + 11].classList.contains("bomb")) {
        bombsAround++;
      }
      cells[i].setAttribute("bombTotal", bombsAround);
    }
  }
}

function onClick(cell) {
  let currentId = cell.id;
  let totalBombsAround = cell.getAttribute("bombTotal");
  if (gameStatus == false) {
    return;
  }
  if (cell.classList.contains("empty") || cell.classList.contains("flag")) {
    return;
  }
  if (cell.classList.contains("bomb")) {
    gameStatus = false;
    flags.textContent = "GAME OVER! Try Again?";
  }
  if (totalBombsAround == 0) {
    cell.classList.add("empty");
  }
  if (totalBombsAround > 0) {
    cell.classList.add("checked");
    cell.textContent = totalBombsAround;
    return;
  }
}

function addFlag(cell) {}
