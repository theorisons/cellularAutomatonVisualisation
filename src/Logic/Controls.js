import React from "react";

import { TYPE_SIMULATION } from "../constantes/Constantes";

export default class Controls extends React.Component {
  displayOptions() {
    // Display the differents options to simulate
    return TYPE_SIMULATION.map(el => <option key={el}>{el}</option>);
  }

  updateValue = (event, stateTarget) => {
    // update the state
    let nextState = this.props.specific.get();
    const value = event.target.value;

    nextState[stateTarget] = value;

    this.props.specific.set(nextState);
  };

  render() {
    const { speed, type } = this.props.specific.get();
    const { size } = this.props.core.get();

    return (
      <form
        onSubmit={e => e.preventDefault()} // Avoid the submit when click on button
      >
        <div className="form-group">
          <label>Taille {size}</label>
          <input
            className="form-control-range"
            type="range"
            value={size}
            min="10"
            max="50"
            step="5"
            onChange={event => {
              let nextState = this.props.core.get();
              const value = event.target.value;

              nextState.size = value;

              this.props.core.set(nextState);
            }}
          />
        </div>
        <div className="form-group">
          <label>Type d'automate</label>
          <select
            className="form-control"
            value={type}
            onChange={event => {
              this.updateValue(event, "type");
            }}
          >
            {this.displayOptions()}
          </select>
        </div>
        <div className="form-group">
          <label>Vitesse simulation {speed} s</label>
          <input
            className="form-control-range"
            type="range"
            value={speed}
            min="0"
            max="10"
            step="0.5"
            onChange={event => {
              this.updateValue(event, "speed");
            }}
          />
        </div>

        <button onClick={() => this.props.step()}>Step</button>
        <button onClick={() => this.props.init()}>Init</button>
      </form>
    );
  }
}
