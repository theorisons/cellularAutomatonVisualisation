import React from "react";
import "./Bloc.css";

export default class Bloc extends React.Component {
  constructor(props) {
    super(props);
    this.x = props.position.x;
    this.y = props.position.y;
    this.state = {
      active: false
    };
  }

  handleClic() {
    // Handle the clic
    this.setState({ active: !this.state.active });
  }

  createClass() {
    // Change the class of the bloc
    if (this.state.active) {
      return "active";
    }
    return "";
  }

  render() {
    console.log(`Render x:${this.x} y:${this.y}`);
    return (
      <div
        onClick={() => this.handleClic()}
        className={"bloc " + this.createClass()}
      ></div>
    );
  }
}
