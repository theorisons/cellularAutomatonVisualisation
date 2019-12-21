import { Automate } from "./Automate";

export class Conway extends Automate {
  constructor(matrix) {
    super(matrix);
  }

  rules(position) {
    // Position contains position x and y of the cell to check
    // Return the next state of the cell
    const neighbour = this.countNeighbours(position, 1); // Count the cells alive

    if (neighbour === 3) {
      // 3 neighbours, the cell live
      // If already living, stay in this state
      return 1;
    } else if (neighbour === 2) {
      // stay in is current status
      return this.matrix[position.y][position.x];
    } else {
      // die
      return 0;
    }
  }
}
