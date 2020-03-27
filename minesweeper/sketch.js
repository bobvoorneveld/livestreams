let rows = 20;
let cols = 20;

let grid;
let cellSize;
let dragging = false;
let activeCell;
let gameOver = false;

function setup() {
  createCanvas(800, 800);

  cellSize = width / cols;
  grid = new Grid(rows, cols, cellSize);

  grid.setup();

}


function draw() {
  background(51);

  if (activeCell) {
    activeCell.possibleSweep = false;
    activeCell = undefined;
  }

  if(dragging && !gameOver) {
    let x = floor(mouseX / cellSize);
    let y = floor(mouseY / cellSize);
    activeCell = grid.cell(x, y);
    activeCell.possibleSweep = true;
  }

  grid.show();
}

function mousePressed() {
  dragging = true;
}

function mouseReleased() {
  dragging = false;

  gameOver = activeCell.sweep();
}
