import React from "react";

/* React Component */

import Controls from "./Controls";
import Windows from "../Display/Windows";

/* Automaton */

import { GameOfLife } from "./Algo/GameOfLife";

/* Constantes */

import {
  /* Use for the state */
  INIT_CONTROLS,
  INIT_CORE,
  INIT_WINDOWS
} from "../constantes/constantes";
import { getKeyFromCoordinates } from "../constantes/utilities";

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
        ...INIT_WINDOWS
      },
      core: {
        // Shared state
        ...INIT_CORE
      }
    };
  }

  /* Life cycle component */

  componentDidMount() {
    // When the component mount,
    this.initAutomaton(); // Init the automaton for the first time
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

    let controls = this.getStateControls();
    controls.play = !controls.play;
    this.setStateControls(controls);
  };

  /* Automaton part */

  initAutomaton = () => {
    // Init the automaton
    // Init once even if the matrix change
    // The matrix use by the Automaton is a reference to the cells in the state
    this.automaton = new GameOfLife(
      this.state.windows.cells,
      this.state.core.nbR,
      this.state.core.nbC,
      this.state.controls.variant.rules
    );
  };

  stepAutomaton = () => {
    // Compute the next state

    let nextStateWindows = this.getStateWindows();
    nextStateWindows.cells = this.automaton.next(); // Compute the next state of the cells

    this.setStateWindows(nextStateWindows);
  };

  /* Functions to use the board has Map */

  getNewValue = (indR, indC) => {
    // Get the new value of the cell on click (or enter)
    // indR -> value of the row
    // indC -> value of the column
    // (indC, indR) are the coordinates of the cell
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

    const value = this.getNewValue(indR, indC); // Change the value of the cell
    const key = getKeyFromCoordinates(indR, indC);

    newState.cells.delete(key); // remove the previous value (if it is store)

    if (value !== 0) {
      // Don't store dead cell
      newState.cells.set(key, value); // store the new value
    }

    this.setStateWindows(newState);
  };

  /* Functions to set up the board */

  clearCells = () => {
    // Set the matrix with 0
    let newState = this.state;

    newState.windows.cells = this.emptyCells();
    this.initAutomaton();

    this.setState(newState);
  };

  emptyCells = () => {
    // Init all the cells at 0 in the board
    return new Map();
  };

  randomCells = () => {
    let nextState = this.getStateWindows();
    nextState.cells = this.automaton.randomBoard();

    this.setStateWindows(nextState);
  };

  /* Setter of the state */

  setStateCore = newCore => {
    // Set the state of the core part
    let nextState = this.state;
    let callBack = undefined;

    if (
      nextState.core.nbC !== newCore.nbC ||
      nextState.core.nbR !== newCore.nbR
    ) {
      // The size of the board changed
      callBack = this.initAutomaton; // Clear the previous automaton because dimensions are differents
    }

    nextState.core = newCore;

    this.setState(nextState, callBack);
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
    let callBack = undefined; // Only one call back is possible according to the control construction

    if (nextState.controls.speed !== newControls.speed) {
      // the value of the animation changed
      callBack = this.changeValueAnimation;
    }

    if (
      nextState.controls.variant.name !== newControls.variant.name ||
      // the value of the rules changed
      nextState.controls.variant.rules !== newControls.variant.rules
      // The user change options of the automaton
    ) {
      callBack = this.initAutomaton;
    }

    nextState.controls = newControls;

    this.setState(nextState, callBack); // set the state and callback on specific changed
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
    return (
      <div>
        <h1>Automate Cellulaire</h1>

        <div>
          <h2>Nombre de cellules: {this.state.windows.cells.size}</h2>
        </div>

        <Windows
          specific={{
            get: this.getStateWindows,
            set: this.setStateWindows
          }}
          core={{
            get: this.getCoreState,
            set: this.setStateCore
          }}
          changeValueCell={this.changeValueCell}
        />

        <Controls
          specific={{
            get: this.getStateControls,
            set: this.setStateControls
          }}
          core={{
            get: this.getCoreState,
            set: this.setStateCore
          }}
          play={this.handlePlayPause}
          step={this.stepAutomaton}
          clear={this.clearCells}
          randomCells={this.randomCells}
        />
      </div>
    );
  }
}
