import React from "react";
import Controls from "./Controls";
import Windows from "../Display/Windows";
import { Conway } from "./Algo/Conway";

export default class CellularGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      m: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      nM: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0]
      ]
    };
  }

  displayMatrix(m) {
    let val = m.reduce((p, c) => (p = `${p}${c}`));
    return <p>{val}</p>;
  }

  nextS() {
    let nS = this.state;
    let conway = new Conway(nS.nM);

    const m = conway.getMatrix();

    const nM = conway.next();

    this.setState({
      m: m,
      nM: nM
    });
  }

  render() {
    return (
      <div>
        <h1>Automate Cellulaire</h1>
        <div>{this.state.m.map(el => this.displayMatrix(el))}</div>
        <hr />
        <div>
          <div>{this.state.nM.map(el => this.displayMatrix(el))}</div>
        </div>

        <button onClick={() => this.nextS()}>Bob</button>
        {/* <Windows /> */}
        {/* <Controls /> */}
      </div>
    );
  }
}
