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
    const { size, nbR, nbC } = this.props.core.get();

    let arrayBlocs = []; // Array of blocs
    let tmpRow = [];
    let value; // value of the cell

    for (let r = 0; r < nbR; r++) {
      tmpRow = [];

      for (let c = 0; c < nbC; c++) {
        // Iterate over the columns

        value = this.props.getValueCell(r, c); // value of the cell

        tmpRow.push(
          <Bloc
            key={`R${r}C${c}`}
            position={{ indR: r, indC: c }}
            value={value}
            handleClic={this.handleUserClicInsideBloc}
            handleEnter={this.handleEnterNewBloc}
            size={size}
          />
        );
      }

      arrayBlocs.push(
        <div
          className="d-flex justify-content-center align-items-center"
          key={`R${r}`}
        >
          {tmpRow}
        </div>
      );
    }

    return arrayBlocs;
  }

  render() {
    return <div>{this.displayBlocs()}</div>;
  }
}
