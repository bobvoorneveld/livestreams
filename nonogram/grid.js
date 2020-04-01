class Grid {

    constructor(solution, cellSize) {
        this.rows = solution.length;
        this.cols = solution[0].length;
        this.horizontal = [];
        this.vertical = [];
        this.cellSize  = cellSize;

        this.storage = [];

        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.cols; i++) {
                this.storage.push(new Cell(i, j, solution[j][i], cellSize));
            }
        }
    }

    cell(x, y) {
        if (x < 0 || x >= this.cols) return;
        if (y < 0 || y >= this.rows) return;
        return this.storage[x + this.cols * y];
    }

    setup() {
        this.calculateHorizontal();
        this.calculateVertical();
    }

    calculateHorizontal() {
        for (let j = 0; j < this.rows; j++) {

            let row = [];
            let count = this.cell(0, j).solution;
            for (let i = 1; i < this.cols; i++) {
                let currentCell = this.cell(i, j);
                if(currentCell.solution !== 1) {
                    if (count > 0) {
                        row.push(count);
                        count = 0;
                    }
                } else {
                    count++;
                }
            }
            if (count > 0) {
                row.push(count);
            }
            this.horizontal.push(row);
        }
    }

    calculateVertical() {
        for (let i = 0; i < this.cols; i++) {

            let col = [];
            let count = this.cell(i, 0).solution;
            for (let j = 1; j < this.rows; j++) {
                let currentCell = this.cell(i, j);
                if(currentCell.solution !== 1) {
                    if (count > 0) {
                        col.push(count);
                        count = 0;
                    }
                } else {
                    count++;
                }
            }
            if (count > 0) {
                col.push(count);
            }
            this.vertical.push(col);
        }
    }

    show() {
        let columnSizes = this.vertical.map(function(col) { return col.length});
        let maxCellsVertical = max(columnSizes);

        let rowSizes = this.horizontal.map(function(row) { return row.length});
        let maxCellsHorizontal = max(rowSizes);

        this.showHorizontal(maxCellsVertical, maxCellsHorizontal);
        this.showVertical(maxCellsHorizontal, maxCellsVertical);

        for (let cell of this.storage) {
            cell.show(5, maxCellsVertical);
        }
    }

    showHorizontal(yOffset, maxCellsHorizontal) {
        for (let j=0; j < this.rows; j++) {
            for(let i=0; i < maxCellsHorizontal; i++) {
                stroke(51);
                fill(255);
                strokeWeight(1);
                rect(
                    i * this.cellSize, 
                    (j + yOffset) * this.cellSize, 
                    this.cellSize, 
                    this.cellSize
                );
                noStroke();
                fill(51);
                textAlign(CENTER, CENTER);
                if(this.horizontal[j][i]) {
                    text(this.horizontal[j][i],                     
                        i * this.cellSize + this.cellSize / 2, 
                        (j + yOffset) * this.cellSize + this.cellSize / 2);
                }
            }
        }
    }

    showVertical(xOffset, maxCellsVertical) {
        for (let i=0; i < this.cols; i++) {
            for(let j=0; j < xOffset; j++) {
                stroke(51);
                fill(255);
                strokeWeight(1);
                rect(
                    (i + xOffset) * this.cellSize, 
                    j * this.cellSize, 
                    this.cellSize, 
                    this.cellSize
                );
                noStroke();
                fill(51);
                textAlign(CENTER, CENTER);
                if(this.vertical[i][j]) {
                    text(this.vertical[i][j],                     
                        (i + xOffset) * this.cellSize  + this.cellSize / 2, 
                        j * this.cellSize+ this.cellSize / 2);
                }
            }
        }
        return maxCellsVertical;
    }
}
