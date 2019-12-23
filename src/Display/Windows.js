import React from "react";
import Bloc from "./Bloc";

export default class Windows extends React.Component {
  handleEnterNewBloc = (x, y) => {
    // Function call by the children
    // If the user is clicking, change the value of the calling bloc on enter
    const click = this.props.specific.get().click;

    if (click) {
      this.props.changeValueCell(x, y);
    }
  };

  handleUserClicInsideBloc = (x, y) => {
    // Function call by the children
    // Handle is the user is clicking inside a bloc

    let nextState = this.props.specific.get();

    nextState.click = !nextState.click;
    if (nextState.click) {
      // We need to change the current value of the bloc
      this.props.changeValueCell(x, y, nextState);
    }
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
              handleEnter={this.handleEnterNewBloc}
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
