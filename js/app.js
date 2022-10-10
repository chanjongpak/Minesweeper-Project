const grid = document.getElementById("cellContainer");
const button = document.getElementById("reBtn");
const flags = document.getElementById("flagCount");
let cells = [];
let bombCount;
let flagCount;
let gameStatus;

initialize();

function initialize() {
  gameStatus = true;
  bombCount = 15;
  flagCount = 15;
  makeCells();
  flags.textContent = `Flags Left: ${flagCount}`;
}

function makeCells() {
  let bombArray = Array(bombCount).fill("bomb");
  let safeArray = Array(100 - bombCount).fill("safe");
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
}

function onClick(cell) {
  for (let i = 0; i < cells.length; i++) {
    let bombsAround = 0;
    let currentId = cell.id;
    let topRow = i < 10;
    let botRow = i > 89;
    let leftEdge = i % 10 == 0;
    let rightEdge = i % 10 == 9;

    if ((gameStatus = false)) {
      return;
    }
    if (cell.classList.contains("bomb")) {
      gameStatus = false;
      flags.textContent = "GAME OVER! Try Again?";
    }
    if (cell.classList.contains("safe")) {
      if (topRow || leftEdge) {
      } else if (cells[i - 11].classList.contains("bomb")) {
        bombsAround++;
      }
      if (bombsAround > 0) {
        cell.textContent = bombsAround;
      }
    }
  }
}
function addFlag(cell) {}
