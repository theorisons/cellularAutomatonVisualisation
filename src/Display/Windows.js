import React from "react";
import Bloc from "./Bloc";

export default class Windows extends React.Component {
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
    let currentState = this.props.getState();

    if (currentState.click) {
      currentState.cells[y][x] = currentState.cells[y][x] === 0 ? 1 : 0;
      this.props.setValues(currentState);
    }
  };

  handleUserClicInsideBloc = (x, y, clickEvent) => {
    // Function is call by the children
    // Handle is the user is clicking inside a bloc

    // Stop the propagation of the event
    // Prevent to get catch by the listener
    clickEvent.stopPropagation();
    clickEvent.nativeEvent.stopImmediatePropagation();

    let nextState = this.props.getState();

    nextState.click = !nextState.click;
    if (nextState.click) {
      // We need to change the current value of the bloc
      this.handleStateChange(x, y);
    }
    this.props.setValues(nextState);
  };

  handleClic = () => {
    // Handle is the user is clicking outside the blocs
    let nextState = this.state;

    nextState.click = !nextState.click;

    this.setState(nextState);
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
    return <div className="container">{this.displayBlocs()}</div>;
  }
}
