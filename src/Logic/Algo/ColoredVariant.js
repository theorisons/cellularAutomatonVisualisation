import { Automaton } from "./Automaton";

export class ColoredVariant extends Automaton {
  constructor(
    map,
    nbR,
    nbC,
    getKeyFromCoordinates,
    getCoordinatesFromKey,
    nbStates
  ) {
    super(
      map,
      nbStates,
      nbR,
      nbC,
      getKeyFromCoordinates,
      getCoordinatesFromKey
    );
  }

  // rules(indR, indC) {
  //   // (indC, indR) are the coordinates of the cell
  //   // indR -> value of the row
  //   // indC -> value of the column
  //   // Return the next state of the cell
  //   const currentState = this.matrix[indR][indC];

  //   let neighbourL = []; // Count the cells alive
  //   for (let col = 1; col < this.nbStates; col++) {
  //     // Count the number of colored neighboor of the cell
  //     neighbourL.push(this.countNeighbours(indR, indC, col));
  //   }

  //   const nbColored = neighbourL.reduce(
  //     count,
  //     current => (count = count + current)
  //   ); // Number of neighboor alive

  //   if (currentState === 0) {
  //     // the cell is dead
  //     if (nbColored === 3) {
  //       // The cell will live
  //     }
  //     return 0; // The cell stay dead
  //   }
  //   // the cell is alive

  //   if (nbColored === 2 || nbColored === 3) {
  //     return currentState; // The cell stay in this current state
  //   }
  //   return 0; // The cell die
  // }

  rules(indR, indC) {
    // (indC, indR) are the coordinates of the cell
    // indR -> value of the row
    // indC -> value of the column
    // Return the next state of the cell
    const currentState = this.getValue(indR, indC);
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
