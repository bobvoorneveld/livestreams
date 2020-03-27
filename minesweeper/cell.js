class Cell {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.mine = random() < 0.05;
        this.mineCount = 0;

        this.possibleSweep = false;
        this.possibleFlag = false;
        this.sweeped = false;
        this.flagged = false;
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
        } else if(this.flagged) {
            fill(51);
            stroke(255);
            strokeWeight(5);
            rect(this.x * this.size, this.y * this.size, this.size, this.size);
            
            noStroke();
            fill(0, 0, 255);
            ellipse(
                this.x * this.size + this.size / 2, 
                this.y * this.size + this.size / 2, 
                this.size / 2, 
                this.size / 2
            );    

        } else if(this.possibleSweep) {
            fill(0, 230, 0);
            noStroke();
            rect(this.x * this.size, this.y * this.size, this.size, this.size);    
        } else if(this.possibleFlag) {
            fill(255, 0, 0);
            noStroke();
            rect(this.x * this.size, this.y * this.size, this.size, this.size);    
        } else {
            fill(51);
            stroke(255);
            strokeWeight(5);
            rect(this.x * this.size, this.y * this.size, this.size, this.size);    
        }

        if (gameOver) {
            if (this.mine) {
                noStroke();
                fill(230, 0, 0);
                ellipse(
                    this.x * this.size + this.size / 2, 
                    this.y * this.size + this.size / 2, 
                    this.size / 2, 
                    this.size / 2
                );    
            }
        }
    }

    /**
     * Returns true if mine was hit (game over)
     * 
     * Otherwise, false, game is stil ok.
     */
    sweep() {
        if (this.flagged) return false;
        if (this.mine) return true;
        if (this.sweeped) return false;
        this.sweeped = true;

        if(this.mineCount > 0) return false;

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

        return false;
    }

    flag() {
        this.flagged = true;
    }
}
