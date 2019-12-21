import React from "react";

const TYPE_SIMULATION = ["Conway", "Immigration", "Segregation"];
const INIT_STATE = {
  speed: 0.5,
  type: TYPE_SIMULATION[0]
};

export default class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INIT_STATE };
  }

  displayOptions() {
    return TYPE_SIMULATION.map(el => <option key={el}>{el}</option>);
  }

  changeForm = (event, stateTarget) => {
    const value = event.target.value;

    let nextState = this.state;
    nextState[stateTarget] = value;
    this.setState(nextState);
  };

  render() {
    return (
      <form>
        <div className="form-group">
          <label>Type d'automate</label>
          <select
            className="form-control"
            value={this.state.type}
            onChange={event => {
              this.changeForm(event, "type");
            }}
          >
            {this.displayOptions()}
          </select>
        </div>
        <div className="form-group">
          <label>Vitesse simulation {this.state.speed} s</label>
          <input
            className="form-control-range"
            type="range"
            value={this.state.speed}
            min="0"
            max="10"
            step="0.5"
            onChange={event => {
              this.changeForm(event, "speed");
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
