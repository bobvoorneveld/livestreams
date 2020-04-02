class Cell {
    constructor(x, y, solution, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.solution = solution;
        this.activated = false;
        this.locked = false;
    }

    show(xOffset, yOffset) {
        strokeWeight(3);
        if (this.activated) {
            fill(51);
            stroke(255);
            rect(
                (this.x + xOffset) * this.size, 
                (this.y + yOffset) * this.size, 
                this.size, 
                this.size
                );
        } else if (this.locked) {
            fill(255);
            stroke(51);

            rect(
                (this.x + xOffset) * this.size, 
                (this.y + yOffset) * this.size, 
                this.size, 
                this.size
                );
            line(
                (this.x + xOffset) * this.size, 
                (this.y + yOffset) * this.size, 
                (this.x + xOffset + 1) * this.size, 
                (this.y + yOffset + 1) * this.size, 
                );
        } else {
            fill(255);
            stroke(51);
            rect(
                (this.x + xOffset) * this.size, 
                (this.y + yOffset) * this.size, 
                this.size, 
                this.size
                );
            }
    }

    activate() {
        this.activated = !this.activated;
    }
    
    lock() {
        this.locked = !this.locked;
    }
}
