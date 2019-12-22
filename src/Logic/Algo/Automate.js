export class Automate {
  constructor(matrix) {
    // Init the object with the board
    // All the cells status

    this.matrix = matrix; // Matrix is use as reference
    this.nbR = this.matrix.length;
    this.nbC = this.matrix[0].length;
  }

  getMatrix() {
    // Return the current matrix of the state of cells
    return this.matrix;
  }

  next() {
    // Compute the next state of the simulation
    let nMatrix = [];
    let tmpR = [];

    let position = {
      // Position to compute
      x: 0,
      y: 0
    };

    for (let r = 0; r < this.nbR; r++) {
      // Iterate over the board, on apply rules on each cell
      tmpR = []; // Next row of the matrix
      position.y = r;

      for (let c = 0; c < this.nbC; c++) {
        position.x = c;
        tmpR.push(this.rules(position)); // Calcul of the futur state of the cell
      }

      nMatrix.push(tmpR);
    }

    this.matrix = nMatrix;

    return nMatrix;
  }

  rules(position) {
    // Position contains position x and y of the cell to check
    // Define all the rules of the simulation
    // Kind of abstract method
    // Define in the children
    // Return the next state of the cell
  }

  countNeighbours(position, vToCheck) {
    // Position contains position x and y of the cell to check
    // vToCheck is the state of the neighbour to check
    const { x, y } = position;

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

    // Spherical Matrix
    // let compt = 0;

    // for (let r = -1; r <= 1; r++) {
    //   // Iterate over the neighboors
    //   for (let c = -1; c <= 1; c++) {
    //     if (r !== 0 || c !== 0) {
    //       // We don't count the cell itself
    //       const xC = (x + this.nbC + c) % this.nbC;
    //       const yC = (y + this.nbR + r) % this.nbR;
    //       if (this.matrix[yC][xC] === vToCheck) {
    //         // Count the state of the cell
    //         compt += 1;
    //       }
    //     }
    //   }
    // }

    return compt;
  }

  start(posi) {
    // return the value where start the counting of the neighbour
    if (posi === 0) {
      // We don't use circular board
      return 0;
    }
    return posi - 1;
  }

  end(posi, size) {
    // return the value where end the counting of the neighbour
    if (posi === size - 1) {
      // We don't use circular board
      return posi;
    }
    return posi + 1;
  }
}
