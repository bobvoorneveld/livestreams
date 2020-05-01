let people = [];
let personSize = 10;
let speed = 2;
let crowdSize = 50;

function setup() {
  createCanvas(800, 800);
  for (let i = 0; i < crowdSize; i++) {
    people.push(
      new Person(
        floor(random(width)), floor(random(height))
        )
      );
  }
}

function draw() {
  background(51);
  for (let person of people) {
    person.update(people);
    person.show();
  }
}

function mousePressed() {
  for (let person of people) {
    const distance = dist(person.x, person.y, mouseX, mouseY);

    if (distance < 3 * personSize) {
      person.infected = true;
      sendOutCodes(person);
    }
  }
}

function sendOutCodes(person) {
  for(let other of people) {
    let uuids = person.uuids;
    other.sickCodes(uuids);
  }
}