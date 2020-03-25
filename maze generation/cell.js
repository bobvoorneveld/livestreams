class Cell {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.visited = false;
        this.active = false;
        this.previousCell = undefined;

        // Walls
        this.showTop = true;
        this.showBottom = true;
        this.showLeft = true;
        this.showRight = true;
    }

    show() {
        let baseX = this.x * this.size;
        let baseY = this.y * this.size;

        if (this.active) {
            fill(0, 0, 200);
            noStroke();
            rect(baseX, baseY, this.size, this.size);
        } else if(this.visited) {
            fill(0, 200, 200);
            noStroke();
            rect(baseX, baseY, this.size, this.size);
        }

        noFill();
        stroke(255);
        strokeWeight(5);

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

        // If there are no neighbours, return to previous visited cell.
        if (neighbours.length === 0) {
            this.active = false;
            this.previousCell.active = true;
            return this.previousCell;
        }

        // There are neighbours, choose one and set as active.
        let index = random(neighbours.length);
        let next = neighbours.splice(index, 1)[0];

        this.active = false;
        next.visited = true;
        next.active = true;
        next.previousCell = this;

        // Top / Bottom
        if (this.x == next.x) {

            if(this.y == next.y + 1) {
                // Bottom
                this.showTop = false;
                next.showBottom = false;
            } else {
                // Top
                this.showBottom = false;
                next.showTop = false;
            }
        } else {
            if (this.x == next.x - 1) {
                this.showRight = false;
                next.showLeft = false;
            } else {
                this.showLeft = false;
                next.showRight = false;
            }
        }
        return next;
    }
}