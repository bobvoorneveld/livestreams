let solution = [
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 0, 0, 1, 1, 0, 0, 1, 0],
  [1, 0, 0, 0, 1, 1, 0, 0, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 0]
]

let grid;

function setup() {
  createCanvas(800, 800);

  let cellSize = 40;
  grid = new Grid(solution, cellSize);
  grid.setup();
}


function draw() {
  background(255);

  grid.show();
}

function mousePressed() {

}

