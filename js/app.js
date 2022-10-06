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
  let gameArray = safeArray.concat(bombArray);
  let mixedArray = gameArray.sort(function () {
    return Math.random() - 0.5;
  });

  for (i = 0; i < 100; i++) {
    let cell = document.createElement("div");
    cell.setAttribute("id", i);
    cell.classList.add(gameArray[i]);
    grid.appendChild(cell);
    cells.push(cell);
    let p = i;

    cell.addEventListener("click", function (evt, p) {
      clickHandler(cell, p);
    });
  }
}

function clickHandler(cell, p) {
  let numOfBombs = 0;
  console.log(p);
  if (cell.classList.contains("safe")) {
    if (cell[p - 11].classList.contains("bomb")) {
      numOfBombs++;
    }
    console.log(cell[i]);
    cell.textContent = numOfBombs;
  }
  if (cell.classList.contains("bomb")) {
    console.log("You clicked on a bomb! Try again");
  }
}
