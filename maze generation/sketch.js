let rows = 40;
let cols = 40;

let grid;

let currentCell;

function setup() {
  createCanvas(800, 800);
  frameRate(10);

  grid = new Grid(rows, cols, width / rows);

  currentCell = grid.cell(0, 0);

  currentCell.visited = true;
  currentCell.active = true;

}


function draw() {
  currentCell = currentCell.visitANeighbour();
  background(51);
  grid.show();
}
