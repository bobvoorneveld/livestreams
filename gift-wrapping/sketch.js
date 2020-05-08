let points = [];

let edgeOffset = 20;

let leftMostPoint;
let hull = [];
let currentPoint;
let nextPoint;
let index;

function setup() {
  createCanvas(800, 800);

  for (let i = 0; i < 200; i++) {
    points.push(
      createVector(
        random(edgeOffset, width - edgeOffset),
        random(edgeOffset, height - edgeOffset)
      )
    );
  }

  // Sort to find left most point
  points.sort((a, b) => {
    return a.x - b.x;
  });
  leftMostPoint = points[0];

  // Setup first vertex for the hull
  hull.push(leftMostPoint);

  // Select next 2 points
  currentPoint = leftMostPoint;
  nextPoint = points[1];

  // 3rd point index for comparison
  index = 2;
}

function draw() {
  background(51);

  // Draw all points
  noStroke();
  fill(255);
  for (let point of points) {
    circle(point.x, point.y, 10);
  }

  // Draw the hull
  stroke(0, 0, 255);
  fill(0, 0, 255, 50);
  strokeWeight(2);
  beginShape();
  for (let point of hull) {
    vertex(point.x, point.y);
  }
  endShape();

  // Draw the currentpoint
  noStroke();
  fill(0, 255, 0);
  circle(currentPoint.x, currentPoint.y, 10);

  // Draw the line to next point
  stroke(0, 255, 0);
  strokeWeight(3);
  line(currentPoint.x, currentPoint.y, nextPoint.x, nextPoint.y);

  // Find a potential better point
  let betterPoint = points[index];
  stroke(255);
  strokeWeight(2);
  // Draw a line to it
  line(currentPoint.x, currentPoint.y, betterPoint.x, betterPoint.y);

  // Compare 2 lines, find the left most line/point.
  const a = p5.Vector.sub(nextPoint, currentPoint);
  const b = p5.Vector.sub(betterPoint, currentPoint);

  const cross = a.cross(b);
  if (cross.z < 0) {
    nextPoint = betterPoint;
  }

  index++;
  if (index === points.length) {
    // Found the next most left point
    hull.push(nextPoint);

    // Move current point to the next point
    currentPoint = nextPoint;

    // new a line
    nextPoint = leftMostPoint;
    index = 0;
    // We completed the hull
    if (currentPoint === leftMostPoint) {
      noLoop();
    }
  }
}
