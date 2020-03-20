let personSize = 10;
let speed = 2;
let crowdSize = 200;
let percentMoving = (1/2);
let percentInfectedByStart = 0.05;
let daysOfIllness = 300;

let people = [];

let MaxSickness = 0;

function setup() {
  createCanvas(800, 800);
  for (let i = 0; i < crowdSize; i++) {
    let person = new Person(floor(random(width)), floor(random(height)));
    people.push(person);
  }
}

function draw() {
  background(220);

  let infectious = 0;
  let immune = 0;
  for (let person of people) {
    person.update(people);
    person.show();

    if (person.infectious) {
      infectious++;
    } else if (person.isImmune()) {
      immune++;
    }
  }
  console.log('infectious ' + infectious);
  console.log('immune ' + immune);
}