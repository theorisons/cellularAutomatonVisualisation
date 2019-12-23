import React from "react";
import Bloc from "./Bloc";

export default class Windows extends React.Component {
  handleEnterNewBloc = (indR, indC) => {
    // Function call by the children
    // (indC, indR) are the coordinates of the cell
    // indR -> value of the row
    // indC -> value of the column
    // If the user is clicking, change the value of the calling bloc on enter
    const click = this.props.specific.get().click;

    if (click) {
      this.props.changeValueCell(indR, indC);
    }
  };

  handleUserClicInsideBloc = (indR, indC) => {
    // Function call by the children
    // (indC, indR) are the coordinates of the cell
    // indR -> value of the row
    // indC -> value of the column
    // Handle is the user is clicking inside a bloc

    let nextState = this.props.specific.get();

    nextState.click = !nextState.click;
    if (nextState.click) {
      // We need to change the current value of the bloc
      this.props.changeValueCell(indR, indC, nextState);
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
              position={{ indR: indR, indC: indC }}
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
