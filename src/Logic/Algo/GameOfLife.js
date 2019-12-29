import { Automaton } from "./Automaton";
import { CONWAY, DAY_NIGHT, HIGHLIFE } from "../../constantes/constantes";

export class GameOfLife extends Automaton {
  constructor(map, nbR, nbC, variant) {
    super(map, 2, nbR, nbC); // The game of life has always 2 states

    this.fNext = undefined; // Function to call each next
    // Depend on the variant choosen

    switch (variant) {
      // Select the right rules based on the variant
      case CONWAY:
        this.fNext = this.rulesConway;
        break;
      case DAY_NIGHT:
        this.fNext = this.rulesDayNight;
        break;
      case HIGHLIFE:
        this.fNext = this.rulesHighLife;
        break;
      default:
        console.error("Error in the variant selection");
        break;
    }
  }

  rules(indR, indC) {
    // (indC, indR) are the coordinates of the cell
    // indR -> value of the row
    // indC -> value of the column
    // Return the next state of the cell based on the simulation variant
    const cellValue = this.getValueCell(indR, indC);
    const neighbour = this.countNeighbours(indR, indC, 1); // Count the cells alive

    const nextCell = this.fNext(cellValue, neighbour); // NextState of the cell

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
