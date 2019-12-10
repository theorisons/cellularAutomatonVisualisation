import React from "react";
import "./Bloc.css";

export default class Bloc extends React.Component {
  createClass() {
    // Change the class of the bloc
    switch (this.props.value) {
      case 0:
        return "";
      case 1:
        return "active";
      default:
        return "";
    }
  }

  render() {
    const { x, y } = this.props.position;
    // console.log(`Render x:${x} y:${y} v:${this.props.value}`);
    return (
      <div
        // When events are detected, call the parent function
        onClick={event => this.props.handleClic(x, y, event)} // Event for click -> set the change
        // Give the event to strop the propagation
        onMouseEnter={() => this.props.handleEnter(x, y)} // If the mouse is inside a bloc
        className={"bloc " + this.createClass()}
      ></div>
    );
  }
}
