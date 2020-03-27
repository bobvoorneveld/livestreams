let rows = 20;
let cols = 20;

let grid;
let cellSize;
let dragging = false;
let shifting = false;
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
    activeCell.possibleFlag = false;
    activeCell = undefined;
  }

  if(dragging || shifting && !gameOver) {
    let x = floor(mouseX / cellSize);
    let y = floor(mouseY / cellSize);
    activeCell = grid.cell(x, y);
    if (shifting) {
      activeCell.possibleFlag = true;
    } else if (dragging) {
      activeCell.possibleSweep = true;
    }
  }

  grid.show();
}

function mousePressed() {
  dragging = true;
}

function mouseReleased() {
  dragging = false;

  if (shifting) {
    activeCell.flag();
  } else {
    gameOver = activeCell.sweep();
  }
}

function keyPressed() {
  if (keyCode === SHIFT) {
    shifting = true;
  }
}

function keyReleased() {
  if (keyCode === SHIFT) {
    shifting = false;
  }
}
