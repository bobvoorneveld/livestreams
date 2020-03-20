class Grid {
    constructor(rows, cols, cellSize) {
        this.rows = rows;
        this.cols = cols;

        this.storage = [];

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                this.storage.push(new Cell(i, j, cellSize));
            }
        }
    }

    show() {
        for (let cell of this.storage) {
            cell.show();
        }
    }

    // Returned a cell on given position
    cell(x, y) {
        if (x < 0) return;
        if (y < 0) return;
        if (x > this.cols) return;
        if (y > this.rows) return;
        return this.storage[y * this.cols + x];
    }

    neighbours(x, y) {
        let neighbours = [];
        let top = this.cell(x, y - 1);
        if (top && !top.visited) {
            neighbours.push(top);
        }

        let right = this.cell(x + 1, y);
        if (right && !right.visited) {
            neighbours.push(right);
        }
        let bottom = this.cell(x, y+1);
        if (bottom && !bottom.visited) {
            neighbours.push(bottom);
        }
        let left = this.cell(x - 1, y);
        if (left && !left.visited) {
            neighbours.push(left);
        }

        return neighbours;
    }
}
