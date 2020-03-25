let rows = 20;
let cols = 20;

let grid;

let currentCell;

function setup() {
  createCanvas(800, 800);
  frameRate(5);

  grid = new Grid(rows, cols, width / rows);

  currentCell = grid.cell(0, 0);

  currentCell.visited = true;

}


function draw() {
  currentCell = currentCell.visitANeighbour();
  background(51);
  grid.show();
}
