import React from "react";
import Controls from "./Controls";
import Windows from "../Display/Windows";

import { Conway } from "./Algo/Conway";
import { TYPE_SIMULATION } from "../constantes/Constantes";

const INIT_CONTROLS = {
  // Initial state of the controls section
  speed: 0.5,
  type: TYPE_SIMULATION[0]
};

const INIT_WINDOWS = {
  // Initial state of the windows section
  click: false, // To handle when the user click
  nbR: 20, // Number of rows
  nbC: 25, // Number of columns
  size: 20, // Size of the blocs
  cells: [] // represent the board. Matrix of int
};

const initCells = (nbRows, nbColumns) => {
  // Init all the cells at 0 in the matrix
  let matrix = [];
  let tmpRow = [];

  for (let r = 0; r < nbRows; r++) {
    // iterate over the rows and columns of the matrix
    tmpRow = [];
    for (let c = 0; c < nbColumns; c++) {
      tmpRow.push(0); // set value to 0
    }
    matrix.push(tmpRow);
  }
  return matrix;
};

export default class CellularGame extends React.Component {
  // CellularGame contains the state of the controls and Windows sections
  constructor(props) {
    super(props);

    this.automate = null;

    this.state = {
      controls: {
        ...INIT_CONTROLS
      },
      windows: {
        ...INIT_WINDOWS,
        cells: initCells(INIT_WINDOWS.nbR, INIT_WINDOWS.nbC) // Init an empty board
      }
    };
  }

  step = () => {
    // Compute the next state
    let nextStateWindows = this.getStateWindows();
    nextStateWindows.cells = this.automate.next();

    nextStateWindows.bob = Math.random();

    this.setStateWindows(nextStateWindows);
  };

  init = () => {
    // Init the automate
    this.automate = new Conway(this.state.windows.cells);
  };

  setStateWindows = newWindows => {
    // Set the state of the windows part
    let nextState = this.state;
    nextState.windows = newWindows;
    this.setState(nextState);
  };

  setStateControls = newControls => {
    // Set the state of the controls part
    let nextState = this.state;
    nextState.controls = newControls;
    this.setState(nextState);
  };

  getStateWindows = () => {
    // Get the state of the windows part
    return this.state.windows;
  };

  getStateControls = () => {
    // Get the state of the controls part
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
          step={this.step}
          init={this.init}
        />
      </div>
    );
  }
}
