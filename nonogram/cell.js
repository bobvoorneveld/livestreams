class Cell {
    constructor(x, y, solution, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.solution = solution
    }

    show(xOffset, yOffset) {
        if (this.solution === 1) {
            fill(51);
            stroke(255);
        } else {
            fill(255);
            stroke(51);
        }
        strokeWeight(1);
        rect(
            (this.x + xOffset) * this.size, 
            (this.y + yOffset) * this.size, 
            this.size, 
            this.size
            );
    }
}
