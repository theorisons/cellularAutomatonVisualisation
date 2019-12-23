import { Automaton } from "./Automaton";

const MAX_STATES = 4;

export class Schelling extends Automaton {
  constructor(matrix) {
    super(matrix, 8);
  }

  changeValue(x, y) {
    // x and y are the coordinates of the cell to check
    // Return the value to put in the matrix
    // Circular value based on the number of states

    return (this.matrix[y][x] + 1) % this.nbStates;
  }

  rules(x, y) {
    // x and y are the coordinates of the cell to check
    // Return the next state of the cell
    const currentState = this.matrix[y][x];
    const stateToCheck = (currentState + 1) % MAX_STATES;

    const neighbour = this.countNeighbours(x, y, currentState); // Count the cells alive

    console.log(
      `x ${x}, y ${y}, cS ${currentState}, sC ${stateToCheck}, n ${neighbour}`
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
