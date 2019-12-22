import { Automaton } from "./Automaton";
import { stat } from "fs";

const MAX_STATES = 4;

export class Schelling extends Automaton {
  constructor(matrix) {
    super(matrix);
  }

  rules(position) {
    // Position contains position x and y of the cell to check
    // Return the next state of the cell
    const currentState = this.matrix[position.y][position.x];
    const stateToCheck = (currentState + 1) % MAX_STATES;

    const neighbour = this.countNeighbours(position, currentState); // Count the cells alive

    console.log(
      `x ${position.x}, y ${position.y}, cS ${currentState}, sC ${stateToCheck}, n ${neighbour}`
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
