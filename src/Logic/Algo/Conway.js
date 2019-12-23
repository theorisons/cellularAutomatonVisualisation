import { Automaton } from "./Automaton";

export class Conway extends Automaton {
  constructor(matrix) {
    super(matrix, 2);
  }

  changeValue(x, y) {
    // x and y are the coordinates of the cell to check
    // Return the value to put in the matrix
    // Either dead 0 or alive 1

    return (this.matrix[y][x] + 1) % this.nbStates;
  }

  rules(x, y) {
    // x and y are the coordinates of the cell to check
    // Return the next state of the cell
    const neighbour = this.countNeighbours(x, y, 1); // Count the cells alive

    if (neighbour === 3) {
      // 3 neighbours, the cell live
      // If already living, stay in this state
      return 1;
    } else if (neighbour === 2) {
      // stay in is current status
      return this.matrix[y][x];
    } else {
      // die
      return 0;
    }
  }
}
