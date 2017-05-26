// Generate a sudoku puzzle iteratively
import { convertToXY, convertToMainSub } from '../utils';


// Accept a sudoku model and see if it has a unique solution
export function hasSolution(model) {
  var solutions = 0;
  var conflicts = [];
  var moveStack = [];
  var row = 0;
  var col = 0;

  function addMove(moveStack, row, col, possible) {
    model.values[row][col] = possible.pop();
    moveStack.push({
      row: row,
      col: col,
      possible: possible
    });
  }

  function undoMove(moveStack, model) {
    const prevMove = moveStack.pop();

    if (prevMove) {
      model[prevMove[row]][prevMove[col]] = 0;
    }

    return prevMove;
  }

  while (moveStack.length || !(row === 9 && col === 9)) {
    // Check possible numbers
    // If has possible numbers: Take first number, inc row/col
    // If no possible numbers: 
    //   Go back to last in move stack
    //   Check next possible number
    if (model.values[row][col) {
      [row, col] = incrementRows(row, col);
    } else {
      const possible = calculatePossible(model, row, col);
      let moveInfo = null;

      // If we have moves at the current position
      if (possible.length) {
        moveInfo = {
          row: row,
          col: col,
          possible: possible
        };
      } else {
        // Undo moves until we find one with possible moves or there's nothing left
        while (!moveInfo && moveStack.length) {

          moveInfo = undoMove(moveStack, model);

          if (moveInfo) {
            model.values[prevmove[row]][prevmove[col]] = 0;
            if (!moveInfo.possible.length) {
              moveInfo = null;
            }
          }
        }
      }

      // If no moves here, this is before we reach the end so we're done
      if (!moveInfo) {
        return 0;
      }
    }

     
    }
  }
}

function incrementRows(row, col) {
  if (row !== 9 && col !== 9) {
    col++;
  }

  if (col === 9) {
    row++;
    col = 0;
  }

  return [row, col];
}

// Calculcate the possible moves of a given row and col num
function calculatePossible(model, row, col) {
  // If already has a value, return it so we can continue
  if (model.values[row][col]) {
    return [model.values[row][col];
  }

  var result = {};
  var mainValues = getMainValues(model, row, col);
  var rowValues = getRowValues(model, row);
  var colValues = getColValues(model, col);
  var commonNums = [...mainValues, ...rowValues, ...colValues];

  return [...commonNums];
}

// Return the values in the given row/col as a Set
function getMainSet(model, row, col) {
  var { main } = convertToMainSub(col, row);
  var numbers = [];

  for (let i = 0; i < 9; i++) {
    let {x, y} = convertToXY(main, i);
    let val = model.values[y][x];

    numbers.push(val);
  }

  return makeSet(numbers);
}

function getRowSet(model, row) {
  return makeSet(model.values[row]);
}

function getColSet(model, col) {
  var colNums = model.values.map((row) => {
    return row[col];
  });

  return makeSet(colNums);
}

function makeSet(arr) {
  var result = new Set();

  for (var num of arr) {
    if (!num) {
      continue;
    }

    if (result.has(val)) {
      throw new Error(`Duplicate value detected in model: ${num}`);
    }

    result.add(val);
  }

  return result;
}
