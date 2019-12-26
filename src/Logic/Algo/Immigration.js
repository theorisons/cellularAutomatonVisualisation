import { Automaton } from "./Automaton";

export class Immigration extends Automaton {
  constructor(matrix) {
    super(matrix, 3);
  }

  changeValue(indR, indC) {
    // (indC, indR) are the coordinates of the cell
    // indR -> value of the row
    // indC -> value of the column
    // Return the value to put in the matrix
    // Circular value based on the number of states

    return (this.matrix[indR][indC] + 1) % this.nbStates;
  }

  rules(indR, indC) {
    // (indC, indR) are the coordinates of the cell
    // indR -> value of the row
    // indC -> value of the column
    // Return the next state of the cell
    const currentState = this.matrix[indR][indC];
    const nextState = (currentState + 1) % this.nbStates;

    const neighbour = this.countNeighbours(indR, indC, nextState); // Count the cells alive

    if (neighbour >= 3) {
      // 3 neighbours, the cell evolve
      return nextState;
    } else {
      // Stay in current state
      return currentState;
    }
  }
}
