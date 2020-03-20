class Person {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(speed);
        this.moving = random() < percentMoving;
        this.infectious = random() < percentInfectedByStart;

        this.daysSinceInfection = 0;
    }

    update(people) {
        if (this.infectious) {
            this.daysSinceInfection++;
            if(this.daysSinceInfection > daysOfIllness) {
                this.infectious = false;
            }
        }

        if (!this.moving) {
            return;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if(this.x < 0 || this.x > width) {
            this.velocity.x *= -1;
        }


        if(this.y < 0 || this.y > height) {
            this.velocity.y *= -1;
        }

        this.detectHit(people);
    }

    detectHit(people) {
        for (let other of people) {
            if (other === this) continue;
            let distance = dist(this.x, this.y, other.x, other.y);

            if (distance <= personSize) {
                if (this.infectious) {
                    other.infectious = true;
                }

                if (other.infectious) {
                    this.infectious = true;
                }

                let dx = other.x - this.x;
                let dy = other.y - this.y;
                let angle = atan2(dy, dx);
                let targetX = this.x + cos(angle) * personSize;
                let targetY = this.y + sin(angle) * personSize;
                let ax = (targetX - other.x) * 0.05;
                let ay = (targetY - other.y) * 0.05;

                this.velocity.x -= ax;
                this.velocity.y -= ay;
                this.velocity.setMag(speed);

                other.velocity.x += ax;
                other.velocity.y += ay;
                this.velocity.setMag(speed);
            }
        }
    }

    isImmune() {
        return this.daysSinceInfection > daysOfIllness;
    }

    show() {
        noStroke();
        if (this.infectious) {
            fill(200, 0, 0);
        } else if (this.daysSinceInfection > 0) {
            fill(0, 0, 200);
        } else {
            fill(0, 200, 0);
        }
        ellipse(this.x, this.y, personSize, personSize);
    }
}