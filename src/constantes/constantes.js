// Constants use for the name of the automaton
export const GAME_OF_LIFE = "Jeu de la Vie";
export const COLORED_VARIANT = "Variante colorée";

export const TYPE_SIMULATION = [GAME_OF_LIFE, COLORED_VARIANT]; // All the simulation implemented

// Variant of the game of life
export const CONWAY = "Conway: Jeu de la Vie";
export const DAY_NIGHT = "Day & Night";
export const HIGHLIFE = "HighLife";

export const TYPE_GAME_OF_LIFE = [CONWAY, DAY_NIGHT, HIGHLIFE];

const DEFAULT_SIMULATION = 1; // Number of the default simulation

export const INIT_CONTROLS = {
  // Initial state of the controls section
  speed: 500, // Speed of the animation in ms
  type: TYPE_SIMULATION[DEFAULT_SIMULATION], // Type of the simulation (ie automaton)
  options: {
    // Use for game of lige
    variant: TYPE_GAME_OF_LIFE[0],
    // Use for Immigration
    nbStates: 3
  }, // Options specific to the automaton
  play: false // true is the animation is set to play
};

export const INIT_WINDOWS = {
  // Initial state of the windows section
  click: false, // To handle when the user click
  cells: [] // represent the board. Matrix of int
};

export const INIT_CORE = {
  // Initial state of the core section (ie common to all sections)
  nbR: 20, // Number of rows
  nbC: 20, // Number of columns
  size: 10 // Size of the blocs
};

export const NB_COLORS = 8; // Number of colors set in the CSS

/* Buttons */

export const BUTTON_COLOR = "btn-success"; // Bootstrap of the button
