import { Automaton } from "./Automaton";
import { CONWAY, DAY_NIGHT, HIGHLIFE } from "../../constantes/constantes";

export class GameOfLife extends Automaton {
  constructor(matrix, variant) {
    super(matrix, 2); // The game of life has always 2 states
    this.variant = variant;
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
    // Return the next state of the cell based on the simulation variant
    const neighbour = this.countNeighbours(indR, indC, 1); // Count the cells alive
    let nextCell = 0; // NextState of the cell

    switch (this.variant) {
      // Select the right rules based on the variant
      case CONWAY:
        nextCell = this.rulesConway(this.matrix[indR][indC], neighbour);
        break;
      case DAY_NIGHT:
        nextCell = this.rulesDayNight(this.matrix[indR][indC], neighbour);
        break;
      case HIGHLIFE:
        nextCell = this.rulesHighLife(this.matrix[indR][indC], neighbour);
        break;
      default:
        console.error("Error in the variant selection");
        break;
    }

    return nextCell;
  }

  rulesConway(cState, neighbour) {
    // Compute the nextState of the cell based on the rules of the game of life by Conway
    // cState -> current state of the cell
    // neighboor -> number of cell alive around the cell
    if (neighbour === 3) {
      // 3 neighbours, the cell live
      // If already living, stay in this state
      return 1;
    } else if (neighbour === 2) {
      // stay in is current status
      return cState;
    } else {
      // die
      return 0;
    }
  }

  rulesDayNight(cState, neighbour) {
    // Compute the nextState of the cell based on the variant day & night of the game of life
    // cState -> current state of the cell
    // neighboor -> number of cell alive around the cell

    const nbDeadN = 8 - neighbour; // Number of dead neighbour based on the number of alive neighboor

    if (cState === 0) {
      // The current cell is dead
      if (nbDeadN === 3 || nbDeadN === 6 || nbDeadN === 7 || nbDeadN === 8) {
        return 1;
      }
      return 0;
    } else {
      // the cell is alive
      if (
        neighbour === 3 ||
        neighbour === 4 ||
        neighbour === 6 ||
        neighbour === 7 ||
        neighbour === 8
      ) {
        return 1;
      }
      return 0;
    }
  }

  rulesHighLife(cState, neighbour) {
    // Compute the nextState of the cell based on the variant HighLife of the game of life
    // cState -> current state of the cell
    // neighboor -> number of cell alive around the cell

    if (cState === 0) {
      // The current cell is dead
      if (neighbour === 3 || neighbour === 6) {
        return 1;
      }
    } else {
      // the cell is alive
      if (neighbour === 2 || neighbour === 3) {
        return 1;
      }
    }

    return 0;
  }
}
