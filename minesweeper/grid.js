class Grid {

    constructor(rows, cols, size) {
        this.rows = rows;
        this.cols = cols;
        this.size = size;

        this.storage = [];

        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.cols; i++) {
                this.storage.push(new Cell(i, j, this.size));
            }
        }
    }

    cell(x, y) {
        if (x < 0 || x >= this.cols) return;
        if (y < 0 || x >= this.rows) return;
        return this.storage[x + this.cols * y];
    }

    neighbors(x, y) {
        let neighbors = [];
        neighbors.push(this.cell(x - 1, y - 1));
        neighbors.push(this.cell(x, y - 1));
        neighbors.push(this.cell(x + 1, y - 1));
        neighbors.push(this.cell(x - 1, y));
        neighbors.push(this.cell(x + 1, y));
        neighbors.push(this.cell(x - 1, y + 1));
        neighbors.push(this.cell(x, y + 1));
        neighbors.push(this.cell(x + 1, y + 1));

        neighbors = neighbors.filter(function(cell) {
            return cell !== undefined;
        });
        return neighbors;
    }

    setup() {
        for (let cell of this.storage) {
            cell.setup();
        }        
    }

    show() {
        for (let cell of this.storage) {
            cell.show();
        }
    }

    hasWon() {
        let cellsWithMine = this.storage.filter(function(cell) {
            return cell.mine;
        })

        let cellsNotFlagged = cellsWithMine.filter(function(cell) {
            return !cell.flagged;
        });

        let cellsWithoutMine = this.storage.filter(function(cell) {
            return !cell.mine;
        });

        let cellFlagged = cellsWithoutMine.filter(function(cell) {
            return cell.flagged;
        });

        return cellsNotFlagged.length === 0 && cellFlagged.length === 0;
    }
}
