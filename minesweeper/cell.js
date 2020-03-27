class Cell {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.mine = random() < 0.05;
        this.mineCount = 0;

        this.possibleSweep = false;
        this.sweeped = false;
    }

    setup() {
        let neighbors = grid.neighbors(this.x, this.y);
        let neighborsWithMine = neighbors.filter(function(cell) {
            return cell.mine;
        });

        this.mineCount = neighborsWithMine.length;
    }


    show() {
        fill(230);
        stroke(51);
        strokeWeight(5);
        rect(this.x * this.size, this.y * this.size, this.size, this.size);
        if (this.mine) {
            fill(51);
            ellipse(
                this.x * this.size + this.size / 2, 
                this.y * this.size + this.size / 2, 
                this.size / 2, 
                this.size / 2
            );    
        } else if (this.mineCount > 0) {
            fill(51);
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(20);
            text(
                this.mineCount, 
                this.x * this.size + this.size / 2, 
                this.y * this.size + this.size / 2
            );
        }

        if (this.sweeped) {
            // Show playfield
        } else if(this.possibleSweep) {
            fill(0, 230, 0);
            noStroke();
            rect(this.x * this.size, this.y * this.size, this.size, this.size);    
        } else {
            fill(51);
            stroke(255);
            strokeWeight(5);
            rect(this.x * this.size, this.y * this.size, this.size, this.size);    
        }
    }

    sweep() {
        if (this.mine) return false;
        if (this.sweeped) return;
        this.sweeped = true;

        if(this.mineCount > 0) return;

        let done = [this];
        let todo = grid.neighbors(this.x, this.y);

        while(todo.length > 0) {
            let cell = todo.pop();
            done.push(cell);

            if (cell.mine) continue;

            cell.sweeped = true;

            if(cell.mineCount > 0) continue;

            let neighborCells = grid.neighbors(cell.x, cell.y);
            neighborCells = neighborCells.filter(function (cell) { 
                return done.indexOf(cell) === -1;
            });

            neighborCells = neighborCells.filter(function (cell) { 
                return todo.indexOf(cell) === -1;
            });

            todo.push(...neighborCells);
        }
    }
}
