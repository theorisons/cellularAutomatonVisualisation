export const TYPE_SIMULATION = ["Conway", "Immigration", "Segregation"]; // All the simulation implemented

export const INIT_CONTROLS = {
  // Initial state of the controls section
  speed: 500, // Speed of the animation in ms
  type: TYPE_SIMULATION[1], // Type of the simulation (ie automaton)
  play: false // true is the animation is set to play
};

export const INIT_WINDOWS = {
  // Initial state of the windows section
  click: false, // To handle when the user click
  cells: [] // represent the board. Matrix of int
};

export const INIT_CORE = {
  // Initial state of the core section (ie common to all sections)
  nbR: 3, // Number of rows
  nbC: 3, // Number of columns
  size: 30 // Size of the blocs
};

export const NB_COLORS = 8; // Number of colors set in the CSS
