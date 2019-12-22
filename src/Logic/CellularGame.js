import React from "react";
import Controls from "./Controls";
import Windows from "../Display/Windows";

import { Conway } from "./Algo/Conway";
import { TYPE_SIMULATION } from "../constantes/Constantes";
import { Schelling } from "./Algo/Schelling";

const INIT_CONTROLS = {
  // Initial state of the controls section
  speed: 500, // Speed of the animation in ms
  type: TYPE_SIMULATION[0], // Type of the simulation (ie automaton)
  play: false // true is the animation is set to play
};

const INIT_WINDOWS = {
  // Initial state of the windows section
  click: false, // To handle when the user click
  cells: [] // represent the board. Matrix of int
};

const INIT_CORE = {
  // Initial state of the core section (ie common to all sections)
  nbR: 3, // Number of rows
  nbC: 3, // Number of columns
  size: 30 // Size of the blocs
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

    this.automaton = null; // Contains the logic of the simulation
    this.animation = null; // Use to animate the simulation

    this.state = {
      controls: {
        ...INIT_CONTROLS
      },
      windows: {
        ...INIT_WINDOWS,
        // cells: initCells(INIT_CORE.nbR, INIT_CORE.nbC) // Init an empty board
        cells: [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8]
        ]
      },
      core: {
        ...INIT_CORE
      },
      test: {
        w: 0,
        h: 0
      }
    };
  }

  componentDidMount() {
    // When the component mount, add event on resize
    // Handle when the user resize its windows
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    // Remove all events in the event manager of the component.
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    // Handle when the user resize its windows
    // Change the size of the blocs
    // Change the number of blocs
    const w = window.innerWidth;
    const h = window.innerHeight;

    let nState = this.state;
    nState.test = {
      w: w,
      h: h
    };
    this.setState(nState);
  };

  stopAnimation = () => {
    // Stop the animation of the simulation
    if (this.animation !== null) {
      // the animation is set
      clearInterval(this.animation);
      this.animation = null;
    }
  };

  startAnimation = () => {
    // Start the animation of the simulation
    this.animation = setInterval(this.stepAutomaton, this.state.controls.speed);
  };

  changeValueAnimation = () => {
    // Use when the user change the value of animation will the animation is playing
    if (this.animation !== null) {
      // The animation is currently play
      this.stopAnimation();
      this.startAnimation();
    }
  };

  handlePlayPause = () => {
    // Call by controls when the user hit the play/pause button
    if (this.animation === null) {
      // Create a new animation at a specific speed
      this.startAnimation();
    } else {
      // The user wants to stop the animation
      this.stopAnimation();
    }

    let newState = this.state;
    newState.controls.play = !newState.controls.play;
    this.setState(newState);
  };

  stepAutomaton = () => {
    // Compute the next state
    if (this.automaton === null) {
      // If it's the first time, init the automaton
      this.initAutomaton();
    }

    let nextStateWindows = this.getStateWindows();
    nextStateWindows.cells = this.automaton.next(); // Compute the next state of the cells

    this.setStateWindows(nextStateWindows);
  };

  initAutomaton = () => {
    // Init the automaton
    // Init once even if the matrix change
    // The matrix use by the Automaton is a reference to the cells in the state
    switch (this.state.controls.type) {
      case "Conway":
        this.automaton = new Conway(this.state.windows.cells);
        break;
      case "Schelling":
        console.log("init schelling");
        this.automaton = new Schelling(this.state.windows.cells);
        break;
      default:
        console.error("Error in the Automaton selection");
        break;
    }
  };

  resetAutomaton = () => {
    // Reset the automaton.
    this.automaton = null;
  };

  clearCells = () => {
    let newState = this.state;
    const newMatrix = initCells(newState.core.nbR, newState.core.nbC);
    newState.windows.cells = newMatrix;
    this.automaton = null; // Clear the previous automaton because dimensions have changed

    this.setState(newState);
  };

  resizeCells = (nbR, nbC) => {
    // Return the matrix resize
    // Keep as much values as possible
    // Resize on top left corner
    let newMatrix = [];
    let tmpRow = [];

    const oldMatrix = this.state.windows.cells;

    for (let r = 0; r < nbR; r++) {
      tmpRow = [];
      for (let c = 0; c < nbC; c++) {
        if (c < oldMatrix[0].length && r < oldMatrix.length) {
          tmpRow.push(oldMatrix[r][c]);
        } else {
          tmpRow.push(0);
        }
      }
      newMatrix.push(tmpRow);
    }
    return newMatrix;
  };

  setStateCore = newCore => {
    // Set the state of the core part
    let nextState = this.state;
    nextState.core = newCore;

    nextState.windows.cells = this.resizeCells(
      nextState.core.nbR,
      nextState.core.nbC
    ); // Init an empty board

    this.automaton = null; // Clear the previous automaton because dimensions could be differents

    this.setState(nextState);
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
    this.setState(nextState, this.changeValueAnimation()); // Call back of the animation function
    // Change the speed of the animation if the speed has change
  };

  getCoreState = () => {
    // Get the state of the core part
    return this.state.core;
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
    console.log(this.state);
    return (
      <div>
        <h1>Automate Cellulaire</h1>
        <h2>
          {this.state.test.w} x {this.state.test.h}
        </h2>

        <Windows
          specific={{
            get: this.getStateWindows,
            set: this.setStateWindows
          }}
          core={{
            set: this.setStateCore,
            get: this.getCoreState
          }}
        />

        <Controls
          specific={{
            get: this.getStateControls,
            set: this.setStateControls
          }}
          core={{
            set: this.setStateCore,
            get: this.getCoreState
          }}
          step={this.stepAutomaton}
          clear={this.clearCells}
          play={this.handlePlayPause}
        />
      </div>
    );
  }
}
