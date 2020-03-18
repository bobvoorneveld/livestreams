let personSize = 10;
let speed = 1;
let crowdSize = 200;

let people = [];

function setup() {
  createCanvas(800, 800);
  for (let i = 0; i < crowdSize; i++) {
    let person = new Person(floor(random(width)), floor(random(height)));
    people.push(person);
  }
}

function draw() {
  background(220);

  for (let person of people) {
    person.update(people);
    person.show();  
  }
}