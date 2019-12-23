import { Automaton } from "./Automaton";

export class Conway extends Automaton {
  constructor(matrix) {
    super(matrix, 2);
  }

  changeValue(indR, indC) {
    // (indC, indR) are the coordinates of the cell
    // indR -> value of the row
    // indC -> value of the column
    // Return the value to put in the matrix
    // Either dead 0 or alive 1

    return (this.matrix[indR][indC] + 1) % this.nbStates;
  }

  rules(indR, indC) {
    // (indC, indR) are the coordinates of the cell
    // indR -> value of the row
    // indC -> value of the column
    // Return the next state of the cell
    const neighbour = this.countNeighbours(indR, indC, 1); // Count the cells alive

    if (neighbour === 3) {
      // 3 neighbours, the cell live
      // If already living, stay in this state
      return 1;
    } else if (neighbour === 2) {
      // stay in is current status
      return this.matrix[indR][indC];
    } else {
      // die
      return 0;
    }
  }
}
