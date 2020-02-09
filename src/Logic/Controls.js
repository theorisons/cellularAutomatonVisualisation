import React from "react";

import {
  BUTTON_COLOR,
  TYPE_GAME_OF_LIFE,
  CUSTOM
} from "../constantes/constantes";

const MARGIN_BUTTONS = 1; // Value of the margin X for the buttons

export default class Controls extends React.Component {
  displayOptionsFromList(array) {
    // Display the differents options from a list
    // The key of the element are the name of the element
    return array.map(el => {
      if (typeof el === "string") {
        return <option key={el}>{el}</option>;
      }
      return <option key={el.name}>{el.name}</option>;
    });
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

  updateValuesOptionsRules = (stateTarget, position) => {
    // update the rule for game of life custom
    let nextState = { ...this.props.specific.get() }; // Copy of the state
    // Copy to avoid to mute the state
    // Used in parent to compare
    nextState.variant = {
      name: CUSTOM.name,
      rules: {
        born: [...nextState.variant.rules.born],
        survive: [...nextState.variant.rules.survive]
      }
    };

    nextState.variant.rules[stateTarget][position] = !nextState.variant.rules[
      stateTarget
    ][position];

    this.props.specific.set(nextState);
  };

  updateVariantAutomaton(event) {
    // update the variant of the automaton
    let nextState = { ...this.props.specific.get() }; // Copy of the state

    const value = event.target.value;

    for (let i = 0; i < TYPE_GAME_OF_LIFE.length; i++) {
      if (TYPE_GAME_OF_LIFE[i].name === value) {
        // Copy to avoid to mute the state
        // Used in parent to compare
        nextState.variant = {
          name: TYPE_GAME_OF_LIFE[i].name,
          rules: {
            born: [...TYPE_GAME_OF_LIFE[i].rules.born],
            survive: [...TYPE_GAME_OF_LIFE[i].rules.survive]
          }
        };
      }
    }

    this.props.specific.set(nextState);
  }

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

  displayCheckBox(arrayValues, id) {
    let arrayCheckBoxes = [];

    for (let i = 0; i <= 8; i++) {
      arrayCheckBoxes.push(
        <div key={`${id}${i}`} className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            checked={arrayValues[i]}
            readOnly
          />

          <label
            className="custom-control-label"
            onClick={() => this.updateValuesOptionsRules(id, i)}
          >
            {i}
          </label>
        </div>
      );
    }

    return arrayCheckBoxes;
  }

  render() {
    const { speed, variant } = this.props.specific.get();
    const { size, nbC, nbR } = this.props.core.get();

    return (
      <form
        onSubmit={e => e.preventDefault()} // Avoid the submit when click on button
      >
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

        <hr />
        <h3>Gestion des règles</h3>

        <div className="row no-gutters justify-content-between align-items-center">
          <div id="AutomatonSelection" className="form-group col-5">
            <label>Variante du Jeu de la Vie</label>
            <select
              className="form-control"
              value={variant.name}
              onChange={event => this.updateVariantAutomaton(event)}
            >
              {this.displayOptionsFromList(TYPE_GAME_OF_LIFE)}
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

          <div className="col-7">
            <h4>Cellule nait</h4>
            {this.displayCheckBox(variant.rules.born, "born")}
          </div>

          <div className="col-5">
            <h4>Cellule survit</h4>
            {this.displayCheckBox(variant.rules.survive, "survive")}
          </div>

          <h5>Selection du nombre de voisins vivants nécessaire</h5>
        </div>
      </form>
    );
  }
}
