import React from "react";
import { TYPE_SIMULATION } from "../constantes/Constantes";

export default class Controls extends React.Component {
  displayOptions() {
    return TYPE_SIMULATION.map(el => <option key={el}>{el}</option>);
  }

  updateValue = (event, stateTarget) => {
    let nextState = this.props.getState();
    const value = event.target.value;

    nextState[stateTarget] = value;

    this.props.setValues(nextState);
  };

  render() {
    const { speed, type } = this.props.getState();

    return (
      <form>
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
        <button>Play</button>
        <button>Step</button>
        <button>Pause</button>
      </form>
    );
  }
}
