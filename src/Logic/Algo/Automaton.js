import {
  getKeyFromCoordinates,
  getCoordinatesFromKey,
  getValueCell
} from "../../constantes/utilities";

export class Automaton {
  constructor(map, nbStates, nbR, nbC) {
    // Map contains the board
    // nbStates number of state of the automaton
    // nbR, nbC size of the board
    // two functions to handle key in the map

    this.map = map; // Matrix is use as reference
    this.nbStates = nbStates; // Nb of states in the simulation

    this.nbR = nbR; // Number of rows
    this.nbC = nbC; // Number of columns
  }

  getValueCell(indR, indC) {
    // Return the value of the cell at coordinates (indC, indR)

    return getValueCell(indR, indC, this.map);
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
        key = getKeyFromCoordinates(r, c);
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
    let cKey; // key to store in the map

    this.map.forEach((value, key) => {
      // Iterate over all alive cells
      const { indR, indC } = getCoordinatesFromKey(key);

      // Iterate over the neighboors
      for (let r = indR - 1; r <= indR + 1; r++) {
        for (let c = indC - 1; c <= indC + 1; c++) {
          cValue = this.rules(r, c);
          if (cValue !== 0) {
            // Only store alive cell
            cKey = getKeyFromCoordinates(r, c);

            nMap.delete(cKey); // in case the cell was already visited
            nMap.set(cKey, cValue);
          }
        }
      }
    });

    this.map = nMap; // update the new map reference

    return nMap;
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

    return (this.getValueCell(indR, indC) + 1) % this.nbStates;
  }

  countNeighbours(indR, indC, vToCheck) {
    // (indC, indR) are the coordinates of the cell
    // vToCheck is the state of the neighbour to check

    // Values to iterate (ie Neighboors)

    let compt = 0;
    let cVal; // We can just look at the map. Because 0 aren't store

    // Iterate over the neighboors
    for (let r = indR - 1; r <= indR + 1; r++) {
      for (let c = indC - 1; c <= indC + 1; c++) {
        if (r !== indR || c !== indC) {
          // We don't count the cell itself
          cVal = this.getValueCell(r, c);
          if (cVal === vToCheck) {
            // Count the state of the cell
            compt += 1;
          }
        }
      }
    }

    return compt;
  }
}
