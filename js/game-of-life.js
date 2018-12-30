// Conway's game of life
// The game is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced players, by creating patterns with particular properties.

// grid
var gridRow = 300;
var gridColumn = 300;
var theGrid = createArray(gridColumn);
var newGrid = createArray(gridColumn);

startGrid(); // populates grid so you can start game, fills in squares randomly
runGrid(); // main loop

// functions for the animation frame
function runGrid() { 
    currentGrid(); //  current state of grid
    updateGrid(); // updates to new state of grid
    requestAnimationFrame(runGrid); // repeats 
}

function createArray(rows) { // 2 dimensional array
    var arr = [];
    for (var i = 0; i < rows; i++) {
        arr[i] = [];
    }
    return arr;
}

function startGrid() {  // populates grid
    for (var r = 0; r < gridRow; r++) { 
        for (var c = 0; c < gridColumn; c++) { 
            var rawRandom = Math.random(); 
            var improvedNum = (rawRandom * 2); //convert it to an int
            var randomBinary = Math.floor(improvedNum);
            if (randomBinary === 1) { // grid cells are either 1 or 0
                theGrid[r][c] = 1;
            } else {
                theGrid[r][c] = 0;
            }
        }
    }
}

function currentGrid() {  // creates current state of grid and style
    var g = document.getElementById("myGrid");
    var ctx = g.getContext("2d");
    ctx.clearRect(0, 0, 600, 600); // clear grid and relaunch
    for (var r = 1; r < gridRow; r++) { 
        for (var c = 1; c < gridColumn; c++) { 
            if (theGrid[r][c] === 1) {
                ctx.fillStyle = "#89cff0"; // colour of cells
                ctx.fillRect(r, c, 1, 1);
            }
        }
    }
}

function updateGrid() { // updates to new state of grid
    for (var r = 1; r < gridRow - 1; r++) {
        for (var c = 1; c < gridColumn - 1; c++) { 
            var countCells = 0;
          
            // counts surrounding cells
            countCells += theGrid[r - 1][c - 1]; //count top left
            countCells += theGrid[r - 1][c]; //count top center
            countCells += theGrid[r - 1][c + 1]; //count top right
            countCells += theGrid[r][c - 1]; //count center left
            countCells += theGrid[r][c + 1]; //count center right
            countCells += theGrid[r + 1][c - 1]; //count bottom left
            countCells += theGrid[r + 1][c]; //count bottom center
            countCells += theGrid[r + 1][c + 1]; //count bottom right

            if (theGrid[r][c] === 0) { 
                switch (countCells) {
                    case 3:
                        newGrid[r][c] = 1; // Dead cell rules: any dead cell with exactly three live surrounding cells becomes a live cell
                        break;
                    default:
                        newGrid[r][c] = 0; // Otherwise it stays dead
                }
            } else if (theGrid[r][c] === 1) { // Living cell rules
                switch (countCells) {
                    case 0:
                    case 1:
                        newGrid[r][c] = 0; // Fewer than 2 surrounding cells, dies of underpopulation
                        break;
                    case 2:
                    case 3:
                        newGrid[r][c] = 1; // Cells with 2 or 3 surrounding cells, lives on 
                        break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        newGrid[r][c] = 0; // Live cell with > 3 surrounding cells, dies of overpopulation
                        break;
                    default:
                        newGrid[r][c] = 0; //
          
                }

            }
        }
    }

    for (var r = 0; r < gridRow; r++) { 
        for (var c = 0; c < gridColumn; c++) { 
            theGrid[r][c] = newGrid[r][c];

        }
    }


}

