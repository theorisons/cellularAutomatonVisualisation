import { Automaton } from "./Automaton";

const MAX_STATES = 4;

export class Schelling extends Automaton {
  constructor(matrix) {
    super(matrix, 8);
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
    const stateToCheck = (currentState + 1) % MAX_STATES;

    const neighbour = this.countNeighbours(indR, indC, currentState); // Count the cells alive

    console.log(
      `x ${indC}, y ${indR}, cS ${currentState}, sC ${stateToCheck}, n ${neighbour}`
    );

    if (neighbour >= 3) {
      // 3 neighbours, the cell evolve
      return stateToCheck;
    } else {
      // Stay in current state
      return currentState;
    }
  }
}
