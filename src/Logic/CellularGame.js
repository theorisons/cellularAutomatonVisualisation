import React from "react";
import Controls from "./Controls";
import Windows from "../Display/Windows";
import { Conway } from "./Algo/Conway";

export default class CellularGame extends React.Component {
  displayMatrix(m) {
    let val = m.reduce((p, c) => (p = `${p}${c}`));
    return <p>{val}</p>;
  }

  render() {
    const bob = [
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0]
    ];
    let conway = new Conway(bob);

    const m = conway.getMatrix();

    const nM = conway.next();

    return (
      <div>
        <h1>Automate Cellulaire</h1>
        <div>
          {this.displayMatrix(m[0])}
          {this.displayMatrix(m[1])}
          {this.displayMatrix(m[2])}
        </div>
        <hr />
        <div>
          {this.displayMatrix(nM[0])}
          {this.displayMatrix(nM[1])}
          {this.displayMatrix(nM[2])}
        </div>
        {/* <Windows /> */}
        {/* <Controls /> */}
      </div>
    );
  }
}
