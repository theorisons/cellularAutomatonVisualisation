export class Automaton {
  constructor(matrix, nbStates) {
    // Init the object with the board
    // All the cells status

    this.matrix = matrix; // Matrix is use as reference
    this.nbR = this.matrix.length; // Number of rows
    this.nbC = this.matrix[0].length; // Number of columns
    this.nbStates = nbStates; // Nb of states in the simulation
  }

  getMatrix() {
    // Return the current matrix of the state of cells
    return this.matrix;
  }

  randomMatrix() {
    // Return a matrix with random state for the cell
    let nMatrix = [];
    let tmpR = [];

    for (let r = 0; r < this.nbR; r++) {
      // Iterate over the board
      tmpR = []; // Next row of the matrix

      for (let c = 0; c < this.nbC; c++) {
        tmpR.push(Math.floor(Math.random() * Math.floor(this.nbStates))); // Randomized a state
      }

      nMatrix.push(tmpR);
    }
    this.matrix = nMatrix; // update the new matrix reference

    return nMatrix;
  }

  next() {
    // Compute the next state of the simulation
    let nMatrix = [];
    let tmpR = [];

    for (let r = 0; r < this.nbR; r++) {
      // Iterate over the board, on apply rules on each cell
      tmpR = []; // Next row of the matrix

      for (let c = 0; c < this.nbC; c++) {
        tmpR.push(this.rules(r, c)); // Calcul of the futur state of the cell
      }

      nMatrix.push(tmpR);
    }

    this.matrix = nMatrix; // update the new matrix reference

    return nMatrix;
  }

  rules(indR, indC) {
    // (indC, indR) are the coordinates of the cell
    // indR -> value of the row
    // indC -> value of the column
    // Define all the rules of the simulation
    // Kind of abstract method
    // Define in the children
    // Return the next state of the cell
  }

  changeValue(indR, indC) {
    // (indC, indR) are the coordinates of the cell
    // indR -> value of the row
    // indC -> value of the column
    // Define how to change the status of a cell
    // Kind of abstract method
    // Define in the children
    // Return the value to put in the matrix
  }

  countNeighbours(indR, indC, vToCheck) {
    // (indC, indR) are the coordinates of the cell
    // vToCheck is the state of the neighbour to check

    // Values to iterate (ie Neighboors)
    const startRow = this.start(indR);
    const endRow = this.end(indR, this.nbR);

    const startCol = this.start(indC);
    const endCol = this.end(indC, this.nbC);

    let compt = 0;

    for (let r = startRow; r <= endRow; r++) {
      // Iterate over the neighboors
      for (let c = startCol; c <= endCol; c++) {
        if (r !== indR || c !== indC) {
          // We don't count the cell itself
          if (this.matrix[r][c] === vToCheck) {
            // Count the state of the cell
            compt += 1;
          }
        }
      }
    }

    return compt;
  }

  start(val) {
    // return the value where start the counting of the neighbour
    if (val === 0) {
      // We don't use circular board
      return 0;
    }
    return val - 1;
  }

  end(val, size) {
    // return the value where end the counting of the neighbour
    if (val === size - 1) {
      // We don't use circular board
      return val;
    }
    return val + 1;
  }
}
