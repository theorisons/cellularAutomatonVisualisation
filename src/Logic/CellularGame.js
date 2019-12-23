import React from "react";

/* React Component */

import Controls from "./Controls";
import Windows from "../Display/Windows";

/* Automaton */

import { Conway } from "./Algo/Conway";
import { Immigration } from "./Algo/Immigration";

/* Constantes */

import {
  INIT_CONTROLS,
  INIT_CORE,
  INIT_WINDOWS
} from "../constantes/constantes";
import { initCells } from "../constantes/utilities";

export default class CellularGame extends React.Component {
  // CellularGame contains the state of the controls and Windows sections
  constructor(props) {
    super(props);

    this.automaton = null; // Contains the logic of the simulation
    this.animation = null; // Use to animate the simulation

    this.state = {
      controls: {
        // State of the controls part
        ...INIT_CONTROLS
      },
      windows: {
        // State of the windows part
        ...INIT_WINDOWS,
        cells: initCells(INIT_CORE.nbR, INIT_CORE.nbC) // Init an empty board
        // cells: [
        //Test Schelling
        //   [0, 0, 0, 0, 0, 0, 0],
        //   [0, 3, 0, 1, 1, 0, 0],
        //   [0, 3, 1, 1, 1, 2, 0],
        //   [0, 1, 1, 3, 2, 2, 0],
        //   [0, 0, 1, 2, 2, 2, 0],
        //   [0, 0, 3, 2, 2, 1, 0],
        //   [0, 0, 0, 0, 0, 0, 0]
        // ]
      },
      core: {
        // Shared state
        ...INIT_CORE
      },
      test: {
        // Test State
        w: 0,
        h: 0
      }
    };
  }

  /* Life cycle component */

  componentDidMount() {
    // When the component mount, add event on resize
    // Handle when the user resize its windows

    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    // Remove all events in the event manager of the component.
    window.removeEventListener("resize", this.handleResize);
  }

  /* Animation part */

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

  /* Automaton part */

  initAutomaton = () => {
    // Init the automaton
    // Init once even if the matrix change
    // The matrix use by the Automaton is a reference to the cells in the state
    switch (this.state.controls.type) {
      case "Conway":
        this.automaton = new Conway(this.state.windows.cells);
        break;
      case "Immigration":
        this.automaton = new Immigration(this.state.windows.cells);
        break;
      default:
        console.error("Error in the Automaton selection");
        break;
    }
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

  resetAutomaton = () => {
    // Reset the automaton.
    this.automaton = null;
  };

  getValue = (indR, indC) => {
    // Get the new value of the cell on click (or enter)
    // indR -> value of the row
    // indC -> value of the column
    // (indC, indR) are the coordinates of the cell
    this.initAutomaton(); // Make sure it is the right rules
    return this.automaton.changeValue(indR, indC);
  };

  changeValueCell = (indR, indC, stateWindows = null) => {
    // Change the value of the cell and set the new state
    // (indC, indR) are the coordinates of the cell
    // indR -> value of the row
    // indC -> value of the column
    let newState = stateWindows;
    if (newState === null) {
      // If there is a modification is the state, avoid multiple set
      newState = this.getStateWindows();
    }

    newState.cells[indR][indC] = this.getValue(indR, indC); // Change the value of the cell
    this.setStateWindows(newState);
  };

  randomCells = () => {
    this.initAutomaton();

    let nextState = this.getStateWindows();
    nextState.cells = this.automaton.randomMatrix();

    this.setStateWindows(nextState);
  };

  /* Handle the resize of the windows */

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

  /* Cells handling */

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

  clearCells = () => {
    let newState = this.state;
    const newMatrix = initCells(newState.core.nbR, newState.core.nbC);
    newState.windows.cells = newMatrix;
    this.automaton = null; // Clear the previous automaton because dimensions have changed

    this.setState(newState);
  };

  /* Setter of the state */

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

  /* Getter of the state */

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
    // console.log(this.state);
    return (
      <div>
        <h1>Automate Cellulaire</h1>

        <div>
          <h2>
            Test Resize {this.state.test.w} x {this.state.test.h}
          </h2>
        </div>

        <Windows
          specific={{
            get: this.getStateWindows,
            set: this.setStateWindows
          }}
          core={{
            set: this.setStateCore,
            get: this.getCoreState
          }}
          changeValueCell={this.changeValueCell}
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
          randomCells={this.randomCells}
        />
      </div>
    );
  }
}
