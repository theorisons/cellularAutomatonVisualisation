export class Automaton {
  constructor(matrix, nbStates) {
    // Init the object with the board
    // All the cells status

    this.matrix = matrix; // Matrix is use as reference
    this.nbR = this.matrix.length;
    this.nbC = this.matrix[0].length;
    this.nbStates = nbStates; // Nb of states in the simulation
  }

  getMatrix() {
    // Return the current matrix of the state of cells
    return this.matrix;
  }

  next() {
    // Compute the next state of the simulation
    let nMatrix = [];
    let tmpR = [];

    for (let r = 0; r < this.nbR; r++) {
      // Iterate over the board, on apply rules on each cell
      tmpR = []; // Next row of the matrix

      for (let c = 0; c < this.nbC; c++) {
        tmpR.push(this.rules(c, r)); // Calcul of the futur state of the cell
      }

      nMatrix.push(tmpR);
    }

    this.matrix = nMatrix;

    return nMatrix;
  }

  rules(x, y) {
    // x and y are the coordinates of the cell to check
    // Define all the rules of the simulation
    // Kind of abstract method
    // Define in the children
    // Return the next state of the cell
  }

  changeValue(x, y) {
    // x and y are the coordinates of the cell to check
    // Define how to change the status of a cell
    // Kind of abstract method
    // Define in the children
    // Return the value to put in the matrix
  }

  countNeighbours(x, y, vToCheck) {
    // x and y are the coordinates of the cell to check
    // vToCheck is the state of the neighbour to check

    // Values to iterate (ie Neighboors)
    const startRow = this.start(y);
    const endRow = this.end(y, this.nbR);

    const startCol = this.start(x);
    const endCol = this.end(x, this.nbC);

    let compt = 0;

    for (let r = startRow; r <= endRow; r++) {
      // Iterate over the neighboors
      for (let c = startCol; c <= endCol; c++) {
        if (r !== y || c !== x) {
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
