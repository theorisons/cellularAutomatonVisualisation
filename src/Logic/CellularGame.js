import React from "react";

/* React Component */

import Controls from "./Controls";
import Windows from "../Display/Windows";

/* Automaton */

import { GameOfLife } from "./Algo/GameOfLife";
import { ColoredVariant } from "./Algo/ColoredVariant";

/* Constantes */

import {
  /* Use for the state */
  INIT_CONTROLS,
  INIT_CORE,
  INIT_WINDOWS,
  /* Use for the init of the automaton */
  GAME_OF_LIFE,
  COLORED_VARIANT
} from "../constantes/constantes";

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

    this.initAutomaton(); // Init the automaton for the first time
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
      case GAME_OF_LIFE:
        this.automaton = new GameOfLife(
          this.state.windows.cells,
          this.state.core.nbR,
          this.state.core.nbC,
          this.getKeyFromCoordinates,
          this.getCoordinatesFromKey,
          this.state.controls.options.variant
        );
        break;
      case COLORED_VARIANT:
        this.automaton = new ColoredVariant(
          this.state.windows.cells,
          this.state.core.nbR,
          this.state.core.nbC,
          this.getKeyFromCoordinates,
          this.getCoordinatesFromKey,
          this.state.controls.options.nbStates
        );
        break;
      default:
        console.error("Error in the Automaton selection");
        break;
    }

    if (!this.automaton.checkCells()) {
      this.clearCells();
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

  getKeyFromCoordinates = (r, c) => {
    // Return the value of the key for a cell at coordinates (c,r)
    return `R${r}C${c}`;
  };

  getCoordinatesFromKey = key => {
    // Return the value of the coordinates (c,r) from a key
    // Return is an object
    // The key is a string

    let i = 1; // The first value is 'R'
    let indR = "";
    let indC = "";

    while (key[i] !== "C") {
      indR = indR + key[i];
      i++;
    }

    i += 1; // Skip 'C"

    for (; i < key.length; i++) {
      indC = indC + key[i];
    }

    //Conver the strig value into integer
    indR = parseInt(indR, 10);
    indC = parseInt(indC, 10);

    return { indR: indR, indC: indC };
  };

  getValueCell = (indR, indC) => {
    // Return the value that correspond to the coordinates
    const value = this.state.windows.cells.get(
      this.getKeyFromCoordinates(indR, indC)
    );

    if (value === undefined) {
      // The value is not set so the cell is dead
      return 0;
    }
    return value;
  };

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
    const key = this.getKeyFromCoordinates(indR, indC);

    console.log("val " + value);
    console.log(newState.cells);

    newState.cells.delete(key); // remove the previous value (if it is store)
    newState.cells.set(key, value); // store the new value

    console.log(newState.cells);

    this.setStateWindows(newState);
  };

  randomCells = () => {
    this.initAutomaton();

    let nextState = this.getStateWindows();
    nextState.cells = this.automaton.randomBoard();

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
    // Not usefull with Map

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
    // Set the matrix with 0
    let newState = this.state;

    newState.windows.cells = this.emptyCells();
    this.initAutomaton(); // Clear the previous automaton because dimensions have changed

    this.setState(newState);
  };

  emptyCells = () => {
    // Init all the cells at 0 in the board
    return new Map();
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
      // The size of the matrix changed
      // nextState.windows.cells = this.resizeCells(newCore.nbR, newCore.nbC); // Init a new board
      callBack = this.initAutomaton; // Clear the previous automaton because dimensions could be differents
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

    if (nextState.controls.type !== newControls.type) {
      // the value of the automaton changed
      callBack = this.initAutomaton;
    }

    if (nextState.controls.options !== newControls.options) {
      // The user change options of the automaton
      callBack = this.initAutomaton;
    }

    nextState.controls = newControls;

    this.setState(nextState, callBack); // set the state and callback on specific changed
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
            get: this.getCoreState,
            set: this.setStateCore
          }}
          changeValueCell={this.changeValueCell}
          getKeyFromCoordinates={this.getKeyFromCoordinates}
          getValueCell={this.getValueCell}
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
          step={this.stepAutomaton}
          clear={this.clearCells}
          play={this.handlePlayPause}
          randomCells={this.randomCells}
        />
      </div>
    );
  }
}
