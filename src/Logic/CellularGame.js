import React from "react";
import Controls from "./Controls";
import Windows from "../Display/Windows";

import { Conway } from "./Algo/Conway";
import { TYPE_SIMULATION } from "../constantes/Constantes";

const INIT_CONTROLS = {
  speed: 0.5,
  type: TYPE_SIMULATION[0]
};

const INIT_WINDOWS = {
  click: false, // To handle when the user click
  nbR: 15, // Number of rows
  nbC: 20, // Number of columns
  size: 50, // Size of the blocs
  cells: [] // represent the board. Matrix of int
};

const initCells = (nbRows, nbColumns) => {
  // Init all the cells at 0
  let matrix = [];
  let tmpRow = [];

  for (let r = 0; r < nbRows; r++) {
    tmpRow = [];
    for (let c = 0; c < nbColumns; c++) {
      tmpRow.push(0);
    }
    matrix.push(tmpRow);
  }
  return matrix;
};

export default class CellularGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        ...INIT_CONTROLS
      },
      windows: {
        ...INIT_WINDOWS,
        cells: initCells(INIT_WINDOWS.nbR, INIT_WINDOWS.nbC) // Current states of the board
      }
    };
  }

  setStateWindows = newWindows => {
    let nextState = this.state;
    nextState.windows = newWindows;
    this.setState(nextState);
  };

  setStateControls = newControls => {
    let nextState = this.state;
    nextState.controls = newControls;
    this.setState(nextState);
  };

  getStateWindows = () => {
    return this.state.windows;
  };

  getStateControls = () => {
    return this.state.controls;
  };

  render() {
    return (
      <div>
        <h1>Automate Cellulaire</h1>

        <Windows
          getState={this.getStateWindows}
          setValues={this.setStateWindows}
        />

        <Controls
          getState={this.getStateControls}
          setValues={this.setStateControls}
        />
      </div>
    );
  }
}
