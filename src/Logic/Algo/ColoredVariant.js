import { Automaton } from "./Automaton";

export class ColoredVariant extends Automaton {
  constructor(map, nbR, nbC, nbStates) {
    super(map, nbStates, nbR, nbC);
  }

  rules(indR, indC) {
    // (indC, indR) are the coordinates of the cell
    // indR -> value of the row
    // indC -> value of the column
    // Return the next state of the cell
    const currentState = this.getValueCell(indR, indC);
    const nextState = this.changeValue(indR, indC);

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
