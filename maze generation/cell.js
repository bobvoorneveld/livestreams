class Cell {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.visited = false;
    }

    show() {
        noFill();
        stroke(255);

        let baseX = this.x * this.size;
        let baseY = this.y * this.size;

        if(this.visited) {
            fill(0, 200, 200);
            rect(baseX, baseY, this.size, this.size);
        }

        // Top
        if (!this.topWallRemove) {
            line(baseX, baseY, baseX + this.size, baseY);
        }

        // Right
        line(baseX + this.size, baseY, baseX + this.size, baseY + this.size);

        // Bottom
        if (!this.bottomWallRemove) {
            line(baseX, baseY + this.size, baseX + this.size, baseY + this.size);
        }   

        // Left
        line(baseX, baseY, baseX, baseY + this.size);
    }

    neighbours() {
        let neighbours = grid.neighbours(this.x, this.y);
        if (neighbours) {
            let neighbour = random(neighbours);
            neighbour.visited = true;

            if (this.x == neighbour.x) {
                if(this.y == neighbour.y + 1) {
                    this.topWallRemove = true;
                    neighbour.bottomWallRemove = true;
                } else {
                    this.bottomWallRemove = true;
                    neighbour.topWallRemove = true;
                }
            }
        }
    }
}