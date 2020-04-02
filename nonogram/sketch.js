let solution = [
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 0, 0, 1, 1, 0, 0, 1, 0],
  [1, 0, 0, 0, 1, 1, 0, 0, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 0]
]

let grid;
let cellSize;

function setup() {
  createCanvas(800, 800);

  cellSize = 40;
  grid = new Grid(solution, cellSize);
  grid.setup();
}


function draw() {
  background(255);

  grid.show();
}

function mousePressed() {
  let x = floor(mouseX / cellSize);
  let y = floor(mouseY / cellSize);

  let cell = grid.offsetCell(x, y);
  if (mouseButton === RIGHT) {
    cell.lock();
  } else {
    cell.activate();
  }

  let won = grid.checkWinning();

  if (won) {
    alert('You have won!');
  }
}

