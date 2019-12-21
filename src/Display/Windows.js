import React from "react";
import Bloc from "./Bloc";

export default class Windows extends React.Component {
  handleStateChange = (x, y) => {
    // Function call by the children
    // If the user is clicking, change the value of the calling bloc
    let currentState = this.props.getState();

    if (currentState.click) {
      currentState.cells[y][x] = currentState.cells[y][x] === 0 ? 1 : 0; // Change the cell status
      this.props.setValues(currentState);
    }
  };

  handleUserClicInsideBloc = (x, y, clickEvent) => {
    // Function call by the children
    // Handle is the user is clicking inside a bloc

    let nextState = this.props.getState();

    nextState.click = !nextState.click;
    if (nextState.click) {
      // We need to change the current value of the bloc
      this.handleStateChange(x, y);
    }
    this.props.setValues(nextState);
  };

  displayBlocs() {
    // return the board to display
    return this.props.getState().cells.map((arrayRow, indR) => (
      // Iterate over a row
      <div className="row nogutters" key={`R${indR}`}>
        {arrayRow.map((value, indC) => {
          // Iterate over the state of the cells
          return (
            <Bloc
              key={`R${indR}C${indC}`}
              position={{ x: indC, y: indR }}
              value={value}
              handleClic={this.handleUserClicInsideBloc}
              handleEnter={this.handleStateChange}
            />
          );
        })}
      </div>
    ));
  }

  render() {
    return <div>{this.displayBlocs()}</div>;
  }
}
