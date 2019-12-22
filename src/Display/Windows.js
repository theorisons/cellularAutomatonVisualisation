import React from "react";
import Bloc from "./Bloc";

export default class Windows extends React.Component {
  handleStateChange = (x, y) => {
    // Function call by the children
    // If the user is clicking, change the value of the calling bloc
    let currentState = this.props.specific.get();

    if (currentState.click) {
      currentState.cells[y][x] = currentState.cells[y][x] === 0 ? 1 : 0; // Change the cell status
      this.props.specific.set(currentState);
    }
  };

  handleUserClicInsideBloc = (x, y) => {
    // Function call by the children
    // Handle is the user is clicking inside a bloc

    let nextState = this.props.specific.get();

    nextState.click = !nextState.click;
    if (nextState.click) {
      // We need to change the current value of the bloc
      this.handleStateChange(x, y);
    }
    this.props.specific.set(nextState);
  };

  displayBlocs() {
    // return the board to display
    const { cells } = this.props.specific.get();
    const { size } = this.props.core.get();

    return cells.map((arrayRow, indR) => (
      // Iterate over a row
      <div
        className="d-flex justify-content-center align-items-center"
        key={`R${indR}`}
      >
        {arrayRow.map((value, indC) => {
          // Iterate over the state of the cells
          return (
            <Bloc
              key={`R${indR}C${indC}`}
              position={{ x: indC, y: indR }}
              value={value}
              handleClic={this.handleUserClicInsideBloc}
              handleEnter={this.handleStateChange}
              size={size}
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
