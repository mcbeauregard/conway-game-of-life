<h1>Conway's Game of Life</h1>
<p>A JavaScript example of Conway's Game of Life.</p>

<h2>What is Game of Life?</h2>
<p>Read about it here: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life</p>

<h2>Demo</h2>
<p>Check it out online at https://jsbin.com/zadizaf</p>

<h2>How to Run</h2>

Set up your grid in an html file:
```
<canvas id="myGrid" 
width="300" height="300" 
style="border:1px 
solid #A9A9A9;">
</canvas>
```

Set up parameters:
```
var gridRow = 300;
var gridColumn = 300;
var theGrid = createArray(gridColumn);
var newGrid = createArray(gridColumn);

startGrid(); // populates grid so you can start game, fills in squares randomly
runGrid(); // main loop
```
Create a function to anmiate the grid:
```
function runGrid() { 
    currentGrid(); //  current state of grid
    updateGrid(); // updates to new state of grid
    requestAnimationFrame(runGrid); // repeats 
}
```
Create a two dimensional array:
```
function createArray(rows) { // 2 dimensional array
    var arr = [];
    for (var i = 0; i < rows; i++) {
        arr[i] = [];
    }
    return arr;
}
```

Populate your grid:
```
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
```

Create a function for your current state:
```
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
```

Create a function to update your grid to the new state:
```
function updateGrid() { 
    for (var r = 1; r < gridRow - 1; r++) {
        for (var c = 1; c < gridColumn - 1; c++) { 
            var countCells = 0;
```
