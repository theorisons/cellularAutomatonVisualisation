import React from "react";
import Bloc from "./Bloc";

const initialState = {
  click: false, // To handle when the iser click
  nbR: 15, // Number of rows
  nbC: 20, // Number of columns
  size: 50, // Size of the blocs
  cells: [] // represent the board. Matrix of int
};

export default class Windows extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
      cells: this.initCells(initialState.nbR, initialState.nbC) // Current states of the board
    };
  }

  initCells(nbRows, nbColumns) {
    // Init all the cells at 0
    let matrix = [];
    let tmpRow = [];

    for (let r = 0; r < nbRows; r++) {
      tmpRow = [];
      for (let c = 0; c < nbColumns; c++) {
        tmpRow.push(0);
      }
      matrix.push(tmpRow);
    }
    return matrix;
  }

  componentDidMount() {
    // When the component mount, add event on click
    // Handle when the user click outside the blocs
    document.addEventListener("click", this.handleClic);
    // document.addEventListener("mouseup", () => console.log("UP"));
  }

  componentWillUnmount() {
    // When the component die, remove the event on click
    document.removeEventListener("click", this.handleClic);
  }

  handleStateChange = (x, y) => {
    // Function is call by the children
    // If the user is clicking, change the value of the calling bloc
    if (this.state.click) {
      let nextState = this.state;

      nextState.cells[y][x] = nextState.cells[y][x] === 0 ? 1 : 0;

      this.setState(nextState);
    }
  };

  handleUserClicInsideBloc = (x, y, clickEvent) => {
    // Function is call by the children
    // Handle is the user is clicking inside a bloc

    // Stop the propagation of the event
    // Prevent to get catch by the listener
    clickEvent.stopPropagation();
    clickEvent.nativeEvent.stopImmediatePropagation();

    let nextState = this.state;

    nextState.click = !nextState.click;
    if (nextState.click) {
      // We need to change the current value of the bloc
      this.handleStateChange(x, y);
    }

    this.setState(nextState);
  };

  handleClic = () => {
    // Handle is the user is clicking outside the blocs
    console.log("CLIQUE");

    let nextState = this.state;

    nextState.click = !nextState.click;

    this.setState(nextState);
  };

  displayBlocs() {
    // return the board to display
    return this.state.cells.map((arrayRow, indR) => (
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
    return <div className="container">{this.displayBlocs()}</div>;
  }
}
