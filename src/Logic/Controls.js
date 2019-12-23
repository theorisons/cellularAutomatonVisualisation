import React from "react";

import { TYPE_SIMULATION } from "../constantes/constantes";

export default class Controls extends React.Component {
  displayOptions() {
    // Display the differents options to simulate
    return TYPE_SIMULATION.map(el => <option key={el}>{el}</option>);
  }

  updateValueSpecific = (event, stateTarget) => {
    // update the state specific to controls
    let nextState = this.props.specific.get();
    const value = event.target.value;

    nextState[stateTarget] = value;

    this.props.specific.set(nextState);
  };

  updateValuesCore = (event, stateTarget) => {
    // update the state core
    let nextState = this.props.core.get();
    const value = event.target.value;

    nextState[stateTarget] = value;

    this.props.core.set(nextState);
  };

  playPauseButton = () => {
    let message = "Play";
    const { play } = this.props.specific.get();
    if (play) {
      message = "Pause";
    }
    return <button onClick={() => this.props.play()}>{message}</button>;
  };

  render() {
    const { speed, type } = this.props.specific.get();
    const { size, nbC, nbR } = this.props.core.get();

    return (
      <form
        onSubmit={e => e.preventDefault()} // Avoid the submit when click on button
      >
        <div className="form-group">
          <label>Taille: {size}</label>
          <input
            className="form-control-range"
            type="range"
            value={size}
            min="10"
            max="100"
            step="5"
            onChange={event => this.updateValuesCore(event, "size")}
          />
        </div>
        <div className="form-group">
          <label>Nombres de lignes: {nbR}</label>
          <input
            className="form-control-range"
            type="range"
            value={nbR}
            min="1"
            max="40"
            step="1"
            onChange={event => this.updateValuesCore(event, "nbR")}
          />
        </div>
        <div className="form-group">
          <label>Nombres de colonnes: {nbC}</label>
          <input
            className="form-control-range"
            type="range"
            value={nbC}
            min="1"
            max="40"
            step="1"
            onChange={event => this.updateValuesCore(event, "nbC")}
          />
        </div>
        <div className="form-group">
          <label>Type d'automate</label>
          <select
            className="form-control"
            value={type}
            onChange={event => this.updateValueSpecific(event, "type")}
          >
            {this.displayOptions()}
          </select>
        </div>
        <div className="form-group">
          <label>Vitesse simulation {speed / 1000} s</label>
          <input
            className="form-control-range"
            type="range"
            value={speed}
            min="100"
            max="5000"
            step="100"
            onChange={event => this.updateValueSpecific(event, "speed")}
          />
        </div>

        {this.playPauseButton()}
        <button onClick={() => this.props.step()}>Step</button>
        <button onClick={() => this.props.clear()}>Clear</button>
      </form>
    );
  }
}
