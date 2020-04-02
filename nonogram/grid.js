class Grid {

    constructor(solution, cellSize) {
        this.rows = solution.length;
        this.cols = solution[0].length;
        this.horizontal = [];
        this.vertical = [];
        this.cellSize  = cellSize;
        this.maxCellsHorizontal = 0;
        this.maxCellsVertical = 0;

        this.storage = [];

        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.cols; i++) {
                this.storage.push(new Cell(i, j, solution[j][i], cellSize));
            }
        }
    }

    offsetCell(x, y) {
        x = x - this.maxCellsHorizontal;
        y = y - this.maxCellsVertical;

        return this.cell(x, y);
    }

    setup() {
        this.calculateHorizontal();
        this.calculateVertical();

        let columnSizes = this.vertical.map(function(col) { return col.length});
        this.maxCellsVertical = max(columnSizes);

        let rowSizes = this.horizontal.map(function(row) { return row.length});
        this.maxCellsHorizontal = max(rowSizes);
    }

    show() {
        this.showHorizontal();
        this.showVertical();

        for (let cell of this.storage) {
            cell.show(this.maxCellsHorizontal, this.maxCellsVertical);
        }
    }

    checkWinning() {
        let solutionCells = this.storage.filter((cell) => cell.solution);
        let nonActivatedCells = solutionCells.filter((cell) => !cell.activated);

        return nonActivatedCells.length === 0;
    }

    /*********
     * Private functions
     */

    cell(x, y) {
        if (x < 0 || x >= this.cols) return;
        if (y < 0 || y >= this.rows) return;
        return this.storage[x + this.cols * y];
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

    showHorizontal() {
        for (let j=0; j < this.rows; j++) {
            for(let i=0; i < this.maxCellsHorizontal; i++) {
                stroke(51);
                fill(255);
                strokeWeight(1);
                rect(
                    i * this.cellSize, 
                    (j + this.maxCellsVertical) * this.cellSize, 
                    this.cellSize, 
                    this.cellSize
                );
                noStroke();
                fill(51);
                textAlign(CENTER, CENTER);
                textSize(20);
                if(this.horizontal[j][i]) {
                    text(this.horizontal[j][i],                     
                        i * this.cellSize + this.cellSize / 2, 
                        (j + this.maxCellsVertical) * this.cellSize + this.cellSize / 2);
                }
            }
        }
    }

    showVertical() {
        for (let i=0; i < this.cols; i++) {
            for(let j=0; j < this.maxCellsHorizontal; j++) {
                stroke(51);
                fill(255);
                strokeWeight(1);
                rect(
                    (i + this.maxCellsHorizontal) * this.cellSize, 
                    j * this.cellSize, 
                    this.cellSize, 
                    this.cellSize
                );
                noStroke();
                fill(51);
                textSize(20);
                textAlign(CENTER, CENTER);
                if(this.vertical[i][j]) {
                    text(this.vertical[i][j],                     
                        (i + this.maxCellsHorizontal) * this.cellSize  + this.cellSize / 2, 
                        j * this.cellSize+ this.cellSize / 2);
                }
            }
        }
    }
}
