import React from "react";

import {
  TYPE_SIMULATION,
  BUTTON_COLOR,
  NB_COLORS,
  TYPE_GAME_OF_LIFE,
  /* Use to display options of the automaton */
  GAME_OF_LIFE,
  COLORED_VARIANT
} from "../constantes/constantes";

const MARGIN_BUTTONS = 1; // Value of the margin X for the buttons

export default class Controls extends React.Component {
  displayOptionsFromList(array) {
    // Display the differents options from a list
    // The key of the element are the name of the element
    return array.map(el => <option key={el}>{el}</option>);
  }

  updateValueSpecific = (event, stateTarget) => {
    // update the state specific to controls
    let nextState = { ...this.props.specific.get() }; // Copy of the state
    // Used in parent to compare
    const value = event.target.value;

    nextState[stateTarget] = value;

    this.props.specific.set(nextState);
  };

  updateValuesCore = (event, stateTarget) => {
    // update the state core
    let nextState = { ...this.props.core.get() }; // Copy of the state
    // Used in parent to compare
    const value = event.target.value;

    nextState[stateTarget] = value;

    this.props.core.set(nextState);
  };

  updateValuesOptionsAutomaton = (event, stateTarget) => {
    // update the state specific to the options of the automaton
    let nextState = { ...this.props.specific.get() }; // Copy of the state
    let nextOptions = { ...nextState.options };

    // Used in parent to compare
    const value = event.target.value;

    nextOptions[stateTarget] = value;
    nextState.options = nextOptions;

    this.props.specific.set(nextState);
  };

  playPauseButton = () => {
    let message = "Play";
    const { play } = this.props.specific.get();
    if (play) {
      message = "Pause";
    }
    return (
      <button
        type="button"
        className={`btn ${BUTTON_COLOR} mx-${MARGIN_BUTTONS} col`}
        onClick={() => this.props.play()}
      >
        {message}
      </button>
    );
  };

  displayAutomatonOptions() {
    const AUTOMATON = this.props.specific.get().type;
    switch (AUTOMATON) {
      case GAME_OF_LIFE:
        return this.displayOptionsConway();
      case COLORED_VARIANT:
        return this.displayOptionsImmigration();
      default:
        break;
    }
  }

  displayOptionsConway() {
    // Options for the game of life
    const { variant } = this.props.specific.get().options; // all the options of the game
    return (
      <div id="OptionsConway">
        <hr />
        <h3>Jeu de la vie</h3>
        <div className="form-group">
          <label>Variante du Jeu de la Vie</label>
          <select
            className="form-control"
            value={variant}
            onChange={event =>
              this.updateValuesOptionsAutomaton(event, "variant")
            }
          >
            {this.displayOptionsFromList(TYPE_GAME_OF_LIFE)}
          </select>
        </div>
      </div>
    );
  }

  displayOptionsImmigration() {
    // Options for the Immigration game

    const { nbStates } = this.props.specific.get().options; // all the options of the game
    return (
      <div id="OptionsImmigration">
        <hr />
        <h3>Jeu de l'Immigration</h3>

        <div className="form-group">
          <label>Nombre d'états: {nbStates}</label>
          <input
            className="form-control"
            type="range"
            value={nbStates}
            min="3"
            max={NB_COLORS}
            step="1"
            onChange={event =>
              this.updateValuesOptionsAutomaton(event, "nbStates")
            }
          />
        </div>
      </div>
    );
  }

  render() {
    const { speed, type } = this.props.specific.get();
    const { size, nbC, nbR } = this.props.core.get();

    return (
      <form
        onSubmit={e => e.preventDefault()} // Avoid the submit when click on button
      >
        <hr />
        <h3>Gestion de l'automate</h3>

        <div className="row no-gutters justify-content-between align-items-center">
          <div id="AutomatonSelection" className="form-group col-5">
            <label>Type d'automate</label>
            <select
              className="form-control"
              value={type}
              onChange={event => this.updateValueSpecific(event, "type")}
            >
              {this.displayOptionsFromList(TYPE_SIMULATION)}
            </select>
          </div>
          <div className="row col-6">
            <button
              type="button"
              className={`btn ${BUTTON_COLOR} mx-${MARGIN_BUTTONS} col`}
              onClick={() => this.props.clear()}
            >
              Vider
            </button>
            <button
              type="button"
              className={`btn ${BUTTON_COLOR} mx-${MARGIN_BUTTONS} col`}
              onClick={() => this.props.randomCells()}
            >
              Aléatoire
            </button>
          </div>
        </div>

        {this.displayAutomatonOptions()}

        <hr />
        <h3>Gestion de l'affichage</h3>

        <div className="row">
          <div className="form-group col-4">
            <label>Lignes: {nbR}</label>
            <input
              className="form-control-range"
              type="range"
              value={nbR}
              min="1"
              max="100"
              step="1"
              onChange={event => this.updateValuesCore(event, "nbR")}
            />
          </div>
          <div className="form-group col-4">
            <label>Colonnes: {nbC}</label>
            <input
              className="form-control-range"
              type="range"
              value={nbC}
              min="1"
              max="100"
              step="1"
              onChange={event => this.updateValuesCore(event, "nbC")}
            />
          </div>
          <div className="form-group col-4">
            <label>Taille: {size}</label>
            <input
              className="form-control-range"
              type="range"
              value={size}
              min="5"
              max="50"
              step="1"
              onChange={event => this.updateValuesCore(event, "size")}
            />
          </div>
        </div>

        <hr />
        <h3>Gestion de la simulation</h3>

        <div className="row no-gutters justify-content-between align-items-center">
          <div id="SpeedSelection" className="form-group col-5">
            <label>Vitesse {speed / 1000}s</label>

            <input
              className="form-control-range"
              type="range"
              value={speed}
              min="100"
              max="1000"
              step="100"
              onChange={event => this.updateValueSpecific(event, "speed")}
            />
          </div>
          <div id="buttonsRow" className="row col-6">
            {this.playPauseButton()}
            <button
              type="button"
              className={`btn ${BUTTON_COLOR} mx-${MARGIN_BUTTONS} col`}
              onClick={() => this.props.step()}
            >
              Step
            </button>
          </div>
        </div>
      </form>
    );
  }
}
