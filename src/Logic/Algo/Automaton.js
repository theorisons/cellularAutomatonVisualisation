export class Automaton {
  constructor(map, nbStates, nbR, nbC, keyFromCoordinates, coordinatesFromKey) {
    // Map contains the board
    // nbStates number of state of the automaton
    // nbR, nbC size of the board

    this.map = map; // Matrix is use as reference
    this.nbStates = nbStates; // Nb of states in the simulation

    this.nbR = nbR; // Number of rows
    this.nbC = nbC; // Number of columns

    // Key and Coordinates in the map
    this.keyFromCoordinates = keyFromCoordinates;
    this.coordinatesFromKey = coordinatesFromKey;
  }

  getMap() {
    // Return the current map of the state of cells
    return this.map;
  }

  getValue(indR, indC) {
    // Return the value that correspond to the coordinates
    const value = this.map.get(this.keyFromCoordinates(indR, indC));

    if (value === undefined) {
      // The value is not set so the cell is dead
      return 0;
    }
    return value;
  }

  randomBoard() {
    // Init a board with random state for the cell
    // Return the map of the new values
    let nMap = new Map();

    let key = null; // Key in the map
    let value = null; // value in the map

    for (let r = 0; r < this.nbR; r++) {
      // Iterate over the board
      for (let c = 0; c < this.nbC; c++) {
        key = this.keyFromCoordinates(r, c);
        value = Math.floor(Math.random() * Math.floor(this.nbStates));

        if (value !== 0) {
          // We only store alive cells
          nMap.set(key, value);
        }
      }
    }

    this.map = nMap; // update the new map reference

    return nMap;
  }

  next() {
    // Compute the next state of the simulation
    let nMap = new Map();
    let cValue; // value of the next state of the cell

    this.map.forEach((value, key) => {
      // Iterate over all alive cells
      const { indR, indC } = this.coordinatesFromKey(key);

      // Iterate over the neighboors
      for (let r = indR - 1; r <= indR + 1; r++) {
        for (let c = indC - 1; c <= indC + 1; c++) {
          cValue = this.rules(r, c);
          if (cValue !== 0) {
            // Only store alive cell
            nMap.set(this.keyFromCoordinates(r, c), cValue);
          }
        }
      }
    });

    this.map = nMap; // update the new map reference

    return nMap;
  }

  checkCells() {
    // Iterate over the value of the cells
    // Return a boolean
    // true => the board is correct according to the automaton
    // false => incorrect

    let values = this.map.values(); // Map iterator that contain value

    for (let s = 0; s < this.map.size; s++) {
      // Iterate over the value of the cells
      if (!this.checkValue(values.next().value)) {
        return false;
      }
    }

    return true;
  }

  checkValue(value) {
    // Check if the value can be used in the automaton
    // Return a boolean

    return 0 <= value && value < this.nbStates;
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
    // Return the next value of the cell
    // Circular change

    return (this.getValue(indR, indC) + 1) % this.nbStates;
  }

  countNeighbours(indR, indC, vToCheck) {
    // (indC, indR) are the coordinates of the cell
    // vToCheck is the state of the neighbour to check

    // Values to iterate (ie Neighboors)

    let compt = 0;

    // Iterate over the neighboors
    for (let r = indR - 1; r <= indR + 1; r++) {
      for (let c = indC - 1; c <= indC + 1; c++) {
        if (r !== indR || c !== indC) {
          // We don't count the cell itself

          if (this.map.get(this.keyFromCoordinates(r, c)) === vToCheck) {
            // Count the state of the cell
            compt += 1;
          }
        }
      }
    }

    return compt;
  }
}
