import { Automaton } from "./Automaton";

export class GameOfLife extends Automaton {
  constructor(map, nbR, nbC, rules) {
    super(map, 2, nbR, nbC); // The game of life has always 2 states

    this.born = rules.born;
    this.survive = rules.survive;
  }

  rules(indR, indC) {
    // (indC, indR) are the coordinates of the cell
    // indR -> value of the row
    // indC -> value of the column
    // Return the next state of the cell based on the simulation variant
    const cellValue = this.getValueCell(indR, indC);
    const neighbour = this.countNeighbours(indR, indC, 1); // Count the cells alive

    const nextCell = this.ruleForCell(cellValue, neighbour); // NextState of the cell

    return nextCell;
  }

  ruleForCell(cState, neighbour) {
    if (cState === 0) {
      // the cell can born
      if (this.born[neighbour]) {
        return 1;
      }
      return 0;
    }
    // the cell can survive
    else {
      if (this.survive[neighbour]) {
        return 1;
      }
      return 0;
    }
  }
}
