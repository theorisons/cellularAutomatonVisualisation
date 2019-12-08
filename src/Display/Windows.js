import React from "react";
import Bloc from "./Bloc";

const nbL = 6;
const nbC = 5;

export default class Windows extends React.Component {
  displayBlocs() {
    // Display the grid of blocs
    let arrayBlocs = []; // Contain row of blocs
    let key = "";
    for (let l = 0; l < nbL; l++) {
      key = `r${l}`;
      arrayBlocs.push(
        <div className="row no-gutters" key={key}>
          {this.addBlocs(nbC, key, l)}
        </div>
      );
    }
    return arrayBlocs;
  }

  addBlocs(nbC, key, posiRow) {
    // Add all blocs of a row
    let arrayBlocs = [];
    for (let i = 0; i < nbC; i++) {
      arrayBlocs.push(
        <Bloc key={`${key}C${i}`} position={{ x: i, y: posiRow }} />
      );
    }
    return arrayBlocs;
  }

  render() {
    return <div className="container">{this.displayBlocs()}</div>;
  }
}
