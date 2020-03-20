let rows = 20;
let cols = 20;

let grid;

let currentCell;

function setup() {
  createCanvas(800, 800);

  grid = new Grid(rows, cols, width / rows);

  currentCell = grid.cell(10, 10);

  currentCell.visited = true;

  currentCell.neighbours();
}


function draw() {
  background(51);
  grid.show();

}
