import React from "react";
import "./Bloc.css";

export default class Bloc extends React.Component {
  createClass() {
    // Change the class of the bloc
    const value = this.props.value;
    if (0 <= value && value <= 7) {
      // Only 8 colors are set in the CSS
      return `active${value}`;
    } else {
      console.error("Error in the value of the cell");
    }
  }

  render() {
    const { x, y } = this.props.position; // Coordinates of the bloc. Info to send to the parent
    const size = this.props.size; // Dimension of the bloc to display

    const styles = {
      height: `${size}px`,
      width: `${size}px`
    }; // Size of the bloc

    return (
      <div
        // When events are detected, call the parent function
        onClick={() => this.props.handleClic(x, y)} // Event for click -> set the change
        onMouseEnter={() => this.props.handleEnter(x, y)} // If the mouse is inside a bloc
        className={"bloc " + this.createClass()} // Class of bloc + active or not
        style={styles}
      ></div>
    );
  }
}
