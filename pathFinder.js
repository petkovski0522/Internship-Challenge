function findPathAndLetters(grid) {
    var path = ""; // Initialize path string
    var letters = ""; // Initialize letters string to store encountered letters
    var x = 0; // Initialize x-coordinate
    var y = grid.findIndex(function (row) { return row.includes(">"); }); // Initialize y-coordinate starting from the row with '>'
    var dx = 1; // Initialize horizontal movement direction
    var dy = 0; // Initialize vertical movement direction
    var cTurned = false; // Flag to track if a 'C' has already turned
    var cCount = 0; // Counter for 'C' characters encountered
    while (true) {
        if (y < 0 || y >= grid.length || x < 0 || x >= grid[y].length) {
            break; // Out of grid boundary
        }
        var currentChar = grid[y][x];
        if (currentChar === "s" || currentChar === " ") {
            path += currentChar;
            break;
        }
        if (/[A-Z]/.test(currentChar)) {
            letters += currentChar;
        }
        path += currentChar;
        if (currentChar === "+" || (currentChar === "C" && cCount === 1)) {
            // Change direction at '+'
            if (dx !== 0) {
                // Moving horizontally
                dx = 0;
                dy = y - 1 >= 0 && grid[y - 1][x] !== " " ? -1 : 1;
            }
            else {
                // Moving vertically
                dy = 0;
                dx = x - 1 >= 0 && grid[y][x - 1] !== " " ? -1 : 1;
            }
        }
        else if (currentChar === "C") {
            // Check if this 'C' character should turn
            if (!cTurned && cCount === 0) {
                cTurned = true;
                cCount++;
            }
        }
        x += dx; // Update x-coordinate based on movement direction
        y += dy; // Update y-coordinate based on movement direction
    }
    return { path: path, letters: letters }; // Return the path and encountered letters
}
//Assignment
var grid = [
    [">", "-", "-", "-", "A", "-", "@", "-", "+"],
    [" ", " ", " ", " ", "", " ", " ", " ", "|"],
    ["+", "-", "U", "-", "+", " ", "", " ", "C"],
    ["|", " ", " ", " ", "|", "", " ", " ", "|"],
    ["s", " ", " ", " ", "C", "-", "-", "-", "+"],
];
// Example test
var example = [
    [">", "-", "-", "-", "A", "-", "", "-", "+"],
    [" ", " ", " ", " ", "", " ", " ", " ", "|"],
    ["s", "-", "B", "-", "+", " ", "", " ", "C"],
    [" ", " ", " ", " ", "|", "", " ", " ", "|"],
    [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
];
var _a = findPathAndLetters(grid), path = _a.path, letters = _a.letters;
console.log("Path:", path);
console.log("Letters:", letters);
