interface PathAndLetters {
  path: string; // Represents the path traversed through the grid
  letters: string; // Stores the letters encountered along the path
}

function findPathAndLetters(grid: string[][]): PathAndLetters {
  let path: string = ""; // Initialize path string
  let letters: string = ""; // Initialize letters string to store encountered letters
  let x: number = 0; // Initialize x-coordinate
  let y: number = grid.findIndex((row) => row.includes(">")); // Initialize y-coordinate starting from the row with '>'
  let dx: number = 1; // Initialize horizontal movement direction
  let dy: number = 0; // Initialize vertical movement direction
  let cTurned: boolean = false; // Flag to track if a 'C' has already turned
  let cCount: number = 0; // Counter for 'C' characters encountered

  while (true) {
    if (y < 0 || y >= grid.length || x < 0 || x >= grid[y].length) {
      break; // Out of grid boundary
    }

    const currentChar: string = grid[y][x];
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
      } else {
        // Moving vertically
        dy = 0;
        dx = x - 1 >= 0 && grid[y][x - 1] !== " " ? -1 : 1;
      }
    } else if (currentChar === "C") {
      // Check if this 'C' character should turn
      if (!cTurned && cCount === 0) {
        cTurned = true;
        cCount++;
      }
    }

    x += dx; // Update x-coordinate based on movement direction
    y += dy; // Update y-coordinate based on movement direction
  }

  return { path, letters }; // Return the path and encountered letters
}

//Assignment
const grid: string[][] = [
  [">", "-", "-", "-", "A", "-", "@", "-", "+"],
  [" ", " ", " ", " ", "", " ", " ", " ", "|"],
  ["+", "-", "U", "-", "+", " ", "", " ", "C"],
  ["|", " ", " ", " ", "|", "", " ", " ", "|"],
  ["s", " ", " ", " ", "C", "-", "-", "-", "+"],
];

// Example test
const example: string[][] = [
  [">", "-", "-", "-", "A", "-", "", "-", "+"],
  [" ", " ", " ", " ", "", " ", " ", " ", "|"],
  ["s", "-", "B", "-", "+", " ", "", " ", "C"],
  [" ", " ", " ", " ", "|", "", " ", " ", "|"],
  [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
];

const { path, letters } = findPathAndLetters(grid);
console.log("Path:", path);
console.log("Letters:", letters);
