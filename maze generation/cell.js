class Cell {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.visited = false;

        // Walls
        this.showTop = true;
        this.showBottom = true;
        this.showLeft = true;
        this.showRight = true;
    }

    show() {
        let baseX = this.x * this.size;
        let baseY = this.y * this.size;

        if(this.visited) {
            fill(0, 200, 200);
            noStroke();
            rect(baseX, baseY, this.size, this.size);
        }

        noFill();
        stroke(255);

        // Top
        if (this.showTop) {
            line(baseX, baseY, baseX + this.size, baseY);
        }

        // Right
        if (this.showRight) {
            line(baseX + this.size, baseY, baseX + this.size, baseY + this.size);
        }

        // Bottom
        if (this.showBottom) {
            line(baseX, baseY + this.size, baseX + this.size, baseY + this.size);
        }   

        // Left
        if (this.showLeft) {
            line(baseX, baseY, baseX, baseY + this.size);
        }
    }

    visitANeighbour() {
        let neighbours = grid.neighbours(this.x, this.y);

        if (neighbours.length > 0) {
            let index = random(neighbours.length);
            let neighbour = neighbours.splice(index, 1)[0];

            neighbour.visited = true;

            // Top / Bottom
            if (this.x == neighbour.x) {

                if(this.y == neighbour.y + 1) {
                    // Bottom
                    this.showTop = false;
                    neighbour.showBottom = false;
                } else {
                    // Top
                    this.showBottom = false;
                    neighbour.showTop = false;
                }
            } else {
                if (this.x == neighbour.x - 1) {
                    this.showRight = false;
                    neighbour.showLeft = false;
                } else {
                    this.showLeft = false;
                    neighbour.showRight = false;
                }
            }
            return neighbour;
        }
    }
}