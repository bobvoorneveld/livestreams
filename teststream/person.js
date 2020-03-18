let personSize = 10;
let speed = 1;

class Person {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(speed);
    }

    update(people) {
        if (this.newVelocity) {
            this.velocity = this.newVelocity;
            this.newVelocity = null;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if(this.x < 0) {
            this.x = width;
        } else if(this.x > width) {
            this.x = 0;
        }

        if(this.y < 0) {
            this.y = height;
        } else if(this.y > height) {
            this.y = 0;
        }

        this.detectHit(people);
    }

    detectHit(people) {
        let ourPosition = createVector(this.x, this.y);
        for (let other of people) {
            if (other === this) continue;
            let distance = dist(this.x, this.y, other.x, other.y);

            if (distance <= personSize + 1) {
                let otherPosition = createVector(other.x, other.y);
                let distanceVector = p5.Vector.sub(otherPosition, ourPosition);

                let theta = distanceVector.heading();
                let sine = sin(theta);
                let cosine = cos(theta);

                this.newVelocity = createVector();
                this.newVelocity.x = cosine * distanceVector.x - sine * distanceVector.y;
                this.newVelocity.y = cosine * distanceVector.y + sine * distanceVector.x;
                this.newVelocity.setMag(speed);
            }
        }
    }

    show() {
        noStroke();
        fill(100, 100, 0);
        ellipse(this.x, this.y, personSize, personSize);
    }
}