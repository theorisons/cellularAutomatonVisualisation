import React from "react";
import "./Bloc.css";

import { NB_COLORS } from "../constantes/constantes";

export default class Bloc extends React.Component {
  createClass() {
    // Change the class of the bloc
    const value = this.props.value;
    if (0 <= value && value < NB_COLORS) {
      // To make sure the color is set in the CSS file
      return `active${value}`;
    } else {
      console.error("Error in the value of the cell");
    }
  }

  render() {
    const { indR, indC } = this.props.position; // Coordinates of the bloc. Info to send to the parent
    const size = this.props.size; // Dimension of the bloc to display

    const styles = {
      height: `${size}px`,
      width: `${size}px`
    }; // Size of the bloc

    return (
      <div
        // When events are detected, call the parent function
        onClick={() => this.props.handleClic(indR, indC)} // Event for click -> set the change
        onMouseEnter={() => this.props.handleEnter(indR, indC)} // If the mouse is inside a bloc
        className={"bloc " + this.createClass()} // Class of bloc + active or not
        style={styles}
      >
        {/* {this.props.value} */}
      </div>
    );
  }
}
